
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { RequestOptionsInit, extend } from 'umi-request';
import { message } from 'antd';
import Cookies from 'js-cookie';

const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        ...options.headers,
        // 登录验证码key
        'Verify-Key': Cookies.get('VERIFY_KEY') ?? '',
      },
    },
  };
});

request.interceptors.response.use(async (response: Response) => {
  const res = await response.clone().json();
  const { code, message: msg = 'Response Error' } = res;
  // 未登录 | 已过期
  if (code === 20001) {
    window.location.href = '/login';
  }
  if (code === 200) {
    return res;
  }
  message.error(msg);
  Promise.reject(res);
});

export default request;
