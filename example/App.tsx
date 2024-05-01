import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import * as ReactNativeWaifu2x from 'react-native-waifu2x';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const modelUri = useRef<string | null>(null);

  const readImage = async () => {
    const result = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'image.jpg');
    console.log(result);
  };

  useEffect(() => {
    readImage();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const res = await FileSystem.getInfoAsync(result.assets[0].uri);
    console.log(res);

    /* console.log(result.assets[0].uri); */

    /* ReactNativeWaifu2x.convert(
      result.assets[0].uri,
      modelUri.current,
      FileSystem.documentDirectory + 'image.jpg',
    );
 */
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const subscription = ReactNativeWaifu2x.addChangeListener(({ value }) => {
      console.log(value);
    });

    return () => subscription.remove();
  }, []);

  const handlePress = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    modelUri.current = result.assets[0].uri + '/';
    console.log(result.assets[0]);
  };

  return (
    <View style={styles.container}>
      <Text>{ReactNativeWaifu2x.hello()}</Text>
      <Button title="picker" onPress={() => handlePress()} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Image source={{ uri: FileSystem.documentDirectory + 'image.jpg' }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
