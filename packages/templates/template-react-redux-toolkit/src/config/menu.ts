export const menus = [
  {
    path: '/overview',
    name: '概览',
    icon: 'AuditOutlined',
  },
  {
    path: '/list',
    name: '列表',
    icon: 'CalendarOutlined',
    children: [
      {
        path: '/list/list1',
        name: '列表1',
      },
      {
        path: '/list/list2',
        name: '列表2',
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    icon: 'SmileOutlined',
  },
]

export const getMenu = ():Promise<any> => {
  return new Promise(resolve => {
    resolve({
      code: 200,
      message: 'success',
      success: true,
      data: {
        username: '张三',
        loginName: 'zhagnsan',
        menus,
      },
    });
  });
};
