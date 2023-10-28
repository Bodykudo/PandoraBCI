import {
  View,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  SafeAreaView,
} from 'react-native';
import { data } from '../utils/data';
import SliderItem from './SliderItem';
import Pagination from './Pagination';
import { useRef, useState } from 'react';

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
        data={data}
        renderItem={({ item }) => <SliderItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
      />
      <Pagination data={data} scrollX={scrollX} />
    </View>
  );
};

export default Slider;
