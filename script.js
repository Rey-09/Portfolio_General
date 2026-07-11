document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGIKA DARK MODE ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Cek preferensi sebelumnya di LocalStorage agar tidak reset saat pindah halaman
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateDarkModeIcon(true);
    }

    // Event saat tombol ditekan
    darkModeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateDarkModeIcon(false);
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateDarkModeIcon(true);
        }
    });

    // Fungsi mengubah ikon dan teks tombol
    function updateDarkModeIcon(isDark) {
        if(isDark) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
        }
    }

    // --- 2. LOGIKA TOGGLE ANIMASI ---
    const animationToggle = document.getElementById('animationToggle');
    let animationsEnabled = true;

    animationToggle.addEventListener('click', () => {
        animationsEnabled = !animationsEnabled;
        if (animationsEnabled) {
            body.classList.remove('no-animations');
            animationToggle.innerHTML = '<i class="fas fa-magic"></i> <span>Animations: ON</span>';
        } else {
            body.classList.add('no-animations');
            animationToggle.innerHTML = '<i class="fas fa-times-circle"></i> <span>Animations: OFF</span>';
        }
    });
});

// --- 3. LOGIKA KIRIM PESAN KE WHATSAPP ---
    const whatsappForm = document.getElementById('whatsappForm');
    
    // Cek apakah form whatsapp ada di halaman ini (karena script.js dipakai di semua halaman)
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah halaman ke-refresh saat tombol ditekan

            // 1. Ambil nilai dari inputan
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const pesan = document.getElementById('pesan').value;

            // Wajib gunakan format kode negara tanpa tanda '+'. Contoh: 0812345... menjadi 62812345...
            const nomorWA = "6281245162041"; 

            // 3. Format pesan yang akan masuk ke chat ( %0A itu kode untuk Enter/Ganti Baris )
            const teksPesan = `Halo, saya *${nama}*.%0AEmail: ${email}%0A%0A*Pesan:*%0A${pesan}`;

            // 4. Buat Link WhatsApp API
            const linkWA = `https://wa.me/${nomorWA}?text=${teksPesan}`;

            // 5. Buka link WhatsApp di tab baru
            window.open(linkWA, '_blank');
        });
    }