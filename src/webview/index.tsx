import React, {useEffect, useState} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {WebViewProps} from '../constant/type'
import WebView from 'react-native-webview'
import Popup, {styles} from '../wrapper/popup'
import axios from 'axios'

const tnxRef = (new Date()).getTime();

// show
export default function Paystack({
  show,
  loaderColor = 'green',
  paymentUrl,
  callbackUrl,
  onCancel= ()=>{},
  onShow,
  onCallback,

}: WebViewProps): JSX.Element {

  const [_show, _setShow] = useState(true)
  const [_isLoading, _setIsLoading] = useState(true)
  const [_hasLoaded, _sethasLoaded] = useState(false)
  const [url, setUrl] = useState(paymentUrl)

  useEffect(()=>{
    // get url
    if(!show){return }
    (async()=>{
      try{
        
        // console.log("auth_url: "+_res.data.data.authorization_url)
        _sethasLoaded(true)
        setUrl('https://sleepy-river-58406.herokuapp.com/')
        setTimeout(()=>{
          setUrl(paymentUrl)
        }, 300)

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
    <Popup end={()=>{
        onShow(false);
        onCancel();
        _setShow(false)
    }}>
      {
        (_isLoading && (
          <View style={ styles.loaderContainer }>
            <ActivityIndicator color={loaderColor} />
          </View>
        ))
      }
      <WebView key={"0"} onNavigationStateChange={navState =>{
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
      }} scalesPageToFit style={{ flex: 1, }} javaScriptEnabled={true} onLoadEnd={()=> _setIsLoading(false)} source={{ uri: url }} />
    </Popup>
  )
}