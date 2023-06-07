export interface UserDetails {
  CanWrite: boolean;
  extjsUrl: string;
  UserStat: boolean;
  username: string;
  company: string;
  company_name: string;
}

export interface Factory {
  Code: string;
  Name: string;
}

export interface WorkCenterType {
  TpCode: string;
  TpName: string;
}

export interface WorkCenter {
  Code: string;
  Desc: string;
  DescLocal: string;
  Name: string;
  TpCode: string;
  checkSOP: boolean;
  includeOffOpr: boolean;
  isBatch: boolean;
  nonWorkingDays: number[];
  numOfOprBfr: number;
}

export interface WorkCenterList {
  type: WorkCenterType[];
  wc: WorkCenter[];
}

export interface Machine {
  Code: string;
  Desc: string;
  DescLocal: string;
}

export interface PlannerInterface {
  user: Array<UserDetails>;
  factory: Array<Factory>;
  workCenter: Array<WorkCenter>;
  workCenterType: Array<WorkCenterType>;
  machine: Array<Machine>;
}
