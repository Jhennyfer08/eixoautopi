// Função para renderizar resultados de busca
function renderizarBusca(produtos) {
    const container = document.getElementById('busca-resultados');
    if (!container) return;
    container.innerHTML = '';

    if (!produtos.length) {
        container.innerHTML = '<div style="padding:8px;">Nenhum produto encontrado.</div>';
        container.style.display = 'block';
        return;
    }

    // Armazena o produto inteiro como string JSON no atributo data
    container.innerHTML = produtos.map(prod =>
        `<div class="item-busca" 
              style="padding:8px;cursor:pointer;border-bottom:1px solid #eee;"
              data-produto='${JSON.stringify(prod)}'>
            <span>${prod.nome}</span>
        </div>`
    ).join('');
    container.style.display = 'block';
}


// Evento de busca
const inputBusca = document.getElementById('input-busca');
const btnBusca = document.getElementById('btn-busca');
const buscaResultados = document.getElementById('busca-resultados');
buscaResultados.style.display = 'none';

inputBusca.addEventListener('input', function () {
    const termo = this.value.trim();
    if (termo.length < 2) {
        buscaResultados.innerHTML = '';
        return;
    }
    fetch('/eixoauto/eixoautopi/pages/search_produtos.php?q=' + encodeURIComponent(termo))
        .then(r => r.json())
        .then(data => {
            renderizarBusca(data);
        });
});

// Evento de clique nos itens da busca
buscaResultados.addEventListener('click', function (e) {
    const item = e.target.closest('.item-busca');
    if (item) {
        try {
            const produto = JSON.parse(item.getAttribute('data-produto'));
            apresentar(produto); // ← Salva e redireciona corretamente
        } catch (err) {
            console.error("Erro ao interpretar produto da busca:", err);
        }
    }
});


const carrossels = document.querySelectorAll('.container-slide');
carrossels.forEach(container => {
    const slide = container.querySelector('#slider');
    const images = slide.querySelectorAll('.img-slides');
    const totalImages = images.length;
    let i = 0;

    function updateSlide() {
        slide.style.transform = `translateX(-${i * 100}%)`;
    }

    document.addEventListener("click", (event) => {
        if (event.target.id === "next") {
            i = (i + 1) % totalImages;
            updateSlide();
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.id === "prev") {
            i = (i - 1 + totalImages) % totalImages;
            updateSlide();
        }
    });

    // Auto avançar a cada 3 segundos dos slides

    setInterval(() => {
        if (i == totalImages - 1) {
            i = 0;
        } else {
            i++;
        }
        updateSlide()
    }, 5000);
});


// Auto avançar a cada 3 segundos do banner
const banner = document.getElementById("banner");
const img = banner.querySelectorAll(".img-banner");
const banner_img = img.length;
let j = 0;

function Banner() {
    banner.style.transform = `translateX(-${j * 100}%)`;
}

setInterval(() => {
    if (j == banner_img - 1) {
        j = 0;
    } else {
        j++;
    }
    Banner();
}, 3000);
