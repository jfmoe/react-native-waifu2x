import ExpoModulesCore
import Foundation
import UIKit

public class ReactNativeWaifu2xModule: Module {

  public func definition() -> ModuleDefinition {

    Name("ReactNativeWaifu2x")

    AsyncFunction("generate") { (imageUri: String, saveUri: String, modelUri: String) -> String? in
      // Generate image
      let outimage = Waifu2x.run(
        imageFromLocalUri(imageUri), model: Model.anime_noise1_scale2x,
        modelPath: URL(string: modelUri))

      // Save image
      let imageData = (outimage!).jpegData(compressionQuality: 1)

      if let uri = URL(string: saveUri) {
        do {
          try imageData!.write(to: uri)
          print("Image saved successfully.")
          return saveUri
        } catch {
          print("Error saving image:", error)
        }
      } else {
        print("Invalid URL.")
      }

      return nil
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
