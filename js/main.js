

// Gerenciador Despesas
let listaRegistros = {
  ultimoIdGerado: 0,
  usuarios: [],
  entradaTotal: 0,
  saidaTotal: 0,
  total: 0
};

const KEY_BD = "@usuarioestudo";

function openModal() {
  document.getElementById("modal-container").classList.add("mostrar");
}

function gravarBD() {
  localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros));
}

function lerBD() {
  const data = localStorage.getItem(KEY_BD);
  if (data) {
    listaRegistros = JSON.parse(data);
  }
  render();
}

function render() {
  const tbody = document.getElementById("listaRegistrosBody");
  if (tbody) {
    tbody.innerHTML = listaRegistros.usuarios.map((usuario, index) => {
      const numero = parseFloat(usuario.number);
      const estilo = numero < 0 ? 'style="color: red;"' : 'style="color: green;"';
      const numeroFormatado = numero >= 0 
        ? `+R$${Math.abs(numero).toFixed(2)}` 
        : `-R$${Math.abs(numero).toFixed(2)}`;
      
      return `
        <tr style ="margin-top: 50px;">
          <td>${usuario.textUsuario}</td>
          <td ${estilo}>${numeroFormatado}</td>
          <td>${usuario.date}</td>
          <td>
            <img onclick="editar(${index})" src="../img/editar.png" alt="Editar" width="28" height="28" style="cursor: pointer;">
            <svg onclick="deletar(${index})" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
              <path d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2Z" stroke="#E83F5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.57143 15.0713C6.97969 15.0713 6.5 14.5916 6.5 13.9999V13.9999C6.5 13.4082 6.97969 12.9285 7.57143 12.9285L20.4286 12.9285C21.0203 12.9285 21.5 13.4082 21.5 13.9999V13.9999C21.5 14.5916 21.0203 15.0713 20.4286 15.0713L7.57143 15.0713Z" fill="#E83F5B"/>
            </svg>
          </td>
        </tr>`;
    }).join("");
    atualizarTotais();
  }
}

function atualizarTotais() {
  document.getElementById("entrada").textContent = `Entrada: R$${listaRegistros.entradaTotal.toFixed(2)}`;
  document.getElementById("saida").textContent = `Saída: R$${listaRegistros.saidaTotal.toFixed(2)}`;
  document.getElementById("total").textContent = `Total: R$${listaRegistros.total.toFixed(2)}`;
}

function insertUsuario(textUsuario, number, date) {
  const numberValue = parseFloat(number);
  if (isNaN(numberValue)) {
    alert("Por favor, insira um número válido.");
    return;
  }
  
  listaRegistros.ultimoIdGerado++;
  listaRegistros.usuarios.push({ textUsuario, number: numberValue, date });
  
  // Atualizar os totais
  if (numberValue >= 0) {
    listaRegistros.entradaTotal += numberValue;
    listaRegistros.total += numberValue;
  } else {
    listaRegistros.saidaTotal += Math.abs(numberValue);
    listaRegistros.total += numberValue; // numberValue é negativo, então subtrai do total
  }

  gravarBD();
  render();
  
  document.getElementById("modal-container").classList.remove("mostrar");
}

function salvarEdicao() {
  const index = document.getElementById('indexEditando').value;
  const numberValue = parseFloat(document.getElementById('editNumber').value);

  if (index !== "") {
    if (isNaN(numberValue)) {
      alert("Por favor, insira um número válido.");
      return;
    }

    const usuario = listaRegistros.usuarios[index];
    
    // Atualizar os totais antes da substituição
    if (usuario.number >= 0) {
      listaRegistros.entradaTotal -= usuario.number;
    } else {
      listaRegistros.saidaTotal -= Math.abs(usuario.number);
    }
    
    listaRegistros.usuarios[index] = {
      textUsuario: document.getElementById('editTextUsuario').value,
      number: numberValue,
      date: document.getElementById('editDate').value
    };
    
    // Atualizar os totais após a substituição
    if (numberValue >= 0) {
      listaRegistros.entradaTotal += numberValue;
    } else {
      listaRegistros.saidaTotal += Math.abs(numberValue);
    }
    
    listaRegistros.total = listaRegistros.entradaTotal - listaRegistros.saidaTotal;

    limparEdicao();
    gravarBD();
    render();

    document.getElementById('modal-container2').classList.remove('mostrar');
  }
}

function deletar(index) {
  Swal.fire({
    title: "Você tem certeza?",
    text: "Não será possível reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, Deletar!"
  }).then((result) => {
    if (result.isConfirmed) {
      const usuario = listaRegistros.usuarios[index];
      
      // Atualizar os totais
      if (usuario.number >= 0) {
        listaRegistros.entradaTotal -= usuario.number;
        listaRegistros.total -= usuario.number;
      } else {
        listaRegistros.saidaTotal -= Math.abs(usuario.number);
        listaRegistros.total -= usuario.number; // numberValue é negativo, então subtrai do total
      }
      
      listaRegistros.usuarios.splice(index, 1);

      Swal.fire({
        title: "Deletado!",
        text: "Sua transação foi deletada",
        icon: "success"
      });

      gravarBD();
      render();
    }
  });
}

function limparEdicao() {
  document.getElementById("textUsuario").value = '';
  document.getElementById("number").value = '';
  document.getElementById("date").value = '';
  document.getElementById("editTextUsuario").value = "";
  document.getElementById("editNumber").value = "";
  document.getElementById("editDate").value = "";
}

window.addEventListener('load', () => {
  lerBD();

  document.getElementById("save-modal").addEventListener("click", (e) => {
    e.preventDefault();
    const textUsuario = document.getElementById('textUsuario').value;
    const number = document.getElementById('number').value;
    const date = document.getElementById('date').value;

    if (textUsuario && number && date) {
      insertUsuario(textUsuario, number, date);
    }
  });

  document.getElementById("btnSalvarEdicao").addEventListener("click", (e) => {
    e.preventDefault();
    salvarEdicao();
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("modal-container").classList.remove("mostrar");
  });

  document.getElementById("close-modal2").addEventListener("click", () => {
    document.getElementById("modal-container2").classList.remove("mostrar");
  });
});

function editar(index) {
  const usuario = listaRegistros.usuarios[index];
  
  // Preencher os campos do modal com os dados do usuário
  document.getElementById('editTextUsuario').value = usuario.textUsuario;
  document.getElementById('editNumber').value = usuario.number;
  document.getElementById('editDate').value = usuario.date;
  
  // Definir o índice que está sendo editado
  document.getElementById('indexEditando').value = index;
  
  // Abrir o modal de edição
  document.getElementById('modal-container2').classList.add('mostrar');
}

