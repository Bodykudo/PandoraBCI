import { ImageURISource } from 'react-native';

export interface DataType {
  id: number;
  emoji: ImageURISource;
  title: string;
  description: string;
}

export const data: DataType[] = [
  {
    id: 1,
    emoji: require('../assets/dislike.png'),
    title: 'Thumbs Up',
    description: 'Hehe',
  },
  {
    id: 2,
    emoji: require('../assets/ok.png'),
    title: 'Wave',
    description: 'Hehe',
  },
  {
    id: 3,
    emoji: require('../assets/weew.png'),
    title: 'Thumbs Down',
    description: 'Hehe',
  },
  {
    id: 4,
    emoji: require('../assets/look.png'),
    title: 'Okay',
    description: 'Hehe',
  },
  {
    id: 5,
    emoji: require('../assets/look2.png'),
    title: 'Idk',
    description: 'Hehe',
  },
  {
    id: 6,
    emoji: require('../assets/look2.png'),
    title: 'fdfdfd',
    description: 'Hehe',
  },
];
