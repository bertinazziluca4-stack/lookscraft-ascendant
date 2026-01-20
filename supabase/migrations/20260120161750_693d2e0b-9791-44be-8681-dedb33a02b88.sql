-- Fix function search_path for security
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.update_comments_count() SET search_path = public;
ALTER FUNCTION public.update_likes_count() SET search_path = public;