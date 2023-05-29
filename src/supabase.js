import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwotwzkhnicyrrjqnvyi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13b3R3emtobmljeXJyanFudnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUyOTQzNjQsImV4cCI6MjAwMDg3MDM2NH0.sdgozu1L2rv-YWEpXBoW9qijZR7opNfXX0AJZSmlSz4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;