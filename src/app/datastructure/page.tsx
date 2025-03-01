import QnaBox from "@/components/Qna/QnaBox";
import { getData } from "@/lib/api";
import { headers } from "next/headers";

export default async function Page() {
  const data = await getData();

  const headersList = await headers();
  const encodedSearchTerm = headersList.get("x-query") || "";
  const searchTerm = decodeURIComponent(encodedSearchTerm); // 디코딩 처리

  const category = "Data Structure";

  const frontendData = data.filter((item: any) => item.category === category);

  const filteredData = frontendData.filter((item: any) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const finalData = filteredData.length > 0 ? filteredData : frontendData;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-[10vw] text-zinc-800/50 font-bold">
        Data Structure
      </div>
      <QnaBox data={finalData} searchTerm={searchTerm} category={category} />
    </div>
  );
}
