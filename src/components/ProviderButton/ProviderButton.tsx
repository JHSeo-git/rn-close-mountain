import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import UIText from '../../components/UIText';
import { COLORS, RADII, SPACE } from '../../constants/design-token';
import CustomTouchableRipple from '../../components/CustomTouchableRipple';

import EmailSvg from '../../assets/icons/envelop-close.svg';
import GoogleSvg from '../../assets/icons/google.svg';
import AppleSvg from '../../assets/icons/apple.svg';
import ChevronRightSvg from '../../assets/icons/chevron-right.svg';

type ProviderButtonProps = {
  provider: 'email' | 'google' | 'apple';
} & Omit<React.ComponentProps<typeof CustomTouchableRipple>, 'children'>;

const ProviderButton = ({ provider, ...props }: ProviderButtonProps) => {
  const providerName = useMemo(() => {
    switch (provider) {
      case 'email':
        return 'E-mail';
      case 'google':
        return 'Google';
      case 'apple':
        return 'Apple';
    }
  }, [provider]);

  const renderProviderIcon = () => {
    switch (provider) {
      case 'email':
        return <EmailSvg width={24} height={24} color={COLORS.primary} />;
      case 'google':
        return <GoogleSvg width={24} height={24} />;
      case 'apple':
        return <AppleSvg width={24} height={24} />;
    }
  };

  return (
    <CustomTouchableRipple {...props} style={[styles.container]}>
      <>
        {renderProviderIcon()}
        <UIText as="strong" style={styles.buttonText}>
          {providerName}
        </UIText>
        <ChevronRightSvg width={24} height={24} color={COLORS.text.secondary} />
      </>
    </CustomTouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: SPACE.$4,
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: RADII.base,
    borderColor: COLORS.borderColor,
  },
  buttonText: {
    flex: 1,
    marginLeft: SPACE.$4,
  },
});

export default ProviderButton;
