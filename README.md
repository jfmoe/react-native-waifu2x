# react-native-waifu2x

This is a React Native implementation of [waifu2x](https://github.com/nagadomi/waifu2x). The target
of this project is to run waifu2x models right on devices without network. Currently only supports
iOS devices.

## Installation

### Expo

Install the library:

```shell
npx expo install react-native-waifu2x
```

Then rebuild your app:

```shell
npx expo prebuild -p ios --clean
npx expo run:ios
```

## Usage

See the [example app](https://github.com/jfmoe/react-native-waifu2x/tree/main/example).

## About models

You can download from [here](https://github.com/jfmoe/react-native-waifu2x/tree/main/assets). If you
want to customizable models, see
[waifu2x-ios#about-models](https://github.com/imxieyi/waifu2x-ios?tab=readme-ov-file#about-models).

## Demo

![demo](./assets/demo.png)

## Related Projects

- [waifu2x](https://github.com/nagadomi/waifu2x)
- [waifu2x-ios](https://github.com/imxieyi/waifu2x-ios)
