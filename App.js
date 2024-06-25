import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/Home/homeScreen";
import SettingScreen from "./screen/Setting/settingScreen";
import ProcessScreen from "./screen/Process/processScreen";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform, ActivityIndicator } from "react-native";
import TimerScreen from "./screen/Timer/timerScreen";
import CompleteScreen from "./screen/Complete/completeScreen";
import { FontProvider } from "./context/fontContext";
import Navigation from "./Navigation";
import * as SplashScreen from "expo-splash-screen";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://c95d443b0c9028d7f8de457dd4c374db@o4507425556463616.ingest.us.sentry.io/4507425560461312",
});

const projectId = Constants.expoConfig.extra.eas.projectId;
console.log("project Id 입니다 :::", projectId);

const Stack = createNativeStackNavigator();

// 앱이 포그라운드 상태일 때
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 알림 울리기
async function schedulePushNotification(data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "테스트 알림",
      body: data,
    },
    trigger: null,
  });
}

function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const customFonts = {
    // Pretendard
    Pretendard_Thin: require("./assets/fonts/Pretendard-Thin.otf"),
    Pretendard_ExtraLight: require("./assets/fonts/Pretendard-ExtraLight.otf"),
    Pretendard_Light: require("./assets/fonts/Pretendard-Light.otf"),
    Pretendard_Regular: require("./assets/fonts/Pretendard-Regular.otf"),
    Pretendard_Medium: require("./assets/fonts/Pretendard-Medium.otf"),
    Pretendard_SemiBold: require("./assets/fonts/Pretendard-SemiBold.otf"),
    Pretendard_Bold: require("./assets/fonts/Pretendard-Bold.otf"),
    Pretendard_ExtraBold: require("./assets/fonts/Pretendard-ExtraBold.otf"),
    Pretendard_Black: require("./assets/fonts/Pretendard-Black.otf"),
  };

  async function loadFonts() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        await initPushNotifications();

        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 3000);
      } catch (error) {
        console.error("Initialization error:", error);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();

    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "",
        "알림을 거부하였습니다. 앱에 대한 알림을 받을 수 없습니다."
      );
      return;
    }

    const { data } = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    console.log("Expo Push Token:", data);
    await AsyncStorage.setItem("device_token", data);
    const device_token = await AsyncStorage.getItem("device_token");
    console.log("이게 디바이스 토큰이지이이이", device_token);

    return data;
  };

  const initPushNotifications = async () => {
    const pushToken = await registerForPushNotificationsAsync();
    setPushToken(pushToken);
    console.log(pushToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  };

  return (
    <>
      {fontsLoaded ? (
        <Navigation />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
      {/* {fontsLoaded ? (
        <Navigation />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )} */}
    </>
  );
}

export default App;
