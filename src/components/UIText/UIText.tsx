import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import { FONTS } from '../../constants/design-token';

type UITextProps = {
  fontWeight?: keyof typeof FONTS.poppins;
} & React.ComponentProps<typeof Text>;

const UIText = ({ fontWeight = 'regular', style, ...props }: UITextProps) => {
  const { i18n } = useTranslation();
  const font = i18n.language === 'en' ? FONTS.poppins : FONTS.pretendard;

  return (
    <Text
      style={[
        //
        styles.default,
        { fontFamily: font[fontWeight] },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  default: {},
});

export default UIText;
