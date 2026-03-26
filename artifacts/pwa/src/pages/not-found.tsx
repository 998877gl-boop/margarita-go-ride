import { Link } from "wouter";
import { Terminal, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-4">
      <div className="glass p-12 rounded-[3rem] relative overflow-hidden max-w-lg w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <Terminal className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The module you are looking for is offline or doesn't exist.
          </p>
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
