import moment from 'moment';

export * from './common';

export const RANGE_PICKER_RANGES: { [key: string]: [moment.Moment, moment.Moment] } = {
  今天: [ moment().startOf('day'), moment().endOf('day') ],
  昨天: [ moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day') ],
  最近一周: [ moment().subtract(6, 'days').startOf('day'), moment().endOf('day') ],
  最近一个月: [ moment().subtract(1, 'months').startOf('day'), moment().endOf('day') ],
  最近三个月: [ moment().subtract(3, 'months').startOf('day'), moment().endOf('day') ],
};

export const format = 'YYYY-MM-DD HH:mm:ss';
export const startFormat = 'YYYY-MM-DD 00:00:00';
export const endFormat = 'YYYY-MM-DD 23:59:59';
export const startTime = moment(moment().subtract(6, 'days').format(startFormat));
export const endTime = moment(moment().format(endFormat));

export const initialRanges = [ startTime, endTime ];
export const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export const GET = 'GET';
export const POST = 'POST';
