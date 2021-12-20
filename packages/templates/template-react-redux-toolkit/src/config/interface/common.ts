
export interface ILoginReq {
  username: string;
  password: string;
}

export interface ILabelValue {
  label: string;
  value: any
}

export interface ITextLabelData {
  id: number;
  name: string;
  parentId: number;
  level: number;
  key: string;
  children: ITextLabelData[];
}

export interface ITextLabelCascader {
  label: string;
  value: string;
  children: ITextLabelCascader[];
}

export interface ITextLabelTree {
  key: string;
  title: string;
  children: ITextLabelTree[];
}


export interface IMemberData {
  label: string;
  value: string;
  key: string;
  specialtyLabel: string;
}
