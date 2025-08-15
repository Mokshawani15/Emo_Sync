document.addEventListener('DOMContentLoaded', () => {
    let pages = JSON.parse(localStorage.getItem('pages')) || [];
    const pagesContainer = document.getElementById('pagesContainer');

    if (pages.length === 0) {
        pagesContainer.innerHTML = '<p>No scrapbook pages found.</p>';
        return;
    }

    // Load and display all scrapbook pages
    pages.forEach((pageData, pageIndex) => {
        const pageElement = createPageElement(pageData, pageIndex);
        pagesContainer.appendChild(pageElement);
    });

    // Helper function to create page elements
    function createPageElement(pageData, pageIndex) {
        const pageElement = document.createElement('div');
        pageElement.classList.add('scrapbook-page');

        // Add title
        const titleElement = document.createElement('h2');
        titleElement.textContent = pageData.tags; // Display tags as the title
        titleElement.style.textAlign = 'center';
        pageElement.appendChild(titleElement);

        // Add content
        const contentElement = document.createElement('p');
        contentElement.textContent = pageData.text;
        pageElement.appendChild(contentElement);

        // Add photo slideshow
        const slideshowElement = document.createElement('div');
        pageData.photos.forEach((photoSrc, photoIndex) => {
            const imgElement = document.createElement('img');
            imgElement.src = photoSrc;

            if (photoIndex === 0) {
                imgElement.classList.add('active');
            }

            slideshowElement.appendChild(imgElement);
        });
        pageElement.appendChild(slideshowElement);

        // Add audio (if available)
        if (pageData.audio) {
            const audioElement = document.createElement('audio');
            audioElement.src = pageData.audio;
            audioElement.controls = true;
            pageElement.appendChild(audioElement);
        }

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Page';
        deleteButton.classList.add('delete-page-btn');

        deleteButton.addEventListener('click', () => {
            // Remove the page from the array
            pages = pages.filter((_, index) => index !== pageIndex);

            // Update the array in localStorage
            localStorage.setItem('pages', JSON.stringify(pages));

            // Remove the page element from the DOM
            pageElement.remove();

            alert('Page deleted successfully!');
        });

        pageElement.appendChild(deleteButton);

        return pageElement;
    }
});
