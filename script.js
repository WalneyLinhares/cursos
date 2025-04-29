const inputcep = document.getElementById('cep');
const botaobuscar = document.getElementById('buscar-novamente');
const resultados = document.getElementById('resultados-cep');
const buscacep = document.getElementById('busca-cep');


function desativarConteiner(state = false) {
    if (state) {
        resultados.style.display = "block";
        buscacep.style.display = "none";
    } else {
        resultados.style.display = "none";
        buscacep.style.display = "flex";
    }
};


function inputinvalido() {
    const icon = document.getElementById('icon-localidade');
    inputcep.classList.add('erro');
    icon.classList.add('erro');
    
    setTimeout(() => {
      inputcep.classList.remove('erro');
      icon.classList.remove('erro');
    }, 300);
    
}


inputcep.addEventListener('blur', async function () {
    const valor = inputcep.value
    const cep = valor.replace(/\D/g, '');

    if (cep !== "") {
        if (/^\d{8}$/.test(cep)) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const conteudo = await response.json();

                if (!conteudo.erro) {
                    desativarConteiner(true);
                    document.getElementById('logradouro').textContent = conteudo.logradouro;
                    document.getElementById('bairro').textContent = conteudo.bairro;
                    document.getElementById('localidade').textContent = conteudo.localidade;
                    document.getElementById('resultado-cep').textContent = valor;
                }
            } catch (erro) {
                console.error(erro);
            }
        } else {
            inputinvalido();
        }
    } else {
        inputinvalido();
    }
});


botaobuscar.addEventListener('click', function () {
    desativarConteiner(false);
    inputcep.value = "";
    inputcep.focus();
});