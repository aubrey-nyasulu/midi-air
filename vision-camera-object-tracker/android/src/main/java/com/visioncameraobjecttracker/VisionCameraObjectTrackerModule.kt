package com.visioncameraobjecttracker

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class VisionCameraObjectTrackerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "VisionCameraObjectTracker"
  }
}