import { StyleSheet, useWindowDimensions } from 'react-native';
import { useCallback } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { COLORS, SPACE } from '../../constants/design-token';
import UIText from '../../components/UIText';
import UIIcon from '../../components/UIIcon';
import { TabItemRenderProps, TabRoute } from './AssetScreen';

type AssetScreenTabBarProps = {
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  routes: TabRoute[];
};

const AssetScreenTabBar = ({ tabIndex, setTabIndex, routes }: AssetScreenTabBarProps) => {
  const layout = useWindowDimensions();

  const renderLabel = useCallback(({ route, focused }: TabItemRenderProps) => {
    return (
      <UIText as="small_bold" style={{ color: focused ? COLORS.text.primary : COLORS.disabled }}>
        {route.title}
      </UIText>
    );
  }, []);

  const renderIcon = useCallback(({ route, focused }: TabItemRenderProps) => {
    return (
      <UIIcon
        name={route.icon}
        size={18}
        color={focused ? COLORS.text.primary : COLORS.disabled}
        style={{ marginRight: SPACE.$1 }}
      />
    );
  }, []);

  return (
    <TabView
      style={styles.tabView}
      navigationState={{ index: tabIndex, routes }}
      renderScene={() => null}
      onIndexChange={setTabIndex}
      initialLayout={{ width: layout.width }}
      sceneContainerStyle={{ flexGrow: 1, overflow: 'visible' }}
      renderTabBar={props => {
        return (
          <TabBar
            {...props}
            scrollEnabled
            renderLabel={renderLabel}
            renderIcon={renderIcon}
            style={styles.tabBarContainer}
            tabStyle={styles.tabBar}
            indicatorStyle={styles.tabBarIndicator}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabBarContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,

    backgroundColor: COLORS.loContrast,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBarIndicator: {
    backgroundColor: COLORS.primary,
  },
  dummy: {
    height: 200,
    backgroundColor: 'blue',
    margin: 20,
  },
});

export default AssetScreenTabBar;
