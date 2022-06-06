import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import CollectionItemsScene from './CollectionItemsScene';
import CollectionActivityScene from './CollectionActivityScene';
import UIIcon from '../../components/UIIcon';
import UIText from '../../components/UIText';
import { COLORS, SPACE } from '../../constants/design-token';

/**
 * @see https://github.com/satya164/react-native-tab-view/issues/380#issuecomment-341694198
 */
const TabBarTop = {
  tabWidth: 120,
};

type Routes = {
  key: string;
  title: string;
  icon: string;
};

type TabItemRenderProps = {
  route: Routes;
  focused?: boolean;
};

const CollectionScreenTabView = () => {
  const layout = useWindowDimensions();
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState<Routes[]>([
    { key: 'items', title: t('common.items'), icon: 'chart-bar' },
    { key: 'activity', title: t('common.activity'), icon: 'chart-line-variant' },
  ]);

  const renderScene = useCallback(({ route }: TabItemRenderProps) => {
    switch (route.key) {
      case 'items':
        return <CollectionItemsScene />;
      case 'activity':
        return <CollectionActivityScene />;
      default:
        return null;
    }
  }, []);

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
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => {
        return (
          <View style={styles.tabBarBox}>
            <TabBar
              {...props}
              renderLabel={renderLabel}
              renderIcon={renderIcon}
              style={[styles.tabBarContainer, { width: TabBarTop.tabWidth * routes.length }]}
              tabStyle={styles.tabBar}
              indicatorStyle={styles.tabBarIndicator}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  tabBarBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBarContainer: {
    backgroundColor: COLORS.transparent,
  },
  tabBar: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: TabBarTop.tabWidth,
  },
  tabBarIndicator: {
    backgroundColor: COLORS.primary,
  },
});

export default CollectionScreenTabView;
