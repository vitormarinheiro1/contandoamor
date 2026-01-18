"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Heart } from "lucide-react"
import { TimeCounter } from "./time-counter"
import { QRCodeDisplay } from "./qr-code-display"

interface CoupleData {
  coupleName: string
  startDate: string
  message: string
  photos: string[]
  musicUrl: string
  email: string
  plan: string
  createdAt: string
  id: string
}

export function CouplePageContent() {
  const params = useParams()
  const [data, setData] = useState<CoupleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const id = params.id as string
    const storedData = localStorage.getItem(`loveyuu-${id}`)
    
    if (storedData) {
      setData(JSON.parse(storedData))
    }
    setLoading(false)
  }, [params.id])

  useEffect(() => {
    if (data && data.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % data.photos.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [data])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 animate-pulse text-primary" />
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-foreground">Pagina nao encontrada</h1>
          <p className="mt-2 text-muted-foreground">Esta pagina de casal nao existe ou foi removida.</p>
        </div>
      </div>
    )
  }

  const pageUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">LoveYuu</span>
            </div>

            <h1 className="mt-8 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
              {data.coupleName}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              Juntos desde{" "}
              <span className="font-semibold text-foreground">
                {new Date(data.startDate).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>

          {/* Time Counter */}
          <div className="mt-12">
            <TimeCounter startDate={data.startDate} />
          </div>

          {/* Photos */}
          <div className="mt-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 shadow-xl">
              {data.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt={`Foto ${index + 1} de ${data.coupleName}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    index === currentPhotoIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {data.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {data.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentPhotoIndex
                          ? "bg-white"
                          : "bg-white/50"
                      }`}
                      aria-label={`Ver foto ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="mt-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary fill-primary" />
            </div>
            <blockquote className="mt-6 font-serif text-xl text-foreground md:text-2xl italic text-pretty">
              &ldquo;{data.message}&rdquo;
            </blockquote>
          </div>

          {/* QR Code */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Compartilhe Este Momento
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use o QR Code abaixo para compartilhar esta pagina.
            </p>
            <div className="mt-6">
              <QRCodeDisplay url={pageUrl} coupleName={data.coupleName} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              Criado com{" "}
              <Heart className="inline h-3 w-3 text-primary fill-primary" />{" "}
              no{" "}
              <a href="/" className="text-primary hover:underline">
                LoveYuu
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
