import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ReactNativeWaifu2xViewProps } from './ReactNativeWaifu2x.types';

const NativeView: React.ComponentType<ReactNativeWaifu2xViewProps> =
  requireNativeViewManager('ReactNativeWaifu2x');

export default function ReactNativeWaifu2xView(props: ReactNativeWaifu2xViewProps) {
  return <NativeView {...props} />;
}
