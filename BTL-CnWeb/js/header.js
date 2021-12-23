const header_avatar = document.getElementById("avatar-header");
const btn_log_out = document.getElementById("logout-header");
const icon_hust = document.getElementById("icon-hust");
const icon_home = document.getElementById("icon-home");
const icon_search = document.getElementById("btn-search");
const input_search_filter = document.getElementById("stringfilter");
header_avatar.addEventListener('click', () => {
    window.sessionStorage.setItem('profileId', window.sessionStorage.getItem("userId"));
    window.location = `http://127.0.0.1:5500/html/profile.html`
})
btn_log_out.addEventListener('click', () => {
    window.location = `http://127.0.0.1:5500/html/login.html`
})
icon_hust.addEventListener('click', () => {
    window.location = `http://127.0.0.1:5500/html/home.html`
    console.log("ngo the tan");
})
icon_home.addEventListener('click', () => {
    window.location = `http://127.0.0.1:5500/html/home.html`
})
icon_search.addEventListener('click', () => {
    window.sessionStorage.setItem('stringfilter', input_search_filter.value);
    window.location = `http://127.0.0.1:5500/html/home.html`

})
