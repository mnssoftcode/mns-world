export interface JaipurTask {
  id: string;
  text: string;
  tag: "tech" | "ielts" | "interview" | "career" | "setup" | "food" | "health" | "budget" | "jaipur" | "weekly" | "living";
}

export interface JaipurWeek {
  id: string;
  title: string;
  subtitle: string;
  tasks: JaipurTask[];
}

export interface JaipurModulePlan {
  id: string;
  title: string;
  subtitle: string;
  isLiving?: boolean;
  weeks: JaipurWeek[];
}

export interface JaipurRoutineItem {
  time: string;
  category: "sleep" | "gym" | "living" | "tech" | "ielts" | "interview" | "free" | "jaipur" | "relax" | "habit" | "health";
  task: string;
  duration: string;
}

export interface JaipurContacts {
  landlord: string;
  water: string;
  chemist: string;
  gym: string;
  wifi: string;
  rent: string;
}

export interface JaipurCustomTask {
  id: string;
  text: string;
  category: "setup" | "food" | "health" | "budget" | "jaipur" | "weekly" | "custom";
  done: boolean;
  createdAt: number;
}

export const JAIPUR_ROUTINE: JaipurRoutineItem[] = [
  { time: "10:00 PM – 5:00 AM", category: "sleep", task: "Deep Sleep • Phone away at 9:30 PM", duration: "7h" },
  { time: "5:00 – 5:20 AM", category: "health", task: "Wake up, 500ml water, freshen up", duration: "20m" },
  { time: "5:20 – 6:20 AM", category: "gym", task: "Serious exercise / gym workout", duration: "1h" },
  { time: "6:20 – 7:50 AM", category: "living", task: "Cooking + high-protein breakfast + lunch prep", duration: "1.5h" },
  { time: "7:50 – 8:20 AM", category: "living", task: "Shower + get ready + clean room reset", duration: "30m" },
  { time: "8:20 – 11:20 AM", category: "tech", task: "AI/ML Deep Work • Zero distraction", duration: "3h" },
  { time: "11:20 – 11:50 AM", category: "health", task: "Break + hydrate + stretch", duration: "30m" },
  { time: "11:50 AM – 1:50 PM", category: "ielts", task: "IELTS Preparation • Listening/Reading/Writing/Speaking", duration: "2h" },
  { time: "1:50 – 2:35 PM", category: "living", task: "Nutritious lunch + rest / quick power nap", duration: "45m" },
  { time: "2:35 – 4:35 PM", category: "interview", task: "AI/ML Interview Preparation • Out loud practice", duration: "2h" },
  { time: "4:35 – 5:00 PM", category: "free", task: "Personal / free time & unwind", duration: "25m" },
  { time: "5:00 – 5:30 PM", category: "jaipur", task: "Outside walk / Jaipur fresh air / social", duration: "30m" },
  { time: "5:30 – 6:00 PM", category: "free", task: "Call family & friends / tea break", duration: "30m" },
  { time: "6:00 – 7:30 PM", category: "living", task: "Cooking + dinner + English speaking practice", duration: "1.5h" },
  { time: "7:30 – 9:30 PM", category: "relax", task: "Enjoyment / explore Jaipur / friends / gaming", duration: "2h" },
  { time: "9:30 – 10:00 PM", category: "habit", task: "Reading a good book (zero blue light)", duration: "30m" },
];

export const JAIPUR_RULES = [
  "Don't start random projects — focus strictly on depth, metrics, and interview proof.",
  "Learn → Code → Solve → Explain out loud in English.",
  "Keep the 5:20 AM morning workout non-negotiable every single day.",
  "Strict boundary: No heavy studying after 7:30 PM dinner.",
  "Use evenings to walk, breathe, connect socially, and truly live in Jaipur.",
  "Sleep 7 hours every night: deep rest is your ultimate competitive edge.",
  "Eat high protein and cook clean meals — biological energy drives cognitive stamina."
];

// Study Curriculum Plan (Months 1 to 3)
export const STUDY_CURRICULUM: JaipurModulePlan[] = [
  {
    id: "m1",
    title: "Month 1 — Build the Foundation",
    subtitle: "Create the system, establish IELTS level, and strengthen AI/ML fundamentals.",
    weeks: [
      {
        id: "w1",
        title: "Week 1",
        subtitle: "Python deeply + diagnostic + daily routine lock-in",
        tasks: [
          { id: "m1-w1-1", tag: "tech", text: "AI/ML: Python deeply — functions, classes, modules, exceptions, file handling." },
          { id: "m1-w1-2", tag: "tech", text: "AI/ML: OOP fundamentals and Git/GitHub basics." },
          { id: "m1-w1-3", tag: "ielts", text: "IELTS: Take a diagnostic/level test and identify weak modules." },
          { id: "m1-w1-4", tag: "ielts", text: "IELTS: Start Listening and Speaking practice." },
          { id: "m1-w1-5", tag: "interview", text: "Interview: Python/OOP questions; answer technical questions out loud." },
          { id: "m1-w1-6", tag: "health", text: "Body: Complete the planned morning workout consistently." },
          { id: "m1-w1-7", tag: "living", text: "Life: Learn your basic Jaipur grocery/cooking/room routine." }
        ]
      },
      {
        id: "w2",
        title: "Week 2",
        subtitle: "Data foundations + IELTS basics",
        tasks: [
          { id: "m1-w2-1", tag: "tech", text: "AI/ML: NumPy fundamentals and hands-on exercises." },
          { id: "m1-w2-2", tag: "tech", text: "AI/ML: Pandas, data cleaning, preprocessing, and visualization." },
          { id: "m1-w2-3", tag: "ielts", text: "IELTS: Reading fundamentals + Listening practice." },
          { id: "m1-w2-4", tag: "ielts", text: "IELTS: Vocabulary and grammar habit." },
          { id: "m1-w2-5", tag: "interview", text: "Interview: Python coding + SQL basics." },
          { id: "m1-w2-6", tag: "health", text: "Body: Track workout consistency and body weight." },
          { id: "m1-w2-7", tag: "jaipur", text: "Life: Explore one new place in Jaipur." }
        ]
      },
      {
        id: "w3",
        title: "Week 3",
        subtitle: "Statistics + communication",
        tasks: [
          { id: "m1-w3-1", tag: "tech", text: "AI/ML: Statistics — mean, variance, distributions, correlation." },
          { id: "m1-w3-2", tag: "tech", text: "AI/ML: Probability fundamentals and practical data interpretation." },
          { id: "m1-w3-3", tag: "ielts", text: "IELTS: Writing + Speaking practice." },
          { id: "m1-w3-4", tag: "ielts", text: "IELTS: Continue Listening/Reading under light time pressure." },
          { id: "m1-w3-5", tag: "interview", text: "Interview: Statistics questions + explain concepts in simple English." },
          { id: "m1-w3-6", tag: "health", text: "Body: Keep progressive training and adequate food/recovery." },
          { id: "m1-w3-7", tag: "jaipur", text: "Life: Spend an evening outside without turning it into study time." }
        ]
      },
      {
        id: "w4",
        title: "Week 4",
        subtitle: "Classical ML",
        tasks: [
          { id: "m1-w4-1", tag: "tech", text: "AI/ML: Regression and classification." },
          { id: "m1-w4-2", tag: "tech", text: "AI/ML: Decision trees, Random Forests, train/validation/test." },
          { id: "m1-w4-3", tag: "tech", text: "AI/ML: Cross-validation and model evaluation metrics." },
          { id: "m1-w4-4", tag: "ielts", text: "IELTS: Mixed timed practice and review weak areas." },
          { id: "m1-w4-5", tag: "interview", text: "Interview: ML fundamentals + project explanation practice." },
          { id: "m1-w4-6", tag: "health", text: "Body: Review training consistency and adjust only what is necessary." },
          { id: "m1-w4-7", tag: "jaipur", text: "Life: Establish a few favorite Jaipur places/routes." }
        ]
      }
    ]
  },
  {
    id: "m2",
    title: "Month 2 — Build Real AI/ML Ability",
    subtitle: "Move from fundamentals into deep learning, modern AI, and stronger interview evidence.",
    weeks: [
      {
        id: "w5",
        title: "Week 5",
        subtitle: "Neural networks",
        tasks: [
          { id: "m2-w5-1", tag: "tech", text: "AI/ML: Neural networks, forward propagation, loss, backpropagation." },
          { id: "m2-w5-2", tag: "tech", text: "AI/ML: Optimizers and training fundamentals." },
          { id: "m2-w5-3", tag: "ielts", text: "IELTS: Regular timed Listening and Reading practice." },
          { id: "m2-w5-4", tag: "ielts", text: "IELTS: Multiple Writing/Speaking tasks with correction." },
          { id: "m2-w5-5", tag: "interview", text: "Interview: ML theory + Python coding." },
          { id: "m2-w5-6", tag: "health", text: "Body: Keep the 1-hour morning training schedule." }
        ]
      },
      {
        id: "w6",
        title: "Week 6",
        subtitle: "PyTorch & Flagship Portfolio",
        tasks: [
          { id: "m2-w6-1", tag: "tech", text: "AI/ML: PyTorch datasets, models, training loops, evaluation." },
          { id: "m2-w6-2", tag: "tech", text: "AI/ML: GPU/MPS basics and practical experimentation." },
          { id: "m2-w6-3", tag: "ielts", text: "IELTS: Increase timed practice and speaking simulations." },
          { id: "m2-w6-4", tag: "interview", text: "Interview: Deep learning fundamentals + coding." },
          { id: "m2-w6-5", tag: "tech", text: "Portfolio: Start improving one flagship project's technical presentation." }
        ]
      },
      {
        id: "w7",
        title: "Week 7",
        subtitle: "Computer vision",
        tasks: [
          { id: "m2-w7-1", tag: "tech", text: "AI/ML: CNN fundamentals." },
          { id: "m2-w7-2", tag: "tech", text: "AI/ML: Transfer learning and computer vision workflows." },
          { id: "m2-w7-3", tag: "ielts", text: "IELTS: Continue timed modules + writing/speaking correction." },
          { id: "m2-w7-4", tag: "interview", text: "Interview: CNN/deep learning questions." },
          { id: "m2-w7-5", tag: "tech", text: "Portfolio: Strengthen the Plant Health Detector / CV evidence." },
          { id: "m2-w7-6", tag: "jaipur", text: "Life: Plan at least one enjoyable solo outing." }
        ]
      },
      {
        id: "w8",
        title: "Week 8",
        subtitle: "Modern AI & LLMs",
        tasks: [
          { id: "m2-w8-1", tag: "tech", text: "AI/ML: Embeddings and Transformers." },
          { id: "m2-w8-2", tag: "tech", text: "AI/ML: LLM fundamentals, RAG, vector databases, AI APIs." },
          { id: "m2-w8-3", tag: "ielts", text: "IELTS: Begin regular partial/full mock tests." },
          { id: "m2-w8-4", tag: "interview", text: "Interview: AI/LLM concepts + project deep-dives." },
          { id: "m2-w8-5", tag: "tech", text: "Portfolio: Define the evidence and deployment story for the serious ML/GenAI project if needed." },
          { id: "m2-w8-6", tag: "health", text: "Body: Keep nutrition and training consistent." }
        ]
      }
    ]
  },
  {
    id: "m3",
    title: "Month 3 — Interview + Career Mode",
    subtitle: "Turn what you know into proof, interview performance, and job readiness.",
    weeks: [
      {
        id: "w9",
        title: "Week 9",
        subtitle: "Production ML",
        tasks: [
          { id: "m3-w9-1", tag: "tech", text: "AI/ML: FastAPI, model serving, Docker." },
          { id: "m3-w9-2", tag: "tech", text: "AI/ML: ML pipelines, logging, monitoring." },
          { id: "m3-w9-3", tag: "ielts", text: "IELTS: Full/partial timed mocks." },
          { id: "m3-w9-4", tag: "interview", text: "Interview: Python + ML + SQL technical questions." },
          { id: "m3-w9-5", tag: "tech", text: "Portfolio: Improve architecture, metrics, deployment, and README for flagship projects." }
        ]
      },
      {
        id: "w10",
        title: "Week 10",
        subtitle: "Deployment + edge AI",
        tasks: [
          { id: "m3-w10-1", tag: "tech", text: "AI/ML: CI/CD and cloud basics." },
          { id: "m3-w10-2", tag: "tech", text: "AI/ML: ONNX and TensorFlow Lite." },
          { id: "m3-w10-3", tag: "ielts", text: "IELTS: Speaking simulations + timed Writing/Reading." },
          { id: "m3-w10-4", tag: "interview", text: "Interview: Deep learning + AI/LLM + project questions." },
          { id: "m3-w10-5", tag: "tech", text: "React Native: Review performance, architecture, TypeScript, native modules, debugging." }
        ]
      },
      {
        id: "w11",
        title: "Week 11",
        subtitle: "Interview simulation",
        tasks: [
          { id: "m3-w11-1", tag: "interview", text: "AI/ML: Explain your projects as if an interviewer is in front of you." },
          { id: "m3-w11-2", tag: "interview", text: "Interview: Coding simulation under time pressure." },
          { id: "m3-w11-3", tag: "interview", text: "Interview: ML theory simulation." },
          { id: "m3-w11-4", tag: "interview", text: "Interview: Project deep-dive simulation." },
          { id: "m3-w11-5", tag: "interview", text: "Interview: Behavioral/communication practice." },
          { id: "m3-w11-6", tag: "ielts", text: "IELTS: Full/partial mock + target weak module." }
        ]
      },
      {
        id: "w12",
        title: "Week 12",
        subtitle: "Career readiness",
        tasks: [
          { id: "m3-w12-1", tag: "career", text: "Career: Prepare AI/ML Engineer resume." },
          { id: "m3-w12-2", tag: "career", text: "Career: Prepare AI Software Engineer / Applied AI resume." },
          { id: "m3-w12-3", tag: "career", text: "Career: Keep React Native resume ready as the bridge/backup profile." },
          { id: "m3-w12-4", tag: "career", text: "Career: Clean GitHub and pin strongest repositories." },
          { id: "m3-w12-5", tag: "career", text: "Career: Polish LinkedIn, portfolio, and project case studies." },
          { id: "m3-w12-6", tag: "ielts", text: "IELTS: Final readiness assessment and exam decision." },
          { id: "m3-w12-7", tag: "interview", text: "Interview: Run several complete mock interview sessions." },
          { id: "m3-w12-8", tag: "living", text: "Life: Review the 90 days — skills, body, independence, and life experience." }
        ]
      }
    ]
  }
];

// 3-Month Living & Relocation Journey Plan
export const LIVING_JOURNEY_PLAN: JaipurModulePlan = {
  id: "living",
  title: "3-Month Jaipur Living & Journey Preparation",
  subtitle: "Master your independent living system: relocation setup, cooking, gym, budget, Jaipur life & transition.",
  isLiving: true,
  weeks: [
    {
      id: "p0",
      title: "Phase 0 — Pre-Arrival & Departure Prep",
      subtitle: "Travel booking, luggage packing, essential documents, and budget allocation",
      tasks: [
        { id: "liv-p0-1", tag: "setup", text: "Documents: Carry physical Aadhaar, PAN, marksheets, degree certificates & 10+ passport photos." },
        { id: "liv-p0-2", tag: "setup", text: "Digital: Save encrypted cloud backups of all identity docs, passport, and CV to Google Drive/DigiLocker." },
        { id: "liv-p0-3", tag: "setup", text: "Gear & Electronics: Pack laptop, charger, surge protector extension spike, mouse, cables & power bank." },
        { id: "liv-p0-4", tag: "setup", text: "Clothing: Pack 4-5 gym workout outfits, casual wear, comfortable walking shoes & towels." },
        { id: "liv-p0-5", tag: "budget", text: "Finance: Allocate ₹20,000–₹30,000 setup liquidity for deposit, advance rent, utensils & initial groceries." },
        { id: "liv-p0-6", tag: "setup", text: "Mobility: Download offline Google Maps of Jaipur and install Rapido, Uber, Ola, Zomato, Swiggy, Blinkit/Zepto." }
      ]
    },
    {
      id: "p1",
      title: "Phase 1 — Jaipur Room & Workstation Setup",
      subtitle: "Inspect room, finalize rent agreement, install Wi-Fi, and build deep work desk",
      tasks: [
        { id: "liv-p1-1", tag: "setup", text: "Room Inspection: Visit 2-3 shortlisted rooms (check sunlight, natural ventilation, quietness, mobile 5G network)." },
        { id: "liv-p1-2", tag: "setup", text: "Agreement: Finalize rent terms, clear security deposit conditions & note electricity sub-meter initial reading." },
        { id: "liv-p1-3", tag: "setup", text: "Internet: Install high-speed fiber Wi-Fi (50–100 Mbps) & confirm phone 5G hotspot works as fallback." },
        { id: "liv-p1-4", tag: "setup", text: "Deep Work Desk: Set up sturdy desk, ergonomic chair, laptop stand, mousepad and surge power strip." },
        { id: "liv-p1-5", tag: "setup", text: "Lighting & Air: Ensure good warm desk lighting for evening focus and comfortable room fan/air ventilation." },
        { id: "liv-p1-6", tag: "setup", text: "Security & Keys: Get duplicate room key made; keep original and spare in separate secure pockets." }
      ]
    },
    {
      id: "p2",
      title: "Phase 2 — Kitchen, Nutrition & Water Setup",
      subtitle: "Cookware procurement, clean water supply, and pantry staples",
      tasks: [
        { id: "liv-p2-1", tag: "food", text: "Cooking Gear: Procure induction cooktop (or single gas burner + cylinder) and test electrical outlet." },
        { id: "liv-p2-2", tag: "food", text: "Essential Cookware: Get 2–3L pressure cooker, non-stick/cast-iron pan, kadai, spatula, cutting board & knife." },
        { id: "liv-p2-3", tag: "food", text: "Tableware: Buy 2 plates, 2 bowls, spoons, fork, tea mug, water bottle & scrubber/dish soap." },
        { id: "liv-p2-4", tag: "food", text: "Clean Drinking Water: Setup recurring 20L RO water jar delivery supplier (or water filter subscription)." },
        { id: "liv-p2-5", tag: "food", text: "Pantry Staples: Stock oats, eggs, paneer, brown rice, yellow/red dal, salt, turmeric, spices & cooking oil." },
        { id: "liv-p2-6", tag: "food", text: "Fresh Produce: Find nearest local vegetable mandi/thela and dairy store for fresh daily milk/curd/eggs." }
      ]
    },
    {
      id: "p3",
      title: "Phase 3 — Gym & IELTS Coaching Registration",
      subtitle: "Lock in morning workout facility and local IELTS test center/batch",
      tasks: [
        { id: "liv-p3-1", tag: "health", text: "Gym Hunt: Visit 2–3 nearby gyms within 10-15 min walking distance (check equipment & morning crowd)." },
        { id: "liv-p3-2", tag: "health", text: "Gym Membership: Negotiate and lock in a 3-month membership; confirm 5:20 AM early morning opening." },
        { id: "liv-p3-3", tag: "setup", text: "IELTS Coaching: Visit Jaipur IELTS coaching institute; take diagnostic test & collect prep materials." },
        { id: "liv-p3-4", tag: "health", text: "Medical Pharmacy: Locate nearest 24/7 chemist & clinic; buy emergency kit (paracetamol, ORS, band-aids, antacid)." }
      ]
    },
    {
      id: "p4",
      title: "Month 1 Living System — Foundation & Habits",
      subtitle: "Build effortless cooking rhythm, morning wakeups, budget control & Jaipur orientation",
      tasks: [
        { id: "liv-p4-1", tag: "health", text: "Sleep Discipline: Lock in 10:00 PM sleep and 5:00 AM alarm without hitting snooze 6 days a week." },
        { id: "liv-p4-2", tag: "food", text: "Cooking Rhythm: Master 6:20 AM breakfast & lunch cooking in under 75 mins (eggs/oats/dal)." },
        { id: "liv-p4-3", tag: "budget", text: "Budget Control: Record every daily expense; cap weekly food & personal spending at ₹2,500." },
        { id: "liv-p4-4", tag: "setup", text: "Room Discipline: 10-min morning bed making + 15-min nightly desk reset before bed." },
        { id: "liv-p4-5", tag: "setup", text: "Hydration Habit: Drink 3.5 to 4 liters of clean water daily to stay sharp in Jaipur climate." },
        { id: "liv-p4-6", tag: "jaipur", text: "Jaipur Grounding: Take an evening walk/jog in Central Park Jaipur." },
        { id: "liv-p4-7", tag: "jaipur", text: "Jaipur Grounding: Visit Albert Hall Museum / Ram Niwas Garden during a weekend evening off." },
        { id: "liv-p4-8", tag: "setup", text: "Focus Haven: Find 1 quiet study cafe or library in Jaipur for weekend deep work." }
      ]
    },
    {
      id: "p5",
      title: "Month 2 Living System — Optimization & Stamina",
      subtitle: "Meal prep efficiency, progressive overload, sleep hygiene & mental wellness",
      tasks: [
        { id: "liv-p5-1", tag: "health", text: "Workout Progression: Increase weights/reps in morning gym; log body weight & stamina weekly." },
        { id: "liv-p5-2", tag: "food", text: "High-Protein Nutrition: Ensure 100g+ daily protein intake (eggs, paneer, soya, dal, chicken) for cognitive stamina." },
        { id: "liv-p5-3", tag: "food", text: "Cooking Optimization: Streamline meal prep to under 45 mins with pre-boiled dal and chopped veggies." },
        { id: "liv-p5-4", tag: "health", text: "Mental Wellness: Call family/close friends 3-4 times a week during 5:00–6:00 PM free slot." },
        { id: "liv-p5-5", tag: "weekly", text: "English Speaking Immersion: Practice speaking in English during daily errands, gym, and evening calls." },
        { id: "liv-p5-6", tag: "jaipur", text: "Jaipur Exploration: Watch sunset from Nahargarh Fort or visit Amer Fort on a Sunday." },
        { id: "liv-p5-7", tag: "setup", text: "Deep Clean Reset: Clean room thoroughly, wash AC filter/fan, and review month-end living expenditure." }
      ]
    },
    {
      id: "p6",
      title: "Month 3 Living System — Peak Readiness & Exit Prep",
      subtitle: "Consolidate physical transformation, settle accounts, and prepare next transition",
      tasks: [
        { id: "liv-p6-1", tag: "health", text: "Physical Audit: Compare Day 1 vs Day 80 fitness, posture, body weight, and morning alertness." },
        { id: "liv-p6-2", tag: "setup", text: "Notice Period: Give formal 30-day notice to landlord for security deposit return & handover date." },
        { id: "liv-p6-3", tag: "setup", text: "Overseas Career Dossier: Organize all IELTS results, resumes, GitHub portfolio links, and degree scans." },
        { id: "liv-p6-4", tag: "setup", text: "Account Settlement: Clear final electricity sub-meter bill, return 20L water cans & settle Wi-Fi router." },
        { id: "liv-p6-5", tag: "setup", text: "Kitchen Clearance: Sell, donate, or pack cooking utensils not needed for the next destination." },
        { id: "liv-p6-6", tag: "jaipur", text: "Jaipur Farewell Walk: Celebrate 90 days with your favorite Jaipur local food spot & sunset walk." },
        { id: "liv-p6-7", tag: "setup", text: "90-Day Living Retrospective: Document lessons in self-reliance, cooking, physical strength, and autonomy." }
      ]
    },
    {
      id: "p7",
      title: "Weekly Living Reset Routine (Every Sunday)",
      subtitle: "Repeatable maintenance protocol to keep room, food, and budget completely friction-free",
      tasks: [
        { id: "liv-p7-1", tag: "weekly", text: "Room Deep Clean: Sweep and mop room floor, wipe desk surface, empty dustbin." },
        { id: "liv-p7-2", tag: "weekly", text: "Laundry Cycle: Wash all bedsheets, pillow covers, towels, and gym outfits; iron shirts." },
        { id: "liv-p7-3", tag: "weekly", text: "Pantry & Fridge Audit: Discard old food, wipe cooking counter, restock oats, eggs, and spices." },
        { id: "liv-p7-4", tag: "weekly", text: "Weekly Budget Audit: Check UPI statement and compare weekly spend vs ₹2,500 target." },
        { id: "liv-p7-5", tag: "weekly", text: "Weigh-in & Energy Check: Note Sunday body weight and general energy level." },
        { id: "liv-p7-6", tag: "weekly", text: "Prep Next Week: Plan next week's meals and identify any upcoming coaching or study tests." }
      ]
    }
  ]
};
