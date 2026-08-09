import Foundation
import AppKit

func convertSvgToJpg(svgPath: String, jpgPath: String, width: Int = 500, height: Int = 500) -> Bool {
    guard let svgData = try? Data(contentsOf: URL(fileURLWithPath: svgPath)) else { return false }
    guard let image = NSImage(data: svgData) else { return false }
    
    let targetSize = NSSize(width: width, height: height)
    guard let rep = NSBitmapImageRep(
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
    ) else { return false }
    
    rep.size = targetSize
    NSGraphicsContext.saveGraphicsState()
    guard let context = NSGraphicsContext(bitmapImageRep: rep) else { return false }
    NSGraphicsContext.current = context
    
    // Draw crisp white background
    NSColor.white.set()
    NSRect(origin: .zero, size: targetSize).fill()
    
    // Draw SVG vector card
    image.draw(in: NSRect(origin: .zero, size: targetSize), from: NSRect(origin: .zero, size: image.size), operation: .sourceOver, fraction: 1.0)
    NSGraphicsContext.restoreGraphicsState()
    
    guard let jpgData = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else { return false }
    
    do {
        try jpgData.write(to: URL(fileURLWithPath: jpgPath))
        return true
    } catch {
        return false
    }
}

let fm = FileManager.default
let baseDirs = ["./public/images/week36", "./public/images/week37"]

var totalConverted = 0
for baseDir in baseDirs {
    guard let files = try? fm.contentsOfDirectory(atPath: baseDir) else { continue }
    for file in files where file.hasSuffix(".svg") {
        let svgPath = "\(baseDir)/\(file)"
        let jpgPath = "\(baseDir)/\(file.replacingOccurrences(of: ".svg", with: ".jpg"))"
        if convertSvgToJpg(svgPath: svgPath, jpgPath: jpgPath) {
            totalConverted += 1
        }
    }
}

print("🎉 Successfully converted \(totalConverted) SVG cards to authentic JPEG binary files!")
