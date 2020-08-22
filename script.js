document.querySelector(".search-result").style.display = "none";

document.querySelector(".search-btn").addEventListener("click", function(){
    const songTitle = document.querySelector(".search-box").value;
    // Fetching the given song in search-box by api
    fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
    .then(response => response.json())
    .then(songData => {
        // Picking only 10 data
        const data = songData.data.slice(0, 10);
        // Getting results div
        const results = document.querySelectorAll(".song-result"); 
        // Clearing results
        for (let i = 0; i < data.length; i++) {
            results[i].innerHTML = ""; 
        }
        for (let i = 0; i < data.length; i++) {
            const songInfo = data[i];
            const p = document.createElement("p");
            p.innerHTML = `
                <h3> ${songInfo.title} </h3><br>
                <h6> Album By : ${songInfo.artist.name} </h6><br>
                <h6> Album : ${songInfo.album.title} </h6><br>
                <h6> Duration : ${songInfo.duration} seconds</h6><br>
            `;
            results[i].appendChild(p);
            // Fetching lyrics from api after clicking get-lyrics button
            document.querySelectorAll(".get-lyrics")[i].addEventListener("click", function(){
                fetch(`https://private-amnesiac-54e3e1-lyricsovh.apiary-proxy.com/v1/${songInfo.artist.name}/${songInfo.title}?lyrics=`)
                .then(response => response.json())
                .then(songData => {
                    document.querySelector(".lyrics").innerHTML = `<h1 class="green-color"> ${songInfo.title} </h1><br><br>${songData.lyrics}`;
                })
            });
        }
        document.querySelector(".search-result").style.display = "block";
    })

});

