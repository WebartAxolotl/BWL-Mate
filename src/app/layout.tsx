// src/app/layout.tsx

import "@/app/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import DarkModeToggle from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BWL-Mate",
  description: "Dein smarter Lernbegleiter für BWL und Studium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sidebar />
          <main className="flex-1 flex flex-col p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Image src="/bwlmate-logo.png" alt="BWL-Mate Logo" width={48} height={48} />
        <div>
          <h1 className="text-xl font-bold text-primary">BWL-Mate</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Dein smarter Lernbegleiter</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800">Dashboard</Link>
        <Link href="/notes" className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800">Notizen</Link>
        <Link href="/tasks" className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800">Lernplan</Link>
        <Link href="/stats" className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800">Statistiken</Link>
      </nav>

      <div className="mt-auto pt-4">
        <DarkModeToggle />
      </div>
    </aside>
  );
}
