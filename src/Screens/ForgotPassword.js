import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, 
   StyleSheet, Dimensions, Platform,ActivityIndicator } from 'react-native';
import { logo } from "../Config.js/Constants";
import { blue, sky_blue, white, black } from "../constant/img/Colors/color";
import { Icon, Input, CheckBox } from "react-native-elements";
import { forgot_password } from "../constant/ApiConstant/Constant";
import axios from 'axios';
import { api_url } from "../constant/ApiConstant/Constant";
import Toast from 'react-native-simple-toast';

const style = require("../StyleSheet/Styles");


class ForgotPassword extends Component{

   constructor(props){
      super(props);
      this.state = {
         email:"",
         isLoading: false,

      }
   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }

   forgotPassword = async () => {

if(this.state.email == ''){
     alert("Please enter register mobile number.")
}else{
   this.setState({ isLoading: true }); 

   await axios.post(api_url + forgot_password, {
      email:this.state.email
   })
   .then(async (response) => {
      if(response){
         Toast.show(response.data.message);
      }
      else{
         alert(response.data.message)
      }
   }
   )
   .catch(function (error) {
      console.log(error);
   }
   )
   .finally(function () {
      // always executed
   }  );
}
this.setState({ isLoading: false }); 

}

   render(){
      return(
        <View style={style.container}>
         
         <SafeAreaView style={style.safeAreaView}>
      
            {/* custom header */}
            <View style={[style.header]}>
               <View style={{ flexDirection: "row", left: 5, justifyContent: "center" }}>
                  <TouchableOpacity style={{ marginTop: 6 }} onPress={() => this.handleBackButtonClick()}>
                      <Icon name="chevron-back-outline" color={black} size={25} type="ionicon" />
                  </TouchableOpacity>
              </View>
            </View>


            {/* Logo */}
            <View>
                  <Image source={logo} style={style.logo}/>
            </View>
            
            {/* input field for user name */}
            <Text style={[style.text,{paddingVertical:30,paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
              Please enter your registered mobile number
            </Text>
            <Input
            onChangeText={(e) => { this.setState({ email: e }) }}
            placeholder='8909****987'
            keyboardType="number-pad"
            returnKeyType="done"
            maxLength={10}
            leftIcon={
               <Icon type="ionicon" name="person" size={20} color={blue}
               />
            }
            inputContainerStyle={style.input}
            style={{marginLeft:10}}
            />


        {/* Forgot button */}
            <TouchableOpacity   style={[style.loginButton,{marginTop:20}]}
            onPress={()=> this.props.navigation.navigate("OTPverification")}>
               <Text style={[style.buttonText,{alignSelf:"center"}]}>Forgot Password</Text>
            </TouchableOpacity>
         </SafeAreaView>
      </View>
                     
     );
   }
}


export default ForgotPassword;
