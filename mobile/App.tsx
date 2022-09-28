import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes'

import { Background } from "./src/components/Background"
import { Loading } from './src/components/Loading';


import './src/service/notificationConfigs'
import { getPushNotificationToken } from './src/service/getPushNotificationToken'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationListerner = useRef<Subscription>();
  const responseNotificationListerner = useRef<Subscription>();
  
  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getNotificationListerner.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    })
    responseNotificationListerner.current = Notifications.addNotificationResponseReceivedListener(response =>{
      console.log(response);
    })

    return () => {
      if(getNotificationListerner.current && responseNotificationListerner.current){
        Notifications.removeNotificationSubscription(getNotificationListerner.current);
        Notifications.removeNotificationSubscription(getNotificationListerner.current);
      }
    }

  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
