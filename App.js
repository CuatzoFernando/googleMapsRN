import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location'

const environment = process.env.GOOGLE_MAPS_KEY

export default function App() {
  const [origin, setOrigin] = useState({
    latitude: 33.640411,
    longitude: -84.419853
  })

  const [destination, setDestionation] = useState({
    latitude: 33.640411,
    longitude: -84.419853
  })

  useEffect(() => {
    getLocationPermission()
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync({})
    if (status !== 'granted') alert('Permission Denied')

    let location = await Location.getCurrentPositionAsync({})
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    setOrigin(current)
  }


  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
       />
       <Marker
        draggable
        coordinate={origin}
        onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
       />

       <Marker
        draggable
        coordinate={destination}
        onDragEnd={(direction) => setDestionation(direction.nativeEvent.coordinate)}
       />

       <MapViewDirections 
          origin={origin}
          destionation={destination}
          apikey={environment}
          strokeColor="black"
          strokeWidth={8}
       />
       <Polyline  
        coordinates={[origin, destination]}
        strokeColor="pink"
        strokeWidth={8}
       />
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
  map: {
    width: '100%',
    height: '100%'
  }
});
