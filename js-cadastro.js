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

function salvaLocalStorage() {

    // var dataNiver = exibirDataFormatada(iBirthDate.value);

    // Cria um objeto representando a pessoa
    var pessoa = {
        nome: iName.value,
        dataNascimento: iBirthDate.value
    };

    // Recupera o array de pessoas do localStorage
    var pessoasSalvas = localStorage.getItem('arpessoas');

    // Verifica se há dados no localStorage
    if (pessoasSalvas) {
        // Converte a string JSON de volta para um array
        var pessoas = JSON.parse(pessoasSalvas);
    } else {
        // Se não houver dados no localStorage, inicializa um novo array vazio
        var pessoas = [];
    }

    // Acrescenta a nova pessoa ao array existente
    pessoas.push(pessoa);

    // Salva o array atualizado no localStorage
    localStorage.setItem('arpessoas', JSON.stringify(pessoas));

    // Exibe uma mensagem de confirmação
    console.log("Pessoa salva localmente com sucesso!");
}

function exibirDataFormatada(vData) {

    var data = new Date(vData);
    
    var dia = String(data.getDate()).padStart(2,'0');
    var mes = String(data.getMonth() + 1).padStart(2,'0'); // Os meses começam do zero, então adicionamos 1
    var ano = data.getFullYear();

    var dataFormatada = dia + '/' + mes + '/' + ano;
    return dataFormatada;
}

function exibirDadosPessoas() {
    // Recupera o array de pessoas do localStorage
    var pessoas = JSON.parse(localStorage.getItem('arpessoas')) || [];

    // Cria uma tabela HTML dinamicamente com os dados das pessoas
    var tabelaHTML = "<form id='formTable' class='formTable'><table border='1'>" +
                        "<tr>" +
                            "<th>Nome</th>" +
                            "<th>Data de Nascimento</th>" +
                            "<th>Ações</th>" +
                        "</tr>";

    pessoas.forEach(function(pessoa) {
        tabelaHTML += "<tr>" +
                         "<td>" + pessoa.nome + "</td>" +
                         "<td>" + pessoa.dataNascimento + "</td>" +
                         "<td><button class='buttonUpdTable'>Editar</button><button class='buttonExcTable'>Excluir</button></td>" +
                      "</tr>";
    });

    tabelaHTML += "</table></form>";

    // Adiciona a tabela à div com o id 'tabelaPessoas'
    document.getElementById('tabelaPessoas').innerHTML = tabelaHTML;
}

// Chama a função para exibir os dados da pessoa quando a página for carregada
window.onload = exibirDadosPessoas;

document.addEventListener("DOMContentLoaded", function() {
    var inputLetras = document.getElementById("name");

    inputLetras.addEventListener("input", function() {
        var valor = this.value.trim(); // Remove espaços em branco do início e do fim
        var re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/; // Expressão regular para aceitar apenas letras
        
        if (!re.test(valor)) {
            this.setCustomValidity("Por favor, insira apenas letras.");
        } else {
            this.setCustomValidity("");
        }
    });
});

// Função que será chamada no evento submit do formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    salvaLocalStorage()

    // Exibe os dados atualizados na tabela
    exibirDadosPessoas();
       
    //cadastrar();
    //limpar();
});




// console.log(formulario)