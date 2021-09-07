import { parse, stringifyUrl, stringify } from 'query-string';

/**
 * 解析参数
 * @param {string} s 需要解析的字符串
 * @return {object} 参数对象
 */
export const parseQuery = (s = ''): { [key: string]: any } => {
  return parse(s || window.location.search);
};

/**
 * 生成 URL
 * @param {object} query 参数对象
 * @param {string} href href
 * @return {string} 拼装好的URL
 */
export const generateUrl = (query: { [key: string]: string }, href?: string): string => {
  const parsed = parseQuery();
  Object.assign(parsed, query);
  return stringifyUrl({ url: href ? href : location.href, query: parsed });
};

/**
 * 跳转路由
 * @param {any} history dva的history
 * @param {string} pathname 需要跳转的路由
 * @param {object} query 参数
 */
export const pushUrl = (history: any, pathname: string, query?: { [key: string]: string | undefined | null | number }) => {
  const currentQuery = parseQuery();
  history.push(`${pathname}?${stringify(Object.assign(currentQuery, query))}`);
};

/**
 * 获取 url params
 * @param {string} name 需要获取的参数名
 * @return {string | null} 参数值
 */
export const getParams = (name: string): string | null => {
  const parsed = parseQuery();
  const res = parsed[name];
  if (res) {
    return res === 'undefined' || res === 'null' || res === 'false' ? null : decodeURIComponent(res);
  }
  return null;
};

/**
 * 动态设置 url params
 * @param {string} name 需要设置的参数名
 * @param {any} value 需要设置的参数值
 */
export const setParams = (function(window) {
  return function(name: string, value: any) {
    const _originHref = window.location.origin + window.location.pathname;
    if (!name) {
      return;
    }

    let query = {};
    if (typeof name === 'string') {
      query = {
        [name]: value,
      };
    }
    if (Object.prototype.toString.call(name) === '[object Object]') {
      query = name;
    }

    const parsed = parseQuery();
    const historyStr = `?${stringify(Object.assign({}, parsed, query))}`;

    if (window.history.replaceState) {
      const url = _originHref + historyStr;
      window.history.replaceState(null, '', url);
    } else {
      window.location.hash = historyStr;
    }
  };
})(window);

/**
 * 动态删除 url params
 * @param {string} name 需要删除的参数名
 */
export const removeParams = (function(window) {
  return function(name: string) {
    const _originHref = window.location.origin + window.location.pathname;
    if (!name) {
      return;
    }

    let removeList: any = [];
    const nameType = Object.prototype.toString.call(name);
    if (nameType === '[object String]') {
      removeList.push(name);
    } else if (nameType === '[object Array]') {
      removeList = name;
    } else if (nameType === '[object Object]') {
      removeList = Object.keys(name);
    } else {
      return;
    }

    const parsed = parseQuery();
    Object.keys(parsed).forEach((val: string) => {
      if (removeList.includes(val)) {
        delete parsed[val];
      }
    });

    const historyStr = `?${stringify(Object.assign({}, parsed))}`;

    if (window.history.replaceState) {
      const url = _originHref + historyStr;
      window.history.replaceState(null, '', url);
    } else {
      window.location.hash = historyStr;
    }
  };
})(window);