import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContentRow from "@/components/ContentRow";

import { useTrendingContent, useContentByCategory } from "@/hooks/useContent";

const Index = () => {
    const { data: trendingData } = useTrendingContent();
    const { data: actionData } = useContentByCategory("acao");
    const { data: dramaData } = useContentByCategory("drama");
    const { data: comedyData } = useContentByCategory("comedia");

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
            <HeroSection />

            <div className="relative z-10 -mt-32 space-y-8 pb-20">
                <ContentRow title="Em Alta" contents={formatContent(trendingData)} />
                <ContentRow title="Ação" contents={formatContent(actionData)} />
                <ContentRow title="Drama" contents={formatContent(dramaData)} />
                <ContentRow title="Comédia" contents={formatContent(comedyData)} />
            </div>
        </div>
    );
};

export default Index;
