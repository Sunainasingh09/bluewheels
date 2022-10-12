import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, ImageBackground,
   StyleSheet, Dimensions, Platform, FlatList } from 'react-native';
import { black, blue, grey, lightGray, sky_blue, white } from "../constant/img/Colors/color";
import { Icon, Input} from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import moment  from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import { footerView } from "../Config.js/Constants";
import SelectDropdown from "react-native-select-dropdown";
import axios from 'axios';
import { api_url } from "../constant/ApiConstant/Constant";
import { img_url } from "../constant/ApiConstant/Constant";
import { get_attendence } from "../constant/ApiConstant/Constant";

//global styleSheet
const style = require("../StyleSheet/Styles");

const date = ["15.10.2019 - 10.11.2019", "20.10.2019 - 30.11.2019", "12.10.2019 - 17.11.2019"]


class CheckAttendance extends Component{

   constructor(props){
      super(props);
      this.state = {
      data:[]
      }
      this.get_attendence_list()
   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }

//GET ATTENDENCE LIST
   get_attendence_list = async() =>{
      console.log('check id',global.user)
         await axios.post(api_url+get_attendence,{
            driver_id: global.user,    
         },
         {headers:{
            "Authorization" : "Bearer "+global.token,
            "Content-Type" : "application/json",
            "Accept" : "'application/json, text/plain, */*'",
          }}
         )
         .then(async(response)=>{
            console.log('data count', response.data)

            if(response.data.status == "1"){
               this.setState({ data : response.data.data });
               
                  
            } else{
               alert(response.data.message);
            }
         })
         .catch(function (error) {
            console.log(error);
         }); 
   } 
  




   renderItem=({item})=>(
      <View>
         <View style={styles.viewBox}>
            <View style={{width:"15%",justifyContent:"center",alignItems:"center"}}>
               <View style={{backgroundColor:sky_blue,alignItems:"center",width:40,padding:2}}>
                  <Text style={{fontSize:RFValue(8,580),color:blue}}>{item.start_date_time.slice(0,4)}</Text>
                  <Text style={{fontSize:RFValue(10,580),fontFamily:"Poppins-Bold",color:blue}}>{item.start_date_time.substring(5,7)}</Text>
                  
                  <Text style={{fontSize:RFValue(8,580),color:blue}}>{item.start_date_time.substring(8,10)}</Text>
               </View>

               <View style={{alignItems:"center",marginTop:5}}>
                  <Text style={{fontSize:RFValue(7,580)}}>{item.start_date_time.substring(11,16)} AM</Text>
                  <Text style={{fontSize:RFValue(6,580)}}>to</Text>
                  <Text style={{fontSize:RFValue(7,580)}}>{item.end_date_time.substring(11,16)} PM</Text>
               </View>
            </View>

            <View style={{width:"25%",justifyContent:"center",marginLeft:15}}>
               <Text style={{fontSize:RFValue(11,580),fontFamily:"Poppins-Bold",color:blue}}>Total Hrs.</Text>
               <Text style={{fontSize:RFValue(8,580),fontFamily:"Poppins-Regular",color:blue}}>{item.hourstime} hrs.</Text>
               <Text style={{fontSize:RFValue(11,580),fontFamily:"Poppins-Bold",color:blue,marginTop:10}}>Status</Text>
               <Text style={{fontSize:RFValue(8,580),fontFamily:"Poppins-Regular",color:blue}}>Active</Text>
            </View>

            <View style={{width:"60%",marginLeft:25}}>
               {/* <Text style={{fontSize:RFValue(11,580),fontFamily:"Poppins-Bold",color:blue}}>Total Active Hrs.</Text>
               <Text style={{fontSize:RFValue(8,580),fontFamily:"Poppins-Regular",color:blue}}>14.2 hrs.</Text> */}
            </View>
         </View>


         
         
      </View>
   )

   renderIcon = () => {
      return (
        <Icon name="chevron-down-outline" type="ionicon" size={18} />
      )
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
                      <Text style={style.headerText}>Check Attendance</Text>
                  </View>
              </View>
            </View>

           
            <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.selectDropdown}>
               <Icon name="calendar" type="ionicon" size={25} color={black} style={{paddingLeft:20}}/>

               <SelectDropdown
                  buttonStyle={styles.selectDropdown}
                  data={date}
                  onSelect={(selectedValue, index) => {
                    console.warn(selectedValue)
                  }}
                  buttonTextAfterSelection={(selectedValue, index) => {
                    return selectedValue
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  defaultButtonText={'Select Date'}
                  dropdownIconPosition="right"
                  renderDropdownIcon={this.renderIcon}
                  buttonTextStyle={{ fontSize: RFValue(11, 580), fontFamily: "Poppins-Regular",paddingRight:40, color: black }}
                  buttonStyle={{backgroundColor:white,width:Dimensions.get('window').width/1.45,}}
                />
            </View>
            
               
               {/* main body */}
            <FlatList 
            data={this.state.data}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id} />
            </ScrollView>   
      </SafeAreaView>
      </View>
         
                     
     );
   }
}


export default CheckAttendance;


const styles = StyleSheet.create({
   smallText:{
      fontSize:RFValue(12,580),
      fontFamily:"Poppins-Regular",
      marginRight:25,
   },
   cameraButton:{
      borderStyle:"dashed",
      borderWidth:1,
      height:120,
      justifyContent:"center",
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
      width:"48%",
      alignItems:"center",
   },
   buttonView:{
      flexDirection:"row",
      justifyContent:"space-between",
      width:Dimensions.get('window').width/1.15,
      alignSelf:"center",
      marginTop:20,
      marginBottom:120
   },
   viewBox:{
      width:Dimensions.get('window').width/1.15,
      alignSelf:"center",
      flexDirection:"row",
      backgroundColor:white,
      elevation:Platform.OS == "android" ? 10 : 0,
      shadowColor: grey,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 3,
      marginBottom:10,
      padding:10,
      marginTop:10
   },
   selectDropdown:{
      backgroundColor:"#fff",
      shadowOffset: { width: -2, height: 4 },  
      shadowColor: 'grey',  
      shadowOpacity: 0.5,  
      elevation: 3,  
      width:Dimensions.get('window').width/1.15,
      alignSelf:"center",
      borderRadius:5,   
      marginBottom:10,
      flexDirection:"row",
      justifyContent:"space-between",
      marginTop:10,
      alignItems:"center"
    }
  

})