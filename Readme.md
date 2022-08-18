### Announcements

*   📣 We are proud to announce the release of our universal gateway package for both android and ios on RN
*   💡 Package initially was JS but utilizes TS for all its implementation to give it users free access to type per implementation.
*   🙏 If you have a question, feel free to open a new issue as the package will be regularly maintained.

---

## REACT NATIVE UNIVERSAL PAYMENT GATEWAY

*   Library available for both **android** and **ios**
*   compatible with plain react-native and expo

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/animations/5f97dfdb5ac66f98d7d970b6cf199014736f179388978484.gif)

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/a306626553ab9a348ef83c1bde66a9778e8b757e4464cf38.png)

---

**setup**

to utilize simple install

```diff
npm install react-native-universal-payment-gateway
```

```diff
yarn add react-native-universal-payment-gateway
```

```diff
expo install react-native-universal-payment-gateway
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

}}
onShow={setShowFlutterwave}
/>


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