import { GAME_CONFIG } from './game-data.js';
import { loginTeam } from './auth.js';

const teamGrid = document.querySelector('#teamGrid');
const selectedLabel = document.querySelector('#selectedTeam');
let selectedId = null;
teamGrid.innerHTML = GAME_CONFIG.teams.map((team) => `<button class="team-tile" data-id="${team.id}" style="--team-color:${team.color}"><span>${team.emoji}</span><strong>${team.name.replace('Team ', '')}</strong></button>`).join('');
teamGrid.addEventListener('click', (event) => {
  const tile = event.target.closest('[data-id]'); if (!tile) return;
  selectedId = tile.dataset.id;
  document.querySelectorAll('.team-tile').forEach((item) => item.classList.toggle('selected', item === tile));
  selectedLabel.textContent = `${GAME_CONFIG.teams.find((team) => team.id === selectedId).emoji} ${GAME_CONFIG.teams.find((team) => team.id === selectedId).name}`;
  document.querySelector('#loginForm').classList.remove('is-hidden');
  document.querySelector('#pin').focus();
});
document.querySelector('#loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const error = document.querySelector('#loginError');
  if (!selectedId || !loginTeam(selectedId, document.querySelector('#pin').value)) { error.textContent = 'That team PIN is not valid. Check with your team captain.'; return; }
  window.location.href = 'game.html';
});
