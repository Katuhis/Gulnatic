export enum IPatchStatus {
  Loaded = 0,
  NotReady = 1,
  Ready = 2
}

export default interface IPatch {
  number: string
  dateUpload: Date
  status: IPatchStatus
}
