let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Show Meditation Options
function showMeditationOptions() {
    document.getElementById('meditation-options').style.display = 'block';
}

// Start Meditation Timer with Countdown
function startMeditation() {
    const timeInput = document.getElementById('meditation-time').value;
    const countdownDisplay = document.getElementById('countdown-display');

    if (!timeInput || timeInput <= 0) {
        alert('Please enter a valid meditation time in minutes.');
        return;
    }

    let remainingTime = timeInput * 60; // Convert minutes to seconds
    countdownDisplay.textContent = `Time Remaining: ${formatTime(remainingTime)}`;

    const countdownInterval = setInterval(() => {
        remainingTime -= 1;
        countdownDisplay.textContent = `Time Remaining: ${formatTime(remainingTime)}`;
        
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = 'Meditation Complete!';
            alert('Meditation session complete! Time to come back to the present.');
        }
    }, 1000);
}

// Format Time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Add Emergency Contact
function addEmergencyContact() {
    const name = prompt("Enter the name of person you would like to talk when you are feeling down:");
    const phone = prompt("Enter the phone number of the person:");
    if (name && phone) {
        contacts.push({ name, phone });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        alert(`Contact saved: ${name}, ${phone}`);
        showContacts(); // Refresh contact list
    } else {
        alert("Emergency contact not saved. Please provide valid details.");
    }
}

// Show Contacts
function showContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    if (contacts.length === 0) {
        contactList.innerHTML = '<li>No contacts added yet.</li>';
        return;
    }
    contacts.forEach(contact => {
        const listItem = document.createElement('li');
        listItem.textContent = `${contact.name}: ${contact.phone}`;
        contactList.appendChild(listItem);
    });
}

// Want to Talk to Someone Feature
function wantToTalk() {
    if (contacts.length === 0) {
        alert('No emergency contacts available. Add some contacts first!');
        return;
    }
    contacts.forEach(contact => {
        console.log(`Notification sent to ${contact.name}: "${contact.phone}"`);
        // Simulate notification logic
    });
    alert('A notification has been sent to all contacts that you want to talk.');
}

// Chat with Emosync
function chatWithEmosync() {
    alert("Redirecting to Emosync chat bot...");
    // Code to integrate with Emosync chat functionality can be added here
}
document.addEventListener('DOMContentLoaded', () => {
    const playlistUl = document.getElementById('playlist-ul');
    const addPlaylistBtn = document.getElementById('add-playlist-btn');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistUrlInput = document.getElementById('playlist-url');

    // Event listener for adding a playlist
    addPlaylistBtn.addEventListener('click', () => {
        const playlistName = playlistNameInput.value.trim();
        const playlistUrl = playlistUrlInput.value.trim();

        // Validate input fields
        if (playlistName === '' || playlistUrl === '') {
            alert('Please fill out both fields!');
            return;
        }

        // Create a new list item
        const newPlaylistItem = document.createElement('li');
        const newPlaylistLink = document.createElement('a');

        newPlaylistLink.textContent = playlistName;
        newPlaylistLink.href = playlistUrl;
        newPlaylistLink.target = '_blank'; // Open link in a new tab

        newPlaylistItem.appendChild(newPlaylistLink);
        playlistUl.appendChild(newPlaylistItem);

        // Clear input fields
        playlistNameInput.value = '';
        playlistUrlInput.value = '';

        alert('Playlist added successfully!');
    });
});
