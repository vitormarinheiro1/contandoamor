"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

interface QRCodeDisplayProps {
  url: string
  coupleName: string
}

export function QRCodeDisplay({ url, coupleName }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Simple QR code generation (visual representation)
    const size = 200
    const moduleSize = 8
    const modules = Math.floor(size / moduleSize)

    canvas.width = size
    canvas.height = size

    // Fill background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Generate pseudo-random pattern based on URL
    ctx.fillStyle = "#1a1a1a"
    
    // Draw positioning patterns (corners)
    const drawPositionPattern = (x: number, y: number) => {
      // Outer square
      ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize)
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize)
    }

    drawPositionPattern(0, 0) // Top-left
    ctx.fillStyle = "#1a1a1a"
    drawPositionPattern(size - 7 * moduleSize, 0) // Top-right
    ctx.fillStyle = "#1a1a1a"
    drawPositionPattern(0, size - 7 * moduleSize) // Bottom-left

    // Generate data pattern based on URL hash
    let hash = 0
    for (let i = 0; i < url.length; i++) {
      hash = ((hash << 5) - hash) + url.charCodeAt(i)
      hash = hash & hash
    }

    ctx.fillStyle = "#1a1a1a"
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        // Skip positioning patterns
        if ((row < 8 && col < 8) || (row < 8 && col >= modules - 8) || (row >= modules - 8 && col < 8)) {
          continue
        }

        // Pseudo-random fill based on position and hash
        const seed = (row * modules + col + hash) * 31
        if (seed % 3 === 0 || seed % 5 === 0) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    // Add heart in center
    ctx.fillStyle = "#e11d48"
    const centerX = size / 2
    const centerY = size / 2
    const heartSize = 20

    ctx.beginPath()
    ctx.moveTo(centerX, centerY + heartSize / 4)
    ctx.bezierCurveTo(
      centerX, centerY - heartSize / 2,
      centerX - heartSize, centerY - heartSize / 2,
      centerX - heartSize, centerY
    )
    ctx.bezierCurveTo(
      centerX - heartSize, centerY + heartSize / 2,
      centerX, centerY + heartSize,
      centerX, centerY + heartSize
    )
    ctx.bezierCurveTo(
      centerX, centerY + heartSize,
      centerX + heartSize, centerY + heartSize / 2,
      centerX + heartSize, centerY
    )
    ctx.bezierCurveTo(
      centerX + heartSize, centerY - heartSize / 2,
      centerX, centerY - heartSize / 2,
      centerX, centerY + heartSize / 4
    )
    ctx.fill()
  }, [url])

  const handleDownload = () => {
    if (!canvasRef.current) return
    const link = document.createElement("a")
    link.download = `qrcode-${coupleName.replace(/\s+/g, "-").toLowerCase()}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pagina do casal ${coupleName}`,
          text: "Veja nossa pagina especial no LoveYuu!",
          url: url,
        })
      } catch {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url)
      alert("Link copiado para a area de transferencia!")
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-xl bg-white p-4 shadow-lg">
        <canvas ref={canvasRef} className="h-[200px] w-[200px]" />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Baixar
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>
      </div>
    </div>
  )
}
