import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Animated, TouchableOpacity, Text, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSpots } from '../context/SpotContext';
import { Spot } from '../types/spot';
import { MainTabNavigationProp, RootStackNavigationProp } from '../types/navigation';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';

type ExploreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Explore'>,
  RootStackNavigationProp
>;

interface Props {
  navigation: ExploreScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');
const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const ExploreScreen = ({ navigation }: Props) => {
  const { spots } = useSpots();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const cardAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setHasLocationPermission(status === 'granted');
    if (status === 'granted') {
      refreshLocation();
    }
  };

  const refreshLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const filteredSpots = spots.filter(spot =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpotSelect = (spot: Spot) => {
    setSelectedSpot(spot);
    setRegion({
      latitude: spot.latitude,
      longitude: spot.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    Animated.spring(cardAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSpotDeselect = () => {
    Animated.spring(cardAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setSelectedSpot(null));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search spots..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={hasLocationPermission}
      >
        {filteredSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude,
            }}
            onPress={() => handleSpotSelect(spot)}
          >
            <Ionicons name="map" size={30} color="#FF6B6B" />
          </Marker>
        ))}
      </MapView>

      {selectedSpot && (
        <Animated.View
          style={[
            styles.spotCard,
            {
              transform: [
                {
                  translateY: cardAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleSpotDeselect}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.spotName}>{selectedSpot.name}</Text>
          <Text style={styles.spotDescription}>{selectedSpot.description}</Text>
          <View style={styles.spotDetails}>
            <Text style={styles.spotType}>{selectedSpot.type}</Text>
            <Text style={styles.spotDifficulty}>{selectedSpot.difficulty}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('SpotDetails', { spotId: selectedSpot.id })}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
  spotCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  spotName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spotDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  spotDetails: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  spotType: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    fontSize: 14,
    color: '#4285F4',
  },
  spotDifficulty: {
    backgroundColor: '#FCE8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 14,
    color: '#EA4335',
  },
  viewDetailsButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 