import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null;
if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-supabase-url' && !supabaseUrl.includes('your-')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
  }
} else {
  console.warn('Supabase not configured - using null client')
}

export { supabase }
