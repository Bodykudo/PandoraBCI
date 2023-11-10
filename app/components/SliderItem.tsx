import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { RectButton } from './Button';
import { useState } from 'react';
import { Move } from '../types';

type Props = {
  item: Move;
  hideButton?: boolean;
};

const { width, height } = Dimensions.get('window');

const SliderItem = ({ item, hideButton = false }: Props) => {
  const translateYImage = new Animated.Value(40);
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateMove(move: number) {
    const body = {
      move,
    };

    const data = {
      move,
    };

    setIsUpdating(true);
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/arm/move`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    setIsUpdating(false);
  }

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
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {!hideButton && (
          <RectButton
            minWidth={180}
            fontSize={14}
            handlePress={() => updateMove(item.id)}
            title='Play Action'
            isDisabled={isUpdating}
          />
        )}
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
