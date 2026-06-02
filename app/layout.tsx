// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/theme-provider";
import LocaleProvider from "@/components/providers/locale-provider";

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
    <html className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-brand-dark text-white flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" enableSystem>
          <LocaleProvider>
            <Navbar />
            
            {/* Envoltem el contingut en un div flexible perquè empenyi el Footer a baix de tot */}
            <div className="flex-grow">
              {children}
            </div>

            {/* El Footer persisteix a tota l'aplicació */}
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}