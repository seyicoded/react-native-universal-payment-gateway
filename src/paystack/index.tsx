import React, {useEffect, useState, useRef} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {PaystackProps} from '../constant/type'
import WebView from 'react-native-webview'
import Popup, {styles} from '../wrapper/popup'
import axios from 'axios'

const tnxRef = (new Date()).getTime();

// show
export default function Paystack({
  show,
  loaderColor = 'green',
  paystackSecretKey,
  email,
  amount,
  callbackUrl,
  channels,
  otherObjectFromOfficialDoc = {},
  onCancel= ()=>{},
  onShow,
  onCallback,
  currency

}: PaystackProps): JSX.Element {

  const [_show, _setShow] = useState(true)
  const [_isLoading, _setIsLoading] = useState(true)
  const [_hasLoaded, _sethasLoaded] = useState(false)
  const [url, setUrl] = useState('https://sleepy-river-58406.herokuapp.com/')
  const WebViewRef = useRef(null);

  useEffect(()=>{
    // get url
    if(!show){return }
    (async()=>{
      try{
        const body = {
          email,
          amount: `${amount}00`,
          reference: tnxRef,
          callback_url: callbackUrl,
          channels,
          ...otherObjectFromOfficialDoc,
          currency
        }
        
        

        const _res: any = await axios.post('https://api.paystack.co/transaction/initialize', body, {
          headers: {
            "Authorization" : "Bearer "+paystackSecretKey,
            'Content-Type': "application/json"
          },
        })
  
        console.log("auth_url: "+_res.data.data.authorization_url)
        _sethasLoaded(true)
        setUrl('https://sleepy-river-58406.herokuapp.com/');
        // setUrl("about:blank");
        setTimeout(()=>{
          setUrl('https://sleepy-river-58406.herokuapp.com/');
          WebViewRef.current.injectJavaScript(`window.location.href = 'https://hhh.com'`)
          WebViewRef.current.injectJavaScript(`window.location.href = '${_res.data.data.authorization_url}'`)
          // setUrl(_res.data.data.authorization_url)
        }, 600)

        if( (_res.data.data.authorization_url) == undefined ){
          _setShow(false)
          onShow(false);
          // show = false
        }
      }catch(e){
        console.log(e)
        console.log(e.response.data)
        _setShow(false)
        onShow(false);
        // show = false
        // console.log(e.response)
      }

    })()
  }, [show])

  useEffect(()=>{
    _setShow(show)
    // show = show;
  }, [show])

  if(!show){
    return (<></>)
  }


  // if(!(_show)){
  //   return (<></>)
  // }

  // if((!_hasLoaded)){
  //   return (
  //     <Popup>
  //       {
  //         (_isLoading && (
  //           <View style={ styles.loaderContainer }>
  //             <ActivityIndicator color={loaderColor} />
  //           </View>
  //         ))
  //       }
  //     </Popup>
  //   )
  // }

  return (
    <Popup>
      {
        (_isLoading && (
          <View style={ styles.loaderContainer }>
            <ActivityIndicator color={loaderColor} />
          </View>
        ))
      }
      <WebView onNavigationStateChange={navState =>{
        console.log(navState)
        if(((navState.url == 'about:blank') || (navState.url == "https://sleepy-river-58406.herokuapp.com/")) && (navState.canGoForward == true)){
          onShow(false);
          onCancel();
          // show = false
          _setShow(false)
        }

        if(((navState.url).includes(callbackUrl)) ){
          // extract data
          let str = (navState.url).replace(callbackUrl, '');
          str = str.replace("?trxref=", '');
          onCallback({
            tnxref: str,
            instruction: "payment recieved but we advise you validate using the rest validate api or our validate function"
          })
          // onCallback

          onShow(false);
          onCancel();
          // show = false
          _setShow(false)
        }
      }} scalesPageToFit style={{ flex: 1, }} javaScriptEnabled={true} onLoadEnd={()=> _setIsLoading(false)} source={{ uri: url, }} injectedJavaScript={`
        // window.onbeforeunload = function (e){
        //   document.write('.')
        // }
      `} ref={_ref=>{
        WebViewRef.current = _ref;
        // _ref.injectJavaScript("")
        // _ref.
        // _ref.injectJavaScript(`
        //   window.onbeforeunload = function (e){
        //     document.write('.')
        //   }
        // `)
      }} />
    </Popup>
  )
}