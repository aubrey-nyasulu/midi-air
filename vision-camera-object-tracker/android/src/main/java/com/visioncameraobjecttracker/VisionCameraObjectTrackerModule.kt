package com.visioncameraobjecttracker

import com.facebook.react.bridge.ReactApplicationContext

class VisionCameraObjectTrackerModule(reactContext: ReactApplicationContext) :
  NativeVisionCameraObjectTrackerSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeVisionCameraObjectTrackerSpec.NAME
  }
}
