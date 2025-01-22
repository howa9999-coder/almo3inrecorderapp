let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    // Save the event so it can be triggered later
    deferredPrompt = e;
    // Show your custom install button/UI
    document.querySelector('.install-prompt').style.display = 'block';
});

document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        // Wait for the user's response
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null; // Clear the prompt
        document.querySelector('.install-prompt').style.display = 'none';
    }
});

// Dismiss the prompt
document.getElementById('dismiss-btn').addEventListener('click', () => {
    document.querySelector('.install-prompt').style.display = 'none';
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    // Hide the install UI
    document.querySelector('.install-prompt').style.display = 'none';
});
