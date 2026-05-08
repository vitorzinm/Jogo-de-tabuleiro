$("#sairB").click(function () {
  window.close();
});
$("#comecarB").click(function () {
  if ($(".lob").css("display") === "block") {
    $(".lob").css("display", "none");
    $(".jogo").css("display", "none");
    $(".jogadorAdd").css("display", "block");
  }else if ($(".jogadorAdd").css("display") === "block") {
    $(".lob").css("display", "none");
    $(".jogo").css("display", "flex");
    $(".jogadorAdd").css("display", "none");
  }
});
$("#voltarB").click(function () {
  alert("De volta ao Lob!");
  if ($(".lob").css("display") === "none") {
    $(".lob").css("display", "block");
    $(".jogo").css("display", "none");
  } else {
    $(".lob").css("display", "block");
    $(".jogo").css("display", "none");
  }
});

$("#addNome").on("click", function () {
  var novocampo = `<div class="jogador">
        <input id="nomesJogadores" placeholder="Digite seu nome" name="nome">
        <input type="button" value="-" id="removerNome" class="excluir" />
    </div>`;
  $("#addNome").before(novocampo);
  
});

$(document).on("click", ".excluir", function () {
  $(this).prev("input[name='nome']").remove();
  $(this).remove();
  atribui();
  var index = $(this).index();
  lista.splice(index - 1, 1);
  console.log(lista);
});

var jogadores = [];

$("#salvarNomes").on("click", function () {
  jogadores = [];

  $("input[name='nome']").each(function () {
    let valor = $(this).val().trim();
    if (valor === "") {
      $(this).css("border", "2px solid red");
      return;
    }
    if (valor !== "") {
    if (valor.length < 3) {
      $(this).css("border", "2px solid red");
      alert("O nome deve conter pelo menos 3 caracteres.");
    } else {
      $(this).css("border", "2px solid green");
        setTimeout(function () {
          $("#comecarB").click();
        }, 500);
    }

    jogadores.push({
      nome: valor,
      casa: 0
      });
    }
});

  console.log(jogadores);
});

let tempoDado;

function animacaoDado(dado) {
  clearTimeout(tempoDado);

  $("#dadoB img").attr("src", "dice-game.gif");

  tempoDado = setTimeout(function () {
    $("#dadoB img").attr("src", `${dado}.png`);
  }, 500);
}

let numeroJogadorAtual = 0;

$("#dadoB").click(function () {
  let dado = Math.floor(Math.random() * 6) + 1;

  animacaoDado(dado);

  jogadores[numeroJogadorAtual].casa += dado;

  $("#infoDado").html("O dado rolou: " + dado);
  $("#infoCasa").html(
    jogadores[numeroJogadorAtual].nome +
    " avançou para a casa: " +
    jogadores[numeroJogadorAtual].casa
  );

  numeroJogadorAtual++;

  if (numeroJogadorAtual >= jogadores.length) {
    numeroJogadorAtual = 0;
  }
});