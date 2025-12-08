import { useState, useRef, useEffect } from "react";
import { Search, X, Film, Tv, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { results, isLoading } = useSearch(query);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (contentId: string) => {
        navigate(`/content/${contentId}`);
        setQuery("");
        setIsOpen(false);
    };

    const handleClear = () => {
        setQuery("");
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative hidden md:block">
            <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar filmes e séries..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="border-0 bg-transparent focus-visible:ring-0 w-[200px]"
                />
                {query && (
                    <button onClick={handleClear} className="text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdown de resultados */}
            {isOpen && query.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                    ) : results.length > 0 ? (
                        <ul>
                            {results.map((content) => (
                                <li key={content.id}>
                                    <button
                                        onClick={() => handleSelect(content.id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors text-left"
                                    >
                                        {content.image_url ? (
                                            <img
                                                src={content.image_url}
                                                alt={content.title}
                                                className="w-12 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                                                {content.content_type === "movie" ? (
                                                    <Film className="w-5 h-5 text-muted-foreground" />
                                                ) : (
                                                    <Tv className="w-5 h-5 text-muted-foreground" />
                                                )}
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-foreground font-medium truncate">{content.title}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className={cn(
                                                    "px-1.5 py-0.5 rounded text-xs",
                                                    content.content_type === "movie"
                                                        ? "bg-primary/20 text-primary"
                                                        : "bg-accent text-accent-foreground"
                                                )}>
                                                    {content.content_type === "movie" ? "Filme" : "Série"}
                                                </span>
                                                {content.release_year && <span>{content.release_year}</span>}
                                                {content.rating && (
                                                    <span className="flex items-center gap-1">
                                                        ⭐ {content.rating.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="py-8 text-center text-muted-foreground">
                            <p>Nenhum resultado para "{query}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
