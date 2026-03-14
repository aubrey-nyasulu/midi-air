package com.visioncameraobjecttracker

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class VisionCameraObjectTrackerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    @ReactMethod
    fun process(promise: Promise){
        try {
            promise.resolve("Hello from VisionCameraObjectTrackerModule")
        } catch (e: Exception) {
            e.printStackTrace()
            promise.reject("Error", "Error processing image")
        }

        promise.resolve(true)
    }
    override fun getName(): String {
        return NAME
    }

    companion object {
        const val NAME = "VisionCameraObjectTrackerModule"
    }
}

