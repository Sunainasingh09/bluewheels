import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegisterScreen from "../Screens/Login&SignupScreen";
import Dashboard from "../Screens/Dashboard";
import ForgotPassword from "../Screens/ForgotPassword";
import StartAttendence from "../Screens/StartAttendence";
import EndAttendance from "../Screens/EndAttendance";
import Profile from "../Screens/Profile";
import PickUpVehicle from "../Screens/PickUpVehicle";
import CheckAttendance from "../Screens/CheckAttendance";
import GetPickUpVehicle from "../Screens/GetPickUpVehicle";
import Settings from "../Screens/Settings";
import CapturePhoto from "../Screens/CapturePhoto";
import ChangePassword from "../Screens/ChangePassword";
import OTPverification from "../Screens/OTPverification"


const Stack=createNativeStackNavigator();

class Navigation extends Component{
   render(){
      return(
         <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} options={{headerShown:false}}/>

               <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>

                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
                <Stack.Screen name="OTPverification" component={OTPverification} options={{headerShown:false}}/>

               <Stack.Screen name="StartAttendence" component={StartAttendence} options={{headerShown:false}}/>
            
               <Stack.Screen name="EndAttendance" component={EndAttendance} options={{headerShown:false}}/>

               <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>

               <Stack.Screen name="PickUpVehicle" component={PickUpVehicle} options={{headerShown:false}}/>

               <Stack.Screen name="GetPickupVehicle" component={GetPickUpVehicle} options={{headerShown:false}}/>

               <Stack.Screen name="CheckAttendance" component={CheckAttendance}  options={{headerShown:false}}/>

               <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>

               <Stack.Screen name="CapturePhoto" component={CapturePhoto} options={{headerShown:false}}/>
               <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>


            </Stack.Navigator>
         </NavigationContainer>
      )
   }
}

export default Navigation;