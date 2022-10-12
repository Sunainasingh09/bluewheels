import React, { Component } from "react";
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "./src/AuthContextProvider";
import axios from "axios";

//screens imports
import LoginRegisterScreen from "./src/Screens/Login&SignupScreen";
import Dashboard from "./src/Screens/Dashboard";
import ForgotPassword from "./src/Screens/ForgotPassword";
import StartAttendence from "./src/Screens/StartAttendence";
import EndAttendance from "./src/Screens/EndAttendance";
import Profile from "./src/Screens/Profile";
import PickUpVehicle from "./src/Screens/PickUpVehicle";
import CheckAttendance from "./src/Screens/CheckAttendance";
import GetPickUpVehicle from "./src/Screens/GetPickUpVehicle";
import Settings from "./src/Screens/Settings";
import CapturePhoto from "./src/Screens/CapturePhoto";
import ChangePassword from "./src/Screens/ChangePassword";
import OTPverification from "./src/Screens/OTPverification"
import { api_url, get_user_profile } from "./src/constant/ApiConstant/Constant";


const Stack=createNativeStackNavigator();
class App extends Component{

  constructor(props){
    super(props);
    this.state={
      step:'done',
      islogin:false,
    }

  }

  componentDidMount(){
   
    AsyncStorage.getItem('@auth_login', (err, result) => {
      if (JSON.parse(result) != null) {
        this.setState({ islogin: true, step: JSON.parse(result).use_type });
        global.token=JSON.parse(result).token;
        global.user=JSON.parse(result).user_id;
        global.type=JSON.parse(result).user_type;
        global.step=this.state.step;
        this.login(JSON.parse(result).use_type);
        console.log("tokencheck",global.token,global.user)
        this.check_token(JSON.parse(result).token)
      }else{
       this.logout();
      }

    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

  
  }


    check_token = async(token) =>
    {
      await axios.post(api_url+get_user_profile,{
        driver_id: global.user,    
      },
      {
        headers:{
          "Authorization" : "Bearer "+token,
          "Content-Type" : "application/json",
          "Accept" : "'application/json, text/plain, */*'",
        }
      }
      )
      .then(async(response)=>{
          if(response.status == "Token is Expired"){
              this.logout();
          }
      })
      .catch(function (error) {
          console.log(error);
      }); 
    }

    //function for set login
    login = (step) => 
    {
        this.setState({step:step,islogin:true});     
    }
  
    //funcion for logout handling
    logout = () =>
    {
      this.setState({islogin:false})
    }


  render(){
    return(
      <AuthContext.Provider value={{login:this.login,logout:this.logout}}>
        <NavigationContainer>
            <Stack.Navigator>
              {(!this.state.islogin) ? (
                <>
                <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} options={{headerShown:false}}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
                <Stack.Screen name="OTPverification" component={OTPverification} options={{headerShown:false}}/>

                </>
              )
            
              :
              (
                <>

                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>


                <Stack.Screen name="StartAttendence" component={StartAttendence} options={{headerShown:false}}/>

                <Stack.Screen name="EndAttendance" component={EndAttendance} options={{headerShown:false}}/>

                <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>

                <Stack.Screen name="PickUpVehicle" component={PickUpVehicle} options={{headerShown:false}}/>

                <Stack.Screen name="GetPickupVehicle" component={GetPickUpVehicle} options={{headerShown:false}}/>

                <Stack.Screen name="CheckAttendance" component={CheckAttendance}  options={{headerShown:false}}/>

                <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>

                <Stack.Screen name="CapturePhoto" component={CapturePhoto} options={{headerShown:false}}/>
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
                </>
              )}
               



            </Stack.Navigator>
         </NavigationContainer>
      </AuthContext.Provider>
    )
  }
}


export default App;