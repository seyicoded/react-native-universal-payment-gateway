import { View, BackHandler, Text, Modal, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'

export default function Popup({children}) {
    const [show, setShow] = useState(true)
    BackHandler.addEventListener('hardwareBackPress', ()=>{
        setShow(false)
        return false;
    })

    useEffect(()=>{
        return ()=>{
            BackHandler.removeEventListener('hardwareBackPress', ()=>{return true});
        }
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
            console.log('')
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {children}
            </View>
            </View>
        </Modal>
    )
}

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 14,
    //   padding: 35,
    //   alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: '95%',
      width: '90%'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    loaderContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 99
    }
  });