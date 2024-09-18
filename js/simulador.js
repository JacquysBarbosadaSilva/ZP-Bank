// ****************************************************Simulador***********************************************************************


// ****************************************************Linha-Meses*********************************************************************
$("input[type=range]").on("change input", function() {
    $("[name=values]").val($(this).val());
});

// ***************************************************Resgatar valores*****************************************************************
var total = document.getElementById('valor', 'meses', 'taxa-juros');
var valorParcela = ('taxa-juros' * 'meses') + 'valor';
var totalJuros = valorParcela - 'valor';
var custoTotal = totalJuros + 'valor';

// *************************************************Determinar juros fixo*************************************************************
function atualizarTaxaDeJuros() {
    const selectElement = document.getElementById('select-id');
    const taxaElement = document.getElementById('id-valor-taxa');
    const tipoFinanciamento = selectElement.value;

    let taxaDeJuros = 0;
    if (tipoFinanciamento === 'imobiliario') {
        taxaDeJuros = 11.0;
    } else if (tipoFinanciamento === 'estudantil') {
        taxaDeJuros = 6.5;
    } else if (tipoFinanciamento === 'veiculos') {
        taxaDeJuros = 10.5;
    }

    taxaElement.textContent = `${taxaDeJuros}% a.a`;
}

document.getElementById('select-id').addEventListener('change', atualizarTaxaDeJuros);
atualizarTaxaDeJuros();

// *********************************************Button Implementado******************************************************************
// Função para calcular financiamento
function calcularFinanciamento(valor, meses, taxa) {
    const taxaMensal = taxa / 100 / 12;
    const parcela = valor * taxaMensal / (1 - Math.pow((1 + taxaMensal), -meses));
    const totalJuros = (parcela * meses) - valor;
    const custoTotal = parcela * meses;

    return {
        parcela: parcela.toFixed(2),
        totalCredito: custoTotal.toFixed(2),
        jurosPago: totalJuros.toFixed(2)
    };
}

// Validação do formulário e cálculo
function validaForm(event) {
    event.preventDefault(); // Evita o envio do formulário

    const valorDigitado = document.getElementById('valor').value;
    const mesesDigitado = document.getElementById('meses').value;
    const tipoFinanciamento = document.getElementById('select-id').value;

    let taxaJuros;

    // ***********************************Definindo a taxa de juros com base no tipo de financiamento*********************************
    if (tipoFinanciamento === 'imobiliario') {
        taxaJuros = 11.0;
    } else if (tipoFinanciamento === 'estudantil') {
        taxaJuros = 6.5;
    } else if (tipoFinanciamento === 'veiculos') {
        taxaJuros = 10.5;
    }

    // Valida se todos os campos foram preenchidos
    if (valorDigitado === "" || mesesDigitado === "" || tipoFinanciamento === "") {
        alert("Por favor, preencha todos os campos!");
    } else {
        const resultado = calcularFinanciamento(parseFloat(valorDigitado), parseInt(mesesDigitado), taxaJuros);

        // Exibindo os resultados na tela
        document.getElementById('valor-parcela').textContent = "Valor da Parcela: R$ " + resultado.parcela;
        document.getElementById('total-credito').textContent = "Custo Total do Crédito: R$ " + resultado.totalCredito;
        document.getElementById('juros-pago').textContent = "Total de Juros Pago: R$ " + resultado.jurosPago;
    }
}

// Adicionando o event listener ao botão de cálculo
document.getElementById('calcular').addEventListener('click', validaForm);