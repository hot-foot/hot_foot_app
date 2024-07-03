import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
    borderBottomWidth: moderateScale(2),
  },
  icon: {
    height: moderateScale(24),
    width: moderateScale(24),
    alignSelf: "center",
  },
  text: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    right: scale(10),
    color: "#1B1B1B",
    fontSize: moderateScale(16),
    fontFamily: "Pretendard_SemiBold",
  },
  totalSection: {
    flexDirection: "column",
    marginTop: verticalScale(20),
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  totalTitleText: {
    fontSize: moderateScale(22),
    fontFamily: "Pretendard_Bold",
    marginBottom: verticalScale(10),
    color: "#1B1B1B",
  },
  totalSubTitleText: {
    fontSize: moderateScale(20),
    fontFamily: "Pretendard_Regular",
    color: "#1B1B1B",
    marginBottom: moderateScale(8),
  },
  totalTimerText: {
    fontSize: moderateScale(20),
    fontFamily: "Pretendard_Bold",
    color: "#1B1B1B",
  },
  todoImageBackgound: {
    marginTop: verticalScale(20),
    width: scale(100),
    height: scale(100),
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: moderateScale(2),
    borderColor: "#4B4B4B",
  },
  todoImage: {
    width: moderateScale(76),
    height: moderateScale(76),
  },
  todoSection: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    borderTopColor: "#4B4B4B",
    borderTopWidth: moderateScale(2),
    flexDirection: "column",
    marginTop: verticalScale(15),
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  todoTitleText: {
    marginTop: verticalScale(20),
    fontSize: moderateScale(22),
    fontFamily: "Pretendard_Regular",
    color: "#1B1B1B",
    marginBottom: verticalScale(16),
  },
  todoTimerText: {
    fontSize: moderateScale(22),
    fontFamily: "Pretendard_Bold",
    color: "#1B1B1B",
  },
  todoButton: {
    borderRadius: 100,
    borderWidth: moderateScale(2),
    borderColor: "#4B4B4B",
    width: moderateScale(64),
    height: moderateScale(64),
    backgroundColor: "#FFC4CA",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  skip: {
    height: moderateScale(32),
    width: moderateScale(32),
    alignSelf: "center",
  },
  skipSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  skipTooltip: {
    marginTop: verticalScale(20),
    height: moderateScale(44),
    width: scale(137),
    position: "absolute",
    left: scale(65),
    top: verticalScale(10),
  },
  skipTooltipText: {
    fontSize: moderateScale(11),
    fontFamily: "Pretendard_Regular",
    textAlign: "left",
    color: "#FFFFFF",
    left: scale(17),
    top: verticalScale(3),
    height: moderateScale(40),
    width: scale(115),
    zIndex: 1,
    lineHeight: moderateScale(18),
    letterSpacing: -0.01,
  },
  todoListSection: {
    position: "absolute",
    bottom: verticalScale(20),
    width: verticalScale(315),
    height: verticalScale(90),
    backgroundColor: "#FFF",
    borderTopColor: "#4B4B4B",
    flexDirection: "row",
    zIndex: 3,
  },
  todo: {
    width: "33.3%",
    height: "100%",
    paddingHorizontal: verticalScale(5),
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
  },
  todoListTitleText: {
    fontSize: moderateScale(16),
    fontFamily: "Pretendard_SemiBold",
    textAlign: "center",
    color: "#1B1B1B",
    marginBottom: verticalScale(2),
  },
  todoListTimeText: {
    fontSize: moderateScale(14),
    fontFamily: "Pretendard_Regular",
    textAlign: "center",
    color: "#1B1B1B",
    marginTop: verticalScale(2),
  },
  svgContainer: {
    zIndex: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
