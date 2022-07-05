const buy_button = document.getElementById("buy_button");
buy_button.addEventListener("click", cash_machine);

const disc_button = document.getElementById("disc_button");
disc_button.addEventListener("click", discount);

const add_ravioles = document.getElementById("but_ravioles");
add_ravioles.addEventListener("click", () => { make_list(array_prod[1]._id) });

const add_sorrentinos = document.getElementById("but_sorrentinos");
add_sorrentinos.addEventListener("click", () => { make_list(array_prod[2]._id) });

const add_lasagna = document.getElementById("but_lasagna");
add_lasagna.addEventListener("click", () => { make_list(array_prod[3]._id) });

const clean_button = document.getElementById("clean_button");
clean_button.addEventListener("click", () => { clean() });

const fetch_button = document.getElementById("fetch_button");
fetch_button.addEventListener("click", () => { build_JSON() });