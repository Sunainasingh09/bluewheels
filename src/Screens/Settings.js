import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, 
   StyleSheet, Dimensions, Platform, FlatList,Alert, ImageBackground } from 'react-native';
import { black, blue, grey, lightGray, sky_blue, white } from "../constant/img/Colors/color";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";
import { logo, footerView, user_img } from "../Config.js/Constants";
import Modal from "react-native-modal";
import axios from 'axios';
import { api_url, check_onDuty } from "../constant/ApiConstant/Constant";
import { img_url } from "../constant/ApiConstant/Constant";
import { user_logout } from "../constant/ApiConstant/Constant";
import { AuthContext } from "../AuthContextProvider";
import Toast from "react-native-simple-toast";


//global styleSheet
const style = require("../StyleSheet/Styles");


class Settings extends Component{

   static contextType = AuthContext;
   constructor(props){
      super(props);
      this.state = {
         isDialogVisible:false,
         status:'',
      }
   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }

   componentDidMount(){



      // this.check_attendance();
   }

   logout= () =>{
      if(this.state.status=='onDuty'){
         Toast.show('You are on duty, please end your attendance first');
      }
      else{
         Alert.alert(
            'LogOut',
            'Are you sure want to LogOut?',
            [
              
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK', 
                onPress: () => this.user_logout()
              },
            ],
            {cancelable: false},
          );
      }
     
   }
  
   check_attendance= async() =>{
      await axios.post(api_url+check_onDuty,{
         driver_id:global.user,
      },
      {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+global.token
         }
      })
      .then(response => {
         if(response.data.status == "0"){
            Toast.show(response.data.message);
            
         }
         else{
            // this.setState({status:"onDuty"});
            Toast.show(response.data.message);
            this.logout();
         }
      }
      )
   }
      //GET USER PROFILE
      user_logout = async() =>{
         console.log('userinfo', global.user)

            await axios.post(api_url+user_logout,{
               driver_id: global.user,    
               token: global.token,
            },
            {headers:{
               "Authorization" : "Bearer "+global.token,
               "Content-Type" : "application/json",
               "Accept" : "'application/json, text/plain, */*'",
            }}
            )
            .then(async(response)=>{
               console.warn('userlogout',response)
               if(response.data.status == "1"){
                  AsyncStorage.setItem('@auth_login','')
                  global.token=null;
                  Toast.show("Logout Successfully!")
                  this.context.logout();

                  // this.props.navigation.navigate("LoginRegisterScreen")
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
               <ScrollView showsVerticalScrollIndicator={false}>
                  {/* custom header */}
                  <View style={[style.header, { flexDirection: "row", justifyContent: "space-between" }]}>
                     <View style={{ flexDirection: "row", left: 5, justifyContent: "center" }}>
                        <TouchableOpacity style={{ marginTop: 6 }} onPress={() => this.handleBackButtonClick()}>
                           <Icon name="chevron-back-outline" color={black} size={25} type="ionicon" />
                        </TouchableOpacity>
                        <View style={{ justifyContent: "center" }}>
                           <Text style={style.headerText}>Settings</Text>
                        </View>
                     </View>
                  </View>


                  {/* main body */}

                  <View>
                     {/* Profile */}
                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profile")}>
                           <View style={styles.view} >
                              <View style={{flexDirection:"row"}}>
                                 <Icon name="person-circle-outline" color={blue} size={25} type="ionicon" style={styles.icon}/>
                                 <Text style={styles.texxt}>Profile</Text>
                              </View>
                              <Icon name="chevron-forward" color={blue} size={25} type="ionicon" />
                           </View>
                     </TouchableOpacity >

             {/* Change Password */}
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate("ChangePassword")}>
                           <View style={styles.view} >
                              <View style={{flexDirection:"row"}}>
                                 <Icon name="alert-circle-outline" color={blue} size={25} type="ionicon" style={styles.icon}/>
                                 <Text style={styles.texxt}>Change Password</Text>
                              </View>
                              <Icon name="chevron-forward" color={blue} size={25} type="ionicon" />
                           </View>
                     </TouchableOpacity >

                     {/* Privacy Policy */}
                     <TouchableOpacity>
                           <View style={styles.view} >
                              <View style={{flexDirection:"row"}}>
                                 <Icon name="alert-circle-outline" color={blue} size={25} type="ionicon" style={styles.icon}/>
                                 <Text style={styles.texxt}>Privacy Policy</Text>
                              </View>
                              <Icon name="chevron-forward" color={blue} size={25} type="ionicon" />
                           </View>
                     </TouchableOpacity >


                     {/* About Us */}
                     <TouchableOpacity>
                           <View style={styles.view} >
                              <View style={{flexDirection:"row"}}>
                                 <Icon name="information-circle-outline" color={blue} size={25} type="ionicon" style={styles.icon}/>
                                 <Text style={styles.texxt}>About Us</Text>
                              </View>
                              <Icon name="chevron-forward" color={blue} size={25} type="ionicon" />
                           </View>
                     </TouchableOpacity>


                     {/* Logout */}
                     <TouchableOpacity onPress={()=>this.check_attendance()}>
                           <View style={styles.view} >
                              <View style={{flexDirection:"row"}}>
                                 <Icon name="log-out-outline" color={blue} size={25} type="ionicon" style={styles.icon}/>
                                 <Text style={styles.texxt}>Logout</Text>
                              </View>
                              <Icon name="chevron-forward" color={blue} size={25} type="ionicon" />
                           </View>
                     </TouchableOpacity >
                  </View>
                  
               </ScrollView>

               

               {/* footer tab bars */}
               <View style={{position:"absolute",bottom:0}}>
                  <ImageBackground source={footerView} style={{height:150,
                  width:Dimensions.get('window').width,justifyContent:"center"}}>
                     <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:60}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("CheckAttendance")}>
                           <Icon name="calendar-outline" type="ionicon" size={35}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Dashboard")}>
                           <Icon name="home-outline" type="ionicon" size={35}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Settings")}>
                           <Icon name="settings-outline" type="ionicon" size={35}/>
                        </TouchableOpacity>
                     </View>
                  </ImageBackground>
               </View>


            </SafeAreaView>
         </View>
                     
     );
   }
}


export default Settings;


const styles = StyleSheet.create({
   view:{
      padding:10,
      paddingVertical:15,
      flexDirection:"row",
      justifyContent:"space-between"
  },
  texxt:{
      fontSize:RFValue(15,580),
      fontFamily:"Poppins-Medium",
      paddingLeft:30,
      color:blue
   },
   icon:{
      alignSelf:"center",
      marginLeft:10
   }

})