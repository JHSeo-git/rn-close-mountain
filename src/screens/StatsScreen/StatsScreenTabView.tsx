import { useCallback, useRef, useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TabBar, TabView } from 'react-native-tab-view';
import { observer } from 'mobx-react-lite';
import RankingsScene, { RankingsSceneRef } from './RankingsScene';
import Header from '../../components/Header';
import UIIcon from '../../components/UIIcon';
import UIText from '../../components/UIText';
import { COLORS, SPACE } from '../../constants/design-token';

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

const StatsScreenTabView = observer(() => {
  const layout = useWindowDimensions();
  const { t } = useTranslation();
  /**
   * states
   */
  const [index, setIndex] = useState(0);
  const [routes] = useState<Routes[]>([
    { key: 'rankings', title: t('common.rankings'), icon: 'chart-bar' },
    { key: 'activity', title: t('common.activity'), icon: 'chart-line-variant' },
  ]);

  /**
   * refs
   */
  const rankingsSceneRef = useRef<RankingsSceneRef>(null);

  /**
   * events
   */
  const onScrollToTop = useCallback(() => {
    rankingsSceneRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  }, []);

  const renderScene = useCallback(({ route }: TabItemRenderProps) => {
    switch (route.key) {
      case 'rankings':
        return <RankingsScene ref={rankingsSceneRef} />;
      case 'activity':
        return <UIText>activity</UIText>;
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
    <View style={{ flex: 1 }}>
      <Header title={t('common.stats')} onTitlePress={onScrollToTop} />
      <TabView
        swipeEnabled={false}
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
    </View>
  );
});

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabBarBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  tabBarContainer: {
    backgroundColor: COLORS.transparent,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: TabBarTop.tabWidth,
  },
  tabBarIndicator: {
    backgroundColor: COLORS.primary,
  },
});

export default StatsScreenTabView;
