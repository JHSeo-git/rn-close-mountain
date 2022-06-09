import { Animated } from 'react-native';
import { useEffect, useState } from 'react';
import useTransitionEffect from '../../hooks/useTransitionEffect';

type AssetScreenTabViewSceneViewProps = {
  children: React.ReactNode;
};

const AssetScreenTabViewSceneView = ({ children }: AssetScreenTabViewSceneViewProps) => {
  const [mounted, setMounted] = useState(false);
  const transition = useTransitionEffect({ toggleState: mounted });

  useEffect(() => {
    setMounted(true);
  }, []);

  return <Animated.View style={[{ flex: 1 }, { opacity: transition }]}>{children}</Animated.View>;
};

export default AssetScreenTabViewSceneView;
