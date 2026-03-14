package com.visioncameraobjecttrackerplugin

import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy
import com.mrousavy.camera.frameprocessors.SharedArray

class VisionCameraObjectTrackerPlugin(proxy: VisionCameraProxy, options: Map<String, Any>?): FrameProcessorPlugin() {
  private val sharedArray: SharedArray = SharedArray(proxy, 5)
  
  override fun callback(frame: Frame, arguments: Map<String, Any>?): Any? {
    // code goes here
    println("Successfully allocated SharedArray! Size: ${sharedArray.size}")

    val image = frame.image

    println("${image.width} x ${image.height} Image with format #${image.format}.")

    return mapOf(
            "example_str" to "Test",
            "example_bool" to true,
            "example_double" to 5.3,
            "example_lists" to listOf("names"),
        )
  }
}
