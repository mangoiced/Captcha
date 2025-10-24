const level4 = {
  init: function() {
    const div = document.getElementById("level4");
    div.innerHTML = `
      <h3>Level 4: Solve the math equation</h3>
      <div style="display:flex; justify-content:center; width:100%;">
        <img id="equationImg" src="images/equation.webp" 
             alt="Math Equation" 
             style="width:95%; max-width:none; height:auto;">
      </div>
      <input id="mathAnswer" placeholder="Type your answer" type="text" 
             style="font-size:20px; text-align:center; padding:8px; width:250px; max-width:90%; margin-top:15px;">
      <div class="controls">
        <button onclick="currentLevelObj.submit()">Verify</button>
        <button onclick="currentLevelObj.clearInput()">Clear</button>
      </div>
      <div id="message4"></div>
    `;

    this.input = div.querySelector("#mathAnswer");
    this.msg = div.querySelector("#message4");
    this.correctAnswer = "1";

    this.input.focus();
  },

  submit: function() {
    const userAns = this.input.value.trim();
    if (userAns === this.correctAnswer) {
      this.msg.style.color = "green";
      this.msg.innerText = "✅ Correct! Advancing...";
      setTimeout(() => nextLevel(), 800);
    } else {
      this.msg.style.color = "red";
      this.msg.innerText = "❌ Incorrect. Try again!";
    }
  },

  clearInput: function() {
    this.input.value = "";
    this.msg.innerText = "";
    this.input.focus();
  }
};

levels.push(level4);
