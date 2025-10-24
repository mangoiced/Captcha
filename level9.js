const level9 = {
  init: function () {
    const div = document.getElementById("level9");
    div.innerHTML = `
      <h3>Level 9: Dodge</h3>
      <div id="score">Score: 0</div>
      <canvas id="gameCanvas" width="400" height="600"></canvas>

      <div class="level9-typingArea">
        <input type="text" id="typingInput" placeholder="">
        <div id="message"></div>
      </div>
    `;

    // ---------- GAME LOGIC ----------
    const canvas = div.querySelector('#gameCanvas');
    const ctx = canvas.getContext('2d');

    let player = {
      x: canvas.width / 2 - 10,
      y: canvas.height - 50,
      width: 20,
      height: 8,
      speed: 10,
      color: '#000'
    };

    let objects = [];
    let score = 0;
    let gameOver = false;
    let won = false;

    function spawnObject() {
      const size = Math.random() * 20 + 20;
      objects.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: Math.random() * 3 + 2,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      });
    }

    function drawPlayer() {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawObjects() {
      objects.forEach(obj => {
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      });
    }

    function moveObjects() {
      objects.forEach(obj => { obj.y += obj.speed; });
      objects = objects.filter(obj => obj.y < canvas.height);
    }

    function checkCollision() {
      for (let obj of objects) {
        if (
          player.x < obj.x + obj.width &&
          player.x + player.width > obj.x &&
          player.y < obj.y + obj.height &&
          player.y + player.height > obj.y
        ) {
          gameOver = true;
        }
      }
    }

    function updateScore() {
      score += 1;
      div.querySelector('#score').innerText = 'Score: ' + score;
    }

    // Movement
    let keys = {};
    document.addEventListener('keydown', (e) => keys[e.key] = true);
    document.addEventListener('keyup', (e) => keys[e.key] = false);

    function handleMovement() {
      if (keys['ArrowLeft']) {
        player.x -= player.speed;
        if (player.x < 0) player.x = 0;
      }
      if (keys['ArrowRight']) {
        player.x += player.speed;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
      }
    }

    // Typing input
    const typingInput = div.querySelector('#typingInput');
    const message = div.querySelector('#message');

    typingInput.addEventListener('input', () => {
      const text = typingInput.value.trim().toLowerCase();
      if (text === 'dodge') {
        won = true;
        gameOver = true;
        message.textContent = '✅ You typed "DODGE" correctly! You win 🎉';
        setTimeout(() => nextLevel(), 1000);
      }
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPlayer();
      drawObjects();
    }

    function update() {
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(won ? 'You Win!' : 'Game Over', canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 40);
        return;
      }
      handleMovement();
      moveObjects();
      checkCollision();
      draw();
    }

    setInterval(() => { if (!gameOver) spawnObject(); }, 1000);
    setInterval(() => { if (!gameOver) updateScore(); }, 200);

    function gameLoop() {
      update();
      requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }
};

levels.push(level9);
