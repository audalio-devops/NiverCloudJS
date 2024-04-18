const formulario = document.querySelector("form")
const iName = document.querySelector(".name")
const iBirthDate = document.querySelector(".birth-date")
const formularioTabela = document.querySelector("formTable")
const pessoaList = document.getElementById('pessoa-list');


function formatarData(vData) {

    var data = new Date(vData);
    
    var dia = String(data.getDate()).padStart(2,'0');
    var mes = String(data.getMonth() + 1).padStart(2,'0'); // Os meses começam do zero, então adicionamos 1
    var ano = data.getFullYear();

    var dataFormatada = dia + '/' + mes + '/' + ano;
    return dataFormatada;
}

function salvaLocalStorage() {

    // var dataNiver = formatarData(iBirthDate.value);

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

    // Função para renderizar a tabela
    function renderTable() {
        pessoaList.innerHTML = '';

        // Carregar os dados do Local Storage
        const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

        pessoas.forEach((pessoa, index) => {
            const tr = document.createElement('tr');

            // Coluna de Nome da Pessoa
            const tdNome = document.createElement('td');
            tdNome.textContent = pessoa.nome;

            // Coluna de Data de Nascimento
            const tdDataNascimento = document.createElement('td');
            tdDataNascimento.textContent = pessoa.dataNascimento;

            // Coluna de Ação
            const tdAcao = document.createElement('td');
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => editarPessoa(index));
            btnEditar.className = 'buttonUpdTable';

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => excluirPessoa(index));
            btnExcluir.className = 'buttonExcTable';

            tdAcao.appendChild(btnEditar);
            tdAcao.appendChild(btnExcluir);

            // Adicionando as colunas à linha
            tr.appendChild(tdNome);
            tr.appendChild(tdDataNascimento);
            tr.appendChild(tdAcao);

            // Adicionando a linha à tabela
            pessoaList.appendChild(tr);
        });
    }


function limpar() {
    iName.value = "";
    iBirthDate.value = "";
}


// Chama a função para exibir os dados da pessoa quando a página for carregada
window.onload = renderTable();

formulario.addEventListener("DOMContentLoaded", function() {
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
    //exibirDadosPessoas();
       
    //cadastrar();
    //limpar();
});

formularioTabela.addEventListener('DOMContentLoaded', function() {

    // Carregar os dados do Local Storage
    const pessoas = JSON.parse(localStorage.getItem('arpessoas')) || [];

    
    // Função para editar uma pessoa
    function editarPessoa(index) {
        // Implemente a lógica de edição aqui
        console.log('Editar pessoa de índice', index);
        var pessoas = JSON.parse(localStorage.getItem('arpessoas')) || [];
        const novaPessoa = { nome: 'Novo Nome 2', dataNascimento: '2000-02-02' };

        // Verificar se o índice fornecido está dentro dos limites do array
        if (index >= 0 && index < pessoas.length) {
            // Substituir a pessoa no índice especificado
            pessoas[index] = novaPessoa;

            // Atualizar os dados no Local Storage
            localStorage.setItem('arpessoas', JSON.stringify(pessoas));
            renderTable();
        } else {
            console.error('Índice fora dos limites');
        }

    }

    // Função para excluir uma pessoa
    function excluirPessoa(index) {
        // Implemente a lógica de exclusão aqui
        console.log('Excluir pessoa de índice', index);
    }

    // Renderizar a tabela inicialmente
    renderTable();
});



// console.log(formulario)