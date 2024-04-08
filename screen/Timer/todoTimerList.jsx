import moment from "moment";
import { Text, View } from "react-native";
import styles from "./styles";
import Svg, { Polygon } from "react-native-svg";

const TodoTimerList = ({ lastes }) => {
  const minutesToString = (minutes) => {
    const duration = moment.duration(minutes * 60, "seconds");
    return moment.utc(duration.asMilliseconds()).format("HH : mm : ss");
  };

  return (
    <>
      <View style={styles.todoNow}>
        <Text style={styles.todoListTitleText}>{lastes[0].name}</Text>
        <Text style={styles.todoListTimeText}>
          {minutesToString(lastes[0].minutes)}
        </Text>
        {lastes.length >= 2 ? (
          <Svg style={{ zIndex: 0, position: "absolute" }}>
            <Polygon
              points="-1,-1 -1,110 110,110 130,50 110,-1"
              fill="#B9B9B9"
              stroke="#4B4B4B"
              strokeWidth="2"
            />
          </Svg>
        ) : (
          <Svg style={{ zIndex: 0, position: "absolute" }}>
            <Polygon
              points="-1,-1 -1,110 110,110 110,-1"
              fill="#B9B9B9"
              stroke="#4B4B4B"
              strokeWidth="2"
            />
          </Svg>
        )}
      </View>
      {lastes.length >= 2 ? (
        <View style={styles.todoNext1}>
          <Text style={styles.todoListTitleText}>{lastes[1].name}</Text>
          <Text style={styles.todoListTimeText}>
            {minutesToString(lastes[1].minutes)}
          </Text>
          {lastes.length >= 3 ? (
            <Svg style={{ zIndex: 0, position: "absolute" }}>
              <Polygon
                points="-1,-1 -1,100 100,100 125,50 100,-1"
                fill="#F5F5F5"
                stroke="#4B4B4B"
                strokeWidth="2"
              />
            </Svg>
          ) : (
            <Svg style={{ zIndex: 0, position: "absolute" }}>
              <Polygon
                points="-1,-1 -1,100 110,100 110,-1"
                fill="#F5F5F5"
                stroke="#4B4B4B"
                strokeWidth="2"
              />
            </Svg>
          )}
        </View>
      ) : (
        <View style={styles.todoNext1}></View>
      )}
      {lastes.length >= 3 ? (
        <View style={styles.todoNext2}>
          <Text style={styles.todoListTitleText}>{lastes[2].name}</Text>
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

export default TodoTimerList;
