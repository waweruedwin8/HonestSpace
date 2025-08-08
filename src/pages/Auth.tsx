import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Phone, User, Building, Chrome } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type UserType = "tenant" | "landlord";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  const navigate = useNavigate();
  const { isAuthenticated, login, register, googleLogin } = useAuth();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
      if (!formData.firstName || !formData.lastName) {
        setError("First and last name are required");
        return false;
      }
    }
    return true;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { error } = await login(formData.email, formData.password, userType);
        
        if (error) {
          setError(error);
          return;
        }
        
        toast.success("Welcome back!", {
          description: "You have successfully signed in.",
        });
        navigate("/");
      } else {
        const { error } = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          userType: userType
        });
        
        if (error) {
          setError(error);
          return;
        }
        
        toast.success("Account created!", {
          description: "Welcome to HonestSpace!",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setError(error.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      // For now, Google OAuth will be handled by the Django backend
      // This is a placeholder - actual implementation will depend on Google OAuth flow
      toast.info("Google login will be available once backend is connected");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="pt-16 pb-8">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? "Welcome Back" : "Join HonestSpace"}
              </CardTitle>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Sign in to your account to continue" 
                  : "Create your account and start finding verified homes"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* User Type Selection (Only for signup) */}
              {!isLogin && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">I am a:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={userType === "tenant" ? "default" : "outline"}
                      onClick={() => setUserType("tenant")}
                      className="h-16 flex flex-col gap-1"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm">Tenant</span>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === "landlord" ? "default" : "outline"}
                      onClick={() => setUserType("landlord")}
                      className="h-16 flex flex-col gap-1"
                    >
                      <Building className="w-5 h-5" />
                      <span className="text-sm">Landlord</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Badge variant="secondary" className="text-xs">
                      {userType === "tenant" 
                        ? "Search, review, and bookmark properties" 
                        : "List properties and manage listings"}
                    </Badge>
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {/* Name fields (signup only) */}
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        required={!isLogin}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone (signup only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+254 700 000 000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password (signup only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                {/* Remember Me (login only) */}
                {isLogin && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleAuth}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({
                      email: "",
                      phone: "",
                      password: "",
                      confirmPassword: "",
                      firstName: "",
                      lastName: ""
                    });
                  }}
                  className="text-sm"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"}
                </Button>
              </div>

              {isLogin && (
                <div className="text-center">
                  <Button variant="link" className="text-sm text-muted-foreground">
                    Forgot your password?
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;