import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { RiskIcon } from '../assets/index';
import AlertModal from '../alert/index';
import { ThemeContext } from '../theme-context';
import { defaultsDeep } from 'lodash';

export type ErrorModalStyles = {
  errorIdTextStyle?: StyleProp<TextStyle>;
};

export type ErrorModalProps = {
  error?: {
    title: string;
    message: string;
    errorCode?: number;
    errorId?: string;
  };
  timeOut?: boolean;
  timeLimit?: number;
  leftIcon?: ReactNode;
  onClose: () => void;
  style?: ErrorModalStyles;
};

const ErrorModal = (props: ErrorModalProps) => {
  const { errorModal, i18n } = useContext(ThemeContext);
  const { error, timeLimit, timeOut, onClose, leftIcon, style } = props;
  const [isShowError, setShowError] = useState<boolean>(false);

  const styles = defaultsDeep(style, errorModal);

  useEffect(() => {
    if (error) {
      if (error.errorCode === 401) {
        onClose();
      } else {
        if (timeOut) {
          setTimeout(() => {
            setShowError(true);
          }, timeLimit ?? 500);
        } else {
          setShowError(true);
        }
      }
    } else {
      setShowError(false);
    }
  }, [error]);

  return (
    <AlertModal
      isVisible={isShowError}
      onClose={onClose}
      title={error?.title!}
      message={error?.message!}
      animationIn='fadeIn'
      animationOut='fadeOut'
      leftIcon={leftIcon ?? <RiskIcon size={20} />}
      onConfirmed={onClose}
    >
      {error?.errorId && (
        <Text style={styles.errorIdTextStyle}>
          {i18n?.t('common.msg_error_id')?.replace('%s', error?.errorId) ??
            `(Error: ${error?.errorId})`}
        </Text>
      )}
    </AlertModal>
  );
};

export default ErrorModal;
