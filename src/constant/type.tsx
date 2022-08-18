export type PaystackProps = {
  show: boolean; // to show 
  loaderColor?: string;
  paystackSecretKey: string;
  email: string;
  amount: string;
  callbackUrl: string;
  channels?: []|any;
  currency?: string;
  otherObjectFromOfficialDoc?: Object|any|{};
  onCancel?: Function;
  onCallback: (props: {
    tnxref: string;
    instruction: string;
  })=>any;
  onShow: any
}

export type FlutterProps = {
  show: boolean; // to show 
  loaderColor?: string;
  flutterwaveSecretKey: string;
  email: string;
  amount: string;
  callbackUrl: string;
  channels?: []|any;
  currency?: string;
  otherObjectFromOfficialDoc?: Object|any|{};
  onCancel?: Function;
  onCallback: (props: {
    tnxref: string;
    instruction: string;
  })=>any;
  onShow: any
}

export type UniversalProps = {
  show: boolean; // to show 
  loaderColor?: string;
  universalSecretKey: string;
  email: string;
  amount: string;
  paymentGatewayUrlRequestUrlUrl: string;
  tRefObject: object;
  headerContent: Object|any;
  callbackUrl: string;
  channels?: []|any;
  currency?: string;
  otherObjectFromOfficialDoc?: Object|any|{};
  onCancel?: Function;
  onCallback: (props: {
    tnxref: string;
    instruction: string;
  })=>any;
  onShow: any
}