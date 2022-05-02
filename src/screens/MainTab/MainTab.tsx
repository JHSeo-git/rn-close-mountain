import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import HomeStack from '../HomeStack';
import RankingsScreen from '../RankingsScreen';
import SearchScreen from '../SearchScreen';
import ProfileScreen from '../ProfileScreen';
import MoreScreen from '../MoreScreen';
import UIText from '../../components/UIText';
import {
  COLORS,
  FONTSIZES,
  RADII,
  SHADOWS,
  SPACE,
} from '../../constants/design-token';
import * as textStyles from '../../constants/global-styles/textStyles';

import type { MainTabParamList } from '../types';

import HomeSvg from '../../assets/icons/home.svg';
import BarChartSvg from '../../assets/icons/bar-chart.svg';
import MagnifyingGlassSvg from '../../assets/icons/magnifying-glass.svg';
import PersonSvg from '../../assets/icons/person.svg';
import HamburgerMenuSvg from '../../assets/icons/hamburger-menu.svg';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: styles.tab,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <UIText style={[styles.tabLabel, focused && textStyles.primary]}>
              {t('common.home')}
            </UIText>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconBox, focused && styles.tabActive]}>
              <HomeSvg width={size} height={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Rankings"
        component={RankingsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <UIText style={[styles.tabLabel, focused && textStyles.primary]}>
              {t('common.rankings')}
            </UIText>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconBox, focused && styles.tabActive]}>
              <BarChartSvg width={size} height={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <UIText style={[styles.tabLabel, focused && textStyles.primary]}>
              {t('common.search')}
            </UIText>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconBox, focused && styles.tabActive]}>
              <MagnifyingGlassSvg width={size} height={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <UIText style={[styles.tabLabel, focused && textStyles.primary]}>
              {t('common.profile')}
            </UIText>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconBox, focused && styles.tabActive]}>
              <PersonSvg width={size} height={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <UIText style={[styles.tabLabel, focused && textStyles.primary]}>
              {t('common.more')}
            </UIText>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconBox, focused && styles.tabActive]}>
              <HamburgerMenuSvg width={size} height={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    position: 'absolute',
    height: 90,
    borderTopLeftRadius: RADII['2xl'],
    borderTopRightRadius: RADII['2xl'],
    borderTopColor: COLORS.transparent,
    ...SHADOWS.dark,
  },
  tabIconBox: {
    paddingTop: SPACE.$1,
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: COLORS.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    borderTopColor: COLORS.primary,
  },
  tabLabel: {
    ...textStyles.content,
    fontSize: FONTSIZES.xs,
    color: COLORS.gray10,
  },
});

export default MainTab;
