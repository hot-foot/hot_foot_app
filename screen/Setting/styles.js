import { StyleSheet } from "react-native";

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
    paddingTop: 59,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: "#4B4B4B",
    borderBottomWidth: 2,
  },
  text: {
    color: "#1B1B1B",
    fontSize: 16,
    fontFamily: "Pretendard_SemiBold",
    alignSelf: "center",
    right: 12,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconBox: { alignSelf: "center" },
  padding: { paddingLeft: 24, paddingRight: 24 },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginTop: 24,
    gap: 8,
    marginBottom: 55,
  },
  contentTitle: {
    color: "#1B1B1B",
    fontFamily: "Pretendard_Bold",
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
  },
  contentText: {
    color: "#1B1B1B",
    fontFamily: "Pretendard_SemiBold",
    fontSize: 16,
  },
  contentDes: {
    color: "#636363",
    fontFamily: "Pretendard_Regular",
    fontSize: 12,
    marginBottom: 4,
  },
  line: {
    width: "100%",
    backgroundColor: "#4B4B4B",
    marginBottom: 10,
    marginTop: 12,
  },
  time: {
    fontFamily: "Pretendard_SemiBold",
    fontSize: 16,
    color: "#969696",
    textAlign: "center",
    paddingTop: 4,
    paddingBottom: 4,
  },
  timeSection: {
    borderColor: "#B9B9B9",
    borderWidth: 2,
    width: 100,
    borderRadius: 4,
    backgroundColor: "#E1E1E1",
  },
});
