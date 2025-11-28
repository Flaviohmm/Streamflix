import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ContentCard from "./ContentCard";
import { Button } from "@/components/ui/button";

interface Content {
    id: number;
    title: string;
    imageUrl: string;
}

interface ContentRowProps {
    title: string;
    contents: Content[];
}

const ContentRow = ({ title, contents }: ContentRowProps) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scroll = (direction: "left" | "right") => {
        const container = document.getElementById(`row-${title}`);
        if (!container) return;

        const scrollAmount = container.offsetWidth * 0.8;
        const newPosition = direction === "left"
            ? scrollPosition - scrollAmount
            : scrollPosition + scrollAmount;

        container.scrollTo({
            left: newPosition,
            behavior: "smooth",
        });
        setScrollPosition(newPosition);
    };

    return (
        <div className="group relative mb-8">
            <h2 className="text-2xl font-bold mb-4 px-4 text-foreground">{title}</h2>

            <div className="relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>

                <div
                    id={`row-${title}`}
                    className="flex gap-2 overflow-x-hidden px-4 scroll-smooth"
                >
                    {contents.map((content) => (
                        <div key={content.id} className="min-w-[200px] md:min-w-[250px]">
                            <ContentCard title={content.title} imageUrl={content.imageUrl} />
                        </div>
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => scroll("right")}
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>
        </div>
    );
};

export default ContentRow;
