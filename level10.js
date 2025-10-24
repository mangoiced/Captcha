const level10 = {
  init: function() {
    const div = document.getElementById("level10");
    div.innerHTML = `
      <div class="preference">
        <label for="fakeCheck">I'm not a robot</label>
        <button id="fakeCheck" type="button" class="virus-btn"></button>
      </div>
    `;

    // Function to trigger the virus alerts
    const btn = div.querySelector("#fakeCheck");
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => {
        alert("WARNING: virus.exe");
        alert("0x8050: ERROR 404");
        alert("Viruses found(3)");
        alert("Download Complete");
        alert("Download Complete");
        alert("Download Complete");
        alert("Download Complete");        
      }, 1000);
    });
  }
};

levels.push(level10);
