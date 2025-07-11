"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamischer Import für SSR-Sicherheit
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface NoteDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, content: string, tags: string[]) => void;
    initialTitle?: string;
    initialContent?: string;
    initialTags?: string[];
}

export default function NoteDrawer({
    isOpen,
    onClose,
    onSave,
    initialTitle = "",
    initialContent = "",
    initialTags = [],
}: NoteDrawerProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [tagsInput, setTagsInput] = useState(initialTags.join(", "));

    useEffect(() => {
        if (isOpen) {
            setTitle(initialTitle);
            setContent(initialContent);
            setTagsInput(initialTags.join(", "));
        }
    }, [isOpen, initialTitle, initialContent, initialTags]);

    const handleSave = () => {
        const tags = tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        onSave(title, content, tags);

        // Felder leeren nach Speichern
        setTitle("");
        setContent("");
        setTagsInput("");

        onClose();
    };

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? "0%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[600px] lg:w-[700px] bg-white dark:bg-gray-900 shadow-lg p-6 z-50 flex flex-col"
        >
            <h2 className="text-2xl font-bold mb-4">
                {initialTitle ? "Notiz bearbeiten" : "Neue Notiz"}
            </h2>

            <input
                type="text"
                placeholder="Titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 mb-2 rounded w-full dark:bg-gray-800 dark:border-gray-700"
            />

            <div data-color-mode="dark" className="mb-2 rounded overflow-hidden">
                <MDEditor
                    value={content}
                    onChange={(val) => setContent(val || "")}
                    height={300}
                />
            </div>

            <input
                type="text"
                placeholder="Tags (durch Kommas trennen)"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="border p-2 mb-4 rounded w-full dark:bg-gray-800 dark:border-gray-700"
            />

            <div className="flex gap-2 mt-auto">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
                >
                    Speichern
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 w-full"
                >
                    Abbrechen
                </button>
            </div>
        </motion.div>
    );
}
