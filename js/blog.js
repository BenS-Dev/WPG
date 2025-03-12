document.addEventListener("DOMContentLoaded", function () {
    const blogCards = document.querySelectorAll(".blog-card");
    const blogOverlay = document.querySelector(".blog-overlay");

    // Add click event for each blog card
    blogCards.forEach((card) => {
        let isClosing = false;

        card.addEventListener("click", function (e) {
            // Do not trigger if clicking the back button
            if (e.target.classList.contains("blog-back-btn")) return;

            // Prevent reopening if the card is in the process of closing
            if (isClosing) return;

            // If the card is not already expanded…
            if (!card.classList.contains("blog-expanded")) {
                // If the card has a data-link, navigate to that URL
                if (card.hasAttribute("data-link")) {
                    window.location.href = card.getAttribute("data-link");
                    return;
                }
                // Otherwise, expand the card
                card.classList.add("blog-expanded");
                blogOverlay.classList.add("blog-overlay-active");
                // Reset content properties for expanded view
                card.querySelector(".blog-content").style.maxHeight = "1000px";
                card.querySelector(".blog-content").style.opacity = "1";
            }
        });

        // Back button to collapse an expanded card
        const backButtons = card.querySelectorAll(".blog-back-btn");
        backButtons.forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation(); // Prevent card click event
                // Immediately hide the text
                card.querySelector(".blog-content").style.maxHeight = "0";
                card.querySelector(".blog-content").style.opacity = "0";
                isClosing = true;
                card.classList.add("blog-collapsing");
                setTimeout(function () {
                    card.classList.remove("blog-expanded", "blog-collapsing");
                    blogOverlay.classList.remove("blog-overlay-active");
                    isClosing = false;
                }, 600); // Duration matches the CSS animation
            });
        });
    });

    // Clicking the overlay collapses the expanded card
    blogOverlay.addEventListener("click", function () {
        const expandedCard = document.querySelector(".blog-card.blog-expanded");
        if (expandedCard) {
            // Immediately hide the text
            expandedCard.querySelector(".blog-content").style.maxHeight = "0";
            expandedCard.querySelector(".blog-content").style.opacity = "0";
            isClosing = true;
            expandedCard.classList.add("blog-collapsing");
            setTimeout(function () {
                expandedCard.classList.remove("blog-expanded", "blog-collapsing");
                blogOverlay.classList.remove("blog-overlay-active");
                isClosing = false;
            }, 600);
        }
    });
});

// Updated Search functionality -->
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search');
    const filterBtn = document.querySelector('.filter-btn');
    const filterOptions = document.querySelector('.filter-options');
    let currentFilter = "all";

    // Mapping filter values to image URLs (paths are relative to the HTML file)
    const filterImages = {
        "all": "icons/Filter.svg",
        "sun": "images/The Winnipeg Sun Icon.png",
        "wpg": "images/WPG-Logo-Icon.png"
    };

    // Toggle dropdown when clicking the filter button
    filterBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        filterOptions.classList.toggle("active");
    });

    // Listen for clicks on each filter option
    const filterOptionElements = document.querySelectorAll('.filter-option');
    filterOptionElements.forEach(option => {
        option.addEventListener("click", function () {
            currentFilter = this.getAttribute("data-filter");
            // Update the filter button to show the corresponding image
            filterBtn.innerHTML = `<img src="${filterImages[currentFilter]}" alt="${currentFilter} icon" />`;
            filterOptions.classList.remove("active");
            updateArticles();
        });
    });

    // Function to update articles based on search input and filter selection
    function updateArticles() {
        const query = searchInput.value.toLowerCase();
        const articles = document.querySelectorAll('.blog-card');
        let anyVisible = false;
        articles.forEach(article => {
            const title = article.querySelector('.blog-title')
                ? article.querySelector('.blog-title').textContent.toLowerCase()
                : "";
            const summary = article.querySelector('.blog-summary')
                ? article.querySelector('.blog-summary').textContent.toLowerCase()
                : "";
            const source = article.getAttribute('data-source') || "";
            const matchesSearch = (title.includes(query) || summary.includes(query));
            const matchesFilter = (currentFilter === "all" || source.toLowerCase() === currentFilter.toLowerCase());
            if (matchesSearch && matchesFilter) {
                article.style.display = "block";
                anyVisible = true;
            } else {
                article.style.display = "none";
            }
        });
        // Center the container if no articles are visible
        const blogContainer = document.querySelector('.blog-container');
        blogContainer.style.justifyContent = anyVisible ? "" : "center";
    }

    // Update articles on search input
    searchInput.addEventListener('input', updateArticles);

    // Hide the dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!filterBtn.contains(event.target) && !filterOptions.contains(event.target)) {
            filterOptions.classList.remove("active");
        }
    });
});