const level5 = {
  init: function() {
    const div = document.getElementById("level5");
    div.innerHTML = `
      <h3>Level 5: Reassemble the Flower</h3>
      <div id="puzzle" class="puzzle"></div>
      <button id="verifyBtn">Verify</button>
      <div id="status" class="status"></div>
    `;

    // Initialize puzzle
    const puzzle = div.querySelector('#puzzle');
    const statusBox = div.querySelector('#status');
    const size = 3;
    const tiles = [];
    const excludedTileIndex = Math.floor(Math.random() * (size * size));

    // Create tiles
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.backgroundImage = "url('images/flower.webp')";
        tile.style.backgroundSize = "300% 300%"; // 3x3 tiles, each 1/3
        tile.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
        tile.dataset.correctRotation = "0";

        // Random rotation
        const rotations = [0,90,180,270];
        let randRot = rotations[Math.floor(Math.random()*rotations.length)];
        tile.dataset.rotation = randRot;
        tile.style.transform = `rotate(${randRot}deg)`;

        if (tiles.length === excludedTileIndex) {
          tile.dataset.excluded = "true";
        }

        tile.addEventListener('click', () => {
          let rot = (parseInt(tile.dataset.rotation) + 90);
          if (tile.dataset.excluded && (rot % 360 === 0)) rot = 90; 
          tile.dataset.rotation = rot;
          tile.style.transform = `rotate(${rot}deg)`;
        });

        puzzle.appendChild(tile);
        tiles.push(tile);
      }
    }

    // Verify button
    div.querySelector('#verifyBtn').addEventListener('click', () => {
      const solved = tiles
        .filter(t => !t.dataset.excluded)
        .every(t => parseInt(t.dataset.rotation) % 360 === 0);

      if (solved) {
        statusBox.textContent = "✅ Correct! Advancing...";
        statusBox.style.color = "green";
        setTimeout(() => nextLevel(), 800);
      } else {
        statusBox.textContent = "❌ Incorrect";
        statusBox.style.color = "red";
      }
    });
  }
};

levels.push(level5);
