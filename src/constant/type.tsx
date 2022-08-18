export type PaystackProps = {
  show: boolean; // to show 
  loaderColor?: string;
  paystackSecretKey: string;
  email: string;
  amount: string;
  callbackUrl: string;
  channels?: []|any;
  otherObjectFromOfficialDoc?: Object|any|{};
  onCancel?: Function;
  onCallback: (props: Object)=>any;
  onShow: any
}

export type FlutterProps = {
  show: boolean;
  loaderColor?: string;
}

export type UniversalProps = {
  show: boolean;
  loaderColor?: string;
}