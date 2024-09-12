function novaTransacao() {
    const addScreen = document.getElementById('add-screen');
    addScreen.style.display = 'block';
  }
  
  // Adicione um evento de clique ao botão de fechar (opcional)
  document.getElementById('add-submit').addEventListener('click', () => {
    const addScreen = document.getElementById('add-screen');
    addScreen.style.display = 'none';
  });

  function novaTransacao() {
    const addScreen = document.getElementById('add-screen');
    addScreen.classList.add('show');
  }

  // Educação

  document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("botao-juros");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            var content = this.nextElementSibling.querySelector(".escrita-card").innerHTML;
            this.innerHTML = content;
            for (var j = 0; j < coll.length; j++) {
                if (coll[j] !== this) {
                    coll[j].classList.remove("active");
                    coll[j].innerHTML = coll[j].getAttribute("data-original");
                }
            }
            this.classList.toggle("active");
        });
    }
    for (var i = 0; i < coll.length; i++) {
        coll[i].setAttribute("data-original", coll[i].innerHTML);
    }
});