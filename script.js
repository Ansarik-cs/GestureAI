// ==================== DATA ====================
// User data (fake database)
let userData = {
    points: 0,
    level: 1,
    recycled_kg: 0,
    co2_saved: 0,
    rank: 1,
    currentLocation: null,
    nearestPoint: null,
    verifiedLocation: false
};
// Recycling points in Astana (real addresses from 2GIS - December 2024)
const recyclingPoints = [
    // Пункты приема металла
    { id: 1, name: "Пункт приема металла (ул. Кордай, 88)", lat: 51.0882, lon: 71.3945, types: ["metal"], hours: "09:00-18:00", rating: 4.9 },
    { id: 2, name: "Дарын Металс (ул. Сакен Жунисов, 78а)", lat: 51.1452, lon: 71.4888, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    { id: 3, name: "МеталлоЗакуп (ул. Жанажол, 19Б)", lat: 51.1722, lon: 71.4235, types: ["metal"], hours: "09:00-18:00", rating: 3.9 },
    { id: 4, name: "Пункт приема металла (ул. Шарбакты, 12/3г)", lat: 51.1125, lon: 71.3678, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    { id: 5, name: "Мир металла (ул. Шарбакты, 17)", lat: 51.1128, lon: 71.3685, types: ["metal"], hours: "09:00-18:00", rating: 4.8 },
    { id: 6, name: "Пункт приема металла (ул. Орхон, 2)", lat: 51.0995, lon: 71.3812, types: ["metal"], hours: "09:00-18:00", rating: 3.5 },
    { id: 7, name: "Пункт приема металла (ул. Фахд бен Абдул Азиз, 30)", lat: 51.1856, lon: 71.4125, types: ["metal"], hours: "09:00-18:00", rating: 4.6 },
    { id: 8, name: "Пункт приема металла (ул. Караменде би Шакаулы, 12)", lat: 51.1235, lon: 71.3856, types: ["metal"], hours: "09:00-18:00", rating: 4.9 },
    { id: 9, name: "Пункт приема металла (ул. Озбекали Жанибек, 1)", lat: 51.1658, lon: 71.3892, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    { id: 10, name: "Пункт прием металла (ул. Сакен Жунисов, 74а)", lat: 51.1448, lon: 71.4882, types: ["metal"], hours: "09:00-18:00", rating: 4.8 },
    { id: 11, name: "Пункт приема металла (ул. Ушкопир, 3)", lat: 51.1756, lon: 71.3945, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    { id: 12, name: "Пункт приема металла (ул. Балкантау, 6)", lat: 51.1045, lon: 71.3725, types: ["metal"], hours: "09:00-18:00", rating: 4.3 },
    { id: 13, name: "Пункт приема металла (ул. Озбекали Жанибек, 19)", lat: 51.1672, lon: 71.3905, types: ["metal"], hours: "09:00-18:00", rating: 3.7 },
    { id: 14, name: "Пункт приема металла (ул. Шарбакты, 1)", lat: 51.1118, lon: 71.3665, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    { id: 15, name: "Максат (ул. Сакен Жунисов, 78)", lat: 51.1454, lon: 71.4890, types: ["metal"], hours: "09:00-18:00", rating: 4.7 },
    { id: 16, name: "Пункт приема металла (ул. Мустафа Шокай, 103/1)", lat: 51.1892, lon: 71.4356, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    { id: 17, name: "КазМетКор (ул. Ушконыр, 1/2)", lat: 51.1752, lon: 71.3952, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    { id: 18, name: "Пункт приема металла (ул. Мустафа Шокай, 2/2)", lat: 51.1788, lon: 71.4298, types: ["metal"], hours: "09:00-18:00", rating: 4.8 },
    
    // Пункты приема вторсырья (бумага, пластик)
    { id: 19, name: "AstanaQagazy (ул. Машхур Жусип Копейулы, 11/1)", lat: 51.1585, lon: 71.4112, types: ["paper"], hours: "09:00-18:00", rating: 4.5 },
    { id: 20, name: "Адал Кагазы (пр. Абая, 99)", lat: 51.1456, lon: 71.4625, types: ["paper"], hours: "09:00-18:00", rating: 4.2 },
    { id: 21, name: "LS Astana (ул. Телжан Шонанулы, 36/1а)", lat: 51.1142, lon: 71.3845, types: ["paper", "plastic", "glass"], hours: "09:00-18:00", rating: 3.4 },
    { id: 22, name: "LS Astana (пр. Сарыарка, 31/1а)", lat: 51.1682, lon: 71.4045, types: ["paper", "plastic", "glass"], hours: "09:00-18:00", rating: 4.0 },
    { id: 23, name: "LS Astana (ул. Манас, 11/4)", lat: 51.1625, lon: 71.4165, types: ["paper", "plastic", "glass"], hours: "09:00-18:00", rating: 4.3 },
    { id: 24, name: "LS Astana (ул. Габидена Мустафина, 17/1)", lat: 51.1234, lon: 71.4562, types: ["paper", "plastic", "glass"], hours: "09:00-18:00", rating: 4.4 },
    
    // Likekomek (контейнеры для одежды и вещей)
    { id: 25, name: "Likekomek (ул. Дулата Бабатайулы, 4а)", lat: 51.1385, lon: 71.4285, types: ["plastic", "paper"], hours: "24/7", rating: 4.9 },
    { id: 26, name: "Likekomek (пр. Республики, 34/1)", lat: 51.1542, lon: 71.4678, types: ["plastic", "paper"], hours: "24/7", rating: 4.2 },
    { id: 27, name: "Likekomek (ул. Аманжол Болекпаев, 19)", lat: 51.1712, lon: 71.4456, types: ["plastic", "paper"], hours: "24/7", rating: 4.0 },
    { id: 28, name: "Likekomek (ул. Ахмет Байтурсынулы, 31)", lat: 51.1298, lon: 71.4125, types: ["plastic", "paper"], hours: "24/7", rating: 4.6 },
    { id: 29, name: "Likekomek (пр. Туран, 55а)", lat: 51.1156, lon: 71.4345, types: ["plastic", "paper"], hours: "24/7", rating: 3.6 },
    { id: 30, name: "Likekomek (пр. Тауелсиздик, 39)", lat: 51.1785, lon: 71.4512, types: ["plastic", "paper"], hours: "24/7", rating: 4.5 },
    { id: 31, name: "Likekomek (ул. Ахмет Байтурсынулы, 39/3)", lat: 51.1305, lon: 71.4135, types: ["plastic", "paper"], hours: "24/7", rating: 4.3 },
    { id: 32, name: "Likekomek (ул. Кенесары, 4)", lat: 51.1645, lon: 71.4145, types: ["plastic", "paper"], hours: "24/7", rating: 5.0 },
    { id: 33, name: "Likekomek (ул. Сыганак, 17/10)", lat: 51.1445, lon: 71.4356, types: ["plastic", "paper"], hours: "24/7", rating: 5.0 },
    { id: 34, name: "Likekomek (ул. Куйши Дина, 23/3)", lat: 51.1125, lon: 71.4245, types: ["plastic", "paper"], hours: "24/7", rating: 5.0 },
    { id: 35, name: "Likekomek (ул. Ыкылас Дукенулы, 31)", lat: 51.1856, lon: 71.4625, types: ["plastic", "paper"], hours: "24/7", rating: 5.0 },
    { id: 36, name: "Likekomek (пр. Сарыарка, 31/2)", lat: 51.1685, lon: 71.4048, types: ["plastic", "paper"], hours: "24/7", rating: 3.0 },
    { id: 37, name: "Likekomek (пр. Абылай хана, 31)", lat: 51.1518, lon: 71.4282, types: ["plastic", "paper"], hours: "24/7", rating: 4.5 },
    { id: 38, name: "Likekomek (пр. Тауелсиздик, 48)", lat: 51.1795, lon: 71.4525, types: ["plastic", "paper"], hours: "24/7", rating: 4.2 },
    
    // Freedom - фандоматы (пластиковые бутылки)
    { id: 39, name: "Freedom (ТРЦ Asia Park, пр. Кабанбай батыр, 21)", lat: 51.1612, lon: 71.4412, types: ["plastic"], hours: "10:00-22:00", rating: 1.0 },
    { id: 40, name: "Freedom (ЕНУ, ул. Кажымукан, 13)", lat: 51.0922, lon: 71.4068, types: ["plastic"], hours: "08:00-20:00", rating: 3.1 },
    { id: 41, name: "Freedom (ул. Кордай, 6)", lat: 51.0875, lon: 71.3925, types: ["plastic"], hours: "09:00-18:00", rating: 3.0 },
    { id: 42, name: "Freedom (шоссе Коргалжын, 13д)", lat: 51.0825, lon: 71.3815, types: ["plastic"], hours: "09:00-18:00", rating: 3.5 },
    
    // Sparklo - пункты приема пластика
    { id: 43, name: "Sparklo (ул. Динмухамед Конаев, 10)", lat: 51.1285, lon: 71.4298, types: ["plastic"], hours: "09:00-18:00", rating: 1.7 },
    
    // Социальные магазины
    { id: 44, name: "Алғыс (ул. Сауран, 14)", lat: 51.1125, lon: 71.4156, types: ["plastic", "paper"], hours: "09:00-18:00", rating: 3.2 },
    
    // Пункты приема катализаторов
    { id: 45, name: "AG Vyhlop (ул. Жетиген, 35/3)", lat: 51.1685, lon: 71.4892, types: ["metal"], hours: "09:00-18:00", rating: 4.9 },
    { id: 46, name: "Ast.cat (ул. Александра Пушкина, 24)", lat: 51.1312, lon: 71.4385, types: ["metal"], hours: "09:00-18:00", rating: 4.8 },
    { id: 47, name: "Vihlopnaya.01 (ул. Акыртас, 1)", lat: 51.1045, lon: 71.3956, types: ["metal"], hours: "09:00-18:00", rating: 5.0 },
    
    // Ящики для сбора вещей
    { id: 48, name: "Ящик для сбора вещей (ТРЦ Аружан, ул. Илияса Жансугурова, 8/1)", lat: 51.1425, lon: 71.4645, types: ["plastic", "paper"], hours: "10:00-22:00", rating: 4.0 },
    
    // Торговые центры (дополнительно)
    { id: 49, name: "Mega Silk Way", lat: 51.1282, lon: 71.4306, types: ["plastic", "glass", "paper"], hours: "10:00-22:00", rating: 4.6 },
    { id: 50, name: "Khan Shatyr", lat: 51.1327, lon: 71.4062, types: ["plastic", "paper"], hours: "10:00-22:00", rating: 4.5 },
];


// Leaderboard data
let leaderboardData = [
    { name: "EcoWarrior", points: 5000, recycled: 45 },
    { name: "GreenHero", points: 3500, recycled: 32 },
    { name: "PlanetSaver", points: 2800, recycled: 28 },
    { name: "You", points: 0, recycled: 0 },
    { name: "NatureGuardian", points: 2200, recycled: 21 },
    { name: "TreeHugger", points: 1900, recycled: 18 },
    { name: "CleanCityFan", points: 1500, recycled: 15 },
];

// Achievements
const achievements = [
    { id: 1, name: "First Steps", icon: "🌱", desc: "Recycle first item", requirement: 1, earned: false },
    { id: 2, name: "Eco Beginner", icon: "🌿", desc: "Earn 500 points", requirement: 500, earned: false },
    { id: 3, name: "Green Warrior", icon: "⚔️", desc: "Earn 1000 points", requirement: 1000, earned: false },
    { id: 4, name: "Planet Hero", icon: "🌍", desc: "Recycle 10kg", requirement: 10, earned: false },
    { id: 5, name: "Eco Champion", icon: "🏆", desc: "Reach Level 5", requirement: 5, earned: false },
    { id: 6, name: "Tree Planter", icon: "🌳", desc: "Save 50kg CO₂", requirement: 50, earned: false },
];

// Points per kg by type
const POINTS_PER_KG = {
    plastic: 100,
    glass: 50,
    paper: 30,
    metal: 150,
    batteries: 200
};

// CO2 saved per kg
const CO2_PER_KG = {
    plastic: 1.5,
    glass: 0.5,
    paper: 1.0,
    metal: 3.0,
    batteries: 2.0
};

// ==================== DAILY QUESTS SYSTEM ====================
const questTemplates = [
    { id: 1, title: "Cigarette Cleaner", desc: "Collect and dispose 5 cigarette butts", icon: "🚬", points: 50, type: "collect", target: 5 },
    { id: 2, title: "Can Crusher", desc: "Recycle 3 metal cans", icon: "🥫", points: 100, type: "recycle", target: 3, itemType: "metal" },
    { id: 3, title: "Plastic Fighter", desc: "Recycle 5 plastic bottles", icon: "🧴", points: 150, type: "recycle", target: 5, itemType: "plastic" },
    { id: 4, title: "Paper Saver", desc: "Recycle 2kg of paper", icon: "📄", points: 80, type: "weight", target: 2, itemType: "paper" },
    { id: 5, title: "Glass Hero", desc: "Recycle 4 glass bottles", icon: "🍾", points: 120, type: "recycle", target: 4, itemType: "glass" },
    { id: 6, title: "Battery Guardian", desc: "Recycle 2 batteries", icon: "🔋", points: 200, type: "recycle", target: 2, itemType: "batteries" },
    { id: 7, title: "Eco Warrior", desc: "Recycle any 3 items today", icon: "♻️", points: 100, type: "any", target: 3 },
    { id: 8, title: "Street Cleaner", desc: "Pick up 10 pieces of litter", icon: "🗑️", points: 75, type: "collect", target: 10 },
];

let dailyQuests = [];

function generateDailyQuests() {
    const shuffled = [...questTemplates].sort(() => Math.random() - 0.5);
    dailyQuests = shuffled.slice(0, 3).map(template => ({
        ...template,
        progress: 0,
        completed: false,
        claimed: false
    }));
    
    const saved = localStorage.getItem('dailyQuests');
    const lastReset = localStorage.getItem('questResetTime');
    const now = new Date();
    
    if (saved && lastReset) {
        const resetTime = new Date(lastReset);
        if (now.toDateString() === resetTime.toDateString()) {
            dailyQuests = JSON.parse(saved);
        } else {
            localStorage.setItem('questResetTime', now.toISOString());
            localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
        }
    } else {
        localStorage.setItem('questResetTime', now.toISOString());
        localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
    }
    
    displayQuests();
    updateQuestTimer();
}

function displayQuests() {
    const container = document.getElementById('questsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    dailyQuests.forEach((quest, index) => {
        const progressPercent = Math.min((quest.progress / quest.target) * 100, 100);
        const isComplete = quest.progress >= quest.target;
        
        const questCard = document.createElement('div');
        questCard.className = `quest-card ${isComplete ? 'completed' : ''} ${quest.claimed ? 'claimed' : ''}`;
        
        questCard.innerHTML = `
            <div class="quest-icon">${quest.icon}</div>
            <div class="quest-info">
                <h3>${quest.title}</h3>
                <p>${quest.desc}</p>
                <div class="quest-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <span class="progress-text">${quest.progress}/${quest.target}</span>
                </div>
            </div>
            <div class="quest-reward">
                <div class="reward-points">+${quest.points} pts</div>
                ${isComplete && !quest.claimed ? 
                    `<button onclick="claimQuest(${index})" class="btn-claim">Claim Reward</button>` : 
                    quest.claimed ? 
                    `<span class="claimed-badge">✓ Claimed</span>` : 
                    `<span class="in-progress">In Progress</span>`
                }
            </div>
        `;
        
        container.appendChild(questCard);
    });
}

function updateQuestProgress(type, itemType = null, amount = 1) {
    let updated = false;
    
    dailyQuests.forEach(quest => {
        if (quest.completed || quest.claimed) return;
        
        if (quest.type === 'any') {
            quest.progress += 1;
            updated = true;
        } else if (quest.type === 'recycle' && itemType === quest.itemType) {
            quest.progress += 1;
            updated = true;
        } else if (quest.type === 'weight' && itemType === quest.itemType) {
            quest.progress += amount;
            updated = true;
        } else if (quest.type === type) {
            quest.progress += amount;
            updated = true;
        }
        
        if (quest.progress >= quest.target) {
            quest.completed = true;
        }
    });
    
    if (updated) {
        localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
        displayQuests();
    }
}

function claimQuest(index) {
    const quest = dailyQuests[index];
    if (!quest.completed || quest.claimed) return;
    
    userData.points += quest.points;
    quest.claimed = true;
    
    localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
    
    updateNavDisplay();
    displayQuests();
    
    alert(`🎉 Quest completed! You earned ${quest.points} points!`);
}

function updateQuestTimer() {
    const timerElement = document.getElementById('questTimer');
    if (!timerElement) return;
    
    function updateTime() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// ==================== GEOLOCATION VERIFICATION ====================
const VERIFICATION_RADIUS = 100; // meters

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

function findNearestPoint(userLat, userLon) {
    let nearest = null;
    let minDistance = Infinity;
    
    recyclingPoints.forEach(point => {
        const distance = calculateDistance(userLat, userLon, point.lat, point.lon);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = { ...point, distance: distance };
        }
    });
    
    return nearest;
}

function checkLocationForLogging() {
    const statusDiv = document.getElementById('locationStatus');
    const btn = document.getElementById('checkLocationBtn');
    
    btn.disabled = true;
    btn.textContent = '🔄 Checking location...';
    statusDiv.innerHTML = '<p class="checking">📡 Getting your location...</p>';
    
    if (!navigator.geolocation) {
        statusDiv.innerHTML = '<p class="error">❌ Your browser doesn\'t support geolocation</p>';
        btn.disabled = false;
        btn.textContent = '📍 Check My Location';
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            userData.currentLocation = { lat: userLat, lon: userLon };
            const nearest = findNearestPoint(userLat, userLon);
            userData.nearestPoint = nearest;
            
            if (nearest.distance <= VERIFICATION_RADIUS) {
                userData.verifiedLocation = true;
                statusDiv.innerHTML = `
                    <div class="success">
                        <p>✅ <strong>Location Verified!</strong></p>
                        <p>You are ${nearest.distance.toFixed(0)}m from <strong>${nearest.name}</strong></p>
                        <p class="hint">You can now log your recycling activity below 👇</p>
                    </div>
                `;
                
                document.getElementById('recyclingForm').style.display = 'flex';
                btn.style.display = 'none';
                
            } else {
                userData.verifiedLocation = false;
                const kmAway = (nearest.distance / 1000).toFixed(2);
                statusDiv.innerHTML = `
                    <div class="warning">
                        <p>⚠️ <strong>You're too far from a recycling point</strong></p>
                        <p>Nearest point: <strong>${nearest.name}</strong> (${kmAway} km away)</p>
                        <p class="hint">Please visit a recycling point to log your activity</p>
                        <button onclick="showNearestOnMap()" class="btn-secondary">Show on Map</button>
                    </div>
                `;
                btn.disabled = false;
                btn.textContent = '📍 Try Again';
            }
        },
        (error) => {
            let errorMsg = 'Could not get your location';
            if (error.code === 1) {
                errorMsg = 'Please allow location access in your browser settings';
            }
            statusDiv.innerHTML = `<p class="error">❌ ${errorMsg}</p>`;
            btn.disabled = false;
            btn.textContent = '📍 Check My Location';
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function showNearestOnMap() {
    showPage('map');
    if (userData.nearestPoint) {
        map.setView([userData.nearestPoint.lat, userData.nearestPoint.lon], 15);
    }
}

// ==================== MAP ====================
let map;
let markers = [];
let userMarker = null;
let currentFilter = 'all';

function initMap() {
    map = L.map('map').setView([51.1694, 71.4491], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    displayMarkers();
    showUserLocationOnMap();
}

function showUserLocationOnMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                
                const userIcon = L.divIcon({
                    html: '<div style="background: #007bff; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
                    className: '',
                    iconSize: [20, 20]
                });
                
                userMarker = L.marker([userLat, userLon], { icon: userIcon })
                    .bindPopup('📍 You are here')
                    .addTo(map);
            },
            () => {
                console.log('Could not get user location for map');
            }
        );
    }
}

function displayMarkers(filter = 'all') {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    let pointsToShow = recyclingPoints;
    if (filter !== 'all') {
        pointsToShow = recyclingPoints.filter(point => 
            point.types.includes(filter)
        );
    }
    
    pointsToShow.forEach(point => {
        const marker = L.marker([point.lat, point.lon])
            .bindPopup(`
                <div style="text-align: center;">
                    <h3>${point.name}</h3>
                    <p><strong>Accepts:</strong> ${point.types.join(', ')}</p>
                    <p><strong>Hours:</strong> ${point.hours}</p>
                    <p>⭐ ${point.rating} / 5.0</p>
                </div>
            `)
            .addTo(map);
        markers.push(marker);
    });
}

function filterMap(type) {
    currentFilter = type;
    displayMarkers(type);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ==================== NAVIGATION ====================
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(`page-${pageName}`).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    if (pageName === 'dashboard') {
        updateDashboard();
    }
    
    if (pageName === 'leaderboard') {
        updateLeaderboard();
    }
    
    if (pageName === 'quests') {
        displayQuests();
    }
}

// ==================== RECYCLING LOGGER ====================
function logRecycling() {
    if (!userData.verifiedLocation) {
        alert('⚠️ Please verify your location first!');
        return;
    }
    
    const itemType = document.getElementById('itemType').value;
    const weight = parseFloat(document.getElementById('itemWeight').value);
    
    if (!itemType || !weight || weight <= 0) {
        alert('Please select item type and enter valid weight');
        return;
    }
    
    const pointsEarned = Math.round(weight * POINTS_PER_KG[itemType]);
    const co2Saved = (weight * CO2_PER_KG[itemType]).toFixed(2);
    
    userData.points += pointsEarned;
    userData.recycled_kg += weight;
    userData.co2_saved += parseFloat(co2Saved);
    userData.level = Math.floor(userData.points / 1000) + 1;
    
    const userIndex = leaderboardData.findIndex(u => u.name === "You");
    leaderboardData[userIndex].points = userData.points;
    leaderboardData[userIndex].recycled = userData.recycled_kg;
    
    updateQuestProgress('recycle', itemType, 1);
    if (itemType === 'paper' || itemType === 'plastic') {
        updateQuestProgress('weight', itemType, weight);
    }
    
    checkAchievements();
    
    document.getElementById('pointsEarned').textContent = `You earned ${pointsEarned} eco-points!`;
    document.getElementById('impactMessage').textContent = `You saved ${co2Saved} kg of CO₂ 🌍`;
    document.getElementById('scanResult').style.display = 'block';
    
    updateNavDisplay();
    
    userData.verifiedLocation = false;
    
    setTimeout(() => {
        document.getElementById('itemType').value = '';
        document.getElementById('itemWeight').value = '';
        document.getElementById('scanResult').style.display = 'none';
        document.getElementById('recyclingForm').style.display = 'none';
        document.getElementById('locationStatus').innerHTML = '';
        document.getElementById('checkLocationBtn').style.display = 'block';
        document.getElementById('checkLocationBtn').disabled = false;
        document.getElementById('checkLocationBtn').textContent = '📍 Check My Location';
    }, 3000);
}

// ==================== DASHBOARD ====================
function updateDashboard() {
    document.getElementById('totalPoints').textContent = userData.points;
    document.getElementById('totalRecycled').textContent = `${userData.recycled_kg.toFixed(1)} kg`;
    document.getElementById('co2Saved').textContent = `${userData.co2_saved.toFixed(1)} kg`;
    
    leaderboardData.sort((a, b) => b.points - a.points);
    const userRank = leaderboardData.findIndex(u => u.name === "You") + 1;
    userData.rank = userRank;
    document.getElementById('userRank').textContent = `#${userRank}`;
    
    const achievementList = document.getElementById('achievementList');
    achievementList.innerHTML = '';
    
    achievements.forEach(ach => {
        const div = document.createElement('div');
        div.className = `achievement-item ${ach.earned ? 'earned' : ''}`;
        div.innerHTML = `
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-name">${ach.name}</div>
            <div class="achievement-desc">${ach.desc}</div>
        `;
        achievementList.appendChild(div);
    });
}

function checkAchievements() {
    achievements.forEach(ach => {
        if (!ach.earned) {
            if (ach.id === 1 && userData.recycled_kg >= ach.requirement) ach.earned = true;
            if (ach.id === 2 && userData.points >= ach.requirement) ach.earned = true;
            if (ach.id === 3 && userData.points >= ach.requirement) ach.earned = true;
            if (ach.id === 4 && userData.recycled_kg >= ach.requirement) ach.earned = true;
            if (ach.id === 5 && userData.level >= ach.requirement) ach.earned = true;
            if (ach.id === 6 && userData.co2_saved >= ach.requirement) ach.earned = true;
        }
    });
}

// ==================== LEADERBOARD ====================
function updateLeaderboard() {
    leaderboardData.sort((a, b) => b.points - a.points);
    
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';
    
    leaderboardData.forEach((user, index) => {
        const div = document.createElement('div');
        div.className = `leaderboard-item ${index < 3 ? 'top3' : ''}`;
        
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        
        div.innerHTML = `
            <div class="leaderboard-rank">${medal || `#${index + 1}`}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${user.name}</div>
                <div class="leaderboard-stats">${user.recycled.toFixed(1)} kg recycled</div>
            </div>
            <div class="leaderboard-points">${user.points} pts</div>
        `;
        list.appendChild(div);
    });
}

// ==================== NAV DISPLAY ====================
function updateNavDisplay() {
    document.getElementById('userPoints').textContent = `${userData.points} points`;
    document.getElementById('userLevel').textContent = `Level ${userData.level}`;
}

// ==================== INIT ====================
window.onload = function() {
    initMap();
    updateNavDisplay();
    updateDashboard();
    generateDailyQuests();
};
