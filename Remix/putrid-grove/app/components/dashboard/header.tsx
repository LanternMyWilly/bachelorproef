export function Header({ quote }: { quote: string }) {
  return (
    <div className="w-full flex justify-center">
      <div className="header flex flex-col items-center w-max">
        <h1 className="text-5xl font-semibold uppercase text-gray-500">
          Welcome to <span className="ml-4 text-gray-700 font-bold">Putrid Grove</span>
        </h1>
        <div className="w-7/12 text-lg text-gray-700 text-center mt-24">{quote}</div>
      </div>
    </div>
  );
}
