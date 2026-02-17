var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "ô", "p", "q", "r", "s", "t", "u", "û", "v", "w", "y", "ŷ", "z"];

for (var i = 0; i < letters.length; i++) {
	document.getElementById("letters").innerHTML += "<a href='letter.html?v=" + letters[i] + "'>" + letters[i] + "</a>";
}

if (!document.getElementById("searchbox")) {
	document.getElementById("letters").innerHTML += '<form action="search.html" method="GET"><input type="text" class="inputbox pfont" id="searchbox" name="v"><input type="submit" class="submit pfont" value="Search"></form>';
}

if (document.getElementById("letters2") != null) {
	for (var i = 0; i < letters.length; i++) {
		document.getElementById("letters2").innerHTML += "<a href='letter.html?v=" + letters[i] + "'>" + letters[i] + "</a>";
	}
}
