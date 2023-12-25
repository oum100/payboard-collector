export type Merchants = {
    id:             string;              // string for mongoDB,  number for mysql
    merchantCode:   string;
    name:           string;
    secretKey:      string;
    device:         Devices[];
    createAt:       Date;
    updateAt:       Date | null;
}


export type Devices = {
    id:             string;
    deviceName:     string;
    uuid:           string;
    macAddr:        string;
    type:           string;
    status:         string;
    merchantCode:    string;
    product:        Products[];
    transaction:    Transactions[];
    createAt:       Date;
    updateAt:       Date;
}
  
export type Products = {
    id:             string;
    sku:            string;
    price:          number;
    qty:            number;
    unit:           string;
    deviceUuid:      Device;
    createAt:       Date;
    updateAt:       Date | null;
}
  
export type Transactions = {
    id:             string;
    order:          string;
    paymentId:       string;
    paymentBy:      string;
    deviceUuid:     Devices;
    amount:         number;
    status:         string;
    jobState:       string;
    createAt:       Date;
    updateAt:       Date | null;    
}
