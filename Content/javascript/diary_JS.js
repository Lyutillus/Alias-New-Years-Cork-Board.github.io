// Call the function on page load and whenever the window resizes
window.addEventListener('load', resizePdfViewer);
window.addEventListener('resize', resizePdfViewer);

document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("pdfViewer");
    const fallback = document.getElementById("fallback");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    // Ensure elements are found before proceeding
    if (iframe && fallback && fullscreenBtn) {

        // Check if the PDF loads successfully
        iframe.onerror = function () {
            iframe.style.display = "none"; // Hide the iframe
            fallback.style.display = "block"; // Show the fallback content
            fullscreenBtn.disabled = true;  // Disable the fullscreen button
        };

        // Fallback for older browsers or restricted environments
        iframe.onload = function () {
            // If PDF loads correctly, enable the fullscreen button
            fullscreenBtn.disabled = false;
        };

        // Fullscreen functionality (if needed)
        fullscreenBtn.addEventListener("click", function () {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.mozRequestFullScreen) { // Firefox
                iframe.mozRequestFullScreen();
            } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) { // IE/Edge
                iframe.msRequestFullscreen();
            }
        });
    } else {
        console.error("Missing elements: Ensure iframe, fallback, and fullscreen button are present.");
    }
});
