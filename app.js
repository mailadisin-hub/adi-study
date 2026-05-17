/* =========================================================================
   ADI.STUDY — main app logic
   ========================================================================= */

const TOPICS = {
  maths: ['Functions & Modulus','Sequences & Series','Binomial Expansion','Trigonometry Advanced','Parametric Equations','Implicit Differentiation','Integration by Substitution','Integration by Parts','Partial Fractions','Volumes of Revolution','Differential Equations','Vectors 3D','Statistics & Normal','Mechanics'],
  fm: ['Complex Numbers','Matrices & Eigenvalues','Invariant Lines','Polar Coordinates','Proof by Induction','Hyperbolic Functions','Further Calculus','Reduction Formulae','Maclaurin Series','2nd Order DEs','Vectors & Planes 3D','FM Statistics'],
  phys: ['Gravitational Fields','Simple Harmonic Motion','Thermal Physics','Electric Fields','Capacitors','Magnetic Fields','Electromagnetic Induction','Nuclear Physics','Astrophysics','Quantum & de Broglie']
};

const SUBTOPICS = {
  maths: [
    ['Modulus equations & inequalities','Composite functions f∘g','Inverse functions & their graphs','Domain and range restrictions','Graphs of |f(x)| and f(|x|)','Combined graph transformations'],
    ['Sigma notation Σ','Arithmetic series & sum formula','Geometric series & sum to infinity','Convergence condition |r|<1','Recurrence relations','Modelling with sequences'],
    ['(1+x)ⁿ for fractional/negative n','Validity range |x|<1','Generalising (a+bx)ⁿ form','Using expansions for approximations','Combining with partial fractions'],
    ['Reciprocal trig sec, cosec, cot','Pythagorean identities (1+tan²=sec² etc.)','Compound angle formulae','Double & half angle formulae','R cos(x±α) / R sin(x±α) form','Solving trig equations'],
    ['dy/dx via parameter (chain rule)','Tangents & normals to parametric curves','Converting parametric ↔ Cartesian','Areas under parametric curves','Modelling motion with parametrics'],
    ['Differentiating implicit functions','Combined product & chain rule','Tangents/normals to implicit curves','Logarithmic differentiation','Second derivatives implicitly'],
    ['Choosing a substitution','Definite integrals: changing limits','Trig substitutions (sin, tan)','Recognising reverse chain rule','Substitutions with √(a²-x²) etc.'],
    ['Choosing u and dv (ILATE rule)','Standard: xeˣ, x sinx, x lnx','Repeated IBP (x² sinx etc.)','Cyclic IBP (eˣ sinx)','Definite integrals with IBP','IBP for ∫ln(x), ∫arctan(x)'],
    ['Distinct linear factors','Repeated linear factors','Quadratic factor in denominator','Improper rational fractions','Using partial fractions in integration'],
    ['Around the x-axis ∫πy² dx','Around the y-axis ∫πx² dy','Parametric volumes','Setting limits correctly','Hollow / annular solids'],
    ['Separable variables method','First-order linear DEs','Forming DEs from situations','Boundary / initial conditions','Exponential growth/decay models','Newton\'s law of cooling'],
    ['Position vs displacement vectors','Magnitude & unit vectors','Scalar (dot) product a·b','Angle between vectors','Vector equation of a line in 3D','Parallel / intersecting / skew lines'],
    ['Normal distribution N(μ,σ²)','Standardising Z=(X-μ)/σ','Inverse normal lookups','Hypothesis test for mean','Type I and Type II errors','Correlation & PMCC interpretation'],
    ['Variable acceleration via calculus','v=ds/dt, a=dv/dt','Forces in 2D & resultants','Friction & inclined planes','Projectile motion (full path)','Moments and equilibrium of rigid bodies'],
  ],
  fm: [
    ['Argand diagram representation','Modulus-argument form r(cosθ+isinθ)','de Moivre\'s theorem','nᵗʰ roots of unity','Loci on the Argand diagram','Complex roots of real polynomials'],
    ['2×2 and 3×3 matrix operations','Determinants & properties','Inverse matrices','Solving linear systems with matrices','Eigenvalues & eigenvectors','Diagonalisation P⁻¹AP=D','Cayley-Hamilton theorem'],
    ['Invariant points under transformations','Invariant lines (point-wise vs setwise)','Connection to eigenvectors','Finding invariant lines algebraically'],
    ['Polar ↔ Cartesian conversion','Sketching r = f(θ) curves','Tangents at the pole','Area enclosed by polar curve','Intersections of two polar curves'],
    ['Standard series proofs','Divisibility proofs','Matrix-power induction','Inequality proofs by induction','Recurrence-relation induction'],
    ['Definitions: sinh, cosh, tanh','Identity cosh²x - sinh²x = 1','Inverse hyperbolics (arsinh etc.)','Differentiating hyperbolic functions','Integrating hyperbolic functions','Solving hyperbolic equations'],
    ['Mean value of a function','Arc length of a curve','Surface area of revolution','Improper integrals (infinite limits)','Improper integrals (singular point)'],
    ['Deriving a reduction formula','Sequential application','Common forms ∫sinⁿx, ∫xⁿeˣ','Reduction with definite integrals','Combining reduction with IBP'],
    ['Standard expansions (eˣ, sinx, cosx, ln(1+x))','General (1+x)ⁿ series','Range of validity','Composing series (e^(sinx) etc.)','Using series for approximations'],
    ['Homogeneous DEs & auxiliary equation','Real distinct / repeated / complex roots','Particular integral (trial functions)','General solution = CF + PI','Boundary / initial conditions','Damped oscillation modelling'],
    ['Vector & Cartesian equation of a plane','Scalar form r·n = d','Line–plane intersection','Angle between two planes','Distance from point to plane','Shortest distance between skew lines'],
    ['Continuous random variables (PDF/CDF)','Expectation & variance of continuous','Chi-squared goodness of fit','Chi-squared contingency tables','Type I / II errors in detail','Conditional probability & Bayes'],
  ],
  phys: [
    ['Newton\'s law F = GMm/r²','Field strength g = GM/r²','Gravitational potential V = -GM/r','Escape velocity derivation','Satellite orbits & Kepler\'s 3rd law','Geostationary orbits'],
    ['Defining equation a = -ω²x','Solutions x = A cos(ωt+φ)','Pendulum & mass-spring period','Energy in SHM (KE↔PE exchange)','Damping: light / heavy / critical','Resonance & driven oscillations'],
    ['Internal energy & temperature','Specific heat capacity Q = mcΔT','Specific latent heat (fusion & vaporisation)','Ideal gas equation pV = nRT','Kinetic theory ½mc̄² = (3/2)kT','Boltzmann distribution intuition'],
    ['Coulomb\'s law F = Qq/(4πε₀r²)','Field of a point charge E = Q/(4πε₀r²)','Electric potential V = Q/(4πε₀r)','Parallel plate field E = V/d','Comparison: gravitational vs electric'],
    ['Definition C = Q/V','Energy stored ½CV² = ½QV','Charging through a resistor','Discharging V = V₀ e^(-t/RC)','Time constant τ = RC','Capacitors in series & parallel'],
    ['Field around a current-carrying wire','Force on a current F = BIL','Force on a moving charge F = BQv','Circular motion of charged particles','Cyclotron / velocity selector','Hall effect & Hall voltage'],
    ['Magnetic flux Φ = BA & flux linkage NΦ','Faraday\'s law ε = -N dΦ/dt','Lenz\'s law & induced current direction','Transformer equation & efficiency','AC generation & RMS values'],
    ['Nuclear radius R = r₀ A^(1/3)','Nuclear density (~constant)','Mass defect & binding energy','Binding energy per nucleon curve','Fission vs fusion energetics','Decay law N = N₀ e^(-λt)','Half-life T½ = ln2 / λ'],
    ['Stellar classification & HR diagram','Stellar evolution from main sequence','Parsec, parallax & distance ladder','Doppler shift z = Δλ/λ','Hubble\'s law v = H₀d & age of universe','Olbers\' paradox & cosmology'],
    ['Photoelectric effect (work function, threshold f)','Photon energy E = hf','Wave-particle duality','de Broglie wavelength λ = h/p','Electron diffraction experiment','Energy levels & line spectra'],
  ]
};
const SC = { maths:'var(--maths)', fm:'var(--fm)', phys:'var(--physics)' };
const SN = { maths:'Mathematics', fm:'Further Maths', phys:'Physics' };
const LEVELS = [
  {min:0,n:'Rookie Reviser'},{min:100,n:'Study Starter'},{min:250,n:'Topic Tackler'},
  {min:500,n:'Past Paper Pro'},{min:900,n:'Grade Grinder'},{min:1400,n:'A-Level Assassin'},
  {min:2000,n:'Imperial Candidate'},{min:3000,n:'A* Machine'}
];
const GP = {'A*':6,'A':5,'B':4,'C':3,'D':2,'E':1,'U':0};
const PG = ['U','E','D','C','B','A','A*'];
// Approximate grade boundaries (%) by subject/exam board
const PAPER_BOUNDS = {
  'Maths':         [['A*',80],['A',68],['B',55],['C',43],['D',31],['E',20]],
  'Further Maths': [['A*',83],['A',72],['B',59],['C',46],['D',33],['E',22]],
  'Physics':       [['A*',77],['A',64],['B',51],['C',39],['D',27],['E',17]],
};
const KEY_DATES = [
  {id:'sept', date:'2026-09-07', name:'Sept Mocks', urgent:30},
  {id:'esat', date:'2026-10-16', name:'ESAT', urgent:60},
  {id:'ucas', date:'2026-10-15', name:'UCAS', urgent:30},
  {id:'summer', date:'2026-07-14', name:'Term Ends', urgent:14},
];
const STALE_DAYS = 14;

/* =========================================================================
   ACHIEVEMENTS CATALOGUE
   ========================================================================= */
const ACHIEVEMENTS = [
  { id:'first_log',     name:'First Steps',           desc:'Save your first study log',          icon:'i-book',       check: s => (s.logs||[]).length >= 1 },
  { id:'streak_3',      name:'On a Roll',             desc:'3-day study streak',                 icon:'i-flame',      check: s => calcStreakRaw(s) >= 3 },
  { id:'streak_7',      name:'Week Warrior',          desc:'7-day study streak',                 icon:'i-flame',      check: s => calcStreakRaw(s) >= 7 },
  { id:'streak_14',     name:'Fortnight Fighter',     desc:'14-day study streak',                icon:'i-flame',      check: s => calcStreakRaw(s) >= 14 },
  { id:'streak_30',     name:'Month of Madness',      desc:'30-day study streak',                icon:'i-flame',      check: s => calcStreakRaw(s) >= 30 },
  { id:'streak_100',    name:'Iron Will',             desc:'100-day study streak',               icon:'i-flame',      check: s => calcStreakRaw(s) >= 100 },
  { id:'first_paper',   name:'Paper Trail',           desc:'Log your first past paper',          icon:'i-doc',        check: s => (s.papers||[]).length >= 1 },
  { id:'paper_a',       name:'A-Grade Material',      desc:'Score grade A on a paper',           icon:'i-doc',        check: s => (s.papers||[]).some(p => p.grade === 'A' || p.grade === 'A*') },
  { id:'paper_astar',   name:'Top of the Class',      desc:'Score A* on a paper',                icon:'i-doc',        check: s => (s.papers||[]).some(p => p.grade === 'A*') },
  { id:'paper_5',       name:'Practice Makes Perfect',desc:'Log 5 past papers',                  icon:'i-doc',        check: s => (s.papers||[]).length >= 5 },
  { id:'paper_20',      name:'Drill Sergeant',        desc:'Log 20 past papers',                 icon:'i-doc',        check: s => (s.papers||[]).length >= 20 },
  { id:'paper_90',      name:'Near Perfect',          desc:'Score 90%+ on a paper',              icon:'i-doc',        check: s => (s.papers||[]).some(p => p.pct >= 90) },
  { id:'maths_all',     name:'Maths Maven',           desc:'Touch every Maths subtopic',         icon:'i-check-list', check: s => subjectAllStudied('maths', s) },
  { id:'fm_all',        name:'FM Fanatic',            desc:'Touch every FM subtopic',            icon:'i-check-list', check: s => subjectAllStudied('fm', s) },
  { id:'phys_all',      name:'Physics Phenom',        desc:'Touch every Physics subtopic',       icon:'i-check-list', check: s => subjectAllStudied('phys', s) },
  { id:'all_studied',   name:'Full Sweep',            desc:'Study every subtopic at least once', icon:'i-check-list', check: s => ['maths','fm','phys'].every(k => subjectAllStudied(k, s)) },
  { id:'pomo_1',        name:'In the Zone',           desc:'Complete your first Pomodoro',       icon:'i-timer',      check: s => (s.pomoTotal || 0) >= 1 },
  { id:'pomo_25',       name:'Focus Master',          desc:'Complete 25 Pomodoros',              icon:'i-timer',      check: s => (s.pomoTotal || 0) >= 25 },
  { id:'pomo_100',      name:'Deep Work Pro',         desc:'Complete 100 Pomodoros',             icon:'i-timer',      check: s => (s.pomoTotal || 0) >= 100 },
  { id:'level_5',       name:'Halfway Hero',          desc:'Reach Level 5',                      icon:'i-target',     check: s => (s.xp||0) >= LEVELS[4].min },
  { id:'level_8',       name:'A* Machine',            desc:'Reach the highest rank',             icon:'i-target',     check: s => (s.xp||0) >= LEVELS[LEVELS.length-1].min },
  { id:'marathon_day',  name:'Marathon Day',          desc:'Log 8+ hours of study in a day',     icon:'i-flame',      check: s => Object.values(s.dayMinutes||{}).some(m => m >= 480) },
  { id:'freeze_earned', name:'Cool Under Fire',       desc:'Earn your first streak freeze',      icon:'i-flame',      check: s => (s.freezesEarned||0) >= 1 },
  { id:'goal_week_1',   name:'Goal Getter',           desc:'Complete all goals in one week',     icon:'i-target',     check: s => (s.goalWeeksHit||0) >= 1 },
  { id:'goal_week_4',   name:'Disciplined',           desc:'Hit your weekly goals 4 weeks running',icon:'i-target',  check: s => (s.goalWeeksHit||0) >= 4 },
];

function subjectAllStudied(key, s){
  const subs = SUBTOPICS[key] || [];
  if (!subs.length) return false;
  return subs.every((arr, ti) => arr.every((_, si) => (s.topics||{})[`${key}_${ti}_${si}`]?.d));
}

function checkAchievements(){
  if (!state.achievements) state.achievements = [];
  const newlyEarned = [];
  ACHIEVEMENTS.forEach(a => {
    if (state.achievements.includes(a.id)) return;
    try {
      if (a.check(state)) {
        state.achievements.push(a.id);
        newlyEarned.push(a);
      }
    } catch (e) { /* check function may fail before app fully boots */ }
  });
  if (newlyEarned.length) {
    confetti();
    newlyEarned.forEach((a, i) => setTimeout(() => toast(`🏆 ${a.name}`), i * 1400));
    renderAchievements();
  }
}

/* =========================================================================
   STATE
   ========================================================================= */
let state = defaultState();
let uid = null;
let unsubscribe = null;
let saveTimer = null;
let suppressSync = false;

function defaultState(){
  return {
    v: 3,
    // ===== Identity & linking =====
    username: '',                // unique handle entered at signup
    role: 'student',             // 'student' | 'tutor'
    inviteCode: '',              // 6-char code others use to link to me
    linkedTutorUid: null,        // student: my tutor's UID
    students: [],                // tutor: UIDs of linked students
    // ===== Tutor-side checklist (shown to linked students) =====
    tutorChecklist: [],          // [{id, text, done}]
    // ===== Tutor-controlled fields living on the STUDENT's doc =====
    tutorTasks: [],              // [{id, text, due, done, addedBy, addedAt}]
    tutorNotes: {},              // {subtopicId: 'note text'}
    tutorImportant: {},          // {subtopicId: true}
    tutorPaperComments: {},      // {paperId: 'comment'}
    sessionLog: [],              // [{id, date, topicsCovered, homework, nextSession}]
    homework: [],                // [{id, text, due, done, assignedBy}]
    mission: '',                 // current agreed mission text
    pendingMission: null,        // {by, when, text, note}
    // ===== Student data (unchanged) =====
    grades: {},
    topics: {},
    xp: 0,
    dayMinutes: {},
    logs: [],
    papers: [],
    pomo: {work:25, short:5, long:15, before:4},
    pomoToday: {date:'', completed:0, minutes:0},
    pomoTotal: 0,
    freezes: 0,
    freezesEarned: 0,
    shieldedDays: [],
    achievements: [],
    goals: {},
    goalWeeksHit: 0,
    planHours: { Maths: 8, 'Further Maths': 6, Physics: 6, 'ESAT / TMUA': 2, 'Personal Statement': 1 },
    esatBank: [],
    notifEnabled: false,
    notifTime: '20:00',
    theme: 'dark',
    updatedAt: 0,
  };
}

/* =========================================================================
   PRACTICE — Mock presets + Formula reference (static data)
   ========================================================================= */
const MOCK_PRESETS = [
  { subj:'Maths',         name:'Paper 1',  mins:120 },
  { subj:'Maths',         name:'Paper 2',  mins:120 },
  { subj:'Maths',         name:'Paper 3',  mins:120 },
  { subj:'Further Maths', name:'Paper 1',  mins:120 },
  { subj:'Further Maths', name:'Paper 2',  mins:120 },
  { subj:'Physics',       name:'Paper 1',  mins:135 },
  { subj:'Physics',       name:'Paper 2',  mins:135 },
  { subj:'Physics',       name:'Paper 3',  mins:90  },
  { subj:'ESAT',          name:'Maths 1',  mins:40  },
  { subj:'ESAT',          name:'Maths 2',  mins:40  },
  { subj:'ESAT',          name:'Physics',  mins:40  },
];

const FORMULAS = {
  'Pure Maths': [
    { group:'Trigonometry', items:[
      'sin²θ + cos²θ = 1',
      '1 + tan²θ = sec²θ',
      '1 + cot²θ = cosec²θ',
      'sin(A±B) = sinA cosB ± cosA sinB',
      'cos(A±B) = cosA cosB ∓ sinA sinB',
      'tan(A±B) = (tanA ± tanB) / (1 ∓ tanA tanB)',
      'sin2A = 2 sinA cosA',
      'cos2A = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1',
      'R sin(x+α): R = √(a²+b²), tanα = b/a',
    ]},
    { group:'Calculus', items:[
      'd/dx (eˣ) = eˣ; d/dx (ln x) = 1/x',
      'd/dx (sin x) = cos x; d/dx (cos x) = −sin x',
      'd/dx (tan x) = sec²x; d/dx (sec x) = sec x tan x',
      '∫ uv′ dx = uv − ∫ u′v dx     (integration by parts)',
      'Reverse chain: ∫ f′(g(x))·g′(x) dx = f(g(x)) + C',
      'Volume around x-axis: V = π ∫ y² dx',
    ]},
    { group:'Series & Expansion', items:[
      'Arithmetic: Sₙ = n/2 (2a + (n−1)d)',
      'Geometric: Sₙ = a(1−rⁿ)/(1−r);  S∞ = a/(1−r), |r|<1',
      '(1+x)ⁿ = 1 + nx + n(n−1)/2! x² + …  (|x|<1 for non-integer n)',
    ]},
  ],
  'Further Maths': [
    { group:'Complex Numbers', items:[
      'z = r(cosθ + i sinθ) = re^(iθ)',
      'de Moivre: [r(cosθ + i sinθ)]ⁿ = rⁿ (cos nθ + i sin nθ)',
      'nth roots of unity: e^(2πik/n) for k = 0…n−1',
    ]},
    { group:'Hyperbolics', items:[
      'sinh x = (eˣ − e⁻ˣ)/2;  cosh x = (eˣ + e⁻ˣ)/2',
      'cosh²x − sinh²x = 1',
      'd/dx (sinh x) = cosh x;  d/dx (cosh x) = sinh x',
      'arsinh x = ln(x + √(x²+1))',
    ]},
    { group:'Matrices', items:[
      'det(AB) = det(A) det(B)',
      'A is invertible ⇔ det(A) ≠ 0',
      'Eigenvalues: solve det(A − λI) = 0',
      'For 2D rotation by θ: [cosθ −sinθ; sinθ cosθ]',
    ]},
    { group:'Polar & Maclaurin', items:[
      'Area in polar: A = ½ ∫ r² dθ',
      'eˣ = 1 + x + x²/2! + x³/3! + …',
      'sin x = x − x³/3! + x⁵/5! − …',
      'cos x = 1 − x²/2! + x⁴/4! − …',
      'ln(1+x) = x − x²/2 + x³/3 − …,  |x|<1',
    ]},
  ],
  'Physics': [
    { group:'Mechanics & SHM', items:[
      'a = −ω²x;  T = 2π/ω;  x = A cos(ωt+φ)',
      'Pendulum: T = 2π √(l/g);  Spring: T = 2π √(m/k)',
      'Energy in SHM: E = ½ m ω² A²',
    ]},
    { group:'Fields', items:[
      'Newton: F = GMm/r²;  g = GM/r²;  V = −GM/r',
      'Coulomb: F = Qq/(4πε₀r²);  E = Q/(4πε₀r²);  V = Q/(4πε₀r)',
      'Magnetic force: F = BIL;  F = BQv',
    ]},
    { group:'Electric Circuits', items:[
      'Capacitor: Q = CV;  E = ½CV² = ½QV',
      'Discharge: V = V₀ e^(−t/RC);  τ = RC',
      'Faraday: ε = −N dΦ/dt;  Φ = BA',
      'Transformer: Vₚ/Vₛ = Nₚ/Nₛ',
    ]},
    { group:'Thermal & Quantum', items:[
      'pV = nRT;  ½mc̄² = (3/2)kT',
      'Q = mcΔT;  L = ml (latent heat)',
      'E = hf;  λ = h/p   (de Broglie)',
      'Photoelectric: hf = φ + ½mvₘₐₓ²',
    ]},
    { group:'Nuclear & Astro', items:[
      'R = r₀ A^(1/3)',
      'N = N₀ e^(−λt);  T½ = ln2 / λ',
      'Doppler: z = Δλ/λ ≈ v/c',
      'Hubble: v = H₀ d',
    ]},
  ],
};

/* =========================================================================
   PRACTICE — Setup + render
   ========================================================================= */
function setupPractice(){
  // tabs
  document.querySelectorAll('.practice-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const ptab = btn.dataset.ptab;
      document.querySelectorAll('.practice-tab').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.practice-panel').forEach(p => p.classList.toggle('active', p.dataset.ppanel === ptab));
    });
  });

  // mock presets
  const presetsEl = document.getElementById('mock-presets');
  presetsEl.innerHTML = MOCK_PRESETS.map(p => `
    <div class="mock-preset" data-mock-subj="${escapeAttr(p.subj)}" data-mock-name="${escapeAttr(p.name)}" data-mock-mins="${p.mins}">
      <div class="mock-preset-subj">${escapeHtml(p.subj)}</div>
      <div class="mock-preset-name">${escapeHtml(p.name)}</div>
      <div class="mock-preset-dur">${p.mins} min</div>
    </div>
  `).join('');
  presetsEl.querySelectorAll('.mock-preset').forEach(card => {
    card.addEventListener('click', () => startMock(card.dataset.mockSubj, card.dataset.mockName, parseInt(card.dataset.mockMins)));
  });

  document.getElementById('mock-custom-start').addEventListener('click', () => {
    const subj = document.getElementById('mock-custom-subj').value;
    const name = document.getElementById('mock-custom-name').value.trim() || 'Custom paper';
    const mins = parseInt(document.getElementById('mock-custom-mins').value) || 60;
    startMock(subj, name, mins);
  });

  // mock overlay controls
  document.getElementById('mock-pause').addEventListener('click', mockPause);
  document.getElementById('mock-finish').addEventListener('click', mockFinish);
  document.getElementById('mock-cancel').addEventListener('click', mockCancel);
  document.getElementById('mock-save-log').addEventListener('click', mockSaveLog);
  document.getElementById('mock-skip-log').addEventListener('click', mockCloseOverlay);

  // ESAT
  renderEsatNewOpts();
  document.getElementById('esat-add-btn').addEventListener('click', esatAddQuestion);
  document.getElementById('esat-start-drill').addEventListener('click', esatStartDrill);
  document.getElementById('esat-skip').addEventListener('click', () => esatNextQuestion(null));
  document.getElementById('esat-end').addEventListener('click', esatEndDrill);

  renderFormulas();
  renderEsatBank();
}

/* =========================================================================
   MOCK TIMER
   ========================================================================= */
const MockState = { running:false, paused:false, ticker:null, ends:0, paperLabel:'', subj:'', totalSec:0, remaining:0 };

function startMock(subj, name, mins){
  MockState.subj = subj;
  MockState.paperLabel = name;
  MockState.totalSec = mins * 60;
  MockState.remaining = MockState.totalSec;
  MockState.ends = Date.now() + MockState.totalSec * 1000;
  MockState.running = true;
  MockState.paused = false;
  document.getElementById('mock-subj').textContent = `${subj} · ${name}`;
  document.getElementById('mock-finish-form').classList.remove('open');
  document.getElementById('mock-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('mock-pause').textContent = 'Pause';
  updateMockDisplay();
  MockState.ticker = setInterval(mockTick, 250);
}
function mockTick(){
  if (MockState.paused) return;
  MockState.remaining = Math.max(0, Math.round((MockState.ends - Date.now()) / 1000));
  updateMockDisplay();
  if (MockState.remaining <= 0) {
    clearInterval(MockState.ticker);
    MockState.running = false;
    toast("Time's up — log your result");
    mockShowFinishForm();
    beep();
  }
}
function updateMockDisplay(){
  const m = Math.floor(MockState.remaining / 60);
  const s = MockState.remaining % 60;
  const h = Math.floor(m / 60);
  const text = (h ? String(h).padStart(2,'0') + ':' : '') + String(m % 60).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  const clock = document.getElementById('mock-clock');
  clock.textContent = text;
  clock.className = 'mock-clock';
  if (MockState.remaining < 60) clock.classList.add('bad');
  else if (MockState.remaining < 300) clock.classList.add('warn');
  const pct = (MockState.remaining / MockState.totalSec) * 100;
  document.getElementById('mock-prog-bar').style.width = pct + '%';
  const elapsed = MockState.totalSec - MockState.remaining;
  const eMin = Math.floor(elapsed / 60);
  document.getElementById('mock-elapsed').textContent = `${eMin} min elapsed of ${Math.round(MockState.totalSec/60)}`;
}
function mockPause(){
  if (!MockState.running) return;
  MockState.paused = !MockState.paused;
  if (MockState.paused) {
    MockState.remaining = Math.round((MockState.ends - Date.now()) / 1000);
    document.getElementById('mock-pause').textContent = 'Resume';
  } else {
    MockState.ends = Date.now() + MockState.remaining * 1000;
    document.getElementById('mock-pause').textContent = 'Pause';
  }
}
function mockFinish(){ mockShowFinishForm(); }
function mockShowFinishForm(){
  clearInterval(MockState.ticker);
  MockState.running = false;
  document.getElementById('mock-finish-form').classList.add('open');
}
function mockSaveLog(){
  const score = parseFloat(document.getElementById('mock-result-score').value);
  const max = parseFloat(document.getElementById('mock-result-max').value);
  if (isNaN(score) || isNaN(max) || max <= 0) { toast('Enter valid score and max'); return; }
  const subj = MockState.subj === 'Maths' || MockState.subj === 'Further Maths' || MockState.subj === 'Physics' ? MockState.subj : 'Maths';
  const pct = Math.round((score / max) * 100);
  const grade = scoreToGrade(subj, pct);
  const entry = { id: Date.now(), date: todayKey(), subject: subj, paperRef: `Mock: ${MockState.paperLabel}`, score, maxScore: max, pct, grade, notes:'', questions:[] };
  state.papers = state.papers || [];
  state.papers.unshift(entry);
  const minutesUsed = Math.round((MockState.totalSec - MockState.remaining) / 60);
  markToday(minutesUsed);
  addXP(Math.round(pct / 5), 'mock exam');
  toast(`Logged · ${pct}% · ${grade}`);
  renderPapers(); renderDashboard(); save();
  document.getElementById('mock-result-score').value = '';
  document.getElementById('mock-result-max').value = '';
  mockCloseOverlay();
}
function mockCancel(){
  if (MockState.running && !confirm('Cancel this mock? Time will not be logged.')) return;
  mockCloseOverlay();
}
function mockCloseOverlay(){
  clearInterval(MockState.ticker);
  MockState.running = false;
  document.getElementById('mock-overlay').classList.remove('open');
  document.getElementById('mock-finish-form').classList.remove('open');
  document.body.style.overflow = '';
}

/* =========================================================================
   ESAT DRILL
   ========================================================================= */
const EsatDrill = { active:false, order:[], idx:0, correct:0, attempts:0 };

function renderEsatNewOpts(){
  const wrap = document.getElementById('esat-new-opts');
  if (!wrap) return;
  const letters = ['A','B','C','D','E'];
  wrap.innerHTML = letters.map((L, i) => `
    <div class="esat-opt-row">
      <div class="esat-opt-letter">${L}</div>
      <input type="text" id="esat-new-opt-${i}" placeholder="Option ${L}${i >= 3 ? ' (optional)' : ''}">
      <input type="radio" name="esat-correct" value="${i}" class="esat-opt-radio" ${i === 0 ? 'checked' : ''}>
    </div>
  `).join('');
}

function esatAddQuestion(){
  const q = document.getElementById('esat-new-q').value.trim();
  const opts = [0,1,2,3,4].map(i => document.getElementById(`esat-new-opt-${i}`).value.trim()).filter(o => o);
  const correctRadio = document.querySelector('input[name="esat-correct"]:checked');
  const correct = correctRadio ? parseInt(correctRadio.value) : 0;
  const subj = document.getElementById('esat-new-subj').value;
  if (!q || opts.length < 2) { toast('Need a question and at least two options'); return; }
  if (correct >= opts.length) { toast('Selected correct option is empty'); return; }
  state.esatBank = state.esatBank || [];
  state.esatBank.push({ id: Date.now(), question: q, options: opts, correct, subj });
  document.getElementById('esat-new-q').value = '';
  [0,1,2,3,4].forEach(i => { const el = document.getElementById(`esat-new-opt-${i}`); if (el) el.value = ''; });
  renderEsatBank(); save();
  toast('Question added');
}

function renderEsatBank(){
  const wrap = document.getElementById('esat-bank-list');
  if (!wrap) return;
  const bank = state.esatBank || [];
  if (!bank.length) {
    wrap.innerHTML = '<div class="empty-msg">No questions yet — add one below to start building your drill bank.</div>';
    return;
  }
  wrap.innerHTML = bank.map(q => `
    <div class="esat-bank-card">
      <div class="esat-bank-q">${escapeHtml(q.question)} <span style="color:var(--text-4);font-size:var(--fs-11)">· ${escapeHtml(q.subj)} · ${q.options.length} opts</span></div>
      <button class="le-del" data-edel="${q.id}" aria-label="Delete">✕</button>
    </div>
  `).join('');
  wrap.querySelectorAll('[data-edel]').forEach(b => b.addEventListener('click', () => {
    state.esatBank = state.esatBank.filter(q => q.id !== parseInt(b.dataset.edel));
    renderEsatBank(); save();
  }));
}

function esatStartDrill(){
  const bank = state.esatBank || [];
  if (!bank.length) { toast('Add some questions first'); return; }
  EsatDrill.active = true;
  EsatDrill.order = bank.map(q => q.id).sort(() => Math.random() - 0.5);
  EsatDrill.idx = 0;
  EsatDrill.correct = 0;
  EsatDrill.attempts = 0;
  document.getElementById('esat-bank-view').style.display = 'none';
  document.getElementById('esat-drill-view').style.display = 'block';
  esatShowCurrent();
}

function esatShowCurrent(){
  const q = (state.esatBank || []).find(x => x.id === EsatDrill.order[EsatDrill.idx]);
  if (!q) { esatEndDrill(); return; }
  document.getElementById('esat-q').textContent = `Q${EsatDrill.idx + 1} · ${q.question}`;
  const opts = document.getElementById('esat-opts');
  const letters = ['A','B','C','D','E'];
  opts.innerHTML = q.options.map((o, i) => `<button class="esat-drill-opt" data-i="${i}"><strong style="margin-right:8px;color:var(--text-4)">${letters[i]}</strong>${escapeHtml(o)}</button>`).join('');
  opts.querySelectorAll('.esat-drill-opt').forEach(btn => btn.addEventListener('click', () => esatAnswer(parseInt(btn.dataset.i), q)));
}

function esatAnswer(i, q){
  EsatDrill.attempts++;
  const right = i === q.correct;
  if (right) EsatDrill.correct++;
  document.querySelectorAll('.esat-drill-opt').forEach((b, k) => {
    b.classList.toggle('right', k === q.correct);
    if (k === i && !right) b.classList.add('wrong');
    b.style.pointerEvents = 'none';
  });
  updateEsatScore();
  setTimeout(() => esatNextQuestion(right), 900);
}

function esatNextQuestion(){
  if (EsatDrill.idx + 1 >= EsatDrill.order.length) { esatEndDrill(); return; }
  EsatDrill.idx++;
  esatShowCurrent();
}

function updateEsatScore(){
  document.getElementById('esat-correct').textContent = EsatDrill.correct;
  document.getElementById('esat-attempts').textContent = EsatDrill.attempts;
  document.getElementById('esat-acc').textContent = EsatDrill.attempts ? Math.round(EsatDrill.correct/EsatDrill.attempts*100) + '%' : '—';
}

function esatEndDrill(){
  if (EsatDrill.active && EsatDrill.attempts > 0) {
    const acc = Math.round(EsatDrill.correct/EsatDrill.attempts*100);
    addXP(Math.max(5, Math.round(acc/5)), 'ESAT drill');
    markToday(Math.min(30, EsatDrill.attempts));
    toast(`Drill done · ${EsatDrill.correct}/${EsatDrill.attempts} (${acc}%)`);
  }
  EsatDrill.active = false;
  document.getElementById('esat-bank-view').style.display = 'block';
  document.getElementById('esat-drill-view').style.display = 'none';
  save();
}

/* =========================================================================
   FORMULAS
   ========================================================================= */
function renderFormulas(){
  const wrap = document.getElementById('formula-cards');
  if (!wrap) return;
  wrap.innerHTML = Object.entries(FORMULAS).map(([subj, groups]) => `
    <div class="formula-card">
      <div class="formula-head">
        <span class="formula-caret">▶</span>
        <span class="formula-subj">${escapeHtml(subj)}</span>
      </div>
      <div class="formula-body"><div class="formula-list">
        ${groups.map(g => `
          <div class="formula-group">
            <div class="formula-group-name">${escapeHtml(g.group)}</div>
            ${g.items.map(item => `<div class="formula-item">${escapeHtml(item)}</div>`).join('')}
          </div>
        `).join('')}
      </div></div>
    </div>
  `).join('');
  wrap.querySelectorAll('.formula-head').forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('open')));
}

/* =========================================================================
   COMMAND PALETTE (Cmd-K)
   ========================================================================= */
let cmdkItems = [];
let cmdkActiveIdx = 0;

function setupCommandPalette(){
  document.getElementById('cmdk-open').addEventListener('click', openCmdK);
  document.getElementById('cmdk-close').addEventListener('click', closeCmdK);
  document.getElementById('cmdk-backdrop').addEventListener('click', e => {
    if (e.target === document.getElementById('cmdk-backdrop')) closeCmdK();
  });
  const input = document.getElementById('cmdk-input');
  input.addEventListener('input', renderCmdK);
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdkMove(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cmdkMove(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); cmdkPick(); }
  });
}

function openCmdK(){
  document.getElementById('cmdk-backdrop').classList.add('open');
  const input = document.getElementById('cmdk-input');
  input.value = '';
  renderCmdK();
  setTimeout(() => input.focus(), 50);
}

function closeCmdK(){
  document.getElementById('cmdk-backdrop').classList.remove('open');
}

function buildCmdKCorpus(){
  const items = [];
  const sections = [
    {sec:'dashboard', label:'Dashboard', icon:'i-dashboard'},
    {sec:'grades', label:'Grades', icon:'i-target'},
    {sec:'revision', label:'Revision', icon:'i-check-list'},
    {sec:'journal', label:'Study Log', icon:'i-book'},
    {sec:'papers', label:'Past Papers', icon:'i-doc'},
    {sec:'practice', label:'Practice', icon:'i-timer'},
    {sec:'analytics', label:'Analytics', icon:'i-arrow-up'},
    {sec:'achievements', label:'Achievements', icon:'i-target'},
    {sec:'settings', label:'Settings', icon:'i-gear'},
  ];
  sections.forEach(s => items.push({ group:'Section', label:s.label, icon:s.icon, action:() => switchSec(s.sec) }));

  const actions = [
    {label:'Start Pomodoro', icon:'i-play', action:() => { switchSec('dashboard'); pomoStartPause(); document.getElementById('pomo-panel').classList.add('open'); }},
    {label:'Save today\'s study log', icon:'i-save', action:() => switchSec('journal')},
    {label:'Log a past paper', icon:'i-save', action:() => switchSec('papers')},
    {label:'Toggle theme', icon:'i-sun', action:() => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); save(); }},
    {label:'Export data', icon:'i-download', action:exportData},
  ];
  actions.forEach(a => items.push({ group:'Action', label:a.label, icon:a.icon, action:a.action }));

  Object.keys(TOPICS).forEach(subj => {
    TOPICS[subj].forEach((topic, ti) => {
      items.push({
        group:`${SN[subj]} · Topic`,
        label: topic,
        icon: 'i-check-list',
        action: () => {
          switchSec('revision');
          setTimeout(() => {
            const card = document.querySelector(`.topic-card[data-tid="${subj}_${ti}"]`);
            if (card) { card.classList.add('open'); card.scrollIntoView({behavior:'smooth', block:'center'}); }
          }, 150);
        }
      });
    });
  });
  return items;
}

function renderCmdK(){
  const q = document.getElementById('cmdk-input').value.trim().toLowerCase();
  const corpus = buildCmdKCorpus();
  cmdkItems = q
    ? corpus.filter(item => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q))
    : corpus.slice(0, 25);
  cmdkActiveIdx = 0;
  const list = document.getElementById('cmdk-list');
  if (!cmdkItems.length) {
    list.innerHTML = '<div class="cmdk-empty">No matches</div>';
    document.getElementById('cmdk-count').textContent = '';
    return;
  }
  let currentGroup = '';
  let html = '';
  cmdkItems.forEach((item, i) => {
    if (item.group !== currentGroup) {
      currentGroup = item.group;
      html += `<div class="cmdk-group">${escapeHtml(currentGroup)}</div>`;
    }
    html += `<div class="cmdk-item ${i === 0 ? 'cmdk-active' : ''}" data-cmdk-idx="${i}">
      <svg class="ico ico-sm"><use href="#${item.icon}"/></svg>
      <span>${escapeHtml(item.label)}</span>
      <span class="cmdk-item-meta">${escapeHtml(item.group)}</span>
    </div>`;
  });
  list.innerHTML = html;
  list.querySelectorAll('[data-cmdk-idx]').forEach(el => {
    el.addEventListener('mouseenter', () => { cmdkActiveIdx = parseInt(el.dataset.cmdkIdx); cmdkRefreshActive(); });
    el.addEventListener('click', () => { cmdkActiveIdx = parseInt(el.dataset.cmdkIdx); cmdkPick(); });
  });
  document.getElementById('cmdk-count').textContent = `${cmdkItems.length} result${cmdkItems.length !== 1 ? 's' : ''}`;
}

function cmdkMove(delta){
  cmdkActiveIdx = (cmdkActiveIdx + delta + cmdkItems.length) % cmdkItems.length;
  cmdkRefreshActive();
}

function cmdkRefreshActive(){
  document.querySelectorAll('.cmdk-item').forEach((el, i) => el.classList.toggle('cmdk-active', i === cmdkActiveIdx));
  const active = document.querySelector('.cmdk-item.cmdk-active');
  if (active) active.scrollIntoView({ block:'nearest' });
}

function cmdkPick(){
  const item = cmdkItems[cmdkActiveIdx];
  if (!item) return;
  closeCmdK();
  try { item.action(); } catch(e) { console.error(e); }
}

/* =========================================================================
   NOTIFICATIONS
   ========================================================================= */
let notifTimer = null;

function setupNotifications(){
  const btn = document.getElementById('notif-btn');
  const time = document.getElementById('notif-time');
  if (!btn) return;
  time.value = state.notifTime || '20:00';
  time.addEventListener('change', () => { state.notifTime = time.value; save(); scheduleNotification(); });
  btn.addEventListener('click', toggleNotifications);
  updateNotifButton();
  if (state.notifEnabled && 'Notification' in window && Notification.permission === 'granted') {
    scheduleNotification();
  }
}

function updateNotifButton(){
  const btn = document.getElementById('notif-btn');
  const enabled = !!state.notifEnabled && (typeof Notification !== 'undefined' && Notification.permission === 'granted');
  btn.textContent = enabled ? 'Disable' : 'Enable';
  btn.style.borderColor = enabled ? 'var(--accent)' : '';
  btn.style.color = enabled ? 'var(--accent)' : '';
}

async function toggleNotifications(){
  if (!('Notification' in window)) { toast('Notifications not supported in this browser'); return; }
  if (state.notifEnabled) {
    state.notifEnabled = false;
    if (notifTimer) { clearTimeout(notifTimer); notifTimer = null; }
    save(); updateNotifButton(); toast('Reminders off');
    return;
  }
  const perm = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
  if (perm !== 'granted') { toast('Permission denied'); return; }
  state.notifEnabled = true;
  save(); updateNotifButton();
  scheduleNotification();
  toast('Reminders on');
}

function scheduleNotification(){
  if (notifTimer) clearTimeout(notifTimer);
  if (!state.notifEnabled) return;
  const [h, m] = (state.notifTime || '20:00').split(':').map(Number);
  const now = new Date();
  const target = new Date(); target.setHours(h, m, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const delay = target - now;
  notifTimer = setTimeout(fireNotification, delay);
}

function fireNotification(){
  const today = todayKey();
  const studiedToday = (state.dayMinutes || {})[today] > 0;
  if (!studiedToday && 'Notification' in window && Notification.permission === 'granted') {
    new Notification('Adi.Study reminder', {
      body: `Don't break your ${calcStreak()}-day streak — log a session.`,
      icon: 'icon-192.png',
      tag: 'adi-daily',
    });
  }
  scheduleNotification(); // schedule tomorrow
}

const CONFIDENCE_STALE = { 1: 3, 2: 5, 3: 10, 4: 14, 5: 21 }; // days until stale per confidence level

function loadLocal(){
  try {
    const s = localStorage.getItem('adi_state');
    if (s) state = Object.assign(defaultState(), JSON.parse(s));
  } catch(e) {}
}

function saveLocal(){
  state.updatedAt = Date.now();
  try { localStorage.setItem('adi_state', JSON.stringify(state)); } catch(e) {}
}

// Fields the TUTOR is allowed to write on a STUDENT's doc.
// When a student saves, we exclude these so we don't overwrite tutor changes.
const TUTOR_WRITTEN_FIELDS = [
  'tutorTasks','tutorNotes','tutorImportant','tutorPaperComments',
  'sessionLog','homework','mission','pendingMission'
];

function save(){
  checkAchievements();
  saveLocal();
  if (saveTimer) clearTimeout(saveTimer);
  setSync('syncing');
  saveTimer = setTimeout(() => {
    if (uid && !suppressSync && window.db) {
      const payload = { ...state };
      if (state.role === 'student') {
        TUTOR_WRITTEN_FIELDS.forEach(f => delete payload[f]);
      }
      window.db.collection('users').doc(uid).set(payload, {merge:true})
        .then(() => setSync('ok'))
        .catch(err => { console.warn('Sync failed:', err); setSync('offline'); });
    } else {
      setSync(uid ? 'offline' : 'ok');
    }
  }, 500);
}

function setSync(s){
  const dot = document.getElementById('sync-dot');
  if (!dot) return;
  dot.className = 'sync-dot' + (s==='syncing'?' syncing':s==='offline'?' offline':'');
  dot.parentElement.title = s==='ok'?'Synced':s==='syncing'?'Syncing…':'Offline — local only';
}

/* =========================================================================
   AUTH
   ========================================================================= */
function initAuth(){
  if (!window.firebase || !window.FIREBASE_CONFIG) {
    showGateError('Firebase not configured. Add firebase-config.js values.');
    return;
  }
  try {
    firebase.initializeApp(window.FIREBASE_CONFIG);
    window.db = firebase.firestore();
    // Single-tab persistence only. Multi-tab sync is unstable when
    // content blockers interrupt the Firestore handshake — it
    // corrupts IndexedDB and throws "Unexpected state" assertions.
    window.db.enablePersistence().catch(err => {
      console.warn('Firestore offline persistence unavailable:', err.code);
    });
  } catch(e) { console.error(e); }

  // Suppress Firestore internal-assertion crashes so the rest of the
  // app stays usable; user gets a clear offline indicator instead.
  window.addEventListener('error', e => {
    const msg = String(e.message || '');
    if (msg.includes('FIRESTORE') && msg.includes('INTERNAL ASSERTION')) {
      e.preventDefault();
      setSync('offline');
      console.warn('Firestore assertion suppressed — running in offline mode');
      return false;
    }
  });
  window.addEventListener('unhandledrejection', e => {
    const reason = String(e.reason && (e.reason.message || e.reason));
    if (reason.includes('FIRESTORE') && reason.includes('INTERNAL ASSERTION')) {
      e.preventDefault();
      setSync('offline');
    }
  });

  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      uid = user.uid;
      // Load (or create) the user's profile to know their role
      try {
        const docRef = window.db.collection('users').doc(uid);
        const snap = await docRef.get();
        if (snap.exists) {
          state = Object.assign(defaultState(), snap.data());
          window.currentRole = state.role || 'student';
        } else {
          // Profile doesn't exist (corrupt signup state) — sign out
          await firebase.auth().signOut();
          return;
        }
      } catch (e) {
        console.warn('Profile load failed:', e);
        window.currentRole = 'student';
      }
      const labelEl = document.getElementById('user-email-label');
      if (labelEl) labelEl.textContent = state.username || user.email || '';
      document.getElementById('gate').style.display = 'none';
      document.getElementById('app').classList.add('ready');
      document.body.dataset.role = window.currentRole;
      attachCloud();
      bootApp();
    } else {
      uid = null;
      window.currentRole = null;
      delete document.body.dataset.role;
      if (unsubscribe) { unsubscribe(); unsubscribe = null; }
      document.getElementById('gate').style.display = 'flex';
      document.getElementById('app').classList.remove('ready');
    }
  });

  // Gate mode + role state
  let gateMode = 'signin';
  let gateRole = 'student';
  document.querySelectorAll('[data-gmode]').forEach(btn => btn.addEventListener('click', () => {
    gateMode = btn.dataset.gmode;
    document.querySelectorAll('[data-gmode]').forEach(b => b.classList.toggle('active', b === btn));
    document.getElementById('g-signup-extra').style.display = gateMode === 'signup' ? 'block' : 'none';
    document.getElementById('g-btn').textContent = gateMode === 'signup' ? 'Create Account' : 'Sign In';
    document.getElementById('g-err').textContent = '';
  }));
  document.querySelectorAll('[data-role]').forEach(btn => btn.addEventListener('click', () => {
    gateRole = btn.dataset.role;
    document.querySelectorAll('[data-role]').forEach(b => b.classList.toggle('active', b === btn));
  }));
  document.getElementById('g-btn').addEventListener('click', () => gateMode === 'signin' ? signIn() : signUp(gateRole));
  document.getElementById('g-pass').addEventListener('keydown', e => {
    if (e.key === 'Enter') gateMode === 'signin' ? signIn() : signUp(gateRole);
  });
  document.getElementById('signout-btn').addEventListener('click', () => firebase.auth().signOut());
}

/* Convert username <-> fake email (kept entirely server-side) */
const USERNAME_DOMAIN = 'adi-study.local';
function usernameToEmail(u){ return `${u}@${USERNAME_DOMAIN}`; }
function cleanUsername(raw){
  return String(raw || '').toLowerCase().trim().replace(/[^a-z0-9_.-]/g, '');
}

function signIn(){
  const u = cleanUsername(document.getElementById('g-user').value);
  const pass = document.getElementById('g-pass').value;
  if (!u || !pass) return showGateError('Username and password required.');
  const btn = document.getElementById('g-btn');
  btn.disabled = true; btn.textContent = 'Signing in…';
  firebase.auth().signInWithEmailAndPassword(usernameToEmail(u), pass)
    .catch(err => showGateError(prettyAuthError(err)))
    .finally(() => { btn.disabled = false; btn.textContent = 'Sign In'; });
}

async function signUp(role){
  const u = cleanUsername(document.getElementById('g-user').value);
  const pass = document.getElementById('g-pass').value;
  if (!u || u.length < 3) return showGateError('Username must be 3+ characters (letters, numbers, _ . - only).');
  if (pass.length < 6) return showGateError('Password must be at least 6 characters.');
  if (!role) return showGateError('Pick student or tutor.');
  const btn = document.getElementById('g-btn');
  btn.disabled = true; btn.textContent = 'Creating…';

  try {
    // Check username availability
    const unameRef = window.db.collection('usernames').doc(u);
    const unameSnap = await unameRef.get();
    if (unameSnap.exists) {
      showGateError('That username is taken.');
      btn.disabled = false; btn.textContent = 'Create Account';
      return;
    }
    // Create the auth user
    const cred = await firebase.auth().createUserWithEmailAndPassword(usernameToEmail(u), pass);
    const newUid = cred.user.uid;
    // Create profile + claim username
    const inviteCode = generateInviteCode();
    const profile = Object.assign(defaultState(), {
      username: u,
      role,
      inviteCode,
      students: role === 'tutor' ? [] : undefined,
      linkedTutorUid: role === 'student' ? null : undefined,
      updatedAt: Date.now(),
    });
    await window.db.collection('users').doc(newUid).set(profile);
    await unameRef.set({ uid: newUid });
    await window.db.collection('inviteCodes').doc(inviteCode).set({ uid: newUid, role, username: u });
  } catch (err) {
    console.error(err);
    showGateError(prettyAuthError(err));
  } finally {
    btn.disabled = false;
    btn.textContent = gateMode === 'signup' ? 'Create Account' : 'Sign In';
  }
}

function generateInviteCode(){
  // 6 chars: easy to read aloud, no ambiguous characters (no 0, O, 1, I, L)
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

function showGateError(msg){ document.getElementById('g-err').textContent = msg; }

function prettyAuthError(err){
  const code = err.code || '';
  if (code.includes('user-not-found')) return 'No account with that username. Switch to Create Account.';
  if (code.includes('wrong-password') || code.includes('invalid-credential')) return 'Wrong username or password.';
  if (code.includes('email-already-in-use')) return 'That username is taken.';
  if (code.includes('weak-password')) return 'Password must be at least 6 characters.';
  if (code.includes('network')) return 'Network error — check your connection.';
  return err.message || 'Authentication error.';
}

/* =========================================================================
   LINKING — tutor <-> student via invite codes
   ========================================================================= */
async function linkByCode(code){
  if (!uid || !window.db) return { ok:false, error:'Not signed in' };
  const c = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (c.length !== 6) return { ok:false, error:'Code must be 6 characters' };
  if (c === state.inviteCode) return { ok:false, error:"That's your own code" };
  try {
    const snap = await window.db.collection('inviteCodes').doc(c).get();
    if (!snap.exists) return { ok:false, error:'Invite code not found' };
    const target = snap.data();
    const myRole = state.role;
    if (myRole === target.role) return { ok:false, error:`That code is for another ${target.role}` };
    if (myRole === 'student') {
      state.linkedTutorUid = target.uid;
      await window.db.collection('users').doc(uid).update({ linkedTutorUid: target.uid });
      await window.db.collection('users').doc(target.uid).update({
        students: firebase.firestore.FieldValue.arrayUnion(uid)
      });
    } else {
      // tutor linking to a student
      state.students = [...(state.students || []), target.uid];
      await window.db.collection('users').doc(uid).update({
        students: firebase.firestore.FieldValue.arrayUnion(target.uid)
      });
      await window.db.collection('users').doc(target.uid).update({ linkedTutorUid: uid });
    }
    return { ok:true, username: target.username, role: target.role };
  } catch (e) {
    console.error(e);
    return { ok:false, error: e.message || 'Link failed' };
  }
}

async function unlinkPartner(partnerUid){
  if (!uid || !window.db) return;
  try {
    if (state.role === 'student') {
      state.linkedTutorUid = null;
      await window.db.collection('users').doc(uid).update({ linkedTutorUid: null });
      await window.db.collection('users').doc(partnerUid).update({
        students: firebase.firestore.FieldValue.arrayRemove(uid)
      });
    } else {
      state.students = (state.students || []).filter(s => s !== partnerUid);
      await window.db.collection('users').doc(uid).update({
        students: firebase.firestore.FieldValue.arrayRemove(partnerUid)
      });
      await window.db.collection('users').doc(partnerUid).update({ linkedTutorUid: null });
    }
  } catch (e) { console.error(e); }
}

function attachCloud(){
  if (!window.db || !uid) return;
  setSync('syncing');
  unsubscribe = window.db.collection('users').doc(uid).onSnapshot(snap => {
    const remote = snap.data();
    if (!remote) {
      window.db.collection('users').doc(uid).set(state).then(()=>setSync('ok'));
      return;
    }
    if (!state.updatedAt || (remote.updatedAt||0) > state.updatedAt) {
      suppressSync = true;
      state = Object.assign(defaultState(), remote);
      saveLocal();
      renderAll();
      suppressSync = false;
    }
    setSync('ok');
  }, err => { console.warn('Snapshot error:', err); setSync('offline'); });
}

/* =========================================================================
   BOOT
   ========================================================================= */
function bootApp(){
  applyFreezesIfNeeded();
  setupNav();
  setupTheme();
  setupGrades();
  setupRevision();
  setupJournal();
  setupPapers();
  setupAchievements();
  setupGoals();
  setupAnalytics();
  setupPractice();
  setupCommandPalette();
  setupNotifications();
  setupSettings();
  setupPomodoro();
  setupKeyboard();
  renderAll();
  checkAchievements();
}

function renderAll(){
  applyTheme();
  renderHeader();
  renderCountdowns();
  renderGrades();
  renderRevision();
  renderJournal();
  renderPapers();
  renderDashboard();
  renderGoals();
  renderAnalytics();
  renderEsatBank();
  renderAchievements();
  renderPomodoro();
}

/* =========================================================================
   NAV (drawer + bottom tabs + sections)
   ========================================================================= */
function setupNav(){
  document.getElementById('menu-btn').addEventListener('click', () => toggleDrawer(true));
  document.getElementById('drawer-bd').addEventListener('click', () => toggleDrawer(false));
  document.querySelectorAll('.drawer-item').forEach(b => b.addEventListener('click', () => {
    switchSec(b.dataset.sec); toggleDrawer(false);
  }));
  document.querySelectorAll('.bn-btn').forEach(b => b.addEventListener('click', () => switchSec(b.dataset.sec)));

  // edge swipe to open drawer (mobile)
  let touchStartX = null, touchStartY = null, touchStartT = 0;
  window.addEventListener('touchstart', e => {
    const t = e.touches[0];
    touchStartX = t.clientX; touchStartY = t.clientY; touchStartT = Date.now();
  }, {passive:true});
  window.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    const dt = Date.now() - touchStartT;
    const drawerOpen = document.getElementById('drawer').classList.contains('open');
    if (dt < 500 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)*1.5) {
      if (dx > 0 && touchStartX < 30 && !drawerOpen) toggleDrawer(true);
      else if (dx < 0 && drawerOpen) toggleDrawer(false);
    }
    touchStartX = null;
  }, {passive:true});
}

function toggleDrawer(open){
  document.getElementById('drawer').classList.toggle('open', open);
  document.getElementById('drawer-bd').classList.toggle('open', open);
}

function switchSec(id){
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.drawer-item, .bn-btn').forEach(b => b.classList.toggle('active', b.dataset.sec === id));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

function setupKeyboard(){
  document.addEventListener('keydown', e => {
    // Cmd/Ctrl + K opens the command palette from anywhere
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCmdK();
      return;
    }
    if (e.key === 'Escape') {
      toggleDrawer(false);
      closeCmdK();
    }
    if (e.target.matches('input, textarea, select')) return;
    const map = {'1':'dashboard','2':'grades','3':'revision','4':'journal','5':'papers','6':'practice','7':'analytics','8':'settings'};
    if (map[e.key]) switchSec(map[e.key]);
  });
}

/* =========================================================================
   THEME
   ========================================================================= */
function setupTheme(){
  document.getElementById('theme-btn').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(); save();
  });
}
function applyTheme(){
  const t = state.theme || 'dark';
  document.documentElement.setAttribute('data-theme', t);
  const use = document.querySelector('#theme-icon use');
  if (use) use.setAttribute('href', t === 'dark' ? '#i-sun' : '#i-moon');
  const meta = document.getElementById('theme-color-meta');
  if (meta) meta.setAttribute('content', t === 'dark' ? '#0a0a0c' : '#f7f7f9');
}

/* =========================================================================
   HEADER (XP + streak)
   ========================================================================= */
function renderHeader(){
  const xp = state.xp || 0;
  let lv = 0;
  for (let i = LEVELS.length-1; i >= 0; i--) { if (xp >= LEVELS[i].min) { lv = i; break; } }
  const next = LEVELS[lv+1]?.min || LEVELS[lv].min + 1000;
  const prev = LEVELS[lv].min;
  const pct = Math.min(100, Math.round((xp - prev) / (next - prev) * 100));
  animateNumber(document.getElementById('lvl-num'), lv+1);
  document.getElementById('xp-rank').textContent = LEVELS[lv].n;
  document.getElementById('xp-title').textContent = next > xp ? `${next - xp} XP to next rank` : 'Max rank reached';
  document.getElementById('xp-fill').style.width = pct + '%';
  document.getElementById('xp-cur').textContent = xp + ' XP';
  document.getElementById('xp-next').textContent = next + ' XP';
  const streak = calcStreak();
  awardFreezesForStreak(streak);
  animateNumber(document.getElementById('streak-num'), streak);
  const fzEl = document.getElementById('freeze-count');
  const fzBadge = document.getElementById('freeze-badge');
  const freezes = state.freezes || 0;
  if (fzEl) fzEl.textContent = freezes;
  if (fzBadge) fzBadge.style.display = freezes > 0 ? 'inline-flex' : 'none';
}

function addXP(n, reason){
  const before = state.xp || 0;
  state.xp = Math.max(0, before + n);
  const beforeLv = LEVELS.findIndex(L => before >= L.min && (LEVELS[LEVELS.indexOf(L)+1]?.min || Infinity) > before);
  const afterLv = LEVELS.findIndex(L => state.xp >= L.min && (LEVELS[LEVELS.indexOf(L)+1]?.min || Infinity) > state.xp);
  if (afterLv > beforeLv) { confetti(); toast(`Level up! ${LEVELS[afterLv].n}`); }
  else if (reason) toast(`${n > 0 ? '+' : ''}${n} XP · ${reason}`);
  else toast(`${n > 0 ? '+' : ''}${n} XP`);
  renderHeader();
  save();
}

/* =========================================================================
   COUNTDOWNS
   ========================================================================= */
function renderCountdowns(){
  const wrap = document.getElementById('countdowns');
  const now = new Date();
  wrap.innerHTML = KEY_DATES.map(k => {
    const days = Math.max(0, Math.ceil((new Date(k.date) - now) / 86400000));
    const urgent = days <= k.urgent;
    return `<div class="ctd">
      <div class="ctd-key ${urgent?'urgent':''}">${days}<span class="ctd-unit"> ${days===1?'day':'days'}</span></div>
      <div class="ctd-name">${k.name}</div>
    </div>`;
  }).join('');
}

/* =========================================================================
   STREAK / DAYS
   ========================================================================= */
function todayKey(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function dayKey(date){
  return date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
}
function markToday(minutes){
  const k = todayKey();
  state.dayMinutes[k] = (state.dayMinutes[k] || 0) + (minutes || 1);
}
function calcStreakRaw(s){
  s = s || state;
  const studiedSet = new Set(Object.keys(s.dayMinutes||{}).filter(k => s.dayMinutes[k] > 0));
  (s.shieldedDays || []).forEach(k => studiedSet.add(k));
  if (!studiedSet.size) return 0;
  let streak = 0;
  const d = new Date(); d.setHours(0,0,0,0);
  if (!studiedSet.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (studiedSet.has(dayKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function calcStreak(){ return calcStreakRaw(state); }

function applyFreezesIfNeeded(){
  const studied = Object.keys(state.dayMinutes||{}).filter(k => state.dayMinutes[k] > 0).sort();
  const shielded = state.shieldedDays || [];
  const all = [...new Set([...studied, ...shielded])].sort();
  if (!all.length) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const lastKey = all[all.length - 1];
  const lastD = new Date(lastKey + 'T00:00:00');
  const gap = Math.round((today - lastD) / 86400000);
  if (gap < 2) return;
  const missing = gap - 1;
  let available = state.freezes || 0;
  let used = 0;
  const newShielded = [...shielded];
  for (let i = 1; i <= missing && available > 0; i++) {
    const d = new Date(lastD); d.setDate(lastD.getDate() + i);
    const k = dayKey(d);
    if (newShielded.includes(k)) continue;
    newShielded.push(k);
    available--; used++;
  }
  if (used) {
    state.shieldedDays = newShielded;
    state.freezes = available;
    setTimeout(() => toast(`Used ${used} freeze${used>1?'s':''} to protect your streak`), 1200);
  }
}

function awardFreezesForStreak(streak){
  const milestone = Math.floor(streak / 7);
  const earned = state.freezesEarned || 0;
  if (milestone > earned) {
    const diff = milestone - earned;
    state.freezes = (state.freezes || 0) + diff;
    state.freezesEarned = milestone;
    setTimeout(() => toast(`Earned ${diff} streak freeze${diff>1?'s':''}`), 600);
  }
}

/* =========================================================================
   GRADES
   ========================================================================= */
function setupGrades(){
  document.querySelectorAll('[data-grade]').forEach(sel => {
    sel.addEventListener('change', () => {
      state.grades['mg_' + sel.dataset.grade] = sel.value;
      renderGrades(); save();
    });
  });
  document.querySelectorAll('[data-pct]').forEach(inp => {
    inp.addEventListener('input', () => {
      state.grades['mp_' + inp.dataset.pct] = inp.value;
      renderGrades(); save();
    });
  });
}

function renderGrades(){
  ['m','f','p'].forEach(s => {
    const sel = document.querySelector(`[data-grade="${s}"]`);
    const inp = document.querySelector(`[data-pct="${s}"]`);
    if (sel) sel.value = state.grades['mg_'+s] || '';
    if (inp) inp.value = state.grades['mp_'+s] || '';
  });
  const grades = [];
  ['m','f','p'].forEach(s => {
    const g = state.grades['mg_'+s], p = state.grades['mp_'+s];
    const pred = predictGrade(g, p);
    const pv = document.querySelector(`[data-pv="${s}"]`);
    const pn = document.querySelector(`[data-pn="${s}"]`);
    if (pred) {
      pv.textContent = pred;
      pn.textContent = predictNote(g, p, pred);
      grades.push(pred);
    } else {
      pv.textContent = '—';
      pn.textContent = 'Enter your mock grade above';
    }
  });
  renderOverall(grades);
  renderSnapshot();
}

function predictGrade(g, p){
  if (!g) return null;
  let pts = GP[g] ?? 0;
  const v = parseInt(p);
  // realistic boost: only if % is significantly above the grade boundary
  if (!isNaN(v)) {
    if (g === 'A' && v >= 90) pts = 6;       // A→A* if 90%+
    else if (g === 'B' && v >= 80) pts = 5;  // B→A if 80%+
    else if (g === 'C' && v >= 70) pts = 4;  // C→B if 70%+
  }
  return PG[pts];
}

function predictNote(g, p, pred){
  if (g === pred) return `Maintain this — consistent practice keeps you here.`;
  if (GP[pred] > GP[g]) return `${g} mock — high % suggests stronger ability.`;
  return `Below ceiling — focus on weak topics to push up.`;
}

function scoreToGrade(subject, pct){
  const bounds = PAPER_BOUNDS[subject] || PAPER_BOUNDS['Maths'];
  for (const [grade, threshold] of bounds) {
    if (pct >= threshold) return grade;
  }
  return 'U';
}

function gradeColour(g){
  if (g === 'A*' || g === 'A') return 'var(--good)';
  if (g === 'B' || g === 'C') return 'var(--warn)';
  return 'var(--bad)';
}

function renderOverall(grades){
  const ov = document.getElementById('oc-val');
  const on = document.getElementById('oc-note');
  const ring = document.getElementById('imp-ring');
  if (grades.length === 3) {
    ov.textContent = grades.join(' · ');
    const avg = grades.reduce((a,g) => a + GP[g], 0) / 3;
    let sym, col, note;
    if (avg >= 5.5) { sym='✓'; col='var(--good)'; note='Strong offer candidate. Keep this trajectory.'; }
    else if (avg >= 5) { sym='~'; col='var(--warn)'; note='Competitive. Need consistent A* especially in FM.'; }
    else if (avg >= 4) { sym='△'; col='var(--warn)'; note='Gap to bridge. Sept mocks need to show improvement.'; }
    else { sym='✗'; col='var(--bad)'; note='Significant work needed.'; }
    ring.textContent = sym;
    ring.style.borderColor = col; ring.style.color = col;
    on.textContent = note;
  } else {
    ov.textContent = grades.length ? grades.join(' · ') + ' (incomplete)' : 'Enter grades above ↑';
    ring.textContent = '—';
    ring.style.borderColor = 'var(--border)';
    ring.style.color = 'var(--accent-hot)';
    on.textContent = 'Imperial Aerospace typically requires A*AA – A*A*A.';
  }
}

/* =========================================================================
   REVISION
   ========================================================================= */
function setupRevision(){
  buildRevisionUI();
}

function buildRevisionUI(){
  const bars = document.getElementById('subj-bars');
  const cards = document.getElementById('topic-cards');
  bars.innerHTML = ''; cards.innerHTML = '';
  Object.keys(TOPICS).forEach(key => {
    const bar = document.createElement('div');
    bar.className = 'subj-prog';
    bar.innerHTML = `
      <div class="sp-hdr">
        <div class="sp-name" style="color:${SC[key]}">${SN[key]}</div>
        <div class="sp-pct" style="color:${SC[key]}" id="sp-${key}">0%</div>
      </div>
      <div class="bar-bg"><div class="bar-fill" id="bf-${key}" style="background:${SC[key]};width:0%"></div></div>`;
    bars.appendChild(bar);

    const section = document.createElement('div');
    section.className = 'card';
    section.innerHTML = `<div class="card-title">${SN[key]}</div>`;

    TOPICS[key].forEach((topic, ti) => {
      const subs = SUBTOPICS[key]?.[ti] || [];
      const topicCard = document.createElement('div');
      topicCard.className = 'topic-card';
      topicCard.dataset.tid = `${key}_${ti}`;

      const head = document.createElement('div');
      head.className = 'topic-head';
      head.innerHTML = `
        <span class="topic-caret">▶</span>
        <span class="topic-name" style="color:${SC[key]}">${topic}</span>
        <div class="topic-mini-bar"><div style="background:${SC[key]}"></div></div>
        <span class="topic-progress" data-progress="${key}_${ti}">0/${subs.length}</span>
      `;
      head.addEventListener('click', () => topicCard.classList.toggle('open'));
      topicCard.appendChild(head);

      const body = document.createElement('div');
      body.className = 'topic-body';
      const inner = document.createElement('div');
      inner.className = 'topic-body-inner';
      subs.forEach((sub, si) => {
        const id = `${key}_${ti}_${si}`;
        const item = document.createElement('div');
        item.className = 'subt';
        item.dataset.id = id;
        item.innerHTML = `<div class="subt-conf" title="Click to set confidence 1→5, again to clear"></div>
                          <div class="subt-txt">${sub}</div>
                          <div class="subt-age"></div>`;
        item.querySelector('.subt-conf').addEventListener('click', e => { e.stopPropagation(); cycleConfidence(id); });
        item.addEventListener('click', e => { e.stopPropagation(); cycleConfidence(id); });
        inner.appendChild(item);
      });
      body.appendChild(inner);
      topicCard.appendChild(body);

      section.appendChild(topicCard);
    });

    cards.appendChild(section);
  });
}

function cycleConfidence(id){
  const cur = state.topics[id] || {};
  const oldConf = cur.c || 0;
  const newConf = oldConf >= 5 ? 0 : oldConf + 1;
  if (newConf === 0) {
    // wipe done flag but remember first-completion to prevent XP farming
    state.topics[id] = { d:0, t: cur.t || 0, firstDone: cur.firstDone || cur.d ? true : false };
  } else {
    const isFirstTime = !(cur.firstDone || cur.d);
    state.topics[id] = { d:1, t: Date.now(), c: newConf, firstDone: true };
    if (isFirstTime) addXP(5, 'subtopic studied');
  }
  markToday(0);
  renderRevision();
  renderDashboard();
  save();
}

// Back-compat for any old callsite
function toggleSubtopic(id){ cycleConfidence(id); }

function isStale(t){
  if (!t || !t.d) return false;
  const age = Math.floor((Date.now() - t.t) / 86400000);
  const threshold = CONFIDENCE_STALE[t.c || 3] ?? STALE_DAYS;
  return age >= threshold;
}

function topicAgeDays(id){
  const t = state.topics[id];
  if (!t || !t.d) return null;
  return Math.floor((Date.now() - t.t) / 86400000);
}

function renderRevision(){
  let totalAll = 0, freshAll = 0, staleAll = 0;
  Object.keys(TOPICS).forEach(key => {
    let subjFresh = 0, subjStale = 0, subjTotal = 0;
    TOPICS[key].forEach((_, ti) => {
      const subs = SUBTOPICS[key]?.[ti] || [];
      let tFresh = 0, tStale = 0;
      subs.forEach((_, si) => {
        const id = `${key}_${ti}_${si}`;
        const item = document.querySelector(`.subt[data-id="${id}"]`);
        const t = state.topics[id];
        const age = topicAgeDays(id);
        const conf = (t && t.d) ? (t.c || 3) : 0;
        const stale = isStale(t);
        subjTotal++;
        if (t && t.d) {
          if (stale) { tStale++; subjStale++; }
          else { tFresh++; subjFresh++; }
        }
        if (item) {
          item.classList.toggle('done', !!(t && t.d) && !stale);
          item.classList.toggle('stale', stale);
          const dot = item.querySelector('.subt-conf');
          if (dot) {
            dot.className = 'subt-conf' + (conf ? ` c${conf}` : '');
            dot.setAttribute('data-conf', conf);
          }
          item.querySelector('.subt-age').textContent = (t && t.d) ? `${age}d` : '';
        }
      });
      const totalSubs = subs.length;
      const doneSubs = tFresh + tStale;
      const pct = totalSubs ? (doneSubs / totalSubs) * 100 : 0;
      const progEl = document.querySelector(`[data-progress="${key}_${ti}"]`);
      const topicCard = progEl?.closest('.topic-card');
      const miniBar = topicCard?.querySelector('.topic-mini-bar > div');
      if (progEl) {
        progEl.textContent = `${doneSubs}/${totalSubs}`;
        progEl.classList.remove('full','has-stale');
        if (tFresh === totalSubs && totalSubs > 0) progEl.classList.add('full');
        else if (tStale > 0) progEl.classList.add('has-stale');
      }
      if (miniBar) miniBar.style.width = pct + '%';
    });
    const pct = subjTotal ? Math.round(subjFresh / subjTotal * 100) : 0;
    const bf = document.getElementById(`bf-${key}`);
    const sp = document.getElementById(`sp-${key}`);
    if (bf) bf.style.width = pct + '%';
    if (sp) sp.textContent = pct + '%';
    freshAll += subjFresh; staleAll += subjStale; totalAll += subjTotal;
  });
  document.getElementById('rev-done').textContent = freshAll;
  document.getElementById('rev-stale').textContent = staleAll;
  document.getElementById('rev-pct').textContent = totalAll ? Math.round((freshAll+staleAll)/totalAll*100) + '%' : '0%';
}

/* =========================================================================
   DASHBOARD
   ========================================================================= */
function renderDashboard(){
  renderWeakAreas();
  renderSnapshot();
  renderDueList();
  renderDashSubjBars();
  renderHeatmap();
  renderSparkline();
}

function computeWeakAreas(){
  const out = [];
  Object.keys(TOPICS).forEach(subj => {
    TOPICS[subj].forEach((topic, ti) => {
      let score = 0;
      const reasons = [];

      // Paper performance (weight 40)
      let topicScore = 0, topicMax = 0;
      (state.papers || []).forEach(p => {
        (p.questions || []).forEach(q => {
          if (q.topic === topic && q.max > 0) {
            topicScore += q.score || 0;
            topicMax += q.max;
          }
        });
      });
      if (topicMax > 0) {
        const pct = topicScore / topicMax;
        if (pct < 0.7) {
          score += 40 * (0.7 - pct) / 0.7;
          reasons.push(`${Math.round(pct * 100)}% on papers`);
        }
      }

      // Confidence & coverage (weight 30)
      const subs = SUBTOPICS[subj]?.[ti] || [];
      if (subs.length) {
        const confs = subs.map((_, si) => {
          const t = (state.topics || {})[`${subj}_${ti}_${si}`];
          return (t && t.d) ? (t.c || 3) : 0;
        });
        const studied = confs.filter(c => c > 0);
        const coverage = studied.length / subs.length;
        if (coverage < 0.7) {
          score += 30 * (1 - coverage);
          reasons.push(`${studied.length}/${subs.length} subtopics studied`);
        }
        if (studied.length) {
          const avgConf = studied.reduce((a,b) => a+b, 0) / studied.length;
          if (avgConf < 3.5) {
            score += 20 * (3.5 - avgConf) / 3.5;
            reasons.push(`avg confidence ${avgConf.toFixed(1)}/5`);
          }
        }
      }

      // Staleness (weight 20)
      const ages = (subs || []).map((_, si) => topicAgeDays(`${subj}_${ti}_${si}`)).filter(a => a !== null);
      if (ages.length) {
        const oldest = Math.max(...ages);
        if (oldest >= 14) {
          score += 20 * Math.min(1, (oldest - 7) / 30);
          reasons.push(`${oldest}d since last review`);
        }
      }

      if (score > 6) out.push({ score, subj, topic, reasons });
    });
  });
  return out.sort((a,b) => b.score - a.score).slice(0, 5);
}

function renderWeakAreas(){
  const wrap = document.getElementById('weak-list');
  if (!wrap) return;
  const items = computeWeakAreas();
  if (!items.length) {
    wrap.innerHTML = '<div class="empty-msg">Log paper questions, tick subtopics, or wait — weak areas will surface as data builds up.</div>';
    return;
  }
  wrap.innerHTML = items.map((w, i) => `
    <div class="weak-item">
      <div class="weak-rank">${i+1}</div>
      <div class="weak-body">
        <div class="weak-name"><span style="color:${SC[w.subj]};font-weight:700;font-size:var(--fs-11);letter-spacing:.08em;text-transform:uppercase;margin-right:6px">${SN[w.subj].split(' ')[0]}</span>${escapeHtml(w.topic)}</div>
        <div class="weak-reasons">${w.reasons.join(' · ')}</div>
      </div>
      <div class="weak-score" title="Weakness score">${Math.round(w.score)}</div>
    </div>
  `).join('');
}

function renderSnapshot(){
  const wrap = document.getElementById('snap-grid');
  if (!wrap) return;
  const subs = [
    {k:'m', cls:'m', name:'Maths'},
    {k:'f', cls:'f', name:'F. Maths'},
    {k:'p', cls:'p', name:'Physics'},
  ];
  wrap.innerHTML = subs.map(s => {
    const mock = state.grades['mg_'+s.k] || '—';
    const pred = predictGrade(state.grades['mg_'+s.k], state.grades['mp_'+s.k]) || '—';
    return `<div class="snap ${s.cls}">
      <div class="snap-lbl">${s.name}</div>
      <div class="snap-row">
        <div class="snap-pred">${pred}</div>
        <div class="snap-mock">Mock: ${mock}</div>
      </div>
    </div>`;
  }).join('');
}

function renderDueList(){
  const wrap = document.getElementById('due-list');
  if (!wrap) return;
  const due = [];
  Object.keys(state.topics).forEach(id => {
    const t = state.topics[id];
    if (!t || !t.d) return;
    if (!isStale(t)) return;
    const parts = id.split('_');
    if (parts.length !== 3) return; // ignore legacy topic-level ticks
    const [subj, tiStr, siStr] = parts;
    const ti = parseInt(tiStr), si = parseInt(siStr);
    const subtopic = SUBTOPICS[subj]?.[ti]?.[si];
    const topic = TOPICS[subj]?.[ti];
    if (!subtopic || !topic) return;
    const age = Math.floor((Date.now() - t.t) / 86400000);
    due.push({ id, age, subtopic, topic, subj, conf: t.c || 3 });
  });
  // Sort: lowest confidence first, then oldest
  due.sort((a,b) => (a.conf - b.conf) || (b.age - a.age));
  if (!due.length) {
    wrap.innerHTML = '<div class="empty-msg">All studied subtopics still fresh</div>';
    return;
  }
  wrap.innerHTML = due.slice(0, 8).map(d => `
    <div class="due-item">
      <div style="min-width:0;flex:1">
        <div style="display:flex;align-items:center;gap:6px">
          <span class="subt-conf c${d.conf}" style="width:10px;height:10px;border-width:1.5px"></span>
          <span style="color:${SC[d.subj]};font-weight:700;font-size:var(--fs-11);letter-spacing:.08em;text-transform:uppercase">${SN[d.subj].split(' ')[0]}</span>
          <span class="due-name">${escapeHtml(d.subtopic)}</span>
        </div>
        <div style="font-size:var(--fs-11);color:var(--text-4);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(d.topic)}</div>
      </div>
      <div class="due-meta ${d.age >= 28 ? 'urgent' : ''}">${d.age}d</div>
    </div>`).join('');
}

function renderDashSubjBars(){
  const wrap = document.getElementById('dash-subj-bars');
  if (!wrap) return;
  let totalAll = 0, doneAll = 0;
  const html = Object.keys(TOPICS).map(key => {
    let total = 0, done = 0;
    TOPICS[key].forEach((_, ti) => {
      const subs = SUBTOPICS[key]?.[ti] || [];
      subs.forEach((_, si) => {
        total++;
        const t = state.topics[`${key}_${ti}_${si}`];
        if (t && t.d) done++;
      });
    });
    totalAll += total; doneAll += done;
    const pct = total ? Math.round(done/total*100) : 0;
    return `<div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:600;margin-bottom:3px">
        <span style="color:${SC[key]}">${SN[key]}</span><span>${pct}%</span>
      </div>
      <div class="bar-bg"><div class="bar-fill" style="background:${SC[key]};width:${pct}%"></div></div>
    </div>`;
  }).join('');
  wrap.innerHTML = html;
  document.getElementById('rev-pct-dash').textContent = totalAll ? Math.round(doneAll/totalAll*100) + '%' : '0%';
}

function renderHeatmap(){
  const hm = document.getElementById('heatmap');
  if (!hm) return;
  hm.innerHTML = '';
  const today = new Date(); today.setHours(0,0,0,0);
  // start 52 weeks back, aligned to Monday
  const start = new Date(today); start.setDate(start.getDate() - 52*7);
  while (start.getDay() !== 1) start.setDate(start.getDate() - 1);

  const cur = new Date(start);
  const minutesList = Object.values(state.dayMinutes || {}).filter(v => v > 0);
  const maxMin = Math.max(60, ...minutesList);

  while (cur <= today) {
    const k = dayKey(cur);
    const mins = state.dayMinutes[k] || 0;
    const lvl = mins === 0 ? 0 : Math.min(4, Math.ceil((mins / maxMin) * 4));
    const cell = document.createElement('div');
    cell.className = 'hm-cell';
    if (lvl > 0) cell.dataset.lvl = lvl;
    cell.title = `${k} · ${mins ? Math.round(mins/60*10)/10 + 'h' : 'no study'}`;
    hm.appendChild(cell);
    cur.setDate(cur.getDate() + 1);
  }
}

function renderSparkline(){
  const svg = document.getElementById('sparkline');
  if (!svg) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    days.push((state.dayMinutes[dayKey(d)] || 0) / 60);
  }
  const avg = days.reduce((a,b) => a+b, 0) / days.length;
  const max = Math.max(0.5, ...days, avg * 1.4);
  const W = 300, H = 80, P = 8;
  const stepX = (W - 2*P) / (days.length - 1);
  const yFor = h => H - P - (h / max) * (H - 2*P);
  const points = days.map((h, i) => [P + i*stepX, yFor(h)]);
  const path = points.map((p,i) => (i===0?'M':'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = path + ` L${W-P},${H-P} L${P},${H-P} Z`;
  const avgY = yFor(avg);
  const labelOnTop = avgY > 18;
  const labelY = labelOnTop ? avgY - 5 : avgY + 12;
  svg.innerHTML = `
    <defs>
      <linearGradient id="slGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity=".35"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${area}" fill="url(#slGrad)"/>
    <line x1="${P}" y1="${avgY.toFixed(1)}" x2="${W-P}" y2="${avgY.toFixed(1)}"
          stroke="var(--gold)" stroke-width="1.2" stroke-dasharray="4 4" opacity=".75"/>
    <path d="${path}" stroke="var(--accent-hot)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${points.map((p,i) => {
      const isToday = i === points.length - 1;
      return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${isToday?3.5:2.5}" fill="${isToday?'var(--gold)':'var(--accent-hot)'}"/>`;
    }).join('')}
    <text x="${W - P - 2}" y="${labelY.toFixed(1)}" text-anchor="end"
          fill="var(--gold)" font-family="Inter,sans-serif" font-size="10" font-weight="700">
      Avg ${avg.toFixed(1)}h
    </text>
  `;
  document.getElementById('sl-avg').textContent = avg.toFixed(1) + 'h';
}

/* =========================================================================
   JOURNAL
   ========================================================================= */
function setupJournal(){
  document.getElementById('j-today-lbl').textContent = new Date().toLocaleDateString('en-GB', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  const chips = document.getElementById('j-chips');
  chips.innerHTML = '';
  [...TOPICS.maths.slice(0,5), ...TOPICS.fm.slice(0,4), ...TOPICS.phys.slice(0,4)].forEach(t => {
    const c = document.createElement('div');
    c.className = 'j-chip';
    c.textContent = t;
    c.addEventListener('click', () => c.classList.toggle('sel'));
    chips.appendChild(c);
  });
  document.getElementById('save-log-btn').addEventListener('click', saveLog);
}

function saveLog(){
  const hours = parseFloat(document.getElementById('j-hours').value) || 0;
  const mood = document.getElementById('j-mood').value;
  const subj = document.getElementById('j-subj').value;
  const notes = document.getElementById('j-notes').value.trim();
  const topics = [...document.querySelectorAll('.j-chip.sel')].map(c => c.textContent);
  if (!hours && !notes) { toast('Add hours or notes first'); return; }
  const entry = { id: Date.now(), date: todayKey(), hours, mood, subj, notes, topics };
  state.logs.unshift(entry);
  state.logs = state.logs.slice(0, 200);  // cap
  markToday(hours * 60);
  document.getElementById('j-hours').value = '';
  document.getElementById('j-notes').value = '';
  document.querySelectorAll('.j-chip.sel').forEach(c => c.classList.remove('sel'));
  if (hours > 0) addXP(Math.round(hours * 8), 'logged session');
  renderJournal(); renderDashboard();
  save();
}

function renderJournal(){
  const cont = document.getElementById('logs-container');
  if (!state.logs.length) {
    cont.innerHTML = `<div class="empty-msg">No logs yet — save your first one above.</div>`;
    return;
  }
  cont.innerHTML = state.logs.slice(0, 20).map(l => `
    <div class="log-entry">
      <div class="le-hdr">
        <div class="le-meta">
          <span style="font-size:16px">${l.mood||'✅'}</span>
          <span class="le-date">${l.date}</span>
          <span class="le-hrs">${l.hours}h · ${l.subj}</span>
          ${(l.topics||[]).map(t => `<span class="le-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <button class="le-del" data-del="${l.id}" aria-label="Delete">✕</button>
      </div>
      ${l.notes ? `<div class="le-body">${escapeHtml(l.notes)}</div>` : ''}
    </div>
  `).join('');
  cont.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
    state.logs = state.logs.filter(l => l.id !== parseInt(b.dataset.del));
    renderJournal(); renderDashboard(); save();
    toast('Log deleted');
  }));
}

/* =========================================================================
   PAST PAPERS
   ========================================================================= */
let pendingQuestions = [];

function setupPapers(){
  document.getElementById('save-paper-btn').addEventListener('click', savePaper);
  const toggle = document.getElementById('pp-q-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const area = document.getElementById('pp-questions');
    const open = area.style.display !== 'none';
    area.style.display = open ? 'none' : 'block';
    toggle.innerHTML = open
      ? `<svg class="ico ico-sm"><use href="#i-plus"/></svg>Add per-question breakdown`
      : `<svg class="ico ico-sm"><use href="#i-x"/></svg>Hide breakdown`;
    if (!open && pendingQuestions.length === 0) addQuestionRow();
  });
  const adder = document.getElementById('pp-q-add');
  if (adder) adder.addEventListener('click', addQuestionRow);
  const subjEl = document.getElementById('pp-subj');
  if (subjEl) subjEl.addEventListener('change', renderQuestionRows);
}

function subjLabelToKey(label){
  return label === 'Maths' ? 'maths' : label === 'Further Maths' ? 'fm' : 'phys';
}

function addQuestionRow(){
  pendingQuestions.push({ topic:'', score:0, max:0 });
  renderQuestionRows();
}

function renderQuestionRows(){
  const rowsEl = document.getElementById('pp-q-rows');
  if (!rowsEl) return;
  const subj = document.getElementById('pp-subj').value;
  const subjKey = subjLabelToKey(subj);
  const topics = TOPICS[subjKey] || [];
  rowsEl.innerHTML = pendingQuestions.map((q, i) => `
    <div class="pp-q-row">
      <span class="pp-q-num">${i+1}</span>
      <select data-qf="topic" data-i="${i}">
        <option value="">— topic —</option>
        ${topics.map(t => `<option ${q.topic === t ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('')}
      </select>
      <input type="number" data-qf="score" data-i="${i}" placeholder="0" min="0" step="1" value="${q.score || ''}">
      <input type="number" data-qf="max" data-i="${i}" placeholder="0" min="1" step="1" value="${q.max || ''}">
      <button class="pp-q-del" data-i="${i}" title="Remove" aria-label="Remove">✕</button>
    </div>
  `).join('');
  rowsEl.querySelectorAll('[data-qf]').forEach(el => {
    const handler = e => {
      const idx = parseInt(e.target.dataset.i);
      const field = e.target.dataset.qf;
      pendingQuestions[idx][field] = field === 'topic' ? e.target.value : (parseFloat(e.target.value) || 0);
    };
    el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', handler);
  });
  rowsEl.querySelectorAll('.pp-q-del').forEach(el => el.addEventListener('click', () => {
    pendingQuestions.splice(parseInt(el.dataset.i), 1);
    renderQuestionRows();
  }));
}

function savePaper(){
  const subject  = document.getElementById('pp-subj').value;
  const paperRef = document.getElementById('pp-ref').value.trim();
  const score    = parseFloat(document.getElementById('pp-score').value);
  const maxScore = parseFloat(document.getElementById('pp-max').value);
  const notes    = document.getElementById('pp-notes').value.trim();
  if (!paperRef)            { toast('Add a paper reference first'); return; }
  if (isNaN(score) || isNaN(maxScore) || maxScore <= 0) { toast('Enter valid score and max marks'); return; }
  if (score > maxScore)     { toast('Score cannot exceed max marks'); return; }
  const pct   = Math.round((score / maxScore) * 100);
  const grade = scoreToGrade(subject, pct);
  const questions = pendingQuestions
    .filter(q => q.topic && q.max > 0)
    .map(q => ({ topic: q.topic, score: q.score || 0, max: q.max }));
  const entry = { id: Date.now(), date: todayKey(), subject, paperRef, score, maxScore, pct, grade, notes, questions };
  if (!state.papers) state.papers = [];
  state.papers.unshift(entry);
  state.papers = state.papers.slice(0, 200);
  addXP(Math.round(pct / 10), 'past paper');
  document.getElementById('pp-ref').value   = '';
  document.getElementById('pp-score').value = '';
  document.getElementById('pp-max').value   = '';
  document.getElementById('pp-notes').value = '';
  pendingQuestions = [];
  const qArea = document.getElementById('pp-questions');
  const qToggle = document.getElementById('pp-q-toggle');
  if (qArea) qArea.style.display = 'none';
  if (qToggle) qToggle.innerHTML = `<svg class="ico ico-sm"><use href="#i-plus"/></svg>Add per-question breakdown`;
  renderQuestionRows();
  renderPapers();
  save();
  toast(`Logged — ${pct}% · ${grade}`);
}

function renderPapers(){
  if (!state.papers) state.papers = [];

  // summary cards
  const subjects = ['Maths','Further Maths','Physics'];
  const summEl = document.getElementById('pp-summary');
  summEl.innerHTML = subjects.map(s => {
    const entries = state.papers.filter(p => p.subject === s);
    if (!entries.length) return '';
    const avgPct = Math.round(entries.reduce((a, p) => a + p.pct, 0) / entries.length);
    const avgGrade = scoreToGrade(s, avgPct);
    const subjectVar = s === 'Maths' ? 'var(--maths)' : s === 'Further Maths' ? 'var(--fm)' : 'var(--physics)';
    return `
      <div class="pp-sum-card" style="border-color:${subjectVar}">
        <div class="pp-sum-subj" style="color:${subjectVar}">${s}</div>
        <div class="pp-sum-grade" style="color:${gradeColour(avgGrade)}">${avgGrade}</div>
        <div class="pp-sum-avg">${avgPct}% avg</div>
        <div class="pp-sum-count">${entries.length} paper${entries.length > 1 ? 's' : ''}</div>
      </div>`;
  }).join('');

  // list
  const cont = document.getElementById('pp-list');
  if (!state.papers.length) {
    cont.innerHTML = `<div class="empty-msg">No papers logged yet — add your first one above.</div>`;
    return;
  }
  cont.innerHTML = state.papers.slice(0, 50).map(p => {
    const qHtml = (p.questions || []).length
      ? `<div class="pp-q-summary">${p.questions.map(q => {
          const pct = q.max ? Math.round((q.score / q.max) * 100) : 0;
          const cls = pct < 50 ? 'weak' : pct >= 80 ? 'strong' : '';
          return `<span class="pp-q-tag ${cls}">${escapeHtml(q.topic)} · ${q.score}/${q.max}</span>`;
        }).join('')}</div>`
      : '';
    return `
      <div class="log-entry">
        <div class="le-hdr">
          <div class="le-meta">
            <span class="pp-grade-badge" style="color:${gradeColour(p.grade)};border-color:${gradeColour(p.grade)}">${p.grade}</span>
            <span class="le-date">${p.date}</span>
            <span class="le-hrs">${p.score}/${p.maxScore} · ${p.pct}%</span>
            <span class="le-tag">${escapeHtml(p.subject)}</span>
            <span style="color:var(--text-3);font-size:var(--fs-12)">${escapeHtml(p.paperRef)}</span>
          </div>
          <button class="le-del" data-pdel="${p.id}" aria-label="Delete">✕</button>
        </div>
        ${p.notes ? `<div class="le-body">${escapeHtml(p.notes)}</div>` : ''}
        ${qHtml}
      </div>
    `;
  }).join('');
  cont.querySelectorAll('[data-pdel]').forEach(b => b.addEventListener('click', () => {
    state.papers = state.papers.filter(p => p.id !== parseInt(b.dataset.pdel));
    renderPapers(); save();
    toast('Paper deleted');
  }));
}

/* =========================================================================
   POMODORO
   ========================================================================= */
const PomoState = { running:false, stage:'work', remaining:0, ends:0, ticker:null };

function setupPomodoro(){
  document.getElementById('pomo-fab').addEventListener('click', () => {
    document.getElementById('pomo-panel').classList.toggle('open');
  });
  document.getElementById('pomo-start').addEventListener('click', pomoStartPause);
  document.getElementById('pomo-reset').addEventListener('click', pomoReset);
  document.getElementById('pomo-skip').addEventListener('click', pomoSkip);
  ['work','short','long'].forEach(k => {
    const el = document.getElementById('pomo-'+k);
    el.addEventListener('change', () => {
      const v = parseInt(el.value) || 1;
      state.pomo[k] = Math.max(1, Math.min(120, v));
      el.value = state.pomo[k];
      if (!PomoState.running) pomoReset();
      save();
    });
  });
}

function renderPomodoro(){
  document.getElementById('pomo-work').value = state.pomo.work;
  document.getElementById('pomo-short').value = state.pomo.short;
  document.getElementById('pomo-long').value = state.pomo.long;
  if (!state.pomoToday || state.pomoToday.date !== todayKey()) {
    state.pomoToday = { date: todayKey(), completed: 0, minutes: 0 };
  }
  document.getElementById('pomo-sessions').textContent = state.pomoToday.completed;
  document.getElementById('pomo-mins').textContent = state.pomoToday.minutes;
  if (!PomoState.running) {
    PomoState.remaining = state.pomo.work * 60;
    updatePomoDisplay();
  }
}

function pomoStartPause(){
  if (PomoState.running) {
    PomoState.running = false;
    clearInterval(PomoState.ticker);
    document.getElementById('pomo-start').textContent = 'Resume';
  } else {
    PomoState.running = true;
    PomoState.ends = Date.now() + PomoState.remaining * 1000;
    document.getElementById('pomo-start').textContent = 'Pause';
    document.getElementById('pomo-fab').classList.remove('idle');
    document.getElementById('pomo-fab').classList.toggle('active', PomoState.stage === 'work');
    document.getElementById('pomo-fab').classList.toggle('break', PomoState.stage !== 'work');
    PomoState.ticker = setInterval(pomoTick, 250);
  }
}

function pomoTick(){
  PomoState.remaining = Math.max(0, Math.round((PomoState.ends - Date.now()) / 1000));
  updatePomoDisplay();
  if (PomoState.remaining <= 0) pomoComplete();
}

function pomoComplete(){
  clearInterval(PomoState.ticker);
  PomoState.running = false;
  if (PomoState.stage === 'work') {
    state.pomoToday.completed++;
    state.pomoToday.minutes += state.pomo.work;
    state.pomoTotal = (state.pomoTotal || 0) + 1;
    markToday(state.pomo.work);
    addXP(state.pomo.work, 'pomodoro');
    // long break every Nth
    const long = state.pomoToday.completed % state.pomo.before === 0;
    PomoState.stage = long ? 'long' : 'short';
    PomoState.remaining = (long ? state.pomo.long : state.pomo.short) * 60;
    toast(`Work done. ${long ? 'Long' : 'Short'} break.`);
  } else {
    PomoState.stage = 'work';
    PomoState.remaining = state.pomo.work * 60;
    toast('Break over — back to it.');
  }
  document.getElementById('pomo-start').textContent = 'Start';
  document.getElementById('pomo-fab').classList.add('idle');
  document.getElementById('pomo-fab').classList.remove('active','break');
  updatePomoDisplay();
  beep();
  save();
}

function pomoReset(){
  clearInterval(PomoState.ticker);
  PomoState.running = false;
  PomoState.stage = 'work';
  PomoState.remaining = state.pomo.work * 60;
  document.getElementById('pomo-start').textContent = 'Start';
  document.getElementById('pomo-fab').classList.add('idle');
  document.getElementById('pomo-fab').classList.remove('active','break');
  updatePomoDisplay();
}

function pomoSkip(){
  clearInterval(PomoState.ticker);
  PomoState.remaining = 1;
  pomoComplete();
}

function updatePomoDisplay(){
  const m = Math.floor(PomoState.remaining / 60);
  const s = PomoState.remaining % 60;
  const t = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  const tEl = document.getElementById('pomo-time');
  tEl.textContent = t;
  tEl.className = 'pomo-time ' + (PomoState.stage === 'work' ? 'work' : 'break');
  document.getElementById('pomo-stage').textContent = PomoState.stage === 'work' ? 'Focus session' : PomoState.stage === 'short' ? 'Short break' : 'Long break';
  document.getElementById('pomo-fab-time').textContent = t;
}

function beep(){
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 720; gain.gain.value = 0.1;
    osc.start(); osc.stop(ctx.currentTime + 0.15);
    setTimeout(() => ctx.close(), 300);
  } catch(e) {}
}

/* =========================================================================
   SETTINGS
   ========================================================================= */
/* =========================================================================
   GOALS
   ========================================================================= */
function weekStartKey(date){
  const d = new Date(date || new Date()); d.setHours(0,0,0,0);
  const dow = d.getDay();
  const diff = (dow === 0 ? -6 : 1 - dow); // make Monday the start
  d.setDate(d.getDate() + diff);
  return dayKey(d);
}

function setupGoals(){
  // event delegation set up in renderGoals after rebuild
}

function getCurrentGoals(){
  const wk = weekStartKey();
  if (!state.goals) state.goals = {};
  if (!state.goals[wk]) state.goals[wk] = [];
  return state.goals[wk];
}

function renderGoals(){
  const wrap = document.getElementById('goal-list');
  const status = document.getElementById('goal-status');
  if (!wrap) return;
  const goals = getCurrentGoals();
  if (!goals.length) {
    wrap.innerHTML = `<div class="goal-cta" id="goal-add-cta">+ Add up to 3 goals for this week</div>`;
    if (status) status.textContent = '0/3';
    document.getElementById('goal-add-cta').addEventListener('click', () => addGoalRow());
    return;
  }
  const done = goals.filter(g => g.done).length;
  if (status) status.textContent = `${done}/${goals.length}`;
  wrap.innerHTML = goals.map(g => `
    <div class="goal-row ${g.done ? 'done' : ''}" data-gid="${g.id}">
      <div class="goal-check" data-gtoggle="${g.id}">✓</div>
      <input class="goal-text" data-gtext="${g.id}" value="${escapeHtml(g.text)}" placeholder="Goal description">
      <button class="goal-del" data-gdel="${g.id}" aria-label="Remove">✕</button>
    </div>
  `).join('') + (goals.length < 3 ? `<div class="goal-cta" id="goal-add-cta">+ Add another goal</div>` : '');

  wrap.querySelectorAll('[data-gtoggle]').forEach(el => el.addEventListener('click', () => toggleGoal(parseInt(el.dataset.gtoggle))));
  wrap.querySelectorAll('[data-gtext]').forEach(el => el.addEventListener('change', e => updateGoalText(parseInt(e.target.dataset.gtext), e.target.value)));
  wrap.querySelectorAll('[data-gdel]').forEach(el => el.addEventListener('click', () => deleteGoal(parseInt(el.dataset.gdel))));
  const cta = document.getElementById('goal-add-cta');
  if (cta) cta.addEventListener('click', () => addGoalRow());
}

function addGoalRow(){
  const goals = getCurrentGoals();
  if (goals.length >= 3) return;
  goals.push({ id: Date.now() + Math.random(), text: '', done: false });
  renderGoals();
  setTimeout(() => {
    const inputs = document.querySelectorAll('.goal-text');
    if (inputs.length) inputs[inputs.length - 1].focus();
  }, 0);
  save();
}

function toggleGoal(id){
  const goals = getCurrentGoals();
  const g = goals.find(x => x.id === id);
  if (!g) return;
  g.done = !g.done;
  // Award XP on completion; track week-completion for achievement
  if (g.done) {
    addXP(15, 'goal');
    if (goals.length === 3 && goals.every(x => x.done)) {
      state.goalWeeksHit = (state.goalWeeksHit || 0) + 1;
      confetti();
      setTimeout(() => toast('All weekly goals hit!'), 400);
    }
  }
  renderGoals();
  save();
}

function updateGoalText(id, text){
  const g = getCurrentGoals().find(x => x.id === id);
  if (g) { g.text = text; save(); }
}

function deleteGoal(id){
  const wk = weekStartKey();
  state.goals[wk] = (state.goals[wk] || []).filter(g => g.id !== id);
  renderGoals(); save();
}

/* =========================================================================
   ANALYTICS — Plan vs Actual + 3 charts
   ========================================================================= */
function setupAnalytics(){
  const edit = document.getElementById('targets-edit');
  if (edit) edit.addEventListener('click', toggleTargetEdit);
}

function toggleTargetEdit(){
  const panel = document.getElementById('target-edit-panel');
  if (!panel) return;
  const open = panel.style.display !== 'none';
  panel.style.display = open ? 'none' : 'block';
  document.getElementById('targets-edit').textContent = open ? 'Edit targets' : 'Done';
  if (!open) renderTargetEdit();
}

function renderTargetEdit(){
  const grid = document.getElementById('target-edit-grid');
  if (!grid) return;
  const subs = Object.keys(state.planHours || {});
  grid.innerHTML = subs.map(s => `
    <div class="target-edit-row">
      <span class="target-edit-lbl">${escapeHtml(s)}</span>
      <input type="number" min="0" max="40" step="0.5" data-plan="${escapeAttr(s)}" value="${state.planHours[s] || 0}">
      <span class="unit">h/wk</span>
    </div>
  `).join('');
  grid.querySelectorAll('[data-plan]').forEach(el => el.addEventListener('input', e => {
    state.planHours[e.target.dataset.plan] = parseFloat(e.target.value) || 0;
    renderPlanActual(); save();
  }));
}

function escapeAttr(s){ return String(s).replace(/"/g,'&quot;'); }

function renderAnalytics(){
  renderPlanActual();
  renderChartTrajectory();
  renderChartHours();
  renderChartMood();
}

function renderPlanActual(){
  const wrap = document.getElementById('plan-actual-list');
  if (!wrap) return;
  // Sum logged hours this week per subject
  const wkStart = new Date(weekStartKey() + 'T00:00:00');
  const wkEnd = new Date(wkStart); wkEnd.setDate(wkStart.getDate() + 7);
  const totals = {};
  (state.logs || []).forEach(l => {
    const d = new Date(l.date + 'T00:00:00');
    if (d >= wkStart && d < wkEnd) {
      totals[l.subj] = (totals[l.subj] || 0) + (l.hours || 0);
    }
  });
  const subs = Object.keys(state.planHours || {});
  const maxVal = Math.max(1, ...subs.map(s => Math.max(state.planHours[s] || 0, totals[s] || 0)));
  wrap.innerHTML = subs.map(s => {
    const plan = state.planHours[s] || 0;
    const actual = totals[s] || 0;
    const planPct = (plan / maxVal) * 100;
    const actualPct = (actual / maxVal) * 100;
    return `
      <div class="plan-actual-row">
        <div class="plan-actual-name">${escapeHtml(s)}</div>
        <div class="plan-actual-bar plan"><div style="width:${planPct}%"></div></div>
        <div class="plan-actual-bar actual"><div style="width:${actualPct}%"></div></div>
        <div class="plan-actual-num">${actual.toFixed(1)} / ${plan}h</div>
      </div>
    `;
  }).join('');
}

function renderChartTrajectory(){
  const svg = document.getElementById('chart-trajectory');
  if (!svg) return;
  const W = 600, H = 200, PAD = 24;
  const subjects = ['Maths','Further Maths','Physics'];
  const colours = { 'Maths':'var(--maths)', 'Further Maths':'var(--fm)', 'Physics':'var(--physics)' };
  // Y axis: U=0, A*=6
  const yFor = pts => H - PAD - (pts / 6) * (H - 2*PAD);
  const allPapers = (state.papers || []).slice().sort((a,b) => a.date.localeCompare(b.date));
  if (!allPapers.length) {
    svg.innerHTML = `<text x="${W/2}" y="${H/2}" text-anchor="middle" fill="var(--text-4)" font-family="Inter" font-size="13">Log some past papers to see your trajectory.</text>`;
    document.getElementById('chart-trajectory-legend').innerHTML = '';
    return;
  }
  // x axis range = first to last paper date
  const firstT = new Date(allPapers[0].date).getTime();
  const lastT = new Date(allPapers[allPapers.length - 1].date).getTime();
  const span = Math.max(1, lastT - firstT);
  const xFor = ts => PAD + ((ts - firstT) / span) * (W - 2*PAD);

  // Grid lines for each grade
  const grades = [['A*',6],['A',5],['B',4],['C',3],['D',2],['E',1],['U',0]];
  let gridHtml = grades.map(([g, p]) => {
    const y = yFor(p);
    return `<line x1="${PAD}" y1="${y}" x2="${W-PAD}" y2="${y}" stroke="var(--hairline)" stroke-width="1"/>
            <text x="6" y="${y+4}" font-family="Inter" font-size="10" fill="var(--text-4)">${g}</text>`;
  }).join('');

  let pathsHtml = '';
  let legendHtml = '';
  subjects.forEach(subj => {
    const pts = allPapers.filter(p => p.subject === subj).map(p => ({
      x: xFor(new Date(p.date).getTime()),
      y: yFor(GP[p.grade] ?? 0),
      grade: p.grade,
    }));
    if (!pts.length) return;
    const path = pts.map((p,i) => (i===0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ');
    pathsHtml += `<path d="${path}" fill="none" stroke="${colours[subj]}" stroke-width="2" stroke-linejoin="round"/>`;
    pts.forEach(p => {
      pathsHtml += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="${colours[subj]}"><title>${subj} · ${p.grade}</title></circle>`;
    });
    legendHtml += `<div class="chart-legend-item"><span class="chart-legend-dot" style="background:${colours[subj]}"></span>${subj}</div>`;
  });
  svg.innerHTML = gridHtml + pathsHtml;
  document.getElementById('chart-trajectory-legend').innerHTML = legendHtml;
}

function renderChartHours(){
  const svg = document.getElementById('chart-hours');
  if (!svg) return;
  const W = 600, H = 200, PAD_T = 16, PAD_B = 32, PAD_L = 100, PAD_R = 16;
  const now = new Date(); now.setHours(0,0,0,0);
  const cutoff = new Date(now); cutoff.setDate(now.getDate() - 30);
  const totals = {};
  (state.logs || []).forEach(l => {
    const d = new Date(l.date + 'T00:00:00');
    if (d >= cutoff) totals[l.subj] = (totals[l.subj] || 0) + (l.hours || 0);
  });
  const items = Object.entries(totals).filter(([_, v]) => v > 0).sort((a,b) => b[1] - a[1]);
  document.getElementById('hours-total').textContent = items.length ? `${items.reduce((a,[_,v]) => a+v, 0).toFixed(1)}h total` : '';
  if (!items.length) {
    svg.innerHTML = `<text x="${W/2}" y="${H/2}" text-anchor="middle" fill="var(--text-4)" font-family="Inter" font-size="13">Log some sessions to see hours by subject.</text>`;
    return;
  }
  const max = Math.max(...items.map(i => i[1]));
  const rowH = (H - PAD_T - PAD_B) / items.length;
  let html = '';
  items.forEach(([subj, hrs], i) => {
    const y = PAD_T + i * rowH;
    const barW = ((W - PAD_L - PAD_R) * (hrs / max));
    html += `<text x="${PAD_L - 8}" y="${y + rowH/2 + 4}" text-anchor="end" font-family="Inter" font-size="12" font-weight="500" fill="var(--text-2)">${escapeHtml(subj)}</text>`;
    html += `<rect x="${PAD_L}" y="${y + 4}" width="${barW.toFixed(1)}" height="${(rowH - 8).toFixed(1)}" rx="4" fill="var(--accent)" opacity=".85"/>`;
    html += `<text x="${PAD_L + barW + 8}" y="${y + rowH/2 + 4}" font-family="Inter" font-size="12" font-weight="600" fill="var(--text-2)">${hrs.toFixed(1)}h</text>`;
  });
  svg.innerHTML = html;
}

function renderChartMood(){
  const svg = document.getElementById('chart-mood');
  if (!svg) return;
  const W = 600, H = 200, PAD_T = 24, PAD_B = 44, PAD_L = 24, PAD_R = 24;
  const moods = ['🔥','✅','😐','😴','❌'];
  const labels = { '🔥':'On fire', '✅':'Productive', '😐':'Average', '😴':'Tired', '❌':'Rough day' };
  const sums = {}, counts = {};
  (state.logs || []).forEach(l => {
    const m = l.mood || '✅';
    sums[m] = (sums[m] || 0) + (l.hours || 0);
    counts[m] = (counts[m] || 0) + 1;
  });
  const data = moods.map(m => ({ mood:m, avg: counts[m] ? sums[m]/counts[m] : 0, n: counts[m] || 0 }));
  if (data.every(d => d.n === 0)) {
    svg.innerHTML = `<text x="${W/2}" y="${H/2}" text-anchor="middle" fill="var(--text-4)" font-family="Inter" font-size="13">Save some logs with moods to see this.</text>`;
    return;
  }
  const max = Math.max(0.5, ...data.map(d => d.avg));
  const barSpan = (W - PAD_L - PAD_R) / data.length;
  let html = '';
  data.forEach((d, i) => {
    const x = PAD_L + i * barSpan + barSpan * 0.2;
    const barW = barSpan * 0.6;
    const barH = (H - PAD_T - PAD_B) * (d.avg / max);
    const y = H - PAD_B - barH;
    html += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="6" fill="${d.n ? 'var(--accent)' : 'var(--surface-3)'}" opacity="${d.n ? 1 : .3}"/>`;
    html += `<text x="${(x + barW/2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" font-family="Inter" font-size="11" font-weight="600" fill="var(--text-2)">${d.avg ? d.avg.toFixed(1)+'h' : ''}</text>`;
    html += `<text x="${(x + barW/2).toFixed(1)}" y="${(H - PAD_B + 22).toFixed(1)}" text-anchor="middle" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif" font-size="20">${d.mood}</text>`;
    html += `<text x="${(x + barW/2).toFixed(1)}" y="${(H - 10).toFixed(1)}" text-anchor="middle" font-family="Inter" font-size="10" fill="var(--text-4)">${labels[d.mood]} (${d.n})</text>`;
  });
  svg.innerHTML = html;
}

/* =========================================================================
   ACHIEVEMENTS UI
   ========================================================================= */
function setupAchievements(){}

function renderAchievements(){
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;
  const earned = new Set(state.achievements || []);
  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const got = earned.has(a.id);
    return `
      <div class="ach ${got ? 'earned' : 'locked'}" title="${escapeHtml(a.desc)}">
        <div class="ach-icon"><svg class="ico"><use href="#${a.icon}"/></svg></div>
        <div class="ach-text">
          <div class="ach-name">${escapeHtml(a.name)}</div>
          <div class="ach-desc">${escapeHtml(a.desc)}</div>
        </div>
        ${got ? '<div class="ach-check">✓</div>' : ''}
      </div>`;
  }).join('');
  document.querySelectorAll('.ach-count-target').forEach(el => {
    el.textContent = `${earned.size}/${ACHIEVEMENTS.length}`;
  });

  const recent = document.getElementById('ach-recent');
  if (recent) {
    const last = ACHIEVEMENTS.filter(a => earned.has(a.id)).slice(-4);
    if (!last.length) {
      recent.innerHTML = '<div class="empty-msg" style="padding:var(--s-3)">No achievements yet — keep studying.</div>';
    } else {
      recent.innerHTML = last.map(a => `
        <div class="ach-pill" title="${escapeHtml(a.desc)}">
          <svg class="ico ico-sm"><use href="#${a.icon}"/></svg>
          <span>${escapeHtml(a.name)}</span>
        </div>`).join('');
    }
  }
}

function setupSettings(){
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change', importData);
  document.getElementById('reset-btn').addEventListener('click', resetData);

  // Linking UI
  document.getElementById('copy-code-btn').addEventListener('click', () => {
    if (!state.inviteCode) return;
    navigator.clipboard.writeText(state.inviteCode).then(() => toast('Copied'));
  });
  document.getElementById('link-btn').addEventListener('click', async () => {
    const code = document.getElementById('link-code-input').value;
    const btn = document.getElementById('link-btn');
    btn.disabled = true; btn.textContent = 'Linking…';
    const res = await linkByCode(code);
    btn.disabled = false; btn.textContent = 'Link';
    if (res.ok) {
      document.getElementById('link-code-input').value = '';
      toast(`Linked to ${res.username}`);
      renderLinkedAccounts();
    } else {
      toast(res.error);
    }
  });
  renderInviteCode();
  renderLinkedAccounts();
  // Role-aware copy in linking strings
  document.querySelectorAll('.role-counterpart').forEach(el => {
    el.textContent = state.role === 'tutor' ? 'student' : 'tutor';
  });
}

function renderInviteCode(){
  const el = document.getElementById('invite-code-display');
  if (el) el.textContent = state.inviteCode || '——————';
}

async function renderLinkedAccounts(){
  const wrap = document.getElementById('linked-list');
  if (!wrap) return;
  const partners = [];
  if (state.role === 'student' && state.linkedTutorUid) partners.push(state.linkedTutorUid);
  if (state.role === 'tutor') partners.push(...(state.students || []));
  if (!partners.length) {
    wrap.innerHTML = `<div style="font-size:var(--fs-12);color:var(--text-4);font-style:italic">No one linked yet.</div>`;
    return;
  }
  // Fetch usernames for display
  const rows = await Promise.all(partners.map(async pid => {
    try {
      const snap = await window.db.collection('users').doc(pid).get();
      const data = snap.exists ? snap.data() : null;
      return { uid: pid, username: data?.username || '—', role: data?.role || '?' };
    } catch (e) { return { uid: pid, username: '(inaccessible)', role: '?' }; }
  }));
  wrap.innerHTML = rows.map(r => `
    <div style="display:flex;justify-content:space-between;align-items:center;background:var(--surface-2);border:1px solid var(--hairline);border-radius:var(--r-sm);padding:8px 12px;margin-top:4px">
      <span style="font-size:var(--fs-13);color:var(--text)"><strong>${escapeHtml(r.username)}</strong> <span style="color:var(--text-4);font-size:var(--fs-11);text-transform:uppercase;letter-spacing:.06em;margin-left:6px">${r.role}</span></span>
      <button class="le-del" data-unlink="${r.uid}" aria-label="Unlink">✕</button>
    </div>
  `).join('');
  wrap.querySelectorAll('[data-unlink]').forEach(b => b.addEventListener('click', async () => {
    if (!confirm('Unlink this account?')) return;
    await unlinkPartner(b.dataset.unlink);
    renderLinkedAccounts();
    toast('Unlinked');
  }));
}

function exportData(){
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `adi-study-${todayKey()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Exported ✓');
}

function importData(e){
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!confirm('Replace current data with imported backup? This cannot be undone.')) return;
      state = Object.assign(defaultState(), data);
      renderAll(); save();
      toast('Imported ✓');
    } catch(err) { toast('Invalid file'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function resetData(){
  if (!confirm('Wipe ALL data on this device AND in the cloud?')) return;
  if (!confirm('Really sure? This is permanent.')) return;
  state = defaultState();
  saveLocal();
  if (uid && window.db) {
    window.db.collection('users').doc(uid).set(state).then(() => location.reload());
  } else {
    location.reload();
  }
}

/* =========================================================================
   UTILITIES
   ========================================================================= */
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

function animateNumber(el, target){
  if (!el) return;
  const start = parseInt(el.textContent) || 0;
  const t0 = performance.now();
  const dur = 500;
  function step(now){
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(start + (target - start) * e);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function confetti(){
  const cf = document.createElement('div');
  cf.className = 'confetti';
  const colors = ['#ff4422','#ffc933','#33d4c4','#ff7755','#ffaa22'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'cf-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = '-20px';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDelay = Math.random() * 0.3 + 's';
    p.style.animationDuration = (1.8 + Math.random() * 1.2) + 's';
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    cf.appendChild(p);
  }
  document.body.appendChild(cf);
  setTimeout(() => cf.remove(), 3500);
}

function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* =========================================================================
   ENTRY
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  loadLocal();
  initAuth();
  // service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
});
