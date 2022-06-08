import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AssetScreenTabViewDetailsScene from './AssetScreenTabView.DetailsScene';
import AssetScreenTabViewOffersScene from './AssetScreenTabView.OffersScene';
import AssetScreenTabViewListingsScene from './AssetScreenTabView.ListingsScene';
import AssetScreenTabViewItemActivityScene from './AssetScreenTabView.ItemActivityScene';
import { TabBar, TabBarIndicator, TabView } from 'react-native-tab-view';
import { COLORS, SPACE } from '../../constants/design-token';
import UIText from '../../components/UIText';
import UIIcon from '../../components/UIIcon';

type TabRoute = {
  key: 'details' | 'offers' | 'listings' | 'item-activity';
  title: string;
  icon: string;
};

type TabItemRenderProps = {
  route: TabRoute;
  focused?: boolean;
};

const AssetScreenTabView = () => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();

  /**
   * refs
   */
  const scrollRef = useRef<ScrollView>(null);

  /**
   * states
   */
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState<TabRoute[]>([
    {
      key: 'details',
      title: t('common.details'),
      icon: 'format-list-text',
    },
    {
      key: 'offers',
      title: t('common.offers'),
      icon: 'tag-outline',
    },
    {
      key: 'listings',
      title: t('common.listings'),
      icon: 'format-list-bulleted',
    },
    {
      key: 'item-activity',
      title: t('common.item_activity'),
      icon: 'chart-line-variant',
    },
  ]);

  const renderScene = useCallback(({ route }: TabItemRenderProps) => {
    switch (route.key) {
      case 'details':
        return <AssetScreenTabViewDetailsScene />;
      case 'offers':
        return <AssetScreenTabViewOffersScene />;
      case 'listings':
        return <AssetScreenTabViewListingsScene />;
      case 'item-activity':
        return <AssetScreenTabViewItemActivityScene />;
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
    <View style={{ flexGrow: 1 }}>
      <View style={{ height: '100%' }}>
        <TabView
          style={styles.tabView}
          navigationState={{ index: tabIndex, routes }}
          renderScene={renderScene}
          onIndexChange={setTabIndex}
          initialLayout={{ width: layout.width }}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flexGrow: 1,
  },
  tabBarContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,

    backgroundColor: COLORS.transparent,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBarIndicator: {
    backgroundColor: COLORS.primary,
  },
});

export default AssetScreenTabView;
