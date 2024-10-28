let systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)"); 
let theme = sessionStorage.getItem('theme');

const repoName = window.repoName;
const iconSun = repoName + "/assets/img/sun.svg";
const iconMoon = repoName + "/assets/img/moon.svg";

document.addEventListener("DOMContentLoaded", function() {
  function changeIconImgSrc(src) {
      var themeToggleImg = document.getElementById("theme-toggle-img");
      var themeToggleImgMobile = document.getElementById("theme-toggle-img-mobile");

      if (themeToggleImg) {
          themeToggleImg.src = src;
      } else {
          console.error('Element with id "theme-toggle-img" not found.');
      }

      if (themeToggleImgMobile) {
          themeToggleImgMobile.src = src;
      } else {
          console.error('Element with id "theme-toggle-img-mobile" not found.');
      }
  }

  window.changeIconImgSrc = changeIconImgSrc;

  // Initial theme setup
  if (systemInitiatedDark.matches) {
    changeIconImgSrc(iconMoon);
  } else {
    changeIconImgSrc(iconSun);
  }

  if (theme === "dark") {
    document.documentElement.setAttribute('data-theme', 'dark');
    sessionStorage.setItem('theme', 'dark');
    changeIconImgSrc(iconMoon);
  } else if (theme === "light") {
    document.documentElement.setAttribute('data-theme', 'light');
    sessionStorage.setItem('theme', 'light');
    changeIconImgSrc(iconSun);
  }

  function prefersColorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');		
      changeIconImgSrc(iconMoon);
      sessionStorage.setItem('theme', '');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      changeIconImgSrc(iconSun);
      sessionStorage.setItem('theme', '');
    }
  }

  systemInitiatedDark.addEventListener('change', prefersColorTest);

  window.modeSwitcher = function() {
    let theme = sessionStorage.getItem('theme');
    if (theme === "dark") {
      document.documentElement.setAttribute('data-theme', 'light');
      sessionStorage.setItem('theme', 'light');
      changeIconImgSrc(iconSun);
    } else if (theme === "light") {
      document.documentElement.setAttribute('data-theme', 'dark');
      sessionStorage.setItem('theme', 'dark');
      changeIconImgSrc(iconMoon);
    } else if (systemInitiatedDark.matches) {	
      document.documentElement.setAttribute('data-theme', 'light');
      sessionStorage.setItem('theme', 'light');
      changeIconImgSrc(iconSun);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      sessionStorage.setItem('theme', 'dark');
      changeIconImgSrc(iconMoon);
    }
  };
});
