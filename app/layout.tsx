import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portes Pere Aguilar | Enginyeria en cada tancament",
  description: "Estructures metàl·liques, serralleria i portes d'alta tecnologia. Artesania i precisió per al teu espai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-brand-dark text-white flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
