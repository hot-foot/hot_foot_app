import moment from "moment";
import { Text, View, Platform } from "react-native";
import styles from "./styles";
import AosList1 from "./components/svg/aosList1";
import AosList2 from "./components/svg/aosList2";
import AosList3 from "./components/svg/aosList3";
import IosList1 from "./components/svg/iosList1";
import IosList2 from "./components/svg/iosList2";
import IosList3 from "./components/svg/iosList3";

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
      <View style={styles.todo}>
        <Text style={styles.todoListTitleText} numberOfLines={2}>
          {ensureTwoLines(lastes[0].name)}
        </Text>
        <Text style={styles.todoListTimeText}>
          {minutesToString(lastes[0].minutes)}
        </Text>
      </View>
      {lastes.length >= 2 ? (
        <View style={styles.todo}>
          <Text style={styles.todoListTitleText} numberOfLines={2}>
            {ensureTwoLines(lastes[1].name)}
          </Text>
          <Text style={styles.todoListTimeText}>
            {minutesToString(lastes[1].minutes)}
          </Text>
        </View>
      ) : (
        <View style={styles.todo} />
      )}
      {lastes.length >= 3 ? (
        <View style={styles.todo}>
          <Text style={styles.todoListTitleText} numberOfLines={2}>
            {ensureTwoLines(lastes[2].name)}
          </Text>
          <Text style={styles.todoListTimeText}>
            {minutesToString(lastes[2].minutes)}
          </Text>
        </View>
      ) : (
        <View style={styles.todo} />
      )}
    </>
  );
};

function BackgroundSVG({ length }) {
  if (length === 0) {
    return null;
  }
  const SvgComponent =
    Platform.OS === "ios"
      ? length === 1
        ? IosList1
        : length === 2
        ? IosList2
        : IosList3
      : length === 1
      ? AosList1
      : length === 2
      ? AosList2
      : AosList3;

  return (
    <View style={styles.svgContainer}>
      <SvgComponent width="100%" height="100%" />
    </View>
  );
}

export default TodoTimerList;
