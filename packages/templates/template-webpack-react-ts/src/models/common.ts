import { BaseModel, dvaModel, effect, reducer, subscription } from 'utils/dva';
import createService from '../utils/createService';

interface ICommonState {
  [key: string]: any
}

const DEFAULT_STATE: ICommonState = {
  licensekey: 1,
};

@dvaModel('common')
class Common extends BaseModel {
  state: ICommonState = DEFAULT_STATE;

  @subscription
  whenLocationChange() {
    console.log('触发了');
  }

  @effect()
  *getLicenseKey() {
    const res: {} = yield effect.call(createService('api/xxx', 'get'));
  }

  @reducer
  setLicenseKey(licenseKey: string) {
    return {
      ...this.state,
      licenseKey,
    };
  }
}

export default new Common().model;

declare global {
  interface Actions {
    common: Common;
  }
}
