var p = document.getElementById("pracownicy");
var e = document.getElementById("plec");

var pensjaSum = { m: 0, k: 0, razem: 0 };
var chosenSex = 'all'

var Pracownik = function (imie, nazwisko, wiek, wyplaty, dniWTygodniu, pelnyEtap, plec) {
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.wiek = wiek;
    this.wyplaty = wyplaty;
    this.dniWTygodniu = dniWTygodniu;
    this.pelnyEtap = pelnyEtap;
    this.plec = plec;
}
Pracownik.prototype.getPensja = function () {
    var dni = this.dniWTygodniu * 4;
    var godziny;
    if (this.pelnyEtap) {
        godziny = 8;
    } else {
        godziny = 4;
    }
    return this.wyplaty * dni * godziny;
}

Pracownik.prototype.getInfo = function () {
    return '<tr><td>' + this.imie + '</td><td>' + this.nazwisko + '</td><td>' + this.wiek + '</td><td>' + this.getPensja() + '</td></tr>';
}

Pracownik.prototype.getPlec = function () {
    return this.plec;
}

// PRACOWNICY
var pr1 = ["Genowefa", "Kowalczyk", 24, 18, 5, true, "k"];
var pr2 = ["Faustyna", "Kowalska", 45, 20, 5, true, "k"];
var pr3 = ["Konstantyn", "Piela", 20, 18, 5, true, "m"];
var pr4 = ["Gerwazy", "Zagorzały", 25, 20, 5, false, "m"];
var pr5 = ["Alfred", "Kropidłowski", 24, 22, 5, false, "m"];
var pr6 = ["Eugenia", "Borówka", 36, 12, 5, false, "k"];
var pr7 = ["Heliodor", "Żak", 55, 16, 5, true, "m"];
var pr8 = ["Regina", "Basior", 43, 18, 5, false, "k"];

var pracownik1 = new Pracownik(...pr1);
var pracownik2 = new Pracownik(...pr2);
var pracownik3 = new Pracownik(...pr3);
var pracownik4 = new Pracownik(...pr4);
var pracownik5 = new Pracownik(...pr5);
var pracownik6 = new Pracownik(...pr6);
var pracownik7 = new Pracownik(...pr7);
var pracownik8 = new Pracownik(...pr8);

var tabLudzi = [pracownik1, pracownik2, pracownik3, pracownik4, pracownik5, pracownik6, pracownik7, pracownik8];

for (var i in tabLudzi) {
    if (tabLudzi[i].getPlec() === 'k') {
        pensjaSum.k += tabLudzi[i].getPensja();
    }
    if (tabLudzi[i].getPlec() === 'm') {
        pensjaSum.m += tabLudzi[i].getPensja();
    }    
    pensjaSum.razem += tabLudzi[i].getPensja();
}

function selectPlec() {
    var value = e.options[e.selectedIndex].value;
    console.log(value)
    chosenSex = value
    var tabLudziFilter =  value === 'all' ? tabLudzi : tabLudzi.filter(pr => pr.plec === value);
    makeTable(tabLudziFilter);
}

function makeTable(tabelaPrac) {
    var table = document.getElementById('table');
    var dataTable = '<table class="table table-sm table-dark">';
    dataTable += '<tr><th> Imię </th> <th> Nazwisko </th> <th> Wiek </th> <th> Pensja (zł) </th></tr>';
        for (var i in tabelaPrac) {
            dataTable += tabelaPrac[i].getInfo();
        }
        console.log(chosenSex)
        if(chosenSex === 'all') 
            dataTable += `<tr><td colspan="3">Razem do wypłaty razem: </td><td> ${pensjaSum.razem}</td></tr>`;            
        if(chosenSex === 'm')
            dataTable += `<tr><td colspan="3">Razem do wypłaty męzczyzny: </td><td> ${pensjaSum.m}</td></tr>`;
        if(chosenSex === 'k')
            dataTable += `<tr><td colspan="3">Razem do wypłaty kobiety: </td><td> ${pensjaSum.k}</td></tr>`;
    
            dataTable += '</table>';
    table.innerHTML = dataTable;
}

makeTable(tabLudzi);