// Call the function on page load and whenever the window resizes
window.addEventListener('load', resizePdfViewer);
window.addEventListener('resize', resizePdfViewer);

document.addEventListener("DOMContentLoaded", function () {
    const object = document.getElementById("pdfViewer");
    const fallback = document.getElementById("fallback");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    // Check if the PDF loads successfully
    object.onerror = function () {
        object.style.display = "none"; // Hide the object
        fallback.style.display = "block"; // Show the fallback content
        fullscreenBtn.disabled = true;  // Disable the fullscreen button
    };

    // Fallback for older browsers or restricted environments
    object.onload = function () {
        // If PDF loads correctly, enable the fullscreen button
        fullscreenBtn.disabled = false;
    };

    // Fullscreen functionality (if needed)
    fullscreenBtn.addEventListener("click", function () {
        if (object.requestFullscreen) {
            object.requestFullscreen();
        } else if (object.mozRequestFullScreen) { // Firefox
            object.mozRequestFullScreen();
        } else if (object.webkitRequestFullscreen) { // Chrome, Safari, Opera
            object.webkitRequestFullscreen();
        } else if (object.msRequestFullscreen) { // IE/Edge
            object.msRequestFullscreen();
        }
    });
});