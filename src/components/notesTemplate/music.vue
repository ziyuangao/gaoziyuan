<template>
  <div class="music-player">
    <el-card class="player-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h2><el-icon><VideoCamera /></el-icon>deepseek和我做的本地音乐播放器</h2>
        </div>
      </template>

      <!-- 文件夹选择区域 -->
      <div class="folder-upload">
        <el-button type="primary" size="large" @click="triggerFolderInput">
          <el-icon><FolderOpened /></el-icon> 选择音乐文件夹
        </el-button>
        <input 
          type="file" 
          id="folderInput" 
          @change="handleFolderChange" 
          webkitdirectory 
          multiple 
          accept=".mp3"
          hidden
          ref="folderInput"
        >
      </div>

      <div v-if="folderName" class="folder-info">
        <el-text type="info">
          <el-icon><Folder /></el-icon> 已选择文件夹: {{ folderName }} ({{ filteredPlaylist.length }} 首歌曲)
        </el-text>
      </div>

      <!-- 播放器区域 -->
      <div class="player-section" v-if="currentSong">
        <el-divider />
        
        <div class="now-playing">
          <el-text tag="b" size="large">
            <el-icon><Headset /></el-icon> 正在播放: {{ currentSong.name }}
          </el-text>
        </div>

        <audio 
          ref="audioPlayer" 
          :src="currentSong.url" 
          @ended="handleSongEnded"
          @timeupdate="updateCurrentTime"
          @canplay="handleCanPlay"
          @error="handleAudioError"
        ></audio>

        <div class="progress-container">
          <el-slider 
            v-model="currentTime" 
            :max="duration" 
            :format-tooltip="formatTime"
            @change="handleSeekChange"
            @input="handleSeekInput"
          />
          <div class="time-display">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- 播放控制区域 -->
        <div class="player-controls">
          <el-button-group>
            <el-button :disabled="!hasPrev" @click="prev" size="large">
              <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <el-button 
              type="primary" 
              @click="togglePlay" 
              size="large" 
              class="play-btn"
            >
              <el-icon v-if="isPlaying"><VideoPause /></el-icon>
              <el-icon v-else><VideoPlay /></el-icon>
            </el-button>
            <el-button :disabled="!hasNext" @click="next" size="large">
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </el-button-group>

          <div class="placeholder-box"></div>

          <div class="volume-control">
            <el-icon class="volume-icon">
              <Notification v-if="volume > 0.6" />
              <Bell v-else-if="volume > 0" />
              <BellFilled v-else />
            </el-icon>
            <el-slider
              v-model="volume"
              :min="0"
              :max="1"
              :step="0.1"
              :show-tooltip="false"
              @input="setVolume"
              style="width: 100px; margin-left: 10px;"
            />
          </div>
        </div>
      </div>

      <!-- 播放列表 -->
      <div class="playlist-section" v-if="filteredPlaylist.length > 0">
        <el-divider />
        <div class="playlist-header">
          <h3><el-icon><List /></el-icon> 播放列表</h3>
          <el-input
            v-model="searchQuery"
            placeholder="搜索歌曲"
            clearable
            style="width: 200px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        
        <el-scrollbar height="300px">
          <el-table 
            :data="paginatedPlaylist" 
            stripe 
            style="width: 100%"
            @row-click="playSong"
            highlight-current-row
            :current-row-key="currentIndex"
          >
            <el-table-column prop="index" label="#" width="50">
              <template #default="{ $index }">
                {{ (currentPage - 1) * pageSize + $index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="歌曲名称" />
            <el-table-column label="状态" width="80">
              <template #default="{ row }">
                <el-tag 
                  v-if="currentSong && row.name === currentSong.name" 
                  type="success" 
                  size="small"
                >
                  <el-icon><Headset /></el-icon>
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>

        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="filteredPlaylist.length"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            background
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import {
  VideoCamera,
  FolderOpened,
  Folder,
  Headset,
  ArrowLeft,
  ArrowRight,
  VideoPlay,
  VideoPause,
  List,
  Search,
  Notification,
  Bell,
  BellFilled
} from '@element-plus/icons-vue';

const audioPlayer = ref(null);
const folderInput = ref(null);
const playlist = ref([]);
const currentIndex = ref(-1);
const isPlaying = ref(false);
const folderName = ref('');
const currentTime = ref(0);
const duration = ref(0);
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const isAudioReady = ref(false);
const volume = ref(0.7);

// 计算属性
const currentSong = computed(() => {
  return currentIndex.value >= 0 ? playlist.value[currentIndex.value] : null;
});

const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value < playlist.value.length - 1);

const filteredPlaylist = computed(() => {
  if (!searchQuery.value) return playlist.value;
  const query = searchQuery.value.toLowerCase();
  return playlist.value.filter(song => 
    song.name.toLowerCase().includes(query)
  );
});

const paginatedPlaylist = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredPlaylist.value.slice(start, end);
});

// 进度条控制
const handleSeekInput = (value) => {
  currentTime.value = value;
};

const handleSeekChange = (value) => {
  seekAudio(value);
};

const seekAudio = (value) => {
  if (!audioPlayer.value) return;
  
  const wasPlaying = isPlaying.value;
  if (wasPlaying) {
    audioPlayer.value.pause();
  }
  
  audioPlayer.value.currentTime = value;
  currentTime.value = value;
  
  if (wasPlaying) {
    audioPlayer.value.play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch(error => {
        console.error("跳转后播放失败:", error);
        isPlaying.value = false;
      });
  }
  
  updateCurrentTime();
};

// 音量控制
const setVolume = (value) => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = value;
  }
};

// 文件夹选择
const triggerFolderInput = () => {
  folderInput.value.click();
};

const handleFolderChange = (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  playlist.value.forEach(song => {
    URL.revokeObjectURL(song.url);
  });

  const pathParts = files[0].webkitRelativePath.split('/');
  folderName.value = pathParts.length > 1 ? pathParts[0] : '未知文件夹';
  
  const mp3Files = files.filter(file => {
    const fileName = file.name.toLowerCase();
    return fileName.endsWith('.mp3') && file.type.startsWith('audio/');
  });
  
  playlist.value = mp3Files
    .map(file => ({
      name: file.name.replace('.mp3', ''),
      url: URL.createObjectURL(file),
      file: file
    }))
    .sort(() => Math.random() - 0.5);

  event.target.value = '';
  currentPage.value = 1;
  searchQuery.value = '';
  currentTime.value = 0;
  duration.value = 0;
  isPlaying.value = false;
  isAudioReady.value = false;

  if (playlist.value.length > 0) {
    currentIndex.value = 0;
    if (audioPlayer.value) {
      audioPlayer.value.load();
    }
  } else {
    ElMessage.warning('所选文件夹中没有找到MP3文件');
  }
};

// 音频控制
const handleCanPlay = () => {
  isAudioReady.value = true;
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value;
  }
  if (isPlaying.value) {
    playAudio();
  }
};

const handleAudioError = () => {
  ElMessage.error('音频加载失败，请尝试其他歌曲');
  isPlaying.value = false;
  isAudioReady.value = false;
};

const playAudio = async () => {
  if (!audioPlayer.value || !isAudioReady.value) return;
  
  try {
    await audioPlayer.value.play();
    isPlaying.value = true;
    duration.value = audioPlayer.value.duration || duration.value;
  } catch (error) {
    console.error("播放失败:", error);
    ElMessage.error('播放失败: ' + (error.message || '浏览器可能阻止了自动播放，请手动点击播放按钮'));
    isPlaying.value = false;
  }
};

const play = () => {
  if (!currentSong.value) return;
  
  if (isAudioReady.value) {
    playAudio();
  } else {
    isPlaying.value = true;
    if (audioPlayer.value) {
      audioPlayer.value.load();
    }
  }
};

const pause = () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    isPlaying.value = false;
  }
};

const togglePlay = () => {
  isPlaying.value ? pause() : play();
};

const prev = () => {
  if (hasPrev.value) {
    currentIndex.value--;
    isPlaying.value = true;
    isAudioReady.value = false;
  }
};

const next = () => {
  if (hasNext.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
  isPlaying.value = true;
  isAudioReady.value = false;
};

const handleSongEnded = () => {
  next();
};

const playSong = (row) => {
  const index = playlist.value.findIndex(item => item.name === row.name);
  if (index !== -1) {
    currentIndex.value = index;
    isPlaying.value = true;
    isAudioReady.value = false;
  }
};

const updateCurrentTime = () => {
  if (audioPlayer.value) {
    requestAnimationFrame(() => {
      currentTime.value = audioPlayer.value.currentTime;
      if (!duration.value && audioPlayer.value.duration) {
        duration.value = audioPlayer.value.duration;
      }
    });
  }
};

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.src = '';
  }
  playlist.value.forEach(song => {
    URL.revokeObjectURL(song.url);
  });
});
</script>

<style scoped>
.music-player {
  max-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
}

.player-card {
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.folder-upload {
  margin-bottom: 15px;
}

.folder-info {
  margin-top: 15px;
  padding: 10px;
  background-color: var(--el-color-primary-light-9);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-section {
  margin-top: 20px;
}

.now-playing {
  margin-bottom: 20px;
  padding: 10px;
  background-color: var(--el-color-primary-light-9);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-container {
  margin: 20px 0;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--el-text-color-secondary);
  margin-top: 5px;
}

.player-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
  gap: 20px;
}

.play-btn {
  width: 50px;
}

.volume-control {
  display: flex;
  align-items: center;
  min-width: 150px;
}

.volume-icon {
  font-size: 20px;
  color: var(--el-text-color-regular);
}

.placeholder-box {
  flex-grow: 1;
  min-width: 50px;
}

.playlist-section {
  margin-top: 20px;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.playlist-header h3 {
  margin: 0;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

:deep(.el-slider__runway) {
  margin: 0;
  cursor: pointer;
}

:deep(.el-slider__button) {
  transition: all 0.2s;
}

:deep(.el-slider__button:hover) {
  transform: scale(1.2);
}
</style>