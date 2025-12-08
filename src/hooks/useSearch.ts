import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Content } from "./useContent";

export const useSearch = (query: string) => {
    const [results, setResults] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const searchContent = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from("content")
                    .select("*")
                    .ilike("title", `%${query}%`)
                    .order("rating", { ascending: false, nullsFirst: false })
                    .limit(8);

                if (error) throw error;
                setResults(data as Content[]);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounce = setTimeout(searchContent, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return { results, isLoading };
};
