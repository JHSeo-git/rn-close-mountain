module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      { useTransformReactJSXExpermiental: true },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'react-native-reanimated/plugin', // Reanimated plugin has to be listed last.
  ],
  env: {
    production: {
      // To get smaller bundle size by excluding modules you don't use,
      // you can use our optional babel plugin.
      plugins: ['react-native-paper/babel'],
    },
  },
};
