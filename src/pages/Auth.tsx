import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "A senha deve ter pelo menos 6 caracteres");

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                navigate("/");
            }
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                navigate("/");
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

        const emailResult = emailSchema.safeParse(email);
        if (!emailResult.success) {
            newErrors.email = emailResult.error.errors[0].message;
        }

        const passwordResult = passwordSchema.safeParse(password);
        if (!passwordResult.success) {
            newErrors.password = passwordResult.error.errors[0].message;
        }

        if (!isLogin && password !== confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    if (error.message === "Invalid login credentials") {
                        toast({
                            title: "Erro ao entrar",
                            description: "Email ou senha incorretos.",
                            variant: "destructive",
                        });
                    } else {
                        toast({
                            title: "Erro ao entrar",
                            description: error.message,
                            variant: "destructive",
                        });
                    }
                } else {
                    toast({
                        title: "Bem-vindo!",
                        description: "Login realizado com sucesso.",
                    });
                }
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/`,
                    },
                });

                if (error) {
                    if (error.message.includes("already registered")) {
                        toast({
                            title: "Erro ao cadastrar",
                            description: "Este email já está cadastrado. Tente fazer login.",
                            variant: "destructive",
                        });
                    } else {
                        toast({
                            title: "Erro ao cadastrar",
                            description: error.message,
                            variant: "destructive",
                        });
                    }
                } else {
                    toast({
                        title: "Cadastro realizado!",
                        description: "Verifique seu email para confirmar sua conta.",
                    });
                }
            }
        } catch (error: any) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro inesperado. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />

            {/* Back button */}
            <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 text-foreground hover:text-primary z-10"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
            </Button>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-2">STREAMFLIX</h1>
                    <p className="text-muted-foreground">
                        {isLogin ? "Entre na sua conta" : "Crie sua conta"}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-card border border-border rounded-xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-foreground">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-11 pr-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirme sua senha"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : isLogin ? (
                                "Entrar"
                            ) : (
                                "Criar Conta"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground">
                            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                            <button
                                onClick={toggleMode}
                                className="text-primary hover:underline font-medium"
                            >
                                {isLogin ? "Cadastre-se" : "Entrar"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-muted-foreground text-sm mt-6">
                    Ao continuar, você concorda com os Termos de Serviço e a Política de Privacidade.
                </p>
            </div>
        </div>
    );
};

export default Auth;
