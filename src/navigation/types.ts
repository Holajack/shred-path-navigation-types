import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AddSpot: undefined;
  SpotDetails: { spotId: string };
  Profile: undefined;
  EditProfile: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 