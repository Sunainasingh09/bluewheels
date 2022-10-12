import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, 
   StyleSheet, Dimensions, Platform, ActivityIndicator} from 'react-native';
import { logo } from "../Config.js/Constants";
import { blue, sky_blue, white } from "../constant/img/Colors/color";
import { Icon, Input, CheckBox } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { api_url } from "../constant/ApiConstant/Constant";
import { user_login } from "../constant/ApiConstant/Constant";
import { user_register } from "../constant/ApiConstant/Constant";
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from '../AuthContextProvider';

//Global StyleSheet
const style = require("../StyleSheet/Styles");

// class implementation
class LoginRegisterScreen extends Component {

   static contextType = AuthContext;
   constructor(props){
      super(props);
      this.state = {
         isLoading: false,
         activeIndex: 0,
         username:'',
         passwrord:true,
         icon:"eye-off",
         checked:false,
         email:'',
         contactNumber:'',
         password:'',
         email:'',
         userName:'',
         signupPassword:'',
         name:'',
      }
   }

   // function to set the active index
   segmentClick = index => {
      this.setState({
        activeIndex: index,
      });
   };
   
   // function for eye icon state update
   _changeIcon = () => {
      this.setState(prevState =>({
         icon:prevState.icon === 'eye' ? 'eye-off' : 'eye',
         passwrord: !prevState.passwrord
      }))
   }

   // function for checkbox state update
   check=()=>{
      if(this.state.checked == false){
          this.setState({checked:true})
      }
      else{
          this.setState({checked:false})
      }
  }

   // USER LOGIN
   login = async() =>{
      if (this.state.username == ''){
         alert('Please enter your username!')
      }
      else if (this.state.password == ''){
         alert('Please enter your valid password!')
      }
      else{
         this.setState({ isLoading: true }); // Once You Call the API Action loading will be true
         await axios.post(api_url+user_login,{
               username: this.state.username, 
               password: this.state.password 
         })
         .then(async(response)=>{
            // console.warn(response);
            if(response.data.status == "1"){
               this.setState({ isLoading: false }); // After getting response make loading to false
               const data={"token":response.data.token,"user_type":'login',"user_id":response.data.driver_id,"use_type":'done'};
               AsyncStorage.setItem('@auth_login',JSON.stringify(data));
               global.token = response.data.token;
               global.user=response.data.driver_id;
               this.context.login("done");
               Toast.show(response.data.message);
               global.user_type='login';
               // this.props.navigation.navigate("Dashboard")
               
            }
            else{
               this.setState({ isLoading: false }); // After getting response make loading to false
               // this.props.navigation.navigate("Dashboard")

               alert(response.data.message);
            }
         })
         .catch(function (error) {
            console.log(error);
         });
         
      }
   } 


//USER SIGNUP

signup = async() =>{
 if (this.state.email == ''){
   alert("Please enter your email")
   
 }else if (this.state.contactNumber == ''){
   alert("Please enter your  mobile number")
 
 }else if (this.state.signupPassword == ''){
   alert("Please enter your password")
 }else if (this.state.signupPassword.length < 6){
   alert("Password should not be less then 6 digit")
 }
 else{
   this.setState({ isLoading: true }); 
    await axios.post(api_url+user_register,{
         username: this.state.contactNumber, 
         password: this.state.signupPassword,
         email: this.state.email,
         name: this.state.name,
         // mobile: this.state.contactNumber,   
   },
   {
      headers:{
      "Content-Type" : "application/json",
      "Accept" : "'application/json, text/plain, */*'"
    }
   }
   )
   .then(async(response)=>{
      if(response.status == "1"){
         this.setState({ isLoading: false });
         const data={"token":response.data.token,"user_type":'register',"user_id":response.data.driver_id,"use_type":'done'};
         AsyncStorage.setItem('@auth_login',JSON.stringify(data));
         global.token = response.data.token;
         this.context.login("done");
         Toast.show(response.message);
         global.user_type='register';
         alert(response.data.message);
      }
      else{
         alert(response.data.message);
      }

   }
   
   )
   .catch(function (error) {
      console.log(error);
   });
   this.setState({ isLoading: false }); 

 }
}




   // function to render items for login and register section
   renderSection = () => {

      // for login section
      if (this.state.activeIndex == 0) {
        return (
         <View>
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.isLoading && <ActivityIndicator size="large" color={blue} />}
          </View>
            <View style={{marginTop:20}}>

               
               {/* input field for user name */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
                  Mobile Number
               </Text>
               <Input
               onChangeText={(e) => { this.setState({ username: e }) }}
               placeholder='8909****87'
               returnKeyType="done"
               maxLength={10}
               keyboardType="phone-pad"
      
               leftIcon={
                  <Icon type="ionicon" name="call" size={20} color={blue}
                  />
               }
               inputContainerStyle={style.input}
               style={{marginLeft:10}}
               />

               {/* input field for password */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-10}]}>
                  Password
               </Text>
               <Input
               onChangeText={(e) => { this.setState({ password: e }) }}
               placeholder='********'
               returnKeyType="done"
               maxLength={10}
               leftIcon={
                  <Icon type="ionicon" name="lock-closed-outline" size={20} color={blue}
                  />
               }
               rightIcon={
                  <Icon type="ionicon" name={this.state.icon} size={20} color={blue} onPress={()=>this._changeIcon()} />
               }
               secureTextEntry={true}
               inputContainerStyle={style.input}
               style={{marginLeft:10}}
               />
               
               {/* forgot password text */}

               {/* <TouchableOpacity style={[style.forgotButton,{marginTop:20,marginBottom:80}]}
                  
                     <Text style={[style.buttonText,{alignSelf:"center"}]}>Register</Text>
                  </TouchableOpacity> */}


               <Text style={styles.forgotText}  onPress={()=> this.props.navigation.navigate("ForgotPassword")}>
                  Forgot Password?
               </Text>

               {/* remember me check box */}
               <View style={{paddingHorizontal:10,flexDirection:"row"}}>
                  <CheckBox checked={this.state.checked}
                    onPress={() => {this.check()}}
                    value={this.state.isSelect}
                    style={{color:blue}}
                  />

                  <Text style={styles.rememberText}>
                     Remember Me
                  </Text>
               </View>

               {/* login button */}
               <TouchableOpacity style={[style.loginButton,{marginTop:15,marginBottom:20}]}
               onPress={()=> this.login()}>
                  <Text style={[style.buttonText,{alignSelf:"center"}]}>Login</Text>
               </TouchableOpacity>
            </View>
            
         </View>
                        
        );
      }
      // for register section
      else {
        return (
          <View>

            <View style={{marginTop:20}}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.isLoading && <ActivityIndicator size="large" color={blue} />}
          </View>

                  {/* input field for name */}
                  <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
                     Name
                  </Text>
                  <Input
                  onChangeText={(e) => { this.setState({ name: e }) }}
                  placeholder='John Deo'
                  returnKeyType="done"
                  leftIcon={
                     <Icon type="ionicon" name="person" size={20} color={blue}
                     />
                  }
                  inputContainerStyle={style.input}
                  style={{marginLeft:10}}
                  />

                  {/* input field for email */}
                  <Text style={[style.text,{paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
                     Email
                  </Text>
                  <Input
                  onChangeText={(e) => { this.setState({ email: e }) }}
                  placeholder='JohnDeo@companyname.com'
                  returnKeyType="done"
                  keyboardType="email-address"
                  leftIcon={
                     <Icon type="ionicon" name="mail" size={20} color={blue}
                     />
                  }
                  inputContainerStyle={style.input}
                  style={{marginLeft:10}}
                  />

                  {/* input field for contact number */}
                  <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-10}]}>
                     Mobile Number
                  </Text>
                  <Input
                  onChangeText={(e) => { this.setState({ contactNumber: e }) }}
                  placeholder='8909****87'
                  returnKeyType="done"
                  keyboardType="phone-pad"
                  maxLength={10}
                  leftIcon={
                     <Icon type="ionicon" name="call" size={20} color={blue}
                     />
                  }
                  inputContainerStyle={style.input}
                  style={{marginLeft:10}}
                  />


                  {/* input field for user name
                  <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-10}]}>
                     Username
                  </Text>
                  <Input
                  onChangeText={(e) => { this.setState({ userName: e }) }}
                  placeholder='John Deo'
                  returnKeyType="done"

                  leftIcon={
                     <Icon type="ionicon" name="person" size={20} color={blue}
                     />
                  }
                  inputContainerStyle={style.input}
                  style={{marginLeft:10}}
                  /> */}

                  {/* input field for password */}
                  <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-10}]}>
                     Password
                  </Text>
                  <Input
                  onChangeText={(e) => { this.setState({ signupPassword: e }) }}
                  placeholder='********'
                  returnKeyType="done"

                  leftIcon={
                     <Icon type="ionicon" name="lock-closed-outline" size={20} color={blue}
                     />
                  }
                  rightIcon={
                     <Icon type="ionicon" name={this.state.icon} size={20} color={blue} onPress={()=>this._changeIcon()} />
                  }
                  secureTextEntry={true}
                  inputContainerStyle={style.input}
                  style={{marginLeft:10}}
                  />

                  {/* register button */}
                  <TouchableOpacity style={[style.loginButton,{marginTop:20,marginBottom:30}]}
                  onPress={()=> this.signup()}>
                     <Text style={[style.buttonText,{alignSelf:"center"}]}>Register</Text>
                  </TouchableOpacity>
                  </View>
          </View>
        );
      }
    };


    


  render() {
    return (
      <View style={style.container}>
        <SafeAreaView style={style.safeAreaView}>

            <ScrollView showsVerticalScrollIndicator={false}>
               {/* logo section */}
               <View>
                  <Image source={logo} style={style.logo}/>
               </View>

               {/* login and register button */}
               
               <View style={styles.buttonView}>
                  <TouchableOpacity 
                  style={[style.button,{backgroundColor:this.state.activeIndex == 0 ? sky_blue : white,
                  borderTopRightRadius:5,borderBottomRightRadius:5,
                  borderRightColor:this.state.activeIndex == 0 ? blue : white,borderRightWidth:this.state.activeIndex == 0 ? 1 : 0}]}
                  activeOpacity = {this.state.activeIndex == 0}
                  onPress={() => this.segmentClick(0)}
                  >
                     <Text style={style.buttonText}>Login</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                  style={[style.button,{backgroundColor:this.state.activeIndex == 1 ? sky_blue : white,
                  borderTopLeftRadius:5,borderBottomLeftRadius:5,
                  borderLeftColor:this.state.activeIndex == 1 ? blue : white,borderLeftWidth:this.state.activeIndex == 1 ? 1 : 0}]}
                  activeOpacity = {this.state.activeIndex == 1}
                  onPress={() => this.segmentClick(1)}
                  >
                     <Text style={style.buttonText}>Register</Text>
                  </TouchableOpacity>
               </View>


               {/* login and register section details function call */}
               {this.renderSection()}

            </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default LoginRegisterScreen;

const styles = StyleSheet.create({

   buttonView:{
      borderWidth:1,
      borderColor:blue,
      marginTop:50,
      alignSelf:"center",
      width:Dimensions.get('window').width/1.15,
      borderRadius:5,
      flexDirection:"row",
   },
   forgotText:{
      alignSelf:"flex-end",
      paddingHorizontal:25,
      marginTop:-16,
      color:blue,
      fontFamily:"Poppins-Regular",
   },
   rememberText:{
      color:blue,
      fontSize:RFValue(12,580),
      fontFamily:"Poppins-Regular",
      marginTop:Platform.OS == "ios" ? 14 : 14,
      marginLeft:-10
   }

})