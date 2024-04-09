import { StyleSheet } from "react-native";

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
    paddingTop: 57,
    paddingBottom: 10,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: "#4B4B4B",
    borderBottomWidth: 2,
  },
  icon: {
    height: 24,
    width: 24,
    alignSelf: "center",
  },
  text: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    right: 10,
    color: "#1B1B1B",
    fontSize: 16,
    fontFamily: "Pretendard_SemiBold",
  },
  totalSection: {
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  totalTitleText: {
    fontSize: 22,
    fontFamily: "Pretendard_Bold",
    marginBottom: 10,
    color: "#1B1B1B",
  },
  totalSubTitleText: {
    fontSize: 20,
    fontFamily: "Pretendard_Regular",
    color: "#1B1B1B",
  },
  totalTimerText: {
    fontSize: 20,
    fontFamily: "Pretendard_Bold",
    color: "#1B1B1B",
  },
  todoImageBackgound: {
    marginTop: 20,
    width: 100,
    height: 100,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#4B4B4B",
  },
  todoImage: {
    width: 64,
    height: 64,
  },
  todoSection: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    borderTopColor: "#4B4B4B",
    borderTopWidth: 2,
    flexDirection: "column",
    gap: 15,
    marginTop: 15,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  todoTitleText: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: "Pretendard_Regular",
    color: "#1B1B1B",
  },
  todoTimerText: {
    fontSize: 22,
    fontFamily: "Pretendard_Bold",
    color: "#1B1B1B",
  },
  todoButton: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#4B4B4B",
    width: 64,
    height: 64,
    backgroundColor: "#FFC4CA",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  skip: {
    height: 32,
    width: 32,
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
    height: 44,
    width: 137,
    position: "absolute",
    left: 70,
    top: 10,
  },
  skipTooltipText: {
    fontSize: 12,
    fontFamily: "Pretendard_Regular",
    textAlign: "left",
    color: "#FFFFFF",
    left: 17,
    top: 3,
    height: 40,
    width: 115,
    zIndex: 1,
    lineHeight: 18,
    letterSpacing: -0.01,
  },
  todoListSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#F5F5F5",
    borderTopColor: "#4B4B4B",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: "row",
    zIndex: 3,
  },
  todoNow: {
    width: "100%",
    flex: 3,
  },
  todoNext1: {
    width: "100%",
    flex: 3,
  },
  todoNext2: {
    width: "100%",
    flex: 2,
  },
  todoListTitleText: {
    fontSize: 16,
    fontFamily: "Pretendard_SemiBold",
    textAlign: "center",
    right: 20,
    marginTop: 10,
    zIndex: 1,
    color: "#1B1B1B",
  },
  todoListTimeText: {
    fontSize: 14,
    fontFamily: "Pretendard_Regular",
    textAlign: "center",
    right: 20,
    marginTop: 35,
    zIndex: 1,
    color: "#1B1B1B",
  },
});
