function randomWord(len = 5) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let word = "";
  for (let i = 0; i < len; i++) {
    word += letters[Math.floor(Math.random() * letters.length)];
  }
  return word;
}
