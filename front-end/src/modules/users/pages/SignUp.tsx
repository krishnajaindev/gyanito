import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from 'react';

// The theme object for styling
const theme = {
  card: "bg-purple-900/40 border-purple-600/50 backdrop-blur-sm",
  title: "text-fuchsia-400 font-bold tracking-wider",
  description: "text-indigo-300",
  label: "text-indigo-200 font-semibold",
  input: "bg-purple-900/50 border-purple-700 text-gray-50 placeholder:text-purple-400/60 focus:ring-fuchsia-500 focus:border-fuchsia-500",
  button: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold tracking-wide hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-fuchsia-800/20",
  errorText: "text-red-400 text-sm", // Custom class for error messages
};


// The component now uses internal state instead of react-hook-form
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // You can add state for errors and status messages here if needed
    // const [error, setError] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle your form submission logic here
        console.log("Submitting with:", { name, email, password });
        // Example: myApi.register({ name, email, password });
    };

    return (
        <div className="mt-[80px]">
        <Card className={`w-full max-w-md mx-auto ${theme.card} shadow-2xl shadow-purple-900/50`}>
            <CardHeader className="text-center">
                <CardTitle className={`text-3xl ${theme.title}`}>
                    REGISTER HERE
                </CardTitle>
                <CardDescription className={theme.description}>
                    Join the Music App Universe
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* You can add a status/alert component here */}

                <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="name" className={theme.label}>Name</Label>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            id="name" 
                            placeholder="Your Name" 
                            className={theme.input} 
                        />
                        {/* Add error display logic here if needed */}
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="email" className={theme.label}>Email</Label>
                        <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email" 
                            placeholder="your-email@quiz.com" 
                            className={theme.input} 
                        />
                         {/* Add error display logic here if needed */}
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="password" className={theme.label}>Password</Label>
                        <Input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            placeholder="••••••••••" 
                            className={theme.input} 
                        />
                         {/* Add error display logic here if needed */}
                    </div>
                    
                    <div className="pt-4">
                        <Button type="submit" className={`w-full ${theme.button}`}>
                            Create Account
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        </div>
    );
}

export default Signup;
