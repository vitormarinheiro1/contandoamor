import { Clock, Heart, ImageIcon, Music, QrCode, Shield } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Contador em Tempo Real",
    description: "Veja os anos, meses, dias, horas, minutos e segundos que voces estao juntos, atualizando em tempo real.",
  },
  {
    icon: ImageIcon,
    title: "Fotos Estilo Ghibli",
    description: "Transforme suas fotos em obras de arte no estilo dos filmes do Studio Ghibli usando IA.",
  },
  {
    icon: QrCode,
    title: "QR Code Exclusivo",
    description: "Receba um QR Code unico que pode ser impresso, compartilhado ou usado como presente.",
  },
  {
    icon: Music,
    title: "Musica de Fundo",
    description: "Adicione uma musica especial para tocar enquanto seu amor visualiza a pagina.",
  },
  {
    icon: Heart,
    title: "Mensagem Personalizada",
    description: "Escreva uma mensagem especial que sera exibida junto com o contador e fotos.",
  },
  {
    icon: Shield,
    title: "Seguro e Privado",
    description: "Seus dados e fotos sao protegidos com criptografia e nao sao compartilhados.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Recursos Especiais
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tudo que voce precisa para criar uma surpresa inesquecivel.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
