import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ReactNativeWaifu2x.web.ts
// and on native platforms to ReactNativeWaifu2x.ts
import { ChangeEventPayload, ReactNativeWaifu2xViewProps } from './ReactNativeWaifu2x.types';
import ReactNativeWaifu2xModule from './ReactNativeWaifu2xModule';
import ReactNativeWaifu2xView from './ReactNativeWaifu2xView';

// Get the native constant value.
export const PI = ReactNativeWaifu2xModule.PI;

export function hello(): string {
  return ReactNativeWaifu2xModule.hello();
}

export async function convert(uri: string, modelUri: string, saveUri: string) {
  return await ReactNativeWaifu2xModule.convert(uri, modelUri, saveUri);
}

export async function setValueAsync(value: string) {
  return await ReactNativeWaifu2xModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReactNativeWaifu2xModule ?? NativeModulesProxy.ReactNativeWaifu2x);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ReactNativeWaifu2xView, ReactNativeWaifu2xViewProps, ChangeEventPayload };
