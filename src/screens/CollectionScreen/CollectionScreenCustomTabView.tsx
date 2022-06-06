import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import UIIcon from '../../components/UIIcon';
import UIText from '../../components/UIText';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import useTransitionEffect from '../../hooks/useTransitionEffect';
import CollectionItemsScene from './CollectionItemsScene';
import CollectionActivityScene from './CollectionActivityScene';

type Routes = {
  key: string;
  title: string;
  icon: string;
  renderTabItem: React.ReactNode;
};

type TabBarProps = {
  style?: StyleProp<ViewStyle>;
  icon: string;
  title: string;
  focused: boolean;
  onPress: () => void;
};

const CollectionScreenCustomTabBar = ({ style, icon, title, focused, onPress }: TabBarProps) => {
  const transition = useTransitionEffect({ toggleState: focused });

  const interpolateOpacity = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
    extrapolate: 'clamp',
  });

  return (
    <TouchableWithoutFeedback style={style} onPress={onPress}>
      <Animated.View style={[styles.tabBarItem, { opacity: interpolateOpacity }]}>
        <UIIcon
          name={icon}
          size={18}
          color={COLORS.text.primary}
          style={{ marginRight: SPACE.$1 }}
        />
        <UIText as="small_bold" style={{ color: COLORS.text.primary }}>
          {title}
        </UIText>
      </Animated.View>
      <Animated.View style={[styles.tabBarBorder, { opacity: transition }]} />
    </TouchableWithoutFeedback>
  );
};

type TabBarSceneProps = {
  sceneChildren: React.ReactNode;
  focused: boolean;
  setHeight: (value: number) => void;
};

const CollectionScreenCustomTabViewScene = ({
  sceneChildren,
  focused,
  setHeight,
}: TabBarSceneProps) => {
  const transition = useTransitionEffect({ toggleState: focused });
  const viewRef = useRef<View>(null);

  // focus changed
  useEffect(() => {
    if (focused) {
      viewRef.current?.measure((x, y, width, height) => {
        console.log('set: ', height);
        setHeight(height);
      });
    }
  }, [focused]);

  // change rendered
  const onLayout = (event: LayoutChangeEvent) => {
    if (focused) {
      console.log('set: ', event.nativeEvent.layout.height);
      setHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <Animated.View
      ref={viewRef}
      style={[styles.tabBarScene, { opacity: transition }]}
      onLayout={onLayout}
    >
      {sceneChildren}
    </Animated.View>
  );
};

const CollectionScreenCustomTabView = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const [currTabHeight, setCurrTabHeight] = useState(0);
  const [routes] = useState<Routes[]>([
    {
      key: 'items',
      title: t('common.items'),
      icon: 'chart-bar',
      renderTabItem: <CollectionItemsScene />,
    },
    {
      key: 'activity',
      title: t('common.activity'),
      icon: 'chart-line-variant',
      renderTabItem: <CollectionActivityScene />,
    },
  ]);

  useEffect(() => {
    setTabIndex(0);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {routes.map((route, index) => (
          <CollectionScreenCustomTabBar
            key={route.key}
            icon={route.icon}
            title={route.title}
            style={index !== 0 && { marginLeft: SPACE.$5 }}
            focused={tabIndex === index}
            onPress={() => setTabIndex(index)}
          />
        ))}
      </View>
      <View style={[styles.tabBarView, { paddingTop: currTabHeight }]}>
        {routes.map((route, index) => (
          <CollectionScreenCustomTabViewScene
            key={route.key}
            sceneChildren={route.renderTabItem}
            focused={tabIndex === index}
            setHeight={setCurrTabHeight}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarItem: {
    width: 120,
    paddingTop: SPACE.$4,
    paddingBottom: SPACE.$3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarBorder: {
    height: SIZES.$1,
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
  },
  tabBarView: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    position: 'relative',
  },
  tabBarScene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    // flex: 1,
  },
});

export default CollectionScreenCustomTabView;
