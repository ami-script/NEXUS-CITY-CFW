function showSection(section) {
    const rulesSection = document.querySelector('.rules-section');
    const celebritiesSection = document.querySelector('.celebrities-section');
    const celebrityRulesSection = document.getElementById('celebrity-rules');
    const rulesBtn = document.getElementById('rulesBtn');
    const celebritiesBtn = document.getElementById('celebritiesBtn');
    
    if (section === 'rules') {
        rulesSection.style.display = 'block';
        celebritiesSection.style.display = 'none';
        celebrityRulesSection.style.display = 'none';
        rulesBtn.classList.add('active', 'pulse');
        celebritiesBtn.classList.remove('active', 'pulse');
    } 
    else if (section === 'celebrities') {
        rulesSection.style.display = 'none';
        celebrityRulesSection.style.display = 'block';
        celebritiesSection.style.display = 'block';
        celebritiesBtn.classList.add('active', 'pulse');
        rulesBtn.classList.remove('active', 'pulse');
        loadCelebrities();
    }
    
    playClickSound();
}

// تعديل الدالة الأصلية لتعمل مع النظام الجديد
function toggleSections() {
    const currentActive = document.querySelector('.section-toggle-btn.active');
    if (currentActive.id === 'rulesBtn') {
        showSection('celebrities');
    } else {
        showSection('rules');
    }
}

function playSocialMediaSound(platform) {
    const soundFile = platform === 'tiktok' ? 'tiktok-sound.mp3' : 'discord-sound.mp3';
    const audio = new Audio(`sounds/${soundFile}`);
    audio.volume = 0.3;
    audio.play().catch(e => console.error('تعذر تشغيل الصوت:', e));
}

// Load celebrities data
function loadCelebrities() {
    const celebritiesContainer = document.querySelector('.celebrities-container');
    if (!celebritiesContainer || celebritiesContainer.children.length > 0) return;

    // Sample data - replace with your actual data
    const celebrities = [
        {
        name: "🔱 ملف الليبي 🔱",
        description: "",
        image: "images/malf_libya.png",
        tiktok: "https://www.tiktok.com/@malf_libya",
        },
        {
        name: "ZET0ONA",
        description: "",
        image: "images/zet0ona.png",
        tiktok: "https://www.tiktok.com/@zet0ona?is_from_webapp=1&sender_device=pc",
        // youtube: "https://youtube.com/...",
        // twitter: "https://twitter.com/...",
        // instagram: "https://instagram.com/..."
        },
        {
        name: "s.w.a.t650",
        description: "",
        image: "images/s.w.a.t650.png",
        tiktok: "https://www.tiktok.com/@s.w.a.t650?is_from_webapp=1&sender_device=pc",
       //  youtube: "https://youtube.com/...",
      //   twitter: "https://twitter.com/...",
       //  instagram: "https://instagram.com/..."
        },
    ];

celebrities.forEach(celebrity => {
    const card = document.createElement('div');
    card.className = 'celebrity-card';
    
    let socialLinks = '';
    
    // دالة مساعدة لإنشاء روابط وسائل التواصل
    const createSocialLink = (url, platform) => {
        if (!url) return '';
        
        return `
            <a href="${url}" target="_blank" class="social-btn ${platform}" 
               onclick="playSocialMediaSound()">
                <img src="images/${platform}-icon.png" alt="${platform}">
            </a>
        `;
    };
    
    socialLinks += createSocialLink(celebrity.tiktok, 'tiktok');
    socialLinks += createSocialLink(celebrity.youtube, 'youtube');
    socialLinks += createSocialLink(celebrity.twitter, 'twitter');
    socialLinks += createSocialLink(celebrity.instagram, 'instagram');
    socialLinks += createSocialLink(celebrity.snapchat, 'snapchat');
    
    card.innerHTML = `
        <div class="celebrity-image">
            <img src="${celebrity.image}" alt="${celebrity.name}" loading="lazy">
            <div class="social-badges">${socialLinks}</div>
        </div>
        <div class="celebrity-info">
            <h3>${celebrity.name}</h3>
            <p>${celebrity.description}</p>
            <div class="social-links">
                ${socialLinks}
            </div>
        </div>
    `;
    
    celebritiesContainer.appendChild(card);
});
}

// Initialize the celebrities section
document.addEventListener('DOMContentLoaded', function() {
    // Add this to your existing DOMContentLoaded function
    loadCelebrities();
});