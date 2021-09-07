import request from './request/responseInterceptor';
import { RequestOptionsInit } from 'umi-request';
import { message } from 'antd';
function createService(
  action: string,
  method: 'get' | 'post',
) {
  return (params = {}) => {
    const config: RequestOptionsInit = { method };
    if (method === 'get') {
      config.params = params;
    } else {
      config.data = params;
    }
    return request(action, config).catch((e: Error) => {
      message.error(e);
    })
  }
}

export default createService;
