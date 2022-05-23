module.exports = {
  presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExpermiental: true }]],
  plugins: [
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
    // ['@babel/plugin-proposal-class-properties', { loose: true }], // move to package.json
    'react-native-paper/babel',
    'react-native-reanimated/plugin', // Reanimated plugin has to be listed last.
  ],
};
