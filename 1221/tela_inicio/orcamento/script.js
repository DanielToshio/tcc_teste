$(document).ready(function () {
  let items = [];
  
  $('#tipoProduto').change(function () {
      const selectedTipo = $(this).val();
      if (selectedTipo === 'outro') {
          $('#campoTipoOutro').show();
      } else {
          $('#campoTipoOutro').hide();
      }
  });
  
  $('#adicionarItem').click(function () {
      const tipoMarmore = $('#tipoMarmore').val();
      let tipoProduto = $('#tipoProduto').val();
      if (tipoProduto === 'outro') {
          tipoProduto = $('#tipoOutro').val();
      }
      const corMarmore = $('#corMarmore').val();
      
      const altura = parseFloat($('#altura').val());
      const comprimento = parseFloat($('#comprimento').val());
      const area = altura * comprimento; // Calcula a área em m²
      const valorMetroQuadrado = calcularValorMetroQuadrado(tipoProduto);
      const valorTotal = area * valorMetroQuadrado;
      
      if (!isNaN(valorTotal) && valorTotal > 0) {
          items.push({ tipoMarmore, corMarmore, tipoProduto, altura, comprimento, area, valorTotal });
          atualizarListaItens();
          calcularTotal();
      }
  });
  
  $('#finalizarOrcamento').click(function () {
      // Salve o orçamento na sessão de armazenamento local
      const orcamento = { items, total: calcularTotal() };
      localStorage.setItem('orcamento', JSON.stringify(orcamento));

      // Redirecione o usuário para a página de orçamento aprovado
      window.location.href = 'orcamento.html';
  });
  
  function calcularValorMetroQuadrado(tipoProduto) {
      // Defina os valores do metro quadrado para cada tipo de produto aqui
      // Exemplo: soleira = 100, pingadeira = 120, balcao = 150
      switch (tipoProduto) {
          case 'soleira':
              return 100;
          case 'pingadeira':
              return 120;
          case 'balcao':
              return 150;
          default:
              return 0;
      }
  }
  
  function atualizarListaItens() {
      const listaItens = $('#listaItens');
      listaItens.empty();
      
      items.forEach((item, index) => {
          listaItens.append(`<li class="list-group-item">Mármore: ${item.tipoMarmore} - Cor: ${item.corMarmore} - ${item.tipoProduto} - Altura: ${item.altura} m - Comprimento: ${item.comprimento} m - Área: ${item.area} m² - R$ ${item.valorTotal.toFixed(2)} <button class="btn btn-danger btn-sm float-right" onclick="removerItem(${index})">Remover</button></li>`);
      });
  }
  
  function calcularTotal() {
      const total = items.reduce((acc, item) => acc + item.valorTotal, 0);
      $('#total').text(total.toFixed(2));
  }
  
  function removerItem(index) {
      items.splice(index, 1);
      atualizarListaItens();
      calcularTotal();
  }
});