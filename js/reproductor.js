const video = document.querySelector(".video-principal");
const btnPlay = document.getElementById("btn-play");
const btnCentro = document.getElementById("btn-centro");
const btnVolumen = document.getElementById("btn-volumen");
const btnFull = document.getElementById("btn-full");
const barraProgreso = document.querySelector(".progreso-actual");
const contenedorBarra = document.querySelector(".barra-total");
const tiempoTexto = document.querySelector(".tiempo");

function reproducir() {
  if (video.paused) {
    video.play();
    btnPlay.innerText = "Pausa";
    btnCentro.style.visibility = "hidden";
  } else {
    video.pause();
    btnPlay.innerText = "Play";
    btnCentro.style.visibility = "visible";
  }
}

video.addEventListener("loadedmetadata", () => {
  actualizarTiempoTexto();
});

function actualizarTiempoTexto() {
  let curMin = Math.floor(video.currentTime / 60);
  let curSeg = Math.floor(video.currentTime % 60);
  let durMin = Math.floor(video.duration / 60) || 0;
  let durSeg = Math.floor(video.duration % 60) || 0;

  tiempoTexto.innerText = `${curMin}:${curSeg < 10 ? "0" + curSeg : curSeg} / ${durMin}:${durSeg < 10 ? "0" + durSeg : durSeg}`;
}

video.addEventListener("timeupdate", () => {
  const porcentaje = (video.currentTime / video.duration) * 100;
  barraProgreso.style.width = `${porcentaje}%`;
  actualizarTiempoTexto();
});

const sliderVolumen = document.getElementById("slider-volumen");

sliderVolumen.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value == 0;
});

contenedorBarra.addEventListener('click', (e) => {
    const pct = e.offsetX / contenedorBarra.offsetWidth;
    video.currentTime = pct * video.duration;
});

btnPlay.addEventListener("click", reproducir);
btnCentro.addEventListener("click", reproducir);
btnFull.addEventListener("click", () => video.requestFullscreen());
