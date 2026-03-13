package com.visioncameraobjecttracker

import com.facebook.react.bridge.ReactApplicationContext
import com.lib.Utils
import com.facebook.react.bridge.*

class VisionCameraObjectTrackerModule(reactContext: ReactApplicationContext) : NativeVisionCameraObjectTrackerSpec(reactContext) {
    // Initialize the specialized detectors
    private val colorBlobDetector = ColorBlobDetector()

    override fun helloKotlin(name: String): String = Utils.greet(name)
    
    override fun getName(): String = NAME
    
    companion object {
        const val NAME = NativeVisionCameraObjectTrackerSpec.NAME
    }
}