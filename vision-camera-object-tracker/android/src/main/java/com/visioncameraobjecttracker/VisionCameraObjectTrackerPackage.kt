package com.visioncameraobjecttracker

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class VisionCameraObjectTrackerPackage : BaseReactPackage() {
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
