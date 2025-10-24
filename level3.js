const level3 = {
  init: function() {
    const div = document.getElementById("level3");
    div.innerHTML = `
      <div class="close-btn" onclick="currentLevelObj.closeScreen()">✖</div>
      <h3>Level 3: Loading Game Assets...</h3>
      <div class="loading-bar">
        <div class="progress"></div>
      </div>
      <div class="percent">0%</div>
    `;

    // Initialize variables
    this.progress = div.querySelector('.progress');
    this.percentText = div.querySelector('.percent');
    this.width = 0;
    this.animationRunning = true;

    // Start animation
    requestAnimationFrame(() => this.updateBar());
  },

  updateBar: function() {
    if (!this.animationRunning) return;
    if (this.width < 99) {
      this.width += 0.1;
      this.progress.style.width = this.width + "%";
      this.percentText.textContent = Math.floor(this.width) + "%";
      requestAnimationFrame(() => this.updateBar());
    } else {
      this.width = 99;
      this.progress.style.width = this.width + "%";
      this.percentText.textContent = this.width + "% ⚠";
      this.progress.classList.add("blinking");
    }
  },

  closeScreen: function() {
    this.animationRunning = false;
    const div = document.getElementById("level3");
    div.innerHTML = "<h3 style='color:#ff5555;'>Loading cancelled!</h3>";
    setTimeout(() => nextLevel(), 800);
  }
};

// Push into levels array
levels.push(level3);
