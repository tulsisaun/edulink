import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const Home = () => {
  useEffect(() => {
    const checkSupabase = async () => {
      const { data, error } = await supabase.from("users").select("*").limit(1);

      if (error) {
        console.error("❌ Supabase Error:", error.message);
      } else {
        console.log("✅ Supabase Connected! Data:", data);
      }
    };

    checkSupabase();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
