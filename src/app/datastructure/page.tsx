import QnaBox from "@/components/Qna/QnaBox";
import { getData } from "@/lib/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const data = await getData();
  const searchTerm = searchParams.query || "";
  const category = "Data Structure";

  const dataStructureData = data.filter(
    (item: any) => item.category === category
  );

  const filteredData = dataStructureData.filter((item: any) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const finalData = filteredData.length > 0 ? filteredData : dataStructureData;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-[10vw] text-zinc-800/50 font-bold">
        Data Structure
      </div>
      <QnaBox data={finalData} searchTerm={searchTerm} category={category} />
    </div>
  );
}
