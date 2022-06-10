import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Animated } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Avatar } from 'react-native-paper';
import UIIcon from '../../components/UIIcon';
import UIText from '../../components/UIText';
import VerifiedIcon from '../../components/VerifiedIcon';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import useTransitionEffect from '../../hooks/useTransitionEffect';
import { OpenSeaAsset } from '../../utils/types/opensea/types';
import AssetScreenTabViewSceneView from './AssetScreenTabView.SceneView';

const SectionIcon = ({ isOpen }: { isOpen: boolean }) => {
  const transition = useTransitionEffect({ toggleState: isOpen });
  const rotateInterpolate = transition.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
      <UIIcon name="chevron-down" size={SIZES.$6} color={COLORS.text.secondary} />
    </Animated.View>
  );
};

const AboutContent = ({ asset }: { asset?: OpenSeaAsset }) => {
  if (!asset) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.flexBox}>
        <View style={{ position: 'relative' }}>
          <Avatar.Image size={SIZES.$8} source={{ uri: asset.imageUrlThumbnail }} />
          <VerifiedIcon size={SIZES.$2} boxStyle={{ position: 'absolute', bottom: 0, right: 0 }} />
        </View>
        <View style={{ flexShrink: 1, marginLeft: SPACE.$4 }}>
          <UIText as="h4" numberOfLines={2}>
            {asset.name}
          </UIText>
        </View>
      </View>
      <View style={{ marginTop: SPACE.$4 }}>
        <UIText as="xsmall" style={{ color: COLORS.text.secondary }}>
          {asset.description}
        </UIText>
      </View>
    </View>
  );
};

type AccordionSection = {
  title: string;
  content: React.ReactNode;
};

const AssetScreenTabViewDetailsScene = observer(() => {
  const { t } = useTranslation();
  const { assetStore } = useStore();
  const { asset } = assetStore;

  const [activateSection, setActivateSection] = useState<number[]>([]);

  const sections: AccordionSection[] = [
    {
      title: t('common.about_collection'),
      content: <AboutContent asset={asset} />,
      // content: 'test',
    },
  ];

  const onChange = (indexes: number[]) => {
    setActivateSection(indexes);
  };

  const renderHeader = useCallback(
    (section: AccordionSection, index: number, isActive: boolean) => {
      return (
        <View style={styles.sectionTitle}>
          <UIText as="h4">{section.title}</UIText>
          <SectionIcon isOpen={isActive} />
        </View>
      );
    },
    [],
  );

  const renderContent = useCallback((section: AccordionSection) => {
    return <UIText>{section.content}</UIText>;
  }, []);

  return (
    <AssetScreenTabViewSceneView>
      <Accordion
        align="center"
        activeSections={activateSection}
        sections={sections}
        expandMultiple={false}
        renderHeader={renderHeader}
        renderContent={renderContent}
        duration={400}
        onChange={onChange}
      />
    </AssetScreenTabViewSceneView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: SPACE.$4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  sectionTitle: {
    padding: SPACE.$4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AssetScreenTabViewDetailsScene;
