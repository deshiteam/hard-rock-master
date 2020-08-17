// JavaScript Code Start Here

    const searchButton = document.getElementById('searchButton');
    const search = document.getElementById('search');
    const result = document.getElementById('result');


    // API URL
    const apiURL = 'https://api.lyrics.ovh';


    // Event listener Button

    searchButton.addEventListener('click', e => {
      e.preventDefault();
      searchValue = search.value.trim()
      if (!searchValue) {
        alert("There is nothing to search")
      } else {
        searchSong(searchValue)
      }
    })


    //search song 
    async function searchSong(searchValue) {
      const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
      const data = await searchResult.json();

      //console.log(finaldata)
      showData(data)
    }

    //display final result 
    function showData(data) {
        result.style.display = "block";
      result.innerHTML = `
                   ${data.data
                    .map(song => `<div class="col-md-9">
                        <h3 class="lyrics-name">${song.title} </h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                       
                        <span class="btn btn-success" id= "get-lyrics" data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                    </div>
                     ` ).join('')} 
                `;
    };

    
    const showlyrics = document.getElementById('show-lyrics');
 
    //event listener (lyrics button)
    result.addEventListener('click', e => {
      const clickedElement = e.target;

      //check condition for button
      if (clickedElement.id === 'get-lyrics') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        getLyrics(artist, songTitle)
      }
    })

    //lyrics for searched song
    async function getLyrics(artist, songTitle) {
      const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
      const data = await res.json();

      let lyrics = data.lyrics;

      if (lyrics == undefined) {
        result.innerHTML = ` <h2> Sorry lyrics not found </h2>`
      } else {
        const lyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        result.innerHTML = `<h2><strong>Artist:</strong> ${artist} <br> <strong> Song: </strong> ${songTitle}</h2> <br>
    <p>${lyric}</p>`;
      }

    }
