"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Calendar,
  Heart,
  ImageIcon,
  Loader2,
  Music,
  Upload,
  X,
} from "lucide-react";

interface FormData {
  coupleName: string;
  startDate: string;
  message: string;
  photos: File[];
  musicUrl: string;
  email: string;
}

export function CoupleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedPlan = searchParams.get("plano") || "basico";
  const isPremium = selectedPlan === "premium";
  const maxPhotos = isPremium ? 3 : 1;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    coupleName: "",
    startDate: "",
    message: "",
    photos: [],
    musicUrl: "",
    email: "",
  });

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const selectedFiles = Array.from(files).slice(
        0,
        maxPhotos - formData.photos.length,
      );

      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...selectedFiles].slice(0, maxPhotos),
      }));
    },
    [formData.photos.length, maxPhotos],
  );

  const removePhoto = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();

      form.append("nome_do_casal", formData.coupleName);
      form.append("data_de_inicio_relacionamento", formData.startDate);
      form.append("email", formData.email);
      form.append("mensagem", formData.message);

      if (formData.photos.length > 0) {
        form.append("foto", formData.photos[0]);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/casal/`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const pageId = response.data.page_id;

      router.push(`/casal/${pageId}`);
    } catch (error) {
      console.error("Erro ao criar casal:", error);
      alert("Erro ao criar a página do casal");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.coupleName &&
    formData.startDate &&
    formData.message &&
    formData.photos.length > 0 &&
    formData.email;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* INFO DO CASAL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif">
            <Heart className="h-5 w-5 text-primary" />
            Informações do Casal
          </CardTitle>
          <CardDescription>
            Preencha os dados para criar sua página personalizada.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Nome do Casal</Label>
            <Input
              placeholder="Ex: Ana & Pedro"
              value={formData.coupleName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coupleName: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Data de Início do Relacionamento
            </Label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Mensagem Especial</Label>
            <Textarea
              rows={4}
              placeholder="Escreva uma mensagem carinhosa..."
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* FOTOS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif">
            <ImageIcon className="h-5 w-5 text-primary" />
            Fotos ({formData.photos.length}/{maxPhotos})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {formData.photos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg border overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(photo)}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {formData.photos.length < maxPhotos && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm">Adicionar foto</span>
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

      {/* MÚSICA PREMIUM */}
      {isPremium && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif">
              <Music className="h-5 w-5 text-primary" />
              Música de Fundo
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Input
              placeholder="URL do YouTube ou Spotify"
              value={formData.musicUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  musicUrl: e.target.value,
                }))
              }
            />
          </CardContent>
        </Card>
      )}

      {/* SUBMIT */}
      <Button
        type="submit"
        size="lg"
        disabled={!isFormValid || isSubmitting}
        className="w-full gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Criando...
          </>
        ) : (
          <>
            <Heart className="h-5 w-5" />
            Criar Página
          </>
        )}
      </Button>
    </form>
  );
}
