const createAPI = (baseURL = '', defaultOptions = {}) => {
  const request = async (url, options = {}) => {
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
      const response = await fetch(fullUrl, mergedOptions);
      
      // 检查HTTP状态码
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // 自动解析响应
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      console.error('请求失败:', error);
      throw error;
    }
  };

  return {
    // GET请求
    get: (url, params = {}, options = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;
      return request(fullUrl, { method: 'GET', ...options });
    },

    // POST请求
    post: (url, data = {}, options = {}) => {
      return request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options,
      });
    },

    // PUT请求
    put: (url, data = {}, options = {}) => {
      return request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options,
      });
    },

    // DELETE请求
    delete: (url, options = {}) => {
      return request(url, { method: 'DELETE', ...options });
    },

    // 直接调用request方法
    request,
  };
};
const simpleApi = createAPI();

export default simpleApi;

