import { RequestOptionsInit } from 'umi-request';
import { message } from 'antd';
import request from './request/serviceInterceptor';

function createService(
  action: string,
  method: 'GET' | 'POST',
  params = {},
) {
  const config: RequestOptionsInit = { method };
  if (method === 'GET') {
    config.params = params;
  } else {
    config.data = params;
  }
  const _action = import.meta.env.DEV ? `/api${action}` : action;
  return request(_action, config).catch((e: Error) => {
    message.error(e);
  });
}

export default createService;
