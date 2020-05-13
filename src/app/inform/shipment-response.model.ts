export class Shipment{
    constructor(
        public id: string,
        public filename: string,
        public shipmentDate: string,
        public invoiceNo : string,
        public format: string,
        public channel: string,
        public count: number,
        public reason: string
    ){}
}