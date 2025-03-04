import QnaBox from "@/components/Qna/QnaBox";
import { getData } from "@/lib/api";
import { headers } from "next/headers";

export default async function Page() {
  const data = await getData();
  const headersList = await headers();

  const encodedSearchTerm = headersList.get("x-query") || "";
  const searchTerm = decodeURIComponent(encodedSearchTerm);
  const sortOrder = headersList.get("x-sort");

  const category = "Algorithm";

  const argorithmData = data.filter((item: any) => item.category === category);

  const filteredData = argorithmData.filter((item: any) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let finalData = filteredData.length > 0 ? filteredData : argorithmData;

  if (sortOrder) {
    finalData = [...finalData].sort((a, b) =>
      sortOrder === "ascending"
        ? a.importance - b.importance
        : b.importance - a.importance
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-[10vw] text-zinc-800/50 font-bold">
        Algorithm
      </div>
      <QnaBox data={finalData} searchTerm={searchTerm} category={category} />
    </div>
  );
}
