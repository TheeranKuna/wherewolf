/* Werewolf — role + faction data, lifted from lib/models/role_data.dart.
   Shared by all three website directions. */
(function () {
  const R = (id, label, faction, desc, sub) => ({ id, label, faction, desc, sub });

  window.WW_FACTIONS = {
    werewolves: {
      key: 'werewolves', label: 'Werewolves', kicker: 'The Pack', count: 5,
      color: '#DA3633', soft: 'rgba(218,54,51,0.16)',
      line: 'Hunt as one. Feed in the dark. Wake before the village does.',
      win: 'Win when the wolves equal or outnumber the living villagers.'
    },
    vampires: {
      key: 'vampires', label: 'Vampires', kicker: 'The Coven', count: 3,
      color: '#7C3AED', soft: 'rgba(124,58,237,0.16)',
      line: 'Charm, silence and poison. Turn the village against itself.',
      win: 'Win by draining the village until only the night remains.'
    },
    neutrals: {
      key: 'neutrals', label: 'Neutrals', kicker: 'The Unaligned', count: 5,
      color: '#0D9488', soft: 'rgba(13,148,136,0.16)',
      line: 'Your own victory. Your own rules. The Jester wants to hang.',
      win: 'Each chases a private end — a hanging, a host, a stolen grave.'
    },
    villagers: {
      key: 'villagers', label: 'Villagers', kicker: 'The Village', count: 14,
      color: '#3FB950', soft: 'rgba(63,185,80,0.16)',
      line: 'Seers, knights and healers. Root out the wolves before dawn runs out.',
      win: 'Win when every werewolf and vampire lies in the ground.'
    }
  };

  window.WW_ROLES = [
    // Werewolves
    R('werewolf', 'Werewolf', 'werewolves', 'Hunt the villagers under the cover of night.', 'Choose your victim…'),
    R('alpha_werewolf', 'Alpha Werewolf', 'werewolves', 'Lead the pack and choose to kill or convert once per game.', 'Kill… or convert?'),
    R('cursed_wolf', 'Cursed Wolf', 'werewolves', 'An evil wolf that reads as innocent to investigators.', 'Choose your victim…'),
    R('double_wolf', 'Double Wolf', 'werewolves', 'A werewolf whose day vote counts as two.', 'Choose your victim…'),
    R('evil_guesser', 'Evil Guesser', 'werewolves', 'Name a player\u2019s role — be right, and claim their life.', 'Name a role and stake your life…'),
    // Vampires
    R('vampire', 'Vampire', 'vampires', 'Drain the village by night to claim immortality.', 'Choose your prey…'),
    R('silencer', 'Silencer', 'vampires', 'A curse that steals tomorrow\u2019s voice without taking a life.', 'Choose whose voice dies tonight…'),
    R('poisoner', 'Poisoner', 'vampires', 'Mark a target with delayed venom that resolves at dawn.', 'Choose your poison\u2019s mark…'),
    // Neutrals
    R('jester', 'Jester', 'neutrals', 'You win only if the village votes you out.', 'Dream of the gallows…'),
    R('executioner', 'Executioner', 'neutrals', 'Secretly push your assigned target to the gallows.', 'Your target still draws breath…'),
    R('lawyer', 'Lawyer', 'neutrals', 'You win if your secret client meets their own win condition.', 'Your client\u2019s fate is yours…'),
    R('grave_robber', 'Grave Robber', 'neutrals', 'Absorb a dead role and inherit its powers for good.', 'Rummage among the fallen…'),
    R('plague_bearer', 'Plague Bearer', 'neutrals', 'Infect everyone and win when all the living are dosed.', 'Choose your next host…'),
    // Villagers
    R('seer', 'Seer', 'villagers', 'Read a soul as Good, Evil, or Neutral.', 'Peer into a soul…'),
    R('fortune_teller', 'Fortune Teller', 'villagers', 'Peer into the darkness to reveal hidden truths.', 'Choose someone to inspect…'),
    R('apprentice_seer', 'Apprentice Seer', 'villagers', 'Compare two players to learn if they share a faction.', 'Compare two souls…'),
    R('knight', 'Knight', 'villagers', 'Protect the innocent from the werewolf\u2019s bite.', 'Choose someone to protect…'),
    R('bodyguard', 'Bodyguard', 'villagers', 'Guard someone and die in their place if needed.', 'Choose your ward…'),
    R('potioneer', 'Potioneer', 'villagers', 'Wield a one-time revive and a one-time kill potion.', 'Choose a potion to brew…'),
    R('hunter', 'Hunter', 'villagers', 'Shoot at night: strike evil to kill, strike innocent and fall.', 'Take aim and fire…'),
    R('reviver', 'Reviver', 'villagers', 'A one-time power to call a dead player back to life.', 'Call a soul back…'),
    R('mayor', 'Mayor', 'villagers', 'A hidden office whose vote counts as two.', 'The weight of office never sleeps…'),
    R('oracle', 'Oracle', 'villagers', 'Receives the cumulative tally of the dead by alignment.', 'The fallen whisper their count…'),
    R('undertaker', 'Undertaker', 'villagers', 'Quietly learns the dead and their exact roles.', 'Attend to the fallen…'),
    R('watcher', 'Watcher', 'villagers', 'Observe who another player visits in the night.', 'Choose someone to observe…'),
    R('nice_guesser', 'Nice Guesser', 'villagers', 'Name a role and stake your life to expose a foe.', 'Name a role and stake your life…'),
    R('villager', 'Villager', 'villagers', 'Find and eliminate the werewolves among you.', 'The village sleeps…')
  ];

  window.WW_ASSET = {
    card: id => 'cards/' + id + '.jpg',
    cardFull: id => '../assets/roles/cards/role_' + id + '.png',
    badge: id => '../assets/roles/badges/badge_' + id + '.png'
  };
})();
