import moment from "moment";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import TodoTimerList from "./todoTimerList";
import { useNavigation } from "@react-navigation/native";
import MsgModal from "../../components/Modal/msgModal";
import { useDatabase } from "../../hooks/useDatabase";
import { useCourse } from "../../hooks/useCourse";
import { useIconImage } from "../../hooks/useIconImage";
import useTimer from "../../hooks/useTimer";
import * as React from "react";
import Skip from "./components/svg/skip";
import ToolTip from "./components/svg/tooltip";

const TimerScreen = ({ route }) => {
  const navigation = useNavigation();
  const { course } = route.params;
  const totalSeconds = course.totalMinute * 60;

  const { openDatabase } = useDatabase();
  const db = openDatabase();
  const { fetchCourseTodo } = useCourse(db);
  const { images } = useIconImage();

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [todoIndex, setTodoIndex] = useState(0);
  const [totalTime, setTotalTime] = useState(
    moment.duration(totalSeconds, "seconds")
  );
  const [todoTime, setTodoTime] = useState(moment.duration(0, "seconds"));
  const [totalCourseMinute, setTotalCourseMinute] = useState(
    course.totalMinute
  );

  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleExitTimer = () => {
    navigation.navigate("Home");
    setModalVisible(false);
  };
  const completeProcess = () => {
    navigation.navigate("Complete", { course });
    setModalVisible(false);
  };

  const doNextTodoTimer = (isFinishedEarly = false) => {
    if (todos.length === 0) {
      return;
    }
    if (todoIndex >= todos.length - 1) {
      if (isFinishedEarly) {
        // 조기 종료 로직
      }
      completeProcess();
      return;
    }
    setTodoIndex((todoIndex) => {
      return todoIndex + 1;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCourseTodo(course.id, setTodos);
    }, 200);
  }, []);

  useEffect(() => {
    if (todos.length === 0) {
      return;
    }
    setTodo(todos[todoIndex]);
    setTodoTime(moment.duration(todos[todoIndex].minutes * 60, "seconds"));
    if (todoIndex >= 1) {
      setTotalTime(
        moment.duration(
          (totalCourseMinute - todos[todoIndex - 1].minutes) * 60,
          "seconds"
        )
      );
      setTotalCourseMinute(totalCourseMinute - todos[todoIndex - 1].minutes);
    }
  }, [todos, todoIndex]);

  useEffect(() => {
    if (todos.length > 0 && todoTime.asSeconds() === 0) {
      doNextTodoTimer();
    }
  }, [todoTime]);

  const totalTick = () => {
    setTotalTime((prevTime) => prevTime.clone().subtract(1, "seconds"));
  };
  const totalTimer = useTimer({
    callback: () => {
      totalTick();
    },
    delay: 1000,
  });
  const todoTick = () => {
    setTodoTime((prevTime) => prevTime.clone().subtract(1, "seconds"));
  };
  const todoTimer = useTimer({
    callback: () => {
      todoTick();
    },
    delay: 1000,
  });

  return todos.length > 0 && todo ? (
    <View style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Image
            source={require("../../assets/img/Icon/close.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>타이머</Text>
      </View>
      <View style={styles.totalSection}>
        <Text style={styles.totalTitleText}>{course.name}</Text>
        <Text style={styles.totalSubTitleText}>총 잔여 시간</Text>
        <Text style={styles.totalTimerText}>
          {moment.utc(totalTime.asMilliseconds()).format("HH : mm : ss")}
        </Text>
        <View style={styles.todoImageBackgound}>
          <Image source={images[todo.iconId]} style={styles.todoImage} />
        </View>
      </View>
      <View style={styles.todoSection}>
        <Text style={styles.todoTitleText}>{todo.name}</Text>
        <Text style={styles.todoTimerText}>
          {moment.utc(todoTime.asMilliseconds()).format("HH : mm : ss")}
        </Text>
        <View style={styles.skipSection}>
          <View style={styles.buttonSection}></View>
          <TouchableOpacity
            onPress={() => {
              doNextTodoTimer(true);
            }}
          >
            <View style={styles.todoButton}>
              <Skip />
            </View>
          </TouchableOpacity>
          <View style={styles.skipTooltip}>
            <ToolTip />
          </View>
        </View>
      </View>
      <View style={styles.todoListSection}>
        <TodoTimerList lastes={todos.slice(todoIndex)} />
      </View>
      <MsgModal
        isVisible={modalVisible}
        message1="타이머를 종료하면 알림을 보내드리지 않아요."
        message2="종료하시겠어요?"
        onClose={handleCloseModal}
        leftBtnText={"취소"}
        rightBtnText={"종료하기"}
        onConfirm={handleExitTimer}
      />
    </View>
  ) : undefined;
};

export default TimerScreen;
