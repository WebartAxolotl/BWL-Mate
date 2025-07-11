"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                router.push("/login");
            } else {
                setUserEmail(data.user.email ?? null);
            }
        };

        getUser();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            {userEmail ? (
                <>
                    <p className="mb-4">Willkommen, {userEmail}!</p>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p>Lade Benutzerinformationen...</p>
            )}
        </main>
    );
}
