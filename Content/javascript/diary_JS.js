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
