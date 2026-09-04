/* =====================================================
   BLOCO 1 - FUNÇÃO PRINCIPAL
   Busca o prato digitado pelo usuário
   ===================================================== */

async function buscarClima() {

    // Pega o nome do prato digitado no campo
    const cidade = document.getElementById("cidade").value.trim();

    // Pega o elemento onde vamos mostrar o resultado
    const mensagem = document.getElementById("mensagem");

    // Verifica se o usuário não digitou nada
    if (cidade === "") {
        mensagem.innerText = "Digite um prato para consultar.";
        return;
    }

    // Mostra uma mensagem enquanto pesquisa
    mensagem.innerText = "Buscando informações...";

    try {

        /* =================================================
              BLOCO 2 - BUSCA NA API
           ================================================= */

        const respostaPrato = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cidade)}`
        );

        const dadosPrato = await respostaPrato.json();


        // Verifica se o prato foi encontrado
        if (!dadosPrato.meals) {
            mensagem.innerText = "Prato não encontrado.";
            return;
        }


        // Pega o primeiro prato encontrado
        const prato = dadosPrato.meals[0];


        // Pega as informações do prato
        const nomePrato = prato.strMeal;

        const categoria = prato.strCategory;

        const origem = prato.strArea;

        const imagem = prato.strMealThumb;

        const instrucoes = prato.strInstructions;


        /* =================================================
           BLOCO 3 - MOSTRA O RESULTADO NA TELA
           ================================================= */

        mensagem.innerHTML = `
            <strong>${nomePrato}</strong>

         
            >

            <br><br>

            🍽️ Categoria: ${categoria}

            <br>

            🌎 Origem: ${origem}

            <br><br>

            📖 Modo de preparo:

            <br><br>

            ${instrucoes}
        `;


    } catch (erro) {

        // Caso aconteça algum problema na conexão
        mensagem.innerText =
            "Não foi possível consultar o prato. Tente novamente.";

        console.error(erro);
    }
}


/* =====================================================
   BLOCO 4 - SERVICE WORKER

   Registra o Service Worker para o funcionamento
   do aplicativo como PWA.
   ===================================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker
            .register("./sw.js")

            .then(function(registro) {

                console.log(
                    "Service Worker registrado:",
                    registro.scope
                );

            })

            .catch(function(erro) {

                console.error(
                    "Erro ao registrar o Service Worker:",
                    erro
                );

            });

    });

}