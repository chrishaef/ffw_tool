// Tools fuer Fragebogen-Programm
// Fuer Strings nur Hochkomma (') benutzen! KEINE Anfuehrungsstriche!

var xPos = 20;
var yPos = 20;
var Sichtbar = false;
var geduld;
var gestartet = false;
var ManFragen = 0;
var gemerkt_FB;
var gemerkt_KAP;

function Ausklappen(name){
	if (document.getElementById) {
		with (document.getElementById(name)) {
			style.display = (style.display == 'none') ? 'block':'none';
		}
  }
  //return false;
}

function auswerten_frage(element,antw,richtig,zeigen) {
	clearTimeout(geduld);
	if (zeigen) {
		var ergebnis	= document.getElementById('ergebnis');
		var icon	= document.getElementById('icon');
		var nachbar		
		var farbe		= (richtig) ? '#cfc':'#fcb';
		if (-1 == zeigen) {
			farbe = '#ffc';
			var uhr	= document.getElementById('Uhr_stop');
			if (uhr) uhr.style.visibility = 'visible';
		}	
		
		element.style.backgroundColor = farbe;
		if ('BUTTON' == element.nodeName) {
			nachbar = element.nextSibling;
			while(nachbar) {
				if (1 == nachbar.nodeType) {
					nachbar.style.backgroundColor = farbe;
				}
				nachbar = nachbar.nextSibling;
			}	
		} else {
			nachbar = element.previousSibling;
			while(nachbar) {
				if (1 == nachbar.nodeType) {
					nachbar.style.backgroundColor = farbe;
				}
				nachbar = nachbar.previousSibling;
			}	
		}	
		
		if (1 == zeigen) {
			if (richtig) {
				if ('red' == ergebnis.style.color) {
					ergebnis.style.color = '#080';
					ergebnis.innerHTML = '<b>richtig</b>';			
				}
				if (gestartet) {
					gestartet = false;
				} else {	
					geduld = window.setTimeout('einblenden()', 5000);
					gestartet = true;
				}	
				var frage = document.getElementById('frage')
				if (frage) {
					frage.innerHTML = frage.innerHTML.replace(/\b(nicht|kein|keine|keinen|falsch)\b/g, '<b>$1</b>');
				}		
			} else {
				ergebnis.style.color = 'red';
				ergebnis.innerHTML = '<b>falsch</b>';	
			}	
			ergebnis.style.visibility = 'visible';
			if (icon) icon.style.visibility = 'visible';
		}	
	}
	window.location.href = '/#A_' + antw;
}

function einblenden() {
	clearTimeout(geduld);
	document.getElementById('hinweis').style.visibility	= 'visible';
}


function Wiederholen() {
	window.location.href = '/#ReDo';
}

function auswahl_speichern(){
	window.location.href = '/#AuswahlSpeichern';
}

function manuell_speichern(mode,idx){
	window.location.href = '/#Manuell_Speichern_'+mode+'-'+idx;
}

function manuell_laden(){
	window.location.href = '/#Manuell_Laden';
}


function Kap_Auswahl(kap,status) {
	var kap_zeile		= document.getElementById('Label_'+kap);
	//var bild			= document.getElementById('Bild_'+kap);
	
	kap_zeile.style.fontWeight = (status) ? 'bold':'normal';
	kap_zeile.style.color = (status) ? 'blue':'black';
	window.location.href = '/#Auswahl_'+kap;
	//if (bild) {
	//	kap_zeile.innerHTML = bild.src + ' breite: ' + bild.width;
	//	window.alert(bild.src);
	//}	
}

function select_kapitel(mode,kap_idx) {
 	var kap_idx_plus1 = kap_idx + 1
	
	if (0 == mode) kap_idx_plus1 = -kap_idx_plus1; 
	window.location.href= '/#Manuell_Alle_'+kap_idx_plus1;
}

function lade_alle_kapitel(mode,kap_idx) {
	var status = false;
	var fontweight;
	var fontcolor;
	var sichtbar;
	var aktiv=0;
	var nFragen;
	var kap_zeile;
	var sichtbar;
	
	with (document.Auswahl) {
		nFragen = Kapitel.length;
		if (2 == mode) {		// umkehren
			for (var kap = 0; kap < nFragen; kap++) {
				if (Kapitel[kap].checked) {
			   		Kapitel[kap].checked = false;
			   		fontweight = 'normal';
					fontcolor = 'black';	
					sichtbar = 'visible';			
				} else {
			   		Kapitel[kap].checked = true;
			   		fontweight = 'bold';
					fontcolor = 'blue';
					sichtbar = 'hidden';				
					aktiv++;				
				}
				kap_zeile = document.getElementById('Label_'+kap)
				kap_zeile.style.fontWeight = fontweight;
				kap_zeile.style.color = fontcolor;

			}
			Auswahl.Umkehren.blur();
		} else {
			if (1 == mode) {	// alle wählen
					Auswahl.Alle.blur();
					status = true;
					aktiv = nFragen;
			} else {				// alle abwählen
					Auswahl.Keine.blur();
					status = false;
					aktiv = 0;
			}
			
			fontweight = (status) ? 'bold':'normal';
			fontcolor =  (status) ? 'blue':'black';
			sichtbar = (status) ? 'hidden':'visible';
			for (var kap = 0; kap < nFragen; kap++) {
		   		Kapitel[kap].checked = status;
				kap_zeile = document.getElementById('Label_'+kap)
				kap_zeile.style.fontWeight = fontweight;
				kap_zeile.style.color = fontcolor;	
			}
		}
	}

	if (-1 == kap_idx) {
		//alert('Aufruf Alle, Mode'+mode)
		location.href='/#Alle_'+mode;

	 } else {	
		var anz_vorher = parseInt(document.getElementById('Anz_Gesamt').value);
		var imKap = parseInt(document.getElementById('Anz_imKap').value);
		var anz = anz_vorher;
		var anz2 = 0;
		switch (mode) {
			case 0 :	anz -= imKap;
					ManFragen = -imKap;
					break;
			case 1 : anz += -imKap + nFragen;
					anz2 = nFragen;
					ManFragen = -imKap + nFragen;
					break;
			case 2: 	anz2 = nFragen - imKap - ManFragen;
					anz += anz2- imKap; 
					ManFragen = -imKap + anz2;
					break;				
		}
		//alert ('mode: '+mode+ '\\nanz_vorher: '+anz_vorher+ ' imKap: '+ imKap +'\\nanz: '+ anz +' anz2: '+ anz2 +'\\nManFragen: '+ ManFragen );
		Add_Frage_Info(kap_idx,anz,anz2)
		location.href='/#Fragen_'+mode+'_'+kap_idx; 
	}	
}

function Add_Frage_Kapitel_Wechsel(kap) {
	location.href='/#Manuell_Anzeigen_'+kap
}

function Add_Frage(kap,pos,checked,anz_vorher,imKap) {
	var anz,anz2;
	var label;
	var option;
	var farbe;
	var text;
	var t_pos;
	
	label = 	document.getElementById('Label_'+pos);
	
	if (checked) {
		ManFragen++;
		label.style.fontWeight = 'bold';	
		label.style.color = 'blue';	
	} else {
		ManFragen--;
		label.style.fontWeight = 'normal';	
		label.style.color = 'black';
	}
	
	anz = ManFragen + anz_vorher;
	anz2 = ManFragen + imKap;
	Add_Frage_Info(kap,anz,anz2);
	
	location.href='/#Manuell_Frage_'+kap+'_'+pos+'_'+checked;
}

function Add_Frage_Info(kap,anz,anz2) {
	var mehrzahl = 'n';
	var auswahl = document.getElementById('KapAuswahl');
	var nFragen = parseInt(document.getElementById('Anz_Fragen').value);
	var akt_index = parseInt(document.getElementById('Akt_Index').value);
	var farbe = '#C00';

	document.getElementById('Anzahl_Fragen').innerHTML = 'Insgesamt '+anz + ' Frage'+mehrzahl+' ausgew&auml;hlt';
	if (anz2) farbe = (anz2 == nFragen) ? '#080':'#00C';
	auswahl.options[akt_index].style.color = farbe;
	text = auswahl.options[akt_index].text;
	t_pos = text.indexOf(' x ');
	auswahl.options[akt_index].text = anz2 + ' x ' + text.substr(t_pos+3);
}

function Liste_Kapitel(kap) {
	var nurFalsch;
	var nurOK;
	var nurNochNie
	var filter	= document.getElementsByName('filter');
	
	for (var zgr = 0; zgr < filter.length; zgr++) {
		if (filter[zgr].checked) {
			nurFalsch = filter[zgr].value;
			break;
		}
	}
		
	nurOk = (document.getElementById('richtigeAntw').checked) ? 1:0;
	
	location.href='/#Liste_Kapitel_' + kap+',' + nurFalsch + ',' + nurOk;
}

function Versionen_Vergleichen(ereignis,swap,mode) {
	location.href='/#Vergleichen_' + ereignis + ',' + swap + ',' + mode;

}

function Merken_init_FB(nFragen) {
	gemerkt_FB = new Array(nFragen+1);
}

function Merken_init_KAP(nFragen) {
	gemerkt_KAP = new Array(nFragen+1);
}

function DisplaySaveButton(mode) {
	document.getElementById('save_button').disabled = mode;
	document.getElementById('save_img').src = (mode) ? 'images/leer.png':'images/merken.png';
}

function Fragen_Merken() {
	DisplaySaveButton(true);
	Merken_init_FB(gemerkt_FB.length);
	location.href='/#FragenMerken_';
}

function Fragen_Merken_aus_Liste(kap) {
	DisplaySaveButton(true);
	Merken_init_KAP(gemerkt_KAP.length);
	location.href='/#FragenMerkenAusListe_' + kap;
}

function merken(idx) {
	var gleich = true;
	merken_flip(document.getElementById('icon_'+idx));

	gemerkt_FB[idx] = !gemerkt_FB[idx];
	
	for (var i = 0; i < gemerkt_FB.length; i++) {
		if (gemerkt_FB[i]) gleich = false;
	}
	DisplaySaveButton(gleich);
	
	window.location.href= '/#Merken_'+idx+','+gleich;
}

function merken_aus_liste(idx,kap) {
	var gleich = true;
	merken_flip(document.getElementById('icon_'+idx));

	gemerkt_KAP[idx] = !gemerkt_KAP[idx];
	for (var i = 0; i < gemerkt_KAP.length; i++) {
		if (gemerkt_KAP[i]) gleich = false;
	}
	DisplaySaveButton(gleich);
	
	window.location.href= '/#MerkenAusListe_'+idx+','+kap+','+gleich;
}

function merken_aus_FB(idx) {
	merken_flip(document.getElementById('icon'));
	window.location.href= '/#MerkenAusFB_'+idx;
}


function merken_flip(icon) {
	if (icon.src.match(/leer.png$/)) {
		icon.src = 'images/merken.png';
		icon.alt = 'Diese Frage nicht mehr merken';
	} else {
		icon.src = 'images/leer.png';
		icon.alt = 'Diese Frage merken';
	}	
}

function Hide_Divs(name,mode) {
	mode = parseInt(mode);
	var anzeige = (0 == mode) ? 'block':'none';
	var divs;
	var hinweis;
	var zaehler = 0;

	divs = document.getElementsByTagName('div');
	if (divs) {
		for (var zgr = 0; zgr < divs.length; zgr++) {
			if (name == divs[zgr].name) {
				if ('richtige' == name) {
					var klasse= divs[zgr].className;
					switch(mode) {
						case 1 : anzeige = (klasse) ? 'none':'block';
								break;
						case 2 : anzeige = (('R1' == klasse) || ('R5' == klasse)) ? 'none':'block';
								break;
						case 3 : anzeige = ('R5' == klasse) ? 'none':'block';				
								break;
						default: anzeige = 'block';		
					}
					if ('block' == anzeige) zaehler++;
				}
				divs[zgr].style.display = anzeige;
			}
			if ('probleme' == divs[zgr].name) zaehler++;	
		}
		document.getElementById('leer').style.display = (0 < zaehler) ? 'none':'block'; 
	}
	
	// Fuer einen Ausdruck die gew�hlte Option  ausgeben
	if ('richtige' == name) {
		hinweis = document.getElementById('ausdruck_hinweis');
		if (hinweis) {
			switch(mode) {
				case 0 : hinweis.innerHTML =  '<b>Alle Fragen</b> aus diesem Kapitel.'; break;
				case 1 : hinweis.innerHTML =  'Nur die Fragen, die ich <b>&ouml;fter als 1 x falsch</b> beantwortet habe.'; break;
				case 2 : hinweis.innerHTML =  'Nur die Fragen, die ich <b>mindestens 1 x falsch</b> beantwortet habe.'; break;
				case 3 : hinweis.innerHTML =  'Nur die Fragen, die ich <b>falsch</b>, oder <b>weniger als 5 x in Folge richtig</b> beantwortet habe.'; break;		
			}
		}		
	}
}

function AnzeigeFlip() {
	var mode;
	var tabelle = document.getElementById('details');
	var zeilen = document.getElementsByTagName('tr');
	
	if (zeilen.length) {
		for (var i=0; i < zeilen.length; i++) {
			if ('optional' == zeilen[i].name) { 
				mode = 'none' == zeilen[i].style.display
				zeilen[i].style.display = (mode) ? 'block':'none'; 
			}	
		}
	}
	
	if (tabelle) {
		tabelle.style.display = ('none' == tabelle.style.display) ? 'block':'none';	
	}	

	var button = document.getElementById('details_button');
	if (tabelle) {
		button.innerHTML = (mode) ? 'Details ausblenden':'Details einblenden';
	} else {
		button.innerHTML = (mode) ? 'Kompakte Darstellung':'Alle Fragen anzeigen';
	}
}

function aufdecken(pos) {
	var container = document.getElementsByTagName('ol')[pos];
	container.style.display = (container.style.display == 'none') ? 'block':'none';
}

function schnell_suche(){
	var sel = '';
	if (window.getSelection) {
		sel = window.getSelection();
	} else if (document.getSelection) {
		sel = document.getSelection();
	} else if (document.selection) {
		sel = document.selection.createRange().text;
	}
	if (sel) {
		var wort = trim(String(sel));
		if ('' < wort) location.href='/#Suche_'+wort;
	}
	return false;
}

function trim(text) {
	return text.replace(/(^\\s{1,}|\\s*?$)/g,'');
}

