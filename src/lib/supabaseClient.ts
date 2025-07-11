import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwfxmanpzcjgiyoxrisn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZnhtYW5wemNqZ2l5b3hyaXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzk0MDcsImV4cCI6MjA2Nzc1NTQwN30.n_6-z4g2vXXVnr1NYcKZSOC2aH72QSGIrTUwPCka3Z4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
