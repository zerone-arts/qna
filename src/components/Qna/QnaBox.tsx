import QnaUi from "./QnaUi";

import QnaForm from "./QnaForm";
import QnaEditButton from "./QnaEditButton";
import QnaToggleButton from "./QnaToggleButton";

export default function QnaBox({
  data,
  searchTerm,
  category,
}: {
  data: any;
  searchTerm: string;
  category: string;
}) {
  return (
    <div className="absolute w-3/4 h-screen flex items-center justify-center flex-col  p-10">
      <QnaUi searchTerm={searchTerm} />
      <div className="w-full h-full p-10 overflow-y-scroll ">
        <ul className="w-full">
          {data.map((item: any) => (
            <li key={item.id} className="w-full  py-4">
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl text-YellowColor">{item.question}</h1>
                <QnaToggleButton answerId={item.id} />
              </div>

              <div
                id={`answer-${item.id}`}
                className="overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out "
              >
                <p className="text-gray-100 mt-2 flex items-center justify-between break-keep">
                  {item.answer}
                  <span>
                    <QnaEditButton id={item.id} />
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <QnaForm category={category} data={data} />
    </div>
  );
}
