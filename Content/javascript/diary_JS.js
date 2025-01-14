// Full-Screen Functionality for PDF Viewer
document.getElementById("fullscreenBtn").addEventListener("click", () => {
    const pdfViewer = document.getElementById("pdfViewer");
    try {
        // Attempt to enter full-screen mode
        if (pdfViewer.requestFullscreen) {
            pdfViewer.requestFullscreen();
        } else if (pdfViewer.webkitRequestFullscreen) { // Safari
            pdfViewer.webkitRequestFullscreen();
        } else if (pdfViewer.msRequestFullscreen) { // IE/Edge
            pdfViewer.msRequestFullscreen();
        } else {
            alert("Your browser does not support full-screen mode.");
        }
    } catch (error) {
        console.error("Full-screen request failed:", error);
        alert("Full-screen mode could not be activated. Please check your browser settings.");
    }
});

// Dynamically adjust the PDF viewer's height based on the window size
function resizePdfViewer() {
    const container = document.getElementById('pdfViewerContainer');
    const windowHeight = window.innerHeight;
    container.style.height = `${Math.max(windowHeight * 0.7, 300)}px`; // 70% of window height, minimum 300px
}

// Call the function on page load and whenever the window resizes
window.addEventListener('load', resizePdfViewer);
window.addEventListener('resize', resizePdfViewer);

document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("pdfViewer");
    const fallback = document.getElementById("fallback");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    // Check if the iframe loads successfully
    iframe.onerror = function () {
        if (iframe.contentDocument && iframe.contentDocument.body.innerHTML.includes("404")) {
            iframe.style.display = "none";
            fallback.style.display = "block";
            fullscreenBtn.disabled = true;  // Disable the fullscreen button
            fullscreenBtn.style.display = "none";
        } else {
            fullscreenBtn.disabled = false; // Enable the fullscreen button if the PDF loads correctly
        }
    };

    // Fallback for older browsers or restricted environments
    iframe.onload = function () {
        if (iframe.contentDocument && iframe.contentDocument.body.innerHTML.includes("404")) {
            iframe.style.display = "none";
            fallback.style.display = "block";
        }
    };
});