import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";

const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC4CA",
  },
  section: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    paddingTop: verticalScale(57),
    paddingBottom: verticalScale(10),
    paddingLeft: scale(24),
    paddingRight: scale(24),
    borderBottomColor: "#4B4B4B",
    borderBottomWidth: scale(2),
  },
  text: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    color: "#1B1B1B",
    fontSize: moderateScale(16),
    // fontFamily: "Pretendard_SemiBold",
  },
  completeSection: {
    flexDirection: "column",
    gap: verticalScale(10),
    marginTop: verticalScale(20),
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  completeTitle: {
    fontSize: moderateScale(22),
    // fontFamily: "Pretendard_Bold",
    marginBottom: verticalScale(30),
    color: "#1B1B1B",
  },
  completeText: {
    fontSize: moderateScale(28),
    // fontFamily: "Pretendard_SemiBold",
    color: "#1B1B1B",
  },
  animationSection: {
    width: scale(160),
    height: verticalScale(210),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  questionText: {
    fontSize: moderateScale(22),
    // fontFamily: "Pretendard_Regular",
    color: "#1B1B1B",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    marginBottom: verticalScale(40),
    paddingHorizontal: scale(24),
    alignSelf: "center",
    width: "100%",
  },
  completeButton: {
    flex: 1,
    borderRadius: scale(4),
    borderWidth: scale(2),
    borderColor: "#4B4B4B",
    backgroundColor: "#FF8989",
    alignItems: "center",
    height: verticalScale(46),
    justifyContent: "center",
  },
  buttonText: {
    fontSize: moderateScale(20),
    // fontFamily: "Pretendard_Bold",
    color: "#1B1B1B",
  },
});
