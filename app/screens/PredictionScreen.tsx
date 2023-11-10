import { View, Text, Modal, Pressable, Alert, StyleSheet } from 'react-native';
import SliderItem from '../components/SliderItem';
import { moves } from '../utils/data';
import { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import Layout from '../components/Layout';

interface Props {
  route: any;
}

export default function PredictionScreen({ route }: Props) {
  const { data: predictions } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMove, setCurrentMove] = useState(predictions[0]);
  const [timer, setTimer] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  async function resetArm() {
    // ESP Server
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/arm/reset`,
      {
        method: 'PUT',
      }
    );
    if (response.ok) {
      navigation.goBack();
    }
    setModalVisible(false);
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  useEffect(() => {
    if (predictions[currentIndex] !== currentMove) {
      setCurrentMove(predictions[currentIndex]);
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log(currentMove);
  }, [currentMove]);

  useEffect(() => {
    if (currentIndex < predictions.length - 1) {
      const interval = setInterval(
        () => {
          setCurrentIndex((i) => i + 1);
        },
        predictions[currentIndex] === 0
          ? predictions[currentIndex + 1] === 0
            ? 1000
            : 3000
          : 5000
      );

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentIndex]);

  // Use useMemo to memoize the JSX that depends on currentMove
  const memoizedJSX = useMemo(
    () => (
      <Layout>
        <SliderItem item={moves[currentMove]} hideButton />
        <BackButton onClick={() => setModalVisible(true)} />
      </Layout>
    ),
    [currentMove]
  );

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const memorizedTimerJSX = useMemo(
    () => (
      <View
        style={{
          position: 'absolute',
          top: 55,
          right: 30,
          paddingVertical: 14,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: '#333',
          }}
        >
          {formatTime(timer)}
        </Text>
      </View>
    ),
    [timer]
  );

  const memorizedModal = useMemo(
    () => (
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to go back? The arm will stop.
            </Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={resetArm}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    ),
    [modalVisible]
  );

  return (
    <>
      {memoizedJSX}
      {memorizedTimerJSX}
      {memorizedModal}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
