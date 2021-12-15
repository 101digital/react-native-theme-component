# `@banking-component/core`

Core utilities for building banking component

## Features

- Base helper functions
- All object types using for banking component
- `BNoWalletComponent` display placeholder if no wallet linked

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://gitpkg.now.sh/101digital/react-native-banking-components/packages/core
```

- Installed [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)

If have any issue while installing, can see [Issue While Installing Sub-Component](https://github.com/101digital/react-native-banking-components/blob/master/README.md)

## Quick Start

## API References

### BNoWalletComponent

- Props

| Name                 | Description                                              |
| -------------------- | :------------------------------------------------------- |
| message              | Placeholder message, default is `No Bank Account Linked` |
| buttonLabel          | Link bank button label, default is `Link Bank Account`   |
| leftIcon             | Icon of link bank button                                 |
| onLinkAccountPressed | Listen link bank button triggred                         |
| style                | [NoWalletThemeStyles](./src/no-wallet/index.tsx)         |

- Example

```javascript
import { BNoWalletComponent } from '@banking-component/core';
import { View } from 'react-native';

const WalletComponent = () {

  return (
    <View>
      <BNoWalletComponent
        message={'Empty wallets message'}
        buttonLabel={'Add new wallet'}
        onLinkAccountPressed={() => {
           console.log('Ok')
        }}
      />
    </View>
  );
}

export default WalletComponent;
```

### Helper functions

| Name            | Description                                                                                                               |
| --------------- | :------------------------------------------------------------------------------------------------------------------------ |
| defaultsDeep    | Deep merge current Object with Objects                                                                                    |
| isEmpty         | return `true` if Object is `undefined`, `null` or empty values                                                            |
| isNotEmpty      | !`isEmpty`                                                                                                                |
| uniqBy          | invoked for each element in `array` to generate the criterion by which uniqueness is computed                             |
| getUrlParameter | Get query data from key in the URL                                                                                        |
| groupBy         | Group element in array by key                                                                                             |
| chain           | Creates a lodash object that wraps value with explicit method chaining enabled.                                           |
| orderBy         | Sort element in the array by key                                                                                          |
| filter          | Iterates over elements of collection, returning an array of all elements predicate returns truthy for                     |
| union           | Creates an array of unique values, in order, from all of the provided arrays using SameValueZero for equality comparisons |

### Banking Object Types

Can be found [here](./src/types.ts)
