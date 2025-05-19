document.addEventListener("DOMContentLoaded", function () {
    const blogCards = document.querySelectorAll(".blog-card");
    const blogOverlay = document.querySelector(".blog-overlay");

    // Helper to expand a card
    function expandCard(card) {
        if (card.classList.contains("blog-expanded") || card.isClosing) return;
        if (card.hasAttribute("data-link")) {
            const url = card.getAttribute("data-link");
            window.open(url, "_blank", "noopener,noreferrer");
            return;
        }
        card.classList.add("blog-expanded");
        blogOverlay.classList.add("blog-overlay-active");
        const content = card.querySelector(".blog-content");
        if (content) {
            content.style.maxHeight = "1000px";
            content.style.opacity = "1";
        }
    }

    // Helper to collapse a card
    function collapseCard(card) {
        if (!card.classList.contains("blog-expanded") || card.isClosing) return;
        const content = card.querySelector(".blog-content");
        if (content) {
            content.style.maxHeight = "0";
            content.style.opacity = "0";
        }
        card.isClosing = true;
        card.classList.add("blog-collapsing");
        // Listen for transition end to finish collapse
        const onTransitionEnd = () => {
            card.classList.remove("blog-expanded", "blog-collapsing");
            blogOverlay.classList.remove("blog-overlay-active");
            card.isClosing = false;
            if (content) content.removeEventListener("transitionend", onTransitionEnd);
        };
        if (content) {
            content.addEventListener("transitionend", onTransitionEnd);
        } else {
            // Fallback if no content
            setTimeout(onTransitionEnd, 600);
        }
    }

    blogCards.forEach((card) => {
        card.isClosing = false;

        card.addEventListener("click", function (e) {
            if (e.target.classList.contains("blog-back-btn")) return;
            expandCard(card);
        });

        // Back button to collapse
        const backButtons = card.querySelectorAll(".blog-back-btn");
        backButtons.forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                collapseCard(card);
            });
        });
    });

    // Overlay click collapses expanded card
    blogOverlay.addEventListener("click", function () {
        const expandedCard = document.querySelector(".blog-card.blog-expanded");
        if (expandedCard) {
            collapseCard(expandedCard);
        }
    });

    // --- Search & filter functionality ---
    const searchInput = document.getElementById('search');
    const filterBtn = document.querySelector('.filter-btn');
    const filterOptions = document.querySelector('.filter-options');
    const blogContainer = document.querySelector('.blog-container');
    let currentFilter = "all";

    const filterImages = {
        "all": "icons/Filter.svg",
        "sun": "images/The Winnipeg Sun Icon.png",
        "wpg": "images/WPG-Logo-Icon.png"
    };

    filterBtn?.addEventListener("click", function (e) {
        e.stopPropagation();
        filterOptions?.classList.toggle("active");
    });

    filterOptions?.addEventListener("click", function (e) {
        const option = e.target.closest('.filter-option');
        if (!option) return;
        currentFilter = option.dataset.filter;
        filterBtn.innerHTML = `<img src="${filterImages[currentFilter]}" alt="${currentFilter} icon" />`;
        filterOptions.classList.remove("active");
        updateArticles();
    });

    function updateArticles() {
        const query = (searchInput?.value || "").toLowerCase();
        let anyVisible = false;
        document.querySelectorAll('.blog-card').forEach(article => {
            const title = article.querySelector('.blog-title')?.textContent.toLowerCase() || "";
            const summary = article.querySelector('.blog-summary')?.textContent.toLowerCase() || "";
            const source = article.dataset.source || "";
            const matchesSearch = title.includes(query) || summary.includes(query);
            const matchesFilter = currentFilter === "all" || source.toLowerCase() === currentFilter;
            if (matchesSearch && matchesFilter) {
                article.style.display = "";
                anyVisible = true;
            } else {
                article.style.display = "none";
            }
        });
        if (blogContainer) {
            blogContainer.style.justifyContent = anyVisible ? "" : "center";
        }
    }

    searchInput?.addEventListener('input', updateArticles);

    document.addEventListener("click", function (e) {
        if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target)) {
            filterOptions.classList.remove("active");
        }
    });
});
