import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import Header from './components/Header';

export default function WebViewScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header onPressBack={() => navigation.goBack()} />
      <WebView
        style={styles.webViewContainer}
        source={{uri: 'https://suitmedia.com/'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    margin: 10,
  },
});
