import ReactNativeWaifu2xModule from './ReactNativeWaifu2xModule';

export async function generate(
  imageUri: string,
  saveUri: string,
  modelUri: string,
): Promise<string | null> {
  return await ReactNativeWaifu2xModule.generate(imageUri, saveUri, modelUri);
}
