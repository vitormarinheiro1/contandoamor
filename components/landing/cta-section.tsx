import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Heart className="mx-auto h-12 w-12 text-primary fill-primary/20" />
          <h2 className="mt-6 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Pronto para Eternizar Seu Amor?
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Crie agora mesmo uma pagina personalizada e surpreenda quem voce ama com um presente unico e emocionante.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2 text-base">
            <Link href="/criar">
              <Heart className="h-5 w-5" />
              Comecar Agora
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
