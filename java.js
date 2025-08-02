console.log("Starting javascript")

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

async function main() {
    //Get the list of all the songs 
    let songs = await getsongs()
    console.log(songs)

    //Show all the songs in the playlist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
                            <img src="music.svg" alt="music">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Song artis</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="play.svg" alt="play">
                            </div>
         </li>`;
    }

    //play the first song
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
        //The duratiion variable now holds the durationof the audio clip (in seconds)
    })

}
main();