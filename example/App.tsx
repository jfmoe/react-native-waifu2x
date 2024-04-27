import { StyleSheet, Text, View } from 'react-native';

import * as ReactNativeWaifu2x from 'react-native-waifu2x';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ReactNativeWaifu2x.hello()}</Text>
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
});
