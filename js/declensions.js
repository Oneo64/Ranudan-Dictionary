const noun_declensions = {
	masculine: [
		"", "inn", "ar", "arnir",
		"u", "unu", "ar", "arnir",
		"i", "inum", "um", "unum",
		"s", "sins", "a", "anna",
	],
	masculine_r: [
		"", "rinn", "ar", "arnir",
		"u", "unu", "ar", "arnir",
		"i", "inum", "um", "unum",
		"s", "sins", "a", "anna",
	],
	masculine_r2: [
		"", "inn", "ir", "irnir",
		"u", "unu", "ir", "irnir",
		"i", "inum", "um", "unum",
		"s", "sins", "a", "anna",
	],
	masculine_i: [
		"", "inn", "ar", "arnir",
		"a", "anu", "ar", "arnir",
		"a", "anum", "um", "unum",
		"a", "ans", "a", "anna",
	],
	masculine_dr: [
		"", "inn", "ar", "arnir",
		"u", "inn", "a", "ana",
		"i", "inum", "um", "unum",
		"s", "sins", "a", "anna",
	],
	masculine_ir: [
		"", "irinn", "r", "rnir",
		"ur", "urnu", "r", "rnir",
		"ur", "urnum", "rum", "runum",
		"ur", "urins", "ra", "ranna",
	],
	masculine_ir2: [
		"", "inn", "íri", "ærinn",
		"u", "ynu", "íri", "ærinn",
		"i", "ynum", "yrjum", "ærunum",
		"is", "ins", "yrja", "æranna",
	],
	masculine_ill: [
		"", "illinn", "lar", "larnir",
		"illu", "lunu", "lar", "larnir",
		"illi", "linum", "lum", "lunum",
		"ills", "lins", "la", "lanna",
	],
	feminine: [
		"", "in", "ir", "irnar",
		"", "ina", "ir", "irnar",
		"", "inni", "um", "unum",
		"ar", "arinnar", "a", "anna",
	],
	feminine_a: [
		"", "an", "ir", "irnar",
		"u", "una", "ir", "irnar",
		"u", "unni", "um", "unum",
		"u", "unnar", "a", "anna",
	],
	feminine_ja: [
		"", "an", "ar", "arnar",
		"u", "una", "ar", "arnar",
		"u", "unni", "um", "unum",
		"u", "unnar", "a", "anna",
	],
	feminine_ei: [
		"", "énn", "jar", "jarnar",
		"", "énna", "jar", "jarnar",
		"", "énni", "jum", "junum",
		"z", "jar", "ja", "janna",
	],
	feminine_ir: [
		"", "irin", "r", "rnar",
		"ur", "urina", "r", "rnar",
		"ur", "urinni", "rum", "runum",
		"ur", "urinnar", "ra", "ranna",
	],
	neuter: [
		"", "it", "ur", "urnir",
		"", "it", "ur", "urnir",
		"i", "inni", "um", "unum",
		"s", "sins", "a", "anna",
	],
	neuter_á: [
		"á", "áet", "eyr", "eyrnar",
		"á", "áet", "eyr", "eyrnar",
		"æ", "æinni", "eyjum", "eyjunum",
		"ás", "ásins", "eyja", "eyjanna",
	]
};

function get_noun_declension(w, t) {
	if (w in special_declensions) {
		return special_declensions[w];
	}

	if (w.includes("-") && w.substring(w.indexOf("-") + 1) in special_declensions) {
		var declension = special_declensions[w.substring(w.indexOf("-") + 1)];

		for (var i = 0; i < declension.length; i++) {
			declension[i] = w.substring(0, w.indexOf("-") + 1) + declension[i];
		}

		return declension;
	}

	var vowels = "aáæeéiíoóöuúyý";

	var declension = [];
	var word = w.replaceAll("-", "");

	if (word.endsWith(")")) word = word.substring(0, word.length - 4);
	
	if (word.endsWith("nir")) {
		for (var i = 0; i < 16; i++) {
			if (noun_declensions.masculine_ir2[i] == "") {
				declension.push(word);
			} else {
				declension.push(word.substring(0, word.length - 2) + noun_declensions.masculine_ir2[i]);
			}
		}
	} else if (t == "masculine noun") {
		if (word.endsWith("ir")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine_ir[i] == "") {
					declension.push(word);
				} else if (word.charAt(word.length - 4) == "ó" && noun_declensions.masculine_ir[i].startsWith("r")) {
					declension.push(word.substring(0, word.length - 4) + "æ" + word.charAt(word.length - 3) + noun_declensions.masculine_ir[i]);
				} else if (word.charAt(word.length - 4) == "a" && noun_declensions.masculine_ir[i].startsWith("r")) {
					declension.push(word.substring(0, word.length - 4) + "e" + word.substring(word.length - 3, word.length - 2) + noun_declensions.masculine_ir[i]);
				} else if (word.charAt(word.length - 5) == "ó" && noun_declensions.masculine_ir[i].startsWith("r")) {
					declension.push(word.substring(0, word.length - 5) + "æ" + word.substring(word.length - 4, word.length - 2) + noun_declensions.masculine_ir[i]);
				} else if (word.charAt(word.length - 5) == "a" && noun_declensions.masculine_ir[i].startsWith("r")) {
					declension.push(word.substring(0, word.length - 5) + "e" + word.substring(word.length - 4, word.length - 2) + noun_declensions.masculine_ir[i]);
				} else {
					declension.push(word.substring(0, word.length - 2) + noun_declensions.masculine_ir[i]);
				}
			}
		} else if (word.endsWith("dr")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine_dr[i] == "") {
					declension.push(word);
				} else {
					declension.push(word + noun_declensions.masculine_dr[i]);
				}
			}
		} else if (word.endsWith("spr") || word.endsWith("ptr") || word.endsWith("gðr")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine_r2[i] == "") {
					declension.push(word);
				} else {
					declension.push(word.substring(0, word.length - 1) + noun_declensions.masculine_r2[i]);
				}
			}
		} else if (word.endsWith("r")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine_r[i] == "") {
					declension.push(word);
				} else {
					declension.push(word.substring(0, word.length - 1) + noun_declensions.masculine_r[i]);
				}
			}
		} else if (word.endsWith("i")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine_i[i] == "") {
					declension.push(word);
				} else {
					declension.push(word.substring(0, word.length - 1) + noun_declensions.masculine_i[i]);
				}
			}
		} else if (!vowels.includes(word.charAt(word.length - 4)) && word.endsWith("ill")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine_ill[i] == "") {
					declension.push(word);
				} else {
					declension.push(word.substring(0, word.length - 3) + noun_declensions.masculine_ill[i]);
				}
			}
		} else if (word.charAt(word.length - 1) == word.charAt(word.length - 2) && !word.endsWith("ll")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine[i] == "") {
					declension.push(word);
				} else {
					declension.push(word.substring(0, word.length - 1) + noun_declensions.masculine[i]);
				}
			}
		} else {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.masculine[i] == "") {
					declension.push(word);
				} else {
					declension.push(word + noun_declensions.masculine[i]);
				}
			}
		}
	} else if (t == "feminine noun") {
		if (word.endsWith("ir")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.feminine_ir[i] == "") {
					declension.push(word);
				} else if (word.charAt(word.length - 4) == "ó" && noun_declensions.feminine_ir[i].startsWith("r")) {
					declension.push(word.substring(0, word.length - 4) + "æ" + word.charAt(word.length - 3) + noun_declensions.feminine_ir[i]);
				} else if (word.charAt(word.length - 5) == "ó" && noun_declensions.feminine_ir[i].startsWith("r")) {
					declension.push(word.substring(0, word.length - 5) + "æ" + word.substring(word.length - 4, word.length - 2) + noun_declensions.feminine_ir[i]);
				} else {
					declension.push(word.substring(0, word.length - 2) + noun_declensions.feminine_ir[i]);
				}
			}
		} else if (word.endsWith("ja")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.feminine_ja[i] == "") {
					declension.push(word);
				} else {
					declension.push(word.substring(0, word.length - 1) + noun_declensions.feminine_ja[i]);
				}
			}
		} else if (word.endsWith("a")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.feminine_a[i] == "") {
					declension.push(word);
				} else {
					declension.push(word.substring(0, word.length - 1) + noun_declensions.feminine_a[i]);
				}
			}
		} else if (word.endsWith("ei")) {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.feminine_ei[i] == "") {
					declension.push(word);
				} else {
					declension.push(word + noun_declensions.feminine_ei[i]);
				}
			}
		} else {
			for (var i = 0; i < 16; i++) {
				if (noun_declensions.feminine[i] == "") {
					declension.push(word);
				} else {
					declension.push(word + noun_declensions.feminine[i]);
				}
			}
		}
	} else if (word.endsWith("i")) {
		for (var i = 0; i < 16; i++) {
			if (noun_declensions.neuter[i] == "" || (word.endsWith("vi") && (noun_declensions.neuter[i] == " " || noun_declensions.neuter[i] == "i"))) {
				declension.push(word);
			} else {
				if (word.endsWith("vi") && (!"aui".includes(noun_declensions.neuter[i].charAt(0)))) {
					declension.push(word + noun_declensions.neuter[i]);
				} else {
					declension.push(word.substring(0, word.length - 1) + noun_declensions.neuter[i]);
				}
			}
		}
	} else if (word.endsWith("á")) {
		for (var i = 0; i < 16; i++) {
			if (noun_declensions.neuter_á[i] == "") {
				declension.push(word);
			} else {
				declension.push(word.substring(0, word.length - 1) + noun_declensions.neuter_á[i]);
			}
		}
	} else {
		for (var i = 0; i < 16; i++) {
			if (noun_declensions.neuter[i] == "") {
				declension.push(word);
			} else {
				declension.push(word + noun_declensions.neuter[i]);
			}
		}
	}

	for (var i = 0; i < 16; i++) {
		declension[i] = declension[i].replace("sss", "ss");
	}

	return declension;
}

function add_verb_ending_basic(word, ending) {
	if (word.endsWith("e")) {
		if (ending == "u") {
			return word.substring(0, word.length - 1) + "ý";
		} else {
			return word.substring(0, word.length - 1) + "andi";
		}
	}

	if (word.endsWith("a")) {
		return word.substring(0, word.length - 1) + ending;
	}

	return word + ending;
}

function add_adj_ending_basic(w, ending) {
	var word = w;
	var vowels = "aáæeéiíoóöuúyý";

	if (word.endsWith("ill")) {
		word = word.substring(0, word.length - 3) + "t";
	}

	if (word.endsWith("nn")) return word.substring(0, word.length - 1) + ending;

	if (word.endsWith("r") && !vowels.includes(word.charAt(word.length - 2))) {
		if (ending == "") {
			if (word.endsWith("ðr") || word.endsWith("tr")) {
				return word.substring(0, word.length - 2) + "tt";
			}

			if (word.endsWith("dr")) {
				return word.substring(0, word.length - 2) + "t";
			}

			if (word.endsWith("llr") || word.endsWith("mr") || word.endsWith("nr") || word.endsWith("gr") || word.endsWith("kr")) {
				return word.substring(0, word.length - 1) + "t";
			}
		} else {
			if (word.endsWith("ligr")) {
				if (ending == "a") return word.substring(0, word.length - 1) + "t";

				if (ending.endsWith("a") && !ending.endsWith("na")) {
					return word.substring(0, word.length - 1) + ending.substring(0, ending.length - 1);
				} else {
					return word.substring(0, word.length - 1) + ending;
				}
			}
		}
		
		return word.substring(0, word.length - 1) + ending;
	}

	if (word.endsWith("an") && ending == "na") {
		return word.substring(0, word.length - 2) + "ir";
	}

	return word + ending;
}

function get_past_tense(word) {
	if (word in special_declensions && "past_tense" in special_declensions[word]) {
		return special_declensions[word]["past_tense"];
	}

	var stem = word.substring(0, word.length - 1);
	var vowels = "aáæeéiíoóöuúyý";
	var duplicate_exception = "aáæeéiíoóöuúyýnml";

	// makes sure that only -a verb endings are removed
	if ("áæeéiíoóöuúyý".includes(word.charAt(word.length - 1))) stem = word;

	var last_letter = stem.charAt(stem.length - 1);
	var last_2_letters = last_letter;

	if (word.length >= 3) last_2_letters = stem.charAt(stem.length - 2) + stem.charAt(stem.length - 1);

	var a = duplicate_exception.includes(stem.charAt(stem.length - 2));
	var b = vowels.includes(stem.charAt(stem.length - 2));

	if ("mn".includes(last_letter) && (!word.endsWith("na") || word.endsWith("nna"))) {
		return stem + "di";
	}

	if ("bkpszð".includes(last_letter) || last_2_letters == "lf") {
		return stem + "ti";
	}

	if (word.length >= 3 && (a || stem == word)) {
		if (last_letter == "á") {
			return stem.substring(0, stem.length - 1) + "æði";
		}

		if ("frgd".includes(last_letter) || vowels.includes(last_letter)) {
			return stem + "ði";
		}

		if (stem.endsWith("eyj")) {
			return stem.substring(0, stem.length - 1) + "ði";
		}

		if (stem.endsWith("l") && b) {
			return stem + "di";
		}

		if (stem.endsWith("lj")) return stem.substring(0, stem.length - 1) + "di";
	} else {
		if (last_letter == "ú") {
			return stem.substring(0, stem.length - 1) + "ýði";
		}

		if (last_letter == "ó") {
			return stem + "ði";
		}

		if (last_letter == "j" && "frg".includes(stem.charAt(stem.length - 2))) {
			return stem.substring(0, stem.length - 1) + "ði";
		}

		if (stem.endsWith("kv") || stem.endsWith("gv")) {
			return stem.substring(0, stem.length - 1) + "uði";
		}
	}

	return stem + "aði";
}

function get_past_participle(word) {
	if (word in special_declensions && "past_participle" in special_declensions[word]) {
		return special_declensions[word]["past_participle"];
	}

	var stem = word.substring(0, word.length - 1);
	var vowels = "aáæeéiíoóöuúyý";

	// makes sure that only -a verb endings are removed
	if ("áæeéiíoóöuúyý".includes(word.charAt(word.length - 1))) stem = word;

	if (word.length >= 3) {
		if (stem.endsWith("f") || stem.endsWith("r")) {
			return stem + "ið";
		} else if (stem.endsWith("p") || stem.endsWith("k") || stem.endsWith("s") || stem.endsWith("z") || stem.endsWith("m") || stem.endsWith("g")) {
			return stem + "t";
		} else if (stem.endsWith("n") && (vowels.includes(stem.charAt(stem.length - 2)) || stem.endsWith("nn"))) {
			return stem + "t";
		} else if (stem.endsWith("gj")) {
			return stem.substring(0, stem.length - 1) + "t";
		} else if (stem.endsWith("á")) {
			return stem.substring(0, stem.length - 1) + "æt";
		} else if (stem.endsWith("ó")) {
			return stem.substring(0, stem.length - 1) + "eið";
		} else if (word.endsWith("va") && !vowels.includes(stem.charAt(stem.length - 1))) {
			return stem + "ið";
		} else if (stem.endsWith("j")) {
			if (stem.endsWith("eyj")) {
				return stem.substring(0, stem.length - 1) + "ð";
			} else {
				return stem.substring(0, stem.length - 1) + "ið";
			}
		} else if (stem.endsWith("ú")) {
			return stem.substring(0, stem.length - 1) + "ýð";
		}
	}

	return stem + "að";
}

function get_present_tense(word, pov) {
	if (word in special_declensions && "present_tense" in special_declensions[word]) {
		if (Array.isArray(special_declensions[word]["present_tense"])) {
			return special_declensions[word]["present_tense"][pov - 1];
		} else {
			return special_declensions[word]["present_tense"];
		}
	}

	var stem = word.substring(0, word.length - 1);
	var vowels = "aáæeéiíoóöuúyý";

	// makes sure that only -a verb endings are removed
	if ("áæeéiíoóöuúyý".includes(word.charAt(word.length - 1))) stem = word;

	if (pov == 1) {
		if ((stem.endsWith("f") || stem.endsWith("r") || stem.endsWith("g") || stem.endsWith("t")) && !stem.endsWith("tt")) {
			return stem;
		} else if (stem.endsWith("eyj")) {
			return stem.substring(0, stem.length - 1);
		} else if (stem.endsWith("j")) {
			return stem.substring(0, stem.length - 1) + "i";
		} else {
			return word;
		}
	} else if (pov == 2) {
		if (stem.endsWith("ú")) {
			return stem.substring(0, stem.length - 1) + "ý";
		} else if (stem.endsWith("á")) {
			return stem.substring(0, stem.length - 1) + "æ";
		} else if (stem.endsWith("j")) {
			return stem.substring(0, stem.length - 1) + "i";
		} else {
			return stem + "i";
		}
	} else {
		if ((stem.endsWith("f") || stem.endsWith("r") || stem.endsWith("g") || stem.endsWith("t") || word.endsWith("va")) && !stem.endsWith("tt")) {
			return stem + "ir";
		} else if (stem.endsWith("ú")) {
			return stem.substring(0, stem.length - 1) + "ýr";
		} else if (stem.endsWith("á")) {
			return stem.substring(0, stem.length - 1) + "ær";
		} else if (stem.endsWith("eyj")) {
			return stem.substring(0, stem.length - 1) + "r";
		} else if (stem.endsWith("lj")) {
			return stem.substring(0, stem.length - 1) + "ar";
		} else {
			return stem + "ar";
		}
	}

	return stem + "ir";
}

function get_gerund(word) {
	if (word in special_declensions && "gerund" in special_declensions[word]) {
		return special_declensions[word]["gerund"];
	}

	var stem = word.substring(0, word.length - 1);
	var vowels = "aáæeéiíoóöuúyý";

	// makes sure that only -a verb endings are removed
	if ("áæeéiíoóöuúyý".includes(word.charAt(word.length - 1))) stem = word;

	if (stem.endsWith("á")) {
		return stem.substring(0, stem.length - 1) + "æing";
	} else if (stem.endsWith("eyj")) {
		return stem.substring(0, stem.length - 1) + "ning";
	} else if (stem.endsWith("lj")) {
		return stem.substring(0, stem.length - 1) + "ing";
	} else if (stem.endsWith("j")) {
		return stem + "ang";
	} else {
		return stem + "ing";
	}
}

function get_mediopassive(word) {
	if (word in special_declensions && "mediopassive" in special_declensions[word]) {
		return special_declensions[word]["mediopassive"];
	}

	var stem = word.substring(0, word.length - 1);
	var vowels = "aáæeéiíoóöuúyý";

	// makes sure that only -a verb endings are removed
	if ("áæeéiíoóöuúyý".includes(word.charAt(word.length - 1))) stem = word;

	if (stem.endsWith("j")) {
		return stem.substring(0, stem.length - 1) + "jask";
	} else {
		return stem + "ask";
	}
}

function get_mediopassive_past(word) {
	if (word in special_declensions && "past_tense_mediopassive" in special_declensions[word]) {
		return special_declensions[word]["past_tense_mediopassive"];
	}

	var stem = word.substring(0, word.length - 1);
	var vowels = "aáæeéiíoóöuúyý";

	// makes sure that only -a verb endings are removed
	if ("áæeéiíoóöuúyý".includes(word.charAt(word.length - 1))) stem = word;

	var last_letter = stem.charAt(stem.length - 1);
	var last_2_letters = last_letter;

	if (word.length >= 3) last_2_letters = stem.charAt(stem.length - 2) + stem.charAt(stem.length - 1);

	if ("bkpszð".includes(last_letter) || last_2_letters == "lf") {
		return stem + "tisk";
	} else if (last_letter == "ú") {
		return stem.substring(0, stem.length - 1) + "ýðisk";
	} else if (last_letter == "á") {
		return stem.substring(0, stem.length - 1) + "ætask";
	} else if (stem.endsWith("eyj") || (last_letter == "j" && "frg".includes(stem.charAt(stem.length - 2)))) {
		return stem.substring(0, stem.length - 1) + "ðisk";
	} else if (vowels.includes(last_letter)) {
		return stem + "ðisk";
	} else if (stem.endsWith("kv") || stem.endsWith("gv")) {
		return stem + "ðisk";
	} else if (last_letter == "d" || last_letter == "t" || !vowels.includes(stem.charAt(stem.length - 2))) {
		return stem + "aðisk";
	} else {
		return stem + "ðisk";
	}
}

function get_mediopassive_present(word) {
	if (word in special_declensions && "present_mediopassive" in special_declensions[word]) {
		return special_declensions[word]["present_mediopassive"];
	}

	var stem = word.substring(0, word.length - 1);
	var vowels = "aáæeéiíoóöuúyý";

	// makes sure that only -a verb endings are removed
	if ("áæeéiíoóöuúyý".includes(word.charAt(word.length - 1))) stem = word;

	if (stem.endsWith("ú")) {
		return stem.substring(0, stem.length - 1) + "ýisk";
	} else if (stem.endsWith("á")) {
		return stem.substring(0, stem.length - 1) + "æsk";
	} else if (stem.endsWith("j")) {
		return stem.substring(0, stem.length - 1) + "isk";
	} else {
		return stem + "isk";
	}
}
