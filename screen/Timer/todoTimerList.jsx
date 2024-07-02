import moment from "moment";
import { Text, View, Platform } from "react-native";
import styles from "./styles";
import IosList1 from "../../assets/img/indicator/list_1_ios.svg";
import IosList2 from "../../assets/img/indicator/list_2_ios.svg";
import IosList3 from "../../assets/img/indicator/list_3_ios.svg";
import AosList1 from "../../assets/img/indicator/list_1_aos.svg";
import AosList2 from "../../assets/img/indicator/list_2_aos.svg";
import AosList3 from "../../assets/img/indicator/list_3_aos.svg";

const TodoTimerList = ({ lastes }) => {
  const minutesToString = (minutes) => {
    const duration = moment.duration(minutes * 60, "seconds");
    return moment.utc(duration.asMilliseconds()).format("HH : mm : ss");
  };

  const ensureTwoLines = (str) => {
    if (str.length > 9) {
      return str.slice(0, 9) + "\n" + str.slice(9);
    }
    return str;
  };

  return (
    <>
      <BackgroundSVG length={lastes.length} />
      <View style={styles.todoNow}>
        <Text
          style={styles.todoListTitleText}
          numberOfLines={2}
          lineHeight={20}
        >
          {ensureTwoLines(lastes[0].name)}
        </Text>
        <Text style={styles.todoListTimeText}>
          {minutesToString(lastes[0].minutes)}
        </Text>
      </View>
      {lastes.length >= 2 ? (
        <View style={styles.todoNext1}>
          <Text
            style={styles.todoListTitleText}
            numberOfLines={2}
            lineHeight={20}
          >
            {ensureTwoLines(lastes[1].name)}
          </Text>
          <Text style={styles.todoListTimeText}>
            {minutesToString(lastes[1].minutes)}
          </Text>
        </View>
      ) : (
        <View style={styles.todoNext1}></View>
      )}
      {lastes.length >= 3 ? (
        <View style={(styles.todoNext2, styles.lastText)}>
          <Text
            style={styles.todoListTitleText}
            numberOfLines={2}
            lineHeight={20}
          >
            {ensureTwoLines(lastes[2].name)}
          </Text>
          <Text style={styles.todoListTimeText}>
            {minutesToString(lastes[2].minutes)}
          </Text>
        </View>
      ) : (
        <View style={styles.todoNext2}></View>
      )}
    </>
  );
};

function BackgroundSVG({ length }) {
  if (length === 0) {
    return;
  }
  if (Platform.OS === "ios") {
    if (length === 1) {
      return (
        <IosList1
          style={{ zIndex: 0, position: "absolute" }}
          width="100%"
          height="100%"
        />
      );
    } else if (length === 2) {
      return (
        <IosList2
          style={{ zIndex: 0, position: "absolute" }}
          width="100%"
          height="100%"
        />
      );
    } else {
      return (
        <IosList3
          style={{ zIndex: 0, position: "absolute" }}
          width="100%"
          height="100%"
        />
      );
    }
  } else {
    if (length === 1) {
      return (
        <AosList1
          style={{ zIndex: 0, position: "absolute" }}
          width="100%"
          height="100%"
        />
      );
    } else if (length === 2) {
      return (
        <AosList2
          style={{ zIndex: 0, position: "absolute" }}
          width="100%"
          height="100%"
        />
      );
    } else {
      return (
        <AosList3
          style={{ zIndex: 0, position: "absolute" }}
          width="100%"
          height="100%"
        />
      );
    }
  }
}

export default TodoTimerList;
