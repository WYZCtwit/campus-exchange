-- =====================================================
-- Migration: Enable Anonymous Auth Support
-- File: 20260327000000_anon_auth.sql
-- Description: Update handle_new_user() to generate
--   random nicknames and default avatars for anonymous users
-- =====================================================

-- Update the trigger function to handle anonymous users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_nickname VARCHAR(50);
  v_avatar_url TEXT;
BEGIN
  -- Use provided nickname from metadata, or generate one for anonymous users
  IF NEW.raw_user_meta_data->>'nickname' IS NOT NULL THEN
    v_nickname := NEW.raw_user_meta_data->>'nickname';
  ELSIF NEW.is_anonymous = true THEN
    v_nickname := '校园访客_' || floor(1000 + random() * 9000)::text;
  ELSE
    v_nickname := split_part(NEW.email, '@', 1);
  END IF;

  -- Use provided avatar, or default for anonymous users
  IF NEW.raw_user_meta_data->>'avatar_url' IS NOT NULL THEN
    v_avatar_url := NEW.raw_user_meta_data->>'avatar_url';
  ELSIF NEW.is_anonymous = true THEN
    v_avatar_url := '/default-avatar.svg';
  ELSE
    v_avatar_url := NULL;
  END IF;

  INSERT INTO public.profiles (id, nickname, avatar_url)
  VALUES (NEW.id, v_nickname, v_avatar_url);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
