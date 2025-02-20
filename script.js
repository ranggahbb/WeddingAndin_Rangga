AOS.init();

// const rootElement = document.querySelector(":root");
// const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
// const audioIcon = document.querySelector('.audio-icon-wrapper i')
// let isPlaying = false;
// const bgm = document.querySelector('#bgm');

// function disableScroll() {
//     scrollTop = window.scrollY || document.documentElement.scrollTop;
//     scrollLeft = window.scrollX || document.documentElement.scrollLeft;

//     window.onscroll = function() {
//         window.scrollTo(scrollTop, scrollLeft);
//     }

//     rootElement.style.scrollBehavior = 'auto';
// }

// function enableScroll() {
//     window.onscroll = function() { }
//     rootElement.style.scrollBehavior = 'smooth';
//     // localStorage.setItem('opened', 'true');
//     playAudio();
// }

// function playAudio() {
//   bgm.volume = 0.1;
//   audioIconWrapper.style.display = 'flex';
//   bgm.play();
//   isPlaying = true;
// }

// audioIconWrapper.onclick = function() {
//   if(isPlaying) {
//     bgm.pause();
//     audioIcon.classList.remove('bi-disc-fill');
//     audioIcon.classList.add('bi-pause-circle-fill');
//   } else {
//     bgm.play();
//     audioIcon.classList.remove('bi-pause-circle-fill');
//     audioIcon.classList.add('bi-disc-fill');
//   }

//   isPlaying = !isPlaying;
// }


// disableScroll();

// navbar js
const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNavbar'));
        offcanvas.hide();
      });
    });


// gift js
$(document).ready(function() {
  var $btnRekening = $('#btnRekening');
  var $btnAlamat = $('#btnAlamat');
  var $collapseHadiah = $('#collapseHadiah');
  var $collapseAlamat = $('#collapseAlamat');

  function toggleCollapse(targetElement) {
    if (targetElement.is($collapseHadiah)) {
      $collapseHadiah.toggleClass('show');
      $collapseAlamat.removeClass('show');
      $collapseAlamat.addClass('collapse');
    }
    else if (targetElement.is($collapseAlamat)) {
      $collapseAlamat.toggleClass('show');
      $collapseHadiah.removeClass('show');
      $collapseHadiah.addClass('collapse');
    }
  }

  $btnRekening.on('click', function(e) {
    e.preventDefault();
    toggleCollapse($collapseHadiah);
  });

  $btnAlamat.on('click', function(e) {
    e.preventDefault();
    toggleCollapse($collapseAlamat);
  });

  
  $(document).on('click', function(e) {
    if ($(e.target).closest('#gift').length) {
      $('#collapseHadiah, #collapseAlamat').removeClass('show').addClass('collapse');
    }
  });
});


function copyText(el, event) {
  event.stopPropagation();
  var cardContainer = jQuery(el).siblings('div.card-container');
  var isAlamat = cardContainer.find('.alamat').length > 0;

  var content = cardContainer.find('.card-number').text().trim();

  var textToCopy = isAlamat ? content : content.replace(/\s+/g, '');


  navigator.clipboard.writeText(textToCopy)
      .then(() => {
          
          jQuery(el).text('Berhasil di copy');

          
          setTimeout(function () {
              jQuery(el).html(`<i class="bi bi-copy"></i> Copy`);
          }, 1000);
      })
      .catch((err) => {
          
          console.error('Gagal menyalin teks: ', err);
          jQuery(el).text('Gagal menyalin');
      });
}

const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('nama') || '';
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';

const namaContainer = document.querySelector('.hero h5 span');
namaContainer.innerText = `${pronoun} ${nama}`.replace(/ ,$/, ',');

document.querySelector('#nama').value = nama;



// Pastikan kode ini dijalankan setelah dokumen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
  const sheetDBApiUrl = 'https://sheetdb.io/api/v1/4rrxsy7lhwl4x'; // Ganti dengan API ID Anda
  const rsvpList = document.getElementById('rsvp-list');
  const form = document.getElementById('my-form'); // Ganti 'my-form' dengan ID formulir Anda

  // Fungsi untuk menampilkan data (seperti sebelumnya)
  function displayRsvpData() {
    fetch(sheetDBApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          rsvpList.innerHTML = ''; // Bersihkan daftar sebelum menambahkan data baru
          data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<b>${item.nama} (${item.kehadiran}),</b><br><p>${item.ucapan}<p>`;
            rsvpList.appendChild(listItem);
          });
        } else {
          console.error('Data yang diterima dari SheetDB bukan array:', data);
          rsvpList.textContent = 'Terjadi kesalahan saat memuat data.';
        }
      })
      .catch(error => {
        console.error('Gagal mengambil data dari SheetDB:', error);
        rsvpList.textContent = 'Terjadi kesalahan saat memuat data.';
      });
  }

  // Panggil fungsi untuk menampilkan data saat halaman dimuat
  displayRsvpData();

  // Cegah pengiriman formulir default dan kirim data dengan fetch
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman formulir default

    // Kumpulkan data formulir
    const formData = new FormData(form);

    // Kirim data ke SheetDB dengan fetch
    fetch(sheetDBApiUrl, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Tampilkan pesan sukses (gunakan window.alert atau SweetAlert2)
      window.alert('Data berhasil dikirim!');

      // Reset formulir
      form.reset();

      // Perbarui tampilan data
      displayRsvpData();
    })
    .catch(error => {
      console.error('Gagal mengirim data ke SheetDB:', error);
      window.alert('Terjadi kesalahan saat mengirim data.');
    });
  });
});