import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ReactNativeWaifu2x from 'react-native-waifu2x';

interface Model {
  name: string;
  uri: string;
}

export default function App() {
  const [model, setModel] = useState<Model | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);

    if (!model) return;

    const imageUri = await ReactNativeWaifu2x.generate(
      result.assets[0].uri,
      FileSystem.documentDirectory + 'image.jpg',
      model.uri,
    );

    console.log('Generating success:', imageUri);

    setGeneratedImage(imageUri);
  };

  const loadModel = async () => {
    const result = await DocumentPicker.getDocumentAsync();

    if (result.canceled) return;

    setModel({
      name: result.assets[0].name,
      uri: result.assets[0].uri,
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Load Model" onPress={() => loadModel()} />
      <Button title="Pick an image" onPress={pickImage} />

      {model && (
        <>
          <Text style={styles.text}>Model Name</Text>
          <Text>{model.name}</Text>
        </>
      )}

      {image && (
        <>
          <Text style={styles.text}>Origin Image</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </>
      )}

      {generatedImage && (
        <>
          <Text style={styles.text}>Generated Image</Text>
          <Image source={{ uri: generatedImage }} style={styles.image} />
        </>
      )}
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
    width: 300,
    height: 300,
  },
  text: {
    marginVertical: 12,
    fontSize: 18,
  },
});
