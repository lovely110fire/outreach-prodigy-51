
CREATE TABLE public.email_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email_address TEXT NOT NULL,
  imap_server TEXT NOT NULL,
  imap_port INTEGER NOT NULL DEFAULT 993,
  smtp_server TEXT NOT NULL,
  smtp_port INTEGER NOT NULL DEFAULT 587,
  app_password TEXT NOT NULL,
  is_warming BOOLEAN DEFAULT false,
  warming_status TEXT DEFAULT 'Not Warming',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own email settings" ON public.email_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own email settings" ON public.email_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own email settings" ON public.email_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own email settings" ON public.email_settings FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_email_settings_user_id ON public.email_settings(user_id);
CREATE TRIGGER update_email_settings_updated_at BEFORE UPDATE ON public.email_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
