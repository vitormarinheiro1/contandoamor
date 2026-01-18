"use client"

import React from "react"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Heart, ImageIcon, Loader2, Music, Upload, X } from "lucide-react"

interface FormData {
  coupleName: string
  startDate: string
  message: string
  photos: string[]
  musicUrl: string
  email: string
}

export function CoupleForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plano") || "basico"
  const isPremium = selectedPlan === "premium"
  const maxPhotos = isPremium ? 3 : 1

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    coupleName: "",
    startDate: "",
    message: "",
    photos: [],
    musicUrl: "",
    email: "",
  })

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPhotos: string[] = []
    const filesToProcess = Math.min(files.length, maxPhotos - formData.photos.length)

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push(event.target.result as string)
          if (newPhotos.length === filesToProcess) {
            setFormData(prev => ({
              ...prev,
              photos: [...prev.photos, ...newPhotos].slice(0, maxPhotos)
            }))
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }, [formData.photos.length, maxPhotos])

  const removePhoto = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Generate unique ID for the couple page
    const pageId = Math.random().toString(36).substring(2, 10)

    // Store data in localStorage for demo (in production, this would be saved to database)
    const pageData = {
      ...formData,
      plan: selectedPlan,
      createdAt: new Date().toISOString(),
      id: pageId,
    }
    localStorage.setItem(`loveyuu-${pageId}`, JSON.stringify(pageData))

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    router.push(`/casal/${pageId}`)
  }

  const isFormValid = formData.coupleName && formData.startDate && formData.message && formData.photos.length > 0 && formData.email

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Informacoes do Casal
          </CardTitle>
          <CardDescription>
            Preencha os dados para criar sua pagina personalizada.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coupleName">Nome do Casal</Label>
            <Input
              id="coupleName"
              placeholder="Ex: Ana & Pedro"
              value={formData.coupleName}
              onChange={(e) => setFormData(prev => ({ ...prev, coupleName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Data de Inicio do Relacionamento
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail para Receber o QR Code</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem Especial</Label>
            <Textarea
              id="message"
              placeholder="Escreva uma mensagem carinhosa para seu amor..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Fotos
            <span className="text-sm font-normal text-muted-foreground">
              ({formData.photos.length}/{maxPhotos})
            </span>
          </CardTitle>
          <CardDescription>
            {isPremium
              ? "Adicione ate 3 fotos que serao transformadas no estilo Ghibli."
              : "Adicione 1 foto para sua pagina."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Foto ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  aria-label="Remover foto"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {formData.photos.length < maxPhotos && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">Adicionar foto</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple={isPremium}
                  onChange={handlePhotoUpload}
                  className="sr-only"
                />
              </label>
            )}
          </div>
        </CardContent>
      </Card>

      {isPremium && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              Musica de Fundo
              <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Premium
              </span>
            </CardTitle>
            <CardDescription>
              Adicione uma URL do YouTube ou Spotify para tocar como musica de fundo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.musicUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, musicUrl: e.target.value }))}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Plano selecionado:{" "}
          <span className="font-semibold text-foreground capitalize">{selectedPlan}</span>
          {" - "}
          <span className="font-semibold text-primary">
            {isPremium ? "R$ 39" : "R$ 19"}
          </span>
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={!isFormValid || isSubmitting}
          className="gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Criando...
            </>
          ) : (
            <>
              <Heart className="h-5 w-5" />
              Criar Pagina
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
