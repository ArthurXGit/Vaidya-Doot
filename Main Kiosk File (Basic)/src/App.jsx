import { useState } from 'react';
import translations from './translations';

function App() {
  const [lang, setLang] = useState('en');
  const [abhaId, setAbhaId] = useState('');
  const [password, setPassword] = useState('');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const t = translations[lang];
  const languages = Object.keys(translations);

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login attempted with ABHA ID: ${abhaId}`);
  };

  // Format ABHA ID with dashes: XX-XXXX-XXXX-XXXX
  const handleAbhaChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 14);
    let formatted = raw;
    if (raw.length > 2) formatted = raw.slice(0, 2) + '-' + raw.slice(2);
    if (raw.length > 6) formatted = formatted.slice(0, 7) + '-' + raw.slice(6);
    if (raw.length > 10) formatted = formatted.slice(0, 12) + '-' + raw.slice(10);
    setAbhaId(formatted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ===== TOP HEADER BAR ===== */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Site Name */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-blue-900" id="site-title">
              {t.siteName}
            </h1>
          </div>

          {/* Right: Language Switcher */}
          <div className="relative">
            <button
              id="language-switcher-button"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 text-sm bg-white hover:bg-gray-50"
            >
              <span className="text-lg">🌐</span>
              <span>{t.langName || lang.toUpperCase()}</span>
              <span className="text-xs">▼</span>
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[160px]">
                {languages.map((code) => (
                  <button
                    key={code}
                    id={`lang-option-${code}`}
                    onClick={() => {
                      setLang(code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${lang === code ? 'bg-blue-100 font-semibold text-blue-900' : 'text-gray-700'
                      }`}
                  >
                    {translations[code].langName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== NAVIGATION BAR ===== */}
      <nav className="bg-blue-900" id="main-navigation">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-0">
            {[
              { key: 'menuHome', id: 'nav-home' },
              { key: 'menuAbout', id: 'nav-about' },
              { key: 'menuServices', id: 'nav-services' },
              { key: 'menuContact', id: 'nav-contact' },
            ].map((item) => (
              <li key={item.key}>
                <a
                  id={item.id}
                  href="#"
                  className="block px-5 py-3 text-white text-sm hover:bg-blue-800 transition-colors"
                >
                  {t[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ===== MAIN CONTENT: LOGIN FORM ===== */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8" id="login-card">
            {/* Login Heading */}
            <h2 className="text-xl font-semibold text-blue-900 text-center mb-6" id="login-title">
              {t.loginTitle}
            </h2>

            <form onSubmit={handleLogin} id="login-form">
              {/* ABHA ID Field */}
              <div className="mb-5">
                <label
                  htmlFor="abha-id-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.abhaLabel}
                </label>
                <input
                  id="abha-id-input"
                  type="text"
                  value={abhaId}
                  onChange={handleAbhaChange}
                  placeholder={t.abhaPlaceholder}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  maxLength={17}
                  inputMode="numeric"
                />
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label
                  htmlFor="password-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.passwordLabel}
                </label>
                <input
                  id="password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full border border-gray-300 rounded px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Login Button */}
              <button
                id="login-button"
                type="submit"
                className="w-full bg-blue-800 text-white py-3 rounded text-base font-medium hover:bg-blue-900 transition-colors"
              >
                {t.loginButton}
              </button>
            </form>

            {/* Forgot Password */}
            <div className="text-center mt-4">
              <a
                id="forgot-password-link"
                href="#"
                className="text-sm text-blue-700 hover:underline"
              >
                {t.forgotPassword}
              </a>
            </div>

            {/* Register Link */}
            <div className="text-center mt-3">
              <a
                id="register-link"
                href="#"
                className="text-sm text-blue-700 font-medium hover:underline"
              >
                {t.registerLink}
              </a>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-4" id="help-text">
            {t.helpText}
          </p>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-blue-900 text-white py-4" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-blue-200">{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
