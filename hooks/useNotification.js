import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";

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

  const sendNotification = async ({
    title,
    body,
    data,
    sound = null,
    trigger = null,
  }) => {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: sound ? sound : undefined,
      },
      trigger,
    });
    return id;
  };

  const cancelNotification = async (id) => {
    await Notifications.cancelScheduledNotificationAsync(id);
  };

  return { sendNotification, cancelNotification };
};
