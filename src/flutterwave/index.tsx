import React, {useEffect, useState} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {FlutterProps} from '../constant/type'
import WebView from 'react-native-webview'
import Popup, {styles} from '../wrapper/popup'
import axios from 'axios'

const tnxRef = (new Date()).getTime();

export default function Flutterwave({
  show,
  loaderColor = 'green',
  flutterwaveSecretKey,
  email,
  amount,
  callbackUrl,
  channels,
  otherObjectFromOfficialDoc = {},
  onCancel= ()=>{},
  onShow,
  onCallback,
  currency
}: FlutterProps): JSX.Element {
  const [_show, _setShow] = useState(true)
  const [_isLoading, _setIsLoading] = useState(true)
  const [_hasLoaded, _sethasLoaded] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(()=>{
    // get url
    if(!show){return }
    (async()=>{
      try{
        const body = {
          email,
          customer: {
            email,
            name: email
          },
          amount: `${amount}`,
          tx_ref: tnxRef,
          redirect_url: callbackUrl,
          channels,
          currency,
          ...otherObjectFromOfficialDoc
        }
        
        

        const _res: any = await axios.post('https://api.flutterwave.com/v3/payments', body, {
          headers: {
            "Authorization" : "Bearer "+flutterwaveSecretKey,
            'Content-Type': "application/json"
          },
        })
  
        console.log("auth_url: "+_res.data.data.link)
        _sethasLoaded(true)
        setUrl('http://cancel')
        setUrl(_res.data.data.link)

        if( (_res.data.data.link) == undefined ){
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

  if((!_hasLoaded)){
    return (
      <Popup>
        {
          (_isLoading && (
            <View style={ styles.loaderContainer }>
              <ActivityIndicator color={loaderColor} />
            </View>
          ))
        }
      </Popup>
    )
  }

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
        if((navState.url == 'about:blank') && (navState.canGoForward == true)){
          onShow(false);
          onCancel();
          // show = false
          _setShow(false)
        }

        if(((navState.url).includes(callbackUrl)) ){
          // extract data
          let str = (navState.url).replace(callbackUrl, '');
          str = str.replace("?tx_ref=", '');
          onCallback({
            tnxref: `${tnxRef}`,
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