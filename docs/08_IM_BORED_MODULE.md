# MnsWorld — I'm Bored Module

## Source of Truth

The initial content comes from the supplied `im-bored.html` source.

Preserved source:
`sources/im-bored-original.html`

The visual system can evolve, but the activity dataset must remain compatible.

## Behavior

Primary action:

**I'm Bored → Give Me Something**

Generation:
- select from active activities
- avoid immediate repeats when possible
- respect category filter
- animate the new card
- show category and count

## Categories

Learn / Think, Build / Create, Physical, Explore, Social, Entertainment, Creative, Life Skills, Adventure, Career, Recharge

## Initial Activity Dataset

| # | Category | Emoji | Activity | Hint |
|---:|---|---|---|---|
| 1 | Learn / Think | 🧠 | Study AI/ML | Spend 25 minutes learning one ML concept. |
| 2 | Learn / Think | 🐍 | Solve Python problems | Solve 3 Python problems without looking at solutions. |
| 3 | Learn / Think | 📚 | Read a technical paper | Read the abstract, figures and conclusion of one paper. |
| 4 | Learn / Think | 📖 | Read a book | Read 10 pages of a book. |
| 5 | Learn / Think | 🇦🇺 | Learn Australian English | Learn 5 Australian expressions or pronunciation patterns. |
| 6 | Learn / Think | 🎯 | Practice IELTS | Do one short IELTS speaking, reading or listening exercise. |
| 7 | Learn / Think | 🎬 | Watch a documentary | Watch one documentary about science, technology, history or society. |
| 8 | Learn / Think | ♟️ | Play chess | Play one chess game or solve 5 puzzles. |
| 9 | Learn / Think | 🔢 | Do Sudoku | Solve one Sudoku. |
| 10 | Learn / Think | ✍️ | Write down ideas | Write 10 ideas for apps, businesses or inventions. |
| 11 | Learn / Think | 🧩 | Solve a hard problem | Pick one problem and work on it for 20 minutes. |
| 12 | Learn / Think | 🔬 | Learn something random | Pick a topic you've never studied and learn its basics. |
| 13 | Build / Create | 💻 | Code | Open your editor and code for 30 minutes. |
| 14 | Build / Create | 🤖 | Build an AI feature | Add one small AI capability to a project. |
| 15 | Build / Create | 📱 | Build a mini app | Create a tiny app you can finish today. |
| 16 | Build / Create | 🌐 | Build a website | Create one polished page for your portfolio or a new idea. |
| 17 | Build / Create | 🧪 | Experiment with an AI model | Run one model locally and test its capabilities. |
| 18 | Build / Create | ⚙️ | Make an automation | Automate one repetitive task in your life. |
| 19 | Build / Create | 🎨 | Create a UI | Design one polished screen in Figma or code. |
| 20 | Build / Create | 🛠️ | Make a useful tool | Build something that solves one tiny personal problem. |
| 21 | Build / Create | 🐙 | Contribute to GitHub | Fix a small issue, improve docs or make a useful PR. |
| 22 | Build / Create | 🐛 | Fix an old bug | Open an old project and eliminate one annoying bug. |
| 23 | Build / Create | 🎲 | Create something for fun | Build something with no business purpose at all. |
| 24 | Build / Create | 🚀 | Work on Kodix Labs | Make one concrete improvement to Kodix Labs. |
| 25 | Physical | 🚶 | Walk | Go for a 20–30 minute walk without scrolling. |
| 26 | Physical | 🏃 | Run | Go for a short run. |
| 27 | Physical | 🏋️ | Gym | Do a focused gym session. |
| 28 | Physical | 🤸 | Home workout | Do 15–20 minutes of bodyweight exercises. |
| 29 | Physical | 🧘 | Stretch | Do a 10-minute full-body stretch. |
| 30 | Physical | 🚴 | Cycle | Take your bicycle somewhere you've never ridden before. |
| 31 | Physical | ⚽ | Play football | Find people and play a casual game. |
| 32 | Physical | 🏏 | Play cricket | Play cricket with friends or a local group. |
| 33 | Physical | 🏸 | Play badminton | Play a few games of badminton. |
| 34 | Physical | 🏊 | Swim | Go swimming if you have access to a pool. |
| 35 | Physical | 🥾 | Hike | Find a nearby trail and hike it. |
| 36 | Physical | ☀️ | Get sunlight | Spend 15–20 minutes outside in daylight. |
| 37 | Explore | ☕ | Visit a café | Go somewhere you've never tried and sit there for an hour. |
| 38 | Explore | 📚 | Visit a library | Spend an hour browsing books or working quietly. |
| 39 | Explore | 🌳 | Visit a park | Take a slow walk and sit somewhere peaceful. |
| 40 | Explore | 🏛️ | Visit a museum | Explore a museum you've never visited. |
| 41 | Explore | 🎨 | Visit an art gallery | Look at art without rushing. |
| 42 | Explore | 🛍️ | Explore a market | Walk through a local market and discover something new. |
| 43 | Explore | 📸 | Take photos | Go outside and photograph 10 interesting things. |
| 44 | Explore | 🍜 | Try local food | Try a food or restaurant you've never tried. |
| 45 | Explore | 🗺️ | Explore a new neighborhood | Pick an unfamiliar area and walk around safely. |
| 46 | Explore | 🚆 | Take a day trip | Visit a nearby town or attraction. |
| 47 | Social | 📞 | Call family | Call someone you care about and actually talk. |
| 48 | Social | 👋 | Call a friend | Call a friend instead of texting. |
| 49 | Social | ☕ | Meet a friend | Ask someone to meet for coffee. |
| 50 | Social | 🤝 | Invite someone out | Invite someone for food, coffee or a walk. |
| 51 | Social | 🏟️ | Join a sports club | Find a recurring sports group. |
| 52 | Social | 🎓 | Join a meetup | Attend a local technology, hobby or interest meetup. |
| 53 | Social | 🧑‍🏫 | Attend a workshop | Learn something with other people. |
| 54 | Social | 👥 | Meet coworkers or classmates | Start a real conversation with someone you normally only greet. |
| 55 | Social | 🌱 | Make a new friend | Talk to someone new and find one shared interest. |
| 56 | Social | 🎮 | Play multiplayer games | Play with friends rather than alone. |
| 57 | Entertainment | 🎬 | Watch a movie | Pick a movie you've never seen and actually watch it. |
| 58 | Entertainment | 📺 | Watch a TV series | Watch one episode guilt-free. |
| 59 | Entertainment | ▶️ | Watch YouTube | Choose something genuinely interesting rather than endless scrolling. |
| 60 | Entertainment | 🎤 | Watch stand-up comedy | Watch a full stand-up special. |
| 61 | Entertainment | 🎵 | Listen to music | Put your phone away and listen to an album from start to finish. |
| 62 | Entertainment | 🎧 | Discover new artists | Find 5 artists you've never heard before. |
| 63 | Entertainment | 🎮 | Play a game | Play a game for a defined amount of time. |
| 64 | Entertainment | 🏆 | Watch sports | Watch a match or highlights. |
| 65 | Entertainment | 🎙️ | Listen to a podcast | Choose one episode around a topic you care about. |
| 66 | Entertainment | 🎤 | Watch an interview | Watch a long-form interview with an interesting person. |
| 67 | Creative | 📷 | Photography | Go outside and create a small photo series. |
| 68 | Creative | 🎞️ | Edit a video | Make a 30–60 second video from footage you already have. |
| 69 | Creative | ✏️ | Draw | Draw anything for 20 minutes. |
| 70 | Creative | 🖼️ | Make digital art | Create one small digital artwork. |
| 71 | Creative | 🎨 | Design something | Make a poster, logo, interface or visual experiment. |
| 72 | Creative | 🎹 | Make music | Experiment with a beat or melody. |
| 73 | Creative | 🎸 | Learn an instrument | Learn one chord, scale or short song. |
| 74 | Creative | 🎤 | Sing | Sing along to a few songs. |
| 75 | Creative | 📝 | Write | Write a short story, thought, scene or article. |
| 76 | Creative | 🎥 | Make a short video | Create something and publish it or keep it for yourself. |
| 77 | Creative | 🧱 | Build something physical | Make or repair something with your hands. |
| 78 | Life Skills | 🍳 | Cook a new meal | Find a recipe and make it yourself. |
| 79 | Life Skills | 🧹 | Clean your room | Set a 20-minute timer and reset your space. |
| 80 | Life Skills | 🗂️ | Organize your desk | Remove everything unnecessary and rebuild your workspace. |
| 81 | Life Skills | 🧺 | Do laundry | Finish your laundry instead of postponing it. |
| 82 | Life Skills | 🛒 | Go grocery shopping | Plan 3 meals and buy only what you need. |
| 83 | Life Skills | 🥗 | Meal prep | Prepare food for tomorrow. |
| 84 | Life Skills | 💰 | Learn budgeting | Review your spending and make a simple monthly budget. |
| 85 | Life Skills | 📊 | Track expenses | Record everything you spent this week. |
| 86 | Life Skills | 🗓️ | Plan your week | Write the 3 most important things for the next 7 days. |
| 87 | Life Skills | 🏠 | Improve your room | Make one small improvement to your living space. |
| 88 | Life Skills | 🔧 | Learn basic repairs | Learn how to fix one common household problem. |
| 89 | Adventure | 🌅 | Watch sunrise | Wake up early and watch the sunrise somewhere peaceful. |
| 90 | Adventure | 🌇 | Watch sunset | Find a good viewpoint and watch the sunset. |
| 91 | Adventure | 🎒 | Go somewhere spontaneously | Choose a safe destination and go without overplanning. |
| 92 | Adventure | 🚌 | Take public transport somewhere new | Get off at a place you've never explored. |
| 93 | Adventure | 🏕️ | Go camping | Plan a safe overnight camping trip. |
| 94 | Adventure | 🚗 | Take a road trip | Drive somewhere interesting for the day. |
| 95 | Adventure | 🎪 | Attend an event | Find a local event, festival or exhibition. |
| 96 | Adventure | 🏄 | Try a new sport | Try something you've never done before. |
| 97 | Career | 📄 | Improve your CV | Make one concrete improvement to your resume. |
| 98 | Career | 🐙 | Improve GitHub | Clean up a repo, README or project documentation. |
| 99 | Career | 💼 | Improve your portfolio | Add one strong project or case study. |
| 100 | Career | 📨 | Apply for a job | Submit one targeted application. |
| 101 | Career | 🧑‍💼 | Talk to a recruiter | Reach out to one relevant recruiter. |
| 102 | Career | 🔎 | Research companies | Find 5 companies hiring AI/ML engineers. |
| 103 | Career | 🎯 | Practice interviews | Answer 5 technical interview questions aloud. |
| 104 | Career | 💻 | Practice coding interviews | Solve one timed coding problem. |
| 105 | Career | 🔗 | Improve LinkedIn | Update one section or add a project. |
| 106 | Career | ☁️ | Learn cloud | Deploy or learn one cloud concept. |
| 107 | Career | 🚀 | Deploy a project | Put one project online. |
| 108 | Career | ⚙️ | Learn MLOps | Study and implement one MLOps practice. |
| 109 | Recharge | 🚿 | Take a shower | Reset your body and environment. |
| 110 | Recharge | 🌿 | Take a slow walk | Walk without trying to achieve anything. |
| 111 | Recharge | 🌳 | Sit outside | Sit somewhere quiet and let your brain rest. |
| 112 | Recharge | 🎵 | Listen to music | Listen without multitasking. |
| 113 | Recharge | 📞 | Call someone | Have a relaxed conversation. |
| 114 | Recharge | 😂 | Watch something funny | Give yourself permission to simply enjoy it. |
| 115 | Recharge | 😴 | Take a nap | If you're genuinely tired, sleep. |
| 116 | Recharge | 🍲 | Cook something | Make a simple meal and enjoy the process. |
| 117 | Recharge | 📵 | Put your phone away | Spend 20 minutes without your phone. |
| 118 | Recharge | 🌙 | Go to bed early | Sometimes boredom is actually fatigue. |

## Future Activity Schema

The future-compatible shape is:

- `id`
- `category`
- `emoji`
- `title`
- `hint`
- `key`
- `enabled`

Optional later metadata:
- tags
- durationMinutes
- indoorOutdoor
- energyLevel
- socialLevel
- difficulty

Future features:
- favorites
- history
- "not interested"
- filters
- custom activities
- challenge mode
- AI-generated suggestions

Do not add these until the core interaction is stable.
