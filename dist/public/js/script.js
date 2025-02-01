// Aplayer
const aplayer = document.querySelector('#aplayer');
if (aplayer) {
  let dataSong = aplayer.getAttribute('data-song');
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute('data-singer');
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics,
      }
    ],
    autoplay: false,
    volume: 0.7,
  })
  const avatar = document.querySelector(".singer-detail .inner-avatar");
  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });
  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  });
  ap.on('ended', function () {
    const link = `/songs/listen/${dataSong._id}`;
    const option = {
      method: "PATCH"
    }
    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        const elementListenSpan = document.querySelector(".singer-detail .inner-listen span");
        elementListenSpan.innerHTML = `${data.listen} lượt nghe`;
      })
  });
}
// end Aplayer

// Button Like
const buttonLike = document.querySelector("[button-like]");
if(buttonLike){
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    
    const typeLike = isActive ? "dislike" : "like";

    const option = {
      method: "PATCH"
    }

    const link = `/songs/like/${typeLike}/${idSong}`;
    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`;

          buttonLike.classList.toggle("active");
        }
      })
  });
}
// End Button Like

// button favorite
const listButtonFavorite = document.querySelectorAll('[button-favorite]');
if (listButtonFavorite && listButtonFavorite.length > 0) {
  listButtonFavorite.forEach(buttonFavorite => {
    buttonFavorite.addEventListener('click', function () {
      const idSong = buttonFavorite.getAttribute('button-favorite');
      const isActive = buttonFavorite.classList.contains('active');

      const typeFavorite = isActive ? 'unfavorite' : 'favorite';

      const link = `/songs/favorite/${typeFavorite}/${idSong}`;

      const option = {
        method: "PATCH"
      }

      fetch(link, option)
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle('active');
          }
        })
        .catch(err => console.log(err));
    });
  });
}
// end button favorite

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then(res => res.json())
      .then(data => {
        console.log("Data received:", data);
        const songs = data.songs;
        if (songs.length > 0) {
          if (boxSuggest) {
            boxSuggest.classList.add("show");

            const htmls = songs.map(song => {
              return `
                <a class="inner-item" href="/songs/detail/${song.slug}">
                  <div class="inner-image"><img src="${song.avatar}" /></div>
                  <div class="inner-info">
                    <div class="inner-title">${song.title}</div>
                    <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                  </div>
                </a>
              `;
            });

            const boxList = boxSuggest.querySelector(".inner-list");
            if (boxList) {
              boxList.innerHTML = htmls.join("");
            }
          }
        } else {
          if (boxSuggest) {
            boxSuggest.classList.remove("show");
          }
        }
      })
      .catch(err => console.log(err));
  });
}
// End Search Suggest

//Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });

}
//End Alert