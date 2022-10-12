import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, 
   StyleSheet, Dimensions, Platform, ImageBackground } from 'react-native';
import { black, blue, grey, lightGray, sky_blue, white } from "../constant/img/Colors/color";
import { Icon, Input} from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import moment  from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import { user_img, footerView} from "../Config.js/Constants";
import axios from 'axios';
import { api_url } from "../constant/ApiConstant/Constant";
import { img_url } from "../constant/ApiConstant/Constant";
import Toast from 'react-native-simple-toast';
import { change_password } from "../constant/ApiConstant/Constant";
//global styleSheet
const style = require("../StyleSheet/Styles");


class ChangePassword extends Component{

   constructor(props){
      super(props);
      this.state = {
         oldPassword:"",
         newPassword:"",
         confirmPassword:"",
      }

   }


   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }


   changePassword = async() =>{
      if (this.state.oldPassword == ''){
         alert('Please enter old password')
      }else if (this.state.newPassword == ''){
         alert('Please enter the new password')
      }else if (this.state.confirmPassword == ''){
         alert('Please enter the confirm password')
      }else{
             this.changePasswordApiCall()
      }
   }

   changePasswordApiCall = async() =>{
      console.log('userinfod',this.state.oldPassword, this.state.newPassword,this.state.confirmPassword)
      await axios.post(api_url+change_password,{
         driver_id: global.user, 
         old_password : this.state.oldPassword,
         password : this.state.newPassword,
         password_confirmation : this.state.confirmPassword
      },
      {
         headers:{
         "Authorization" : "Bearer "+global.token,
         "Content-Type" : "application/json",
         "Accept" : "'application/json, text/plain, */*'",
      }}
      )
      .then(async(response)=>{
         // console.warn(response.data.data)
         if(response.data.status == "1"){
            Toast.show(response.data.message);
            this.handleBackButtonClick()

         }
         else{
            alert(response.data.message);
         }
      })
      .catch(function (error) {
         console.log(error);
      }); 
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
                      <Text style={style.headerText}>Change Password</Text>
                  </View>
              </View>
            </View>

           
            <ScrollView showsVerticalScrollIndicator={false}>


               {/* input field for driver name */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
                Old Password
               </Text>
               <Input
               // value={this.state.oldPassword} 
               onChangeText={(e) => { this.setState({ oldPassword: e }) }}
               placeholder='**********'
               maxLength={10}
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               />

               {/* input field for username */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-15}]}>
                  New Password
               </Text>
               <Input
            //   value={this.state.newPassword} 
               onChangeText={(e) => { this.setState({ newPassword: e }) }}
               placeholder='************'
               maxLength={10}
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               />

               {/* input field for email */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-15}]}>
                     Confirm Password
               </Text>
               <Input
               // value={this.state.confirmPassword}
               onChangeText={(e) => { this.setState({ confirmPassword: e }) }}
               placeholder='*************'
               inputContainerStyle={style.input}
               style={{marginLeft:10}}
               />
               <View style={[styles.buttonView,{marginTop:50}]}>
                
                  <TouchableOpacity  onPress={()=> this.changePassword()} style={[styles.button,{backgroundColor:sky_blue}]}>
                     <Text style={style.text}>Submit</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
            
      </SafeAreaView>
      </View>
         
                     
     );
   }
}


export default ChangePassword;


const styles = StyleSheet.create({
   smallText:{
      fontSize:RFValue(12,580),
      fontFamily:"Poppins-Regular",
      marginRight:25,
   },
   cameraButton:{
      borderStyle:"dashed",
      borderWidth:1,
      height:90,
      justifyContent:"center",
      width:"45%",
   },
   text:{
      fontSize:RFValue(12,580),
      alignSelf:"center",
      color:grey
   },
   button:{
      borderWidth:1,
      borderColor:blue,
      padding:10,
      justifyContent:"center",
      borderRadius:5,
      width:"97%",
      alignItems:"center",
   },
   buttonView:{
      flexDirection:"row",
      justifyContent:"space-between",
      width:Dimensions.get('window').width/1.15,
      alignSelf:"center",
      marginTop:20
   },
   profileImg: {
      height: 90,
      width: 90,
      top: 6,
      borderRadius: 50,
      marginLeft:30
    },
    camIcon: {
      backgroundColor: blue,
      height: 30,
      width: 30,
      padding: 6,
      alignContent: 'center',
      borderRadius: 30,
      justifyContent: 'center',
      left: 60,
      top: -20,
      alignSelf: 'center',
    },
  

})
