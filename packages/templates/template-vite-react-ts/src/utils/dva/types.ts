import { Dispatch } from 'redux';
import { EffectsCommandMap as DvaEffectsCommandMap, EffectType } from 'dva';
import { cancel, take } from 'redux-saga/effects'

interface Put {
  <A extends object = any>(action: A): any;
  resolve<A extends object = any>(action: A): Promise<any>;
}

interface Select {
  <T = StateFromModel, K = object>(fn: (state: T) => K): K;
}

export interface EffectsCommandMap extends DvaEffectsCommandMap {
  put: any;
  call<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>): any;
  select: Select;
  take: typeof take;
  cancel: typeof cancel;
  [key: string]: any;
}

export interface AnyAction {
  type: any;
  payload: any;
}

export interface ActionWithState<State> {
  type: any;
  payload: State;
}

export interface Selector<TState, TSelected> {
  (state: TState): TSelected;
}

export type StateFromModel = {
  [K in keyof Actions]: Actions[K]['state'];
}

export interface BaseDispatchContent {
  [key: string]: { [name: string]: any | Function }
}

type OutDispatchContent<T extends BaseDispatchContent> = {
  [P in keyof T]: {
      [U in keyof T[P]]: T[P][U] extends (...args: any[]) => Generator<any, infer RT, any>
          ? (...args: Parameters<T[P][U]>) => Promise<RT>
          : (...args: Parameters<T[P][U]>) => void;
  };
};

export type OutDispatch<T extends BaseDispatchContent> = {
  <TDispatch extends Dispatch>(...args: Parameters<TDispatch>): ReturnType<TDispatch>;
} & OutDispatchContent<T>;

export interface EffectOptions {
  type: EffectType;
  // 当type 为throttle 时使用，设置节流时间
  ms: number;
}