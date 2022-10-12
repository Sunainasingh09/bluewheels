import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image,
   StyleSheet, ImageBackground,
   Dimensions, TouchableOpacity} from 'react-native';
import { bike } from "../Config.js/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import { blue } from "../constant/img/Colors/color";
import { footerView } from "../Config.js/Constants";
import { Icon } from "react-native-elements";
import axios from "axios";
import { api_url } from "../constant/ApiConstant/Constant";
import { get_vehicle_with_address } from "../constant/ApiConstant/Constant";


//global styleSheet
const style = require("../StyleSheet/Styles");


class GetPickUpVehicle extends Component{

   constructor(props){
      super(props);
      this.state = {
         vehicle_Address : '',
         vehicle_number : '',
         vehicle_assign_time : ''
      }
      this.get_vehicle_detail()
   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }


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
         <SafeAreaView   style={style.safeAreaView} >
            <ScrollView showsVerticalScrollIndicator={false}>
               
                  <View>
                     <Image source={bike} style={styles.img}/>
                  </View>

                  <View style={styles.view}>
                     <Text style={styles.text}>
                        Your vehcile number is
                     </Text>
                     <Text style={[styles.text,{fontFamily:"Poppins-Bold"}]}>{this.state.vehicle_number}</Text>
                  </View>

                  <View style={styles.view}>
                     <Text style={styles.text}>
                        Please Submit your Attendance
                     </Text>
                     <Text style={styles.text}>
                        and Visit <Text style={{fontFamily:"Poppins-Bold"}}>{this.state.vehicle_Address},</Text>
                     </Text>
                     <Text style={[styles.text,{}]}>
                        <Text style={{fontFamily:"Poppins-Bold"}}></Text> at <Text style={{fontFamily:"Poppins-Bold"}}>{this.state.vehicle_assign_time}</Text>
                     </Text>
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


export default GetPickUpVehicle;


const styles = StyleSheet.create({
   img:{
      height:200,
      width:200,
      alignSelf:"center",
      marginTop:50
   },
   text:{
      fontSize:RFValue(18,580),
      alignSelf:"center",
      color:blue,
      fontFamily:"Poppins-Regular",
   },
   view:{
      marginTop:20,
      width:Dimensions.get('window').width/1.02,
      justifyContent:"center",
      alignSelf:"center",
   }

})