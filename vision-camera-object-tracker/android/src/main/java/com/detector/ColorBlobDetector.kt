package com.detector

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.mrousavy.camera.frameprocessors.Frame
import android.media.Image
import android.util.Log

class ColorBlobDetector {

    fun detect(frameMap: Any, targetColor: String): WritableMap {
        val result = Arguments.createMap()
        
        // 1. Cast attempt
        val frame = frameMap as? Frame ?: return errorMap("CAST_FAIL")
        
        val image = try {
            frame.image
        } catch (e: Exception) {
            return errorMap("IMAGE_ACCESS_FAIL")
        }

        var sumX = 0L
        var sumY = 0L
        var pixelCount = 0

        val width = image.width
        val height = image.height

        // Access Planes
        val planeU = image.planes[1].buffer
        val planeV = image.planes[2].buffer
        val rowStride = image.planes[1].rowStride
        val pixelStride = image.planes[1].pixelStride

        // 3. Scan with a wider net
        val step = 15 // Faster scan for testing
        for (y in 0 until height step step) {
            for (x in 0 until width step step) {
                // YUV420: U/V planes are half the size of Y
                val uvIndex = (y / 2) * rowStride + (x / 2) * pixelStride
                
                if (uvIndex >= planeU.capacity() || uvIndex >= planeV.capacity()) continue

                val u = planeU.get(uvIndex).toInt() and 0xFF
                val v = planeV.get(uvIndex).toInt() and 0xFF

                // SUPER WIDE RED CHECK: 
                // Normally V > 150, but let's try V > 140 and U < 130
                if (u < 130 && v > 140) {
                    sumX += x
                    sumY += y
                    pixelCount++
                }
            }
        }

        println("$pixelCount")

        if (pixelCount > 10) {
            result.putDouble("x", (sumX.toDouble() / pixelCount) / width)
            result.putDouble("y", (sumY.toDouble() / pixelCount) / height)
            result.putBoolean("found", true)
            result.putInt("pixelCount", pixelCount) // Debug: how much red do we see?
        } else {
            result.putBoolean("found", false)
            result.putInt("pixelCount", pixelCount)
        }

        return result
    }

    private fun errorMap(reason: String): WritableMap {
        println("in errorMap")

        val map = Arguments.createMap()
        map.putBoolean("found", false)
        map.putString("error", reason)
        return map
    }
}