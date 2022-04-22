import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChevronLeft from '../../assets/icon/ChevronLeft';
import Color from '../../config/color';
import MapMarker from '../../assets/icon/MapMarker';
import BulletList from '../../assets/icon/BulletList';

export default function Header(props) {
  const [changeMap, setChangeMap] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperLeft}>
        {props.disableBackButton ? (
          <></>
        ) : (
          <TouchableOpacity onPress={props.onPressBack}>
            <ChevronLeft />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.wrapperCenter}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.wrapperRight}>
        {props.visibleRightIcon && (
          <TouchableOpacity
            onPress={() => {
              props.changeMapView();
              setChangeMap(!changeMap);
            }}>
            {changeMap ? <BulletList /> : <MapMarker />}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.textWhite,
    borderBottomColor: Color.border,
    borderBottomWidth: 0.3,
  },
  title: {
    color: Color.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  wrapperLeft: {
    width: 40,
    height: 40,
    zIndex: 100,
  },
  wrapperCenter: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    bottom: 15,
    zIndex: -0,
  },
  wrapperRight: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
