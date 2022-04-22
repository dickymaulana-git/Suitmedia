import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Color from '../config/color';
import color from '../config/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('screen');

export default function HomeScreen({navigation, route}) {
  const userData = route?.params?.item;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('name', (err, res) => {
      if (res) {
        setUserName(res);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header disableBackButton title="Home" />
      <View style={styles.wrapper}>
        <View style={styles.welcomeText}>
          <Text style={styles.h1}>Welcome</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.contentWrapper}>
          <Image
            source={
              userData === undefined
                ? require('../assets/img/image2.png')
                : {uri: userData.avatar}
            }
            resizeMode={'cover'}
            style={styles.profileImage}
          />
          {userData === undefined ? (
            <Text style={styles.textProfile}>
              Select a user to show the profile
            </Text>
          ) : (
            <View style={styles.profileContainer}>
              <Text style={styles.profileName}>
                {userData.first_name} {userData.last_name}
              </Text>
              <Text style={styles.profileEmail}>{userData.email}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('WebViewScreen')}>
                <Text style={styles.profileWebsite}>website</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={styles.chooseButton}
            onPress={() => navigation.navigate('UserScreen')}>
            <Text style={styles.chooseText}>Choose a User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.textWhite,
  },
  wrapper: {
    padding: 16,
    flex: 1,
  },
  h1: {
    color: Color.h1,
    fontSize: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.darkText,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {width: 164, height: 164, borderRadius: 164},
  textProfile: {
    marginVertical: height / 15,
    fontSize: 18,
  },
  chooseButton: {
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
  },
  chooseText: {
    color: Color.textWhite,
    fontWeight: '500',
    fontSize: 14,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 50,
  },
  profileEmail: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 20,
  },
  profileWebsite: {
    fontSize: 18,
    color: color.primary,
    textDecorationLine: 'underline',
  },
});
