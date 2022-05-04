module.exports = {
  assets: ['./src/assets/fonts'],
  dependencies: {
    // prevent when pod-install
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
