import { useState } from "react";

interface ContentCardProps {
    title: string;
    imageUrl: string;
}

const ContentCard = ({ title, imageUrl }: ContentCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group cursor-pointer transition-all duration-300 ease-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`
                relative overflow-hidden rounded-md
                transition-all duration-300 ease-out
                ${isHovered ? 'scale-110 z-10 shadow-2xl' : 'scale-100'}
            `}>
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-[180px] object-cover"
                />
                <div className={`
                    absolute inset-0 bg-gradient-to-t from-overlay/90 to-transparent
                    transition-opacity duration-300
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                `}>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-foreground font-semibold text-sm line-clamp-2">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;
