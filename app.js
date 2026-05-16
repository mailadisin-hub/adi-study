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
    v: 2,
    grades: {},                  // {mg_m,mp_m,mg_f,mp_f,mg_p,mp_p}
    topics: {},                  // {'maths_3_0': {d:1, t:ts, c:1-5}}  c = confidence
    xp: 0,
    dayMinutes: {},              // {'2026-05-14': 210}
    logs: [],                    // [{id,date,hours,mood,subj,notes,topics}]
    papers: [],                  // [{id,date,subject,paperRef,score,maxScore,pct,grade,notes}]
    pomo: {work:25, short:5, long:15, before:4},
    pomoToday: {date:'', completed:0, minutes:0},
    pomoTotal: 0,                // lifetime completed pomodoros
    freezes: 0,                  // available streak freezes
    freezesEarned: 0,            // total ever earned (prevents double-award)
    shieldedDays: [],            // ['2026-05-13'] — days protected by freeze
    achievements: [],            // ['streak_3', ...]
    theme: 'dark',
    updatedAt: 0,
  };
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

function save(){
  checkAchievements();
  saveLocal();
  if (saveTimer) clearTimeout(saveTimer);
  setSync('syncing');
  saveTimer = setTimeout(() => {
    if (uid && !suppressSync && window.db) {
      window.db.collection('users').doc(uid).set(state, {merge:false})
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
    firebase.firestore().enablePersistence({synchronizeTabs:true}).catch(()=>{});
  } catch(e) { console.error(e); }

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      uid = user.uid;
      document.getElementById('user-email-label').textContent = user.email || '';
      document.getElementById('gate').style.display = 'none';
      document.getElementById('app').classList.add('ready');
      attachCloud();
      bootApp();
    } else {
      uid = null;
      if (unsubscribe) { unsubscribe(); unsubscribe = null; }
      document.getElementById('gate').style.display = 'flex';
      document.getElementById('app').classList.remove('ready');
    }
  });

  document.getElementById('g-btn').addEventListener('click', signIn);
  document.getElementById('g-create').addEventListener('click', signUp);
  document.getElementById('g-pass').addEventListener('keydown', e => { if (e.key==='Enter') signIn(); });
  document.getElementById('signout-btn').addEventListener('click', () => firebase.auth().signOut());
}

function signIn(){
  const email = document.getElementById('g-email').value.trim();
  const pass = document.getElementById('g-pass').value;
  if (!email || !pass) return showGateError('Email and password required.');
  const btn = document.getElementById('g-btn');
  btn.disabled = true; btn.textContent = 'Signing in…';
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .catch(err => showGateError(prettyAuthError(err)))
    .finally(() => { btn.disabled=false; btn.textContent='Sign In'; });
}

function signUp(){
  const email = document.getElementById('g-email').value.trim();
  const pass = document.getElementById('g-pass').value;
  if (!email || !pass) return showGateError('Enter email and password to create account.');
  if (pass.length < 6) return showGateError('Password must be at least 6 characters.');
  const btn = document.getElementById('g-btn');
  btn.disabled = true; btn.textContent = 'Creating…';
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(err => showGateError(prettyAuthError(err)))
    .finally(() => { btn.disabled=false; btn.textContent='Sign In'; });
}

function showGateError(msg){ document.getElementById('g-err').textContent = msg; }

function prettyAuthError(err){
  const code = err.code || '';
  if (code.includes('user-not-found')) return 'No account with that email. Click "Create account".';
  if (code.includes('wrong-password') || code.includes('invalid-credential')) return 'Wrong password.';
  if (code.includes('email-already-in-use')) return 'Email already registered — sign in instead.';
  if (code.includes('invalid-email')) return 'That email looks invalid.';
  if (code.includes('network')) return 'Network error — check your connection.';
  return err.message || 'Authentication error.';
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
    if (e.target.matches('input, textarea, select')) return;
    if (e.key === 'Escape') toggleDrawer(false);
    const map = {'1':'dashboard','2':'grades','3':'revision','4':'journal','5':'papers','6':'settings'};
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
  renderSnapshot();
  renderDueList();
  renderDashSubjBars();
  renderHeatmap();
  renderSparkline();
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
function setupPapers(){
  document.getElementById('save-paper-btn').addEventListener('click', savePaper);
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
  const entry = { id: Date.now(), date: todayKey(), subject, paperRef, score, maxScore, pct, grade, notes };
  if (!state.papers) state.papers = [];
  state.papers.unshift(entry);
  state.papers = state.papers.slice(0, 200);
  addXP(Math.round(pct / 10), 'past paper');
  document.getElementById('pp-ref').value   = '';
  document.getElementById('pp-score').value = '';
  document.getElementById('pp-max').value   = '';
  document.getElementById('pp-notes').value = '';
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
  cont.innerHTML = state.papers.slice(0, 50).map(p => `
    <div class="log-entry">
      <div class="le-hdr">
        <div class="le-meta">
          <span class="pp-grade-badge" style="color:${gradeColour(p.grade)};border-color:${gradeColour(p.grade)}">${p.grade}</span>
          <span class="le-date">${p.date}</span>
          <span class="le-hrs">${p.score}/${p.maxScore} · ${p.pct}%</span>
          <span class="le-tag">${escapeHtml(p.subject)}</span>
          <span style="color:var(--text3);font-size:12px">${escapeHtml(p.paperRef)}</span>
        </div>
        <button class="le-del" data-pdel="${p.id}" aria-label="Delete">✕</button>
      </div>
      ${p.notes ? `<div class="le-body">${escapeHtml(p.notes)}</div>` : ''}
    </div>
  `).join('');
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
