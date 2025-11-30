import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
    id: string;
    name: string;
    slug: string;
    created_at: string;
}

export interface Content {
    id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    backdrop_url: string | null;
    video_url: string | null;
    trailer_url: string | null;
    content_type: "movie" | "series";
    release_year: number | null;
    duration_minutes: number | null;
    rating: number | null;
    category_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface ContentWithCategory extends Content {
    categories?: Category;
}

export const useContentByCategory = (categorySlug: string) => {
    return useQuery({
        queryKey: ["content", "category", categorySlug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("content")
                .select(`
                    *,
                    categories:category_id (
                        id,
                        name,
                        slug
                    )
                `)
                .eq("categories.slug", categorySlug)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as ContentWithCategory[];
        },
    });
};

export const useTrendingContent = () => {
    return useQuery({
        queryKey: ["content", "trending"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("content")
                .select("*")
                .order("rating", { ascending: false, nullsFirst: false })
                .limit(6);

            if (error) throw error;
            return data as Content[];
        },
    });
};

export const useAllContent = () => {
    return useQuery({
        queryKey: ["content", "all"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("content")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as Content[];
        },
    });
};

export const useFeaturedContent = () => {
    return useQuery({
        queryKey: ["content", "featured"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("content")
                .select("*")
                .order("rating", { ascending: false, nullsFirst: false })
                .limit(1)
                .single();

            if (error) throw error;
            return data as Content;
        },
    });
};
