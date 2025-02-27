import QnaBox from "@/components/Qna/QnaBox";
import { getData } from "@/lib/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const data = await getData();
  const searchTerm = searchParams.query || "";

  //Algorithm 카테고리 필터링
  const algorithmData = data.filter(
    (item: any) => item.category === "Algorithm"
  );

  // 검색 필터 적용
  const filteredData = algorithmData.filter((item: any) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ❗ 검색 결과가 없으면 전체 데이터를 반환
  const finalData = filteredData.length > 0 ? filteredData : algorithmData;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <QnaBox data={finalData} searchTerm={searchTerm} />
    </div>
  );
}
