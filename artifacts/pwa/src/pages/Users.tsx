import React from "react";
import { motion } from "framer-motion";
import { useGetUsers } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Users as UsersIcon, Calendar, AtSign, Fingerprint } from "lucide-react";
import { generateGradient, getInitials } from "@/lib/utils";

export default function Users() {
  const { data: users, isLoading, error } = useGetUsers();

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="glass p-8 rounded-3xl text-center max-w-md">
          <UsersIcon className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Users</h2>
          <p className="text-muted-foreground">Unable to fetch audience data.</p>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Audience</h1>
        <p className="text-muted-foreground mt-1">Manage and view all users interacting with your bot.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-40 glass rounded-3xl animate-pulse p-6" />
          ))}
        </div>
      ) : users?.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
          <UsersIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-white">No users yet</h3>
          <p className="text-muted-foreground">When people message your bot, they will appear here.</p>
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {users?.map((user) => (
            <motion.div key={user.id} variants={item}>
              <div className="glass rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                {/* Decorative BG for Card */}
                <div 
                  className="absolute top-0 left-0 w-full h-16 opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ background: generateGradient(user.firstName) }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card z-0" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5 mt-2">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-lg ring-4 ring-background"
                      style={{ background: generateGradient(user.firstName) }}
                    >
                      {getInitials(`${user.firstName} ${user.lastName || ''}`)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight truncate max-w-[140px]" title={`${user.firstName} ${user.lastName || ''}`}>
                        {user.firstName} {user.lastName}
                      </h3>
                      {user.username && (
                        <div className="flex items-center text-primary text-sm font-medium mt-0.5">
                          <AtSign className="w-3 h-3 mr-1" />
                          {user.username}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Fingerprint className="w-4 h-4 mr-2" />
                        ID
                      </div>
                      <span className="font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                        {user.telegramId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Joined
                      </div>
                      <span className="text-slate-300">
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
