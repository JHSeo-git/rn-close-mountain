module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      { useTransformReactJSXExpermiental: true },
    ],
  ],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
  ],
};
