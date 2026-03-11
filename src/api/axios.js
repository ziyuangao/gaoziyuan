// src/api/axios.js
import axios from 'axios';

// 环境配置
const envConfig = {
  development: 'http://localhost:8888',
  production: 'https://gaoziyuan.netlify.app'
};

// 根据当前环境获取 baseURL
const getBaseURL = () => {
  // 优先使用环境变量
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // 否则根据运行环境判断
  const mode = import.meta.env.MODE || 'development';
  return envConfig[mode] || envConfig.development;
};

const createAPI = (baseURL = getBaseURL(), defaultOptions = {}) => {
  const request = async (url, options = {}) => {
    // 环境判断：如果 url 已经是完整地址，直接使用；否则拼接 baseURL
    const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
    
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...defaultOptions.headers,
        ...options.headers,
      },
      ...defaultOptions,
      ...options,
    };

    try {
      const response = await axios({
        url: fullUrl,
        ...mergedOptions,
      });
      
      // 返回响应数据
      return response.data;
    } catch (error) {
      console.error('请求失败:', error);
      throw error;
    }
  };

  return {
    // GET 请求
    get: (url, params = {}, options = {}) => {
      return request(url, { 
        method: 'GET', 
        params,
        ...options 
      });
    },

    // POST 请求
    post: (url, data = {}, options = {}) => {
      return request(url, {
        method: 'POST',
        data,
        ...options,
      });
    },

    // PUT 请求
    put: (url, data = {}, options = {}) => {
      return request(url, {
        method: 'PUT',
        data,
        ...options,
      });
    },

    // DELETE 请求
    delete: (url, options = {}) => {
      return request(url, { 
        method: 'DELETE', 
        ...options 
      });
    },

    // 直接调用 request 方法
    request,
  };
};

// 导出实例
const api = createAPI();

export default api;