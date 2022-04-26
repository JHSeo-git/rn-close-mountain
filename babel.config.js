module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      { useTransformReactJSXExpermiental: true },
    ],
  ],
  plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
};
