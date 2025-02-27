import QnaBox from "@/components/Qna/QnaBox";
import { getData } from "@/lib/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const data = await getData();
  const searchTerm = searchParams.query ?? "";
  const category = "Frontend";
  console.log(data);
  //frontend 카테고리 필터링
  const frontendData = data.filter((item: any) => item.category === category);
  // 검색 필터 적용
  const filteredData = frontendData.filter((item: any) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 검색 결과가 없으면 전체 데이터를 반환
  const finalData = filteredData.length > 0 ? filteredData : frontendData;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <QnaBox data={finalData} searchTerm={searchTerm} category={category} />
    </div>
  );
}
