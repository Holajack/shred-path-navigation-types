import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import MapView, { Marker, Region, MapPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../types/navigation';
import { useSpots } from '../context/SpotContext';
import { SpotDifficulty, SpotType, SpotFeature, Spot } from '../types/spot';
import { useAuth } from '../context/AuthContext';
import { defaultImages } from './constants/defaultImages';

// Fallback image in case defaultImages fails to load
const DEFAULT_SPOT_IMAGE = '../assets/icon.png';

export const AddSpotScreen: React.FC = () => {
  // ... existing code ...

  try {
      const now = new Date().toISOString();
      const newSpot: Spot = {
        id: `spot_${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: '',
        },
        type,
        images: images.length > 0 ? images : [defaultImages.defaultSpot],
        features,
        difficulty,
        createdBy: user.id,
        createdAt: now,
        updatedAt: now,
        rating: 0,
        totalRatings: 0,
        isFavorite: false
      };
      await addSpot(newSpot);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add spot. Please try again.');
    }
  // ... existing code ...
} 