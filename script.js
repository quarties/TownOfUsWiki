async function loadRoles() {
    const roleFiles = 
    ["altruist.json", "amnesiac.json", "arsonist.json", "aurial.json", "blackmailer.json", "bomber.json", "deputy.json", "detective.json", "doomsayer.json", "engineer.json", "escapist.json", "executioner.json", "glitch.json", "grenadier.json", "guardian_angel.json", "haunter.json", "hunter.json", "hypnotist.json", "imitator.json", "investigator.json", "jailor.json", "janitor.json", "jester.json", "juggernaut.json", "lookout.json", "medic.json", "medium.json", "miner.json", "morphling.json", "mystic.json", "oracle.json", "phantom.json", "plaguebearer.json", "politician.json", "prosecutor.json", "scavenger.json", "seer.json", "sheriff.json", "snitch.json", "soul_collector.json", "spy.json", "survivor.json", "swapper.json", "swooper.json", "tracker.json", "traitor.json", "transporter.json", "trapper.json", "undertaker.json", "vampire.json", "venerer.json", "veteran.json", "vigilante.json", "warden.json", "warlock.json", "werewolf.json"]
    const roles = await Promise.all(
        roleFiles.map(async (file) => {
            const response = await fetch(`roles/${file}`);
            return response.json();
        })
    );

    renderRoles(roles);
}

// Funkcja do wyświetlania ról na stronie
function renderRoles(roles) {
    document.getElementById('rolesContainer').innerHTML = 
        roles.map(role => createRoleCard(role)).join('');
}

// Tworzenie karty roli
function createRoleCard(role) {
    return `
        <div class="role-card team-${role.team}" style="border-left: 5px solid ${role.color};">
            <div class="role-header">
                <div class="role-icon">
                    <img src="${role.icon}" alt="${role.name} icon">
                </div>
                <div class="role-title">
                    <h2 class="role-name" style="color: ${role.color}">${role.name}</h2>
                    <div class="team-label">Team: ${getTeamName(role.team)}</div>
                </div>
            </div>
            
            <div class="role-content">
                <div class="role-main">
                    <p class="role-description">${role.description}</p>
                    
                    <div class="settings-list custom-font">
                        <h4>Ustawienia:</h4>
                        ${role.settings.map(setting => `<div>${setting}</div>`).join('')}
                    </div>
                </div>
                
                <div class="ability-list">
                    <h4>Umiejętności:</h4>
                    ${role.abilities.map(ability => `
                        <div class="ability-item">
                            <div class="ability-icon">
                                <img src="${ability.icon}" alt="${ability.name} icon">
                            </div>
                            <span>${ability.name}</span>
                        </div>
                    `).join('')}
                </div>
                
                ${role.tip ? `
                    <div class="tip">
                        <strong>Porada:</strong> ${role.tip}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Zamiana nazwy drużyny na czytelny format
function getTeamName(team) {
    switch(team) {
        case 'crewmate': return 'Crewmate';
        case 'impostor': return 'Impostor';
        case 'neutral': return 'Neutral';
        default: return team;
    }
}

// Wyszukiwanie ról
document.getElementById('searchInput').addEventListener('input', (e) => {
    filterRoles(e.target.value);
});

// Filtracja ról
function filterRoles(searchText) {
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        const roleName = card.querySelector('.role-name').innerText.toLowerCase();
        card.style.display = roleName.includes(searchText.toLowerCase()) ? 'block' : 'none';
    });
}

// Załaduj role po uruchomieniu strony
loadRoles();
