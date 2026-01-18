import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">Contando Amor</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Eternize os momentos mais especiais do seu relacionamento com uma pagina personalizada.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Como Funciona
              </Link>
              <Link href="/#planos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Planos
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Suporte</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Perguntas Frequentes
              </Link>
              <a href="mailto:contato@contandoamor.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                contato@contandoamor.com
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Politica de Privacidade
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Contando Amor. Todos os direitos reservados. Feito com{" "}
            <Heart className="inline h-3 w-3 text-primary fill-primary" /> para casais apaixonados.
          </p>
        </div>
      </div>
    </footer>
  )
}
