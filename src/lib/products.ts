export type Product = {
  slug: string;
  name: string;
  category: "GTA V" | "FiveM" | "MTA" | "Assistência Técnica";
  price: number;
  badge: string;
  short: string;
  description: string;
  features: string[];
  platforms: string[];
  delivery: string;
  highlight: string;
  image: string;
};

export const categories = [
  {
    name: "GTA V",
    description: "Texturas, reshades e packs visuais para a campanha e online.",
  },
  {
    name: "FiveM",
    description: "Mods gráficos e performance para servidores roleplay.",
  },
  {
    name: "MTA",
    description: "Iluminação, céu e melhorias visuais para servidores clássicos.",
  },
  {
    name: "Assistência Técnica",
    description: "Serviços de manutenção e suporte para seu setup gamer.",
  },
] as const;

export const products: Product[] = [
  {
    slug: "mod-realismo-fivem",
    name: "Mod de Realismo",
    category: "FiveM",
    price: 50,
    badge: "Realismo",
    short: "Iluminação realista, reflexos vivos e atmosfera cinematográfica.",
    description:
      "Pacote de realismo para FiveM com ajustes de luz, clima e reflexos para deixar a cidade mais viva. Ideal para servidores RP e gravações com visual premium.",
    features: [
      "Iluminação realista em dia e noite",
      "Reflexos de chuva com alto impacto visual",
      "Configuração rápida e simples",
      "Suporte via WhatsApp",
    ],
    platforms: ["FiveM"],
    delivery: "Envio do link e suporte via WhatsApp após confirmação de pagamento.",
    highlight: "Visual de cinema para o seu servidor.",
    image: "/products/realismo-fivem.png",
  },
  {
    slug: "mod-favelas",
    name: "Mod de Favelas",
    category: "FiveM",
    price: 100,
    badge: "Urbano",
    short: "Cenários de favela detalhados, vielas e skyline urbano autêntico.",
    description:
      "Mod ambientado em áreas de favela com texturas detalhadas, iluminação quente e elementos urbanos. Perfeito para RP com identidade brasileira e maior imersão.",
    features: [
      "Ambientes urbanos detalhados",
      "Texturas otimizadas",
      "Clima e iluminação ajustados",
      "Suporte via WhatsApp",
    ],
    platforms: ["FiveM"],
    delivery: "Envio do link e suporte via WhatsApp após confirmação de pagamento.",
    highlight: "Imersão brasileira para o seu servidor.",
    image: "/products/mod-favelas.png",
  },
  {
    slug: "camisa-personalizada",
    name: "Camisa Personalizada",
    category: "FiveM",
    price: 80,
    badge: "Loja",
    short: "Camisa personalizada com arte gamer e identidade do servidor.",
    description:
      "Camisa personalizada com arte gamer. Podemos colocar o nome do servidor, nick ou frase. Consulte opções de cores e tamanhos via WhatsApp.",
    features: [
      "Personalização com nome/servidor",
      "Variações de cores e tamanhos",
      "Arte gamer exclusiva",
      "Suporte via WhatsApp",
    ],
    platforms: ["FiveM"],
    delivery: "Envio do link e suporte via WhatsApp após confirmação de pagamento.",
    highlight: "Vista a identidade do seu RP.",
    image: "/products/camisa-personalizada.png",
  },
  {
    slug: "dinheiro-infinito-gtav",
    name: "Dinheiro Infinito GTA V",
    category: "GTA V",
    price: 200,
    badge: "Exclusivo",
    short: "Ganhe dinheiro ilimitado no GTA V com configuração rápida.",
    description:
      "Mod para GTA V com dinheiro infinito. Ideal para quem quer testar carros, casas e upgrades sem limites. Instalação guiada e suporte via WhatsApp.",
    features: [
      "Dinheiro ilimitado",
      "Instalação simples",
      "Funciona no modo história",
      "Suporte via WhatsApp",
    ],
    platforms: ["GTA V (Story)"],
    delivery: "Envio do link e suporte via WhatsApp após confirmação de pagamento.",
    highlight: "Libere tudo sem limites.",
    image: "/products/dinheiro-infinito-gtav.png",
  },
  {
    slug: "limpeza-hardware",
    name: "Limpeza Completa de Hardware",
    category: "Assistência Técnica",
    price: 150,
    badge: "Serviço",
    short: "Limpeza profunda do PC com troca de pasta térmica inclusa.",
    description:
      "Serviço completo de limpeza de hardware: remoção de poeira, verificação de cabos e ajuste básico de airflow. Indicado para melhorar desempenho e reduzir aquecimento. Troca de pasta térmica inclusa.",
    features: [
      "Limpeza interna completa",
      "Organização de cabos",
      "Avaliação de temperatura",
      "Troca de pasta térmica inclusa",
      "Agendamento via WhatsApp",
    ],
    platforms: ["PC Gamer", "Notebook"],
    delivery: "Agendamento via WhatsApp após confirmação de pagamento.",
    highlight: "Seu setup mais frio e silencioso.",
    image: "/products/limpeza-hardware.png",
  },
  {
    slug: "limpeza-sistema",
    name: "Limpeza de Sistema",
    category: "Assistência Técnica",
    price: 30,
    badge: "Serviço",
    short: "Limpeza automatizada para deixar o Windows mais leve.",
    description:
      "Limpeza de sistema com uso de script automático para remover temporários, ajustar inicialização e liberar espaço. Serviço rápido e seguro.",
    features: [
      "Script automático de limpeza",
      "Remoção de arquivos temporários",
      "Ajuste básico de inicialização",
      "Agendamento via WhatsApp",
    ],
    platforms: ["Windows"],
    delivery: "Agendamento via WhatsApp após confirmação de pagamento.",
    highlight: "Seu Windows mais leve e rápido.",
    image: "/products/limpeza-sistema.png",
  },
  {
    slug: "troca-pasta-termica",
    name: "Troca de Pasta Térmica",
    category: "Assistência Técnica",
    price: 20,
    badge: "Serviço",
    short: "Troca de pasta térmica somente do processador.",
    description:
      "Serviço rápido de troca de pasta térmica apenas do processador para reduzir temperatura e melhorar estabilidade.",
    features: [
      "Somente processador",
      "Aplicação correta da pasta térmica",
      "Teste básico de temperatura",
      "Agendamento via WhatsApp",
    ],
    platforms: ["PC Gamer", "Notebook"],
    delivery: "Agendamento via WhatsApp após confirmação de pagamento.",
    highlight: "Temperaturas mais controladas.",
    image: "/products/troca-pasta-termica.png",
  },
  {
    slug: "otimizacao-sistemas",
    name: "Otimização de Sistemas",
    category: "Assistência Técnica",
    price: 120,
    badge: "Serviço",
    short: "Ajustes completos para deixar o PC mais rápido e estável.",
    description:
      "Otimização completa do sistema com ajustes de desempenho, limpeza avançada e configuração de inicialização. Ideal para melhorar FPS e reduzir travamentos.",
    features: [
      "Ajustes de desempenho",
      "Limpeza avançada",
      "Configuração de inicialização",
      "Agendamento via WhatsApp",
    ],
    platforms: ["Windows"],
    delivery: "Agendamento via WhatsApp após confirmação de pagamento.",
    highlight: "Mais desempenho e estabilidade.",
    image: "/products/otimizacao-sistemas.png",
  },
];

export function getProductBySlug(slug?: string) {
  if (!slug) return undefined;
  return products.find((product) => product.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
