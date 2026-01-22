import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "FAQ - Contando Amor",
  description: "Perguntas frequentes sobre o Contando Amor. Tire suas duvidas sobre como criar sua pagina personalizada.",
}

const faqs = [
  {
    question: "Como funciona o Contando Amor?",
    answer: "O Contando Amor permite que voce crie uma pagina personalizada para celebrar seu relacionamento. Voce preenche os dados do casal, faz upload de fotos, escreve uma mensagem especial e recebe um QR Code unico que pode ser compartilhado com seu parceiro(a).",
  },
  {
    question: "Quanto tempo leva para receber minha pagina?",
    answer: "A entrega e imediata! Assim que voce finalizar o pagamento, sua pagina sera criada automaticamente e voce recebera o link e o QR Code por e-mail em poucos minutos.",
  },
  {
    question: "Qual a diferenca entre o plano Basico e Premium?",
    answer: "O plano Basico (R$19) oferece 1 ano de acesso, 1 foto e o contador de tempo. O plano Premium (R$39) inclui acesso vitalicio, 3 fotos, musica de fundo e transformacao das fotos no estilo Ghibli usando inteligencia artificial.",
  },
  {
    question: "Posso editar minha pagina depois de criada?",
    answer: "Sim! Voce pode alterar as fotos, a mensagem e outros detalhes da sua pagina a qualquer momento. Basta acessar o link de edicao que enviamos por e-mail.",
  },
  {
    question: "O que e a transformacao estilo Ghibli?",
    answer: "E uma funcionalidade exclusiva do plano Premium que usa inteligencia artificial para transformar suas fotos no estilo artistico dos filmes do Studio Ghibli, criando imagens unicas e encantadoras.",
  },
  {
    question: "Quais formas de pagamento sao aceitas?",
    answer: "Aceitamos cartao de credito (com opcao de parcelamento), PIX e boleto bancario. Todos os pagamentos sao processados de forma segura.",
  },
  {
    question: "Por quanto tempo minha pagina fica disponivel?",
    answer: "No plano Basico, sua pagina fica disponivel por 1 ano. No plano Premium, o acesso e vitalicio - sua pagina nunca expira!",
  },
  {
    question: "Posso adicionar musica a minha pagina?",
    answer: "Sim, no plano Premium voce pode adicionar uma musica de fundo usando um link do YouTube ou Spotify. A musica tocara automaticamente quando a pagina for aberta.",
  },
  {
    question: "O QR Code pode ser impresso?",
    answer: "Sim! O QR Code pode ser baixado em alta qualidade e impresso para uso em presentes, quadros, convites ou qualquer outra ideia criativa.",
  },
  {
    question: "Meus dados estao seguros?",
    answer: "Sim! Utilizamos criptografia SSL em todas as paginas e seus dados pessoais e fotos sao armazenados de forma segura. Nao compartilhamos suas informacoes com terceiros.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="text-center">
              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Perguntas Frequentes
              </h1>
              <p className="mt-4 text-muted-foreground">
                Encontre respostas para as duvidas mais comuns sobre o Contando Amor.
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="mt-12">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-lg border border-border/50 bg-card px-6"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Section */}
            <Card className="mt-16">
              <CardHeader className="text-center">
                <CardTitle className="font-serif">Ainda tem duvidas?</CardTitle>
                <CardDescription>
                  Nossa equipe esta pronta para ajudar voce.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <a
                    href="mailto:contandoamoroficial@gmail.com"
                    className="flex items-center gap-4 rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">E-mail</h3>
                      <p className="text-sm text-muted-foreground">contandoamoroficial@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/5511973179659"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">Atendimento rapido</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Heart className="mx-auto h-10 w-10 text-primary fill-primary/20" />
              <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">
                Pronto para comecar?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Crie sua pagina personalizada agora mesmo.
              </p>
              <Button asChild size="lg" className="mt-6 gap-2">
                <Link href="/criar">
                  <Heart className="h-5 w-5" />
                  Criar Minha Pagina
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
