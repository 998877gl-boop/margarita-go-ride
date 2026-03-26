import React from "react";
import { motion } from "framer-motion";
import { useGetStats } from "@workspace/api-client-react";
import { MessageSquareText, Users, Activity, TrendingUp, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: stats, isLoading, error, refetch } = useGetStats();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center text-destructive">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Failed to load statistics</h2>
          <p className="text-muted-foreground mt-2 max-w-md">There was a problem communicating with the API. Please ensure the backend is running.</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Messages",
      value: stats?.totalMessages ?? 0,
      icon: MessageSquareText,
      color: "from-blue-500 to-cyan-400",
      bg: "bg-blue-500/10",
      textColor: "text-blue-400"
    },
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "from-violet-500 to-purple-500",
      bg: "bg-violet-500/10",
      textColor: "text-violet-400"
    },
    {
      title: "Messages (24h)",
      value: stats?.messagesLast24h ?? 0,
      icon: Activity,
      color: "from-emerald-400 to-green-500",
      bg: "bg-emerald-500/10",
      textColor: "text-emerald-400"
    },
    {
      title: "Active Users (24h)",
      value: stats?.activeUsersLast24h ?? 0,
      icon: TrendingUp,
      color: "from-orange-400 to-red-500",
      bg: "bg-orange-500/10",
      textColor: "text-orange-400"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-muted-foreground">Real-time metrics for your Telegram Bot.</p>
        </div>
        <Button onClick={() => refetch()} variant="glass" disabled={isLoading} className="w-fit">
          <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} variants={item}>
              <div className="glass rounded-3xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-20 rounded-full blur-3xl -mr-10 -mt-10 bg-gradient-to-br ${stat.color} transition-opacity group-hover:opacity-40`} />
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className={cn("p-3 rounded-xl", stat.bg)}>
                    <Icon className={cn("w-6 h-6", stat.textColor)} />
                  </div>
                  <h3 className="font-medium text-muted-foreground">{stat.title}</h3>
                </div>
                
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="h-10 w-24 bg-white/5 rounded animate-pulse" />
                  ) : (
                    <div className="text-4xl font-bold text-white tracking-tight font-mono">
                      {stat.value.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 rounded-3xl overflow-hidden relative min-h-[300px] flex items-center p-8 md:p-12 border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0" />
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Abstract background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0"
        />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-primary-foreground mb-6 backdrop-blur-md">
            System Status: Optimal
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Your bot is performing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">exceptionally well</span>.
          </h2>
          <p className="text-lg text-slate-300">
            Keep monitoring your engagement and stay connected with your audience. The system is actively processing new webhooks.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
