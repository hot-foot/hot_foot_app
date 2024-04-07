import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5F8D1",
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
  inputTitle: {
    paddingLeft: 8,
    paddingBottom: 4,
    color: "#636363",
    fontSize: 10,
    fontFamily: "Pretendard_Regular",
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
  textInput: {
    backgroundColor: "#fff",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: "#B9B9B9",
    borderBottomWidth: 2,
    height: 50,
    fontSize: 28,
  },
  textCount: {
    textAlign: "right",
    color: "#636363",
    fontSize: 12,
    fontFamily: "Pretendard_Regular",
    paddingRight: 8,
    paddingTop: 2,
  },
  topText: {
    color: "#1B1B1B",
    fontSize: 16,
    fontFamily: "Pretendard_Regular",
  },
  topSubText: {
    fontSize: 16,
    fontFamily: "Pretendard_SemiBold",
  },
  icon: {
    height: 24,
    width: 24,
    alignSelf: "center",
  },
  plusButtonContainer: {
    marginTop: 8,
    marginBottom: 32,
    alignItems: "center",
  },
  line: {
    height: 2,
    width: "100%",
    backgroundColor: "#4B4B4B",
  },
  timeContainer: {
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
  },
  timeSection: { flexDirection: "row", justifyContent: "space-between" },
  bottomText: {
    color: "#1B1B1B",
    fontSize: 20,
    fontFamily: "Pretendard_Regular",
  },
  bottomSubText: {
    fontSize: 20,
    fontFamily: "Pretendard_Regular",
  },
  middleSection: {
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  noticeText: {
    padding: 8,
    color: "#636363",
    fontSize: 10,
    fontFamily: "Pretendard_Medium",
    textAlign: "center",
  },
  bottomSection: {
    paddingRight: 8,
    paddingLeft: 8,
    gap: 8,
    marginBottom: 24,
  },
  bottomBox: {
    justifyContent: "flex-end",
    gap: 8,
    flexDirection: "row",
  },
  buttonTopText: {
    fontSize: 12,
    fontFamily: "Pretendard_Regular",
    color: "#B9B9B9",
    textAlign: "center",
  },
});
