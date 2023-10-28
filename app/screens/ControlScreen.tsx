import { SafeAreaView, View } from 'react-native';
import Slider from '../components/Slider';
import { CircleButton, RectButton } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function ControlScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Slider />
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
  );
}
