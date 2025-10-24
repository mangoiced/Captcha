const level8 = {
  init: function() {
    const div = document.getElementById("level8");
    div.innerHTML = `
      <h3>Level 8: Select all Vehicles</h3>
      <form id="captchaForm">
        <div class="puzzle">
          <input type="checkbox" id="c0" class="tile-input"><label for="c0" class="tile t0"></label>
          <input type="checkbox" id="c1" class="tile-input"><label for="c1" class="tile t1"></label>
          <input type="checkbox" id="c2" class="tile-input"><label for="c2" class="tile t2"></label>
          <input type="checkbox" id="c3" class="tile-input"><label for="c3" class="tile t3"></label>
          <input type="checkbox" id="c4" class="tile-input"><label for="c4" class="tile t4"></label>
          <input type="checkbox" id="c5" class="tile-input"><label for="c5" class="tile t5"></label>
          <input type="checkbox" id="c6" class="tile-input"><label for="c6" class="tile t6"></label>
          <input type="checkbox" id="c7" class="tile-input"><label for="c7" class="tile t7"></label>
          <input type="checkbox" id="c8" class="tile-input"><label for="c8" class="tile t8"></label>
        </div>
        <button id="verifyBtn">Verify</button>
      </form>

      <div class="result" id="resultBox">
        <div class="success" id="successMsg">✅ Verified!</div>
        <div class="fail" id="failMsg">❌ Try again.</div>
      </div>
    `;

    const form = div.querySelector("#captchaForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const c3 = div.querySelector("#c3");
    const c5 = div.querySelector("#c5");
    const resultBox = div.querySelector("#resultBox");
    const success = div.querySelector("#successMsg");
    const fail = div.querySelector("#failMsg");

    // count how many checkboxes are checked in this form
    const totalChecked = div.querySelectorAll(".tile-input:checked").length;

    resultBox.style.display = "block";

    if (c3.checked && c5.checked && totalChecked === 2) {

      success.style.display = "block";
      fail.style.display = "none";
      setTimeout(() => nextLevel(), 800);  // keep your nextLevel call
    } else {
      success.style.display = "none";
      fail.style.display = "block";
    }
  });

  }
};

levels.push(level8);
