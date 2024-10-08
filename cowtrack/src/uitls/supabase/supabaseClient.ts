import { createClient } from '@supabase/supabase-js'
import { Database } from '../../constants/supabase'

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || ''
const supabaseAnonKey =import.meta.env.VITE_APP_SUPABASE_ANON_KEY || ''

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)