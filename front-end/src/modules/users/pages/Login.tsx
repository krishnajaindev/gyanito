import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// We can define our theme colors here for reusability
const theme = {
  card: "bg-purple-900/40 border-purple-600/50 backdrop-blur-sm",
  title: "text-fuchsia-400 font-bold tracking-wider",
  description: "text-indigo-300",
  label: "text-indigo-200 font-semibold",
  input: "bg-purple-900/50 border-purple-700 text-gray-50 placeholder:text-purple-400/60 focus:ring-fuchsia-500 focus:border-fuchsia-500",
  button: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold tracking-wide hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-fuchsia-800/20",
};

const Login = () => {
    return (
        <div className="mt-[80px]">
        <Card className={`w-full max-w-md mx-auto ${theme.card} shadow-2xl shadow-purple-900/50`}>
            <CardHeader className="text-center">
                <CardTitle className={`text-3xl ${theme.title}`}>
                    LOGIN ZONE
                </CardTitle>
                <CardDescription className={theme.description}>
                    Enter the Quiz Universe
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="email" className={theme.label}>Email</Label>
                        <Input 
                            type="email" 
                            id="email" 
                            placeholder="your-email@quiz.com" 
                            className={theme.input}
                        />
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="password" className={theme.label}>Password</Label>
                        <Input 
                            type="password" 
                            id="password" 
                            placeholder="••••••••••" 
                            className={theme.input}
                        />
                    </div>
                    <div className="pt-4">
                        <Button className={`w-full ${theme.button}`}>
                            Let's Go!
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        </div>
    );
}

export default Login;
