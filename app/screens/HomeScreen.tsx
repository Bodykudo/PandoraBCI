import { useState } from 'react';
import { SafeAreaView, ActivityIndicator, Image, View } from 'react-native';
import { RectButton } from '../components/Button';
import FilePicker from '../components/FilePicker';
import { useNavigation } from '@react-navigation/native';
import { DocumentPickerResult } from 'expo-document-picker';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = async (result: DocumentPickerResult) => {
    if (!result.canceled) {
      console.log(result.assets);

      const file = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].name,
      };

      const formData = new FormData();
      if (result.assets[0].file) {
        formData.append('file', result.assets[0].file);
      } else {
        // @ts-ignore
        formData.append('file', file);
      }
      setIsLoading(true);
      const response = await fetch('http://192.168.1.3:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const responseJson = await response.json();
      setIsLoading(false);
      console.log(responseJson);
      if (response.ok) {
        // @ts-ignore
        navigation.navigate('Prediction', { data: responseJson.data });
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
      }}
    >
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            width: '100%',
            height: '100%',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size='large' />
        </View>
      )}
      <Image
        source={require('../assets/logo2.png')}
        resizeMode='contain'
        style={{ width: 200, height: 80 }}
      />

      <View
        style={{
          marginVertical: 'auto',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        <FilePicker title='Upload EEG Signal' handleFile={handleUploadFile} />
        <RectButton
          minWidth={240}
          fontSize={14}
          // @ts-ignore
          handlePress={() => navigation.navigate('Control')}
          title='Control Robotic Arm'
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
