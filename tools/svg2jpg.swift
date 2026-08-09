import Foundation
import AppKit

func convertSvgToJpg(svgPath: String, jpgPath: String, width: Int = 500, height: Int = 500) -> Bool {
    guard let svgData = try? Data(contentsOf: URL(fileURLWithPath: svgPath)) else {
        print("Failed to read \(svgPath)")
        return false
    }
    
    guard let image = NSImage(data: svgData) else {
        print("Failed to parse SVG \(svgPath)")
        return false
    }
    
    let targetSize = NSSize(width: width, height: height)
    let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: width,
        pixelsHigh: height,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .calibratedRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    )!
    
    rep.size = targetSize
    NSGraphicsContext.saveGraphicsState()
    let context = NSGraphicsContext(bitmapImageRep: rep)!
    NSGraphicsContext.current = context
    
    // Draw white background
    NSColor.white.set()
    NSRect(origin: .zero, size: targetSize).fill()
    
    // Draw SVG image
    image.draw(in: NSRect(origin: .zero, size: targetSize), from: NSRect(origin: .zero, size: image.size), operation: .sourceOver, fraction: 1.0)
    
    NSGraphicsContext.restoreGraphicsState()
    
    guard let jpgData = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else {
        print("Failed to create JPEG data")
        return false
    }
    
    do {
        try jpgData.write(to: URL(fileURLWithPath: jpgPath))
        print("✅ Converted \(svgPath) -> \(jpgPath)")
        return true
    } catch {
        print("Failed to write JPG \(error)")
        return false
    }
}

let args = CommandLine.arguments
if args.count >= 3 {
    let svg = args[1]
    let jpg = args[2]
    _ = convertSvgToJpg(svgPath: svg, jpgPath: jpg)
} else {
    print("Usage: svg2jpg <input.svg> <output.jpg>")
}
