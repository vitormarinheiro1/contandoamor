import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Heart } from "lucide-react"

const plans = [
  {
    name: "Basico",
    price: "R$ 19",
    description: "Perfeito para uma surpresa especial",
    icon: Heart,
    features: [
      "1 ano de acesso",
      "1 foto personalizada",
      "Contador de tempo em tempo real",
      "QR Code exclusivo",
      "Mensagem personalizada",
    ],
    notIncluded: [
      "Musica de fundo",
      "Estilo Ghibli com IA",
      "3 fotos",
    ],
    popular: false,
    href: "/criar?plano=basico",
  },
  {
    name: "Premium",
    price: "R$ 39",
    originalPrice: "R$ 49",
    description: "A experiencia completa para eternizar seu amor",
    icon: Crown,
    features: [
      "Acesso para sempre",
      "3 fotos personalizadas",
      "Contador de tempo em tempo real",
      "QR Code exclusivo",
      "Mensagem personalizada",
      "Musica de fundo",
      "Fotos estilo Ghibli com IA",
      "Suporte prioritario",
    ],
    notIncluded: [],
    popular: true,
    href: "/criar?plano=premium",
  },
]

export function PricingSection() {
  return (
    <section id="planos" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Escolha Seu Plano
          </h2>
          <p className="mt-4 text-muted-foreground">
            Selecione o plano ideal para celebrar seu relacionamento de forma unica.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Mais Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <plan.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">pagamento unico</p>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 opacity-50">
                      <Check className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground line-through">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={plan.href}>Escolher {plan.name}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Pagamento seguro via cartao de credito, PIX ou boleto. Parcelamento disponivel.
        </p>
      </div>
    </section>
  )
}
