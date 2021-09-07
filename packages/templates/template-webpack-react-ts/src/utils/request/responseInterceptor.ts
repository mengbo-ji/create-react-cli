// ref: https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.ts

/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { message } from 'antd';

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (!response) {
    message.error('响应错误');
  }
  return response;
};

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export default request;
