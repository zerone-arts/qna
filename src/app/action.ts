import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveData(
  question: string,
  answer: string,
  category: string
) {
  const { data, error } = await supabase.from("qnaTable").insert([
    {
      question,
      answer,
      category,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("❌ 데이터 저장 실패:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
