// 24시간제 시간을 12시간제로 변환
const formatTo12HourClock = (hours) => {
  const newHours = hours % 12 || 12;
  return formatTime(newHours);
};

// 시간을 두 자리 문자열로 변환
export const formatTime = (time) => {
  return time < 10 ? `0${time}` : `${time}`;
};

export const formatAMPM = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${formatTo12HourClock(hours)} 시간  ${formatTime(
    minutes
  )} 분 `;
  return formattedTime;
};

export const formatAMPM2 = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${formatTo12HourClock(hours)} : ${formatTime(
    minutes
  )} ${ampm}`;
  return formattedTime;
};

export const formatAMPM3 = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${formatTo12HourClock(hours)} : ${formatTime(
    minutes
  )} ${ampm}`;
  return formattedTime;
};

export const koreanLocaleTime = (date) => {
  const time = new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  const splitTime = time.split(":");
  return { hour: Number(splitTime[0]), minute: Number(splitTime[1]) };
};
