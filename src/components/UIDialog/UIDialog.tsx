import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { RADII } from '../../constants/design-token';
import CustomButton from '../CustomButton';

type UIDialogProps = {
  title: string;
  // children: React.ReactNode;
  action: 'ok-cancel' | 'ok' | 'cancel';
  handleOK?: () => void;
  handleCancel?: () => void;
} & React.ComponentProps<typeof Dialog>;

const UIDialog = ({ title, action, children, handleOK, handleCancel, ...props }: UIDialogProps) => {
  const { t } = useTranslation();

  const onOKPress = () => {
    handleOK && handleOK();
  };
  const onCanclePress = () => {
    handleCancel && handleCancel();
  };

  return (
    <Portal>
      <Dialog style={styles.container} {...props}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content style={styles.content}>{children}</Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          {action === 'ok-cancel' && (
            <>
              <CustomButton mode="text" onPress={onCanclePress}>
                {t('common.cancel')}
              </CustomButton>
              <CustomButton mode="text" onPress={onOKPress}>
                {t('common.ok')}
              </CustomButton>
            </>
          )}
          {action === 'cancel' && (
            <CustomButton mode="text" onPress={onCanclePress}>
              {t('common.cancel')}
            </CustomButton>
          )}
          {action === 'ok' && (
            <CustomButton mode="text" onPress={onOKPress}>
              {t('common.ok')}
            </CustomButton>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADII.base,
  },
  title: {},
  content: {},
  actions: {},
});

export default UIDialog;
