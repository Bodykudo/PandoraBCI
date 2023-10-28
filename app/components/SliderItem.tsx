import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Animated,
  Easing,
} from 'react-native';
import { DataType } from '../utils/data';

type Props = {
  item: DataType;
};

const { width, height } = Dimensions.get('window');

const SliderItem = ({ item }: Props) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.emoji}
        resizeMode='contain'
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.id - 1}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Button title='Play Action' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    // fontSize: 200,
    // textAlign: 'center',
    flex: 0.6,
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
});

export default SliderItem;
