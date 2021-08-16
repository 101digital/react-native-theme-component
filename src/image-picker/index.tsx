import React, { useContext } from 'react';
import { Alert, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Picker from 'react-native-image-crop-picker';
// @ts-ignore
import * as mime from 'react-native-mime-types';
import { openSettings } from 'react-native-permissions';
import BottomSheetModal from '../bottom-sheet';
import { ThemeContext } from '../theme-context';
import { GalleryIcon, CameraIcon } from '../assets';
import { defaultsDeep } from 'lodash';

export type ImagePickerStyles = {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
};

export type ImagePickerProps = {
  isVisible?: boolean;
  maxImageSize?: number;
  allowTypes?: string[];
  cropping?: boolean;
  cropperCircleOverlay?: boolean;
  useFrontCamera?: boolean;
  onClose: () => void;
  onUpload: (image: any) => void;
  style?: ImagePickerStyles;
};

const ImagePicker = (props: ImagePickerProps) => {
  const { i18n, imagePicker } = useContext(ThemeContext);
  const {
    maxImageSize,
    allowTypes,
    cropping,
    cropperCircleOverlay,
    useFrontCamera,
    onClose,
    onUpload,
    isVisible,
    style,
  } = props;

  const styles: ImagePickerStyles = defaultsDeep(style, imagePicker);

  const launchCamera = () => {
    Picker.openCamera({
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxWidth: 1440,
      compressImageMaxHeight: 890,
      compressImageQuality: 0.8,
      cropping: cropping,
      cropperCircleOverlay: cropperCircleOverlay,
      useFrontCamera: useFrontCamera,
    })
      .then((image) => {
        if (image.size < maxImageSize!) {
          const imageType = imageHandler(image.sourceURL ? image.sourceURL : image.path);
          const validatedImageType = allowTypes?.filter((element: String) =>
            imageType.toLowerCase().includes(element)
          );
          if (validatedImageType) {
            onUpload(image);
          } else {
            // showMessage({
            //   message: i18n?.t('attach_document.msg_allow_file_type'),
            //   backgroundColor: '#ff0000',
            // });
          }
        } else {
          //   showMessage({
          //     message: i18n?.t('attach_document.msg_max_file_size'),
          //     backgroundColor: '#ff0000',
          //   });
        }
      })
      .catch((e) => {
        if (e.toString() !== 'Error: User cancelled image selection') {
          Alert.alert(
            i18n?.t('attach_document.msg_allow_access_camera'),
            i18n.t('attach_document.msg_turn_camera_setting'),
            [
              { text: i18n?.t('common.btn_cancel') },
              { text: i18n?.t('attach_document.btn_open_setting'), onPress: () => openSettings() },
            ]
          );
        }
      });
  };

  const launchImageLibrary = () => {
    Picker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxWidth: 1440,
      compressImageMaxHeight: 890,
      compressImageQuality: 0.8,
      cropping: cropping,
      cropperCircleOverlay: cropperCircleOverlay,
    })
      .then((image) => {
        if (image.size < maxImageSize!) {
          const imageType = imageHandler(image.sourceURL ? image.sourceURL : image.path);
          const validatedImageType = allowTypes?.filter((element: String) =>
            imageType.toLowerCase().includes(element)
          );

          if (validatedImageType) {
            onUpload(image);
          } else {
            // showMessage({
            //   message: i18n?.t('attach_document.msg_allow_file_type'),
            //   backgroundColor: '#ff0000',
            // });
          }
        } else {
          //   showMessage({
          //     message: i18n?.t('attach_document.msg_max_file_size'),
          //     backgroundColor: '#ff0000',
          //   });
        }
      })
      .catch((e) => {
        if (e.toString() !== 'Error: User cancelled image selection') {
          Alert.alert(
            i18n?.t('attach_document.msg_allow_access_photo'),
            i18n?.t('attach_document.msg_turn_photo_setting'),
            [
              { text: i18n?.t('common.btn_cancel') },
              { text: i18n?.t('attach_document.btn_open_setting'), onPress: () => openSettings() },
            ]
          );
        }
      });
  };

  const imageHandler = (uri?: String) => {
    if (uri) {
      const getFilename = uri.split('/');
      const imgName = getFilename[getFilename.length - 1];
      return mime.lookup(imgName);
    } else {
      return null;
    }
  };

  return (
    <BottomSheetModal
      onBackButtonPress={onClose}
      isVisible={isVisible}
      backdropOpacity={0.25}
      onBackdropPress={onClose}
    >
      <TouchableOpacity
        onPress={() => {
          onClose();
          setTimeout(() => {
            launchCamera();
          }, 1000);
        }}
        style={styles.buttonContainerStyle}
        activeOpacity={0.8}
      >
        <CameraIcon width={15} height={15} />
        <View style={styles.textContainerStyle}>
          <Text style={styles.buttonTextStyle}>{'Take photo'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClose();
          setTimeout(() => {
            launchImageLibrary();
          }, 1000);
        }}
        style={styles.buttonContainerStyle}
        activeOpacity={0.8}
      >
        <GalleryIcon width={15} height={15} />
        <View style={styles.textContainerStyle}>
          <Text style={styles.buttonTextStyle}>{'Choose photo'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.buttonContainerStyle} activeOpacity={0.8}>
        <View style={styles.textContainerStyle}>
          <Text style={styles.cancelTextStyle}>{i18n.t('common.btn_cancel').toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    </BottomSheetModal>
  );
};

ImagePicker.defaultProps = {
  isVisible: false,
  maxImageSize: 2097151,
  allowTypes: ['jpeg', 'jpg', 'png', 'heic'],
  cropping: true,
  cropperCircleOverlay: true,
  useFrontCamera: false,
};

export default ImagePicker;
