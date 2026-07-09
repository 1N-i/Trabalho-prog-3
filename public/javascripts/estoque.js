document.addEventListener("DOMContentLoaded", function () {
  // 1- Lógica de entrada (CREATE)
  const formEntrada = document.getElementById("form-entrada");

  if (formEntrada) {
    formEntrada.addEventListener("submit", function (evento) {
      evento.preventDefault(); // Impede a página de recarregar

      const nomeItem = document.getElementById("nomeItem").value;
      const categoria = document.getElementById("categoria").value;
      const quantidade = parseInt(document.getElementById("quantidade").value);
      const quantidadeMinima = parseInt(
        document.getElementById("quantidadeMinima").value
      );
      const imagemUrl = document.getElementById("imagemUrl").value;

      // Criação do Objeto do novo item
      const novoItem = {
        id: Date.now(),
        nome: nomeItem,
        categoria: categoria,
        quantidade: quantidade,
        quantidadeMinima: quantidadeMinima,
        imagem: imagemUrl,
      };

      // Puxa o array atual do localStorage (ou cria um novo se estiver vazio)
      let estoque =
        JSON.parse(localStorage.getItem("almoxarifado_itens")) || [];

      estoque.push(novoItem);
      localStorage.setItem("almoxarifado_itens", JSON.stringify(estoque));

      alert("Item cadastrado com sucesso no almoxarifado!");
      formEntrada.reset();
    });
  }

  // 2- Lógica de retirada (UPDATE)
  const formRetirada = document.getElementById("form-retirada");

  if (formRetirada) {
    formRetirada.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const nomeRetirada = document
        .getElementById("nomeRetirada")
        .value.toLowerCase(); // Converte para letras minúsculas para facilitar a busca
      const qtdRetirada = parseInt(
        document.getElementById("qtdRetirada").value
      );

      let estoque =
        JSON.parse(localStorage.getItem("almoxarifado_itens")) || [];

      // Procura se o item digitado existe no nosso array
      const itemIndex = estoque.findIndex(
        (item) => item.nome.toLowerCase() === nomeRetirada
      );

      if (itemIndex !== -1) {
        // Verifica se tem quantidade suficiente em estoque para retirar
        if (estoque[itemIndex].quantidade >= qtdRetirada) {
          estoque[itemIndex].quantidade -= qtdRetirada; // Subtrai a quantidade
          localStorage.setItem("almoxarifado_itens", JSON.stringify(estoque)); // Salva a alteração

          alert(
            `Sucesso! ${qtdRetirada} unidade(s) de "${estoque[itemIndex].nome}" retirada(s).`
          );
          formRetirada.reset();
        } else {
          alert(
            `Erro: Quantidade insuficiente! O estoque atual é de apenas ${estoque[itemIndex].quantidade} unidades.`
          );
        }
      } else {
        alert(
          "Erro: Item não encontrado no estoque. Verifique se o nome foi digitado corretamente."
        );
      }
    });
  }

  // 3- Lógica da tabela (READ, DELETE E FILTRO)
  const corpoTabela = document.getElementById("corpo-tabela");
  const campoBusca = document.getElementById("buscaItem");

  if (corpoTabela) {
    // Função principal que lê os dados e cria a tabela na tela
    function carregarEstoque(estoqueFiltrado = null) {
      // Se recebermos um array filtrado, usamos ele. Se não, pegamos tudo do localStorage.
      const estoque =
        estoqueFiltrado ||
        JSON.parse(localStorage.getItem("almoxarifado_itens")) ||
        [];
      corpoTabela.innerHTML = "";

      if (estoque.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="6" class="texto-vazio">Nenhum item encontrado no estoque.</td></tr>`;
        return;
      }

      estoque.forEach(function (item) {
        // Lógica de renderização condicional (Selo de estoque baixo)
        const estoqueBaixo = item.quantidade <= item.quantidadeMinima;
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

    // Carrega o estoque logo que a página de inventário é aberta
    carregarEstoque();

    // Lógica do botão de remover (DELETE)
    corpoTabela.addEventListener("click", function (evento) {
      if (evento.target.classList.contains("btn-remover")) {
        // Pega o ID do item que está atrelado ao botão clicado
        const idRemover = parseInt(evento.target.getAttribute("data-id"));
        let estoque =
          JSON.parse(localStorage.getItem("almoxarifado_itens")) || [];

        // Remove do array o item que tem o ID igual ao que queremos apagar
        estoque = estoque.filter((item) => item.id !== idRemover);
        localStorage.setItem("almoxarifado_itens", JSON.stringify(estoque));

        // Recarrega a tabela visualmente para refletir a exclusão
        carregarEstoque();
      }
    });

    // Lógica da barra de pesquisa (FILTRO CONDICIONAL)
    if (campoBusca) {
      campoBusca.addEventListener("input", function (evento) {
        const termoBusca = evento.target.value.toLowerCase(); // O que o usuário está digitando
        const estoque =
          JSON.parse(localStorage.getItem("almoxarifado_itens")) || [];

        // Filtra o array se o nome do item conter a letra/palavra digitada
        const itensFiltrados = estoque.filter(
          (item) =>
            item.nome.toLowerCase().includes(termoBusca) ||
            item.categoria.toLowerCase().includes(termoBusca)
        );

        // Manda o array filtrado para nossa função de tabela exibir!
        carregarEstoque(itensFiltrados);
      });
    }
  }
});
