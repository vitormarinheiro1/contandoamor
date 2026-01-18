import { FileEdit, QrCode, Share2, Sparkles } from "lucide-react"

const steps = [
  {
    icon: FileEdit,
    title: "Preencha os Dados",
    description: "Insira o nome do casal, a data de inicio do relacionamento, uma mensagem especial e faca upload das suas fotos favoritas.",
  },
  {
    icon: Sparkles,
    title: "Transformacao Magica",
    description: "Suas fotos serao automaticamente transformadas no encantador estilo Ghibli usando inteligencia artificial.",
  },
  {
    icon: QrCode,
    title: "Receba o QR Code",
    description: "Um QR Code unico sera gerado e enviado para seu e-mail, junto com o link para a pagina personalizada.",
  },
  {
    icon: Share2,
    title: "Surpreenda seu Amor",
    description: "Compartilhe o QR Code ou link com seu parceiro(a) e revele essa surpresa emocionante.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Em apenas 4 passos simples, voce cria uma pagina unica para celebrar seu amor.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-8 w-8" />
              </div>
              <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
