const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
document.getElementById('refresh-btn').addEventListener('click', () => {
    location.reload(); 
});


btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
               sound.setAttribute("src", `${data[0].phonetics[1].audio}`); 

            const audioSrc = data[0].phonetics[0]?.sound;
            if (audioSrc) {
                sound.setAttribute("src", audioSrc.startsWith('https') ? audioSrc : `https:${audioSrc}`);
            } else {
                console.log("No audio available for this word.");
            }

        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound() {
    sound.play();
}

