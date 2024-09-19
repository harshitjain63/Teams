import {ImageSourcePropType} from 'react-native';

type ImageProp = {
  chaticon: ImageSourcePropType;
  goofleicon: ImageSourcePropType;
  facebookicon: ImageSourcePropType;
  twittericon: ImageSourcePropType;
  arrowicon: ImageSourcePropType;
};
export const Images: ImageProp = {
  chaticon: require('../assets/chaticon.png'),
  goofleicon: require('../assets/search.png'),
  facebookicon: require('../assets/facebook.png'),
  twittericon: require('../assets/twitter.png'),
  arrowicon: require('../assets/right-arrow.png'),
};
