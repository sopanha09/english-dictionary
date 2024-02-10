const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";

    infoTextEl.innerText = `Search the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.status);
    }

    const result = await res.json();

    infoTextEl.style.display = "none";
    meaningContainerEl.style.display = "block";
    audioEl.style.display = "inline-flex";

    titleEl.innerText = result[0].word;
    meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
    audioEl.src = result[0].phonetics[0].audio;
  } catch (error) {
    console.log(error);
    meaningContainerEl.style.display = "block";
    infoTextEl.style.display = "none";

    titleEl.innerText = word;
    meaningEl.innerText = "N/A";
    audioEl.style.display = "none";
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
