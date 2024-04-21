import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  section: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    paddingTop: verticalScale(59),
    paddingBottom: verticalScale(12),
    paddingLeft: scale(24),
    paddingRight: scale(24),
    borderBottomColor: "#4B4B4B",
    borderBottomWidth: moderateScale(2),
  },
  text: {
    color: "#1B1B1B",
    fontSize: moderateScale(16),
    // fontFamily: "Pretendard_SemiBold",
    alignSelf: "center",
    right: scale(12),
  },
  icon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  iconBox: { alignSelf: "center" },
  padding: { paddingLeft: scale(24), paddingRight: scale(24) },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginTop: verticalScale(24),
    gap: scale(8), // Note: React Native doesn't support 'gap' in Flexbox yet as of my last update.
    marginBottom: verticalScale(55),
  },
  contentTitle: {
    color: "#1B1B1B",
    // fontFamily: "Pretendard_Bold",
    fontSize: moderateScale(20),
    marginBottom: verticalScale(20),
    paddingLeft: scale(24),
    paddingRight: scale(24),
  },
  contentText: {
    color: "#1B1B1B",
    // fontFamily: "Pretendard_SemiBold",
    fontSize: moderateScale(16),
  },
  contentDes: {
    color: "#636363",
    // fontFamily: "Pretendard_Regular",
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
  },
  line: {
    width: "100%",
    backgroundColor: "#4B4B4B",
    marginBottom: verticalScale(10),
    marginTop: verticalScale(12),
  },
  time: {
    // fontFamily: "Pretendard_SemiBold",
    fontSize: moderateScale(16),
    color: "#969696",
    textAlign: "center",
    paddingTop: verticalScale(4),
    paddingBottom: verticalScale(4),
  },
  timeSection: {
    borderColor: "#B9B9B9",
    borderWidth: moderateScale(2),
    width: scale(100),
    borderRadius: moderateScale(4),
    backgroundColor: "#E1E1E1",
  },
});
