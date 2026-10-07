import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [stage, setStage] = useState("empty");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Mengatur proses penyeduhan kopi
  useEffect(() => {
    if (stage !== "brewing") return;

    const timer = setTimeout(() => {
      setStage("ready");
    }, 3500);

    return () => clearTimeout(timer);
  }, [stage]);

  // Tombol Buat Kopi
  const handleMakeCoffee = () => {
    setError("");
    setStage("login");
  };

  // Proses login
  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    if (!email.includes("@")) {
      setError("Masukkan email yang valid.");
      return;
    }

    if (password.length < 4) {
      setError("Password minimal 4 karakter.");
      return;
    }

    // Login berhasil → mulai membuat kopi
    setStage("brewing");
  };

  // Mulai hari
  const handleStartDay = () => {
    setStage("welcome");
    setMessage("Selamat pagi! Semoga harimu menyenangkan ☀️");
  };

  // Kembali ke awal
  const handleReset = () => {
    setStage("empty");
    setEmail("");
    setPassword("");
    setError("");
    setMessage("");
  };

  return (
    <main className={`app ${stage}`}>
      {/* Background */}
      <div className="sun"></div>

      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>

      {/* Dekorasi */}
      <div className="bird bird-1">⌁</div>
      <div className="bird bird-2">⌁</div>

      <section className="morning-card">
        {/* Header */}
        <div className="header">
          <span className="small-label">GOOD MORNING</span>
          <h1>
            Morning<span>Coffee</span>
          </h1>

          <p>
            Mulai pagi dengan secangkir kopi
            <br />
            dan semangat baru.
          </p>
        </div>

        {/* Area Coffee */}
        <div className="coffee-area">
          <div className="coffee-table"></div>

          {/* Steam */}
          {(stage === "brewing" || stage === "ready" || stage === "welcome") && (
            <div className="steam-container">
              <span className="steam steam-1"></span>
              <span className="steam steam-2"></span>
              <span className="steam steam-3"></span>
            </div>
          )}

          {/* Coffee Cup */}
          <div className={`cup ${stage === "brewing" ? "brewing-cup" : ""}`}>
            <div className="cup-handle"></div>

            <div className="cup-body">
              <div className="coffee-liquid"></div>

              {stage === "brewing" && (
                <div className="coffee-stream"></div>
              )}
            </div>

            <div className="cup-shadow"></div>
          </div>

          {/* Status */}
          {stage === "empty" && (
            <div className="coffee-status">
              <span>☕</span>
              <p>Cangkir masih kosong</p>
            </div>
          )}

          {stage === "brewing" && (
            <div className="coffee-status brewing-text">
              <span>♨️</span>
              <p>Sedang menyeduh kopi...</p>

              <div className="loading-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          )}

          {stage === "ready" && (
            <div className="coffee-status ready-text">
              <span>☕</span>
              <p>Kopi kamu sudah siap!</p>
            </div>
          )}

          {stage === "welcome" && (
            <div className="coffee-status welcome-text">
              <span>🌞</span>
              <p>Selamat menjalani hari!</p>
            </div>
          )}
        </div>

        {/* EMPTY */}
        {stage === "empty" && (
          <div className="action-area">
            <button className="coffee-button" onClick={handleMakeCoffee}>
              <span>☕</span>
              Buat Kopi
              <strong>→</strong>
            </button>

            <p className="hint">
              Buat kopi pagi ini untuk melanjutkan
            </p>
          </div>
        )}

        {/* LOGIN */}
        {stage === "login" && (
          <div className="login-area">
            <div className="login-icon">🔐</div>

            <h2>Login Dulu</h2>

            <p className="login-description">
              Sebelum membuat kopi, silakan masuk terlebih dahulu.
            </p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>

                <div className="input-wrapper">
                  <span>👤</span>

                  <input
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>

                <div className="input-wrapper">
                  <span>🔒</span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {error && <div className="error-message">⚠️ {error}</div>}

              <div className="login-options">
                <label>
                  <input type="checkbox" />
                  Ingat saya
                </label>

                <span>Lupa password?</span>
              </div>

              <button className="login-button" type="submit">
                🔑 Login
                <strong>→</strong>
              </button>
            </form>

            <button
              className="back-button"
              onClick={() => setStage("empty")}
            >
              ← Kembali
            </button>
          </div>
        )}

        {/* BREWING */}
        {stage === "brewing" && (
          <div className="brewing-area">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <p>Menyiapkan kopi terbaik untukmu...</p>
          </div>
        )}

        {/* READY */}
        {stage === "ready" && (
          <div className="ready-area">
            <div className="success-icon">✓</div>

            <h2>Kopi Siap!</h2>

            <p>
              Login berhasil dan kopi pagimu
              <br />
              sudah selesai dibuat.
            </p>

            <button
              className="start-button"
              onClick={handleStartDay}
            >
              🌞 Mulai Harimu
              <strong>→</strong>
            </button>
          </div>
        )}

        {/* WELCOME */}
        {stage === "welcome" && (
          <div className="welcome-area">
            <div className="welcome-icon">☀️</div>

            <h2>Selamat Pagi!</h2>

            <p>
              Kopi sudah siap.
              <br />
              Sekarang waktunya memulai harimu.
            </p>

            <div className="daily-card">
              <span>☕</span>

              <div>
                <strong>Morning Coffee</strong>
                <small>Ready to start your day</small>
              </div>

              <b>✓</b>
            </div>

            <button
              className="reset-button"
              onClick={handleReset}
            >
              Buat Kopi Lagi
            </button>

            {message && (
              <div className="success-message">
                {message}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer>
          <span>☕</span>
          <span>Morning Coffee</span>
          <span>•</span>
          <span>Start your day right</span>
        </footer>
      </section>
    </main>
  );
}

export default App;