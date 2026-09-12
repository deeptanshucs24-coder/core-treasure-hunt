import { GAME_CONFIG, STATUS, formatDuration, locationById, teamById } from './game-data.js';
import { currentTeam } from './auth.js';
import { getTeamState, saveTeamState } from './storage.js';

const card = document.querySelector('#checkpointCard');
const team = currentTeam();
const locationId = new URLSearchParams(window.location.search).get('location');
const finalPoint = locationId === 'final_core';
const point = finalPoint ? { name: 'CORE Final', shortName: 'CORE FINAL', code: GAME_CONFIG.finalCode } : locationById(locationId);

function message(title, copy, tone = '') {
  card.innerHTML = `<div class="kicker ${tone}">${tone ? '✕ WRONG LOCATION' : 'CHECKPOINT'}</div><h1>${title}</h1><p class="lede">${copy}</p><a class="primary button-link" href="game.html">Return to current challenge <span>→</span></a>`;
}

async function init() {
  if (!team) { message('Please log in first.', 'This checkpoint can only be verified for an active team session.', 'error-text'); return; }
  if (!point) { message('Invalid checkpoint.', 'This QR link is not recognized. Ask an organizer for a valid checkpoint code.', 'error-text'); return; }
  const state = await getTeamState(team.id);
  const expected = state.currentStage < 5 ? team.route[state.currentStage] : 'final_core';
  if (locationId !== expected) { message('This is not your current destination.', 'The QR code is valid, but it does not match the checkpoint your team has unlocked.', 'error-text'); return; }
  if (state.status === STATUS.COMPLETED) { message('Treasure already found.', `Your completion time was ${formatDuration(state.completionTime - state.startTime)}.`); return; }
  card.innerHTML = `<div class="kicker success-text">CURRENT DESTINATION</div><h1>${point.shortName}</h1><p class="lede">Have you reached the location? Enter the backup code printed beside the QR checkpoint.</p><form id="checkpointForm" class="stack"><label for="checkpointCode">Checkpoint code</label><input id="checkpointCode" autocomplete="off" placeholder="Enter location code" required><button class="primary">Verify checkpoint <span>→</span></button><p class="feedback" id="feedback">The QR only identifies the location. Verification still requires the code.</p></form>`;
  document.querySelector('#checkpointForm').onsubmit = async (event) => {
    event.preventDefault();
    const feedback = document.querySelector('#feedback');
    if (document.querySelector('#checkpointCode').value.trim().toUpperCase() !== point.code) { feedback.textContent = '✕ Incorrect checkpoint code. Check the printed code and try again.'; feedback.className = 'feedback error-text'; return; }
    if (finalPoint) { state.status = STATUS.COMPLETED; state.completionTime = Date.now(); state.currentLocation = 'final_core'; await saveTeamState(team.id, state); card.innerHTML = `<div class="completion-mark">✦</div><div class="kicker success-text">TREASURE FOUND</div><h1>${team.name} completed the hunt.</h1><div class="finish-time">${formatDuration(state.completionTime - state.startTime)}</div><p class="success-text">🏆 Congratulations!</p>`; return; }
    state.completedCheckpoints ||= [];
    if (!state.completedCheckpoints.includes(locationId)) state.completedCheckpoints.push(locationId);
    state.currentStage += 1; state.currentLocation = null; state.unlocked = false; state.lastCheckpointTime = Date.now(); await saveTeamState(team.id, state);
    card.innerHTML = `<div class="kicker success-text">✓ LOCATION VERIFIED</div><h1>Checkpoint complete.</h1><p class="lede">Your next challenge is now unlocked.</p><a class="primary button-link" href="game.html">Open next challenge <span>→</span></a>`;
  };
}
init();
