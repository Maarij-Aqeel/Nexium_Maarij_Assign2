

export default function SummarizeBox() {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="w-2/3 bg-white rounded-2xl shadow-2xl p-6 space-y-4">
        {/* Header + Copy Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-sky-800 font-bold">Summary</h1>

          <button className="text-lg px-4 py-2 cursor-pointer font-semibold flex items-center gap-2 bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-full shadow-sm transition-all duration-200">
            <img
              src="https://img.icons8.com/?size=100&id=cvB6JC7HJn9v&format=png&color=000000"
              className="h-5 w-5"
              alt="copy icon"
            />
            Copy
          </button>
        </div>

        {/* Small Info */}
        <p className="text-md text-gray-600">
          AI-generated summary from blog URL
        </p>

        {/* Main Summary Content */}
        <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl shadow-inner max-h-[300px] overflow-y-auto">
          <p className="text-gray-800 text-base break-words whitespace-pre-wrap leading-relaxed">
            ddddddddddddddddddddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssddddddddddddddddddddddddddddddddddd
          </p>
        </div>

        {/* Translate Button */}
        <div>
         <button className="bg-sky-600 text-white hover:bg-sky-700 font-semibold px-5 py-3 rounded-full transition-all duration-200 shadow-md flex items-center gap-3">
            <img
                src="https://img.icons8.com/?size=100&id=QyZvJTP0BAHx&format=png&color=000000"
                className="h-9 w-9"
                alt="translate icon"
            />
            Translate to Urdu
        </button>

        </div>
      </div>
    </div>
  );
}
