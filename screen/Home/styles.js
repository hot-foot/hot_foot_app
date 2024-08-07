import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE1BD",
  },
  section: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    paddingTop: verticalScale(53),
    paddingBottom: verticalScale(16),
    paddingLeft: scale(24),
    paddingRight: scale(24),
    borderBottomColor: "#4B4B4B",
    borderBottomWidth: moderateScale(2),
  },
  text: {
    color: "#1B1B1B",
    fontSize: moderateScale(28),
    fontFamily: "Pretendard_Bold",
  },
  icon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  iconBox: { alignSelf: "center" },
  content: {
    marginTop: verticalScale(16),
    paddingLeft: scale(24),
    paddingRight: scale(23),
    gap: moderateScale(8),
    marginBottom: verticalScale(55),
  },
  contentText: {
    color: "#1B1B1B",
    fontSize: moderateScale(20),
    fontFamily: "Pretendard_Regular",
    textAlign: "center",
    paddingTop: verticalScale(30),
    lineHeight: moderateScale(30),
  },
  plusButtonContainer: {
    position: "absolute",
    right: scale(32),
    bottom: verticalScale(64),
  },
});
