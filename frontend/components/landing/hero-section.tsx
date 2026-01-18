import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Novo: Fotos estilo Ghibli com IA</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl text-balance">
            Eternize Cada Momento do Seu{" "}
            <span className="text-primary">Amor</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground md:text-xl text-pretty">
            Crie uma pagina personalizada para celebrar o tempo do seu relacionamento. 
            Com contador em tempo real, fotos transformadas em estilo Ghibli e um QR Code 
            exclusivo para surpreender quem voce ama.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/criar">
                <Heart className="h-5 w-5" />
                Criar Minha Pagina
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
              <Link href="/#como-funciona">Ver Como Funciona</Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              <span>+5.000 casais</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              <span>Entrega imediata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
