// export * as Paystack from './paystack/index';
// export * as Flutterwave from './flutterwave/index';
// export * as Universal from './universal/index';

// export const Paystack =  require('./paystack/index').default;
// export const Flutterwave =  require('./flutterwave/index').default;
// export const Universal =  require('./universal/index').default;

import payStack from './paystack/index';
import flutterWave from './flutterwave/index';
import universal from './universal/index';
import webview from './webview/index';
import {validatePaystackPayment, validatePayamentPropsType, validatePayamentReturnType} from './verify';
import {FlutterProps, PaystackProps, UniversalProps, WebViewProps} from './constant/type'

type _returnProps = {
    payStack: (val: PaystackProps)=>JSX.Element|any;
    flutterWave: (val: FlutterProps)=>JSX.Element|any;
    universal: (val: UniversalProps)=>JSX.Element|any;
    webview: (val: WebViewProps) => JSX.Element|any;
    validatePaystackPayment: (val: validatePayamentPropsType) => Promise<validatePayamentReturnType>;
}

const _return: _returnProps = {
    payStack,
    flutterWave,
    universal,
    validatePaystackPayment,
    webview
};

export default _return;