export default function CheatSheetsPage() {
  const sheets = [
    {
      title: "Frontend Snippets",
      icon: "🔧",
      tips: ["Responsive Navbar (Tailwind)", "Typing animation with Framer Motion", "Dark mode toggle"],
      color: "text-blue-400"
    },
    {
      title: "Backend Snippets",
      icon: "⚙️",
      tips: ["Next.js API route basics", "Protected routes with middleware", "Rate limiting in Next.js"],
      color: "text-purple-400"
    },
    {
      title: "Supabase & Auth",
      icon: "🛡️",
      tips: ["Supabase client setup", "OAuth with GitHub/Google", "Session management"],
      color: "text-green-400"
    },
    {
      title: "Utility Functions",
      icon: "🧠",
      tips: ["Format dates with dayjs", "Debounce user input", "Slugify a string"],
      color: "text-yellow-400"
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <span aria-hidden="true">📑</span>
          Cheat Sheets
        </h1>
        <p className="text-gray-400">
          Quick dev references — grab what you need and go build.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sheets.map((sheet) => (
          <div 
            key={sheet.title}
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-transparent hover:border-blue-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xl ${sheet.color}`} aria-hidden="true">{sheet.icon}</span>
              <h2 className="text-xl font-semibold text-white">{sheet.title}</h2>
            </div>
            <ul className="space-y-2 pl-1">
              {sheet.tips.map((tip) => (
                <li 
                  key={tip}
                  className="text-gray-400 text-sm before:content-['•'] before:mr-2 before:text-blue-400 flex items-baseline"
                >
                  <span className="flex-1">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}