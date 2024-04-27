import * as React from 'react';

import { ReactNativeWaifu2xViewProps } from './ReactNativeWaifu2x.types';

export default function ReactNativeWaifu2xView(props: ReactNativeWaifu2xViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
