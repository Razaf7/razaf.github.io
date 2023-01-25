var data = [
    ['Barista','1 novembre 2022','Mi-temps (20h)','Week-end uniquement','250€ net par semaine'],
    ['Barista','Mi-novembre','Temps plein (35h)','Soirée et Week-end','350€ net par semaine'],
    ['Barista','1 novembre 2022','Mi-temps (20h)','Week-end uniquement','250€ net par semaine'],
    ['Barista','Mi-novembre','Temps plein (35h)','Soiré et Week-end','350€ net par semaine'],
    ['Barista','Mi-novembre','Temps plein (35h)','Soiré et Week-end','350€ net par semaine'],
    ['Barista','1 novembre 2022','Mi-temps (20h)','Week-end uniquement','250€ net par semaine'],
    ['Barista Manager','Dès que possible','Temps plein (40h)','Fin de semaine et week-end','500€ net par semaine'],
    ['Barista Manager','Dès que possible','Temps plein (40h)','En journée, la semaine','500€ net par semaine'],
    ['Community Manager','Debut 2023','Contrat freelance','A definir','20€ par heure']
];

//variable pour le resultat des recheches
var searchData = data;

//varible pour le triage en fonction des colonnes
var order = ['desc','desc','desc','desc','desc'];

// creation de ligne du tableau
const creatRow = function(data){
    let tr = document.createElement('tr');
    tr.className = "row";
    for (let i = 0; i < data.length; i++) {
        let td = document.createElement('td');
        td.innerText = data[i];
        tr.appendChild(td);
    }
    return tr
}

// creation d'un tableau par defaut
let creatTable = function(data){
    const tbody = document.querySelector(".display");
    data.forEach(e => {
        tbody.appendChild(creatRow(e));
    });
}

// reinitialiser le tableau qui defini le tri
let setOrder = function(){
    order.forEach(el => {
        el = 'desc';
    });
}

// creation d'un tableau a partir d'indice donnee
let setTableByIndex = function(index, data){
    const tbody = document.querySelector(".display");
    var parent = tbody.parentNode;
    var newtbody = document.createElement('tbody');
    let result = [[]]
    index.forEach(el => {
        newtbody.appendChild(creatRow(data[el]));
        result.push(data[el]);
    });
    searchData = result;
    newtbody.className = "display";
    parent.replaceChild(newtbody, tbody);
    setOrder();
    const none = document.getElementById('none');
    if(index.length == []){
        none.style.display = 'block';
    }
    else {none.style.display = 'none';}
}

// mise a jour du tableau en fonction du tri
let updateTable = function(searchData){
    const tbody = document.querySelector(".display");
    var parent = tbody.parentNode;
    var newtbody = document.createElement('tbody');
    searchData.forEach(el => {
        newtbody.appendChild(creatRow(el));
    });
    newtbody.className = "display";
    parent.replaceChild(newtbody, tbody);
    setOrder();
}

const input = document.querySelector('.input');
input.addEventListener("input", () => {
    let index = search(input.value, data);
    setTableByIndex(index, data);
})


// Test si une sous-chaine et dans une autre
let isIn = function(el1, el2) {
    if((el1.length == 0)||(el2.length == 0)||(el1.length > el2.length)) {return 0;}
    let idBeg = 0;
    let idEnd = el1.length;
    for (let i = 0; i <= el2.length - el1.length ; i++) {
        let state = el2.substring(idBeg, idEnd).localeCompare(el1, 'en', { sensitivity: 'base' });
        if(state == 0) {return 1;}
        else {
            idBeg = idBeg +1;
            idEnd = idEnd +1;
        }
    }
    return 0;
}

const search = function(el, data) {
    let index = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            data[i][j].substring();
            if(isIn(el, data[i][j])){
                index.push(i);
            }
        }
    }
    // suppression des doublons
    var uniqueArr = [...new Set(index)];
    return uniqueArr;
}


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Il s'agit d'un tri a bulle
var sortTable = function(order, column, data){
    for (let j = 1; j <= data.length; j++) {
        for (let i = 0; i < data.length-j; i++) {
            if(((order == 'desc')&&(data[i][column] < data[i+1][column]))||((order == 'asc')&&(data[i][column] > data[i+1][column]))){
                trs = data[i];
                data[i] = data[i+1];
                data[i+1] = trs;
            }
        }
    }
    return data;
}

// evenement ou l'un des bouton de tri est cliqué
const sort = document.getElementsByClassName('sort');

for (let i = 0; i < sort.length; i++) {
    sort[i].addEventListener('click', () => {
        let id = parseInt(sort[i].parentNode.id);
        searchData = sortTable(order[id], id, searchData);
        if(order[id] == 'asc'){order[id] = 'desc';}
        else {order[id] = 'asc';}
        updateTable(searchData);
    })
}

// creation de tableau par defaut 
creatTable(data);





