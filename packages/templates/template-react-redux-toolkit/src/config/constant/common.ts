// 机审状态
// 审核方式
export const HIT_STATUS = [
  { label: '通过', value: 'Accept', backgroundColor: 'rgba(47, 194, 91, .1)', color: '#2FC25B' },
  { label: '拒绝', value: 'Reject', backgroundColor: 'rgba(250, 84, 28, .1)', color: '#FA541C ' },
  { label: '疑似', value: 'Review', backgroundColor: 'rgba(250, 173, 20, .1)', color: '#FAAD14' },
];

// 人审状态
export const HUMAN_STATUS = [
  { label: '通过', value: 'Accept', backgroundColor: 'rgba(47, 194, 91, .1)', color: '#2FC25B' },
  { label: '拒绝', value: 'Reject', backgroundColor: 'rgba(250, 84, 28, .1)', color: '#FA541C ' },
  { label: '未审核', value: 'Review', backgroundColor: 'rgba(250, 173, 20, .1)', color: '#FAAD14' },
];

// 任务状态
export const TASK_STATUS = [
  { label: '未开始', value: 'Init', backgroundColor: 'rgba(250, 173, 20, .1)', color: '#FAAD14' },
  { label: '捞取中', value: 'DataGeting', backgroundColor: 'rgba(22, 136, 243, .1)', color: '#1688F3' },
  { label: '待审核', value: 'PendingAudit', backgroundColor: 'rgba(250, 173, 20, .1)', color: '#FAAD14' },
  { label: '审核中', value: 'Auditing', backgroundColor: 'rgba(22, 136, 243, .1)', color: '#1688F3' },
  { label: '待复审', value: 'PendingReview', backgroundColor: 'rgba(250, 173, 20, .1)', color: '#FAAD14' },
  { label: '复审中', value: 'Reviewing', backgroundColor: 'rgba(22, 136, 243, .1)', color: '#1688F3' },
  { label: '待质检', value: 'PendingCheck', backgroundColor: 'rgba(250, 173, 20, .1)', color: '#FAAD14' },
  { label: '质检中', value: 'Checking', backgroundColor: 'rgba(22, 136, 243, .1)', color: '#1688F3' },
  { label: '质检完成', value: 'CheckOver', backgroundColor: 'rgba(47, 194, 91, .1)', color: '#2FC25B' },
  { label: '完成', value: 'Finish', backgroundColor: 'rgba(47, 194, 91, .1)', color: '#2FC25B' },
  { label: '失败', value: 'Fail', backgroundColor: 'rgba(250, 84, 28, .1)', color: '#FA541C ' },
];

// 模板类型
export const TEMPLATE_TYPE = [
  { label: '标签体系', value: 'TemplateNormal' },
  { label: '自定义', value: 'TemplateCustom' },
];

export const JOB_TYPE = [
  { label: '运营分析类', value: 'ruleLabel' },
  { label: '算法训练类', value: 'modelLabel' },
];

export const SAMPLE_MODE = [
  { label: '色情', value: 'PORN_RECOGNITION_MODEL' },
  { label: '赌毒', value: 'GAMBLE_POISON_MODEL' },
  { label: '暴恐', value: 'VIOLENT_TERROR_MODEL' },
];

