import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContentRow from "@/components/ContentRow";
import { trendingContent, actionContent, dramaContent, comedyContent } from "@/data/mockData";

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <HeroSection />

            <div className="relative z-10 -mt-32 space-y-8 pb-20">
                <ContentRow title="Em Alta" contents={trendingContent} />
                <ContentRow title="Ação" contents={actionContent} />
                <ContentRow title="Drama" contents={dramaContent} />
                <ContentRow title="Comédia" contents={comedyContent} />
            </div>
        </div>
    );
};

export default Index;
