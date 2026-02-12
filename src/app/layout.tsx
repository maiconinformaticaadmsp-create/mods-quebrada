import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
});

const text = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-text",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Mods da Quebrada | Mods Gráficos para GTA V, FiveM e MTA",
  description:
    "Loja de mods gráficos premium com entrega via WhatsApp após pagamento via PIX.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${display.variable} ${text.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
