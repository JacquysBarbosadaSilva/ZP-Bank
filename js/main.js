function alternarConteudo(button) {
  const trocarConteudo = button.nextElementSibling;
  trocarConteudo.classList.toggle("show");
}

// Simulador Financeiro

// Linha-Meses
$("input[type=range]").on("change input", function() {
  $("[name=values]").val($(this).val())
})

//   Resultado da Simulação

var total = document.getElementById('valor','meses', 'taxa-juros');

//Gerenciador de Despesas
const openModalButton = document.querySelector("#button-add-nova-transacao");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#id-modal-transacao");
const fade = document.querySelector("#fade");
const formTransacao = document.querySelector("#form-transacao");
const listaTransacoes = document.querySelector("#lista-transacoes");

// Função para alternar a visibilidade do modal
const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

// Abrir o modal quando clicar no botão
openModalButton.addEventListener("click", toggleModal);

// Fechar o modal quando clicar no botão de fechar ou no fade (fundo escuro)
closeModalButton.addEventListener("click", toggleModal);
fade.addEventListener("click", toggleModal);

// Adicionar uma nova transação ao enviar o formulário
formTransacao.addEventListener("submit", (e) => {
    e.preventDefault(); // Impedir o envio padrão do formulário

    const descricao = document.querySelector("#descricao").value;
    const valor = document.querySelector("#valor").value;

    // Criar um novo elemento de transação
    const transacaoItem = document.createElement("div");
    transacaoItem.classList.add("transacao-item");
    transacaoItem.innerHTML = `<strong>${descricao}</strong>: R$${valor}`;

    // Adicionar a transação à lista de transações
    listaTransacoes.appendChild(transacaoItem);

    // Limpar o formulário
    formTransacao.reset();

    // Fechar o modal
    toggleModal();
});

