const level1 = {
  captchaWord: "",
  selected: [],
  letterBoxes: [],

  init: function() {
    const div = document.getElementById("level1");
    div.innerHTML = `
      <h3>Level 1:</h3>
      <canvas id="captchaCanvas1" width="350" height="120"></canvas><br>
      <input id="fakeInput" placeholder="">
      <div id="selected"></div>
      <div class="controls">
        <button onclick="currentLevelObj.undo()">Undo</button>
        <button onclick="currentLevelObj.clearSel()">Clear</button>
        <button onclick="currentLevelObj.submit()">Verify</button>
        <button onclick="currentLevelObj.init()">New CAPTCHA</button>
      </div>
      <div id="message"></div>
    `;

    this.captchaWord = randomWord(5);
    this.selected = [];
    this.letterBoxes = [];
    this.drawCaptcha();
    this.updateSelected();

    document.getElementById("captchaCanvas1").addEventListener("click", (e)=>{
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for(let box of this.letterBoxes){
        if(!box.used && x>=box.x && x<=box.x+box.w && y>=box.y && y<=box.y+box.h){
          box.used=true; this.selected.push(box.ch); this.updateSelected(); break;
        }
      }
    });
  },

  drawCaptcha: function() {
    const canvas = document.getElementById("captchaCanvas1");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle="#fff"; ctx.fillRect(0,0,canvas.width,canvas.height);

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
      this.letterBoxes.push({ch,x:x-20,y:y-30,w:40,h:60,used:false});
    }
  },

  updateSelected: function(){ document.getElementById("selected").innerText=this.selected.join(""); },
  undo: function(){ if(this.selected.length===0) return; const last=this.selected.pop(); for(let i=this.letterBoxes.length-1;i>=0;i--){if(this.letterBoxes[i].ch===last && this.letterBoxes[i].used){this.letterBoxes[i].used=false; break;}} this.updateSelected(); },
  clearSel: function(){ this.selected=[]; this.letterBoxes.forEach(b=>b.used=false); this.updateSelected(); },
  submit: function(){ const msg=document.getElementById("message"); if(this.selected.join("")===this.captchaWord){ msg.style.color="green"; msg.innerText="✅ Correct — advancing!"; setTimeout(()=>nextLevel(),800); } else { msg.style.color="red"; msg.innerText="❌ Incorrect." } }
};

levels.push(level1);
