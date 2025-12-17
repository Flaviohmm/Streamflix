import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeaturedContent } from "@/hooks/useContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VideoPlayer from "@/components/VideoPlayer";

const HeroSection = () => {
    const navigate = useNavigate();
    const { data: featuredContent, isLoading } = useFeaturedContent();
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="relative h-[80vh] w-full">
                <Skeleton className="w-full h-full" />
            </div>
        );
    }

    if (!featuredContent) {
        return null;
    }

    const backdropUrl = featuredContent.backdrop_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop";

    const handleWatch = () => {
        if (featuredContent.video_url) {
            setIsPlayerOpen(true);
        } else {
            navigate(`/content/${featuredContent.id}`);
        }
    };

    const handleMoreInfo = () => {
        navigate(`/content/${featuredContent.id}`);
    };

    return (
        <>
            <div className="relative h-[80vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

                <img
                    src={backdropUrl}
                    alt={featuredContent.title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    style={{
                        imageRendering: 'crisp-edges',
                        backfaceVisibility: 'hidden',
                    }}
                />

                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                                {featuredContent.title}
                            </h1>
                            {featuredContent.description && (
                                <p className="text-lg md:text-xl text-foreground/90 line-clamp-3">
                                    {featuredContent.description}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button 
                                    size="lg" 
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                                    onClick={handleWatch}
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Assistir
                                </Button>
                                <Button 
                                    size="lg" 
                                    variant="secondary" 
                                    className="bg-secondary hover:bg-secondary/80"
                                    onClick={handleMoreInfo}
                                >
                                    <Info className="w-5 h-5 mr-2" />
                                    Mais informações
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
                <DialogContent className="max-w-5xl w-full p-0 bg-black border-none">
                    <VideoPlayer
                        src={featuredContent.video_url || ""}
                        title={featuredContent.title}
                        className="w-full aspect-video"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default HeroSection;
