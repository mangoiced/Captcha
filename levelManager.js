let levels = [];
let currentLevel = 0;
let currentLevelObj = null;

function goToLevel(index){
  // Remove previous level completely
  if(currentLevelObj){
    const prevDiv = document.getElementById(`level${currentLevel+1}`);
    prevDiv.innerHTML = "";  // clear its content
    prevDiv.classList.remove('active');
  }

  const lvlDiv = document.getElementById(`level${index+1}`);
  if(lvlDiv){
    lvlDiv.classList.add('active');
  }

  currentLevel = index;
  currentLevelObj = levels[index];
  currentLevelObj.init();
}

function nextLevel(){
  if(currentLevel + 1 < levels.length){
    goToLevel(currentLevel + 1);
  } else {
    alert("🎉 You finished all levels!");
  }
}
