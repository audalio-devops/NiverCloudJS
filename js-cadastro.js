const formulario = document.querySelector("form")
const iName = document.querySelector(".name")
const iBirthDate = document.querySelector(".birth-date")

function cadastrar() {
    fetch("http://localhost:8080/usuarios", 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: iName.value,
                birthdate: iBirthDate.value            })

        })
        .then(function(res) { console.log(res)})
        .catch(function(res) { console.log(res)})
}

function limpar() {
    iName.value = "";
    iBirthDate.value = "";
}

function exibirDataFormatada(vData) {

    var data = new Date(vData);
    
    var dia = String(data.getDate() + 1).padStart(2,'0');
    var mes = String(data.getMonth() + 1).padStart(2,'0'); // Os meses começam do zero, então adicionamos 1
    var ano = data.getFullYear();

    var dataFormatada = dia + '/' + mes + '/' + ano;
    return dataFormatada;
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    var dataNiver = exibirDataFormatada(iBirthDate.value);
    console.log(iName.value + ": " + dataNiver);
        
    //cadastrar();
    //limpar();
});

document.addEventListener("DOMContentLoaded", function() {
    var inputLetras = document.getElementById("name");

    inputLetras.addEventListener("input", function() {
        var valor = this.value.trim(); // Remove espaços em branco do início e do fim
        var re = /^[A-Za-z]+$/; // Expressão regular para aceitar apenas letras
        
        if (!re.test(valor)) {
            this.setCustomValidity("Por favor, insira apenas letras.");
        } else {
            this.setCustomValidity("");
        }
    });
});

// console.log(formulario)