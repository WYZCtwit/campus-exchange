INSERT INTO storage.buckets (id, name, public)
SELECT 'listings-images', 'listings-images', true
WHERE NOT EXISTS (
  SELECT 1
  FROM storage.buckets
  WHERE id = 'listings-images'
);

-- Note: storage.objects already has RLS enabled by Supabase platform.
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY is skipped
-- because the table is owned by supabase_storage_admin.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Public read listings-images'
  ) THEN
    CREATE POLICY "Public read listings-images"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'listings-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated upload listings-images'
  ) THEN
    CREATE POLICY "Authenticated upload listings-images"
      ON storage.objects FOR INSERT
      WITH CHECK (
        bucket_id = 'listings-images'
        AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Users update own listings-images objects'
  ) THEN
    CREATE POLICY "Users update own listings-images objects"
      ON storage.objects FOR UPDATE
      USING (
        bucket_id = 'listings-images'
        AND auth.uid()::text = (storage.foldername(name))[1]
      )
      WITH CHECK (
        bucket_id = 'listings-images'
        AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Users delete own listings-images objects'
  ) THEN
    CREATE POLICY "Users delete own listings-images objects"
      ON storage.objects FOR DELETE
      USING (
        bucket_id = 'listings-images'
        AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;
END $$;
