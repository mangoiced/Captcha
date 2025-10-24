const level6 = {
  init: function() {
    const div = document.getElementById("level6");
    div.innerHTML = `
      <h3>Level 6:</h3>
      <div id="gameArea">
        <div id="gameMessage"></div>
        <div id="lives">Bombs clicked: 0/3</div>
      </div>
    `;

    const gameArea = div.querySelector("#gameArea");
    const gameMessage = div.querySelector("#gameMessage");
    const livesDisplay = div.querySelector("#lives");

    const safeEmojis = ["😒","💩","🧑🏿‍🦰","🐷"];
    const bombEmoji = "💣";
    let fallingEmojis = [];
    let bombsClicked = 0;
    const totalBombsToWin = 3;
    const fallSpeed = 5;
    let spawnInterval;
    let animationFrame;

    function spawnEmoji() {
      const emojiEl = document.createElement("div");
      emojiEl.classList.add("emoji");
      const emoji = Math.random() < 0.6 ? bombEmoji : safeEmojis[Math.floor(Math.random()*safeEmojis.length)];
      emojiEl.textContent = emoji;
      emojiEl.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
      emojiEl.style.top = "0px";

      emojiEl.addEventListener("click", () => {
        if(emoji === bombEmoji){
          bombsClicked++;
          livesDisplay.textContent = `Bombs clicked: ${bombsClicked}/${totalBombsToWin}`;
          destroyEmoji(emojiEl);
          if(bombsClicked >= totalBombsToWin) winGame();
        } else {
          loseGame();
        }
      });

      gameArea.appendChild(emojiEl);
      fallingEmojis.push({el: emojiEl, emoji: emoji});
    }

    function destroyEmoji(el){
      const index = fallingEmojis.findIndex(f => f.el === el);
      if(index !== -1){
        if(gameArea.contains(fallingEmojis[index].el))
          gameArea.removeChild(fallingEmojis[index].el);
        fallingEmojis.splice(index,1);
      }
    }

    function updateEmojis(){
      for(let i=fallingEmojis.length-1;i>=0;i--){
        const obj = fallingEmojis[i];
        let top = parseFloat(obj.el.style.top);
        top += fallSpeed;
        obj.el.style.top = top + "px";

        if(top + 50 >= gameArea.clientHeight){
          destroyEmoji(obj.el); // remove emoji if it reaches bottom
        }
      }
    }

    function gameLoop(){
      updateEmojis();
      animationFrame = requestAnimationFrame(gameLoop);
    }

    function startGame(){
      // reset
      fallingEmojis.forEach(f => { if(gameArea.contains(f.el)) gameArea.removeChild(f.el); });
      fallingEmojis = [];
      bombsClicked = 0;
      livesDisplay.textContent = `Points: ${bombsClicked}/${totalBombsToWin}`;
      gameMessage.style.display = "none";
      spawnInterval = setInterval(spawnEmoji, 600);
      animationFrame = requestAnimationFrame(gameLoop);
    }

    function winGame(){
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationFrame);
      fallingEmojis.forEach(f => destroyEmoji(f.el));
      gameMessage.style.display = "block";
      gameMessage.style.color = "green";
      gameMessage.textContent = "🎉 You Win!";
      setTimeout(() => nextLevel(), 1000);
    }

    function loseGame(){
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationFrame);
      fallingEmojis.forEach(f => destroyEmoji(f.el));
      gameMessage.style.display = "block";
      gameMessage.style.color = "red";
      gameMessage.textContent = "❌ You Lost!";
    }

    // start automatically
    startGame();
  }
};

levels.push(level6);
