import { GAME_CONFIG, createTeamState, teamById } from './game-data.js';

const LOCAL_KEY = 'core-treasure-hunt-local-v1';

const readLocal = () => JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
const writeLocal = (data) => localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
const localTeam = (id) => {
  const data = readLocal();
  data.teams ||= {};
  if (!data.teams[id]) data.teams[id] = createTeamState(teamById(id));
  writeLocal(data);
  return data.teams[id];
};

export async function getTeamState(id) {
  return structuredClone(localTeam(id));
}

export async function saveTeamState(id, state) {
  const data = readLocal(); data.teams ||= {}; data.teams[id] = structuredClone(state); writeLocal(data);
  return state;
}

export async function listTeams() {
  return GAME_CONFIG.teams.map((team) => localTeam(team.id));
}

export async function resetTeam(id) { return saveTeamState(id, createTeamState(teamById(id))); }
export async function resetAll() {
  await Promise.all(GAME_CONFIG.teams.map((team) => resetTeam(team.id)));
}
export async function updateSettings(settings) {
  const data = readLocal(); data.settings = { ...(data.settings || {}), ...settings }; writeLocal(data); return data.settings;
}
export async function getSettings() {
  return readLocal().settings || {};
}
export function connectionLabel() { return 'LOCAL DEVICE DATA'; }
