AOS.init();

// countdown wedding
var countdownDate = new Date("Jul 12, 2025 11:00:00").getTime()

var x = setInterval(function () {
    var now = new Date().getTime()

    var distance = countdownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 *60))
    var minutes = Math.floor((distance % (1000 * 60 *60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById('countdown-wedding').innerHTML = `
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${days}</h5> Hari</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${hours}</h5> Jam</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${minutes}</h5> Menit</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${seconds}</h5> Detik</div></div>
    `
    if (distance < 0) {
        clearInterval(x)
        document.getElementById('countdown-wedding').innerHTML = "<span class'text-center p-3 rounded text-light m-2'><h2>Sudah dimulai</h2></span>"
    }
}, 1000)

const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i')
let isPlaying = false;
const bgm = document.querySelector('#bgm');

function disableScroll() {
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    window.onscroll = function() {
        window.scrollTo(scrollTop, scrollLeft);
    }

    rootElement.style.scrollBehavior = 'auto';
}

function enableScroll() {
    window.onscroll = function() { }
    rootElement.style.scrollBehavior = 'smooth';
    // localStorage.setItem('opened', 'true');
    playAudio();
}

function playAudio() {
  bgm.volume = 0.1;
  audioIconWrapper.style.display = 'flex';
  bgm.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function() {
  if(isPlaying) {
    bgm.pause();
    audioIcon.classList.remove('bi-disc-fill');
    audioIcon.classList.add('bi-pause-circle-fill');
  } else {
    bgm.play();
    audioIcon.classList.remove('bi-pause-circle-fill');
    audioIcon.classList.add('bi-disc-fill');
  }

  isPlaying = !isPlaying;
}


disableScroll();

window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        alert("Konfirmasi kehadiran berhasil terkirim!");
      })
    });
});


const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('nama') || '';
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';

const namaContainer = document.querySelector('.hero h5 span');
namaContainer.innerText = `${pronoun} ${nama}`.replace(/ ,$/, ',');

document.querySelector('#nama').value = nama;

