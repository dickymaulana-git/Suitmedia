import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Color from '../config/color';

export default function LoginScreen({navigation}) {
  const [palindrome, setPalindrome] = useState('');
  const [name, setName] = useState('');

  const palindromeChecker = () => {
    const text = palindrome.toLowerCase();
    var len = text.length;
    var mid = Math.floor(len / 2);

    for (var i = 0; i < mid; i++) {
      if (text[i] !== text[len - 1 - i]) {
        return alert('Not Palindrome');
      }
    }
    return alert('Is Palindrome');
  };

  const nextHandler = async () => {
    await AsyncStorage.setItem('name', name);
    await navigation.navigate('HomeScreen');
  };

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ImageBackground
        style={styles.container}
        source={require('../assets/img/background1.png')}>
        <Image source={require('../assets/img/ic_photo.png')} />
        <View style={styles.wrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Palindrome"
            value={palindrome}
            onChangeText={setPalindrome}
          />
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={palindromeChecker}>
            <Text style={styles.loginText}>CHECK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={nextHandler}>
            <Text style={styles.loginText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: Color.textWhite,
    width: 310,
    marginVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  wrapper: {
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: Color.primary,
    width: 310,
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: Color.textWhite,
  },
});
