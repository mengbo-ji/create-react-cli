import { BaseDispatchContent, OutDispatch, Selector, StateFromModel } from './types';
import { modelsContainer } from './container';
import { useSelector as reactReduxUseSelector, shallowEqual } from 'react-redux';
import { useDispatch as useDvaDispatch } from 'dva';

/**
 * 使用 Proxy 代理 actions 用来增强 useDispatch 返回的 dispatch
 * 使用 dispatch.test.add() 的形式 代替 dispatch(actions.test.add()) 的方式来调用;
 */
const useEnhanceDispatch = <T extends BaseDispatchContent = any>(actions?: Map<string, any>): OutDispatch<T> => {
  const dispatch = useDvaDispatch() as any;
  if (actions) {
    actions.forEach((value, key) => {
      dispatch[key] = new Proxy(
        {},
        {
          get(_, paraKey) {
            return function (...args: any[]) {
              return dispatch(value[paraKey](...args, { withNameSpace: true }));
            };
          },
        }
      );
    });
  }
  return dispatch;
};

const useDipatch = <T extends keyof Actions = keyof Actions>() => {
  return useEnhanceDispatch<Pick<Actions, T>>(modelsContainer.get());
}

const useSelector = <TState extends StateFromModel & { loading: any }, TSelected>(
  selector: Selector<TState, TSelected>,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => {
  return reactReduxUseSelector<TState, TSelected>(selector, equalityFn || shallowEqual);
};

export {
  useDipatch,
  useSelector,
};
