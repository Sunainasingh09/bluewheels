import React, { Component } from "react";
import {SafeAreaView, ScrollView,
   Text, View, Image, TouchableOpacity, 
   StyleSheet, Dimensions, Platform, ImageBackground, PermissionsAndroid } from 'react-native';
import { black, blue, grey, lightGray, sky_blue, white } from "../constant/img/Colors/color";
import { Icon, Input} from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import moment  from 'moment';
import { footerView } from "../Config.js/Constants";
import axios from 'axios';
import { api_url } from "../constant/ApiConstant/Constant";
import { get_user_profile, GOOGLE_KEY, end_attendence } from "../constant/ApiConstant/Constant";
import Geocoder from "react-native-geocoding";
import Geolocation from '@react-native-community/geolocation';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from "react-native-simple-toast";

//global styleSheet
const style = require("../StyleSheet/Styles");

//Image upload options
const options = {
   title: 'Pick an Image',
   storageOptions: {
     skipBackup: true,
     path: 'images',
   },
   quality: 0.5,
 };


class EndAttendance extends Component{

   constructor(props){
      super(props);
      this.state = {
         name:"",
         mobile:"",
         location:"",
         start_time:"",
         isVisible:false,
         isEndVisible:false,
         chosenTime:'',
         address:'',
         startTime:'',
         latitude:"",
         longitude:"",
         address:'',
         time:"",
         image:"",

      }
      this.get_user_profile()

   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }

   componentDidMount(){
      this.locationGet();
      this.default_date();
         setInterval(()=>{
            this.default_date();
         },1000)
   }

   default_date = () =>{
      var show_time = moment().format(" hh:mm a");
      this.setState({chosenTime:show_time})
   }

   locationGet = async() => {
      if(Platform.OS === 'android')
        {
      try{
  
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (info) => {
            this.setState({ latitude: info.coords.latitude, longitude: info.coords.longitude })
            
            this.fetch_location(this.state.latitude, this.state.longitude);
          },
          (error) => {
            console.log(error.code, error);
          },
          {
            enableHighAccuracy: true, //for emulator
            // enableHighAccuracy: false, //for real devices
            timeout: 20000,
            fastestInterval: 1000,
          }
        );
         }
      }
      catch(err){
         console.warn(err)
      }
      }
      else
      {
         Geolocation.getCurrentPosition(
            (info) => {
            this.setState({ latitude: info.coords.latitude, longitude: info.coords.longitude })
            this.fetch_location(this.state.latitude,this.state.longitude);
            },
            (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            },
            { 
               enableHighAccuracy: true,
               timeout: 20000,
               fastestInterval: 1000,
            }
            );
      }
   }


   fetch_location = (lati, longi) => {
      console.warn(lati,longi);
      Geocoder.init(GOOGLE_KEY);
      Geocoder.from(lati, longi).then(json => {
   
      this.setState({address:json.results[0].formatted_address })
      console.warn(this.state.address);
         global.address=json.results[0].formatted_address;     

      }).catch(error => console.warn(error));
   }


   //GET USER PROFILE
   get_user_profile = async() =>{
      console.log('userinfo',global.token, global.user)
         await axios.post(api_url+get_user_profile,{
            driver_id: global.user,    
         },
         {headers:{
            "Authorization" : "Bearer "+global.token,
            "Content-Type" : "application/json",
            "Accept" : "'application/json, text/plain, */*'",
         }}
         )
         .then(async(response)=>{
            if(response.data.status == "1"){
               console.warn(response.data.data[1])
            await this.setState({name: response.data.data[0].name})
            await this.setState({mobile: response.data.data[0].username})
            
            var start_time = moment(response.data.data[1].start_date_time).format(" hh:mm a");
            await this.setState({startTime: start_time})
            }
            else{
               alert(response.data.message);
            }
         })
         .catch(function (error) {
            console.log(error);
         }); 
   } 

   //function to open camera
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
                    this.setState({image:path.uri}) ,
                    console.warn("abc",this.state.image)
                )
            });
          }
      })
   }


   endAttendance = async() =>{
      console.warn(global.user,  this.state.time, this.state.address, this.state.latitude, this.state.longitude,
         this.state.mobile, this.state.end_time, this.state.image);
         if(this.state.name == "" || this.state.time == "" || this.state.address == "" || this.state.latitude == "" 
         || this.state.longitude == "" || this.state.mobile == "" || this.state.image == null ){
            Toast.show("All fields are mandatory");
         }
         else{
            var photo = {
               uri: this.state.image,
             };

            console.warn(photo);

            var form = new FormData();
            form.append("driver_id", global.user);
            form.append("attendenceId", this.state.name);
            form.append("end_date_time", this.state.time);
            form.append("end_address", this.state.address);
            form.append("end_time_lat", this.state.latitude);
            form.append("end_time_lng", this.state.longitude);
            form.append("end_image",{uri:photo.uri,name: 'image.jpg', type: 'image/jpeg'});
            console.warn("ss",form);
            await axios.post(api_url+end_attendence,
               {
                  attendenceId: global.user,
                  driver_id:global.user,
                  end_date_time: this.state.time,
                  end_address: this.state.address,
                  end_time_lat: this.state.latitude,
                  end_time_lng: this.state.longitude,
                  end_image:{uri:photo.uri,name: 'image.jpg', type: 'image/jpeg'}
                  
               }
               ,
               {
                  headers:{
                     "Authorization" : "Bearer "+global.token,
                     "Content-Type" : "application/json",
                  }
               }  )
               .then(async(response)=>{
                  console.warn(response.data);
               })
               .catch(async(error)=>{
                  console.warn(error)
               })
               .finally(async()=>{
                  this.setState({isLoading:false});
               })
         }
   }




   render(){
      return(
         <View style={style.container} > 
         <SafeAreaView style={style.safeAreaView}>
            
            {/* custom header */}
            <View style={[style.header, { flexDirection: "row", justifyContent: "space-between" }]}>
               <View style={{ flexDirection: "row", left: 5, justifyContent: "center" }}>
                  <TouchableOpacity style={{ marginTop: 6 }} onPress={() => this.handleBackButtonClick()}>
                      <Icon name="chevron-back-outline" color={black} size={25} type="ionicon" />
                  </TouchableOpacity>
                  <View style={{ justifyContent: "center" }}>
                      <Text style={style.headerText}>End Attendance</Text>
                  </View>
              </View>
            </View>

           
            <ScrollView showsVerticalScrollIndicator={false}>
               {/* input field for driver name */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
                  Driver Name
               </Text>
               <Input
                value={this.state.name}
               placeholder='John Deo'
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               />

               {/* input field for mobile no*/}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-10}]}>
                  Mobile No.
               </Text>
               <Input
               value={this.state.mobile}
               placeholder='+91 89547 - XXXXX'
               maxLength={10}
               editable={false}
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               />

               {/* input field for location */}
               <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                  <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-10}]}>
                     Current Location
                  </Text>
                  {/* <Text style={[styles.smallText,{color:blue,alignSelf:"flex-end"}]}>
                     Fetch Location
                  </Text> */}
               </View>
               <TouchableOpacity style={[style.input,{height:48,justifyContent:"center"}]}>
                  <Text numberOfLines={1} style={[styles.smallText,{paddingLeft:5}]}>{this.state.address}</Text>
               </TouchableOpacity>


               {/* input field for start time */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:10}]}>
                  Start Time
               </Text>
               <TouchableOpacity style={[style.input,
                  {height:48,justifyContent:"space-between",flexDirection:"row",alignItems:"center"}]}>
                  <Text style={[styles.smallText,{paddingLeft:5}]}>{this.state.startTime}</Text>
                  <Icon name="time" type="ionicon" size={25} color={blue} style={{paddingRight:10}}/>
               </TouchableOpacity>



               {/* input field for end time */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:10}]}>
                  End Time
               </Text>
               <TouchableOpacity style={[style.input,
                  {height:48,justifyContent:"space-between",flexDirection:"row",alignItems:"center"}]}>
                  <Text style={[styles.smallText,{paddingLeft:5}]}>{this.state.chosenTime}</Text>
                  <Icon name="time" type="ionicon" size={25} color={blue} style={{paddingRight:10}}/>
               </TouchableOpacity>

               {/* for open camera */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:10}]}>
                  Live Photo with Location
               </Text>
               {
                  this.state.image == "" || this.state.image == null ?
                  <TouchableOpacity style={[style.input,styles.cameraButton]} onPress={()=>this.camera()}>
                     <Text style={[styles.text,{fontSize:RFValue(14,580)}]}>Open Camera</Text>
                  </TouchableOpacity>
                  :
                  <Image source={{uri:this.state.image}} style={[style.input,styles.cameraButton]}/>
               }
               


               <View style={styles.buttonView}>
                  <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.goBack()}>
                     <Text style={style.text}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button,{backgroundColor:sky_blue}]}
                  onPress={()=>this.endAttendance()}>
                     <Text style={style.text}>Submit</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>


            {/* footer tab bars */}
            <View style={{position:"absolute",bottom:0}}>
               <ImageBackground source={footerView} style={{height: 150,
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


export default EndAttendance;


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
   }
  

})