function alternarConteudo(button) {
  const trocarConteudo = button.nextElementSibling;
  trocarConteudo.classList.toggle("show");
}

// Simulador


// Linha-Meses
$("input[type=range]").on("change input", function() {
  $("[name=values]").val($(this).val())
})

//   Resultado da Simulação

var total = document.getElementById('valor','meses', 'taxa-juros');