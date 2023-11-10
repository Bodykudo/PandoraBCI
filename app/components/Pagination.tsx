import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Move } from '../types';

type Props = {
  data: Move[];
  scrollX: Animated.Value;
};

const { width } = Dimensions.get('window');

const Pagination = ({ data, scrollX }: Props) => {
  console.log(scrollX);

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', '#000', '#ccc'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={[styles.dot, { width: dotWidth, opacity, backgroundColor }]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});

export default Pagination;
