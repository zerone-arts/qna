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

  return data;
}

export async function updateData(id: string, question: string, answer: string) {
  const { data, error } = await supabase
    .from("qnaTable")
    .update({ question, answer })
    .eq("id", id)
    .select(); // 업데이트된 데이터 반환

  if (error) {
    console.error("Error updating data:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function DeleteData(id: string) {
  const { error } = await supabase.from("qnaTable").delete().eq("id", id);

  if (error) {
    return { success: false, error };
  }

  return { success: true };
}
