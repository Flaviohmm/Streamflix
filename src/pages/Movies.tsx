import Navbar from "@/components/Navbar";
import ContentRow from "@/components/ContentRow";
import { useContentByType } from "@/hooks/useContent";

const Movies = () => {
    const { data: moviesContent, isLoading } = useContentByType("movie");

    const formatContent = (items: any[] | undefined) => {
        if (!items) return [];
        return items.map(item => ({
            id: item.id,
            title: item.title,
            imageUrl: item.image_url || "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
        }));
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20 px-4">
                <h1 className="text-3xl font-bold text-foreground mb-8 container mx-auto">Filmes</h1>

                {isLoading ? (
                    <div className="container mx-auto text-muted-foreground">Carregando...</div>
                ) : moviesContent && moviesContent.length > 0 ? (
                    <ContentRow title="Todos os Filmes" contents={formatContent(moviesContent)} />
                ) : (
                    <div className="container mx-auto text-muted-foreground">Nenhum filme encontrado.</div>
                )}
            </div>
        </div>
    );
};

export default Movies;
