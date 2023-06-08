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
  name: string;
  desc: string;
  machId: string;
}

export interface PlannerInterface {
  user: Array<UserDetails>;
  factory: Array<Factory>;
  workCenter: Array<WorkCenter>;
  workCenterType: Array<WorkCenterType>;
  machine: Array<Machine>;
}

export interface IUserDetails {
  CanWrite: boolean;
  extjsUrl: string;
  UserStat: boolean;
  username: string;
  password: string;
  gal6_login: string;
  codepage: Codepage;
  name: string;
  isVirtual: boolean;
  pdmPath: string;
  company: string;
  company_name: string;
  motherCompany: string;
  local_lang: boolean;
  right_to_left: boolean;
  connectedCompanies: ConnectedCompany[];
  success: boolean;
  changes: boolean;
  login: boolean;
  auth: number;
  defaultValues: DefaultValues;
  columns: Column[];
  encrypted_username: string;
  isFromWeb: any;
  webAmulatorPath: string;
}

export interface Codepage {
  localcp: string;
  ccsid: string;
  hebrew: string;
}

export interface ConnectedCompany {
  company: string;
  desc: string;
  motherCmp: string;
}

export interface DefaultValues {
  BROWSER: string;
  FACTORY: string;
  HOLIDAYDEF: string;
  LT: string;
  PRELOAD: string;
  RETMLTOM: string;
  RUNPRC: string;
  SAVEBTN: string;
  SCHEDCLEAR: string;
  SCNOMAX: string;
  WCNLOCK: string;
}

export interface Column {
  id: string;
  fileName: string;
  appName: string;
  width: string;
  defaultMode: boolean;
  desc: string;
  descLocal: string;
  displayType: string;
  active: boolean;
  iconURL: string;
  markOrderCol: boolean;
}

export interface IAppdefaults {
  success: boolean;
  returnArray: ReturnArray[];
}
export interface ReturnArray {
  saveBtn: boolean;
}

export interface IFactory {
  Code: string;
  Name: string;
}

export interface IWorkCenter {
  workCenters: WorkCenter[];
  wcTypes: WcType[];
}

export interface WorkCenter {
  Code: string;
  Desc: string;
  DescLocal: string;
  Name: string;
  TpCode: string;
  isBatch: boolean;
  checkSOP: boolean;
  nonWorkingDays: number[];
  includeOffOpr: boolean;
  numOfOprBfr: number;
}

export interface WcType {
  TpCode: string;
  TpName: string;
}

export interface IMachine {
  machId: string;
  desc: string;
  Name: string;
}
