import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';


const CompleteScreen = () => {
  const navigation = useNavigation();

  const handleComplete = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>타이머</Text>
      </View>
      <View style={styles.completeSection}>
        <Text style={styles.completeTitle}>출근 준비 과정명</Text>
        <Text style={styles.completeText}>출근 준비 과정명</Text>
        <Text style={styles.completeText}>과정을 완료했어요!</Text>
        <View style={styles.animationSection}>
          <Text>TODO:애니메이션표시</Text>
        </View>
        <Text style={styles.questionText}>이제 밖으로 나가볼까요?</Text>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handleComplete}>
          <View style={styles.completeButton}>
            <Text style={styles.buttonText}>종료하고 외출하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompleteScreen;
