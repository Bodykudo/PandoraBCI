import { SafeAreaView, View, Text } from 'react-native';
import SliderItem from '../components/SliderItem';
import { data } from '../utils/data';
import { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { CurrentRenderContext, useNavigation } from '@react-navigation/native';
import { CircleButton } from '../components/Button';

interface Props {
  route: any;
}

export default function PredictionScreen({ route }: Props) {
  const { data: predictions } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMove, setCurrentMove] = useState(predictions[0]);
  const [timer, setTimer] = useState(0);
  const navigation = useNavigation();

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
      <SafeAreaView>
        <SliderItem item={data[currentMove]} />
        <View
          style={{
            position: 'absolute',
            top: 15,
            left: 30,
            paddingVertical: 14,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <CircleButton text='<' handlePress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
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
          top: 5,
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

  return (
    <>
      {memoizedJSX}
      {memorizedTimerJSX}
    </>
  );
}
