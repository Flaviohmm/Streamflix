import Navbar from "@/components/Navbar";
import ContentRow from "@/components/ContentRow";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MyList = () => {
    const { user, loading } = useAuth();

    // Por enquanto, lista vazia - será implementado com favoritos do Supabase
    const myListContent: any[] = [];

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
                <h1 className="text-3xl font-bold text-foreground mb-8 container mx-auto">Minha Lista</h1>

                {loading ? (
                    <div className="container mx-auto text-muted-foreground">Carregando...</div>
                ) : !user ? (
                    <div className="container mx-auto text-center py-16">
                        <p className="text-muted-foreground mb-4">Você precisa estar logado para ver sua lista.</p>
                        <Link to="/auth">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Entrar
                            </Button>
                        </Link>
                    </div>
                ) : myListContent.length > 0 ? (
                    <ContentRow title="Meus Favoritos" contents={formatContent(myListContent)} />
                ) : (
                    <div className="container mx-auto text-center py-16">
                        <p className="text-muted-foreground">Sua lista está vazia.</p>
                        <p className="text-muted-foreground text-sm mt-2">
                            Adicione filmes e séries aos favoritos para vê-los aqui.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyList;
