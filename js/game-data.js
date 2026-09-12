export const GAME_CONFIG = {
  eventName: 'THE GREAT CORE TREASURE HUNT',
  tagline: 'Solve. Search. Race. Find the Treasure.',
  adminPin: '9090',
  coreMember: 'Designated CORE Member',
  finalCode: 'FINAL99',
  teams: [
    { id: 'red', name: 'Team Red', color: '#ff5c72', emoji: '🔴', pin: '1234', route: ['basement', 'procore', 'notice_board', 'nss', 'core_member'] },
    { id: 'blue', name: 'Team Blue', color: '#55a8ff', emoji: '🔵', pin: '2345', route: ['procore', 'nss', 'basement', 'core_member', 'notice_board'] },
    { id: 'green', name: 'Team Green', color: '#52d39b', emoji: '🟢', pin: '3456', route: ['notice_board', 'core_member', 'nss', 'procore', 'basement'] },
    { id: 'yellow', name: 'Team Yellow', color: '#ffc857', emoji: '🟡', pin: '4567', route: ['nss', 'notice_board', 'procore', 'basement', 'core_member'] },
    { id: 'purple', name: 'Team Purple', color: '#b58cff', emoji: '🟣', pin: '5678', route: ['core_member', 'basement', 'nss', 'notice_board', 'procore'] }
  ],
  locations: {
    basement: { name: 'Basement / Scooty Number', shortName: 'Basement', code: 'BASE27', clue: 'I have two wheels but I never run,\nI rest below, away from the sun.\nFind the number that belongs to the ride,\nYour next clue is waiting by its side.' },
    procore: { name: 'ProCORE / Pinned Comment', shortName: 'ProCORE', code: 'PRO42', clue: 'Not every comment is meant for all to see,\nSome hide where only selected eyes can be.\nFind the pinned words from ProCORE,\nYour next clue is waiting there.' },
    notice_board: { name: 'CORE Notice Board / 2nd Floor', shortName: 'CORE Notice Board', code: 'CORE19', clue: 'Announcements rest where everyone can see,\nBut this one waits above where you need to be.\nHead to the second floor,\nAnd find the CORE notice board.' },
    nss: { name: 'NSS Board / 1st Floor', shortName: 'NSS Board', code: 'NSS63', clue: 'Three letters will show you the way,\nFind the board where NSS messages stay.\nYou need not go too high,\nThe first floor is where you should try.' },
    core_member: { name: 'CORE Member', shortName: 'CORE Member', code: 'MEMBER51', clue: 'Your next destination is not a place,\nIt belongs to someone you may recognize.\nFind the designated CORE member,\nThey hold your next clue.' }
  },
  riddles: {
    red: [['(15 × 2) + 8 − 11 = ?', 27], ['(48 ÷ 6) + 14 = ?', 22], ['(7 × 8) − 13 = ?', 43], ['(100 ÷ 4) + 17 = ?', 42], ['(9 × 9) − 21 = ?', 60]],
    blue: [['(18 + 6) ÷ 3 + 11 = ?', 19], ['(64 ÷ 8) + 19 = ?', 27], ['(6 × 9) − 14 = ?', 40], ['(8² ÷ 4) + 27 = ?', 43], ['(11 × 7) − 16 + 5 = ?', 66]],
    green: [['(9 × 4) + 5 = ?', 41], ['(72 ÷ 8) + 16 = ?', 25], ['(13 × 5) − 12 = ?', 53], ['(12² ÷ 6) + 29 = ?', 53], ['(8 × 8) − 17 + 9 = ?', 56]],
    yellow: [['(18 × 3) − 20 = ?', 34], ['(96 ÷ 12) + 27 = ?', 35], ['(7 × 9) − 18 = ?', 45], ['(125 ÷ 5) + 11 = ?', 36], ['(14 × 6) − 29 + 8 = ?', 63]],
    purple: [['(16 × 2) + 9 = ?', 41], ['(81 ÷ 9) + 24 = ?', 33], ['(12 × 6) − 17 = ?', 55], ['(160 ÷ 8) + 23 = ?', 43], ['(9 × 7) − 10 + 12 = ?', 65]]
  }
};

export const STATUS = { NOT_STARTED: 'NOT_STARTED', IN_PROGRESS: 'IN_PROGRESS', COMPLETED: 'COMPLETED', DISABLED: 'DISABLED' };
export const teamById = (id) => GAME_CONFIG.teams.find((team) => team.id === id);
export const locationById = (id) => GAME_CONFIG.locations[id];
export const formatDuration = (milliseconds = 0) => {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  return hours ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}` : `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
};
export const createTeamState = (team) => ({ teamId: team.id, teamName: team.name, status: STATUS.NOT_STARTED, currentStage: 0, currentLocation: null, startTime: null, completionTime: null, completedCheckpoints: [], unlocked: false, disabled: false });
