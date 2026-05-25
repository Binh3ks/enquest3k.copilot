import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing env vars — auth will fall back to Railway API');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// ── Auth helpers ────────────────────────────────────────────────────────────
export const supabaseAuth = {
  /**
   * Sign up with email/password.
   * Returns { user, session } or throws error.
   */
  async signUp({ email, password, username, full_name }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, full_name },
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign in with email/password.
   * Returns { user, session } or throws error.
   */
  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out.
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get current session (access token).
   */
  getSession() {
    return supabase.auth.getSession();
  },

  /**
   * Get current user.
   */
  getUser() {
    return supabase.auth.getUser();
  },

  /**
   * Listen to auth state changes.
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },

  /**
   * Reset password via email.
   */
  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  /**
   * Update user metadata.
   */
  async updateUser(attributes) {
    const { data, error } = await supabase.auth.updateUser(attributes);
    if (error) throw error;
    return data;
  },
};

export default supabase;
