export interface IsStation {
     stationID: number;
     stationName: string;
     stationCode: string;
}
export interface StationList {
     data: IsStation[];
}
export interface RegisterDetails {
     email: string,
     password: string,
     name: string,
     hometown: string,
     mobileNumber:string,
     state:string
     
}



export interface AddStation {
     "trainname": "",
     "trainnumber": Number,
     "boardingtime": "",
     "boardingstation": "",
     "boardingday": "",
     "totaltraveltime": "",
     "departuretime": " ",
     "departurestation": "",
     "departureday": "",
     "totaljourneytime": ""
}