package com.visioncameraobjecttracker

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.mrousavy.camera.frameprocessors.FrameProcessorPluginRegistry
import com.visioncameraobjecttrackerplugin.VisionCameraObjectTrackerPlugin

class VisionCameraObjectTrackerPluginPackage : ReactPackage {
  companion object {
    init {
      FrameProcessorPluginRegistry.addFrameProcessorPlugin("detectObjectInFrame") { proxy, options ->
        VisionCameraObjectTrackerPlugin(proxy, options)
      }
    }
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return emptyList()
  }
  
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(
        VisionCameraObjectTrackerModule(reactContext),
    )
  }
}