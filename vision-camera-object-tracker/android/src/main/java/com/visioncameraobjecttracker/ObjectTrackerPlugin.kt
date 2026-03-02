package com.visioncameraobjecttracker

import android.graphics.ImageFormat
// Note the 's' at the end of frameprocessors
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy
import org.opencv.core.*
import org.opencv.imgproc.Imgproc

class ObjectTrackerPlugin(proxy: VisionCameraProxy, options: Map<String, Any>?) : FrameProcessorPlugin() {

    // We reuse Mats to prevent Memory Churn (prevents lag)
    private var yuvMat: Mat? = null
    private var bgrMat: Mat? = null
    private var hsvMat: Mat? = null
    private var mask: Mat? = null

    override fun callback(frame: Frame, params: Map<String, Any>?): Any? {
        val image = frame.image
        
        // 1. Verify Image Format
        if (image.format != ImageFormat.YUV_420_888) return null

        // 2. Extract HSV targets from JS (Hue is 0-180 in OpenCV)
        val h = (params?.get("h") as? Double) ?: 0.0
        val s = (params?.get("s") as? Double) ?: 100.0
        val v = (params?.get("v") as? Double) ?: 100.0

        // 3. Setup Mats (Allocated only once)
        if (yuvMat == null) yuvMat = Mat(image.height + image.height / 2, image.width, CvType.CV_8UC1)
        if (bgrMat == null) bgrMat = Mat()
        if (hsvMat == null) hsvMat = Mat()
        if (mask == null) mask = Mat()

        // 4. Convert YUV Plane to Mat
        val yBuffer = image.planes[0].buffer
        val yData = ByteArray(yBuffer.remaining())
        yBuffer.get(yData)
        yuvMat!!.put(0, 0, yData)

        // 5. Processing Pipeline: YUV -> BGR -> HSV -> MASK
        Imgproc.cvtColor(yuvMat!!, bgrMat!!, Imgproc.COLOR_YUV2BGR_NV21)
        Imgproc.cvtColor(bgrMat!!, hsvMat!!, Imgproc.COLOR_BGR2HSV)

        // Define search range (+/- 10 for Hue)
        val lowerBound = Scalar(h - 10, 100.0, 100.0)
        val upperBound = Scalar(h + 10, 255.0, 255.0)
        Core.inRange(hsvMat!!, lowerBound, upperBound, mask!!)

        // 6. Calculate Center of Mass
        val moments = Imgproc.moments(mask!!)
        val area = moments.m00

        if (area > 500) { // If blob is large enough to be an object
            return mapOf(
                "x" to (moments.m10 / area) / image.width,
                "y" to (moments.m01 / area) / image.height,
                "detected" to true
            )
        }

        return mapOf("detected" to false)
    }
}