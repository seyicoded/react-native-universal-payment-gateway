### Announcements

*   📣 We are proud to announce the release of our universal gateway package for both android and ios on RN
*   💡 We've just added a logically payment webview what does exactly what it's supposed too, feel free to try it out [New].
*   💡 Package initially was JS but utilizes TS for all its implementation to give it users free access to type per implementation.
*   🙏 If you have a question, feel free to open a new issue as the package will be regularly maintained...

---

## REACT NATIVE UNIVERSAL PAYMENT GATEWAY

*   Library available for both **android** and **ios**
*   compatible with plain react-native and expo

![](https://github.com/seyicoded/react-native-universal-payment-gateway/blob/main/assets/universal/paystack.gif?raw=true)

![](https://github.com/seyicoded/react-native-universal-payment-gateway/blob/main/assets/universal/flutterwave.gif?raw=true)

![](https://github.com/seyicoded/react-native-universal-payment-gateway/blob/main/assets/universal/photo.png?raw=true)

---

**setup**

to utilize simple install

```diff
npm install react-native-universal-payment-gateway react-native-webview
```

```diff
yarn add react-native-universal-payment-gateway react-native-webview
```

```diff
expo install react-native-universal-payment-gateway react-native-webview
```

**Not Using Expo, no problem**

**ANDROID**

if using RN > 0.6, then just re-build,

else, just upgrade ab🌝g

**IOS**

simple run 

```diff
cd ios && pod install
```

then re-build

---

**USAGE:**

import package

```typescript
import Gateway from 'react-native-universal-payment-gateway'
```

**SAMPLE UTILIZATION**

```typescript
const App = () => {
const [showPaystack, setShowPaystack] = useState(false)
const [showFlutterwave, setShowFlutterwave] = useState(false)
const [showUniversal, setShowUniversal] = useState(false)
const [showWebView, setShowWebView] = useState(false)

return (
<SafeAreaView style={{ flex: 1 }}>
{/*
* key note
* always place the components from this library on your outtermost instance component
*/}


<Gateway.payStack
email='opadonuseyi01@gmail.com'
amount={'8000'}
currency={"NGN"}
paystackSecretKey={'sk_test_ac8971390ed43c9b29074c23f4bdaddccc24b865'}
channels={['card']}
callbackUrl={'https://www.sctidev.com/callback'}
show={showPaystack}
onCallback={async (e)=>{
console.log("data returns is ",e)


// to validate, returns {status: srring, data: {data} }
// status is success for success on paystack
await Gateway.validatePaystackPayment({
apiKey: 'sk_test_ac8971390ed43c9b29074c23f4bdaddccc24b865',
tnxRef: e.tnxref
})

}}
onShow={setShowPaystack} />


<Gateway.flutterWave
email='opadonuseyi01@gmail.com'
amount={'8000'}
currency={"NGN"}
flutterwaveSecretKey={'FLWSECK_TEST-4e2a106fa0b255596d20f29c9d41775f-X'}
channels={['card']}
callbackUrl={'https://www.sctidev.com/callback'}
show={showFlutterwave}
onCallback={async (e)=>{
console.log("data returns is ",e)
if(e.tnxref == "/pay_canceled=true"){
              return
            }

}}
onShow={setShowFlutterwave}
/>

<Gateway.webview
          paymentUrl={'https://api.flutterwave.com/v3/payments'}
          // callback uri from your init api request to create
          callbackUrl={'https://www.sctidev.com/callback'}
          show={showWebView}
          onCallback={async (e)=>{
            console.log("data returns is ",e)
            if(e.tnxref == "/pay_canceled=true"){
              return
            }

          }}
          onShow={setShowWebView} />


<Gateway.universal
paymentGatewayUrlRequestUrlUrl={'https://api.flutterwave.com/v3/payments'}
tRefObject={
{
tx_ref: "TNXRE_F124243642"
}
}
headerContent={{
"Authorization" : "Bearer FLWSECK_TEST-4e2a106fa0b255596d20f29c9d41775f-X",
'Content-Type': "application/json"
}}
email='opadonuseyi01@gmail.com'
amount={'8000'}
currency={"NGN"}
universalSecretKey={'FLWSECK_TEST-4e2a106fa0b255596d20f29c9d41775f-X'}
channels={['card']}
callbackUrl={'https://www.sctidev.com/callback'}
show={showUniversal}
onCallback={async (e)=>{
console.log("data returns is ",e)

}}
onShow={setShowUniversal} />


<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>


<Text style={[styles.title]}>
UNIVERSAL PAYMENT GATEWAY LIBRARY
</Text>


<TouchableOpacity onPress={()=> setShowPaystack(true)} style={[styles.btnContainer]}>
<Text style={[styles.button]}>click for paystack</Text>
</TouchableOpacity>


<TouchableOpacity onPress={()=> setShowFlutterwave(true)} style={[styles.btnContainer]}>
<Text style={[styles.button]}>click for flutterwave</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setShowWebView(true)} style={[styles.btnContainer]}>
            <Text style={[styles.button]}>click to load logically payment webview </Text>
          </TouchableOpacity>


<TouchableOpacity onPress={()=> setShowUniversal(true)} style={[styles.btnContainer]}>
<Text style={[styles.button]}>click to utilize universal </Text>
</TouchableOpacity>


<Text style={[styles.foot]}>
&copy; seyicoded
</Text>
</View>
</SafeAreaView>
);
};
```

**Feel free to reach out for any urgent feature or requirement as we currently plan on regularly maintaining this library.**