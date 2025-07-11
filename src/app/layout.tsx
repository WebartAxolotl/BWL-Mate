// src/app/layout.tsx

import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "BWL-Mate",
  description: "Dein smarter Lernbegleiter für BWL und Studium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <div className="container">
          <aside className="sidebar">
            <Image
              src="/bwlmate-logo.png"
              alt="BWL-Mate Logo"
              width={48}
              height={48}
            />
            <h1>BWL-Mate</h1>
            <p>Dein smarter Lernbegleiter</p>
            <nav>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/notes">Notizen</Link>
              <Link href="/tasks">Lernplan</Link>
              <Link href="/stats">Statistiken</Link>
            </nav>
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
