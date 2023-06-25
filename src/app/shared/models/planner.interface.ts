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

export interface ICompany {
  company: string;
  desc: string;
  motherCmp: string;
}

export interface IUnloadedOrders {
  Duration: string;
  Name: string;
  Setup: number;
  UnStnTime: string;
  allowHday: boolean;
  blankStock: string;
  codeStock: string;
  commitDate: string;
  commitWek: string;
  curStationDist: string;
  currentOper: string;
  currentStation: string;
  currentStnQty: string;
  diameter: string;
  die: string;
  dieDesc: string;
  drawingNumber: string;
  drillDiameter: string;
  err: boolean;
  factory: string;
  geo: string;
  grindWheel: string;
  grindWheelDS: string;
  grindWheelStk: string;
  height: string;
  id: string;
  insQtyOneSpit: string;
  isBRB: boolean;
  isCNF: boolean;
  isFAI: boolean;
  isFuture: boolean;
  isInWhs: string;
  isLotExpired: boolean;
  isMRB: boolean;
  isMTC: boolean;
  isOnTheWay: boolean;
  isTLS: boolean;
  isVIP: boolean;
  isWCNC: boolean;
  isWDieAcc: boolean;
  isWDraw: boolean;
  isWGrW: boolean;
  isWMaster: boolean;
  isWRawMat: boolean;
  itemDesc: string;
  itemGrade: string;
  itemNumber: string;
  itemPrevLoadMch: string;
  itemPrevLoadSeq: string;
  lUpdate: string;
  lastMachineprd: string;
  manGroup: string;
  matSize: string;
  monthlyLvlStk: string;
  oldItem: string;
  openedReported: boolean;
  operReqDate: number;
  operation: string;
  ordWeight: string;
  orderDesc: string;
  orderQuantity: string;
  orderStatus: string;
  orgDuration: string;
  partQty: string;
  prio1Qty: string;
  prio2Qty: string;
  prio3Qty: string;
  promiseDate: string;
  promiseWeek: string;
  qtyOfSpit: string;
  rank: string;
  rawVal: string;
  rawValDs: string;
  relativeToRrn: string;
  requestDate: string;
  requestWeek: string;
  rrn: string;
  runNum: string;
  runPrcnt: string;
  runQty: string;
  sORw: string;
  size: string;
  sizeRange: string;
  sop1: string;
  sop2: string;
  twinId: string;
  volume: any;
  wcn: string;
  wcnTyo: string;
}
export interface ILoadedOrders {
  id: string;
  rrn: string;
  resourceId: string;
  twinId: string;
  operation: string;
  Name: string;
  itemNumber: string;
  itemDesc: string;
  itemGrade: string;
  orderDesc: string;
  Setup: number;
  Duration: string;
  orgDuration: string;
  openedReported: boolean;
  isPlanned: boolean;
  startDate: string;
  endDate: string;
  orderQuantity: string;
  promiseWeek: string;
  UnStnTime: string;
  requestWeek: string;
  requestDate: string;
  operReqDate: string;
  promiseDate: string;
  monthlyLvlStk: string;
  codeStock: string;
  sORw: string;
  seq: string;
  isLate: boolean;
  diameter: string;
  geo: string;
  size: string;
  manGroup: string;
  currentStation: string;
  curStationDist: string;
  sop1: string;
  sop2: string;
  allowHday: boolean;
  empNum: string;
  empName: string;
  err: boolean;
  trnRrn: string;
  die: string;
  dieDesc: string;
  runQty: string;
  partQty: string;
  runPrcnt: string;
  prio1Qty: string;
  prio2Qty: string;
  prio3Qty: string;
  drillDiameter: string;
  oldItem: string;
  drawingNumber: string;
  rank: string;
  sizeRange: string;
  blankStock: string;
  lastMachineprd: string;
  grindWheel: string;
  grindWheelStk: string;
  grindWheelDS: string;
  matSize: string;
  currentStnQty: string;
  runNum: string;
  lUpdate: string;
  currentOper: string;
  orderStatus: string;
  commitWek: string;
  commitDate: string;
  isFuture: boolean;
  rawVal: string;
  rawValDs: string;
  isInWhs: string;
  ordWeight: string;
  qtyOfSpit: string;
  insQtyOneSpit: string;
  relativeToRrn: string;
  factory: string;
  wcn: string;
  isVIP: boolean;
  isMTC: boolean;
  isOnTheWay: boolean;
  isMRB: boolean;
  isCNF: boolean;
  isFAI: boolean;
  isTLS: boolean;
  isBRB: boolean;
  isAfPressAtmpt: boolean;
  isRedyForPress: boolean;
  isPressAtmpt: boolean;
  isAlloc: boolean;
  isIssued: boolean;
  isLotExpired: boolean;
  isSetNotRedy: boolean;
  isWMaster: boolean;
  isWDieAcc: boolean;
  isWRawMat: boolean;
  isWCNC: boolean;
  isWGrW: boolean;
  isWDraw: boolean;
}

export interface IResource {
  id: string;
  desc: string;
  Group: string;
  name: string;
}
