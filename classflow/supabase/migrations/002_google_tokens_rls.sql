-- Allow authenticated users to insert/update their own Google tokens
-- This is needed for the auth callback to store tokens after OAuth sign-in

create policy "Users can insert own tokens"
  on public.google_tokens for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tokens"
  on public.google_tokens for update
  using (auth.uid() = user_id);
