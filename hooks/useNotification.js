import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const useNotification = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("알림 권한이 거부되었습니다!");
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  const sendNotification = async ({ title, body, data, trigger = null }) => {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger,
    });
    return id;
  };

  const cancelNotification = async ({ id }) => {
    Notifications.cancelScheduledNotificationAsync(id);
  };

  return { sendNotification, cancelNotification };
};
