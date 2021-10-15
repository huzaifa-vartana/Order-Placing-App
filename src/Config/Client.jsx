import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://prqqhyjezfbkltozpuuq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDI5MzQzMiwiZXhwIjoxOTQ5ODY5NDMyfQ.iWq1f4NDOt2u4qEpKAIiDXtJZLGYvixqtFNEOW05GWE";
export const supabase = createClient(supabaseUrl, supabaseKey);
