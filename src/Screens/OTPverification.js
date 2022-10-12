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
import CodeInput from 'react-native-confirmation-code-input';

const style = require("../StyleSheet/Styles");

class OTPverification extends Component {

    constructor(props){
        super(props)
        
    }

    handleBackButtonClick= () => {
        this.props.navigation.goBack(null);
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
              Please enter OTP
              </Text>


              <View>

</View>

              <Text style={[style.text,{paddingVertical:30,paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
              Enter the code you have received by SMS in order to verify account.
              </Text>
              {/* <View style={styles.code}> */}
             
              {/* <CodeInput
                ref="codeInputRef2"
                keyboardType="numeric"
                codeLength={4}
                className='border-circle'
                autoFocus={true}
                codeInputStyle={{ fontWeight: '800' }}
                activeColor={blue}
                inactiveColor={blue}
                onFulfill={(isValid) => this.check_otp(isValid)}
              /> */}
            {/* </View> */}
              {/* <Input
              onChangeText={(e) => { this.setState({ email: e }) }}
              
              keyboardType="email-address"
              returnKeyType="done"
            //   leftIcon={
            //      <Icon type="ionicon" name="person" size={20} color={blue}
            //      />
            //   }
              inputContainerStyle={style.input}
              style={{marginLeft:10}}
              /> */}
  
  
          {/* Forgot button */}
              <TouchableOpacity   style={[style.loginButton,{marginTop:20}]}
              onPress={()=> this.props.navigation.navigate("OTPverification")}>
                 <Text style={[style.buttonText,{alignSelf:"center"}]}>Submit</Text>
              </TouchableOpacity>
           </SafeAreaView>
        </View>
                       
       );
     }


    }



export default OTPverification;



