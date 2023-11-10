import { View } from 'react-native';
import { CircleButton } from './Button';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onClick?: any;
}

export default function BackButton({ onClick }: Props) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        top: 60,
        left: 30,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <CircleButton
        imgUrl={require('../assets/left.png')}
        handlePress={onClick ? onClick : () => navigation.goBack()}
      />
    </View>
  );
}
