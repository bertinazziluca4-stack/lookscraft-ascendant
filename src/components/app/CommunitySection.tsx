import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageCircle, 
  Plus, 
  Send, 
  User,
  X,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Discussion {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string | null;
    display_name: string | null;
  } | null;
}

const CommunitySection = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [category, setCategory] = useState("general");

  const { data: discussions, isLoading } = useQuery({
    queryKey: ["discussions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discussions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Fetch profiles separately
      const userIds = [...new Set(data.map(d => d.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, username, display_name, avatar_url")
        .in("user_id", userIds);
      
      return data.map(d => ({
        ...d,
        profiles: profiles?.find(p => p.user_id === d.user_id) || null
      })) as Discussion[];
    },
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", selectedDiscussion?.id],
    queryFn: async () => {
      if (!selectedDiscussion) return [];
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("discussion_id", selectedDiscussion.id)
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      
      const userIds = [...new Set(data.map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, username, display_name")
        .in("user_id", userIds);
      
      return data.map(c => ({
        ...c,
        profiles: profiles?.find(p => p.user_id === c.user_id) || null
      })) as Comment[];
    },
    enabled: !!selectedDiscussion,
  });

  const { data: userLikes } = useQuery({
    queryKey: ["user-likes", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("discussion_likes")
        .select("discussion_id")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data.map(l => l.discussion_id);
    },
    enabled: !!user,
  });

  const createDiscussion = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in");
      const { error } = await supabase
        .from("discussions")
        .insert({
          user_id: user.id,
          title: newTitle,
          content: newContent,
          category,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      setShowNewPost(false);
      setNewTitle("");
      setNewContent("");
      toast.success("Discussion posted!");
    },
    onError: () => {
      toast.error("Failed to create discussion");
    },
  });

  const createComment = useMutation({
    mutationFn: async () => {
      if (!user || !selectedDiscussion) throw new Error("Must be logged in");
      const { error } = await supabase
        .from("comments")
        .insert({
          user_id: user.id,
          discussion_id: selectedDiscussion.id,
          content: newComment,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", selectedDiscussion?.id] });
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      setNewComment("");
    },
    onError: () => {
      toast.error("Failed to post comment");
    },
  });

  const toggleLike = useMutation({
    mutationFn: async (discussionId: string) => {
      if (!user) throw new Error("Must be logged in");
      
      const isLiked = userLikes?.includes(discussionId);
      
      if (isLiked) {
        await supabase
          .from("discussion_likes")
          .delete()
          .eq("discussion_id", discussionId)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("discussion_likes")
          .insert({ discussion_id: discussionId, user_id: user.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      queryClient.invalidateQueries({ queryKey: ["user-likes"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground">Share your journey and learn from others</p>
          </div>
          {user && (
            <Button variant="hero" onClick={() => setShowNewPost(true)}>
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          )}
        </div>

        {/* New post modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="gradient-border rounded-2xl p-6 w-full max-w-lg bg-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold">Create Discussion</h2>
                <button onClick={() => setShowNewPost(false)}>
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 rounded-lg bg-muted border border-border"
                  >
                    <option value="general">General</option>
                    <option value="looksmaxxing">Looksmaxxing</option>
                    <option value="ancestral-eating">Ancestral Eating</option>
                    <option value="progress">Progress</option>
                    <option value="questions">Questions</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    placeholder="What's on your mind?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-muted"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <Textarea
                    placeholder="Share your thoughts, ask questions, or post updates..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={4}
                    className="bg-muted"
                  />
                </div>
                
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => createDiscussion.mutate()}
                  disabled={!newTitle.trim() || !newContent.trim() || createDiscussion.isPending}
                >
                  {createDiscussion.isPending ? "Posting..." : "Post Discussion"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Discussion detail modal */}
        {selectedDiscussion && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="gradient-border rounded-2xl p-6 w-full max-w-2xl bg-card max-h-[80vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-primary font-semibold uppercase mb-1">
                    {selectedDiscussion.category}
                  </div>
                  <h2 className="font-display text-xl font-bold">{selectedDiscussion.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{selectedDiscussion.profiles?.display_name || selectedDiscussion.profiles?.username || "Anonymous"}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(selectedDiscussion.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedDiscussion(null)}>
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              
              <p className="text-foreground/90 mb-6 whitespace-pre-wrap">{selectedDiscussion.content}</p>
              
              <div className="border-t border-border pt-4">
                <h3 className="font-semibold mb-4">Comments ({selectedDiscussion.comments_count})</h3>
                
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {comments?.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          {comment.profiles?.display_name || comment.profiles?.username || "Anonymous"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/80 pl-8">{comment.content}</p>
                    </div>
                  ))}
                  {comments?.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
                
                {user && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-muted"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && newComment.trim()) {
                          createComment.mutate();
                        }
                      }}
                    />
                    <Button 
                      size="icon"
                      onClick={() => createComment.mutate()}
                      disabled={!newComment.trim() || createComment.isPending}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Discussions list */}
        {!user && (
          <div className="gradient-border rounded-xl p-6 mb-6 text-center">
            <p className="text-muted-foreground mb-3">Sign in to join the community and participate in discussions</p>
            <Button variant="hero" asChild>
              <a href="/auth">Sign In</a>
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {discussions?.map((discussion) => {
            const isLiked = userLikes?.includes(discussion.id);
            
            return (
              <div
                key={discussion.id}
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    {discussion.profiles?.avatar_url ? (
                      <img 
                        src={discussion.profiles.avatar_url} 
                        alt="" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary uppercase">
                        {discussion.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedDiscussion(discussion)}
                      className="text-left"
                    >
                      <h3 className="font-semibold hover:text-primary transition-colors">
                        {discussion.title}
                      </h3>
                    </button>
                    
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {discussion.content}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => user && toggleLike.mutate(discussion.id)}
                        disabled={!user}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          isLiked ? "text-primary" : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-primary" : ""}`} />
                        {discussion.likes_count}
                      </button>
                      
                      <button
                        onClick={() => setSelectedDiscussion(discussion)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {discussion.comments_count}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {discussions?.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No discussions yet</h3>
              <p className="text-muted-foreground">Be the first to start a conversation!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
