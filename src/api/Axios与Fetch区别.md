# Axios 与 Fetch 的区别

## 1. 基本概念

- **Axios**：基于 XMLHttpRequest 的第三方 HTTP 客户端库，支持浏览器和 Node.js
- **Fetch**：浏览器原生提供的 Web API，现代浏览器的内置功能

## 2. 请求处理

### 响应数据格式

- **Axios**：自动将响应数据解析为 JSON 格式
- **Fetch**：需要手动调用 `.json()` 或 `.text()` 等方法解析数据

### 超时设置

- **Axios**：内置 `timeout` 配置项，可轻松设置请求超时
- **Fetch**：原生不支持超时设置，需通过 `AbortController` 和 `setTimeout` 组合实现

### 拦截器

- **Axios**：支持请求和响应拦截器，可在请求发送前或响应处理后进行统一操作
- **Fetch**：无拦截器功能，需通过封装函数或中间件方式模拟

## 3. 错误处理

### 错误状态判断

- **Axios**：只有网络错误或超时才会进入 catch，HTTP 状态码（如 404、500）会进入 then，通过 `response.status` 判断
- **Fetch**：只有网络故障或请求被阻止时才会 reject，HTTP 状态码（如 404、500）仍会进入 then，需手动检查 `response.ok` 或 `response.status`

## 4. 浏览器兼容性

- **Axios**：兼容性更好，支持旧版浏览器（如 IE11）
- **Fetch**：现代浏览器支持良好，旧版浏览器（如 IE）不支持，需使用 polyfill

## 5. 请求取消

- **Axios**：支持取消令牌（CancelToken）或 `AbortController` 方式取消请求
- **Fetch**：支持 `AbortController` 取消请求（较新功能）

## 6. 请求进度监控

- **Axios**：支持上传和下载进度监控（onUploadProgress、onDownloadProgress）
- **Fetch**：原生不支持进度监控，需通过 `ReadableStream` 等高级 API 实现（较复杂）

## 7. 并发请求

- **Axios**：提供 `axios.all` 和 `axios.spread` 方法处理并发请求
- **Fetch**：使用原生的 `Promise.all` 处理并发请求

## 8. 数据序列化

- **Axios**：自动将请求数据序列化为 JSON，支持表单数据格式转换
- **Fetch**：需手动设置请求头 `Content-Type` 和序列化数据（如 `JSON.stringify`）

## 9. 跨域请求

- **Axios**：遵循浏览器的同源策略，处理方式与 XMLHttpRequest 一致
- **Fetch**：默认情况下不会发送 cookies 和认证信息，需设置 `credentials: 'include'`

## 10. 体积与依赖

- **Axios**：需额外引入库，增加项目体积（约 14kB）
- **Fetch**：零依赖，原生支持，无需额外资源加载