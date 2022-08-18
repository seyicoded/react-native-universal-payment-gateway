import React, {useEffect, useState} from 'react'
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
  otherObjectFromOfficialDoc = {}

}: PaystackProps): JSX.Element {

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
          amount: `${amount}00`,
          reference: tnxRef,
          callback_url: callbackUrl,
          channels,
          ...otherObjectFromOfficialDoc
        }
        
        

        const _res: any = await axios.post('https://api.paystack.co/transaction/initialize', body, {
          headers: {
            "Authorization" : "Bearer "+paystackSecretKey,
            'Content-Type': "application/json"
          },
        })
  
        console.log("auth_url: "+_res.data.data.authorization_url)
        setUrl(_res.data.data.authorization_url)
        _sethasLoaded(true)

        if( (_res.data.data.authorization_url) == undefined ){
          _setShow(false)
          show = false
        }
      }catch(e){
        console.log(e)
        console.log(e.response.data)
        _setShow(false)
        show = false
        // console.log(e.response)
      }

    })()
  }, [show])

  useEffect(()=>{
    _setShow(show)
  }, [show])

  if(!show){
    return (<></>)
  }


  if(!(_show)){
    return (<></>)
  }

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
      <WebView style={{ flex: 1, }} javaScriptEnabled={true} onLoadEnd={()=> _setIsLoading(false)} source={{ uri: url }} />
    </Popup>
  )
}