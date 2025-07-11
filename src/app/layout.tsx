// src/app/layout.tsx

import "@/app/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BWL-Mate",
  description: "Dein smarter Lernbegleiter für BWL und Studium",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{
        fontFamily: inter.style.fontFamily,
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#171717"
      }}>
        <Sidebar />
        <main style={{
          flex: 1,
          padding: "1rem",
          backgroundColor: "#ffffff",
          color: "#171717",
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}

function Sidebar() {
  return (
    <aside style={{
      width: "250px",
      backgroundColor: "#f0f0f0",
      borderRight: "1px solid #ccc",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Image src="/bwlmate-logo.png" alt="BWL-Mate Logo" width={48} height={48} />
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#3B82F6" }}>BWL-Mate</h1>
            <p style={{ fontSize: "0.75rem", color: "#555" }}>Dein smarter Lernbegleiter</p>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/notes">Notizen</Link>
          <Link href="/tasks">Lernplan</Link>
          <Link href="/stats">Statistiken</Link>
        </nav>
      </div>

      <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
        {/* DarkModeToggle entfernt, kann später wieder eingebaut werden */}
        <p style={{ fontSize: "0.75rem", color: "#888" }}>Dark Mode kommt später</p>
      </div>
    </aside>
  );
}
