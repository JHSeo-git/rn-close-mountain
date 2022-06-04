import LinearGradient from 'react-native-linear-gradient';

type FadeOutGradientProps = {} & Omit<React.ComponentProps<typeof LinearGradient>, 'colors'>;

const FadeOutGradient = ({ ...props }: FadeOutGradientProps) => {
  return (
    <LinearGradient
      {...props}
      colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,1)']}
      locations={[0, 0.25, 0.5]}
    />
  );
};

export default FadeOutGradient;
