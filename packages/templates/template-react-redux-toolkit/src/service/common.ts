import { GET, POST } from 'config/constant';
import { ILoginReq } from 'config/interface';
import createService from 'utils/createService';

class Content {
  // 菜单
  getMenuData() {
    return createService('/auth/menuData', GET);
  }
  // 登录
  login(params: ILoginReq) {
    return createService('/auth/login', POST, params);
  }
  // 登出
  logout() {
    return createService('/auth/logout', GET);
  }
}

export default new Content();
