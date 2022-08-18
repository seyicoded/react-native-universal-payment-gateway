
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import {Flutterwave, Paystack, Universal} from './src/index'
import Gateway from './src/index'

// console.log(Gateway.flutterWave)


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
        paystackSecretKey={'sk_test_ac8971390ed43c9b29074c23f4bdaddccc24b865'}
        channels={['card']}
        callbackUrl={'https://www.sctidev.com/callback'}
        show={showPaystack}
        onCallback={(e)=>{}}
        onShow={setShowPaystack} />

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

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: '14%',
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'center',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 250, 0.6)',
    width: '80%',
    marginBottom: 30,
    paddingVertical: 14,
    textAlign: 'center',
    borderRadius: 8,
    overflow: 'hidden'
  },
  foot: {
    position: 'absolute',
    bottom: '3%',
    opacity: 0.4
  }
});

export default App;
