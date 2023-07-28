export class TransactionData {
  collection_id: string;
  collection_status: string;
  payment_id: string;
  status: string;
  external_reference: string;
  payment_type: string;
  merchant_order_id: string;
  preference_id: string;
  site_id: string;
  processing_mode: string;
  merchant_account_id: string;

  constructor(collection_id:string,collection_status:string,payment_id:string,status:string,
    external_reference:string,payment_type:string,merchant_order_id:string,preference_id:string,
    site_id:string,processing_mode:string,merchant_account_id:string) {
    this.collection_id = collection_id;
    this.collection_status = collection_status;
    this.payment_id = payment_id;
    this.status = status;
    this.external_reference = external_reference;
    this.payment_type = payment_type;
    this.merchant_order_id = merchant_order_id;
    this.preference_id = preference_id;
    this.site_id = site_id;
    this.processing_mode = processing_mode;
    this.merchant_account_id = merchant_account_id;
  }
}
//collection_id=1316775349&collection_status=approved&payment_id=1316775349&status=approved&external_reference=null&payment_type=account_money&merchant_order_id=10645438123&preference_id=1432532872-bbcd2abe-f208-4a38-84e9-7c09ab5b0acc&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
