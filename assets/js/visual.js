function scrollFunction() {
	var icons = document.getElementById('icon_scroll')
	var iso = document.getElementById('isotype')
	var iso_top = iso.getBoundingClientRect().top
	if (iso_top <= 0) {
		icons.className = "icon_scroll"
	}
	else {
		icons.className = "icon_static"
	}
}

window.onscroll = scrollFunction;

