import ExpoModulesCore
import Foundation
import UIKit

public class ReactNativeWaifu2xModule: Module {

  public func definition() -> ModuleDefinition {

    Name("ReactNativeWaifu2x")

    AsyncFunction("generate") {
      (imageUri: String, saveUri: String, modelUri: String, promise: Promise) in
      let background = DispatchQueue(label: "background", qos: .utility)

      background.async {
        guard let image = imageFromLocalUri(imageUri) else {
          promise.reject("Error", "Failed to load image from URI: \(imageUri)")
          return
        }

        do {
          let outimage = try Waifu2x.run(
            image, model: Model.anime_noise1_scale2x,
            modelPath: URL(string: modelUri))

          let imageData = outimage?.jpegData(compressionQuality: 1)

          if let uri = URL(string: saveUri) {
            try imageData?.write(to: uri)
            promise.resolve(saveUri)
          } else {
            promise.reject("Error", "Invalid save URL")
          }
        } catch {
          promise.reject("Error", "Failed to process image using Waifu2x: \(error)")
        }

      }
    }

  }
}

// Convert image uri to UIImage
func imageFromLocalUri(_ uri: String) -> UIImage? {

  guard let url = URL(string: uri) else {
    print("Invalid URL")
    return nil
  }

  guard url.isFileURL else {
    print("URL is not file URL")
    return nil
  }

  do {
    let imageData = try Data(contentsOf: url)
    let image = UIImage(data: imageData)
    return image
  } catch {
    print("Can't load image: \(error)")
    return nil
  }
}
