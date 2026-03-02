package com.visioncameraobjecttracker

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
// Update this import to plural 'frameprocessors'
import com.mrousavy.camera.frameprocessors.FrameProcessorPluginRegistry

class VisionCameraObjectTrackerPackage : BaseReactPackage() {

  // This is the part that registers the "trackObject" name for the camera
  companion object {
    init {
      // Ensure this matches the plural package name
      FrameProcessorPluginRegistry.addFrameProcessorPlugin("trackObject") { proxy, options ->
        ObjectTrackerPlugin(proxy, options)
      }
    }
  }

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == VisionCameraObjectTrackerModule.NAME) {
      VisionCameraObjectTrackerModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      VisionCameraObjectTrackerModule.NAME to ReactModuleInfo(
        name = VisionCameraObjectTrackerModule.NAME,
        className = VisionCameraObjectTrackerModule.NAME,
        canOverrideExistingModule = false,
        needsEagerInit = false,
        isCxxModule = false,
        isTurboModule = true
      )
    )
  }
}