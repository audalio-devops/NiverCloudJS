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

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    //cadastrar();
    console.log(iName.value + ": " + iBirthDate.value)
    //limpar();
});

// console.log(formulario)