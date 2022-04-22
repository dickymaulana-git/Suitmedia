import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import color from '../config/color';
import Header from './components/Header';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapMarker from '../assets/icon/MapMarker';

const {width} = Dimensions.get('screen');

export default function UserScreen({navigation, route}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mapView, setMapView] = useState(false);
  const [profileShown, setProfileShown] = useState();
  const [profileId, setProfileId] = useState(0);
  const [position, setPosition] = useState({
    latitude: -6.272632037163463,
    longitude: 106.82506068986139,
    latitudeDelta: 0.1,
    longitudeDelta: 0.001,
  });

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const json = await response.json();
      setData([...data, ...json?.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProfileShown(data[profileId - 1]);
    position;
  }, [profileId]);

  useEffect(() => {
    getData();
  }, [page]);

  const footerView = () => {
    return <View style={{marginBottom: 15}} />;
  };

  const onPressMarker = () => {
    setPosition({
      latitude: coordinateMap[profileId - 1].coor.latitude,
      longitude: coordinateMap[profileId - 1].coor.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.001,
    });
  };

  const coordinateMap = [
    {
      coor: {
        latitude: -6.269956532638404,
        longitude: 106.82142180548647,
      },
      id: 1,
    },
    {
      coor: {
        latitude: -6.2760400693254255,
        longitude: 106.82468121240584,
      },
      id: 2,
    },
    {
      coor: {
        latitude: -6.277552328314429,
        longitude: 106.80765338247882,
      },
      id: 3,
    },
    {
      coor: {
        latitude: -6.259645331856634,
        longitude: 106.82964430799916,
      },
      id: 4,
    },
    {
      coor: {
        latitude: -6.287957462486013,
        longitude: 106.8122787800975,
      },
      id: 5,
    },
    {
      coor: {
        latitude: -6.284973065437952,
        longitude: 106.82988774997911,
      },
      id: 6,
    },
    {
      coor: {
        latitude: -6.24195974040208,
        longitude: 106.84144578441428,
      },
      id: 7,
    },
    {
      coor: {
        latitude: -6.233801623990477,
        longitude: 106.80280155288341,
      },
      id: 8,
    },
    {
      coor: {
        latitude: -6.271021094828119,
        longitude: 106.84980290548346,
      },
      id: 9,
    },
  ];
  return (
    <View style={styles.screenContainer}>
      <Header
        onPressBack={() => navigation.goBack()}
        title="Users"
        visibleRightIcon
        changeMapView={() => setMapView(!mapView)}
      />
      {mapView ? (
        <View style={styles.map}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: position.latitudeDelta,
              longitudeDelta: position.longitudeDelta,
            }}>
            {coordinateMap.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coor}
                onPress={async () => {
                  await setProfileId(marker.id);
                  await onPressMarker();
                }}>
                <Image source={require('../assets/img/smallMarker.png')} />
              </Marker>
            ))}
          </MapView>
          {profileId !== 0 && (
            <View style={styles.userProfileView}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setProfileId(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>X</Text>
              </TouchableOpacity>
              <Image
                source={{uri: profileShown?.avatar}}
                style={styles.profilePopUp}
              />
              <Text style={styles.firstLastName}>
                {profileShown?.first_name} {profileShown?.last_name}
              </Text>
              <TouchableOpacity
                style={styles.SelectButton}
                onPress={() =>
                  navigation.navigate('HomeScreen', {item: profileShown})
                }>
                <Text style={styles.selectText}>Select</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('HomeScreen', {item})}
                  style={styles.container}>
                  <Image
                    source={{uri: item.avatar}}
                    style={styles.profileImage}
                  />
                  <View style={styles.userProfile}>
                    <View style={styles.userName}>
                      <Text style={styles.firstLastName}>
                        {item.first_name}
                      </Text>
                      <Text> </Text>
                      <Text style={styles.firstLastName}>{item.last_name}</Text>
                    </View>
                    <Text style={styles.userEmail}>{item.email}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            enableEmptySections={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => footerView()}
          />
          {loading && (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator
                color={color.primary}
                style={styles.loadingIndicator}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: color.textWhite,
  },
  container: {
    marginHorizontal: width / 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  userName: {
    flexDirection: 'row',
  },
  firstLastName: {
    fontWeight: 'bold',
    color: color.darkText,
    fontSize: 16,
  },
  userEmail: {
    fontSize: 10,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    width: '70%',
    marginHorizontal: 50,
    backgroundColor: '#C8C8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 30,
    height: 30,
    borderWidth: 0.2,
    borderColor: color.primary,
    borderRadius: 30,
  },
  loadingWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 150,
    height: 150,
  },
  userProfileView: {
    height: 250,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    backgroundColor: color.textWhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowColor: '#000000',
    elevation: 4,
    borderTopColor: color.border,
    borderTopWidth: 1,
  },
  profilePopUp: {
    width: 84,
    height: 84,
    borderRadius: 84,
    marginBottom: 10,
  },
  SelectButton: {
    backgroundColor: color.primary,
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 33,
  },
  selectText: {
    color: color.textWhite,
    fontWeight: '500',
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    top: 15,
    borderWidth: 1,
    borderColor: color.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
