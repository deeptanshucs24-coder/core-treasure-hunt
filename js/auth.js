import { GAME_CONFIG, teamById } from './game-data.js';

const SESSION_KEY = 'treasureTeam';
export const getSession = () => { const teamId = localStorage.getItem(SESSION_KEY); return teamId ? { teamId } : null; };
export const clearSession = () => localStorage.removeItem(SESSION_KEY);
export function loginTeam(teamId, pin) {
  const team = teamById(teamId);
  if (!team || team.pin !== String(pin).trim()) return false;
  localStorage.setItem(SESSION_KEY, team.id);
  return true;
}
export function currentTeam() { const session = getSession(); return session ? teamById(session.teamId) : null; }
export function adminLogin(pin) { return String(pin).trim() === GAME_CONFIG.adminPin; }
