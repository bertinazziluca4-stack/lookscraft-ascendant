import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

export interface Badge {
  id: string;
  badge_type: string;
  earned_at: string;
}

export interface ArticleProgressRecord {
  id: string;
  article_id: string;
  completed_at: string;
  quiz_score: number | null;
  personalization_data: Record<string, string> | null;
}

export const useArticleProgress = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["article-progress", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("article_progress")
        .select("*")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data as ArticleProgressRecord[];
    },
    enabled: !!user,
  });
};

export const useBadges = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["badges", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_badges")
        .select("*")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data as Badge[];
    },
    enabled: !!user,
  });
};

export const completeArticle = async (
  userId: string,
  articleId: string,
  quizScore: number,
  personalizationData: Record<string, string>
) => {
  // Insert or update article progress
  const { error } = await supabase
    .from("article_progress")
    .upsert({
      user_id: userId,
      article_id: articleId,
      quiz_score: quizScore,
      personalization_data: personalizationData,
    }, {
      onConflict: "user_id,article_id"
    });

  if (error) throw error;

  // Check for first article badge
  const { data: progressCount } = await supabase
    .from("article_progress")
    .select("id", { count: "exact" })
    .eq("user_id", userId);

  if (progressCount && progressCount.length === 1) {
    await supabase
      .from("user_badges")
      .insert({ user_id: userId, badge_type: "first_article" })
      .select();
  }

  // Check for mastery badges
  const { data: allProgress } = await supabase
    .from("article_progress")
    .select("article_id")
    .eq("user_id", userId);

  if (allProgress) {
    const looksmaxxingComplete = ["lm-1", "lm-2", "lm-3", "lm-4", "lm-5"]
      .every(id => allProgress.some(p => p.article_id === id));
    
    const ancestralComplete = ["ae-1", "ae-2", "ae-3", "ae-4", "ae-5"]
      .every(id => allProgress.some(p => p.article_id === id));

    if (looksmaxxingComplete) {
      await supabase
        .from("user_badges")
        .insert({ user_id: userId, badge_type: "looksmaxxing_master" })
        .select();
    }

    if (ancestralComplete) {
      await supabase
        .from("user_badges")
        .insert({ user_id: userId, badge_type: "ancestral_master" })
        .select();
    }
  }
};

export const BADGE_INFO: Record<string, { name: string; description: string; icon: string }> = {
  first_article: {
    name: "First Steps",
    description: "Completed your first article",
    icon: "🚀",
  },
  streak_7: {
    name: "Week Warrior",
    description: "Maintained a 7-day streak",
    icon: "🔥",
  },
  streak_30: {
    name: "Monthly Master",
    description: "Maintained a 30-day streak",
    icon: "💪",
  },
  looksmaxxing_master: {
    name: "Looksmaxxing Master",
    description: "Completed all looksmaxxing articles",
    icon: "✨",
  },
  ancestral_master: {
    name: "Ancestral Master",
    description: "Completed all ancestral eating articles",
    icon: "🥩",
  },
  quiz_ace: {
    name: "Quiz Ace",
    description: "Got 100% on 5 quizzes",
    icon: "🎯",
  },
  level_5: {
    name: "Rising Star",
    description: "Reached level 5",
    icon: "⭐",
  },
  level_10: {
    name: "Elite",
    description: "Reached level 10",
    icon: "🏆",
  },
  community_contributor: {
    name: "Community Contributor",
    description: "Created 5 discussions",
    icon: "💬",
  },
  early_adopter: {
    name: "Early Adopter",
    description: "Joined during launch",
    icon: "🌟",
  },
};
