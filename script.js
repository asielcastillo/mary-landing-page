document.addEventListener('DOMContentLoaded', function() {
    // --------------------------------------------------------
    // 1. Menu de Navegação Responsivo (Toggle do Menu Hamburger)
    // --------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.main-nav .nav-list'); // Seleciona a ul
    const navLinks = document.querySelectorAll('.main-nav .nav-list a');

    if (menuToggle && mainNav && navList) {
        // Inicializa o estado de acessibilidade
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'main-navigation'); // Adicione um id à sua ul.main-nav no HTML

        // Adiciona um ID à lista de navegação para o atributo aria-controls
        navList.id = 'main-navigation';

        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(!isExpanded)); // Atualiza o atributo aria-expanded

            // Mudar o ícone do menu para 'X' ou '☰' para melhor feedback visual
            menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });

        // Fechar o menu quando um link é clicado (útil em mobile)
        // Adicionamos o listener na lista (event delegation) para ser mais eficiente
        navList.addEventListener('click', function(e) {
            // Verifica se o clique foi em um link (<a>)
            if (e.target.tagName === 'A' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false'); // Resetar atributo
                menuToggle.textContent = '☰'; // Resetar ícone
            }
        });
    }

    // --------------------------------------------------------
    // 2. Scroll Suave para Links de Âncora com Compensação para Header Fixo
    // --------------------------------------------------------
    // A melhor prática moderna para compensar o header fixo é via CSS: scroll-margin-top.
    // Isso é mais performático e evita complexidade no JS.
    // Por favor, adicione a regra CSS abaixo ao seu arquivo style.css:
    //
    // section[id] {
    //     scroll-margin-top: 80px; /* Ajuste este valor para a altura exata do seu header + um pequeno offset de preferência */
    // }
    //
    // Com essa regra CSS, o JavaScript de smooth scroll pode ser simples.

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão de "pular"

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Alinha o topo do elemento com o topo da viewport
                });
                // Com scroll-margin-top no CSS, não precisamos de ajuste de scroll aqui no JS.
            }
        });
    });
});