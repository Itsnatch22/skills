export default function DocumentationPage() {
  const docs = [
    {
      title: "Getting Started",
      icon: "🔹",
      description: "Set up your profile, connect your account, and begin exploring.",
      href: "#getting-started"
    },
    {
      title: "Authentication",
      icon: "🔐",
      description: "Learn how login works, what data we store, and how OAuth is handled.",
      href: "#authentication"
    },
    {
      title: "Features Guide",
      icon: "🧠",
      description: "Deep dive into Skills, Messaging, Insights, and other tools.",
      href: "#features"
    },
    {
      title: "Troubleshooting",
      icon: "🛠️",
      description: "Hit a snag? Here's how to debug like a pro.",
      href: "#troubleshooting"
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <span aria-hidden="true">📘</span>
          Documentation
        </h1>
        <p className="text-gray-400">
          Everything you need to use SkillsConnect like a boss.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {docs.map((doc) => (
          <a
            key={doc.title}
            href={doc.href}
            className="group bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">{doc.icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {doc.title}
                </h2>
                <p className="text-gray-400 text-sm mt-2">{doc.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}