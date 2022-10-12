import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, 
   StyleSheet,
   Dimensions, } from 'react-native';
import { black, blue, grey, lightGray, sky_blue, white } from "../constant/img/Colors/color";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import {launchCamera} from 'react-native-image-picker';


//global styleSheet
const style = require("../StyleSheet/Styles");

const options = {
   title: 'Pick an Image',
   storageOptions: {
     skipBackup: true,
     path: 'images',
   },
};


class CapturePhoto extends Component{

   constructor(props){
      super(props);
      this.state = {

      }
   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }
   
   camera =()=>{

      launchCamera(options, (response)=>{
          
          if(response.didCancel){
              console.warn(response)
              console.warn("User cancelled image picker");
          } else if (response.error){
              console.warn('ImagePicker Error: ', response.error);
          }else{
              // const source = {uri: response.assets.uri};
            let path = response.assets.map((path)=>{
                return (
                    console.warn(path.uri)   
                )
            })
            this.setState({image:path.uri}) 
          }
      })
    }


   render(){
      return(
         <View style={style.container}> 
         <SafeAreaView style={style.safeAreaView}>
            
            {/* custom header */}
            <View style={[style.header, { flexDirection: "row", justifyContent: "space-between" }]}>
               <View style={{ flexDirection: "row", left: 5, justifyContent: "center" }}>
                  <TouchableOpacity style={{ marginTop: 6 }} onPress={() => this.handleBackButtonClick()}>
                      <Icon name="chevron-back-outline" color={black} size={25} type="ionicon" />
                  </TouchableOpacity>
                  <View style={{ justifyContent: "center" }}>
                      <Text style={style.headerText} onPress={()=>this.camera()}>Capture Live Photo</Text>
                  </View>
              </View>
            </View>

            <View style={styles.blueBox}>
               <Text style={styles.text}>Place your face along with your vehicle</Text>
               <Text style={styles.text}>for 3 seconds to capture live photo</Text>
            </View>

            <View style={styles.box}>

            </View>

           
      </SafeAreaView>
      </View>
         
                     
     );
   }
}


export default CapturePhoto;


const styles = StyleSheet.create({
   blueBox:{
      backgroundColor:blue,
      padding:15,
      justifyContent:"center",
      alignItems:"center",
   },
   text:{
      color:white,
      fontSize:RFValue(14,580),
      fontFamily:"Poppins-Medium",
   },
   box:{
      height:250,
      width:Dimensions.get('window').width/1.3,
      borderWidth:1,
      alignSelf:"center",
      borderColor:blue,
      marginTop:100
   }

})