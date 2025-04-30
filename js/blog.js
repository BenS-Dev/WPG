document.addEventListener("DOMContentLoaded", function () {
    const blogCards = document.querySelectorAll(".blog-card");
    const blogOverlay = document.querySelector(".blog-overlay");

    blogCards.forEach((card) => {
        let isClosing = false;

        card.addEventListener("click", function (e) {
            // Don’t trigger if clicking the back button
            if (e.target.classList.contains("blog-back-btn")) return;

            // Prevent reopening while collapsing
            if (isClosing) return;

            // If not already expanded…
            if (!card.classList.contains("blog-expanded")) {
                // If there’s a data-link, open it in a new tab
                if (card.hasAttribute("data-link")) {
                    const url = card.getAttribute("data-link");
                    window.open(url, "_blank", "noopener,noreferrer");
                    return;
                }
                // Otherwise expand inline
                card.classList.add("blog-expanded");
                blogOverlay.classList.add("blog-overlay-active");
                const content = card.querySelector(".blog-content");
                content.style.maxHeight = "1000px";
                content.style.opacity = "1";
            }
        });

        // Back button to collapse
        const backButtons = card.querySelectorAll(".blog-back-btn");
        backButtons.forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                const content = card.querySelector(".blog-content");
                content.style.maxHeight = "0";
                content.style.opacity = "0";
                isClosing = true;
                card.classList.add("blog-collapsing");
                setTimeout(() => {
                    card.classList.remove("blog-expanded", "blog-collapsing");
                    blogOverlay.classList.remove("blog-overlay-active");
                    isClosing = false;
                }, 600);
            });
        });
    });

    // Overlay click collapses expanded card
    blogOverlay.addEventListener("click", function () {
        const expandedCard = document.querySelector(".blog-card.blog-expanded");
        if (!expandedCard) return;

        const content = expandedCard.querySelector(".blog-content");
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        // note: reuse isClosing from outer scope by redefining here
        let isClosing = true;
        expandedCard.classList.add("blog-collapsing");
        setTimeout(() => {
            expandedCard.classList.remove("blog-expanded", "blog-collapsing");
            blogOverlay.classList.remove("blog-overlay-active");
            isClosing = false;
        }, 600);
    });
});

// Search & filter functionality unchanged…
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search');
    const filterBtn = document.querySelector('.filter-btn');
    const filterOptions = document.querySelector('.filter-options');
    let currentFilter = "all";

    const filterImages = {
        "all": "icons/Filter.svg",
        "sun": "images/The Winnipeg Sun Icon.png",
        "wpg": "images/WPG-Logo-Icon.png"
    };

    filterBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        filterOptions.classList.toggle("active");
    });

    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener("click", function () {
            currentFilter = this.dataset.filter;
            filterBtn.innerHTML = `<img src="${filterImages[currentFilter]}" alt="${currentFilter} icon" />`;
            filterOptions.classList.remove("active");
            updateArticles();
        });
    });

    function updateArticles() {
        const query = searchInput.value.toLowerCase();
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
        document.querySelector('.blog-container').style.justifyContent = anyVisible ? "" : "center";
    }

    searchInput.addEventListener('input', updateArticles);

    document.addEventListener("click", function (e) {
        if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target)) {
            filterOptions.classList.remove("active");
        }
    });
});
