"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-serif text-xl font-semibold text-foreground">Contando Amor</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </Link>
          <Link href="/#planos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Planos
          </Link>
          <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Button asChild>
            <Link href="/criar">Criar Pagina</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container mx-auto flex flex-col gap-4 p-4">
            <Link
              href="/#como-funciona"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="/#planos"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
            <Link
              href="/faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Button asChild className="w-full">
              <Link href="/criar">Criar Pagina</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
