import { useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet } from 'react-native';
import { RectButton } from '../components/Button';
import FilePicker from '../components/FilePicker';
import { useNavigation } from '@react-navigation/native';
import { DocumentPickerResult } from 'expo-document-picker';
import Layout from '../components/Layout';

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
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      console.log(apiUrl);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/predict`,
        {
          method: 'POST',
          body: formData,
        }
      );

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
    <Layout>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#C6013F' />
        </View>
      )}
      <Image
        source={require('../assets/logo2.png')}
        resizeMode='contain'
        style={styles.logo}
      />

      <View style={styles.buttonsList}>
        <FilePicker title='Upload EEG Signal' handleFile={handleUploadFile} />
        <RectButton
          minWidth={240}
          fontSize={14}
          // @ts-ignore
          handlePress={() => navigation.navigate('Control')}
          title='Control Robotic Arm'
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 400, height: 160 },
  buttonsList: {
    marginVertical: 'auto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
});

export default HomeScreen;
