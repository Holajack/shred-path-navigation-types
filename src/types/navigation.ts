import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { Spot } from './spot';

// Root Stack Parameters
export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  AddSpot: undefined;
  SpotDetails: { spotId: string };
  Profile: undefined;
  EditProfile: undefined;
  UserProfile: { userId: string };
  Followers: { userId: string };
  Following: { userId: string };
  Messages: undefined;
  Chat: { roomId: string };
  Notifications: undefined;
  NearbyUsers: undefined;
};

// Bottom Tab Parameters
export type MainTabParamList = {
  Feed: undefined;
  Explore: undefined;
  AddSpotTab: undefined;
  NearbyUsers: undefined;
  Profile: undefined;
};

// Navigation Props
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Combined Navigation Props
export type CombinedNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  RootStackNavigationProp
>;

// Screen-specific Navigation Props
export type FeedScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Feed'>,
  RootStackNavigationProp
>;

export type ExploreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Explore'>,
  RootStackNavigationProp
>;

// AddSpot is now a stack screen, so it uses RootStackNavigationProp directly
export type AddSpotScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddSpot'>;

export type NearbyUsersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'NearbyUsers'>,
  RootStackNavigationProp
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Profile'>,
  RootStackNavigationProp
>;

// Route prop types
export type RootStackRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>;

export type MainTabRouteProp<T extends keyof MainTabParamList> = 
  RouteProp<MainTabParamList, T>; 