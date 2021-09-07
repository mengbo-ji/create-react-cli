
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend, RequestOptionsInit } from 'umi-request';
import { message } from 'antd';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  message.error(response?.statusText || 'Response Error');
  return response || {};
};

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  const headers = {
    'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN'),
  };
  return {
    url,
    options: { ...options, headers },
  };
});

request.interceptors.response.use(async (response: Response) => {
  const res = await response.clone().json();
  const { code = '', msg = 'Response Error' } = res;
  if (code === 200) {
    return res;
  } else {
    message.error(msg);
    return {};
  }
});

export default request;
