import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/Home/homeScreen";
import SettingScreen from "./screen/Setting/settingScreen";
import ProcessScreen from "./screen/Process/processScreen";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform, ActivityIndicator } from "react-native";
import TimerScreen from "./screen/Timer/timerScreen";
import CompleteScreen from "./screen/Complete/completeScreen";
import { FontProvider } from "./context/fontContext";

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
    <FontProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="Process" component={ProcessScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="Complete" component={CompleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontProvider>
  );
}

export default App;
