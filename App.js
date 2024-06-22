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
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // const customFonts = {
  //   // Pretendard
  //   Pretendard_Thin: require("./assets/fonts/Pretendard-Thin.otf"),
  //   Pretendard_ExtraLight: require("./assets/fonts/Pretendard-ExtraLight.otf"),
  //   Pretendard_Light: require("./assets/fonts/Pretendard-Light.otf"),
  //   Pretendard_Regular: require("./assets/fonts/Pretendard-Regular.otf"),
  //   Pretendard_Medium: require("./assets/fonts/Pretendard-Medium.otf"),
  //   Pretendard_SemiBold: require("./assets/fonts/Pretendard-SemiBold.otf"),
  //   Pretendard_Bold: require("./assets/fonts/Pretendard-Bold.otf"),
  //   Pretendard_ExtraBold: require("./assets/fonts/Pretendard-ExtraBold.otf"),
  //   Pretendard_Black: require("./assets/fonts/Pretendard-Black.otf"),
  // };

  // async function loadFonts() {
  //   try {
  //     await Font.loadAsync(customFonts);
  //     console.log("Fonts loaded successfully!");
  //     setFontsLoaded(true);
  //   } catch (error) {
  //     console.error("Error loading fonts", error);
  //   }
  // }

  // useEffect(() => {
  //   loadFonts();
  // }, []);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // 알림 허용 시
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // 알림 거부 시
      if (finalStatus !== "granted") {
        Alert.alert(
          "",
          "알림을 거부하였습니다. \n 앱에 대한 알림을 받을 수 없습니다."
        );
        return;
      }

      // 디바이스 토큰 출력 및 저장
      const { data } = await Notifications.getExpoPushTokenAsync();
      console.log("Expo Push Token:", data);
      await AsyncStorage.setItem("device_token", data);
      const device_token = await AsyncStorage.getItem("device_token");

      return data;
    };

    const initPushNotifications = async () => {
      // 알림 채널 설정
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      const pushToken = await registerForPushNotificationsAsync();
      setPushToken(pushToken);
      console.log(pushToken);

      // 알림 수신
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("NOTIFICATION:", notification);
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      // 사용자가 알림을 탭했을 경우 실행
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
    };

    initPushNotifications();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // 알림 예약 함수 호출
  const handleScheduleNotification = async () => {
    const notificationData = "알림 내용 입력";
    await schedulePushNotification(notificationData);
  };

  return (
    <>
      <Navigation />
      {/* {fontsLoaded ? (
        <Navigation />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )} */}
    </>
  );
}

export default App;
