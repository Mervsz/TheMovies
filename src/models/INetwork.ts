export interface INetwork<T>{
  status: INetworkStatus
  data?: T
} 

type INetworkStatus = 'success' | 'failed'