# react-native-theme-component

<b>react-native-theme-component</b> is a reusable component which provides set of base elements that can be used across all the apps developed by 101 Digital.

## Features

- Configure theme data (colors, fonts, button styles, alert styles... )
- Easy to access theme data inside React component
- Easy to use elements as other React Native elements

## Installation

To add the theme-component to React Native app, run this command:

```
yarn add git+ssh://git@github.com/101digital/react-native-theme-component.git
```

Make sure you have permission to access this repository

- The theme-component is using [react-native-localize](https://github.com/zoontek/react-native-localize) to get default country code for iOS device. Make sure you install and link `react-native-localize` to your app.

- The theme-component is using [react-native-async-storage](https://react-native-async-storage.github.io/async-storage) to save countries data. Make sure you install and link `react-native-async-storage` to your app.

- The theme-component is using [react-native-svg](https://github.com/react-native-svg/react-native-svg) to display icon assets. Make sure you install and link `react-native-svg` to your app.

## Quick Start

- Before using the theme-component, you must wrap your app with `ThemProvider` in your `app.ts`

```javascript
import { ThemeProvider } from 'react-native-theme-component';

const App = () => {
  return <ThemProvider theme={yourThemeData}>/* YOUR COMPONENTS */</ThemProvider>;
};
```

- You can create your theme data by using `createThemeData` function. Or elese, default theme will be used.

```javascript
import { createThemeData } from 'react-native-theme-component';

const yourThemeData = createThemeData({
  fonts: {},
  colors: {},
  button: {},
  alert: {},
  bottomSheet: {},
  inputField: {},
  inputPhoneNumber: {},
});
export default yourThemeData;
```

- If you wanna use multiple language, pass your translate function to `i18n` props, like below:

```javascript
import { ThemeProvider } from 'react-native-theme-component';

const App = () => {
  return (
    <ThemProvider theme={yourThemeData} i18n={translate_func}>
      /* YOUR COMPONENTS */
    </ThemProvider>
  );
};
```

## API reference

### Theme data

Use `createThemeData` function to create your theme, see below props

```javascript
type ThemeProps = {
  colors: ThemeColorProps,
  button: ButtonStyles,
  fonts: ThemeFontProps,
  alert: AlertModalStyles,
  bottomSheet: BottomSheetModalStyles,
  inputField: InputFieldStyles,
  inputPhoneNumber: InputPhoneNumberStyles,
};
```

### Access Theme Data

<b>react-native-theme-component</b> using Context APO to manage theme data, you can using `useContext` to access theme data
Additional, or can use prodive hooks function to acceess `colors` or `fonts`

```javascript
import { ThemeContext, useThemeFonts, useThemeColors } from 'react-native-theme-component';

const YourComponent = () => {
   // const { fonts, colors } = useContext(ThemeContext)
    const fonts = useThemeFonts();
    const colors = useThemeColors();

    return (
   /* YOUR COMPONENTS */
    );
}
```

### `colors`

The colors are being used for elements inside the theme-component or in your app as well. ThemeColorProps and default values can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/colors.ts)

- Props [here]()

### `fonts`

The fonts are being used for element inside the theme-component or in your app as well. ThemeFontProps can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/fonts.ts)

#### Note: If you use default font family (Poppins), you need some steps to link default font to your app.

1. Create `react-native.config.js` in root folder
2. Add assets folder path <b>'./node_modules/react-native-theme-component/src/assets/fonts'</b> to config

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts', './node_modules/react-native-theme-component/src/assets/fonts'],
};
```

3. Run link assets command

```
npx react-native link
```

### Button

- Props

| Name             | Type                                | Description                                                      |
| :--------------- | :---------------------------------- | :--------------------------------------------------------------- |
| label            | string (Required)                   | Button label                                                     |
| isLoading        | bool (Optional)                     | Show loading indicator inside button                             |
| variant          | 'primary' or 'secondary' (Optional) | Default is `primary`                                             |
| disableOpacity   | number (Optional)                   | Default is `0.6`                                                 |
| loadingIndicator | React Node (Optional)               | Provide custom indicator loading, default is `ActivityIndicator` |
| indicatorColor   | string (Optional)                   | Default is `#ffffff`                                             |
| ...restProps     | TouchableOpacityProps (Optional)    | Other ToucableOpacity props (onPress, disabled ...)              |
| style            | ButtonStyles (Optional)             | Button styles                                                    |

- Button styles can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/button/index.tsx)

### Alert

- Props

| Name               | Type                                 | Description                                                                         |
| :----------------- | :----------------------------------- | :---------------------------------------------------------------------------------- |
| title              | string (Required)                    | Alert title                                                                         |
| message            | string (Optional)                    | Alert message                                                                       |
| isVisible          | bool (Optional)                      | Show/hide alert, default is `false`                                                 |
| horizontalSpace    | number (Optional)                    | Horizontal space between elements inside Alert                                      |
| children           | React Node (Optional)                | Children below message and above CTA buttons                                        |
| leftIcon           | React Node (Optional)                | Top left icon, default is information icon                                          |
| closeIcon          | React Node (Optional)                | Close icon (top right), default is cross icon                                       |
| confirmTitle       | string (Optional)                    | Title of confirm button, default is `OK`                                            |
| cancelTitle        | string (Optional)                    | Title of cancel button, default is `undefined`. If `undefined`, cancel button hiden |
| backdropOpacity    | number (Optional)                    | Backdrop opacity, default is `0.5`                                                  |
| animationIn        | 'fadeIn', 'slideInUp', 'zoomIn'      | Animation when alert appear. Default is `fadeIn`                                    |
| animationOut       | 'fadeOut', 'slideOutDown', 'zoomOut' | Animation when alert disappear. Default is `fadeOut`                                |
| animationInTiming  | number (Optional)                    | Animation in duration                                                               |
| animationOutTiming | number (Optional)                    | Animation out duration                                                              |
| onConfirmed        | Function (Optional)                  | Handle action when clicked confirm button                                           |
| onCancel           | Function (Optional)                  | Handle action when clicked cancel button                                            |
| onClose            | Function (Optional)                  | Handle action when clicked close button                                             |
| onBackButtonPress  | Function (Optional)                  | Handle action when press back button in Android                                     |
| onBackdropPress    | Function (Optional)                  | Handle action when press on backdrop                                                |
| onModalHide        | Function (Optional)                  | Callback function when alert hiden                                                  |
| style              | AlertModalStyles (Optional)          |                                                                                     |

- Alert styles can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/alert/index.tsx)

### BottomSheet

- Props

| Name               | Type                                 | Description                                                 |
| :----------------- | :----------------------------------- | :---------------------------------------------------------- |
| children           | React Node (Required)                | Children below message and above CTA buttons                |
| isVisible          | bool (Optional)                      | Show/hide bottom sheet, default is `false`                  |
| backdropOpacity    | number (Optional)                    | Backdrop opacity, default is `0.5`                          |
| animationIn        | 'fadeIn', 'slideInUp', 'zoomIn'      | Animation when bottom sheet appear. Default is `fadeIn`     |
| animationOut       | 'fadeOut', 'slideOutDown', 'zoomOut' | Animation when bottom sheet disappear. Default is `fadeOut` |
| animationInTiming  | number (Optional)                    | Animation in duration                                       |
| animationOutTiming | number (Optional)                    | Animation out duration                                      |
| onBackButtonPress  | Function (Optional)                  | Handle action when press back button in Android             |
| onBackdropPress    | Function (Optional)                  | Handle action when press on backdrop                        |
| onModalHide        | Function (Optional)                  | Callback function when bottom sheet hiden                   |
| style              | BottomSheetModalStyles (Optional)    |                                                             |

- Bottom-sheet styles can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/bottom-sheet/index.tsx)

### Image

- Props

| Name          | Type                      | Description                          |
| :------------ | :------------------------ | :----------------------------------- |
| fallbackImage | ImageURISource (Required) | Default images if load source failed |
| ...restProps  | ImageProps                | All image props                      |

### InputField

- Props

| Name                 | Type                                | Description                                                             |
| :------------------- | :---------------------------------- | :---------------------------------------------------------------------- |
| name                 | srting (Required)                   | Formik field name                                                       |
| prefixIcon           | React Node (Optional)               | Prefix icon of InputField (on the left)                                 |
| suffixIcon           | React Node (Optional)               | Suffic icon of InputField (on the right)                                |
| errorBorderColor     | string (Optional)                   | Color of border when error happened                                     |
| activeBorderColor    | string (Optional)                   | Color of border when field is focused                                   |
| inactiveBorderColor  | string (Optional)                   | Color of border when field is unfocused                                 |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| formatError          | Function return string (Optional)   | Format in-line error message, example translate error message by locale |
| ...restProps         | TextInputProps & TextInputMaskProps | Props of text input and text input mask                                 |

- Input styles can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/input-field/index.tsx)

### InputPhoneNumber

- Props

| Name                 | Type                                | Description                                                             |
| :------------------- | :---------------------------------- | :---------------------------------------------------------------------- |
| name                 | srting (Required)                   | Formik field name                                                       |
| dialCode             | srting (Required)                   | Dial code (ex: 84, 65, 1, 94, ...)                                      |
| onPressDialCode      | Function (Required)                 | Handle action when clicked dial code                                    |
| prefixIcon           | React Node (Optional)               | Prefix icon of InputField (on the left)                                 |
| suffixIcon           | React Node (Optional)               | Suffic icon of InputField (on the right)                                |
| errorBorderColor     | string (Optional)                   | Color of border when error happened                                     |
| activeBorderColor    | string (Optional)                   | Color of border when field is focused                                   |
| inactiveBorderColor  | string (Optional)                   | Color of border when field is unfocused                                 |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| placeholderTextColor | string (Optional)                   | Color of placeholder text                                               |
| formatError          | Function return string (Optional)   | Format in-line error message, example translate error message by locale |
| ...restProps         | TextInputProps & TextInputMaskProps | Props of text input and text input mask                                 |

- Input phone number styles can be found [here](https://github.com/101digital/react-native-theme-component/blob/master/src/input-phone-number/index.tsx)

### Add component to the config.json file manually

1. Make sure you synced latest local data in `theme-component.json` into [theme-component.json](https://github.com/101digital/components-data/blob/main/data/theme-component.json). They should be synced once you update

2. Add the theme-component to `components` tags. The theme-component have `componentId` is "74a603bd-a36a-4f2b-bc18-385a4101878c" and it can't be changed.

```
{
...
 "components": [
    {
      "componentId": "74a603bd-a36a-4f2b-bc18-385a4101878c",
      "componentName": "ThemeComponent",
      "isRequired": true,
    }
  ]
...
}
```

- If you wanna add custome fonts, colors to the theme-component, you can see the example below:

```
{
...
 "components": [
    {
      "componentId": "74a603bd-a36a-4f2b-bc18-385a4101878c",
      "componentName": "ThemeComponent",
      "isRequired": true,
      "config": {
        "fonts": [
          {
            "source": "https://link-to-regular-font",
            "name": "Regular.ttf",
            "type": "regular"
          },
          {
            "source": "https://link-to-medium-font",
            "name": "Medium.ttf",
            "type": "medium"
          },
          {
            "source": "https://link-to-semibold-font",
            "name": "SemiBold.ttf",
            "type": "semiBold"
          },
          {
            "source": "https://link-to-bold-font",
            "name": "Bold.ttf",
            "type": "bold"
          }
        ],
        "colors": {
          "primaryColor": "red"
        }
      }
    }
  ]
...
}
```

- Custom fonts: You can add arrays of fonts to the config, each of them must have: source, name. type. Source is a link to fonts source to download it. Name is name of font. Type is one of fonts props name. Fonts props can be found here: [Fonts prps](https://github.com/101digital/react-native-theme-component/blob/master/README.md#fonts)

- Custom colors: contain color keys and color values. Color keys can be found here: [Colors props](https://github.com/101digital/react-native-theme-component/blob/master/README.md#colors)

3. Check required dependencies of auth-component inside tag `dependencies` in `config.json`. Make sure tag `dependencies` must have enough below data

```
{
...
 "dependencies": [
    { "name": "@react-native-async-storage/async-storage", "version": "^1.15.5" },
    { "name": "react-native-localize", "version": "^2.1.1" },
    {
      "name": "lodash",
      "version": "^4.17.19",
      "typescript": {
        "name": "@types/lodash",
        "version": "^4.14.161"
      }
    },
    { "name": "formik", "version": "^2.2.9" },
    { "name": "react-native-masked-text", "version": "^1.13.0" },
    { "name": "react-native-modal", "version": "^12.0.2" },
    { "name": "react-native-svg", "version": "^12.1.1" },
    { "name": "react-native-extra-dimensions-android", "version": "^1.2.5"},
    { "name": "react-native-keyboard-aware-scroll-view", "version": "^0.9.3"}
  ],
...
}
```

If have any item is not existing in `dependencies` of `config.json` file, please find missing one from `src/component.json` and put it to `dependencies`.
