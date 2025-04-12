document.addEventListener('DOMContentLoaded', function() {


    // Days Counter Function
function calculateDays() {
    const startDate = new Date('2024-04-13'); // Change to your anniversary date
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Create days counter element if it doesn't exist
    if (!document.getElementById('daysCounter')) {
        const header = document.querySelector('.header');
        const daysCounter = document.createElement('div');
        daysCounter.id = 'daysCounter';
        daysCounter.className = 'days-counter';
        daysCounter.innerHTML = `${diffDays}<span>Days</span>`;
        header.insertBefore(daysCounter, document.querySelector('.subtitle'));
    } else {
        document.getElementById('daysCounter').innerHTML = `${diffDays}<span>Days</span>`;
    }
}

// Add this CSS for days counter
const daysCounterCSS = `
.days-counter {
    font-size: 3rem;
    font-weight: bold;
    color: white;
    margin: 15px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.days-counter span {
    font-size: 1rem;
    display: block;
    margin-top: 5px;
    font-weight: normal;
}
`;

// Add the CSS to the head
const style = document.createElement('style');
style.innerHTML = daysCounterCSS;
document.head.appendChild(style);

// Initialize and update counter
calculateDays();
setInterval(calculateDays, 1000 * 60 * 60); // Update every hour


    // Music Player Functionality
    const songs = [
        { title: "Bags by Clairo", file: "1.mp3" },
        { title: "Love me not", file: "2.mp3" },
        { title: "Forever Yours", file: "3.mp3" }
        // Add more songs as needed
    ];

    const audioPlayer = new Audio();
    let currentSongIndex = 0;
    let isPlaying = false;

    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songTitle = document.getElementById('song-title');
    const progressBar = document.getElementById('progress');
    const progressContainer = document.querySelector('.progress-container');
    const volumeControl = document.getElementById('volume');
    const songList = document.getElementById('song-list');

    // Initialize playlist
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => playSong(index));
        songList.appendChild(li);
    });

    // Load song
    function loadSong(index) {
        currentSongIndex = index;
        const song = songs[index];
        songTitle.textContent = song.title;
        audioPlayer.src = `audio/${song.file}`;
        
        // Highlight current song in playlist
        Array.from(songList.children).forEach(li => li.classList.remove('playing'));
        songList.children[index].classList.add('playing');
    }

    // Play song
    function playSong(index) {
        loadSong(index);
        audioPlayer.play();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    // Toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        playSong(currentSongIndex);
    }

    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        playSong(currentSongIndex);
    }

    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }

    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Set volume
    function setVolume() {
        audioPlayer.volume = this.value;
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    volumeControl.addEventListener('input', setVolume);
    audioPlayer.addEventListener('ended', nextSong);

    // Load first song
    loadSong(0);

    // Photo Gallery Functionality
    const photos = [
        { src: "1.jpg", caption: "Our first day together" },
        { src: "2.jpg", caption: "A special moment we shared" },
        { src: "3.jpg", caption: "Celebrating our love" },
        { src: "4.jpg", caption: "Another special moment" },
        { src: "5.jpg", caption: "Our love story" },
        { src: "6.jpg", caption: "Our love story" },
        { src: "7.jpg", caption: "Our love story" },
        { src: "8.jpg", caption: "Our love story" },
        { src: "9.jpg", caption: "Our love story" },
        { src: "10.jpg", caption: "Our love story" },
        { src: "11.jpg", caption: "Our love story" },
        { src: "12.jpg", caption: "Our love story" },
        { src: "13.jpg", caption: "Our love story" },
        { src: "14.jpg", caption: "Our love story" },
        { src: "15.jpg", caption: "Our love story" },
        { src: "16.jpg", caption: "Our love story" },
        // Add more photos as needed
    ];

    const galleryContainer = document.querySelector('.gallery-container');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtnModal = document.querySelector('.prev');
    const nextBtnModal = document.querySelector('.next');
    let currentPhotoIndex = 0;

    // Create gallery items
    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = `img/${photo.src}`;
        img.alt = photo.caption;
        
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = photo.caption;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(caption);
        
        galleryItem.addEventListener('click', () => openModal(index));
        
        galleryContainer.appendChild(galleryItem);
    });

    // Open modal
    function openModal(index) {
        currentPhotoIndex = index;
        updateModal();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Update modal content
    function updateModal() {
        const photo = photos[currentPhotoIndex];
        modalImg.src = `img/${photo.src}`;
        modalCaption.textContent = photo.caption;
    }

    // Next photo
    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateModal();
    }

    // Previous photo
    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateModal();
    }

    // Event listeners for modal
    closeModal.addEventListener('click', closeModalFunc);
    nextBtnModal.addEventListener('click', nextPhoto);
    prevBtnModal.addEventListener('click', prevPhoto);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModalFunc();
            } else if (e.key === 'ArrowRight') {
                nextPhoto();
            } else if (e.key === 'ArrowLeft') {
                prevPhoto();
            }
        }
    });

    // Create floating hearts
    function createHearts() {
        const floatingHearts = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            heart.style.animation = `float ${Math.random() * 3 + 2}s infinite`;
            
            floatingHearts.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }
    }

    // Create hearts on load
    setTimeout(createHearts, 1000);
    setInterval(createHearts, 3000); 
});

// Floating Vinyl Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const vinyl = document.getElementById('vinyl');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const songInfo = document.getElementById('songInfo');
    const songList = document.getElementById('songList');
    const playlistDropdown = document.getElementById('playlistDropdown');
    const dropdownToggle = document.getElementById('dropdownToggle');
    
    const songs = [
        { title: "Bags by Clairo", file: "1.mp3" },
        { title: "Love me not", file: "2.mp3" },
        { title: "Wanna be yours by Arctic Monkeys", file: "3.mp3" }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Initialize playlist
    function initPlaylist() {
        songList.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.setAttribute('data-song', song.file);
            li.addEventListener('click', () => playSelectedSong(index));
            songList.appendChild(li);
        });
    }
    
    // Play selected song
    function playSelectedSong(index) {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audioPlayer.play();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        vinyl.classList.add('spinning');
        
        // Update active song in playlist
        Array.from(songList.children).forEach(li => li.classList.remove('active'));
        songList.children[currentSongIndex].classList.add('active');
    }
    
    // Load song
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = `audio/${song.file}`;
        songInfo.textContent = song.title;
    }
    
    // Toggle play/pause
    function togglePlay() {
        if (audioPlayer.paused) {
            if (audioPlayer.src === '') {
                playSelectedSong(0);
            } else {
                audioPlayer.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                vinyl.classList.add('spinning');
            }
            isPlaying = true;
        } else {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            vinyl.classList.remove('spinning');
            isPlaying = false;
        }
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        playSelectedSong(currentSongIndex);
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        playSelectedSong(currentSongIndex);
    }
    
    // Toggle playlist dropdown
    function togglePlaylist() {
        playlistDropdown.classList.toggle('open');
    }
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    dropdownToggle.addEventListener('click', togglePlaylist);
    
    // When song ends, play next
    audioPlayer.addEventListener('ended', nextSong);
    
    // Initialize
    initPlaylist();
    loadSong(0);
    
    // Make player draggable
    makeDraggable(document.getElementById('vinylPlayer'));
    
    // Draggable function
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // Get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            // Stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});
