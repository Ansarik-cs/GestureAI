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
    verifiedLocation: false,
    completedQuests: []
};

// Recycling points in Astana
const recyclingPoints = [
    { id: 1, name: "Mega Silk Way Eco Station", lat: 51.1282, lon: 71.4306, types: ["plastic", "glass", "paper", "metal"], hours: "24/7", rating: 4.5 },
    { id: 2, name: "Khan Shatyr Recycling Point", lat: 51.1327, lon: 71.4062, types: ["plastic", "batteries"], hours: "10:00-22:00", rating: 4.2 },
    { id: 3, name: "Keruen Mall Eco Corner", lat: 51.1355, lon: 71.4504, types: ["plastic", "glass", "paper"], hours: "10:00-21:00", rating: 4.0 },
    { id: 4, name: "Sary Arka Green Point", lat: 51.1608, lon: 71.4165, types: ["metal", "batteries"], hours: "09:00-20:00", rating: 4.7 },
    { id: 5, name: "Abu Dhabi Plaza Eco Station", lat: 51.1275, lon: 71.4383, types: ["plastic", "glass"], hours: "24/7", rating: 4.3 },
    { id: 6, name: "Expo 2017 Area Recycling", lat: 51.0914, lon: 71.4673, types: ["plastic", "glass", "paper", "metal"], hours: "08:00-20:00", rating: 4.8 },
    { id: 7, name: "Baiterek Area Eco Point", lat: 51.1282, lon: 71.4306, types: ["plastic", "paper"], hours: "09:00-18:00", rating: 4.1 },
    { id: 8, name: "Nazarbayev University Station", lat: 51.0909, lon: 71.4054, types: ["plastic", "glass", "paper", "metal"], hours: "24/7", rating: 4.6 },
    { id: 9, name: "Central Park Green Corner", lat: 51.1605, lon: 71.4704, types: ["plastic", "glass", "paper"], hours: "06:00-23:00", rating: 4.4 },
    { id: 10, name: "Dostyk Plaza Recycling", lat: 51.1432, lon: 71.4285, types: ["plastic", "metal", "batteries"], hours: "10:00-22:00", rating: 4.2 },
    { id: 11, name: "Mangilik El Eco Station", lat: 51.1214, lon: 71.4478, types: ["glass", "paper", "metal"], hours: "08:00-20:00", rating: 4.5 },
    { id: 12, name: "Esil District Green Point", lat: 51.1721, lon: 71.4234, types: ["plastic", "glass"], hours: "09:00-19:00", rating: 4.0 },
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
    // Generate 3 random quests for the day
    const shuffled = [...questTemplates].sort(() => Math.random() - 0.5);
    dailyQuests = shuffled.slice(0, 3).map(template => ({
        ...template,
        progress: 0,
        completed: false,
        claimed: false
    }));
    
    // Load saved progress if exists
    const saved = localStorage.getItem('dailyQuests');
    const lastReset = localStorage.getItem('questResetTime');
    const now = new Date();
    
    if (saved && lastReset) {
        const resetTime = new Date(lastReset);
        // Check if it's the same day
        if (now.toDateString() === resetTime.toDateString()) {
            dailyQuests = JSON.parse(saved);
        } else {
            // New day, save new quests
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
        
        // Check quest type and update progress
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
        
        // Mark as completed if target reached
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
    
    // Award points
    userData.points += quest.points;
    quest.claimed = true;
    
    // Save
    localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
    
    // Update display
    updateNavDisplay();
    displayQuests();
    
    // Show notification
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
const VERIFICATION_RADIUS = 100; // meters - считается что пользователь рядом

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
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
                // VERIFIED - User is near a recycling point!
                userData.verifiedLocation = true;
                statusDiv.innerHTML = `
                    <div class="success">
                        <p>✅ <strong>Location Verified!</strong></p>
                        <p>You are ${nearest.distance.toFixed(0)}m from <strong>${nearest.name}</strong></p>
                        <p class="hint">You can now log your recycling activity below 👇</p>
                    </div>
                `;
                
                // Show the recycling form
                document.getElementById('recyclingForm').style.display = 'flex';
                btn.style.display = 'none';
                
            } else {
                // NOT VERIFIED - Too far
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

function verifyLocation() {
    const resultDiv = document.getElementById('verificationResult');
    
    if (!navigator.geolocation) {
        resultDiv.innerHTML = '<p class="error">Geolocation not supported</p>';
        return;
    }
    
    resultDiv.innerHTML = '<p class="checking">Checking your location...</p>';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            const nearest = findNearestPoint(userLat, userLon);
            
            if (nearest.distance <= VERIFICATION_RADIUS) {
                resultDiv.innerHTML = `
                    <p class="success">✅ Verified! You're ${nearest.distance.toFixed(0)}m from ${nearest.name}</p>
                `;
                userData.verifiedLocation = true;
            } else {
                resultDiv.innerHTML = `
                    <p class="error">❌ You're ${(nearest.distance/1000).toFixed(2)}km away from ${nearest.name}</p>
                `;
            }
        },
        (error) => {
            resultDiv.innerHTML = '<p class="error">Could not verify location</p>';
        }
    );
}

// ==================== MAP ====================
let map;
let markers = [];
let userMarker = null;
let currentFilter = 'all';

function initMap() {
    // Create map centered on Astana
    map = L.map('map').setView([51.1694, 71.4491], 12);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add all markers
    displayMarkers();
    
    // Try to show user location on map
    showUserLocationOnMap();
}

function showUserLocationOnMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                
                // Add user marker
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
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Filter points
    let pointsToShow = recyclingPoints;
    if (filter !== 'all') {
        pointsToShow = recyclingPoints.filter(point => 
            point.types.includes(filter)
        );
    }
    
    // Add markers
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
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ==================== NAVIGATION ====================
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(`page-${pageName}`).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // If showing dashboard, update it
    if (pageName === 'dashboard') {
        updateDashboard();
    }
    
    // If showing leaderboard, update it
    if (pageName === 'leaderboard') {
        updateLeaderboard();
    }
    
    // If showing quests, update them
    if (pageName === 'quests') {
        displayQuests();
    }
}

// ==================== RECYCLING LOGGER ====================
function logRecycling() {
    // Check if location is verified
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
    
    // Calculate points
    const pointsEarned = Math.round(weight * POINTS_PER_KG[itemType]);
    const co2Saved = (weight * CO2_PER_KG[itemType]).toFixed(2);
    
    // Update user data
    userData.points += pointsEarned;
    userData.recycled_kg += weight;
    userData.co2_saved += parseFloat(co2Saved);
    userData.level = Math.floor(userData.points / 1000) + 1;
    
    // Update leaderboard
    const userIndex = leaderboardData.findIndex(u => u.name === "You");
    leaderboardData[userIndex].points = userData.points;
    leaderboardData[userIndex].recycled = userData.recycled_kg;
    
    // Update quest progress
    updateQuestProgress('recycle', itemType, 1);
    if (itemType === 'paper' || itemType === 'plastic') {
        updateQuestProgress('weight', itemType, weight);
    }
    
    // Check achievements
    checkAchievements();
    
    // Show result
    document.getElementById('pointsEarned').textContent = `You earned ${pointsEarned} eco-points!`;
    document.getElementById('impactMessage').textContent = `You saved ${co2Saved} kg of CO₂ 🌍`;
    document.getElementById('scanResult').style.display = 'block';
    
    // Update nav display
    updateNavDisplay();
    
    // Reset verification for next time
    userData.verifiedLocation = false;
    
    // Clear form
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
    
    // Calculate rank
    leaderboardData.sort((a, b) => b.points - a.points);
    const userRank = leaderboardData.findIndex(u => u.name === "You") + 1;
    userData.rank = userRank;
    document.getElementById('userRank').textContent = `#${userRank}`;
    
    // Display achievements
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
