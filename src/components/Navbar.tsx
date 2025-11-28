import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-background to-transparent transition-all duration-300">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold text-primary">STREAMFLIX</h1>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-foreground hover:text-primary transition-colors">Início</a>
                        <a href="#" className="text-foreground hover:text-primary transition-colors">Séries</a>
                        <a href="#" className="text-foreground hover:text-primary transition-colors">Filmes</a>
                        <a href="#" className="text-foreground hover:text-primary transition-colors">Minha Lista</a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar..."
                            className="border-0 bg-transparent focus-visible:ring-0 w-[200px]"
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                        <User className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;