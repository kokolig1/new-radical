const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((item) => revealObserver.observe(item));
}

const FIELD_MARKUP = {
  baseball: '<svg viewBox="0 0 640 420" role="img" aria-label="Top-down baseball play with runners on first and third">' +
    '<path class="outfield-line" d="M72 337 Q320 36 568 337"/><path class="foul-line" d="M320 370 L72 92 M320 370 L568 92"/>' +
    '<path class="infield-dirt" d="M320 112 L476 242 L320 372 L164 242 Z"/><path class="diamond-line" d="M320 125 L468 244 L320 364 L172 244 Z"/>' +
    '<path class="lead-track" d="M462 242 Q430 219 402 191"/><path class="correct-path" d="M402 191 Q361 151 324 129"/>' +
    '<g class="base"><rect x="311" y="116" width="18" height="18" transform="rotate(45 320 125)"/><rect x="459" y="235" width="18" height="18" transform="rotate(45 468 244)"/><rect x="163" y="235" width="18" height="18" transform="rotate(45 172 244)"/><path d="M310 358 L330 358 L335 368 L320 379 L305 368 Z"/></g>' +
    '<g class="fielder"><circle cx="320" cy="238" r="10"/><text x="320" y="218">P</text></g><g class="fielder"><circle cx="512" cy="222" r="8"/><circle cx="404" cy="151" r="8"/><circle cx="246" cy="151" r="8"/><circle cx="128" cy="222" r="8"/></g>' +
    '<g class="runner"><circle cx="164" cy="249" r="14"/><text x="164" y="253">R3</text></g>' +
    '<g class="runner runner-one focus-player player you"><circle cx="473" cy="249" r="15"/><circle class="runner-pulse" cx="473" cy="249" r="21"/><text x="473" y="253">YOU</text></g>' +
    '<g class="batter"><circle cx="338" cy="361" r="10"/><text x="358" y="366">BATTER</text></g><circle class="sim-ball" cx="320" cy="252" r="5"/></svg>',
  basketball: '<svg viewBox="0 0 640 420" role="img" aria-label="Top-down basketball late-game screen action">' +
    '<rect class="zone-fill" x="125" y="36" width="390" height="348" rx="6"/><path class="court-line" d="M125 210 H515 M235 36 V145 H405 V36 M260 145 A60 60 0 0 0 380 145"/><circle class="court-line faint" cx="320" cy="210" r="56"/><path class="court-line" d="M286 55 H354 M320 55 V36"/>' +
    '<path class="correct-path" d="M315 310 Q260 266 210 214"/>' +
    '<g class="player ally focus-player you"><circle cx="320" cy="315" r="15"/><circle class="runner-pulse" cx="320" cy="315" r="21"/><text x="320" y="319">YOU</text></g>' +
    '<g class="player ally"><circle cx="386" cy="258" r="13"/><text x="386" y="262">5</text><circle cx="168" cy="156" r="12"/><circle cx="472" cy="156" r="12"/></g>' +
    '<g class="player opp"><circle cx="320" cy="278" r="13"/><circle cx="370" cy="232" r="13"/><circle cx="220" cy="164" r="12"/></g><circle class="sim-ball" cx="328" cy="302" r="6"/></svg>',
  soccer: '<svg viewBox="0 0 640 420" role="img" aria-label="Top-down soccer winger decision near the penalty area">' +
    '<rect class="zone-fill" x="60" y="34" width="520" height="352"/><path class="court-line" d="M60 210 H580 M220 34 V126 H420 V34 M270 34 V76 H370 V34"/><circle class="court-line faint" cx="320" cy="210" r="62"/><path class="correct-path" d="M493 294 Q448 250 402 192"/>' +
    '<g class="player ally focus-player you"><circle cx="500" cy="300" r="15"/><circle class="runner-pulse" cx="500" cy="300" r="21"/><text x="500" y="304">YOU</text></g>' +
    '<g class="player ally"><circle cx="446" cy="330" r="12"/><text x="446" y="334">FB</text><circle cx="320" cy="150" r="12"/><text x="320" y="154">9</text></g>' +
    '<g class="player opp"><circle cx="472" cy="258" r="13"/><circle cx="390" cy="164" r="12"/><circle cx="284" cy="102" r="12"/></g><circle class="sim-ball" cx="488" cy="288" r="6"/></svg>',
  football: '<svg viewBox="0 0 640 420" role="img" aria-label="Top-down football third-down blitz read">' +
    '<rect class="zone-fill" x="55" y="38" width="530" height="344"/><path class="court-line faint" d="M55 100 H585 M55 160 H585 M55 220 H585 M55 280 H585 M55 340 H585"/><path class="court-line" d="M55 255 H585"/><path class="correct-path" d="M320 292 L320 220 L250 166"/>' +
    '<g class="player ally focus-player you"><circle cx="320" cy="300" r="15"/><circle class="runner-pulse" cx="320" cy="300" r="21"/><text x="320" y="304">QB</text></g>' +
    '<g class="player ally"><circle cx="245" cy="268" r="11"/><circle cx="282" cy="268" r="11"/><circle cx="320" cy="268" r="11"/><circle cx="358" cy="268" r="11"/><circle cx="395" cy="268" r="11"/><circle cx="205" cy="210" r="12"/></g>' +
    '<g class="player opp"><circle cx="245" cy="238" r="11"/><circle cx="282" cy="238" r="11"/><circle cx="320" cy="238" r="11"/><circle cx="358" cy="238" r="11"/><circle cx="395" cy="238" r="11"/><circle cx="205" cy="242" r="12"/><circle cx="320" cy="126" r="12"/></g><circle class="sim-ball" cx="320" cy="282" r="6"/></svg>',
  volleyball: '<svg viewBox="0 0 640 420" role="img" aria-label="Top-down volleyball setter read at match point">' +
    '<rect class="zone-fill" x="95" y="44" width="450" height="332"/><path class="court-line" d="M95 210 H545 M190 44 V376 M450 44 V376"/><path class="court-line faint" d="M95 160 H545 M95 260 H545"/><path class="correct-path" d="M285 302 Q360 250 430 188"/>' +
    '<g class="player ally focus-player you"><circle cx="280" cy="308" r="15"/><circle class="runner-pulse" cx="280" cy="308" r="21"/><text x="280" y="312">SET</text></g>' +
    '<g class="player ally"><circle cx="430" cy="302" r="13"/><text x="430" y="306">RS</text><circle cx="175" cy="290" r="12"/><circle cx="320" cy="278" r="12"/></g>' +
    '<g class="player opp"><circle cx="250" cy="182" r="13"/><circle cx="325" cy="182" r="13"/><circle cx="430" cy="180" r="13"/></g><circle class="sim-ball" cx="292" cy="284" r="7"/></svg>',
  'jiu-jitsu': '<svg viewBox="0 0 640 420" role="img" aria-label="Top-down jiu-jitsu closed-guard decision">' +
    '<circle class="zone-fill" cx="320" cy="210" r="174"/><circle class="court-line faint" cx="320" cy="210" r="140"/><path class="correct-path" d="M300 250 Q355 228 390 182"/>' +
    '<g class="player ally focus-player you"><circle cx="290" cy="250" r="20"/><circle class="runner-pulse" cx="290" cy="250" r="28"/><text x="290" y="254">YOU</text><path class="court-line" d="M274 266 L245 300 M306 266 L337 300"/></g>' +
    '<g class="player opp"><circle cx="338" cy="190" r="20"/><text x="338" y="194">TOP</text><path class="court-line" d="M324 205 L286 230 M352 205 L390 236"/></g>' +
    '<path class="motion-path" d="M338 190 Q350 230 332 274"/></svg>'
};

const SPORTS = {
  baseball: {
    name: 'Baseball', role: 'Hitter', stakes: 'BOTTOM 8.<br>DOWN 1.<br>TWO OUTS.',
    heroImage: 'assets/hero-athlete-v2.webp', heroAlt: 'A focused young baseball hitter under stadium lights',
    hero: 'You’re the runner at first. The pitcher never checks you. Think you see it?',
    scenario: 'Bottom of the eighth. Down one. Two outs. You’re the runner at first. The pitcher never checks you. What’s your call?',
    answers: { A: 'Hold. Your run doesn’t matter.', B: 'Break early. Force the defense to decide.', C: 'Wait for contact. Run on the swing.' },
    coach: 'Creating movement forces the defense to choose and can expose the hesitation. Pressure is part of the play.',
    split: { A: '14%', B: '68%', C: '18%' }, score: [['INNING','B8'],['OUTS','2'],['SCORE','3–4']],
    phaseStart: 'PITCHER SET', phaseMove: 'DELIVERY STARTS', statusStart: 'Runner at first · pitcher never checks', statusMove: 'Ball in motion · defense is committed',
    clinicEdge: 'AGGRESSION', clinicCopy: 'You’ve missed 5 reads when the moment demanded aggression.', dna: '“You don’t get talked out of your game.”'
  },
  basketball: {
    name: 'Basketball', role: 'Guard', stakes: '0:18 LEFT.<br>DOWN 1.<br>ONE TIMEOUT.',
    heroImage: 'assets/hero-basketball-v1.webp', heroAlt: 'A focused young male basketball guard reading the defense under arena lights',
    hero: 'Your defender shades right. The big comes high to screen. The help is already leaning. Think you see it?',
    scenario: 'Eighteen seconds left. Down one. You’re the guard. Your defender takes away your right hand and the big comes high to screen. What’s your call?',
    answers: { A: 'Use the screen and pull the contested three.', B: 'Reject the screen. Attack the open left lane.', C: 'Back it out and wait for an isolation.' },
    coach: 'The defender has already committed to the screen side. Rejecting it attacks the open hip before the help can switch.',
    split: { A: '21%', B: '63%', C: '16%' }, score: [['CLOCK','0:18'],['FOULS','4'],['SCORE','61–62']],
    phaseStart: 'SCREEN ARRIVES', phaseMove: 'DEFENDER LEANS', statusStart: 'High screen · defender shading right', statusMove: 'Help steps up · weak-side lane opens',
    clinicEdge: 'PACE CHANGE', clinicCopy: 'You’ve missed 4 reads where changing speed created the advantage.', dna: '“You create space before you use it.”'
  },
  soccer: {
    name: 'Soccer', role: 'Winger', stakes: '88TH MINUTE.<br>LEVEL MATCH.<br>OVERLAP ON.',
    heroImage: 'assets/hero-soccer-v1.webp', heroAlt: 'A focused young female soccer winger reading the field under stadium lights',
    hero: 'The fullback squares you up. Your striker checks short. The overlap is arriving. Think you see it?',
    scenario: 'Eighty-eighth minute. Level match. You’re the winger. The fullback squares up, your striker checks short and your outside back overlaps. What’s your call?',
    answers: { A: 'Take the defender outside by yourself.', B: 'Hold the defender. Slip the overlapping run.', C: 'Recycle backward and reset the shape.' },
    coach: 'Holding the ball for one extra beat pins the defender. The overlap then enters the space at speed with the defense facing its own goal.',
    split: { A: '26%', B: '59%', C: '15%' }, score: [['MINUTE','88'],['SCORE','1–1'],['SHAPE','4–3–3']],
    phaseStart: 'DEFENDER SET', phaseMove: 'OVERLAP STARTS', statusStart: 'Winger isolated · support arriving', statusMove: 'Defender holds · lane opens outside',
    clinicEdge: 'TIMING', clinicCopy: 'You’ve missed 6 reads where one extra beat would release the run.', dna: '“You see the run before the lane opens.”'
  },
  football: {
    name: 'Football', role: 'Quarterback', stakes: '3RD & 6.<br>1:42 LEFT.<br>BLITZ SHOWING.',
    heroImage: 'assets/hero-football-v1.webp', heroAlt: 'A focused young male quarterback reading the defense before the snap',
    hero: 'The slot defender creeps down. The safety rotates late. The defense just showed its hand. Think you see it?',
    scenario: 'Third and six. One forty-two left. You’re the quarterback. The slot defender blitzes and the safety rotates late. What’s your call?',
    answers: { A: 'Hold the ball for the deep outside route.', B: 'Hit the hot route in the vacated slot.', C: 'Escape the pocket and improvise.' },
    coach: 'The blitz removes the slot defender from coverage. The hot route replaces him immediately and gets the ball out before pressure arrives.',
    split: { A: '17%', B: '71%', C: '12%' }, score: [['QUARTER','Q4'],['DOWN','3 & 6'],['SCORE','20–24']],
    phaseStart: 'DEFENSE SET', phaseMove: 'BLITZ DECLARES', statusStart: 'Two-high shell · slot pressure showing', statusMove: 'Safety rotates · hot window opens',
    clinicEdge: 'PRE-SNAP VISION', clinicCopy: 'You’ve missed 3 pressure tells before the snap confirmed them.', dna: '“You know where the answer is before the ball moves.”'
  },
  volleyball: {
    name: 'Volleyball', role: 'Setter', stakes: 'SET FIVE.<br>13–13.<br>MIDDLE COMMITS.',
    heroImage: 'assets/hero-volleyball-v1.webp', heroAlt: 'A focused young female volleyball setter preparing to read the play',
    hero: 'Their middle commits early. Your right side is one-on-one. The pass is tight. Think you see it?',
    scenario: 'Fifth set. Thirteen-all. You’re the setter. Their middle blocker commits early to your quick and your right side is isolated. What’s your call?',
    answers: { A: 'Force the quick through the committed block.', B: 'Back-set the isolated right-side hitter.', C: 'Send a safe high ball to the outside.' },
    coach: 'The middle blocker has left early. The back set turns that commitment into a clean one-on-one at the antenna.',
    split: { A: '18%', B: '66%', C: '16%' }, score: [['SET','5'],['SCORE','13–13'],['SERVE','THEM']],
    phaseStart: 'PASS ARRIVES', phaseMove: 'MIDDLE COMMITS', statusStart: 'Pass tight · all three options live', statusMove: 'Block shifts left · right side isolated',
    clinicEdge: 'DECEPTION', clinicCopy: 'You’ve missed 5 reads where your eyes could hold the middle longer.', dna: '“You make every hitter look available.”'
  },
  'jiu-jitsu': {
    name: 'Jiu-Jitsu', role: 'Guard Player', stakes: '2:10 LEFT.<br>SCORE 0–0.<br>POST EXPOSED.',
    heroImage: 'assets/hero-jiu-jitsu-v1.webp', heroAlt: 'A focused young male jiu-jitsu athlete preparing to engage',
    hero: 'Your opponent drives forward and posts the right hand. Their balance just shifted. Think you see it?',
    scenario: 'Two minutes left. Score tied. You’re playing closed guard. Your opponent drives forward and posts the right hand to recover balance. What’s your call?',
    answers: { A: 'Open the guard and create distance.', B: 'Control the posting arm. Angle for the triangle.', C: 'Stay square and wait for another mistake.' },
    coach: 'The posted arm cannot defend the inside space. Controlling it while changing your angle creates the triangle before posture returns.',
    split: { A: '20%', B: '62%', C: '18%' }, score: [['TIME','2:10'],['SCORE','0–0'],['POSITION','GUARD']],
    phaseStart: 'PRESSURE BUILDS', phaseMove: 'RIGHT HAND POSTS', statusStart: 'Closed guard · posture driving forward', statusMove: 'Base shifts · inside space appears',
    clinicEdge: 'ANGLE CREATION', clinicCopy: 'You’ve missed 4 attacks because your hips stayed square to the pressure.', dna: '“You turn their recovery into your opening.”'
  }
};

const callCard = document.querySelector('[data-call-card]');
const simulation = callCard?.querySelector('[data-simulation]');
const simulationButton = callCard?.querySelector('[data-sim-start]');
const simulationPhase = callCard?.querySelector('[data-sim-phase]');
const simulationClock = callCard?.querySelector('[data-sim-clock]');
const simulationFlash = callCard?.querySelector('[data-sim-flash]');
const simulationStatus = callCard?.querySelector('[data-sim-status]');
const simulationField = callCard?.querySelector('[data-sim-field]');
const answerButtons = callCard?.querySelectorAll('[data-answer]') || [];
const answerResult = callCard?.querySelector('.answer-result');
const resultTitle = callCard?.querySelector('[data-result-title]');
const sportButtons = document.querySelectorAll('[data-sport]');
const sportFeedback = document.querySelector('.sport-block > p');
const heroAthlete = document.querySelector('[data-hero-athlete]');
const joinSport = document.querySelector('.join-form select[name="sport"]');
let currentSport = 'baseball';
let heroSwapToken = 0;
let simulationVisible = false;
let simulationTimers = [];
let simulationInterval;

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function clearSimulationTimers() {
  simulationTimers.forEach(window.clearTimeout);
  simulationTimers = [];
  window.clearInterval(simulationInterval);
}

function resetCall() {
  clearSimulationTimers();
  if (callCard) delete callCard.dataset.choice;
  answerButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove('selected', 'correct', 'wrong');
  });
  if (answerResult) answerResult.hidden = true;
  if (simulationButton) {
    simulationButton.disabled = false;
    simulationButton.textContent = '↻ REPLAY';
  }
}

function updateHeroImage(sport) {
  if (!heroAthlete || !sport.heroImage) return;
  if (heroAthlete.getAttribute('src') === sport.heroImage) {
    heroAthlete.alt = sport.heroAlt;
    return;
  }

  const token = ++heroSwapToken;
  const nextImage = new Image();
  nextImage.src = sport.heroImage;
  nextImage.alt = sport.heroAlt;

  const commitSwap = () => {
    if (token !== heroSwapToken) return;
    heroAthlete.classList.add('is-switching');
    window.setTimeout(() => {
      if (token !== heroSwapToken) return;
      heroAthlete.src = sport.heroImage;
      heroAthlete.alt = sport.heroAlt;
      requestAnimationFrame(() => heroAthlete.classList.remove('is-switching'));
    }, reduceMotion ? 0 : 140);
  };

  if (nextImage.complete) commitSwap();
  else nextImage.addEventListener('load', commitSwap, { once: true });
}

function applySport(key, announce) {
  const sport = SPORTS[key] || SPORTS.baseball;
  currentSport = key in SPORTS ? key : 'baseball';
  resetCall();
  document.body.dataset.sport = currentSport;
  updateHeroImage(sport);

  sportButtons.forEach((button) => {
    const selected = button.dataset.sport === currentSport;
    button.setAttribute('aria-pressed', String(selected));
    const state = button.querySelector('small');
    if (state) state.textContent = selected ? 'Selected' : 'Pick';
  });
  if (sportFeedback) sportFeedback.textContent = announce ? sport.name + ' selected. Your challenge is loaded below.' : 'Pick your sport. The challenge below changes instantly.';

  setText('[data-daily-eyebrow]', 'TODAY’S LIVE READ · ' + sport.name.toUpperCase());
  setText('[data-card-sport]', sport.name.toUpperCase() + ' · ' + sport.role.toUpperCase());
  setText('[data-situation]', sport.scenario);
  ['A','B','C'].forEach((letter) => setText('[data-answer-text="' + letter + '"]', sport.answers[letter]));
  setText('[data-correct-letter]', 'B');
  setText('[data-correct-text]', sport.answers.B);
  setText('[data-coach-copy]', sport.coach);
  ['A','B','C'].forEach((letter) => setText('[data-split="' + letter + '"]', sport.split[letter]));
  setText('[data-dna-quote]', sport.dna);
  setText('[data-clinic-eyebrow]', 'THE ' + sport.name.toUpperCase() + ' CLINIC');
  setText('[data-clinic-intro]', 'Missed calls become your next lesson. Short coach-led sessions target the exact decisions your ' + sport.name.toLowerCase() + ' game keeps getting wrong.');
  setText('[data-clinic-edge]', sport.clinicEdge);
  setText('[data-clinic-copy]', sport.clinicCopy);

  document.querySelectorAll('[data-score-label]').forEach((element, index) => { element.textContent = sport.score[index][0]; });
  document.querySelectorAll('[data-score-value]').forEach((element, index) => { element.textContent = sport.score[index][1]; });
    if (simulationField) {
      const currentField = simulationField.querySelector("svg");
      const nextField = document.createElement("div");
      nextField.innerHTML = FIELD_MARKUP[currentSport].trim();
      if (currentField && nextField.firstElementChild) {
        currentField.replaceWith(nextField.firstElementChild);
      }
    }
  if (simulation) simulation.dataset.sportView = currentSport;
  if (simulationPhase) simulationPhase.textContent = sport.phaseStart;
  if (simulationClock) simulationClock.textContent = '03.0';
  if (simulationFlash) simulationFlash.textContent = 'READ THE FIELD';
  if (simulationStatus) simulationStatus.textContent = sport.statusStart;
  if (joinSport) joinSport.value = sport.name;

  try { localStorage.setItem('newRadicalSport', currentSport); } catch (_) {}
  if (simulationVisible && !reduceMotion) window.setTimeout(runSimulation, 120);
}

function runSimulation() {
  if (!simulation || callCard?.dataset.choice) return;
  const sport = SPORTS[currentSport];
  clearSimulationTimers();
  simulation.classList.remove('is-running');
  void simulation.offsetWidth;
  simulation.classList.add('is-running');
  if (simulationPhase) simulationPhase.textContent = sport.phaseStart;
  if (simulationClock) simulationClock.textContent = '03.0';
  if (simulationFlash) simulationFlash.textContent = 'READ THE FIELD';
  if (simulationStatus) simulationStatus.textContent = sport.statusStart;

  let tenths = 30;
  simulationInterval = window.setInterval(() => {
    tenths -= 1;
    if (simulationClock) simulationClock.textContent = String(Math.max(0, Math.floor(tenths / 10))).padStart(2, '0') + '.' + Math.max(0, tenths % 10);
    if (tenths <= 0) window.clearInterval(simulationInterval);
  }, 100);

  simulationTimers.push(window.setTimeout(() => {
    if (simulationPhase) simulationPhase.textContent = sport.phaseMove;
    if (simulationFlash) simulationFlash.textContent = 'THE PLAY MOVES';
    if (simulationStatus) simulationStatus.textContent = sport.statusMove;
  }, 950));
  simulationTimers.push(window.setTimeout(() => {
    if (simulationPhase) simulationPhase.textContent = 'DECISION WINDOW';
    if (simulationFlash) simulationFlash.textContent = 'MAKE THE CALL';
    if (simulationStatus) simulationStatus.textContent = 'Your decision locks now';
  }, 2300));
}

sportButtons.forEach((button) => {
  button.addEventListener('click', () => applySport(button.dataset.sport, true));
});

simulationButton?.addEventListener('click', runSimulation);

if (simulation) {
  if (reduceMotion) {
    simulationVisible = true;
  } else {
    const simulationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        simulationVisible = entry.isIntersecting;
        if (entry.isIntersecting && !callCard?.dataset.choice) runSimulation();
      });
    }, { threshold: 0.45 });
    simulationObserver.observe(simulation);
  }
}

answerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const sport = SPORTS[currentSport];
    const correct = 'B';
    clearSimulationTimers();
    callCard.dataset.choice = button.dataset.answer;
    answerButtons.forEach((item) => {
      item.disabled = true;
      item.classList.toggle('selected', item === button);
      item.classList.toggle('correct', item.dataset.answer === correct);
      item.classList.toggle('wrong', item === button && item.dataset.answer !== correct);
    });
    if (resultTitle) resultTitle.textContent = button.dataset.answer === correct ? 'YOU SAW IT.' : 'NOW YOU SEE IT.';
    setText('[data-correct-letter]', correct);
    setText('[data-correct-text]', sport.answers[correct]);
    setText('[data-coach-copy]', sport.coach);
    if (simulationPhase) simulationPhase.textContent = 'CALL LOCKED';
    if (simulationFlash) simulationFlash.textContent = button.dataset.answer === correct ? 'RIGHT READ' : 'COACH REVEAL';
    if (simulationStatus) simulationStatus.textContent = 'Correct call: B · ' + sport.answers.B;
    if (simulationButton) {
      simulationButton.disabled = true;
      simulationButton.textContent = 'CALL LOCKED';
    }
    if (answerResult) answerResult.hidden = false;
  });
});

joinSport?.addEventListener('change', () => {
  const match = Object.keys(SPORTS).find((key) => SPORTS[key].name === joinSport.value);
  if (match) applySport(match, true);
});

let savedSport = 'baseball';
try {
  const candidate = localStorage.getItem('newRadicalSport');
  if (candidate && candidate in SPORTS) savedSport = candidate;
} catch (_) {}
applySport(savedSport, false);

const preloadSportHeroes = () => {
  Object.values(SPORTS).forEach((sport) => {
    if (sport.heroImage === heroAthlete?.getAttribute('src')) return;
    const image = new Image();
    image.src = sport.heroImage;
  });
};
if ('requestIdleCallback' in window) window.requestIdleCallback(preloadSportHeroes);
else window.setTimeout(preloadSportHeroes, 800);

const joinForm = document.querySelector('[data-join-form]');
joinForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!joinForm.reportValidity()) return;
  const button = joinForm.querySelector('button[type="submit"]');
  const success = joinForm.querySelector('.form-success');
  if (button) {
    button.textContent = 'PLAYER NAME CLAIMED';
    button.disabled = true;
  }
  if (success) success.hidden = false;
  try {
    const data = Object.fromEntries(new FormData(joinForm).entries());
    localStorage.setItem('newRadicalSeason01', JSON.stringify(data));
  } catch (_) {}
});

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});
