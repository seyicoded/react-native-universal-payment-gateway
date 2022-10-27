import { View, BackHandler, Text, Modal, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'

export default function Popup({children, end}) {
    const [show, setShow] = useState(true)
    BackHandler.addEventListener('hardwareBackPress', ()=>{
        setShow(false);
        try{
          end();
        }catch(e){}
        return false;
    })

    useEffect(()=>{
        return ()=>{
            BackHandler.removeEventListener('hardwareBackPress', ()=>{
              return true;
            });
        }
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
            console.log('')
            try{
              end();
            }catch(e){}
            }}
            onDismiss={()=>{
              try{
                end();
              }catch(e){}
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {children}

                <Text
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: 14,
                  overflow: 'hidden',
                  position: 'absolute',
                  padding: 12,
                  bottom: 0,
                  right: 0,
                  margin: 12
                }}
                onPress={()=>{
                  try{
                    end();
                  }catch(e){}
                }}>End Session</Text>
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
      marginTop: 0,
      paddingTop: 30,
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
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