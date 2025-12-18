import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-background to-transparent transition-all duration-300">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-blue-800 bg-clip-text text-transparent">STREAMFLIX</Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-foreground hover:text-primary transition-colors">Início</Link>
                        <Link to="/series" className="text-foreground hover:text-primary transition-colors">Séries</Link>
                        <Link to="/movies" className="text-foreground hover:text-primary transition-colors">Filmes</Link>
                        <Link to="/my-list" className="text-foreground hover:text-primary transition-colors">Minha Lista</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <SearchBar />

                    {!loading && (
                        <>
                            {user ? (
                                <>
                                    <Button variant="ghost" size="icon" className="text-foreground hover:text-white">
                                        <Bell className="w-5 h-5" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-foreground hover:text-white">
                                                <User className="w-5 h-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-card border-border">
                                            <DropdownMenuItem className="text-muted-foreground text-sm">
                                                {user.email}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-border" />
                                            <DropdownMenuItem
                                                onClick={handleSignOut}
                                                className="text-foreground cursor-pointer"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Sair
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <Link to="/auth">
                                    <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                        Entrar
                                    </Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
