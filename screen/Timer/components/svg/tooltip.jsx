import * as React from "react";
import Svg, { Path, G, ClipPath, Rect, Defs } from "react-native-svg";

// ToolTip.svg
const ToolTip = (props) => (
  <Svg
    width="137"
    height="44"
    viewBox="0 0 137 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M0 22L6 17V27L0 22Z" fill="#4B4B4B" />
    <Rect x="6" width="131" height="44" rx="2" fill="#4B4B4B" />
    <Path
      d="M22.4844 7.53125V11.6562H24.2305V12.4297H22.4844V17.9727H21.5703V7.53125H22.4844ZM19.7422 8.55078V9.3125H15.793V14.5859C17.6797 14.5859 19.0156 14.498 20.5625 14.2109L20.6797 15.0078C19.0508 15.3008 17.6797 15.3594 15.6992 15.3594H14.8789V8.55078H19.7422ZM29.4191 7.76562C31.6808 7.76562 33.0988 8.49219 33.0988 9.74609C33.0988 10.9766 31.6808 11.6914 29.4191 11.6914C27.1573 11.6914 25.7277 10.9766 25.7277 9.74609C25.7277 8.49219 27.1573 7.76562 29.4191 7.76562ZM29.4191 8.50391C27.7316 8.50391 26.6652 8.97266 26.6769 9.74609C26.6652 10.5078 27.7316 10.9531 29.4191 10.9648C31.0831 10.9531 32.1613 10.5078 32.1613 9.74609C32.1613 8.97266 31.0831 8.50391 29.4191 8.50391ZM33.005 14.3867V17.8086H25.8331V14.3867H33.005ZM26.7472 15.125V17.0586H32.1027V15.125H26.7472ZM34.1652 12.5938V13.3555H24.673V12.5938H34.1652ZM45.9603 7.49609V10.0273H47.5423V10.7891H45.9603V13.2617H45.0462V7.49609H45.9603ZM45.9603 13.8008V16.1094H40.2416V17.1289H46.347V17.832H39.3392V15.4297H45.0462V14.4922H39.3158V13.8008H45.9603ZM44.0502 8.48047V9.21875H37.8392V8.48047H40.4877V7.42578H41.4017V8.48047H44.0502ZM40.9447 9.6875C42.4564 9.6875 43.4408 10.3438 43.4525 11.3984C43.4408 12.4531 42.4564 13.1094 40.9447 13.1094C39.4212 13.1094 38.4252 12.4531 38.4369 11.3984C38.4252 10.3438 39.4212 9.6875 40.9447 9.6875ZM40.9447 10.3672C39.9603 10.3672 39.3041 10.7773 39.3158 11.3984C39.3041 12.0312 39.9603 12.418 40.9447 12.418C41.9291 12.418 42.5736 12.0312 42.5853 11.3984C42.5736 10.7773 41.9291 10.3672 40.9447 10.3672ZM53.9117 7.91797C55.4703 7.92969 56.607 8.86719 56.607 10.2266C56.607 11.5859 55.4703 12.5234 53.9117 12.5234C52.3297 12.5234 51.2047 11.5859 51.2047 10.2266C51.2047 8.86719 52.3297 7.92969 53.9117 7.91797ZM53.9117 8.69141C52.8688 8.69141 52.0953 9.32422 52.107 10.2266C52.0953 11.1406 52.8688 11.7734 53.9117 11.7734C54.943 11.7734 55.7164 11.1406 55.7164 10.2266C55.7164 9.32422 54.943 8.69141 53.9117 8.69141ZM59.5602 7.53125V12.8867H58.6461V7.53125H59.5602ZM59.5602 13.3906V15.8984H53.7125V17.0703H59.9352V17.8086H52.8102V15.207H58.6461V14.1289H52.7867V13.3906H59.5602ZM70.7487 15.8867V16.6602H61.2097V15.8867H65.4987V13.918H62.405V10.707H68.6394V9.06641H62.3816V8.30469H69.5417V11.457H63.3191V13.1562H69.7878V13.918H66.4011V15.8867H70.7487ZM82.9892 14.0469V17.8086H76.2392V14.0469H82.9892ZM77.1416 14.7852V17.0586H82.0869V14.7852H77.1416ZM75.8994 8.16406V12.0664C77.5283 12.0723 78.9052 11.9668 80.4228 11.6562L80.54 12.4414C78.9228 12.7695 77.5048 12.8633 75.7705 12.8633H74.9736V8.16406H75.8994ZM82.9892 7.53125V13.543H82.0634V10.2617H79.0634V9.51172H82.0634V7.53125H82.9892ZM87.4044 8.33984C88.8223 8.35156 89.8419 9.56445 89.9942 11.5156H92.3262V7.53125H93.2403V17.9727H92.3262V12.2773H90.0059C89.8946 14.3164 88.8575 15.5938 87.4044 15.5938C85.8692 15.5938 84.7911 14.1875 84.7911 11.9727C84.7911 9.75781 85.8692 8.35156 87.4044 8.33984ZM87.4044 9.16016C86.3731 9.17188 85.67 10.2734 85.67 11.9727C85.67 13.6719 86.3731 14.7734 87.4044 14.7734C88.4239 14.7734 89.1387 13.6719 89.1387 11.9727C89.1387 10.2734 88.4239 9.17188 87.4044 9.16016ZM102.917 7.53125V11.7734H104.605V12.5469H102.917V17.9492H102.003V7.53125H102.917ZM100.222 8.65625C100.222 11.6094 98.8391 14.293 95.4406 15.9688L94.925 15.2422C97.6203 13.9004 99.0852 11.8965 99.2961 9.42969H95.4055V8.65625H100.222ZM110.274 8.57422V10.0391H112.828V7.53125H113.743V17.9727H112.828V13.6719H110.274V15.3125H105.528V8.57422H110.274ZM106.442 9.30078V14.5742H109.383V9.30078H106.442ZM110.274 12.9102H112.828V10.8008H110.274V12.9102ZM23.9141 30.9336V31.6953H14.4219V30.9336H18.7109V29.6328H19.6133V30.9336H23.9141ZM19.6133 25.5078V26.5508H22.9531V27.3008H19.6719C19.748 28.4551 21.4004 29.252 23.3516 29.4336L23.0703 30.1484C21.3418 29.9668 19.8008 29.3457 19.168 28.2969C18.5293 29.3457 16.9824 29.9668 15.2656 30.1484L14.9727 29.4336C16.9238 29.252 18.5762 28.4551 18.6641 27.3008H15.4062V26.5508H18.7109V25.5078H19.6133ZM19.168 32.4805C21.4297 32.4805 22.7422 33.0898 22.7539 34.2031C22.7422 35.3281 21.4297 35.9258 19.168 35.9258C16.9062 35.9258 15.5703 35.3281 15.5703 34.2031C15.5703 33.0898 16.9062 32.4805 19.168 32.4805ZM19.168 33.1719C17.4805 33.1719 16.4961 33.5469 16.5078 34.2031C16.4961 34.8594 17.4805 35.2227 19.168 35.2109C20.832 35.2227 21.8281 34.8594 21.8281 34.2031C21.8281 33.5469 20.832 33.1719 19.168 33.1719ZM31.092 27.7109C31.092 29.1289 32.135 30.3945 33.6702 30.9336L33.1545 31.6133C31.9944 31.209 31.092 30.3535 30.6467 29.2695C30.2014 30.4707 29.2463 31.4375 28.0217 31.8945L27.5295 31.1562C29.0881 30.5938 30.178 29.1992 30.1897 27.7109V27.207H27.8342V26.4453H33.4358V27.207H31.092V27.7109ZM35.7092 25.5312V28.7305H37.2795V29.4922H35.7092V33.1484H34.7952V25.5312H35.7092ZM36.1897 34.9531V35.7266H29.1936V32.4805H30.0959V34.9531H36.1897ZM40.6166 26.3398C41.5716 26.3457 42.3451 26.9023 42.7962 27.8633H45.5384V25.5312H46.4525V35.9727H45.5384V31.9297H42.8666C42.4271 32.9844 41.6244 33.5938 40.6166 33.5938C39.0814 33.5938 38.0033 32.1875 38.0033 29.9727C38.0033 27.7578 39.0814 26.3516 40.6166 26.3398ZM40.6166 27.1602C39.5853 27.1719 38.8822 28.2734 38.8822 29.9727C38.8822 31.6719 39.5853 32.7734 40.6166 32.7734C41.6361 32.7734 42.3509 31.6719 42.3509 29.9727C42.3509 28.2734 41.6361 27.1719 40.6166 27.1602ZM43.0658 28.6367C43.1595 29.041 43.2181 29.4863 43.2181 29.9727C43.2181 30.4004 43.1712 30.8047 43.1009 31.168H45.5384V28.6367H43.0658ZM54.6617 28.332C54.65 30.2305 55.9508 32.1523 57.4859 32.8438L56.9234 33.5703C55.7398 32.9902 54.7145 31.7656 54.2164 30.2773C53.7301 31.8535 52.7047 33.166 51.4859 33.7812L50.9 33.0078C52.4469 32.293 53.7359 30.3125 53.7477 28.332V26.4336H54.6617V28.332ZM59.5484 25.5312V35.9727H58.6227V25.5312H59.5484ZM69.3542 25.5312V28.707H70.9245V29.4805H69.3542V33.1602H68.4284V25.5312H69.3542ZM66.5417 26.3398C66.5417 29.0234 64.6198 31.0156 61.6198 31.9531L61.2214 31.2148C63.7175 30.4355 65.3464 28.9473 65.5456 27.1133H61.655V26.3398H66.5417ZM69.8347 34.9531V35.7266H62.8269V32.3867H63.7409V34.9531H69.8347ZM79.8748 30.418V31.168H76.6522V33.8633H80.9998V34.6367H71.4608V33.8633H75.7498V31.168H72.6795V26.3867H79.7694V27.1367H73.6053V30.418H79.8748ZM92.7481 25.5312V28.0859H94.3184V28.8477H92.7481V31.4492H91.8341V25.5312H92.7481ZM89.9005 26.2109C89.8887 28.8359 88.0489 30.7109 84.9669 31.5547L84.5919 30.8164C87.1583 30.125 88.7227 28.7363 88.9161 26.9727H85.0606V26.2109H89.9005ZM92.7481 31.9297V35.8086H86.1505V31.9297H92.7481ZM87.0645 32.6914V35.0586H91.8341V32.6914H87.0645ZM104.394 33.8281V34.5898H94.8547V33.8281H99.1203V31.2734H100.023V33.8281H104.394ZM100.046 27.043C100.046 28.7891 102.109 30.3125 103.925 30.6289L103.515 31.3906C101.927 31.0684 100.251 29.9902 99.5773 28.4844C98.8918 29.9844 97.2277 31.0684 95.6398 31.3906L95.2297 30.6289C97.0461 30.3125 99.0852 28.7891 99.0852 27.043V26.2461H100.046V27.043ZM110.309 27.3359V28.0859H105.082V27.3359H107.25V25.8477H108.164V27.3359H110.309ZM107.696 28.7891C109.008 28.7891 109.946 29.7734 109.957 31.1562C109.946 32.5508 109.008 33.5469 107.696 33.5469C106.395 33.5469 105.457 32.5508 105.457 31.1562C105.457 29.7734 106.395 28.7891 107.696 28.7891ZM107.696 29.5625C106.875 29.5742 106.278 30.2422 106.278 31.1562C106.278 32.082 106.875 32.75 107.696 32.7383C108.528 32.75 109.137 32.082 109.137 31.1562C109.137 30.2422 108.528 29.5742 107.696 29.5625ZM113.977 25.5312V35.9492H113.098V30.6875H111.715V35.4336H110.848V25.7891H111.715V29.9258H113.098V25.5312H113.977ZM124.896 33.8398V34.6133H115.357V33.8398H117.724V31.0273C116.833 30.5645 116.294 29.8145 116.294 28.8711C116.294 27.2539 117.876 26.1992 120.103 26.1875C122.33 26.1992 123.912 27.2539 123.912 28.8711C123.912 29.7969 123.39 30.541 122.529 31.0039V33.8398H124.896ZM120.103 26.9492C118.392 26.9375 117.185 27.7109 117.185 28.8711C117.185 30.0312 118.392 30.8164 120.103 30.8164C121.802 30.8164 123.021 30.0312 123.021 28.8711C123.021 27.7109 121.802 26.9375 120.103 26.9492ZM118.626 33.8398H121.603V31.3555C121.152 31.4785 120.648 31.543 120.103 31.543C119.57 31.543 119.072 31.4844 118.626 31.3672V33.8398ZM126.71 35.0703C126.299 35.0703 125.948 34.7305 125.96 34.3086C125.948 33.8984 126.299 33.5586 126.71 33.5586C127.12 33.5586 127.46 33.8984 127.46 34.3086C127.46 34.7305 127.12 35.0703 126.71 35.0703Z"
      fill="white"
    />
  </Svg>
);

export default ToolTip;
