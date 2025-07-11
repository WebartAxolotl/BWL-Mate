"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import NoteDrawer from "@/components/NoteDrawer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Note {
    id: string;
    title: string;
    content: string;
    created_at: string;
    tags: string[];
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const tagColors: { [key: string]: string } = {
        BWL: "bg-blue-100 text-blue-800",
        Marketing: "bg-green-100 text-green-800",
        Prüfung: "bg-red-100 text-red-800",
        Recht: "bg-yellow-100 text-yellow-800",
        Finanzen: "bg-purple-100 text-purple-800",
        default: "bg-gray-200 text-gray-800",
    };

    const fetchNotes = async () => {
        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) console.error(error);
        else setNotes(data || []);
    };

    const handleDeleteNote = async (id: string) => {
        const { error } = await supabase.from("notes").delete().eq("id", id);
        if (error) console.error(error);
        else fetchNotes();
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Meine Notizen</h1>

            <input
                type="text"
                placeholder="Notizen durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 rounded w-full max-w-2xl mb-4 dark:bg-gray-800 dark:border-gray-700"
            />

            <button
                onClick={() => {
                    setSelectedNote(null);
                    setIsDrawerOpen(true);
                }}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
            >
                + Neue Notiz
            </button>

            <div className="w-full max-w-2xl">
                {notes.length === 0 && <p>Keine Notizen vorhanden.</p>}
                {notes
                    .filter(
                        (note) =>
                            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            note.content.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((note) => (
                        <div
                            key={note.id}
                            className="border rounded p-4 mb-4 flex flex-col gap-2 bg-white dark:bg-gray-800"
                        >
                            <div className="prose dark:prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {`# ${note.title}`}
                                </ReactMarkdown>
                            </div>

                            <div className="prose dark:prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {note.content}
                                </ReactMarkdown>
                            </div>

                            {note.tags && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(Array.isArray(note.tags) ? note.tags : JSON.parse(note.tags)).map(
                                        (tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className={`${tagColors[tag] || tagColors.default} text-xs px-2 py-1 rounded-full`}
                                            >
                                                {tag}
                                            </span>
                                        )
                                    )}
                                </div>
                            )}

                            <p className="text-xs text-gray-500">
                                {new Date(note.created_at).toLocaleString()}
                            </p>

                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => {
                                        setSelectedNote(note);
                                        setIsDrawerOpen(true);
                                    }}
                                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                                >
                                    Bearbeiten
                                </button>
                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                >
                                    Löschen
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

<NoteDrawer
    isOpen={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    initialTitle={selectedNote?.title || ""}
    initialContent={selectedNote?.content || ""}
    initialTags={selectedNote?.tags || []}
    onSave={async (title, content, tags) => {
        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (!user || userError) {
            console.error("Benutzer nicht gefunden oder Fehler:", userError);
            router.push("/login");
            return;
        }

        console.log("Speichern gestartet:", { title, content, tags, selectedNote });

        if (selectedNote) {
            const { data, error } = await supabase
                .from("notes")
                .update({
                    title,
                    content,
                    tags: Array.isArray(tags) ? tags : [tags],
                })
                .eq("id", selectedNote.id)
                .select();

            console.log("Update Ergebnis:", { data, error });
            if (error) console.error("Update Fehler:", error);
        } else {
            const { data, error } = await supabase
                .from("notes")
                .insert([{ user_id: user.id, title, content, tags }])
                .select();

            console.log("Insert Ergebnis:", { data, error });
            if (error) console.error("Insert Fehler:", error);
        }

        await fetchNotes();
        setLoading(false);
        setIsDrawerOpen(false);
    }}
/>

        </main>
    );
}
