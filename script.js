

let clientes = [];

document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;

    const idCliente = Date.now();

    const cliente = {
        id: idCliente,
        nome: nome,
        dataNascimento: dataNascimento,
        telefone: telefone
    };

    clientes.push(cliente);
    atualizarListaClientes();

    document.getElementById('formCadastro').reset();
});


function atualizarListaClientes() {
    const lista = document.getElementById('listaClientes');
    lista.innerHTML = '';

    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} - ${cliente.dataNascimento} - ${cliente.telefone}`;


        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = () => excluirCliente(cliente.id);

        li.appendChild(btnExcluir);
        lista.appendChild(li);
    });
}

function excluirCliente(id) {
    clientes = clientes.filter(cliente => cliente.id !== id);
    atualizarListaClientes();
}


function verificarAniversarios() {
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1;
    const aniversariantes = clientes.filter(cliente => {
        const [ano, mes, dia] = cliente.dataNascimento.split('-');
        const mesNascimento = parseInt(mes, 10);  
        const diaNascimento = parseInt(dia, 10);  

        return diaHoje === diaNascimento && mesHoje === mesNascimento;
    });

    exibirLembretesAniversarios(aniversariantes);
}

function exibirLembretesAniversarios(aniversariantes) {
    const listaAniversarios = document.getElementById('listaAniversariantes');
    listaAniversarios.innerHTML = '';

    if (aniversariantes.length === 0) {
        listaAniversarios.innerHTML = '<li>Hoje não há aniversariantes.</li>';
    } else {
        aniversariantes.forEach(cliente => {
            const li = document.createElement('li');
            li.textContent = `Parabéns para ${cliente.nome}!`;
            listaAniversarios.appendChild(li);
        });
    }
}
