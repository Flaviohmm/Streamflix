import { useParams, useNavigate } from "react-router-dom";
import { Play, ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useContentDetails } from "@/hooks/useContent";

const ContentDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: content, isLoading } = useContentDetails(id || "");

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <Skeleton className="w-32 h-10 mb-8" />
                    <Skeleton className="w-full h-[60vh] mb-8" />
                    <Skeleton className="w-3/4 h-12 mb-4" />
                    <Skeleton className="w-full h-32" />
                </div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Conteúdo não encontrado</h2>
                    <Button onClick={() => navigate("/")}>Voltar para a página inicial</Button>
                </div>
            </div>
        );
    }

    const backdropUrl = content.backdrop_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop";

    return (
        <div className="min-h-screen bg-background">
            {/* Header com backdrop */}
            <div className="relative h-[70vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />

                <img
                    src={backdropUrl}
                    alt={content.title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />

                <div className="absolute inset-0 z-20 flex items-end">
                    <div className="container mx-auto px-4 pb-12">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/")}
                            className="mb-4 text-foreground hover:text-foreground/80"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Voltar
                        </Button>

                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                                {content.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-foreground/90">
                                {content.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                        <span className="font-semibold">{content.rating.toFixed(1)}</span>
                                    </div>
                                )}
                                {content.release_year && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-5 h-5" />
                                        <span>{content.release_year}</span>
                                    </div>
                                )}
                                {content.duration_minutes && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-5 h-5" />
                                        <span>{content.duration_minutes} min</span>
                                    </div>
                                )}
                                {content.categories && (
                                    <Badge variant="secondary">{content.categories.name}</Badge>
                                )}
                                <Badge variant="outline" className="capitalize">
                                    {content.content_type === "movie" ? "Filme" : "Série"}
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                                    <Play className="w-5 h-5 mr-2" />
                                    Reproduzir
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo detalhado */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl space-y-12">
                    {/* Sinopse */}
                    {content.description && (
                        <section>
                            <h2 className="text-3xl font-bold mb-4 text-foreground">Sinopse</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                {content.description}
                            </p>
                        </section>
                    )}

                    {/* Trailer */}
                    {content.trailer_url && (
                        <section>
                            <h2 className="text-3xl font-bold mb-4 text-foreground">Trailer</h2>
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                                <iframe
                                    src={content.trailer_url}
                                    title={`${content.title} - Trailer`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </section>
                    )}

                    {/* Elenco */}
                    {content.cast && content.cast.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold mb-6 text-foreground">Elenco</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {content.cast.map((member, index) => (
                                    <div key={index} className="space-y-2">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full aspect-[2/3] object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
                                                <span className="text-4xl text-muted-foreground">
                                                    {member.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-foreground">{member.name}</p>
                                            <p className="text-sm text-foreground">{member.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentDetails;