// 장바구니
const basketStarter = document.querySelector("header .basket-starter");
const basket = basketStarter.querySelector(".basket");

basketStarter.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basket.classList.contains("show")) {
    // hide
    hideBasket();
  } else {
    // show
    showBasket();
  }
});

basket.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", hideBasket);

function showBasket() {
  basket.classList.add("show");
}
function hideBasket() {
  basket.classList.remove("show");
}

// 검색
const header = document.querySelector("header");
const headerMenus = [...header.querySelectorAll("ul.menu > li")];
const searchStarter = header.querySelector(".search-starter");
const searchWrap = header.querySelector(".search-wrap");
const searchCloser = searchWrap.querySelector(".search-closer");
const searchShadow = searchWrap.querySelector(".shadow");
const searchInput = searchWrap.querySelector("input");
const searchDelay = [...searchWrap.querySelectorAll("li")];

searchStarter.addEventListener("click", showSearch);
searchCloser.addEventListener("click", hideSearch);
searchShadow.addEventListener("click", hideSearch);

function showSearch() {
  header.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenus.reverse().forEach(function (data, index) {
    data.style.transitionDelay = (index * 0.4) / headerMenus.length + "s";
  });
  searchDelay.forEach(function (data, index) {
    data.style.transitionDelay = (index * 0.4) / searchDelay.length + "s";
  });
  setTimeout(function () {
    searchInput.focus();
  }, 600);
}
function hideSearch() {
  header.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenus.reverse().forEach(function (data, index) {
    data.style.transitionDelay = (index * 0.4) / headerMenus.length + "s";
  });
  searchDelay.reverse().forEach(function (data, index) {
    data.style.transitionDelay = (index * 0.4) / searchDelay.length + "s";
  });
  searchDelay.reverse();
  searchInput.value = "";
}

// 요소의 가시성 관찰 (보이는지 안보이는지 확인)
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});
// 관찰할 대상 설정
const infos = document.querySelectorAll(".info");
// 관찰 시작
infos.forEach((el) => io.observe(el));
