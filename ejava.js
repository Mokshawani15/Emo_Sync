// Video Call Function
const videoCallBtn = document.getElementById('videoCallBtn');
videoCallBtn.addEventListener('click', () => {
    const videoCallUrl = "https://meet.google.com/kqv-kusf-sab"; // Replace with your video call link
    window.open(videoCallUrl, '_blank', 'width=800,height=600');
});

// Chat with Therapist
const chatTherapistBtn = document.getElementById('chatTherapistBtn');
chatTherapistBtn.addEventListener('click', () => {
    const chatPageUrl = "https://your-therapist-chat-link.com"; // Replace with your chat page link
    window.open(chatPageUrl, '_blank');
});
