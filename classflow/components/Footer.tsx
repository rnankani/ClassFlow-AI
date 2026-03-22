"use client"

export function Footer() {
  return (
    <footer className="bg-dark-900 py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/logo.png" alt="ClassFlow AI" width={40} height={40} className="rounded-lg" />
            <span className="font-semibold text-white">ClassFlow AI</span>
          </div>
          <p className="text-sm text-dark-400">
            Built for students who never want to miss an assignment.
          </p>
        </div>

        <nav className="flex items-center justify-center gap-6 mb-8">
          <a
            href="#"
            className="text-sm text-dark-400 hover:text-dark-300 transition-colors"
          >
            About
          </a>
          <a
            href="#features"
            className="text-sm text-dark-400 hover:text-dark-300 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-dark-400 hover:text-dark-300 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#"
            className="text-sm text-dark-400 hover:text-dark-300 transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="border-t border-dark-800 pt-6 text-center">
          <p className="text-xs text-dark-500">
            &copy; 2025 ClassFlow AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
