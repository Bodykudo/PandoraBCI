import { ImageURISource } from 'react-native';

export interface Move {
  id: number;
  emoji: ImageURISource;
  title: string;
  description: string;
}
