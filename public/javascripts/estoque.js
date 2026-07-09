document.addEventListener("DOMContentLoaded", function () {
    const formEntrada = document.getElementById("form-entrada");
  
    if (formEntrada) {
      formEntrada.addEventListener("submit", function (evento) {
        evento.preventDefault(); //para a pagina não recarregar
  
        const nomeItem = document.getElementById("nomeItem").value;
        const categoria = document.getElementById("categoria").value;
        const quantidade = parseInt(document.getElementById("quantidade").value);
        const quantidadeMinima = parseInt(
          document.getElementById("quantidadeMinima").value
        );
        const imagemUrl = document.getElementById("imagemUrl").value;
  
        const novoItem = {
          id: Date.now(), //cada objeto vai ter um id com base no mes, dia, hora, minutos e segundos
          nome: nomeItem,
          categoria: categoria,
          quantidade: quantidade,
          quantidadeMinima: quantidadeMinima,
          imagem: imagemUrl,
        };
  
        let estoque =
          JSON.parse(localStorage.getItem("almoxarifado_itens")) || [];
  
        estoque.push(novoItem);
        localStorage.setItem("almoxarifado_itens", JSON.stringify(estoque));
  
        alert("Item cadastrado com sucesso no almoxarifado!");
        formEntrada.reset();
      });
    }
  
    const corpoTabela = document.getElementById("corpo-tabela");
  
    if (corpoTabela) {
      function carregarEstoque() {
        const estoque =
          JSON.parse(localStorage.getItem("almoxarifado_itens")) || [];
        corpoTabela.innerHTML = "";
  
        if (estoque.length === 0) {
          corpoTabela.innerHTML = `<tr><td colspan="6" class="texto-vazio">Nenhum item cadastrado ainda. O estoque está vazio.</td></tr>`;
          return;
        }
  
        estoque.forEach(function (item) {
          const estoqueBaixo = item.quantidade <= item.quantidadeMinima;
  
          //aviso de alerta quando o estoque esta em baixa
          const corAlerta = estoqueBaixo
            ? "color: #e74c3c; font-weight: bold;"
            : "";
          const tagAlerta = estoqueBaixo
            ? '<span style="background-color: #e74c3c; color: white; padding: 3px 6px; border-radius: 4px; font-size: 12px; margin-left: 10px;">⚠️ Baixo</span>'
            : "";
  
          const imgTag = item.imagem
            ? `<img src="${item.imagem}" alt="Imagem do item" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">`
            : "Sem imagem";
  
          const tr = document.createElement("tr");
          tr.innerHTML = `
                      <td>${imgTag}</td>
                      <td>${item.nome} ${tagAlerta}</td>
                      <td>${item.categoria}</td>
                      <td style="${corAlerta}">${item.quantidade}</td>
                      <td>${item.quantidadeMinima}</td>
                      <td>
                          <button class="btn-remover" data-id="${item.id}" style="background-color: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Remover</button>
                      </td>
                  `;
          corpoTabela.appendChild(tr);
        });
      }
  
      carregarEstoque();
    }
  });
  