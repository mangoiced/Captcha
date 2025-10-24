const level2 = {
  captchaWord: "",
  drawing: false,
  drawnPixels: 0,

  init: function() {
    const div = document.getElementById("level2");
    div.innerHTML = `
      <h3>Level 2:</h3>
      <canvas id="captchaCanvas2" width="350" height="120"></canvas>
      <p></p>
      <canvas id="drawCanvas" width="350" height="120"></canvas><br>
      <div class="controls">
        <button onclick="currentLevelObj.clearDrawing()">Clear</button>
        <button onclick="currentLevelObj.submit()">Verify</button>
        <button onclick="currentLevelObj.init()">New CAPTCHA</button>
      </div>
      <div id="message2"></div>
    `;

    this.captchaWord = randomWord(4);
    this.clearDrawing();
    this.drawCaptcha();
    this.setupDrawing();
  },

  drawCaptcha: function() {
    const canvas = document.getElementById("captchaCanvas2");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i=0;i<150;i++){
      ctx.fillStyle=`rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.4)`;
      ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height,2,2);
    }

    ctx.font="bold 48px Arial"; ctx.textBaseline="middle";
    const spacing = canvas.width/(this.captchaWord.length+1);

    for(let i=0;i<this.captchaWord.length;i++){
      const ch = this.captchaWord[i];
      const x=(i+1)*spacing; const y=canvas.height/2+(Math.random()*20-10);
      const angle=(Math.random()*40-20)*Math.PI/180;
      ctx.save(); ctx.translate(x,y); ctx.rotate(angle);
      ctx.fillStyle=`rgb(${50+Math.random()*150},${50+Math.random()*150},${50+Math.random()*150})`;
      ctx.fillText(ch,-15,0); ctx.restore();
    }
  },

  setupDrawing: function() {
    const canvas = document.getElementById("drawCanvas");
    const ctx = canvas.getContext("2d");
    const self = this;

    canvas.onmousedown = () => { self.drawing = true; };
    canvas.onmouseup = () => { self.drawing = false; };
    canvas.onmouseout = () => { self.drawing = false; };
    canvas.onmousemove = function(e) {
      if (!self.drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill();
      self.drawnPixels++;
    };
  },

  clearDrawing: function() {
    const canvas = document.getElementById("drawCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    this.drawnPixels = 0;
  },

  submit: function() {
    const msg = document.getElementById("message2");
    if (this.drawnPixels > 100) {
      msg.style.color = "green";
      msg.innerText = `✅ Nice drawing! The word was "${this.captchaWord}".`;
      setTimeout(() => nextLevel(), 800);
    } else {
      msg.style.color = "red";
      msg.innerText = "❌ You must draw the letters!";
    }
  }
};

levels.push(level2);
