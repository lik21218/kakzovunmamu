// let modalBtns = document.querySelectorAll(".modal-open"); // Исправлено с model-open на modal-open

// modalBtns.forEach(function (btn) {
//   btn.onclick = function () {
//     let modalId = btn.getAttribute("data-modal");
    
//     let modal = document.getElementById(modalId);
//     if (modal) {
//       modal.style.display = "flex";
//     }
//   };
// });

// let closeBtns = document.querySelectorAll('.close-btn');
// closeBtns.forEach(function(btn) {
//     btn.onclick = function () {
//         let modal = btn.closest('.modal').style.display = 'none';
//     }
// })
const modalBtns = document.querySelectorAll(".modal-open");
const modals = document.querySelectorAll(".modal");
const closeBtns = document.querySelectorAll(".close-btn");

// Открытие
modalBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const m = document.getElementById(btn.dataset.modal);
    if(!m) return;
    m.style.display="flex";
    document.body.style.overflow="hidden";
    
    const v = m.querySelector("video");
    if(v){
      v.muted = false;      // включаем озвучку
      v.volume = 0.8;       // громкость 80%
      v.currentTime = 0;    // с начала
      v.play().catch(()=>{
        // если браузер все равно зарезал звук — оставляем с muted и показываем подсказку
        v.muted = true;
        v.play();
        console.log("Браузер заблокировал звук, юзер должен сам нажать на иконку громкости");
      });
    }
  });
});

function closeModal(modal){
  modal.style.display="none";
  document.body.style.overflow="";
  const v = modal.querySelector("video");
  if(v){ 
    v.pause(); 
    v.muted = true; // на закрытии снова глушим, чтобы в след. раз автоплей сработал
  }
}

// Закрытие по крестику и кнопке Got it
closeBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

// Закрытие по клику вне контента / вне видео
modals.forEach(modal => {
  modal.addEventListener("click", (e) => {
    // если клик именно по оверлею, а не по дочерним элементам
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // чтобы клик по видео не закрывал модалку
  const video = modal.querySelector("video");
  if (video) {
    video.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});

// Закрытие по Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach(m => {
      if (m.style.display === "flex") closeModal(m);
    });
  }
});

// Добавим также закрытие по кретику и клику вне окна 


