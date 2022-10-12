import React, {Component} from "react";
import { Text, View, SafeAreaView,
   StyleSheet, Image, TouchableOpacity, Dimensions, Platform, ScrollView, Pressable, ImageBackground } from "react-native";
import { am, pm, scooty, user_img, footerView } from "../Config.js/Constants";
import { black, blue } from "../constant/img/Colors/color";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import { color } from "react-native-elements/dist/helpers";
import axios from 'axios';
import { api_url } from "../constant/ApiConstant/Constant";
import { img_url } from "../constant/ApiConstant/Constant";
import Toast from 'react-native-simple-toast';
import { get_vehicle_with_address } from "../constant/ApiConstant/Constant";
//Global StyleSheet
const style = require("../StyleSheet/Styles");



// class implementation
class Dashboard extends Component {

   constructor(props){
      super(props);
      this.state = {
       username : '',
       profile_pic : '',
       vehicle_Address : '',
       vehicle_number : '',
       vehicle_assign_time : ''

      }
      this. get_user_profile();
      this.get_vehicle_detail();

   }

   componentDidMount(){
      // this.get_user_profile();
      // this.get_vehicle_detail();
   }

   //GET USER PROFILE
   get_user_profile = async() =>{
      console.log('userinfod',global.token, global.user)
         await axios.post(api_url+'getProfile',{
            driver_id: global.user,    
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
               await this.setState({username:response.data.data[0].name, 
                profile_pic:response.data.data[0].profile_picture});
            }
            else{
               this. get_user_profile();
               this.get_vehicle_detail();
             //  alert(response.data.message);
            }
         })
         .catch(function (error) {
            console.log(error);
         }); 
   } 


   //GET VEHICLE DETAIL 

   get_vehicle_detail = async() =>{
      console.log('userinfod',global.token, global.user)
      await axios.post(api_url+get_vehicle_with_address,{
         driver_id: global.user,    
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
            console.log(response.data)
           await this.setState({vehicle_Address:response.data.data[0].locationdrivers, 
            vehicle_number:response.data.data[0].vehicle_number,
            vehicle_assign_time:response.data.data[0].timedrivers});
         }
         else{
            this. get_user_profile();
            this.get_vehicle_detail();
            //alert(response.data.message);
         }
      })
      .catch(function (error) {
         console.log(error);
      }); 
   }


  render() {
    return (
      <View style={style.container}>
         <SafeAreaView style={style.safeAreaView}>
            <ScrollView showsVerticalScrollIndicator={false}>
               {/* header */}
               <View style={styles.header}>
                  <View style={{flexDirection:"row",marginLeft:10}}>
                     {this.state.profile_pic == null ?
                       <Image source={user_img} style={style.userImg}></Image>          
                            :   
                        <Image source={{uri: img_url+this.state.profile_pic}} style={style.userImg} ></Image>                   
                     }
                     
                     <View style={{marginLeft:10,justifyContent:"center"}}>
                        <Text style={style.nameText}>
                           {this.state.username}
                        </Text>
                         
                     </View>
                  </View>

                  <View style={{justifyContent:"center"}}>
                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profile")}>
                        <Icon name="person-outline" type="ionicon" size={32}/>
                     </TouchableOpacity>
                  </View>
               </View>

               {/* body */}
               <View>
                  {/* for main image and text */}
                  <View>
                     <Image source={scooty} style={styles.mainImg}/>
                     <View style={{position:"absolute",top:190,left:20}}>
                        <Text style={styles.bigText}>
                        
                        </Text>
                        <Text style={styles.smallText}></Text>
                     </View>
                  </View>


               </View>

               {/*  */}
               <View style={[styles.header,{marginTop:10,width:"100%"}]}>
                  <View style={{flexDirection:"column",marginLeft:10,width:"50%"}}>
                     <Text style={styles.text}>Reporting Time</Text>
                     <Text style={[styles.smallText,{marginTop:4}]}>{this.state.vehicle_assign_time}</Text>
                     <Text numberOfLines={2} style={[styles.smallText,{marginTop:2,fontSize:RFValue(11,580)}]}>{this.state.vehicle_Address}</Text>
                  </View>

                  <View style={{width:"50%",alignItems:"flex-end",paddingRight:20}}>
                  <Pressable onPress={()=>this.props.navigation.navigate("GetPickupVehicle")}>
                     <Text style={[styles.text,{color:blue}]}>Pick Up Vehicle</Text>
                     <Text style={[styles.vehicleNumber,{color:blue}]}>{this.state.vehicle_number}</Text>
                  </Pressable>
                  </View>
               </View>

               {/* attendance view  */}
               <View style={[styles.header,{marginTop:10,width:"100%",alignItems:"center",justifyContent:"space-evenly",marginBottom:120}]}>
                  <View style={{width:"50%"}}>
                     <Text style={[styles.text,{color:blue}]}>Attendance</Text>
                      <TouchableOpacity onPress={()=> this.props.navigation.navigate("StartAttendence")}>
                        <View style={styles.box} >
                           <Image source={am} style={styles.img}/>
                           <Text style={styles.labelText}>Start Day Attendance</Text>
                        </View>
                     </TouchableOpacity>
                  </View>

                  <View style={{width:"50%"}}>
                     <Text style={[styles.smallText,{color:blue,alignSelf:"flex-end",marginTop:2}]}
                     onPress={()=>this.props.navigation.navigate("CheckAttendance")}>Check Attendance</Text>
                     <TouchableOpacity onPress={()=>{this.props.navigation.navigate("EndAttendance")}}>
                        <View style={[styles.box,{alignSelf:"flex-end",marginTop:12}]}>
                           <Image source={pm} style={styles.img}/>
                           <Text style={styles.labelText}>End Day Attendance</Text>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </ScrollView>

            {/* footer tab bars */}
            <View style={{position:"absolute",bottom:0}}>
               <ImageBackground source={footerView} style={{height:150,
               width:Dimensions.get('window').width,justifyContent:"center"}}>
                  <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:50}}>
                     <TouchableOpacity  onPress={()=>this.props.navigation.navigate("CheckAttendance")}>
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

export default Dashboard;

const styles = StyleSheet.create({
   header:{
      flexDirection:"row",
      padding:10,
      justifyContent:"space-between",
   },
   button:{
      flexDirection:"row",
   },
   buttonText:{
      fontSize:RFValue(13,580),
      fontFamily:"Poppins-Regular",
      color:black,
   },
   mainImg:{
      height:Platform.OS == "ios" ? 280 : 300,
      width:Platform.OS == "ios" ? "82.5%" : Dimensions.get('window').width/1.2,
      right:-70,
   },
   bigText:{
      fontSize:RFValue(30,580),
      color:black,
      fontFamily:"Poppins-Regular",
   },
   smallText:{
      fontSize:RFValue(12,580),
      color:black,
      fontFamily:"Poppins-Regular",
      marginTop:-10
   },
   text:{
      color:black,
      fontSize:RFValue(15,580),
      fontFamily:"Poppins-Medium"
   },
   box:{
      borderRadius:5,
      borderWidth:2,
      borderColor:blue,
      padding:10,
      marginTop:10,
      width:"95%",
      height:100
   },
   img:{
      height:50,
      width:50,
   },
   labelText:{
      fontSize:Platform.OS == "ios" ? RFValue(10,580) : RFValue(12,580),
      color:blue,
      fontFamily:"Poppins-Medium"
   },

   vehicleNumber:{
      fontSize:RFValue(20,580),
      color: color.blue,
      fontFamily:"Poppins-Bold",
   }


}) 