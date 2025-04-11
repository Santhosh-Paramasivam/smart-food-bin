import { createClient } from '@supabase/supabase-js';

const VITE_supabaseUrl = import.meta.env.VITE_supabaseUrl;
const VITE_supabaseAnonKey = import.meta.env.VITE_supabaseAnonKey;

export const supabase = createClient(VITE_supabaseUrl, VITE_supabaseAnonKey);