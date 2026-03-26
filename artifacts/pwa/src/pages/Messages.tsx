import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetMessages } from "@workspace/api-client-react";
import { format } from "date-fns";
import { MessageSquare, ArrowLeft, ArrowRight, CornerDownRight, CornerUpLeft, Search } from "lucide-react";
import { cn, generateGradient, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Messages() {
  const [page, setPage] = useState(0);
  const limit = 20;
  
  const { data, isLoading, error } = useGetMessages({
    limit,
    offset: page * limit,
  });

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="glass p-8 rounded-3xl text-center max-w-md">
          <MessageSquare className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Messages</h2>
          <p className="text-muted-foreground">Unable to retrieve chat history from the server.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Feed</h1>
          <p className="text-muted-foreground mt-1">Real-time view of all bot interactions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search not implemented..." 
              disabled
              className="w-full sm:w-64 h-10 bg-secondary/50 border border-white/10 rounded-xl pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 glass rounded-3xl border border-white/10 overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
          {isLoading ? (
             <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={cn("flex w-full", i % 2 === 0 ? "justify-start" : "justify-end")}>
                  <div className="flex items-end gap-2 max-w-[80%]">
                    {i % 2 === 0 && <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse shrink-0" />}
                    <div className="h-20 w-64 bg-white/5 rounded-2xl animate-pulse" />
                  </div>
                </div>
              ))}
             </div>
          ) : data?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
              <p>No messages found.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {data?.messages.map((msg, idx) => {
                const isIncoming = msg.direction === 'incoming';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "flex w-full",
                      isIncoming ? "justify-start" : "justify-end"
                    )}
                  >
                    <div className={cn(
                      "flex items-end gap-3 max-w-[85%] md:max-w-[70%]",
                      isIncoming ? "flex-row" : "flex-row-reverse"
                    )}>
                      {isIncoming && (
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg"
                          style={{ background: generateGradient(msg.user.firstName) }}
                        >
                          {getInitials(msg.user.firstName)}
                        </div>
                      )}

                      <div className={cn(
                        "flex flex-col",
                        isIncoming ? "items-start" : "items-end"
                      )}>
                        {isIncoming && (
                          <span className="text-xs text-muted-foreground mb-1 ml-1 font-medium">
                            {msg.user.firstName} {msg.user.lastName || ''}
                          </span>
                        )}
                        
                        <div className={cn(
                          "px-5 py-3.5 shadow-xl relative group",
                          isIncoming 
                            ? "bg-secondary text-white rounded-2xl rounded-bl-sm" 
                            : "bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl rounded-br-sm"
                        )}>
                          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                            {msg.text || <span className="italic opacity-50">Unsupported message type</span>}
                          </p>
                          
                          <div className={cn(
                            "flex items-center gap-1.5 mt-2 text-[10px]",
                            isIncoming ? "text-slate-400" : "text-blue-100 justify-end"
                          )}>
                            {isIncoming ? <CornerDownRight className="w-3 h-3" /> : <CornerUpLeft className="w-3 h-3" />}
                            <span>{format(new Date(msg.createdAt), "MMM d, h:mm a")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-white/5 bg-background/50 backdrop-blur-xl flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-mono">
            Showing page {page + 1} of {totalPages || 1}
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0 || isLoading}
              className="font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Prev
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages - 1 || isLoading}
              className="font-mono"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
