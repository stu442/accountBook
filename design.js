const menuCloseBtn = document.querySelector("#up_arrow");
const menuOpenBtn = document.querySelector("#nav_box_closed");
const openedMenu = document.querySelector("#form_nav_box");

function closeMenu(){
    openedMenu.style.display = "none";
    menuOpenBtn.style.display = "";
}

function openMenu(){
    menuOpenBtn.style.display = "none";
    openedMenu.style.display = "";
}

    menuCloseBtn.addEventListener('click', closeMenu);
    menuOpenBtn.addEventListener('click', openMenu);
