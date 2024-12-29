/* Script */

/* Variables */
// Variables for sound and music controls
let isSoundMuted = false;
let isMusicMuted = false;

/* Constants */
// Get the button elements and icons
const soundToggle = document.getElementById('sound-toggle');
const musicToggle = document.getElementById('music-toggle');
const soundIcon = document.getElementById('sound-icon');
const musicIcon = document.getElementById('music-icon');

/* BGM Player */
document.addEventListener('click', () => {
    const backgroundSound = document.getElementById('background-sound');

    // Ensure the audio is loaded and ready to play
    backgroundSound.addEventListener('canplaythrough', () => {
        backgroundSound.volume = 0.013; // Set the volume
        backgroundSound.play(); // Play the audio
    });

    // In case the audio is already ready to play
    if (backgroundSound.readyState >= 3) {
        backgroundSound.volume = 0.013;
        backgroundSound.play();
    }
})

/* Welcome Screen Fader */
window.onload = function () {
    // Wait for user interaction on the welcome screen
    document.getElementById("welcome-screen").addEventListener("click", function () {
        // Fade out the welcome screen
        document.getElementById("welcome-screen").style.opacity = '0';

        // After the fade-out transition ends, hide the welcome screen
        setTimeout(function () {
            document.getElementById("welcome-screen").style.display = "none"; // Hide the welcome screen

            // Show the board-title and corkboard with fade-in effect
            const boardTitle = document.getElementById("title-container");
            const corkboard = document.getElementById("corkboard");
            const soundControls = document.getElementById("sound-controls");

            boardTitle.style.display = "flex";
            corkboard.style.display = "grid";
            soundControls.style.display = "flex";

            // Trigger fade-in by setting opacity to 1
            setTimeout(function () {
                boardTitle.style.opacity = '1';
                corkboard.style.opacity = '1';
                soundControls.style.opacity = '1';
            }, 10); // Small delay to ensure display change is processed
        }, 2000); // Matches the fade-out transition duration (1s)
    });
};

/* Expanded Message Handler */
document.querySelectorAll('.sticky-note').forEach(note => {
    note.addEventListener('click', () => {
        // Extract content from the clicked sticky note (even if hidden in the original div)
        const title = note.querySelector('.note-name').textContent; // Get the title
        const message = note.querySelector('.note-message').innerHTML; // Get the message
        
        // Translation Check
        const translationElement = note.querySelector('.note-translation');
        const translation = translationElement ? translationElement.innerHTML : '';
        
        // Image Message Check
        const imageMessageElement = note.querySelector('.note-image-message');
        const imageMessage = imageMessageElement ? imageMessageElement.innerHTML : '';
        
        // Image check
        const imageElement = note.querySelector('.note-image');
        const imageSrc = imageElement ? imageElement.getAttribute('src') : 
            'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

        if (!translation) {
            document.getElementById('expanded-translation').style.visibility = 'hidden';
        } else {
            document.getElementById('expanded-translation').style.visibility = 'visible';
        }

        if (!imageMessage) {
            document.getElementById('expanded-image-message').style.visibility = 'hidden';
        } else {
            document.getElementById('expanded-image-message').style.visibility = 'visible';
        }

        // Populate the expanded note
        document.getElementById('expanded-title').textContent = title;
        document.getElementById('expanded-message').innerHTML = message;
        document.getElementById('expanded-translation').innerHTML = translation;
        document.getElementById('expanded-image-message').innerHTML = imageMessage;
        document.getElementById('expanded-image').setAttribute('src', imageSrc);

        // Show the expanded note
        const expandedNote = document.getElementById('expanded-note');
        expandedNote.style.display = 'flex';
    });
});


/* Closing the Expanded Message */
document.getElementById('close-btn').addEventListener('click', () => {
    const expandedNote = document.getElementById('expanded-note');

    // Clear content to prevent lingering data
    document.getElementById('expanded-title').textContent = ''; // Clear the title
    document.getElementById('expanded-message').innerHTML = '';
    document.getElementById('expanded-translation').innerHTML = '';
    document.getElementById('expanded-image-message').innerHTML = '';
    document.getElementById('expanded-image').setAttribute('src', '');

    // Hide the expanded note
    expandedNote.style.display = 'none';
});

// Counter to track the number of sounds playing
let playingSounds = 0;
const maxSounds = 3; // Maximum number of sounds that can play at once

// Function to play sound with a limit on the number of concurrent sounds
function playSoundLimited(src, options) {
    if (playingSounds < maxSounds) {
        const audio = new Audio(src);

        // Set volume if specified
        if (options.volume) {
            audio.volume = options.volume;
        }

        // Set random pitch if specified
        if (options.pitchRange) {
            audio.playbackRate = Math.random() * (options.pitchRange.max - options.pitchRange.min) + options.pitchRange.min;
        }

        // Increment the counter when a sound starts
        playingSounds++;

        // Play the sound
        audio.play();

        // Decrement the counter when the sound finishes
        audio.addEventListener('ended', () => {
            playingSounds--;
        });
    }
}

// Add event listeners for hover and click sounds on sticky notes
document.querySelectorAll('.sticky-note').forEach(note => {
    note.addEventListener('mouseenter', playHoverSound);
    note.addEventListener('click', playClickSound);
});

// Function to handle the hover sound
function playHoverSound() {
    if (isSoundMuted) return; // Exit early if sounds are muted
    playSoundLimited('Audio/BookmarkHover.mp3', { volume: 0.05, pitchRange: { min: 0.8, max: 1.2 } });
}

// Function to handle the click sound
function playClickSound() {
    if (isSoundMuted) return; // Exit early if sounds are muted
    playSoundLimited('Audio/BookmarkClick.mp3', { volume: 0.1, pitchRange: { min: 0.7, max: 1.3 } });
}

// Function to toggle sound mute
soundToggle.addEventListener('click', () => {
    isSoundMuted = !isSoundMuted;
    if (isSoundMuted) 
    {
        soundIcon.src = 'Icons/volume_off.png'; // Change to mute icon
    } 
    else 
    {
        soundIcon.src = 'Icons/volume_on.png'; // Change to sound on icon
    }
});

// Function to toggle music mute
musicToggle.addEventListener('click', () => {
    isMusicMuted = !isMusicMuted;
    if (isMusicMuted) {
        musicIcon.src = 'Icons/music_off.png'; // Change to mute icon
        // Mute background music
        const backgroundSound = document.getElementById('background-sound');
        if (backgroundSound) backgroundSound.muted = true;
    } else {
        musicIcon.src = 'Icons/music_on.png'; // Change to music on icon
        // Unmute background music
        const backgroundSound = document.getElementById('background-sound');
        if (backgroundSound) backgroundSound.muted = false;
    }
});
