import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ejvahqioflsckumpybup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdmFocWlvZmxzY2t1bXB5YnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NjAzMzYsImV4cCI6MjA1ODQzNjMzNn0.I34aotWtVrtAGb25JUWNe8MAlTlUK1RAGHgApbnu1iw';

export const supabase = createClient(supabaseUrl, supabaseKey);