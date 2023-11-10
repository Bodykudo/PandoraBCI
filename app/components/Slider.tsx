import {
  View,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { moves } from '../utils/data';
import SliderItem from './SliderItem';
import Pagination from './Pagination';
import { useRef } from 'react';

type Props = {};

const Slider = (props: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(e);
  };

  return (
    <View>
      <FlatList
        data={moves}
        renderItem={({ item }) => <SliderItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
      />
      <Pagination data={moves} scrollX={scrollX} />
    </View>
  );
};

export default Slider;
