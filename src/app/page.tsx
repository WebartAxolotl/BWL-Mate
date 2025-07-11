"use client";

import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Willkommen bei BWL-Mate 🎓</h1>
            <p className="mb-4">Deine persönliche Lern- und Organisationsplattform</p>
            <div className="flex space-x-4">
                <Link href="/login" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </Link>
                <Link href="/signup" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Registrieren
                </Link>
            </div>
        </main>
    );
}
