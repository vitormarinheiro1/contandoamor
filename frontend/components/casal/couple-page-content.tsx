"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Heart } from "lucide-react";

import { TimeCounter } from "./time-counter";
import { QRCodeDisplay } from "./qr-code-display";

interface CoupleData {
  page_id: string;
  nome_do_casal: string;
  data_de_inicio_relacionamento: string;
  email: string;
  mensagem: string;
  foto: string | null;
  created_at: string;
}

export function CouplePageContent() {
  const params = useParams();
  const [data, setData] = useState<CoupleData | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchCouple = async () => {
      try {
        const pageId = params.id as string;

        const response = await axios.get(
          `http://127.0.0.1:8000/casal/${pageId}/`,
        );

        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar casal:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCouple();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Heart className="h-12 w-12 animate-pulse text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            Esta página de casal não existe ou foi removida.
          </p>
        </div>
      </div>
    );
  }

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold">
            {data.nome_do_casal}
          </h1>

          <p className="mt-4 text-muted-foreground">
            Juntos desde{" "}
            <strong>
              {new Date(data.data_de_inicio_relacionamento).toLocaleDateString(
                "pt-BR",
              )}
            </strong>
          </p>
        </div>

        {/* CONTADOR */}
        <div className="mt-10">
          <TimeCounter startDate={data.data_de_inicio_relacionamento} />
        </div>

        {/* FOTO */}
        {data.foto && (
          <div className="mt-12 overflow-hidden rounded-2xl shadow-xl">
            <img
              src={data.foto}
              alt={`Foto de ${data.nome_do_casal}`}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* MENSAGEM */}
        <div className="mt-12 text-center">
          <blockquote className="font-serif text-xl italic">
            &ldquo;{data.mensagem}&rdquo;
          </blockquote>
        </div>

        {/* QR CODE */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold">Compartilhe este momento</h2>
          <div className="mt-6">
            <QRCodeDisplay url={pageUrl} coupleName={data.nome_do_casal} />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          Criado com{" "}
          <Heart className="inline h-3 w-3 fill-primary text-primary" /> no
          Contando Amor
        </div>
      </div>
    </div>
  );
}
