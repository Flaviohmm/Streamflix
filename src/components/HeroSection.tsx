import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeaturedContent } from "@/hooks/useContent";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
    const { data: featuredContent, isLoading } = useFeaturedContent();

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

    const imageUrl = featuredContent.image_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop";
    return (
        <div className="relative h-[80vh] w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

            <img
                src={imageUrl}
                alt={featuredContent.title}
                className="w-full h-full object-cover"
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
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                                <Play className="w-5 h-5 mr-2" />
                                Assistir
                            </Button>
                            <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/80">
                                <Info className="w-5 h-5 mr-2" />
                                Mais informações
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
