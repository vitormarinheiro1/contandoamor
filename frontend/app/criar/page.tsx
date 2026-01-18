import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CoupleForm } from "@/components/criar/couple-form"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Criar Pagina - Contando Amor",
  description: "Crie uma pagina personalizada para celebrar seu relacionamento.",
}

function FormSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[400px] w-full rounded-xl" />
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>
  )
}

export default function CriarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Crie Sua Pagina
              </h1>
              <p className="mt-2 text-muted-foreground">
                Preencha os dados abaixo para criar uma pagina unica para voces dois.
              </p>
            </div>

            <Suspense fallback={<FormSkeleton />}>
              <CoupleForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
