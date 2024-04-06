import { StyleSheet } from "react-native";

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
    paddingTop: 53,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: "#4B4B4B",
    borderBottomWidth: 2,
  },
  text: {
    color: "#1B1B1B",
    fontSize: 28,
    fontFamily: "Pretendard_Bold",
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconBox: { alignSelf: "center" },
  content: {
    marginTop: 16,
    paddingLeft: 24,
    paddingRight: 23,
    gap: 8,
    marginBottom: 55,
  },
  contentText: {
    color: "#1B1B1B",
    fontSize: 20,
    fontFamily: "Pretendard_Regular",
    textAlign: "center",
    paddingTop: 30,
  },
  plusButtonContainer: {
    position: "absolute",
    right: 32,
    bottom: 64,
  },
});
