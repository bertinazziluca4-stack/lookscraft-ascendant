import { useAuth } from "@/contexts/AuthContext";
import { useBadges, BADGE_INFO } from "@/hooks/useGamification";
import { Flame, Sparkles, Star, Trophy, Zap } from "lucide-react";

const XP_PER_LEVEL = 100;

const LevelBar = () => {
  const { profile } = useAuth();
  const { data: badges } = useBadges();

  if (!profile) return null;

  const currentLevelXP = (profile.level - 1) * XP_PER_LEVEL;
  const nextLevelXP = profile.level * XP_PER_LEVEL;
  const progressXP = profile.xp - currentLevelXP;
  const progressPercent = (progressXP / XP_PER_LEVEL) * 100;

  return (
    <div className="gradient-border rounded-xl p-4 mb-4">
      {/* Level and XP */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Level {profile.level}</div>
            <div className="text-xs text-muted-foreground">{profile.xp} XP total</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {profile.streak_days > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20">
              <Flame className="w-3 h-3 text-primary" />
              <span className="text-xs font-semibold text-primary">{profile.streak_days} day streak</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progressXP} / {XP_PER_LEVEL} XP</span>
          <span>Level {profile.level + 1}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Badges preview */}
      {badges && badges.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Badges ({badges.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 5).map((badge) => {
              const info = BADGE_INFO[badge.badge_type];
              return (
                <div
                  key={badge.id}
                  className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-lg"
                  title={info?.name}
                >
                  {info?.icon || "🏅"}
                </div>
              );
            })}
            {badges.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                +{badges.length - 5}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelBar;
