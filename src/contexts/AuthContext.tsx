import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  xp: number;
  level: number;
  streak_days: number;
  last_activity_date: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  addXP: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const XP_PER_LEVEL = 100;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    if (!error && data) {
      setProfile(data as Profile);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const addXP = async (amount: number) => {
    if (!user || !profile) return;
    
    const newXP = profile.xp + amount;
    const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
    const today = new Date().toISOString().split("T")[0];
    
    // Calculate streak
    let newStreak = profile.streak_days;
    if (profile.last_activity_date) {
      const lastDate = new Date(profile.last_activity_date);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak = profile.streak_days + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
    
    await supabase
      .from("profiles")
      .update({ 
        xp: newXP, 
        level: newLevel, 
        streak_days: newStreak,
        last_activity_date: today 
      })
      .eq("user_id", user.id);
    
    // Check for badges (use upsert to handle conflicts)
    if (newLevel >= 5 && profile.level < 5) {
      await supabase.from("user_badges").upsert({ 
        user_id: user.id, 
        badge_type: "level_5" 
      }, { onConflict: "user_id,badge_type", ignoreDuplicates: true });
    }
    if (newLevel >= 10 && profile.level < 10) {
      await supabase.from("user_badges").upsert({ 
        user_id: user.id, 
        badge_type: "level_10" 
      }, { onConflict: "user_id,badge_type", ignoreDuplicates: true });
    }
    if (newStreak >= 7) {
      await supabase.from("user_badges").upsert({ 
        user_id: user.id, 
        badge_type: "streak_7" 
      }, { onConflict: "user_id,badge_type", ignoreDuplicates: true });
    }
    if (newStreak >= 30) {
      await supabase.from("user_badges").upsert({ 
        user_id: user.id, 
        badge_type: "streak_30" 
      }, { onConflict: "user_id,badge_type", ignoreDuplicates: true });
    }
    
    await refreshProfile();
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlock
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Then get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          username,
          display_name: username,
        },
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading, 
      signUp, 
      signIn, 
      signOut,
      refreshProfile,
      addXP
    }}>
      {children}
    </AuthContext.Provider>
  );
};
