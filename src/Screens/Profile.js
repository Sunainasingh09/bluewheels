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
import { get_user_profile } from "../constant/ApiConstant/Constant";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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
 
class Profile extends Component{

   constructor(props){
      super(props);
      this.state = {
         name:"",
         mobile:"",
         userName:"",
         mail:"",
         passwrord:true,
         icon:"eye-off",
         profile_pic : '',
         address : '',
         aadhar_image: '',
         dl_image: '',
      }
      this.get_user_profile()

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
            await this.setState({name: response.data.data[0].name})
            await this.setState({profile_pic: response.data.data[0].profile_picture})
            await this.setState({userName : response.data.data[0].username})
            await this.setState({mail : response.data.data[0].email})
            await this.setState({mobile: response.data.data[0].mobile})
            await this.setState({address : response.data.data[0].address})
            }
            else{
               alert(response.data.message);
            }
         })
         .catch(function (error) {
            console.log(error);
         }); 
   } 

   //function to open camera for aadhar image
   cameraAadhar =()=>{
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
                    this.setState({aadhar_image:path.uri}) ,
                    console.warn("aadhar",this.state.aadhar_image)
                )
            });
          }
      })
   }

   //function to open camera for dl
   cameraDL =()=>{
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
                    this.setState({dl_image:path.uri}) ,
                    console.warn("dl",this.state.dl_image)
                )
            });
          }
      })
   }


   // function to update profile
   update_profile = async() =>{

   }

   handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
   }

   // function for eye icon state update
   _changeIcon = () => {
      this.setState(prevState =>({
         icon:prevState.icon === 'eye' ? 'eye-off' : 'eye',
         passwrord: !prevState.passwrord
      }))
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
                      <Text style={style.headerText}>Profile</Text>
                  </View>
              </View>
            </View>

           
            <ScrollView showsVerticalScrollIndicator={false}>

            {/* view for image an camera button */}
            <View style={{width:"25%"}}>
            {this.state.profile_pic == null ?
              <Image source={user_img} style={styles.profileImg}></Image>          
                         :   
              <Image source={{uri: img_url+this.state.profile_pic}} style={styles.profileImg} ></Image>                   
              }

               <TouchableOpacity  onPress={()=>this.camera()} style={styles.camIcon}>
                  <Icon type="ionicon" name="camera" size={17} color={white} />
               </TouchableOpacity>

            </View>



               {/* input field for driver name */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30}]}>
                  Driver Name
               </Text>
               <Input
               value={this.state.name} 
               onChangeText={(e) => { this.setState({ name: e }) }}
               placeholder='John Deo'
               maxLength={10}
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               />

               {/* input field for username */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-15}]}>
                  Mobile Number
               </Text>
               <Input
              value={this.state.userName} 
               onChangeText={(e) => { this.setState({ userName: e }) }}
               placeholder='John Deo'
               maxLength={10}
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               />

               {/* input field for email */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-15}]}>
                     Email
               </Text>
               <Input
               value={this.state.mail}
               onChangeText={(e) => { this.setState({ email: e }) }}
               placeholder='JohnDeo@companyname.com'
               inputContainerStyle={style.input}
               style={{marginLeft:10}}
               />

               {/* input field for mobile no
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-15}]}>
                  Contact No.
               </Text>
               <Input
               value={this.state.mobile}
               onChangeText={(e) => { this.setState({ passwrord: e }) }}
               placeholder='+91 89547 - XXXXX'
               maxLength={10}
               editable={false}
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               /> */}

               {/* input field for driver address */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-15}]}>
                  Driver Address
               </Text>
               <Input
               value={this.state.address}
               onChangeText={(e) => { this.setState({ userName: e }) }}
               placeholder='Colaba causeway'
               maxLength={10}
               inputContainerStyle={style.input}
               style={{marginLeft:5}}
               />

               {/* for KYC details */}
               <Text style={[style.text,{paddingVertical:5,paddingLeft:Platform.OS == "ios" ? 25 : 30,marginTop:-15}]}>
                  KYC Details
               </Text>
               <View style={[styles.buttonView,{marginTop:0}]}>
                  {
                     this.state.aadhar_image == null || this.state.aadhar_image == "" ?
                     <TouchableOpacity style={[style.input,styles.cameraButton]}
                     onPress={()=>this.cameraAadhar()}>
                        <Text style={[styles.text,{fontSize:RFValue(10,580),color:grey}]}>
                        <Icon name="add" size={20} color={grey} style={{top:5}}/>Aadhar Card</Text>
                     </TouchableOpacity>
                     :
                     <Image source={{uri:this.state.aadhar_image}} style={[style.input,styles.cameraButton]}/>

                  }

                  {
                     this.state.dl_image == null || this.state.dl_image == "" ?
                     <TouchableOpacity style={[style.input,styles.cameraButton]}
                     onPress={()=>this.cameraDL()}>
                        <Text style={[styles.text,{fontSize:RFValue(10,580),color:grey}]}>
                        <Icon name="add" size={20} color={grey} style={{top:5}}/>Driving Licence</Text>
                     </TouchableOpacity>
                     :
                     <Image source={{uri:this.state.dl_image}} style={[style.input,styles.cameraButton]}/>
                  }
               </View>

               <View style={[styles.buttonView,{marginBottom:130}]}>
                  <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.goBack()}>
                     <Text style={style.text}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button,{backgroundColor:sky_blue}]}>
                     <Text style={style.text}>Submit</Text>
                  </TouchableOpacity>
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


export default Profile;


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
      width:"48%",
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