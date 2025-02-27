import { supabase } from "./supabase";

export async function getData() {
  const { data, error } = await supabase
    .from("qnaTable")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  console.log("Fetched data:", data); // 확인용 로그
  return data;
}
