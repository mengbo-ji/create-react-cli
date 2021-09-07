import 'reflect-metadata';
import { EffectsCommandMap } from './types';
import { MODEL } from './symbol';
import { modelsContainer } from './container';

export class BaseModel {

  protected effects!: EffectsCommandMap;
  originalState: any = {};
  state: any = {};
  model = Reflect.getMetadata(MODEL, this);
  root: any = new Proxy(modelsContainer, {
    get(target, prop) {
      return target.get(prop as string);
    },
  });
  constructor() {
    if (new.target === BaseModel) {
      throw new Error('BaseModel不能实例化');
    }
    const that = this;
    this.originalState = new Proxy({}, {
      get(target, prop) {
        return JSON.parse(JSON.stringify(that.state[prop]));
      },
    });
  }
}
