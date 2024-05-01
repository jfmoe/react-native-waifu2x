import Foundation
import UIKit
import Dispatch
import ExpoModulesCore
import CoreML
import CoreServices
import AVFoundation

public class ReactNativeWaifu2xModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ReactNativeWaifu2x')` in JavaScript.
    Name("ReactNativeWaifu2x")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    AsyncFunction("convert") { (imageUri: String, modelUri: String, saveUri: String) in
      let outimage = Waifu2x.run(imageFromLocalUri(imageUri), model: Model.anime_noise1_scale2x, modelPath: URL(string: modelUri))
        
      let imageData = (outimage!).jpegData(compressionQuality: 1)

      if let uri = URL(string: saveUri) {
        do {
            try imageData!.write(to: uri)
            print("Image saved successfully.")
        } catch {
            print("Error saving image:", error)
        }
      } else {
          print("Invalid URL.")
      }
      
      self.sendEvent("onChange", [
        "value": saveUri
      ])
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(ReactNativeWaifu2xView.self) {
      // Defines a setter for the `name` prop.
      Prop("name") { (view: ReactNativeWaifu2xView, prop: String) in
        print(prop)
      }
    }
  }
}

func imageFromLocalUri(_ uri: String) -> UIImage? {
    // 将 URI 字符串转换为 URL
    guard let url = URL(string: uri) else {
        print("无效的 URL")
        return nil
    }

    // 检查 URL 是否是文件 URL
    guard url.isFileURL else {
        print("URL 不是文件 URL")
        return nil
    }

    // 尝试从文件 URL 加载数据并创建 UIImage
    do {
        let imageData = try Data(contentsOf: url)
        let image = UIImage(data: imageData)
        return image
    } catch {
        print("无法加载图片: \(error)")
        return nil
    }
}
