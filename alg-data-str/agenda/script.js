var listaPersoane = [];
var editingElementWithIndex;

class Person {
    constructor(nume, telefon) {
        this.nume = nume;
        this.telefon = telefon;
    }
}

function saveContact() {
    let nume = document.getElementById("numeContact");
    let telefon = document.getElementById("nrTelefon");
    let person = new Person(nume.value, telefon.value);

    if (editingElementWithIndex == undefined) {
        listaPersoane.push(person);
    } else {
        listaPersoane[editingElementWithIndex] = person;
    }

    nume.value = "";
    nume.focus();
    telefon.value = "";

    editingElementWithIndex = undefined;
}

function display() {
    let h = `
        <table>
            <tr>
                <th>Nume</th>
                <th>Telefon</th>
                <th></th>
                <th></th>
            </tr>
    `;
    for (var i = 0; i < listaPersoane.length; i++) {
        h += `
            <tr>
                <td>${listaPersoane[i].nume}</td>
                <td>${listaPersoane[i].telefon}</td>
                <td><a href="#" onclick="editContact(${i});">Modifica</a></td>
                <td><a href="#" onclick="deleteContact(${i}); display();">Sterge</a></td>
            </tr>
        `;
    }
    h += `</table>`;

    document.getElementById("lista").innerHTML = h;
    document.getElementById("lista_wrapper").style.display = "inherit";
}

function editContact(index) {
    editingElementWithIndex = index;
    document.getElementById("numeContact").value = listaPersoane[index].nume;
    document.getElementById("nrTelefon").value = listaPersoane[index].telefon;
}

function deleteContact(index) {
    listaPersoane.splice(index, 1);
}