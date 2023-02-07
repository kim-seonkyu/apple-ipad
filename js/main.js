import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

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
searchCloser.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});
searchShadow.addEventListener("click", hideSearch);

function showSearch() {
  header.classList.add("searching");
  stopScroll();
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
  playScroll();
  headerMenus.reverse().forEach(function (data, index) {
    data.style.transitionDelay = (index * 0.4) / headerMenus.length + "s";
  });
  searchDelay.reverse().forEach(function (data, index) {
    data.style.transitionDelay = (index * 0.4) / searchDelay.length + "s";
  });
  searchDelay.reverse();
  searchInput.value = "";
}

// Scroll 가능
function playScroll() {
  document.documentElement.classList.remove("fixed");
}
// Scroll 불가능
function stopScroll() {
  document.documentElement.classList.add("fixed");
}

// 헤데 메뉴 토글
const menuStarter = document.querySelector("header .menu-starter");
menuStarter.addEventListener("click", function () {
  if (header.classList.contains("menuing")) {
    header.classList.remove("menuing");
    searchInput.value = "";
    playScroll();
  } else {
    header.classList.add("menuing");
    stopScroll();
  }
});

// 헤더 검색
const searchTextField = document.querySelector("header .textfield");
const searchCancel = document.querySelector("header .search-canceler");

searchTextField.addEventListener("click", function () {
  header.classList.add("searching--mobile");
  searchInput.focus();
});
searchCancel.addEventListener("click", function () {
  header.classList.remove("searching--mobile");
});

// resize error fix
window.addEventListener("resize", function () {
  if (this.window.innerWidth <= 740) {
    header.classList.remove("searching");
  } else {
    header.classList.remove("searching--mobile");
  }
});

// nav toggle mobile
const nav = document.querySelector("nav");
const navMenuToggle = nav.querySelector(".menu-toggler");
const navShadow = nav.querySelector(".shadow");

navMenuToggle.addEventListener("click", function () {
  if (nav.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
nav.addEventListener("click", function (event) {
  event.stopPropagation();
});
navShadow.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  nav.classList.add("menuing");
}
function hideNavMenu() {
  nav.classList.remove("menuing");
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

//  VIDEO PLAY
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", function () {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

// '당신에게 맞는 iPad는?' 랜더링
const items = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const item = document.createElement("div");
  item.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  item.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">￦${ipad.price.toLocaleString("ko-KR")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  items.append(item);
});

// FOOTER / NAVIGATIONS 랜더링
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

// FOOTER / COPYRIGHT-YEAR
const thisYear = document.querySelector("span.this-year");
thisYear.textContent = new Date().getFullYear();
