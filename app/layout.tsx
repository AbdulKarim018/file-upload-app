import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/ThemeProvider";
import NextAuthProvider from "@/lib/auth/Provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'File Upload App',
  description: 'Made By AbdulKarim',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <EdgeStoreProvider>
            <NextAuthProvider>
              <div>
                <Navbar />
                <main className="max-w-3xl mx-auto md:p-0 px-4 mt-4">
                  {children}
                </main>
              </div>
            </NextAuthProvider>
          </EdgeStoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
