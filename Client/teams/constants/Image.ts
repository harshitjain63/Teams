import {ImageSourcePropType} from 'react-native';

type ImageProp = {
  chaticon: ImageSourcePropType;
  goofleicon: ImageSourcePropType;
  facebookicon: ImageSourcePropType;
  twittericon: ImageSourcePropType;
  arrowicon: ImageSourcePropType;
  profileicon: ImageSourcePropType;
  bluearrowicon: ImageSourcePropType;
};
export const Images: ImageProp = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  chaticon: require('../assets/chaticon.png'),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  goofleicon: require('../assets/search.png'),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  facebookicon: require('../assets/facebook.png'),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  twittericon: require('../assets/twitter.png'),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  arrowicon: require('../assets/right-arrow.png'),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  profileicon: require('../assets/boy.png'),
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  bluearrowicon: require('../assets/right.png'),
};
