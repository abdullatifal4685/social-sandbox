const ILETS = ["Introduce", "Listen", "Empathize", "Talk", "Solve"];
const LEARNING_GOALS = [
  {
    id: "surface-risks",
    title: "Deliver Bad News & Surface Risks",
    description: "Speak up early about problems, raise concerns before they escalate, and deliver difficult information without damaging trust",
    scenarios: ["failing-project", "quality-vs-speed"],
  },
  {
    id: "peer-feedback",
    title: "Give Difficult Feedback",
    description: "Address behavior, performance, or attitude issues directly — with a colleague, manager, or direct report — without triggering defensiveness",
    scenarios: ["dominance-in-meetings", "unsafe-shortcut"],
  },
  {
    id: "navigate-authority",
    title: "Speak Up Across Power Levels",
    description: "Communicate confidently with people above or below you — push back on decisions, set expectations, and be heard without overstepping",
    scenarios: ["failing-project", "resource-priority-conflict", "quality-vs-speed"],
  },
  {
    id: "handle-pressure",
    title: "Stay Composed Under Pressure",
    description: "Keep the conversation productive when you're stressed, the other person is reactive, or time and resources are running out",
    scenarios: ["unsafe-shortcut", "resource-priority-conflict"],
  },
  {
    id: "listen-empathize",
    title: "Listen to Understand, Not Just to Reply",
    description: "Ask the right questions, reflect back what you hear, and acknowledge emotion — so the other person feels understood before you make your case",
    scenarios: ["failing-project", "dominance-in-meetings", "unsafe-shortcut"],
  },
  {
    id: "provide-options",
    title: "Say No Without Closing the Door",
    description: "Move beyond a flat refusal by offering trade-offs, alternatives, and co-created solutions — keeping momentum even when you can't say yes",
    scenarios: ["resource-priority-conflict", "quality-vs-speed"],
  },
];
const CUSTOM_SCENARIOS_KEY = "sandbox.customScenarios.v1";
const USER_NAME_KEY = "sandbox.userName";
const SCENARIO_OVERRIDES_KEY = "sandbox.scenarioOverrides.v1";
const HIDDEN_SCENARIO_IDS_KEY = "sandbox.hiddenScenarioIds.v1";
const REFLECTION_HISTORY_KEY = "sandbox.reflectionHistory.v1";
const REFLECTION_DRAFTS_KEY = "sandbox.reflectionDrafts.v1";
const IMPROVEMENT_TRACK_KEY = "sandbox.improvementTrack.v1";
const SCAFFOLD_LEVEL_KEY = "sandbox.scaffoldLevel";
const PEER_ROOM_PREFIX = "sandbox.peer.room.";
const PEER_USER_ID_KEY = "sandbox.peer.userId";
const PEER_REQUESTS_KEY = "sandbox.peer.requests.v1";
const PEER_SESSION_HISTORY_KEY = "sandbox.peer.sessionHistory.v1";
const PRACTICE_SESSIONS_KEY = "sandbox.practiceSessions.v1";
const CURRENT_SESSION_ANALYSIS_KEY = "sandbox.currentSessionAnalysis.v1";

const SCAFFOLD_LEVELS = {
  1: {
    label: "Level 1: Fully Guided",
    summary: "Scenario Catalyst, sentence starters, and coach support are always visible.",
  },
  2: {
    label: "Level 2: Assisted",
    summary: "Scenario Catalyst stays visible, but hints fade unless you request them.",
  },
  3: {
    label: "Level 3: Independent",
    summary: "Scenario Catalyst stays visible, while sentence starters and live prompts stay off.",
  },
};

const MODULE_SECTIONS = [
  {
    title: "1. Notice What Makes the Conversation Hard",
    summary: "A difficult conversation usually feels hard because the stakes, emotions, and relationships are all active at once.",
    points: [
      "Pause and identify what is making this conversation difficult.",
      "Set one intention: solve the issue while preserving respect.",
      "Prepare one opening sentence and one open question.",
    ],
    example:
      "Example: Instead of 'This is a mess', try 'I want us to address two delays before they affect delivery.'",
  },
  {
    title: "2. Start With Shared Intent",
    summary: "Open with common purpose to reduce immediate defensiveness.",
    points: [
      "State why this matters for both sides, not just your side.",
      "Avoid judgment labels in the first minute.",
      "Signal collaboration: 'I want us to improve this together.'",
    ],
    example:
      "Example: 'I value your contribution, and I want us to find a way to keep quality high under this deadline.'",
  },
  {
    title: "3. Listen Before Persuading",
    summary: "Understanding constraints first makes your response more realistic and more credible.",
    points: [
      "Ask one open question before making your argument.",
      "Reflect key pressure points back in neutral language.",
      "Separate facts from interpretation.",
    ],
    example:
      "Example: 'What trade-offs were you balancing when this decision was made?'",
  },
  {
    title: "4. Empathize + Talk With Evidence",
    summary: "Empathy keeps trust; evidence keeps clarity.",
    points: [
      "Acknowledge pressure without dropping the core issue.",
      "Use behavior-impact wording, not personality attacks.",
      "Anchor your point with one concrete observable example.",
    ],
    example:
      "Example: 'Two milestones slipped, which increases client risk and creates rework for the team.'",
  },
  {
    title: "5. Solve With Commitments",
    summary: "End with clear commitments, not vague agreement.",
    points: [
      "Agree on one immediate action and one owner.",
      "Set a timeline and follow-up checkpoint.",
      "Define what success will look like by that checkpoint.",
    ],
    example:
      "Example: 'Can we align on one recovery action by Friday and review it Monday morning?'",
  },
  {
    title: "6. Reflection and Transfer",
    summary: "Turn one conversation into a repeatable leadership habit.",
    points: [
      "Identify your strongest and weakest ILETS stages.",
      "Capture one sentence you will reuse in real life.",
      "Plan one real conversation where you will apply this structure.",
    ],
    example:
      "Example: 'In my next team conflict, I will start with shared intent before discussing impact.'",
  },
];

const STAGE_GUIDE = {
  Introduce: {
    objective: "Set purpose and psychological safety in one calm sentence.",
    starters: [
      "Thanks for meeting with me. I want to discuss a risk I am seeing.",
      "My goal is to solve this early and keep the project on track.",
    ],
  },
  Listen: {
    objective: "Ask questions first so you understand constraints before arguing.",
    starters: [
      "Can you share what trade-offs led to this decision?",
      "What pressure are you managing right now from your side?",
    ],
  },
  Empathize: {
    objective: "Acknowledge pressure and emotion without dropping the core issue.",
    starters: [
      "I understand this deadline puts a lot of pressure on your team.",
      "I can see why this is frustrating, and I appreciate your openness.",
    ],
  },
  Talk: {
    objective: "State behavior and impact with specific evidence.",
    starters: [
      "I noticed we missed two milestones, which increases client risk.",
      "If this continues, we may face rework and delayed delivery.",
    ],
  },
  Solve: {
    objective: "Agree on actions with owner and follow-up date.",
    starters: [
      "Can we agree on one recovery action for this week and an owner?",
      "Let us set a checkpoint on Friday to review progress together.",
    ],
  },
};

const DEFAULT_SCENARIOS = [
  {
    id: "failing-project",
    title: "Report a Failing Project to Your Manager",
    scenarioType: "hierarchical",
    authorityGap: 3,
    difficulty: "High authority gradient",
    learningObjectives: [
      "Surface risks diplomatically to authority figures",
      "Present data without blame",
      "Maintain credibility while raising concerns",
      "Navigate power dynamics respectfully"
    ],
    context:
      "You are a junior analyst on a 6-month IT modernization project. When the project kicked off three months ago, your senior manager was confident. But behind the scenes, technical debt is worse than expected. Two key milestones have slipped: your integration work is delayed, and the testing phase is now compressed into half the planned time. Your manager still believes the project can deliver on time and has not flagged issues to leadership yet. You have noticed stress rising in the team, and if risks are not surfaced now, delivery quality and team capacity are both at risk. You have a 10-minute sync to raise this carefully.",
    imageUrl: "./assets/scenarios/failing-project.svg",
    aiRole: "Senior Manager",
    opening:
      "You asked for this quick sync. I only have ten minutes, so tell me what you need.",
    goals: [
      "Surface risks without sounding alarmist or blaming",
      "Present facts (milestone slippage and impact) before conclusions",
      "Acknowledge leadership pressure while preserving psychological safety",
      "Propose one actionable recovery option with ownership",
    ],
    silenceMetrics: true,
    practice: {
      Introduce: {
        objective: "Open respectfully, signal shared intent, and set focus.",
        starters: [
          {
            style: "deferential",
            text: "Thanks for the time. I want to raise one delivery risk early so we can protect your timeline and avoid escalation later.",
          },
          {
            style: "balanced",
            text: "I want to flag a project risk now while we still have options. My goal is to help us stay credible on delivery.",
          },
          {
            style: "direct",
            text: "Two milestones slipped and testing is compressed. We need a decision this week on scope, timeline, or resources.",
          },
        ],
      },
      Listen: {
        objective: "Understand their constraints first, then position your evidence.",
        starters: [
          {
            style: "deferential",
            text: "Before I go deeper, can I ask how you are seeing risk from your side and what constraints are most critical right now?",
          },
          {
            style: "balanced",
            text: "What trade-offs are you currently prioritizing: launch date, feature scope, or defect tolerance?",
          },
          {
            style: "direct",
            text: "What is non-negotiable for you right now: timeline, scope, or quality threshold?",
          },
        ],
      },
      Empathize: {
        objective: "Acknowledge pressure while keeping urgency clear.",
        starters: [
          {
            style: "deferential",
            text: "I understand there is pressure from leadership to keep confidence high. I want to support that while helping us avoid avoidable risk.",
          },
          {
            style: "balanced",
            text: "I can see the timeline pressure you are carrying. I am raising this now so we still have room to correct responsibly.",
          },
          {
            style: "direct",
            text: "You are under deadline pressure. If we wait another week, our options narrow and risk goes up.",
          },
        ],
      },
      Talk: {
        objective: "State impact with concrete evidence and no blame.",
        starters: [
          {
            style: "deferential",
            text: "Integration is 2 weeks behind, which compresses testing from 8 weeks to 4. That raises launch defect risk and increases rework exposure.",
          },
          {
            style: "balanced",
            text: "Current data: 2 missed milestones, 3 days of unplanned rework, and reduced test runway. If unchanged, quality and schedule confidence both drop.",
          },
          {
            style: "direct",
            text: "We are outside safe delivery limits. At the current pace, we will miss date or miss quality, likely both.",
          },
        ],
      },
      Solve: {
        objective: "Propose options and secure explicit next-step ownership.",
        starters: [
          {
            style: "deferential",
            text: "Could we choose one path this week: slight scope trim, timeline adjustment, or temporary support? I can draft the option summary for your approval.",
          },
          {
            style: "balanced",
            text: "I suggest we pick one trade-off today and align owners. Can we review progress at a Friday checkpoint?",
          },
          {
            style: "direct",
            text: "Decision needed this week: scope, time, or resources. I will prepare the plan and owner matrix once you choose.",
          },
        ],
      },
    },
  },
  {
    id: "unsafe-shortcut",
    title: "Challenge an Unsafe Shortcut",
    scenarioType: "general",
    difficulty: "Time pressure and blame culture",
    learningObjectives: [
      "Address problems without blame",
      "Acknowledge pressure and constraints",
      "Protect standards while staying empathetic",
      "Collaborate on solutions under stress"
    ],
    context:
      "Your engineering team is racing to hit a quarterly release deadline. A teammate just committed code that bypasses a critical data validation step—a step that catches errors before they reach production. When you ask why, they say, 'We're already late. I'll add it back after launch.' You know this is risky. If bad data slips through, it will create downstream data corruption that's expensive to fix. The team is already stressed, and you don't want to trigger a blame conversation. But you also can't let this pass. You need to address it without making your teammate defensive.",
    imageUrl: "./assets/scenarios/unsafe-shortcut.svg",
    aiRole: "Teammate",
    opening:
      "We are already late. I skipped one check this time. Can we just move on?",
    goals: [
      "Open without blame or accusation",
      "Understand the pressure and constraints they're under",
      "Show empathy while protecting quality standards",
      "Co-create a safer immediate next step (don't just say 'fix it')",
    ],
    silenceMetrics: false,
    practice: {
      Introduce: {
        objective: "Flag the concern clearly without sounding judgmental.",
        starters: [
          { style: "deferential", text: "Can we pause for a minute? I noticed something in the commit and want to check in about it—not in blame, just to make sure we're aligned." },
          { style: "balanced", text: "I saw the validation step was removed. I'm not trying to call you out—I want to understand the decision and make sure we're not risking the data." },
          { style: "direct", text: "The validation bypass could create data corruption downstream. I need to understand why that happened and how we fix it." },
        ],
      },
      Listen: {
        objective: "Ask genuinely about the pressure before arguing.",
        starters: [
          { style: "deferential", text: "What was the biggest pressure you were facing when you made that call? What would have helped?" },
          { style: "balanced", text: "What made you decide to remove it? Was it a time trade-off, or was there a technical reason?" },
          { style: "direct", text: "Why did you remove the validation? What's the timeline you're working against?" },
        ],
      },
      Empathize: {
        objective: "Acknowledge pressure and timeline without dropping the issue.",
        starters: [
          { style: "deferential", text: "I get it—the deadline is real and you're trying to move fast. I appreciate you're under a lot of pressure. And I want to make sure we don't create a bigger problem later." },
          { style: "balanced", text: "I understand the deadline crunch. Corners feel necessary. But a data corruption fix will cost us more time than adding the validation back now." },
          { style: "direct", text: "You're under time pressure. That's real. But data corruption will create technical debt that costs us weeks to fix. We need to solve this now." },
        ],
      },
      Talk: {
        objective: "Explain the concrete business impact of the risk.",
        starters: [
          { style: "deferential", text: "If bad data gets through, we'll spend days debugging downstream systems instead of moving to the next feature. That's a bigger delay than adding validation now." },
          { style: "balanced", text: "One bad record that passes through creates corruption in three downstream systems. Fixing that will take a week. The validation takes an hour now." },
          { style: "direct", text: "Data corruption is a week-long incident response. The validation is a 1-hour fix. We're trading 1 hour today for 5 days later." },
        ],
      },
      Solve: {
        objective: "Agree on a safer path forward that acknowledges the timeline.",
        starters: [
          { style: "deferential", text: "Could we add the validation back and run the data through a quick smoke test? If we work together, I think we can finish in 2 hours instead of the full 4." },
          { style: "balanced", text: "Let's add it back and do a quick burn-down of the blocked tests. Can we sync in 30 min and see where we stand?" },
          { style: "direct", text: "The validation goes back in. Let's test it together right now so we move faster than debating." },
        ],
      },
    },
  },
  {
    id: "dominance-in-meetings",
    title: "Address Meeting Dominance Respectfully",
    scenarioType: "general",
    difficulty: "Cross-team sensitivity",
    learningObjectives: [
      "Give feedback to peers without defensiveness",
      "Name specific behaviors clearly",
      "Preserve relationships while raising concerns",
      "Invite shared ownership of change"
    ],
    context: `You work with a senior peer from another department who regularly dominates meetings. They interrupt people, jump to conclusions quickly, and shut down ideas from junior team members. In the last three meetings, you've watched your team's junior analysts stop offering input. You're not their manager, so you can't direct them. But you can talk to your senior peer. The challenge: they might get defensive, or worse, they might not even realize they're doing it. You want to name the behavior, show respect for their role, and invite them to co-own a solution without making it awkward.`,
    imageUrl: "./assets/scenarios/meeting-dominance.svg",
    aiRole: "Senior Peer",
    opening:
      "I heard you had concerns about our meeting style. What exactly is the issue?",
    goals: [
      "Name the behavior specifically without character attacks",
      "Show respect for their role and intention",
      "Invite their perspective and shared ownership",
      "Agree on one visible behavior change for the next meeting",
    ],
    silenceMetrics: false,
    practice: {
      Introduce: {
        objective: "Lead with respect and shared purpose, not complaint.",
        starters: [
          {
            style: "deferential",
            text: "I value your input a lot, and I want to bring an observation about how our meetings are landing. Would you be open to that?",
          },
          {
            style: "balanced",
            text: "I've noticed something about the meeting dynamic that I think is hurting information flow. I wanted to raise it as a peer because I respect you.",
          },
          {
            style: "direct",
            text: "The meeting format is suppressing junior input. I need to tell you directly because we're losing good ideas.",
          },
        ],
      },
      Listen: {
        objective: "Invite their perspective on the meeting dynamic first.",
        starters: [
          {
            style: "deferential",
            text: "How are you experiencing the meetings? What's your intention when you move through topics quickly?",
          },
          {
            style: "balanced",
            text: "What's your goal in running meetings the way you do? Are you trying to keep things moving, or is there something else driving the pace?",
          },
          {
            style: "direct",
            text: "Why do you interrupt people? What are you optimizing for?",
          },
        ],
      },
      Empathize: {
        objective: "Acknowledge their perspective and role while naming the team effect.",
        starters: [
          {
            style: "deferential",
            text: "I get it—you're trying to be efficient and not waste people's time. That's a strength. And I'm seeing that the pace is making juniors hesitant to speak up.",
          },
          {
            style: "balanced",
            text: "I see you're focused on keeping meetings productive. That matters. But it's also creating a dynamic where only senior voices are heard.",
          },
          {
            style: "direct",
            text: "You're trying to move fast. But you're also creating a chilling effect where junior people don't contribute.",
          },
        ],
      },
      Talk: {
        objective: "Name the specific behavior and team impact with evidence.",
        starters: [
          {
            style: "deferential",
            text: "In the last three meetings, I noticed when the team attempts a thought, it gets cut off. That's happening about every 5-10 minutes. The result is junior people are stopping volunteering ideas.",
          },
          {
            style: "balanced",
            text: "Here's what I'm seeing: when someone starts with an idea, it gets interrupted before they finish. Three junior analysts haven't said anything in the last two meetings. That's lost information.",
          },
          {
            style: "direct",
            text: "You interrupt junior people mid-thought. That's killing their confidence. I watched three people stop contributing last week.",
          },
        ],
      },
      Solve: {
        objective: "Propose a small, visible behavior change and commit together.",
        starters: [
          {
            style: "deferential",
            text: "Would you be open to trying something in the next meeting? Let's give people 30 seconds to finish their thought before responding. See if that changes what we hear?",
          },
          {
            style: "balanced",
            text: "I'd like to suggest a small change for next time: let people finish one complete thought before the discussion moves. Can we try that and see what shifts?",
          },
          {
            style: "direct",
            text: "I'm going to ask you to do one thing in the next meeting: don't interrupt. Let people finish. We'll see what happens.",
          },
        ],
      },
    },
  },
  {
    id: "resource-priority-conflict",
    title: "Resolve a Resource Priority Conflict",
    scenarioType: "hierarchical",
    authorityGap: 2,
    difficulty: "Competing loyalties and scope creep",
    learningObjectives: [
      "Manage scope creep diplomatically",
      "Present capacity constraints clearly",
      "Offer options instead of just saying no",
      "Align priorities across stakeholders"
    ],
    context: `You're a project lead working across two business units. Your primary sponsor told you a month ago that delivery date was fixed. But six weeks in, a more senior leader (not your direct manager) has been requesting increasing scope—new features, reports, data integrations. The problem: each addition adds 1-2 weeks to the timeline, and your team is already stretched. Your original sponsor is now asking why feature X isn't done yet, unaware that the scope has expanded. You need to have a conversation with the senior leader about timeline vs. scope trade-offs. But they outrank you, and you don't want to seem uncooperative or like you're refusing work. How do you raise this without appearing to say no?`,
    imageUrl: "./assets/scenarios/resource-priority.svg",
    aiRole: "Senior Leader (Different Unit)",
    opening: "I've been thinking about next steps. We should add the user dashboard to this release. I know it's late in the cycle, but the stakeholder asked for it. Can you make it work?",
    goals: [
      "Acknowledge the senior leader's request respectfully",
      "Surface the timeline and resource reality clearly",
      "Ask questions about priorities (not just say no)",
      "Propose trade-off options (expand timeline, reduce features, or more resources)",
    ],
    silenceMetrics: true,
    practice: {
      Introduce: {
        objective: "Signal that you want to find a solution, not block.",
        starters: [
          {
            style: "deferential",
            text: "Thank you for thinking about how to expand value. I want to work with you on this. Before I commit, I need to walk you through what we're juggling.",
          },
          {
            style: "balanced",
            text: "I appreciate the feature idea—it's solid. I want to make sure we build it right. Let me show you the current capacity so we can figure out the best path.",
          },
          {
            style: "direct",
            text: "That feature is good work, but we need to talk timeline and scope because we can't do both the original plan and this addition.",
          },
        ],
      },
      Listen: {
        objective: "Understand their priorities before pushing back.",
        starters: [
          {
            style: "deferential",
            text: "Can I ask—is the dashboard critical for the business case, or is it nice-to-have? Understanding your priority will help me figure out the best path.",
          },
          {
            style: "balanced",
            text: "What's driving the urgency on the dashboard? Is it a business requirement, or is it opportunistic?",
          },
          {
            style: "direct",
            text: "How critical is this dashboard to your success metrics? Is it a must-have or a want?",
          },
        ],
      },
      Empathize: {
        objective: "Show you understand the business pressure while being honest.",
        starters: [
          {
            style: "deferential",
            text: "I understand you're under pressure to show value early, and I want to help you succeed. I'm going to be straight with you about what that requires.",
          },
          {
            style: "balanced",
            text: "I know your stakeholders have high expectations. My job is to help you deliver what matters most without breaking the team.",
          },
          {
            style: "direct",
            text: "You're trying to maximize value. So am I. But we need to be realistic about the constraint we're operating under.",
          },
        ],
      },
      Talk: {
        objective: "Lay out the timeline and capacity reality clearly.",
        starters: [
          {
            style: "deferential",
            text: "Here's where we stand: we have 4 weeks left. Current scope is 3.5 weeks of work. The dashboard is 1.5 weeks. So we can deliver either the original plan on time, or the original plan plus the dashboard in 5.5 weeks.",
          },
          {
            style: "balanced",
            text: "We committed to Feature A, B, and C by week 4. We're tracking to deliver. The dashboard adds week 5 to the timeline. The team is already at capacity.",
          },
          {
            style: "direct",
            text: "You have three options: hit the date with the original scope, extend the date to include the dashboard, or pull a feature from the original scope to make room for the dashboard.",
          },
        ],
      },
      Solve: {
        objective: "Get explicit agreement on which trade-off to make.",
        starters: [
          {
            style: "deferential",
            text: "Which of these works best for you? I can build a case for any of them—I just need to know which direction to move in.",
          },
          {
            style: "balanced",
            text: "I'd recommend talking to your stakeholder about which matters most: the date or the dashboard. Once you decide, I can adjust the plan accordingly.",
          },
          {
            style: "direct",
            text: "Decide now: timeline, scope, or resources. I'll organize the team around that decision.",
          },
        ],
      },
    },
  },
  {
    id: "quality-vs-speed",
    title: "Push Back on a Rushed Quality Review",
    scenarioType: "hierarchical",
    authorityGap: 2,
    difficulty: "Authority and standards tension",
    learningObjectives: [
      "Advocate for quality without blocking progress",
      "Use data to support difficult positions",
      "Find middle-ground solutions",
      "Balance business pressure with standards"
    ],
    context: `You're a QA lead on a product launch. Your test plan includes three rounds of testing—unit, integration, and user acceptance. Today, your product manager informed you that to hit the market window, testing needs to be compressed to one week (originally two weeks) and only cover "critical path" functionality. They're feeling pressure from executives to get to market fast. But you know that skipping integration testing has historically led to 10-15% of bugs reaching production. That's not acceptable for this product category. You need to push back—but respectfully, because your manager agrees with the compressed timeline, and you don't want to be seen as slowing the company down. How do you advocate for quality without sounding obstructionist?`,
    imageUrl: "./assets/scenarios/quality-vs-speed.svg",
    aiRole: "Product Manager",
    opening: "I know the test plan is ambitious, but we've got to cut it. The market window is closing. Can you get to MVP quality in one week instead of two?",
    goals: [
      "Acknowledge their market pressure and constraints",
      "Surface the quality risk with historical data, not opinion",
      "Propose a middle ground (prioritized testing, parallel work)",
      "Get explicit agreement on acceptable risk level",
    ],
    silenceMetrics: true,
    practice: {
      Introduce: {
        objective: "Signal partnership while setting up the conversation.",
        starters: [
          {
            style: "deferential",
            text: "I hear the market pressure. I want us to launch fast and safely. Before we cut the testing plan, let me show you the risk profile.",
          },
          {
            style: "balanced",
            text: "I understand the timeline crunch. I also need to make sure we're making an informed decision about quality trade-offs.",
          },
          {
            style: "direct",
            text: "Cutting integration testing increases bug risk to 10-15%. I need to tell you that risk before we commit.",
          },
        ],
      },
      Listen: {
        objective: "Understand the market constraints and business drivers.",
        starters: [
          {
            style: "deferential",
            text: "Can you help me understand what's driving the week-long deadline? Is it a market window, customer commitment, or internal target?",
          },
          {
            style: "balanced",
            text: "What happens if we launch one week later than this date? Is the market opportunity lost, or just delayed?",
          },
          {
            style: "direct",
            text: "What's the financial impact if we miss this window versus if we have a bug incident at launch?",
          },
        ],
      },
      Empathize: {
        objective: "Acknowledge their pressure while being honest about trade-offs.",
        starters: [
          {
            style: "deferential",
            text: "I know executives are putting real pressure on you. My goal is to help you launch on time and avoid a crisis that costs way more time.",
          },
          {
            style: "balanced",
            text: "I get the competitive pressure you're under. I'm not trying to slow you down—I'm trying to keep us from launching a buggy product.",
          },
          {
            style: "direct",
            text: "You're trying to capture a market moment. But a 10% bug rate will create a PR crisis that costs us months.",
          },
        ],
      },
      Talk: {
        objective: "Present the quality data and historical patterns.",
        starters: [
          {
            style: "deferential",
            text: "In the past four launches where we compressed integration testing, we had an average of 12 production bugs. In launches where we ran full integration testing, we had 2 bugs. That's a 6x difference in customer impact.",
          },
          {
            style: "balanced",
            text: "Skipping integration testing historically increases production bugs by 10-15%. That's not a number I'm comfortable putting in production with our SLA.",
          },
          {
            style: "direct",
            text: "Our integration test catch rate is 92%. That means 8% of bugs get to production if we skip it. For this product, that's unacceptable.",
          },
        ],
      },
      Solve: {
        objective: "Propose a middle path and get explicit agreement.",
        starters: [
          {
            style: "deferential",
            text: "What if we do this: prioritize critical path integration tests (2 days), run user acceptance testing in parallel with other features, and cut some nice-to-have tests? That gets us to a one-week timeline with acceptable risk.",
          },
          {
            style: "balanced",
            text: "I propose we focus hard on critical path integration tests and ship with known minor issues in secondary features. I think we can hit the timeline and keep risk manageable.",
          },
          {
            style: "direct",
            text: "Run integration tests on critical path only, do UAT in parallel, launch with known minor bugs. That's a one-week plan with 5% residual risk instead of 15%.",
          },
        ],
      },
    },
  },
];

function loadCustomScenarios() {
  try {
    const raw = localStorage.getItem(CUSTOM_SCENARIOS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadScenarioOverrides() {
  try {
    const raw = localStorage.getItem(SCENARIO_OVERRIDES_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function loadHiddenScenarioIds() {
  try {
    const raw = localStorage.getItem(HIDDEN_SCENARIO_IDS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadReflectionHistory() {
  try {
    const raw = localStorage.getItem(REFLECTION_HISTORY_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadReflectionDrafts() {
  try {
    const raw = localStorage.getItem(REFLECTION_DRAFTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadImprovementTrack() {
  try {
    const raw = localStorage.getItem(IMPROVEMENT_TRACK_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadPeerRequests() {
  try {
    const raw = localStorage.getItem(PEER_REQUESTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadPeerSessionHistory() {
  try {
    const raw = localStorage.getItem(PEER_SESSION_HISTORY_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getPeerUserId() {
  const existing = localStorage.getItem(PEER_USER_ID_KEY);
  if (existing) {
    return existing;
  }
  const generated = `peer-${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(PEER_USER_ID_KEY, generated);
  return generated;
}

function buildPeerRoomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function loadScaffoldLevel() {
  const raw = Number(localStorage.getItem(SCAFFOLD_LEVEL_KEY));
  return raw === 2 || raw === 3 ? raw : 1;
}

function getScaffoldLevelConfig() {
  return SCAFFOLD_LEVELS[state.scaffold.level] || SCAFFOLD_LEVELS[1];
}

function normalizeScaffoldLevel(value) {
  return value === 2 || value === 3 ? value : 1;
}

function getScaffoldLabel(level) {
  const normalized = normalizeScaffoldLevel(Number(level));
  return SCAFFOLD_LEVELS[normalized]?.label || SCAFFOLD_LEVELS[1].label;
}

function persistScaffoldLevel() {
  localStorage.setItem(SCAFFOLD_LEVEL_KEY, String(state.scaffold.level));
}

function loadPracticeSessions() {
  try {
    const raw = localStorage.getItem(PRACTICE_SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Failed to load practice sessions:", err);
    return [];
  }
}

function savePracticeSessions(sessions) {
  localStorage.setItem(PRACTICE_SESSIONS_KEY, JSON.stringify(sessions));
}

function savePracticeSessionResult(result) {
  const sessions = loadPracticeSessions();
  sessions.push({
    ...result,
    timestamp: new Date().toISOString(),
    id: `session-${Date.now()}`,
  });
  savePracticeSessions(sessions);
  return sessions;
}

function getPreviousSessions(limit = 5) {
  const sessions = loadPracticeSessions();
  return sessions.slice(-limit).reverse();
}

function getSessionAnalysisData(sessionId) {
  try {
    const raw = localStorage.getItem(CURRENT_SESSION_ANALYSIS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn("Failed to load session analysis:", err);
    return {};
  }
}

function saveSessionAnalysis(analysis) {
  localStorage.setItem(CURRENT_SESSION_ANALYSIS_KEY, JSON.stringify(analysis));
}

function buildInitialScenarios() {
  const overrides = loadScenarioOverrides();
  const hiddenIds = new Set(loadHiddenScenarioIds());
  const merged = [...DEFAULT_SCENARIOS, ...loadCustomScenarios()]
    .map((scenario) => {
      const override = overrides[scenario.id];
      if (!override) {
        return scenario;
      }
      return {
        ...scenario,
        ...override,
      };
    })
    .filter((scenario) => !hiddenIds.has(scenario.id));

  return merged.length ? merged : [...DEFAULT_SCENARIOS];
}

const state = {
  scenarios: buildInitialScenarios(),
  selectedScenarioId: DEFAULT_SCENARIOS[0].id,
  page: "landing",
  moduleIndex: 0,
  moduleQuizPassed: false,
  aiQuizQuestions: [],
  aiQuizGenerated: false,
  aiQuizLoading: false,
  userName: localStorage.getItem(USER_NAME_KEY) || "",
  userLearningGoals: JSON.parse(localStorage.getItem("sandbox.userLearningGoals") || "[]"),
  userCustomGoals: JSON.parse(localStorage.getItem("sandbox.userCustomGoals") || "[]"),
  customTailoredModules: JSON.parse(localStorage.getItem("sandbox.customTailoredModules") || "[]"),
  customTailoredScenarios: JSON.parse(localStorage.getItem("sandbox.customTailoredScenarios") || "[]"),
  goalScenarioGenerationKey: null,
  goalScenarioLoading: false,
  dynamicHintGenerationKey: null,
  nameEditorOpen: false,
  messages: [],
  stageIndex: 0,
  isTyping: false,
  briefTab: "scenario",
  scenarioBriefExpanded: false,
  scenariosExpanded: true,
  scenarioListExpanded: false,
  scenarioPickerExpanded: false,
  editingScenarioId: null,
  iletsExpanded: true,
  rightTab: "practice",
  focusMode: false,
  leftVisible: true,
  rightVisible: true,
  tipsExpanded: false,
  coachNote: "Type a message and I’ll give you a quick note here.",
  coachNoteHistory: [],
  reflectionHistory: loadReflectionHistory(),
  reflectionDrafts: loadReflectionDrafts(),
  finalReflectionDraftLocked: false,
  improvementTrack: loadImprovementTrack(),
  improvementTrackRange: "all",
  inMomentPrompt: null,
  inMomentPromptAtTurn: 0,
  inMomentSubmitting: false,
  latestStageScores: [],
  latestSessionScorePercent: 0,
  activeReflectionPrompts: [],
  finalReflectionSubmitting: false,
  finalReflectionFeedback: "",
  settings: {
    mode: localStorage.getItem("sandbox.mode") || "proxy",
    proxyUrl: localStorage.getItem("sandbox.proxyUrl") || "https://social-sandbox-api-proxy.onrender.com/api/chat",
    apiKey: localStorage.getItem("sandbox.apiKey") || "",
    model: localStorage.getItem("sandbox.model") || "gpt-4",
  },
  scaffold: {
    level: loadScaffoldLevel(),
    hintsVisible: loadScaffoldLevel() === 1,
    lastScenarioAppliedId: null,
  },
  peer: {
    requests: loadPeerRequests(),
    sessionHistory: loadPeerSessionHistory(),
    activeSession: null,
    activeView: "community",
    dashboardView: "summary",
    nameEditorOpen: false,
    lastSessionSummary: null,
    sessionChecklist: {
      Introduce: false,
      Listen: false,
      Empathize: false,
      Talk: false,
      Solve: false,
    },
    sharedNotes: "",
    sharedNotesSaved: false,
    feedbackDraft: "",
    feedbackSent: false,
    feedbackNotes: [],
  },
  currentSessionAnalysis: {
    transcript: [], // {role: 'user'|'ai', content: string, stage: string}
    userQuotes: [], // [{quote: string, context: string, stage: string}]
    stagePerformance: {}, // {Introduce: score, Listen: score, ...}
    strengths: [], // [{behavior: string, evidence: string}]
    growthAreas: [], // [{area: string, suggestion: string}]
    previousSessionComparison: null, // comparison to last session
    isAnalyzing: false,
  },
};

if (!state.scenarios.some((scenario) => scenario.id === state.selectedScenarioId)) {
  state.selectedScenarioId = state.scenarios[0]?.id || DEFAULT_SCENARIOS[0].id;
}

const peerUserId = getPeerUserId();

function persistCustomScenarios() {
  const customOnly = state.scenarios.filter((scenario) => scenario.custom === true);
  localStorage.setItem(CUSTOM_SCENARIOS_KEY, JSON.stringify(customOnly));
}

function persistScenarioOverrides() {
  const overrides = state.scenarios
    .filter((scenario) => scenario.custom !== true)
    .reduce((acc, scenario) => {
      const baseline = DEFAULT_SCENARIOS.find((item) => item.id === scenario.id);
      if (!baseline) {
        return acc;
      }

      const changed =
        baseline.title !== scenario.title ||
        baseline.difficulty !== scenario.difficulty ||
        baseline.context !== scenario.context ||
        baseline.aiRole !== scenario.aiRole ||
        baseline.opening !== scenario.opening ||
        normalizeScaffoldLevel(Number(baseline.scaffoldLevel || 1)) !== normalizeScaffoldLevel(Number(scenario.scaffoldLevel || 1)) ||
        JSON.stringify(baseline.goals) !== JSON.stringify(scenario.goals);

      if (changed) {
        acc[scenario.id] = {
          title: scenario.title,
          difficulty: scenario.difficulty,
          context: scenario.context,
          aiRole: scenario.aiRole,
          opening: scenario.opening,
          scaffoldLevel: normalizeScaffoldLevel(Number(scenario.scaffoldLevel || 1)),
          goals: scenario.goals,
          practice: scenario.practice,
        };
      }

      return acc;
    }, {});

  localStorage.setItem(SCENARIO_OVERRIDES_KEY, JSON.stringify(overrides));
}

function persistHiddenScenarioIds() {
  const hiddenIds = DEFAULT_SCENARIOS
    .map((scenario) => scenario.id)
    .filter((id) => !state.scenarios.some((scenario) => scenario.id === id));
  localStorage.setItem(HIDDEN_SCENARIO_IDS_KEY, JSON.stringify(hiddenIds));
}

function persistReflectionHistory() {
  const trimmed = state.reflectionHistory.slice(-60);
  localStorage.setItem(REFLECTION_HISTORY_KEY, JSON.stringify(trimmed));
}

function persistReflectionDrafts() {
  const trimmed = state.reflectionDrafts.slice(-40);
  localStorage.setItem(REFLECTION_DRAFTS_KEY, JSON.stringify(trimmed));
}

function persistImprovementTrack() {
  const trimmed = state.improvementTrack.slice(-80);
  localStorage.setItem(IMPROVEMENT_TRACK_KEY, JSON.stringify(trimmed));
}

const pageLanding = document.getElementById("pageLanding");
const pageGoals = document.getElementById("pageGoals");
const pageChoice = document.getElementById("pageChoice");
const pageLearn = document.getElementById("pageLearn");
const pagePeerPracticum = document.getElementById("pagePeerPracticum");
const pageScenarioBriefing = document.getElementById("pageScenarioBriefing");
const pageDashboard = document.getElementById("pageDashboard");
const pageFinal = document.getElementById("pageFinal");
const practiceShell = document.getElementById("practiceShell");

// Goal selection page elements
const goalsGrid = document.getElementById("goalsGrid");
const goalsBackBtn = document.getElementById("goalsBackBtn");
const goalsNextBtn = document.getElementById("goalsNextBtn");
const customGoalInput = document.getElementById("customGoalInput");
const addCustomGoalBtn = document.getElementById("addCustomGoalBtn");
const customGoalsList = document.getElementById("customGoalsList");

const briefingTitle = document.getElementById("briefingTitle");
const briefingSubtitle = document.getElementById("briefingSubtitle");
const selectedUserName = document.getElementById("selectedUserName");
const editUserNameBtn = document.getElementById("editUserNameBtn");
const userNameEditor = document.getElementById("userNameEditor");
const briefUserNameInput = document.getElementById("briefUserNameInput");
const scenarioPickerSection = document.getElementById("scenarioPickerSection");
const scenarioPickerGrid = document.getElementById("scenarioPickerGrid");
const toggleScenarioPickerListBtn = document.getElementById("toggleScenarioPickerListBtn");
const createScenarioBriefingBtn = document.getElementById("createScenarioBriefingBtn");
const scenarioBriefingSection = document.getElementById("scenarioBriefingSection");
const briefScenarioTitle = document.getElementById("briefScenarioTitle");
const briefScenarioDifficulty = document.getElementById("briefScenarioDifficulty");
const briefContext = document.getElementById("briefContext");
const briefRole = document.getElementById("briefRole");
const briefGoals = document.getElementById("briefGoals");
const briefOpening = document.getElementById("briefOpening");
const briefScaffoldHint = document.getElementById("briefScaffoldHint");
const briefScaffoldLevelGroup = document.getElementById("briefScaffoldLevelGroup");
const cancelBriefingBtn = document.getElementById("cancelBriefingBtn");
const backFromBriefingBtn = document.getElementById("backFromBriefingBtn");
const beginPracticeBtn = document.getElementById("beginPracticeBtn");
const editScenarioBriefingBtn = document.getElementById("editScenarioBriefingBtn");
const pickerActions = document.getElementById("pickerActions");
const goToChoiceBtn = document.getElementById("goToChoiceBtn");
const choiceBackBtn = document.getElementById("choiceBackBtn");
const userNameInput = document.getElementById("userNameInput");
const scenarioNameSetup = document.getElementById("scenarioNameSetup");
const chooseLearnBtn = document.getElementById("chooseLearnBtn");
const choosePracticeBtn = document.getElementById("choosePracticeBtn");
const choosePeerBtn = document.getElementById("choosePeerBtn");
const choiceWelcomeTitle = document.getElementById("choiceWelcomeTitle");
const choiceWelcomeSubtitle = document.getElementById("choiceWelcomeSubtitle");
const choiceNameInput = document.getElementById("choiceNameInput");
const choiceSaveNameBtn = document.getElementById("choiceSaveNameBtn");
const choiceNameStatus = document.getElementById("choiceNameStatus");
const goalsNameInput = document.getElementById("goalsNameInput");
const goalsSaveNameBtn = document.getElementById("goalsSaveNameBtn");
const goalsNameStatus = document.getElementById("goalsNameStatus");
const goalsTitle = document.getElementById("goalsTitle");
const openDashboardBtn = document.getElementById("openDashboardBtn");
const dashboardIdentity = document.getElementById("dashboardIdentity");
const dashboardStageLabel = document.getElementById("dashboardStageLabel");
const dashboardWeakStage = document.getElementById("dashboardWeakStage");
const dashboardRecentScore = document.getElementById("dashboardRecentScore");
const dashboardCompletionRate = document.getElementById("dashboardCompletionRate");
const dashboardWeakBreakdown = document.getElementById("dashboardWeakBreakdown");
const dashboardHistory = document.getElementById("dashboardHistory");
const dashboardPracticeAiBtn = document.getElementById("dashboardPracticeAiBtn");
const dashboardPracticePeerBtn = document.getElementById("dashboardPracticePeerBtn");
const dashboardBackBtn = document.getElementById("dashboardBackBtn");
const learnBackBtn = document.getElementById("learnBackBtn");
const startPracticeBtn = document.getElementById("startPracticeBtn");
const moduleProgressLabel = document.getElementById("moduleProgressLabel");
const moduleProgressPercent = document.getElementById("moduleProgressPercent");
const moduleProgressBar = document.getElementById("moduleProgressBar");
const moduleTitle = document.getElementById("moduleTitle");
const moduleSummary = document.getElementById("moduleSummary");
const moduleSectionCard = document.getElementById("moduleSectionCard");
const modulePrevBtn = document.getElementById("modulePrevBtn");
const moduleNextBtn = document.getElementById("moduleNextBtn");
const moduleQuiz = document.getElementById("moduleQuiz");
const submitQuizBtn = document.getElementById("submitQuizBtn");
const aiQuizContainer = document.getElementById("aiQuizContainer");
const quizResultText = document.getElementById("quizResultText");
const finalIdentity = document.getElementById("finalIdentity");
const finalTabOverview = document.getElementById("finalTabOverview");
const finalTabReflection = document.getElementById("finalTabReflection");
const finalTabSession = document.getElementById("finalTabSession");
const finalOverviewSection = document.getElementById("finalOverviewSection");
const finalReflectionSection = document.getElementById("finalReflectionSection");
const finalSessionSection = document.getElementById("finalSessionSection");
const finalFeedbackContent = document.getElementById("finalFeedbackContent");
const finalReflectionContent = document.getElementById("finalReflectionContent");
const analyticsSummary = document.getElementById("analyticsSummary");
const restartPracticeBtn = document.getElementById("restartPracticeBtn");
const backToChoiceBtn = document.getElementById("backToChoiceBtn");
const toggleScenariosBtn = document.getElementById("toggleScenariosBtn");
const scenariosBody = document.getElementById("scenariosBody");
const stageList = document.getElementById("stageList");
const toggleIletsBtn = document.getElementById("toggleIletsBtn");
const iletsBody = document.getElementById("iletsBody");
const scenarioTitle = document.getElementById("scenarioTitle");
const scenarioContext = document.getElementById("scenarioContext");
const roleBadge = document.getElementById("roleBadge");
const practiceIdentity = document.getElementById("practiceIdentity");
const practiceScaffoldMenuBtn = document.getElementById("practiceScaffoldMenuBtn");
const practiceScaffoldMenu = document.getElementById("practiceScaffoldMenu");
const feedbackPanel = document.getElementById("feedbackPanel");
const stageHelp = document.getElementById("stageHelp");
const stageProgress = document.getElementById("stageProgress");
const briefTabs = document.getElementById("briefTabs");
const toggleScenarioBriefBtn = document.getElementById("toggleScenarioBriefBtn");
const scenarioBriefBody = document.getElementById("scenarioBriefBody");
const scenarioBriefContent = document.getElementById("scenarioBriefContent");
const stageObjectiveTitle = document.getElementById("stageObjectiveTitle");
const stageObjectiveText = document.getElementById("stageObjectiveText");
const stageStartersMeta = document.getElementById("stageStartersMeta");
const stageStarters = document.getElementById("stageStarters");
const toggleStartersBtn = document.getElementById("toggleStartersBtn");
const nextStageBtn = document.getElementById("nextStageBtn");
const practiceScaffoldChip = document.getElementById("practiceScaffoldChip");
const rightTabs = document.getElementById("rightTabs");
const sectionCoach = document.getElementById("sectionCoach");
const sectionFeedback = document.getElementById("sectionFeedback");
const sectionPractice = document.getElementById("sectionPractice");
const toggleFocusBtn = document.getElementById("toggleFocusBtn");
const toggleLeftColumnBtn = document.getElementById("toggleLeftColumnBtn");
const toggleRightColumnBtn = document.getElementById("toggleRightColumnBtn");
const openScenarioBuilderBtn = document.getElementById("openScenarioBuilderBtn");
const scenarioBuilderDialog = document.getElementById("scenarioBuilderDialog");
const scenarioBuilderForm = document.getElementById("scenarioBuilderForm");
const createScenarioBtn = document.getElementById("createScenarioBtn");
const builderTitle = document.getElementById("builderTitle");
const builderRole = document.getElementById("builderRole");
const builderDifficulty = document.getElementById("builderDifficulty");
const builderContext = document.getElementById("builderContext");
const builderGoals = document.getElementById("builderGoals");
const builderOpening = document.getElementById("builderOpening");
const builderScaffoldLevel = document.getElementById("builderScaffoldLevel");
const coachNote = document.getElementById("coachNote");
const coachNoteList = document.getElementById("coachNoteList");
const inMomentReflectionCard = document.getElementById("inMomentReflectionCard");
const inMomentPromptText = document.getElementById("inMomentPromptText");
const inMomentAnswerInput = document.getElementById("inMomentAnswerInput");
const submitInMomentReflectionBtn = document.getElementById("submitInMomentReflectionBtn");
const inMomentReflectionFeedback = document.getElementById("inMomentReflectionFeedback");
const toggleTipsBtn = document.getElementById("toggleTipsBtn");
const tipsContent = document.getElementById("tipsContent");
const tipsLead = document.getElementById("tipsLead");
const tipsList = document.getElementById("tipsList");

const peerIdentityName = document.getElementById("peerIdentityName");
const peerEditNameBtn = document.getElementById("peerEditNameBtn");
const peerUserNameEditor = document.getElementById("peerUserNameEditor");
const peerUserNameInput = document.getElementById("peerUserNameInput");
const peerTabCommunity = document.getElementById("peerTabCommunity");
const peerTabSession = document.getElementById("peerTabSession");
const peerTabReflection = document.getElementById("peerTabReflection");
const peerTabDashboard = document.getElementById("peerTabDashboard");
const peerCommunityView = document.getElementById("peerCommunityView");
const peerSessionView = document.getElementById("peerSessionView");
const peerFeedbackView = document.getElementById("peerFeedbackView");
const peerDashboardView = document.getElementById("peerDashboardView");
const peerUserDirectory = document.getElementById("peerUserDirectory");
const peerRequestList = document.getElementById("peerRequestList");
const peerBackToChoiceBtn = document.getElementById("peerBackToChoiceBtn");
const peerSessionTitle = document.getElementById("peerSessionTitle");
const peerSessionMeta = document.getElementById("peerSessionMeta");
const peerEndSessionBtn = document.getElementById("peerEndSessionBtn");
const peerVoiceModeBtn = document.getElementById("peerVoiceModeBtn");
const peerVoiceStatusText = document.getElementById("peerVoiceStatusText");
const peerReflectionMeta = document.getElementById("peerReflectionMeta");
const peerReflectionSummary = document.getElementById("peerReflectionSummary");
const peerChatMessages = document.getElementById("peerChatMessages");
const peerChatForm = document.getElementById("peerChatForm");
const peerChatInput = document.getElementById("peerChatInput");
const peerSharedNotes = document.getElementById("peerSharedNotes");
const peerSaveSharedNotesBtn = document.getElementById("peerSaveSharedNotesBtn");
const peerEditSharedNotesBtn = document.getElementById("peerEditSharedNotesBtn");
const peerSharedNotesStatus = document.getElementById("peerSharedNotesStatus");
const peerFeedbackInput = document.getElementById("peerFeedbackInput");
const peerSubmitFeedbackBtn = document.getElementById("peerSubmitFeedbackBtn");
const peerEditFeedbackBtn = document.getElementById("peerEditFeedbackBtn");
const peerFeedbackStatus = document.getElementById("peerFeedbackStatus");
const peerFeedbackList = document.getElementById("peerFeedbackList");
const peerDashboardSummary = document.getElementById("peerDashboardSummary");
const peerDashboardTrend = document.getElementById("peerDashboardTrend");
const peerDashboardSession = document.getElementById("peerDashboardSession");

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("promptInput");
const voiceModeBtn = document.getElementById("voiceModeBtn");
const voiceStatusText = document.getElementById("voiceStatusText");
const sendBtn = document.getElementById("sendBtn");
const finishBtn = document.getElementById("finishBtn");
const goHomeBtn = document.getElementById("goHomeBtn");
const goLearningPathBtn = document.getElementById("goLearningPathBtn");
const backToBriefingBtn = document.getElementById("backToBriefingBtn");

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
let voiceRecognition = null;
let voiceSendTimer = null;
let peerVoiceRecognition = null;
let peerVoiceSendTimer = null;
let scaffoldPauseTimer = null;

function clearScaffoldPauseTimer() {
  if (scaffoldPauseTimer) {
    clearTimeout(scaffoldPauseTimer);
    scaffoldPauseTimer = null;
  }
}

function pushCoachNoteHistory(note) {
  if (!note) {
    return;
  }
  const normalized = note.trim();
  if (!normalized) {
    return;
  }
  const existing = state.coachNoteHistory || [];
  const withoutDupes = existing.filter((item) => item.trim() !== normalized);
  state.coachNoteHistory = [normalized, ...withoutDupes].slice(0, 4);
}

function maybeTriggerScaffoldPauseSupport() {
  if (state.page !== "practice" || state.scaffold.level !== 2 || state.isTyping) {
    return;
  }

  if (!state.scaffold.hintsVisible) {
    state.scaffold.hintsVisible = true;
    state.coachNote = "Pause support: hints are now visible. Pick one starter and adapt it in your own words.";
    pushCoachNoteHistory("Pause support: Use one hint, then continue in your own words.");
    renderPracticeStrip();
    renderCoachNote();
  }
}

function armScaffoldPauseTimer() {
  clearScaffoldPauseTimer();
  if (state.page !== "practice" || state.scaffold.level !== 2) {
    return;
  }
  scaffoldPauseTimer = window.setTimeout(() => {
    maybeTriggerScaffoldPauseSupport();
  }, 10000);
}

state.voice = {
  supported: Boolean(SpeechRecognitionAPI),
  mode: false,
  listening: false,
  speaking: false,
  interim: "",
  pendingFinal: "",
};

state.peer.voice = {
  supported: Boolean(SpeechRecognitionAPI),
  mode: false,
  listening: false,
  speaking: false,
  interim: "",
  pendingFinal: "",
};

function renderVoiceUi() {
  if (!voiceModeBtn || !voiceStatusText) {
    return;
  }

  if (!state.voice.supported) {
    voiceModeBtn.disabled = true;
    voiceModeBtn.classList.remove("is-active");
    voiceModeBtn.setAttribute("aria-pressed", "false");
    voiceModeBtn.title = "Voice input is not supported in this browser";
    voiceModeBtn.setAttribute("aria-label", voiceModeBtn.title);
    voiceStatusText.textContent = "Voice input is not supported in this browser.";
    return;
  }

  voiceModeBtn.disabled = false;
  voiceModeBtn.classList.toggle("is-active", state.voice.mode);
  voiceModeBtn.setAttribute("aria-pressed", state.voice.mode ? "true" : "false");
  voiceModeBtn.title = state.voice.mode ? "Stop voice mode" : "Start voice mode";
  voiceModeBtn.setAttribute("aria-label", voiceModeBtn.title);

  if (!state.voice.mode) {
    voiceStatusText.textContent = "Voice mode is off.";
    return;
  }
  if (state.voice.speaking) {
    voiceStatusText.textContent = "Speaking AI response...";
    return;
  }
  if (state.voice.listening) {
    voiceStatusText.textContent = state.voice.interim
      ? `Listening: ${state.voice.interim}`
      : "Listening... speak naturally.";
    return;
  }
  if (state.isTyping) {
    voiceStatusText.textContent = "Waiting for AI response...";
    return;
  }
  voiceStatusText.textContent = "Voice mode active. Waiting for your voice.";
}

function renderPeerVoiceUi() {
  if (!peerVoiceModeBtn || !peerVoiceStatusText) {
    return;
  }

  if (!state.peer.voice.supported) {
    peerVoiceModeBtn.disabled = true;
    peerVoiceModeBtn.classList.remove("is-active");
    peerVoiceModeBtn.setAttribute("aria-pressed", "false");
    peerVoiceModeBtn.title = "Voice input is not supported in this browser";
    peerVoiceModeBtn.setAttribute("aria-label", peerVoiceModeBtn.title);
    peerVoiceStatusText.textContent = "Voice input is not supported in this browser.";
    return;
  }

  peerVoiceModeBtn.disabled = false;
  peerVoiceModeBtn.classList.toggle("is-active", state.peer.voice.mode);
  peerVoiceModeBtn.setAttribute("aria-pressed", state.peer.voice.mode ? "true" : "false");
  peerVoiceModeBtn.title = state.peer.voice.mode ? "Stop peer voice mode" : "Start peer voice mode";
  peerVoiceModeBtn.setAttribute("aria-label", peerVoiceModeBtn.title);

  if (!state.peer.voice.mode) {
    peerVoiceStatusText.textContent = "Voice mode is off.";
    return;
  }
  if (state.peer.voice.listening) {
    peerVoiceStatusText.textContent = state.peer.voice.interim
      ? `Listening: ${state.peer.voice.interim}`
      : "Listening... speak naturally.";
    return;
  }
  if (state.peer.voice.speaking) {
    peerVoiceStatusText.textContent = "Submitting your voice response...";
    return;
  }
  peerVoiceStatusText.textContent = "Voice mode active. Waiting for your voice.";
}

function stopVoiceListening() {
  if (voiceRecognition && state.voice.listening) {
    voiceRecognition.stop();
  }
  state.voice.listening = false;
  renderVoiceUi();
}

function stopPeerVoiceListening() {
  if (peerVoiceRecognition && state.peer.voice.listening) {
    peerVoiceRecognition.stop();
  }
  state.peer.voice.listening = false;
  renderPeerVoiceUi();
}

function initPeerVoiceRecognition() {
  if (!state.peer.voice.supported || peerVoiceRecognition) {
    return;
  }

  peerVoiceRecognition = new SpeechRecognitionAPI();
  peerVoiceRecognition.lang = "en-US";
  peerVoiceRecognition.interimResults = true;
  peerVoiceRecognition.continuous = true;

  peerVoiceRecognition.onstart = () => {
    state.peer.voice.listening = true;
    renderPeerVoiceUi();
  };

  peerVoiceRecognition.onresult = (event) => {
    let interim = "";
    let finalChunk = "";

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const transcript = event.results[i][0]?.transcript?.trim() || "";
      if (!transcript) {
        continue;
      }
      if (event.results[i].isFinal) {
        finalChunk += `${transcript} `;
      } else {
        interim += `${transcript} `;
      }
    }

    if (finalChunk.trim()) {
      state.peer.voice.pendingFinal = `${state.peer.voice.pendingFinal} ${finalChunk}`.trim();
      if (peerVoiceSendTimer) {
        clearTimeout(peerVoiceSendTimer);
      }
      peerVoiceSendTimer = window.setTimeout(() => {
        sendPendingPeerVoiceTranscript();
      }, 800);
    }

    state.peer.voice.interim = interim.trim();
    const preview = `${state.peer.voice.pendingFinal} ${state.peer.voice.interim}`.trim();
    if (preview && peerChatInput) {
      peerChatInput.value = preview;
    }
    renderPeerVoiceUi();
  };

  peerVoiceRecognition.onerror = () => {
    state.peer.voice.listening = false;
    renderPeerVoiceUi();
  };

  peerVoiceRecognition.onend = () => {
    state.peer.voice.listening = false;
    renderPeerVoiceUi();

    if (!state.peer.voice.mode) {
      return;
    }

    sendPendingPeerVoiceTranscript();
  };
}

function startPeerVoiceListening() {
  if (!state.peer.voice.mode || !state.peer.voice.supported || state.peer.voice.listening) {
    return;
  }
  initPeerVoiceRecognition();
  if (!peerVoiceRecognition || state.peer.voice.listening) {
    return;
  }
  try {
    peerVoiceRecognition.start();
  } catch {
    renderPeerVoiceUi();
  }
}

function sendPendingPeerVoiceTranscript() {
  if (!state.peer.voice.mode) {
    return;
  }

  const transcript = state.peer.voice.pendingFinal.trim();
  state.peer.voice.pendingFinal = "";
  state.peer.voice.interim = "";
  if (!transcript) {
    renderPeerVoiceUi();
    return;
  }

  if (peerChatInput) {
    peerChatInput.value = transcript;
  }
  if (peerChatForm) {
    peerChatForm.requestSubmit();
  }
  renderPeerVoiceUi();
}

function togglePeerVoiceMode() {
  if (!state.peer.voice.supported) {
    renderPeerVoiceUi();
    return;
  }

  state.peer.voice.mode = !state.peer.voice.mode;

  if (!state.peer.voice.mode) {
    state.peer.voice.pendingFinal = "";
    state.peer.voice.interim = "";
    if (peerVoiceSendTimer) {
      clearTimeout(peerVoiceSendTimer);
      peerVoiceSendTimer = null;
    }
    stopPeerVoiceListening();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    state.peer.voice.speaking = false;
    renderPeerVoiceUi();
    return;
  }

  renderPeerVoiceUi();
  startPeerVoiceListening();
}

function initVoiceRecognition() {
  if (!state.voice.supported || voiceRecognition) {
    return;
  }

  voiceRecognition = new SpeechRecognitionAPI();
  voiceRecognition.lang = "en-US";
  voiceRecognition.interimResults = true;
  voiceRecognition.continuous = true;

  voiceRecognition.onstart = () => {
    state.voice.listening = true;
    renderVoiceUi();
  };

  voiceRecognition.onresult = (event) => {
    let interim = "";
    let finalChunk = "";

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const transcript = event.results[i][0]?.transcript?.trim() || "";
      if (!transcript) {
        continue;
      }
      if (event.results[i].isFinal) {
        finalChunk += `${transcript} `;
      } else {
        interim += `${transcript} `;
      }
    }

    if (finalChunk.trim()) {
      state.voice.pendingFinal = `${state.voice.pendingFinal} ${finalChunk}`.trim();
      if (voiceSendTimer) {
        clearTimeout(voiceSendTimer);
      }
      voiceSendTimer = window.setTimeout(() => {
        sendPendingVoiceTranscript();
      }, 800);
    }

    state.voice.interim = interim.trim();
    const preview = `${state.voice.pendingFinal} ${state.voice.interim}`.trim();
    if (preview) {
      promptInput.value = preview;
    }
    renderVoiceUi();
  };

  voiceRecognition.onerror = () => {
    state.voice.listening = false;
    renderVoiceUi();
  };

  voiceRecognition.onend = () => {
    state.voice.listening = false;
    renderVoiceUi();

    if (!state.voice.mode) {
      return;
    }

    sendPendingVoiceTranscript();

    if (!state.voice.speaking && !state.isTyping) {
      startVoiceListening();
    }
  };
}

function startVoiceListening() {
  if (!state.voice.mode || !state.voice.supported || state.voice.speaking || state.isTyping) {
    return;
  }
  initVoiceRecognition();
  if (!voiceRecognition || state.voice.listening) {
    return;
  }
  try {
    voiceRecognition.start();
  } catch {
    renderVoiceUi();
  }
}

function sendPendingVoiceTranscript() {
  if (!state.voice.mode || state.isTyping) {
    return;
  }

  const transcript = state.voice.pendingFinal.trim();
  state.voice.pendingFinal = "";
  state.voice.interim = "";
  if (!transcript) {
    renderVoiceUi();
    return;
  }

  promptInput.value = transcript;
  chatForm.requestSubmit();
  renderVoiceUi();
}

function speakAssistantReply(text) {
  if (!state.voice.mode || !window.speechSynthesis || !text) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = () => {
    state.voice.speaking = true;
    stopVoiceListening();
    renderVoiceUi();
  };

  utterance.onend = () => {
    state.voice.speaking = false;
    renderVoiceUi();
    startVoiceListening();
  };

  utterance.onerror = () => {
    state.voice.speaking = false;
    renderVoiceUi();
    startVoiceListening();
  };

  window.speechSynthesis.speak(utterance);
}

function toggleVoiceMode() {
  if (!state.voice.supported) {
    renderVoiceUi();
    return;
  }

  state.voice.mode = !state.voice.mode;

  if (!state.voice.mode) {
    state.voice.pendingFinal = "";
    state.voice.interim = "";
    if (voiceSendTimer) {
      clearTimeout(voiceSendTimer);
      voiceSendTimer = null;
    }
    stopVoiceListening();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    state.voice.speaking = false;
    renderVoiceUi();
    return;
  }

  renderVoiceUi();
  startVoiceListening();
}

const openSettingsBtn = document.getElementById("openSettingsBtn");
const settingsDialog = document.getElementById("settingsDialog");
const settingsForm = document.getElementById("settingsForm");
const modeSelect = document.getElementById("modeSelect");
const proxyUrlInput = document.getElementById("proxyUrlInput");
const apiKeyInput = document.getElementById("apiKeyInput");

function getLearnerName() {
  const raw = (state.userName || "").trim();
  return raw || "Learner";
}

function saveUserName(value) {
  state.userName = typeof value === "string" ? value.trim() : "";
  localStorage.setItem(USER_NAME_KEY, state.userName);
}

function hasLearnerName() {
  return Boolean((state.userName || "").trim());
}

function displayUserGreeting(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const userName = getLearnerName();
  if (userName && userName !== "Learner") {
    element.textContent = `Hi ${userName}, what do you want to learn?`;
  } else {
    element.textContent = "";
  }
}

function setChoiceNameStatus(message) {
  if (!choiceNameStatus) {
    return;
  }
  choiceNameStatus.textContent = message;
}

function ensureLearnerNameSet() {
  const candidate = (state.userName || userNameInput?.value || "").trim();
  if (candidate) {
    if (candidate !== state.userName) {
      saveUserName(candidate);
    }
    return true;
  }

  goToPage("goals");
  if (goalsNameStatus) {
    goalsNameStatus.textContent = "Please set your name before continuing.";
  }
  if (goalsNameInput) {
    goalsNameInput.focus();
    goalsNameInput.select();
  }
  return false;
}

function renderChoiceIdentity() {
  const learner = (state.userName || "").trim();

  if (choiceWelcomeTitle) {
    choiceWelcomeTitle.textContent = learner ? `Hi ${learner}, choose your path` : "Choose Your Path";
  }
  if (choiceWelcomeSubtitle) {
    choiceWelcomeSubtitle.textContent = "Select your learning preference below.";
  }
}

function renderGoalsIdentity() {
  const learner = (state.userName || "").trim();
  if (goalsTitle) {
    goalsTitle.textContent = learner ? `Hi ${learner}, what do you want to learn?` : "What do you want to learn?";
  }
  if (goalsNameInput && document.activeElement !== goalsNameInput) {
    goalsNameInput.value = state.userName || "";
  }
  if (goalsNameStatus) {
    goalsNameStatus.textContent = learner
      ? "Name saved."
      : "";
  }
}

function renderUserNameSummary() {
  if (selectedUserName) {
    selectedUserName.textContent = getLearnerName();
  }
}

function renderPage() {
  const map = {
    landing: pageLanding,
    goals: pageGoals,
    choice: pageChoice,
    learn: pageLearn,
    dashboard: pageDashboard,
    peerPracticum: pagePeerPracticum,
    scenarioBriefing: pageScenarioBriefing,
    practice: practiceShell,
    final: pageFinal,
  };

  Object.entries(map).forEach(([key, element]) => {
    element.classList.toggle("is-hidden", key !== state.page);
  });
  
  // Display user greetings on relevant pages
  if (state.page === "goals") {
    renderGoalsIdentity();
  } else if (state.page === "dashboard") {
    displayUserGreeting("dashboardUserGreeting");
  } else if (state.page === "final") {
    displayUserGreeting("finalUserGreeting");
  }
}

function getCurrentWeakStageFocusInfo() {
  const finalEntries = state.reflectionHistory.filter((entry) => entry.kind === "final");
  const recent = finalEntries.slice(-8);
  const weakMap = recent.reduce((acc, item) => {
    (item.weakStages || []).forEach((stage) => {
      acc[stage] = (acc[stage] || 0) + 1;
    });
    return acc;
  }, {});

  const sorted = Object.entries(weakMap).sort((a, b) => b[1] - a[1]);
  const topCount = sorted[0]?.[1] || 0;
  const tied = sorted.filter((item) => item[1] === topCount).map((item) => item[0]);

  if (!sorted.length) {
    return {
      stage: "Introduce",
      isTie: false,
      hasData: false,
    };
  }

  return {
    stage: tied.length > 1 ? "Multiple stages" : tied[0],
    isTie: tied.length > 1,
    hasData: true,
  };
}

function hasFinalHistory() {
  return state.reflectionHistory.some((entry) => entry.kind === "final");
}

function getRecommendedStartStage() {
  const focus = getCurrentWeakStageFocusInfo();
  if (!hasFinalHistory()) {
    return "Introduce";
  }
  return focus.isTie ? "Introduce" : focus.stage;
}

function renderChoiceSnapshot() {}

function buildDashboardWeakBreakdownHtml() {
  const finalEntries = state.reflectionHistory.filter((entry) => entry.kind === "final").slice(-12);
  const weakMap = finalEntries.reduce((acc, item) => {
    (item.weakStages || []).forEach((stage) => {
      acc[stage] = (acc[stage] || 0) + 1;
    });
    return acc;
  }, {});

  const rows = Object.entries(weakMap).sort((a, b) => b[1] - a[1]);
  if (!rows.length) {
    return "<p class=\"muted\">No weak-stage data yet.</p>";
  }

  return `<ul class=\"dashboard-list\">${rows
    .map(([stage, count]) => `<li><strong>${escapeHtml(stage)}</strong>: ${count} session(s)</li>`)
    .join("")}</ul>`;
}

function buildDashboardHistoryHtml() {
  const items = state.reflectionHistory
    .filter((entry) => entry.kind === "final")
    .slice(-6)
    .reverse();

  if (!items.length) {
    return "<p class=\"muted\">No reflection history yet.</p>";
  }

  return `<ul class=\"dashboard-list\">${items
    .map((entry) => {
      const date = new Date(entry.createdAt).toLocaleDateString();
      const weak = (entry.weakStages || []).join(", ") || "-";
      const level = getScaffoldLabel(entry.scaffoldLevel || 1);
      return `<li><strong>${escapeHtml(date)}</strong> - Score ${entry.scorePercent || 0}% - ${escapeHtml(level)} - Focus: ${escapeHtml(weak)}</li>`;
    })
    .join("")}</ul>`;
}

function renderDashboardPage() {
  const finalEntries = state.reflectionHistory.filter((entry) => entry.kind === "final");
  const recent = finalEntries.slice(-5);
  const avgRecent = recent.length
    ? Math.round(recent.reduce((sum, item) => sum + (item.scorePercent || 0), 0) / recent.length)
    : null;
  const focus = getCurrentWeakStageFocusInfo();
  const isReturning = finalEntries.length > 0;
  const attempts = state.improvementTrack.reduce((sum, item) => sum + (item.attempts || 0), 0);
  const completions = state.improvementTrack.reduce((sum, item) => sum + (item.completions || 0), 0);
  const completionRate = attempts ? Math.round((completions / attempts) * 100) : 0;

  if (dashboardIdentity) {
    dashboardIdentity.textContent = isReturning
      ? `${getLearnerName()}, review your details and pick your next focus stage.`
      : `${getLearnerName()}, start with Introduce or pick any stage you prefer.`;
  }
  if (dashboardStageLabel) {
    dashboardStageLabel.textContent = isReturning
      ? (focus.isTie ? "Current focus (tie)" : "Most frequent weak stage")
      : "Start here (recommended)";
  }
  if (dashboardWeakStage) {
    dashboardWeakStage.textContent = isReturning
      ? (focus.isTie ? "Multiple stages" : focus.stage)
      : "Introduce";
  }
  if (dashboardRecentScore) {
    dashboardRecentScore.textContent = avgRecent === null ? "No history yet" : `${avgRecent}%`;
  }
  if (dashboardCompletionRate) {
    dashboardCompletionRate.textContent = `${completionRate}%`;
  }
  if (dashboardWeakBreakdown) {
    dashboardWeakBreakdown.innerHTML = buildDashboardWeakBreakdownHtml();
  }
  if (dashboardHistory) {
    dashboardHistory.innerHTML = buildDashboardHistoryHtml();
  }
}

function renderDashboardTabs(tab) {
  const activeTab = tab || "overview";

  if (finalTabOverview) {
    finalTabOverview.classList.toggle("active", activeTab === "overview");
  }
  if (finalTabReflection) {
    finalTabReflection.classList.toggle("active", activeTab === "reflection");
  }
  if (finalTabSession) {
    finalTabSession.classList.toggle("active", activeTab === "session");
  }

  if (finalOverviewSection) {
    finalOverviewSection.classList.toggle("active", activeTab === "overview");
  }
  if (finalReflectionSection) {
    finalReflectionSection.classList.toggle("active", activeTab === "reflection");
  }
  if (finalSessionSection) {
    finalSessionSection.classList.toggle("active", activeTab === "session");
  }
}

function goToPage(page) {
  if (page !== "practice" && state.voice?.mode) {
    state.voice.mode = false;
    stopVoiceListening();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    state.voice.speaking = false;
    renderVoiceUi();
  }

  if (page !== "peerPracticum" && state.peer?.voice?.mode) {
    state.peer.voice.mode = false;
    state.peer.voice.pendingFinal = "";
    state.peer.voice.interim = "";
    state.peer.voice.speaking = false;
    if (peerVoiceSendTimer) {
      clearTimeout(peerVoiceSendTimer);
      peerVoiceSendTimer = null;
    }
    stopPeerVoiceListening();
    renderPeerVoiceUi();
  }

  state.page = page;
  if (page === "learn") {
    renderModule();
  }
  if (page === "goals") {
    renderGoalsPage();
    recoverGoalsGridIfMissing();
  }
  if (page === "choice") {
    renderChoiceIdentity();
    renderChoiceSnapshot();
  }
  if (page === "dashboard") {
    renderDashboardPage();
  }
  if (page === "scenarioBriefing") {
    applyScenarioScaffoldDefault(state.selectedScenarioId);
    renderScenarioPicker();
  }
  if (page === "peerPracticum") {
    renderPeerPracticum();
  }
  renderPage();
  window.scrollTo(0, 0);
}

window.__ssNavigate = (targetPage) => {
  if (targetPage === "goals") {
    renderGoalsPage();
    goToPage("goals");
    return;
  }

  if (targetPage === "choice") {
    goToPage("choice");
    return;
  }

  if (targetPage === "learn") {
    state.moduleIndex = 0;
    state.moduleQuizPassed = false;
    state.aiQuizQuestions = [];
    state.aiQuizGenerated = false;
    state.aiQuizLoading = false;
    if (quizResultText) {
      quizResultText.innerHTML = "";
      quizResultText.classList.add("is-hidden");
    }
    if (submitQuizBtn) {
      submitQuizBtn.disabled = true;
      submitQuizBtn.textContent = "Submit Reflection";
    }
    goToPage("learn");
    return;
  }

  if (targetPage === "scenarioBriefing") {
    if (!ensureLearnerNameSet()) {
      return;
    }
    goToPage("scenarioBriefing");
    return;
  }

  if (targetPage === "peerPracticum") {
    if (!ensureLearnerNameSet()) {
      return;
    }
    goToPage("peerPracticum");
    return;
  }

  goToPage(targetPage);
};

function renderModule() {
  // Combine custom tailored modules with standard modules
  const allModules = getLearningModules();
  const total = allModules.length;
  const index = Math.min(state.moduleIndex, Math.max(total - 1, 0));
  const section = allModules[index];
  const progress = Math.round(((index + 1) / total) * 100);

  // Display user greeting with name
  const learnUserGreeting = document.getElementById("learnUserGreeting");
  if (learnUserGreeting) {
    const userName = getLearnerName();
    if (userName && userName !== "Learner") {
      learnUserGreeting.textContent = `Hi ${userName}, what do you want to learn?`;
    } else {
      learnUserGreeting.textContent = "";
    }
  }

  moduleProgressLabel.textContent = `Module ${index + 1}/${total}`;
  moduleProgressPercent.textContent = `${progress}%`;
  moduleProgressBar.style.width = `${progress}%`;

  // Section banner: tailored vs ILETS framework
  const tailoredCount = state.customTailoredModules.length >= 7
    ? total
    : state.customTailoredModules.length;
  const hasILETSSection = tailoredCount < total;
  const isInILETSSection = index >= tailoredCount;
  const isInTailoredSection = tailoredCount > 0 && index < tailoredCount;

  const moduleSectionBanner = document.getElementById("moduleSectionBanner");
  const moduleTransitionCard = document.getElementById("moduleTransitionCard");
  if (moduleSectionBanner) {
    if (isInTailoredSection) {
      moduleSectionBanner.innerHTML = `<span class="msb-badge msb-badge-tailored">Your Focus Area</span><span class="msb-label">Skills specific to your learning goal · Module ${index + 1} of ${tailoredCount}</span>`;
      moduleSectionBanner.className = "module-section-banner msb-tailored";
    } else if (isInILETSSection && hasILETSSection) {
      const iletsStep = index - tailoredCount + 1;
      moduleSectionBanner.innerHTML = `<span class="msb-badge msb-badge-ilets">The Method Behind the Practice</span><span class="msb-label">A step-by-step structure for any difficult conversation · Step ${iletsStep} of 6</span>`;
      moduleSectionBanner.className = "module-section-banner msb-ilets";
    } else {
      moduleSectionBanner.innerHTML = `<span class="msb-badge msb-badge-ilets">The Method Behind the Practice</span><span class="msb-label">A step-by-step structure for any difficult conversation</span>`;
      moduleSectionBanner.className = "module-section-banner msb-ilets";
    }
  }

  // Transition card: shown only on the first ILETS module when there are tailored modules before it
  if (moduleTransitionCard) {
    if (hasILETSSection && index === tailoredCount) {
      moduleTransitionCard.innerHTML = `
        <p style="margin:0 0 0.4rem; font-weight:700; color:var(--ink-dark);">Now for the framework that ties it all together.</p>
        <p style="margin:0; line-height:1.6; color:var(--ink-muted);">Your previous modules focused on skills specific to your goal. The <strong>ILETS Framework</strong> is the step-by-step conversation structure you'll actually use during practice — it works in any difficult conversation, not just yours. Think of it as the engine; your goal modules were the fuel.</p>
      `;
      moduleTransitionCard.classList.remove("is-hidden");
    } else {
      moduleTransitionCard.classList.add("is-hidden");
    }
  }

  // Display user goal at the top if they have selected goals
  const allUserGoals = [...state.userLearningGoals, ...state.userCustomGoals];
  const userGoalDisplay = document.getElementById("userGoalDisplay");
  if (userGoalDisplay && allUserGoals.length > 0) {
    const goalNames = [
      ...state.userLearningGoals.map((id) => {
        const goal = LEARNING_GOALS.find((g) => g.id === id);
        return goal?.title || id;
      }),
      ...state.userCustomGoals
    ];
    userGoalDisplay.innerHTML = `<p style="margin: 0; color: var(--accent); font-weight: 600; font-size: 0.95rem;">Learning Goal: ${goalNames.join(", ")}</p>`;
    userGoalDisplay.classList.remove("is-hidden");
  } else if (userGoalDisplay) {
    userGoalDisplay.classList.add("is-hidden");
  }
  
  // Check if this module is custom or recommended for user's goals
  const isCustom = section.isCustom;
  const isRecommendedForGoals = allUserGoals.length > 0 && !isCustom && state.customTailoredModules.length === 0;
  
  let titleHtml = section.title;
  if (isCustom) {
    titleHtml = `${section.title} <span style="display: inline-block; background: rgba(14, 163, 122, 0.2); color: var(--ink-dark); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-left: 0.6rem;">Tailored for you</span>`;
  } else if (isRecommendedForGoals) {
    titleHtml = `${section.title} <span style="display: inline-block; background: rgba(29, 95, 229, 0.15); color: var(--accent); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-left: 0.6rem;">Recommended for your goals</span>`;
  }
  
  moduleTitle.innerHTML = titleHtml;
  
  // Handle both old and new module formats
  if (section.objective) {
    // NEW FORMAT: Detailed custom modules
    moduleSummary.textContent = section.objective;
    
    let contentHtml = `
      <section style="margin-bottom: 2rem;">
        <h4 style="font-size: 0.95rem; color: var(--ink-dark); margin-bottom: 0.75rem;">Overview</h4>
        <p style="margin: 0; line-height: 1.6;">${escapeHtml(section.overview)}</p>
      </section>
    `;
    
    // Key principles
    if (section.keyPrinciples && section.keyPrinciples.length > 0) {
      contentHtml += `
      <section style="margin-bottom: 2rem;">
        <h4 style="font-size: 0.95rem; color: var(--ink-dark); margin-bottom: 0.75rem;">Key Principles</h4>
        <div style="display: grid; gap: 0.75rem;">
          ${section.keyPrinciples.map((p) => `
          <div style="padding: 1rem; background: rgba(29, 95, 229, 0.05); border-left: 3px solid var(--accent); border-radius: 4px;">
            <strong style="display: block; margin-bottom: 0.3rem;">${escapeHtml(p.name)}</strong>
            <p style="margin: 0; font-size: 0.9rem;">${escapeHtml(p.description)}</p>
          </div>
          `).join('')}
        </div>
      </section>
      `;
    }
    
    // Common mistakes
    if (section.commonMistakes && section.commonMistakes.length > 0) {
      contentHtml += `
      <section style="margin-bottom: 2rem;">
        <h4 style="font-size: 0.95rem; color: var(--ink-dark); margin-bottom: 0.75rem;">Common Mistakes to Avoid</h4>
        <div style="display: grid; gap: 0.75rem;">
          ${section.commonMistakes.map((m) => `
          <div style="padding: 1rem; background: rgba(217, 117, 30, 0.05); border-left: 3px solid #d9751e; border-radius: 4px;">
            <strong style="display: block; color: #d9751e; margin-bottom: 0.3rem;">❌ ${escapeHtml(m.mistake)}</strong>
            <p style="margin: 0.3rem 0; font-size: 0.9rem;"><em>Why it doesn't work:</em> ${escapeHtml(m.why)}</p>
            <p style="margin: 0; font-size: 0.9rem;"><strong>✓ Instead:</strong> ${escapeHtml(m.better)}</p>
          </div>
          `).join('')}
        </div>
      </section>
      `;
    }
    
    // Framework
    if (section.framework) {
      const steps = String(section.framework || "").split(' | ').map((step) => {
        // Remove leading "Step X:" if present to avoid duplication like "Step 1: Step 1: ..."
        return step.replace(/^\s*Step\s*\d+\s*:\s*/i, '').trim();
      });
      contentHtml += `
      <section style="margin-bottom: 2rem;">
        <h4 style="font-size: 0.95rem; color: var(--ink-dark); margin-bottom: 0.75rem;">Framework to Follow</h4>
        <div style="padding: 1rem; background: rgba(14, 163, 122, 0.05); border-left: 3px solid #0fa37a; border-radius: 4px;">
          <p style="margin: 0; line-height: 1.8; font-size: 0.95rem;">${steps.map((s, i) => `<strong>Step ${i + 1}:</strong> ${escapeHtml(s)}`).join('<br>')}</p>
        </div>
      </section>
      `;
    }
    
    // Concrete example
    if (section.concreteExample) {
      contentHtml += `
      <section style="margin-bottom: 2rem;">
        <h4 style="font-size: 0.95rem; color: var(--ink-dark); margin-bottom: 0.75rem;">Concrete Example</h4>
        <div style="padding: 1rem; background: rgba(100, 100, 100, 0.04); border-left: 3px solid #666; border-radius: 4px; font-size: 0.9rem; line-height: 1.6;">
          <p style="margin: 0; font-style: italic;">${escapeHtml(section.concreteExample)}</p>
        </div>
      </section>
      `;
    }
    
    // Tips
    if (section.tips && section.tips.length > 0) {
      contentHtml += `
      <section style="margin-bottom: 1rem;">
        <h4 style="font-size: 0.95rem; color: var(--ink-dark); margin-bottom: 0.75rem;">Actionable Tips</h4>
        <ul style="margin: 0; padding-left: 1.5rem;">
          ${section.tips.map((tip) => `<li style="margin-bottom: 0.5rem;">${escapeHtml(tip)}</li>`).join('')}
        </ul>
      </section>
      `;
    }
    
    moduleSectionCard.innerHTML = contentHtml;
  } else {
    // OLD FORMAT: Standard modules
    moduleSummary.textContent = section.summary;
    moduleSectionCard.innerHTML = `
      <p>${escapeHtml(section.example)}</p>
      <ul>${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    `;
  }

  modulePrevBtn.disabled = index === 0;
  moduleNextBtn.disabled = index === total - 1;

  const isLastModule = index === total - 1;
  moduleQuiz.classList.toggle("is-hidden", !isLastModule);
  if (isLastModule && !state.aiQuizGenerated && !state.aiQuizLoading) {
    generateAIQuiz();
  }

  startPracticeBtn.disabled = false;
  startPracticeBtn.textContent = "Start Conversation Practice";
}

function getQuizGoalText() {
  const presetId = state.userLearningGoals[0];
  const custom = state.userCustomGoals[0];
  if (presetId) {
    return LEARNING_GOALS.find((g) => g.id === presetId)?.title || presetId;
  }
  return custom || "difficult conversations";
}

function renderAIQuiz() {
  if (!aiQuizContainer) return;

  if (state.aiQuizLoading) {
    aiQuizContainer.innerHTML = `<p class="muted ai-quiz-loading">Generating your reflection questions...</p>`;
    if (submitQuizBtn) submitQuizBtn.disabled = true;
    return;
  }

  if (!state.aiQuizQuestions.length) {
    aiQuizContainer.innerHTML = `<p class="muted">Could not generate questions. Write one thing you want to remember from what you just learned.</p>
      <textarea class="ai-quiz-textarea" data-qi="0" rows="3" placeholder="Your reflection..."></textarea>`;
    if (submitQuizBtn) submitQuizBtn.disabled = false;
    return;
  }

  aiQuizContainer.innerHTML = state.aiQuizQuestions.map((q, i) => `
    <div class="ai-quiz-question">
      <p class="ai-quiz-q-label">${escapeHtml(q)}</p>
      <textarea class="ai-quiz-textarea" data-qi="${i}" rows="3" placeholder="Write your honest answer here..."></textarea>
    </div>
  `).join("");
  if (submitQuizBtn) submitQuizBtn.disabled = false;
}

async function generateAIQuiz() {
  state.aiQuizLoading = true;
  state.aiQuizGenerated = false;
  renderAIQuiz();

  const goal = getQuizGoalText();
  const systemPrompt = {
    role: "system",
    content: `You generate deep, open-ended reflection questions for adult learners studying difficult conversations.
The learner has just completed two learning tracks:
1. Goal-specific modules tailored to: "${goal}"
2. The ILETS Framework — a 5-stage structure for any difficult conversation: Introduce (set purpose), Listen (understand before arguing), Empathize (acknowledge emotion and pressure), Talk (speak with evidence, not attack), Solve (close with concrete commitments).

Generate exactly 3 reflection questions that:
- Are open-ended (no right/wrong answer)
- Connect the learner's specific goal to the ILETS stages
- Push beyond recall — ask them to analyze a real situation, challenge an assumption, or predict a difficulty
- Are varied: one about themselves, one about the other person's perspective, one about applying the structure
- Are specific, not generic ("How would you handle feedback?")

Return ONLY a valid JSON array of 3 question strings. No markdown, no extra text.
Example: ["Question 1?", "Question 2?", "Question 3?"]`
  };

  const userPrompt = {
    role: "user",
    content: `Generate 3 deep reflection questions for a learner whose focus is: "${goal}"`
  };

  try {
    const response = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt, userPrompt] });
    const cleaned = response.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed) && parsed.length > 0) {
      state.aiQuizQuestions = parsed.slice(0, 3);
    } else {
      state.aiQuizQuestions = [];
    }
  } catch {
    state.aiQuizQuestions = [];
  }

  state.aiQuizLoading = false;
  state.aiQuizGenerated = true;
  renderAIQuiz();
}

function getLearningModules() {
  // If we have a full tailored learning path (7+ modules), use only that
  if (state.customTailoredModules.length >= 7) {
    return state.customTailoredModules;
  }
  // Otherwise mix any partial tailored modules with defaults
  return [...state.customTailoredModules, ...MODULE_SECTIONS];
}

async function generateContextualHintsForScenario(scenario) {
  if (!scenario) return {};
  
  const userGoals = [...state.userLearningGoals.map((id) => {
    const goal = LEARNING_GOALS.find((g) => g.id === id);
    return goal?.title || id;
  }), ...state.userCustomGoals];
  
  const hintsCache = {};
  
  // Generate hints for each stage
  for (const stage of ILETS) {
    try {
      const prompt = {
        role: "system",
        content: `You are a conversation coach helping someone practice the "${stage}" stage in this role-play scenario.

Scenario:
- Title: ${scenario.title}
- Situation: ${scenario.context}
- AI will play: ${scenario.aiRole}
- User's learning goals: ${userGoals.length > 0 ? userGoals.join(", ") : "general communication"}
- User's role: ${scenario.aiRole ? "Colleague/peer in conversation with " + scenario.aiRole : "Someone in a difficult conversation"}

At the "${stage}" stage, the user should:
${stage === "Introduce" ? "Open clearly with intent and purpose, setting a respectful tone" : stage === "Listen" ? "Ask genuine questions to understand the other person's perspective" : stage === "Empathize" ? "Show understanding and acknowledge what's valid in their viewpoint" : stage === "Talk" ? "Share their perspective clearly and explain why it matters" : "Propose concrete next steps and reach agreement"}

Generate 3 specific conversation starters for this exact scenario. They should:
- Be realistic things someone would naturally say
- Reference specific details from the situation
- Fit the user's learning goals
- Not be generic or vague

Return ONLY JSON:
{
  "starters": [
    {"text": "First specific opening for this scenario", "style": "direct"},
    {"text": "Second specific opening for this scenario", "style": "balanced"},
    {"text": "Third specific opening for this scenario", "style": "empathetic"}
  ]
}`,
      };

      const response = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [prompt] });
      const parsed = JSON.parse(response);
      hintsCache[stage] = parsed.starters || [];
    } catch (error) {
      console.warn(`Failed to generate hints for ${stage}:`, error);
      hintsCache[stage] = [];
    }
  }
  
  return hintsCache;
}

function renderBriefingPage() {
  const scenario = getScenario();
  const scenarioScaffoldLevel = normalizeScaffoldLevel(Number(scenario.scaffoldLevel || 1));
  const scenarioTypeLabel = scenario.scenarioType === "hierarchical" ? "Hierarchical dynamics" : "General difficult conversation";

  briefScenarioTitle.textContent = scenario.title;
  briefScenarioDifficulty.textContent = `Challenge: ${scenario.difficulty} | Type: ${scenarioTypeLabel}`;
  briefContext.textContent = scenario.context;
  briefRole.innerHTML = `<span class="role-badge">Talking with: ${escapeHtml(scenario.aiRole)}</span>`;
  if (selectedUserName) {
    selectedUserName.textContent = getLearnerName();
  }
  if (briefUserNameInput) {
    briefUserNameInput.value = state.userName;
  }
  if (userNameEditor) {
    userNameEditor.classList.toggle("is-hidden", !state.nameEditorOpen);
  }
  if (editUserNameBtn) {
    editUserNameBtn.textContent = state.nameEditorOpen ? "Done" : "Edit";
    editUserNameBtn.setAttribute("aria-expanded", state.nameEditorOpen ? "true" : "false");
  }
  
  // Render scenario image if available
  const imageSection = document.getElementById("briefScenarioImageSection");
  const imageElement = document.getElementById("briefScenarioImage");
  if (scenario.imageUrl && imageElement && imageSection) {
    imageElement.src = scenario.imageUrl;
    imageElement.alt = `Visual context for: ${scenario.title}`;
    imageSection.classList.remove("is-hidden");
  } else if (imageSection) {
    imageSection.classList.add("is-hidden");
  }
  
  briefGoals.innerHTML = scenario.goals
    .map((goal) => `<li>${escapeHtml(goal)}</li>`)
    .join("");
  
  // Render user's selected learning goals
  const userLearningGoalsList = document.getElementById("userLearningGoalsList");
  const userLearningGoalsSection = document.getElementById("userLearningGoalsSection");
  if (userLearningGoalsList && userLearningGoalsSection) {
    const allUserGoals = [...state.userLearningGoals, ...state.userCustomGoals];
    if (allUserGoals && allUserGoals.length > 0) {
      const goalsHtml = state.userLearningGoals
        .map((goalId) => {
          const goal = LEARNING_GOALS.find((g) => g.id === goalId);
          return goal ? `<div class="user-goal-badge">${escapeHtml(goal.title)}</div>` : "";
        })
        .join("") + 
        state.userCustomGoals
          .map((customGoal) => `<div class="user-goal-badge" style="background: rgba(14, 163, 122, 0.2); color: var(--ink);">${escapeHtml(customGoal)}</div>`)
          .join("");
      userLearningGoalsList.innerHTML = goalsHtml || "No goals selected yet.";
      userLearningGoalsSection.classList.remove("is-hidden");
    } else {
      userLearningGoalsSection.classList.add("is-hidden");
    }
  }
  
  briefOpening.innerHTML = `<em>${escapeHtml(scenario.opening)}</em>`;

  if (briefScaffoldHint) {
    briefScaffoldHint.textContent = `Choose how much support you want before starting. Scenario default: ${SCAFFOLD_LEVELS[scenarioScaffoldLevel].label}.`;
  }

  if (briefScaffoldLevelGroup) {
    briefScaffoldLevelGroup.querySelectorAll("[data-brief-scaffold]").forEach((button) => {
      const level = normalizeScaffoldLevel(Number(button.getAttribute("data-brief-scaffold")));
      const active = level === state.scaffold.level;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }
  
  scenarioPickerSection.classList.add("is-hidden");
  scenarioBriefingSection.classList.remove("is-hidden");
  pickerActions.classList.add("is-hidden");
  
  // Generate contextual hints for this scenario asynchronously
  if (scenario && !scenario.contextualHints) {
    generateContextualHintsForScenario(scenario).then((hints) => {
      // Store in scenario object so we can use later during practice
      if (scenario) {
        scenario.contextualHints = hints;
      }
    }).catch((err) => {
      console.warn("Failed to generate contextual hints:", err);
    });
  }
}

function renderScenarioPicker() {
  state.nameEditorOpen = false;
  void ensureGoalTailoredScenario();
  const previewCount = 6;
  const orderedScenarios = getOrderedScenarios();
  const visibleScenarios = state.scenarioPickerExpanded
    ? orderedScenarios
    : orderedScenarios.slice(0, previewCount);

  if (userNameInput && document.activeElement !== userNameInput) {
    userNameInput.value = state.userName;
  }

  if (scenarioNameSetup) {
    scenarioNameSetup.classList.toggle("is-hidden", hasLearnerName());
  }

  if (briefingSubtitle) {
    briefingSubtitle.textContent = hasLearnerName()
      ? "Choose or create a scenario below."
      : "Set your name once, then choose or create a scenario below.";
  }

  // Add goal-context header if goals are selected
  const goalsHeading = document.getElementById("scenarioPickerGoalsHeading");
  if (goalsHeading) {
    if (state.userLearningGoals.length > 0 || state.userCustomGoals.length > 0) {
      const allGoals = [
        ...state.userLearningGoals.map((id) => {
          const goal = LEARNING_GOALS.find((g) => g.id === id);
          return goal?.title || id;
        }),
        ...state.userCustomGoals,
      ];
      
      const goalContextHtml = `
        <div class="scenario-goals-context-bar">
          <span class="sgc-label">Scenarios matched to your goal:</span>
          <span class="sgc-goals">${allGoals.map((g) => `<strong>${escapeHtml(g)}</strong>`).join(", ")}</span>
        </div>
      `;
      goalsHeading.innerHTML = goalContextHtml;
      goalsHeading.classList.remove("is-hidden");
    } else {
      goalsHeading.classList.add("is-hidden");
    }
  }

  if (scenarioPickerGrid && state.goalScenarioLoading) {
    scenarioPickerGrid.innerHTML = `
      <article class="scenario-picker-card active" style="grid-column: 1 / -1; text-align: left;">
        <div class="recommended-badge" style="background: rgba(14, 163, 122, 0.9);">Building your personalized scenario</div>
        <div style="padding: 0.75rem 0 0;">
          <strong style="display:block; margin-bottom: 0.5rem;">Creating a scenario from your goals</strong>
          <p class="muted" style="margin: 0;">AI is generating a practice situation based on the learning goals you selected. This usually takes a few seconds.</p>
        </div>
      </article>
    `;
    return;
  }

  scenarioPickerGrid.innerHTML = visibleScenarios
    .map((scenario) => {
      const scenarioGoals = getScenarioGoalMatch(scenario.id);
      const goalBadges = scenarioGoals
        .map((goalId) => {
          const goal = LEARNING_GOALS.find((g) => g.id === goalId);
          return goal ? `<span class="goal-badge" title="${escapeHtml(goal.title)}">${escapeHtml(goal.title)}</span>` : "";
        })
        .join("");
      const isRecommended = state.userLearningGoals.length > 0 && scenarioGoals.some((id) => state.userLearningGoals.includes(id));
      const isTailored = scenario.isCustom || scenario.customGoal;

      return `
      <article class="scenario-picker-card ${scenario.id === state.selectedScenarioId ? "active" : ""} ${isRecommended ? "is-recommended" : ""} ${isTailored ? "is-tailored" : ""}" data-scenario-id="${escapeHtml(scenario.id)}">
        <button class="picker-card-select" data-scenario-id="${escapeHtml(scenario.id)}" type="button">
          ${scenario.imageUrl ? `<img class="picker-card-illustration" src="${escapeHtml(scenario.imageUrl)}" alt="Illustration for ${escapeHtml(scenario.title)}" />` : ""}
          ${isTailored ? '<span class="recommended-badge">✦ Matched to your goal</span>' : isRecommended ? '<span class="recommended-badge">Recommended</span>' : ""}
          <div class="picker-card-head">
            <strong>${escapeHtml(scenario.title)}</strong>
            <span class="picker-card-badge">${escapeHtml(scenario.difficulty)}</span>
          </div>
          <p class="picker-card-text">${escapeHtml(scenario.context.substring(0, 110))}...</p>
          <p class="picker-card-role">Partner: ${escapeHtml(scenario.aiRole)}</p>
          ${goalBadges ? `<div class="picker-card-goals">${goalBadges}</div>` : ""}
        </button>
        <div class="picker-card-actions">
          <button class="picker-card-choose-btn picker-card-select" data-scenario-id="${escapeHtml(scenario.id)}" type="button">
            Choose this scenario
          </button>
          <div class="picker-card-actions-right">
          <button class="picker-card-icon-btn" data-scenario-action="edit" data-scenario-id="${escapeHtml(scenario.id)}" type="button" aria-label="Edit scenario ${escapeHtml(scenario.title)}" title="Edit scenario">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 15.5V20h4.5L19.7 8.8a1.8 1.8 0 0 0 0-2.6l-1.9-1.9a1.8 1.8 0 0 0-2.6 0L4 15.5Zm2 1.1 9.5-9.5 1.8 1.8L7.8 18.4H6v-1.8Z" />
            </svg>
          </button>
          <button class="picker-card-icon-btn danger" data-scenario-action="delete" data-scenario-id="${escapeHtml(scenario.id)}" type="button" aria-label="Delete scenario ${escapeHtml(scenario.title)}" title="Delete scenario">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.5 4.5h7l.6 1.6H20v2h-1.4l-.8 10.4A2.3 2.3 0 0 1 15.5 20h-7a2.3 2.3 0 0 1-2.3-1.5L5.4 8.1H4v-2h3l1.5-1.6Zm1.2 1.6-.4.5h5.4l-.3-.5H9.7Zm-1 3 .7 8.7c0 .2.2.4.5.4h6.3c.3 0 .5-.2.5-.4l.7-8.7H8.7Zm2.1 1.3h1.9v5.2h-1.9v-5.2Zm3.2 0h1.9v5.2H14v-5.2Z" />
            </svg>
          </button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");

  if (orderedScenarios.length > previewCount) {
    toggleScenarioPickerListBtn.classList.remove("is-hidden");
    const hiddenCount = orderedScenarios.length - previewCount;
    toggleScenarioPickerListBtn.textContent = state.scenarioPickerExpanded
      ? "Show fewer scenarios"
      : `More scenarios (${hiddenCount})`;
  } else {
    toggleScenarioPickerListBtn.classList.add("is-hidden");
  }

  scenarioPickerSection.classList.remove("is-hidden");
  scenarioBriefingSection.classList.add("is-hidden");
  pickerActions.classList.remove("is-hidden");
}

function getOrderedScenarios() {
  // Separate custom tailored scenarios from base scenarios
  const tailoredScenarios = state.scenarios.filter((s) => s.isCustom || s.customGoal);
  const baseScenarios = state.scenarios.filter((s) => !s.isCustom && !s.customGoal);

  // Sort base scenarios
  const sortedBase = baseScenarios
    .map((scenario, index) => ({ scenario, index }))
    .sort((a, b) => {
      if (a.scenario.custom !== b.scenario.custom) {
        return Number(b.scenario.custom) - Number(a.scenario.custom);
      }
      if (a.scenario.custom && b.scenario.custom) {
        return (b.scenario.createdAt || 0) - (a.scenario.createdAt || 0);
      }
      return a.index - b.index;
    })
    .map((entry) => entry.scenario);

  // If user has selected learning goals, reorder by goal relevance
  let reordered = sortedBase;
  if (state.userLearningGoals && state.userLearningGoals.length > 0) {
    reordered = getRecommendedScenariosForGoals(state.userLearningGoals);
  }

  // Prioritize custom tailored scenarios first
  return [...tailoredScenarios, ...reordered];
}

const PEER_DIRECTORY = [
  { id: "sarah-uk", name: "Sarah", country: "United Kingdom", focus: "Listen" },
  { id: "dimas-id", name: "Dimas", country: "Indonesia", focus: "Introduce" },
  { id: "mei-sg", name: "Mei", country: "Singapore", focus: "Empathize" },
  { id: "carlos-mx", name: "Carlos", country: "Mexico", focus: "Talk" },
  { id: "amina-ke", name: "Amina", country: "Kenya", focus: "Solve" },
  { id: "luca-it", name: "Luca", country: "Italy", focus: "Listen" },
];

function persistPeerRequests() {
  localStorage.setItem(PEER_REQUESTS_KEY, JSON.stringify(state.peer.requests.slice(-50)));
}

function persistPeerSessionHistory() {
  localStorage.setItem(PEER_SESSION_HISTORY_KEY, JSON.stringify(state.peer.sessionHistory.slice(-60)));
}

function renderPeerDirectory() {
  peerUserDirectory.innerHTML = PEER_DIRECTORY.map((user) => `
    <article class="peer-user-card">
      <h4>${escapeHtml(user.name)}</h4>
      <p class="muted">${escapeHtml(user.country)} · Practicing: <strong>${escapeHtml(user.focus)}</strong></p>
      <button type="button" data-peer-request="${escapeHtml(user.id)}">Request Practice</button>
    </article>
  `).join("");
}

function renderPeerRequests() {
  if (!state.peer.requests.length) {
    peerRequestList.innerHTML = "<li class=\"muted\">No requests yet. Ask someone from the directory to practice.</li>";
    return;
  }

  peerRequestList.innerHTML = state.peer.requests
    .slice()
    .reverse()
    .map((request) => {
      const user = PEER_DIRECTORY.find((item) => item.id === request.peerId);
      const peerName = user?.name || "Peer";
      const status = request.status || "pending";
      const action = status === "accepted"
        ? `<button class=\"ghost\" type=\"button\" data-peer-start=\"${request.id}\">Start Conversation</button>`
        : `<button class=\"ghost\" type=\"button\" data-peer-accept=\"${request.id}\">Mark Accepted</button>`;

      return `<li>
        <strong>${escapeHtml(peerName)}</strong> • ${escapeHtml(status)}
        <div class="flow-actions">${action}</div>
      </li>`;
    })
    .join("");
}

function renderPeerTabs() {
  if (peerTabCommunity) {
    peerTabCommunity.classList.toggle("active", state.peer.activeView === "community");
  }

  if (peerTabSession) {
    const sessionAvailable = Boolean(state.peer.activeSession);
    peerTabSession.classList.toggle("active", state.peer.activeView === "session" && sessionAvailable);
    peerTabSession.disabled = !sessionAvailable;
    peerTabSession.setAttribute("aria-disabled", (!sessionAvailable).toString());
    peerTabSession.title = sessionAvailable ? "Open live session" : "Start a peer conversation first";
  }

  if (peerTabReflection) {
    peerTabReflection.classList.toggle("active", state.peer.activeView === "reflection");
  }

  if (peerTabDashboard) {
    peerTabDashboard.classList.toggle("active", state.peer.activeView === "dashboard");
  }
}

function renderPeerDashboardTab(view) {
  state.peer.dashboardView = view;

  document.querySelectorAll("[data-peer-dashboard-view]").forEach((button) => {
    const tabView = button.getAttribute("data-peer-dashboard-view");
    button.classList.toggle("active", tabView === view);
  });

  if (peerDashboardSummary) {
    peerDashboardSummary.classList.toggle("active", view === "summary");
  }
  if (peerDashboardTrend) {
    peerDashboardTrend.classList.toggle("active", view === "trend");
  }
  if (peerDashboardSession) {
    peerDashboardSession.classList.toggle("active", view === "session");
  }
}

function renderPeerDashboard() {
  if (!peerDashboardSummary || !peerDashboardTrend || !peerDashboardSession) {
    return;
  }

  const sessions = state.peer.sessionHistory
    .slice()
    .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
  const totalSessions = sessions.length;
  const totalTurns = sessions.reduce((sum, entry) => sum + Number(entry.turns || 0), 0);
  const averageTurns = totalSessions ? Math.round((totalTurns / totalSessions) * 10) / 10 : 0;
  const stageCompletionRate = totalSessions
    ? Math.round((sessions.filter((entry) => (entry.completedStages || []).length > 0).length / totalSessions) * 100)
    : 0;

  const stageCounts = ILETS.reduce((acc, stage) => {
    acc[stage] = 0;
    return acc;
  }, {});

  sessions.forEach((entry) => {
    (entry.completedStages || []).forEach((stage) => {
      if (stageCounts[stage] !== undefined) {
        stageCounts[stage] += 1;
      }
    });
  });

  const strongestStageEntry = Object.entries(stageCounts).sort((a, b) => b[1] - a[1])[0];
  const strongestStage = strongestStageEntry && strongestStageEntry[1] > 0
    ? strongestStageEntry[0]
    : "No data yet";

  peerDashboardSummary.innerHTML = `
    <div class="peer-dashboard-grid">
      <article class="peer-dashboard-card">
        <p class="muted">Sessions Completed</p>
        <strong>${totalSessions}</strong>
      </article>
      <article class="peer-dashboard-card">
        <p class="muted">Avg Turns / Session</p>
        <strong>${averageTurns}</strong>
      </article>
      <article class="peer-dashboard-card">
        <p class="muted">Stage Practice Rate</p>
        <strong>${stageCompletionRate}%</strong>
      </article>
      <article class="peer-dashboard-card">
        <p class="muted">Your Strongest Stage</p>
        <strong>${escapeHtml(strongestStage)}</strong>
      </article>
    </div>
  `;

  peerDashboardTrend.innerHTML = `
    <ul class="peer-trend-list">
      ${ILETS.map((stage) => {
    const count = stageCounts[stage] || 0;
    const percent = totalSessions ? Math.round((count / totalSessions) * 100) : 0;
    return `
        <li>
          <div class="peer-trend-row">
            <span>${escapeHtml(stage)}</span>
            <strong>${count} sessions</strong>
          </div>
          <div class="peer-trend-bar"><span style="width:${percent}%"></span></div>
        </li>
      `;
  }).join("")}
    </ul>
  `;

  if (!sessions.length) {
    peerDashboardSession.innerHTML = "<p class=\"muted\">No completed peer sessions yet. Finish one conversation to populate analytics.</p>";
  } else {
    peerDashboardSession.innerHTML = sessions
      .slice(0, 8)
      .map((entry) => {
        const completedStages = (entry.completedStages || []).length
          ? entry.completedStages.join(", ")
          : "None recorded";
        return `
          <article class="peer-session-item">
            <p><strong>${escapeHtml(entry.peerName || "Peer")}</strong> • ${new Date(entry.completedAt).toLocaleString()}</p>
            <p class="muted">Turns: ${entry.turns || 0} • Duration: ${entry.durationMin || 0} min</p>
            <p class="muted">Stages: ${escapeHtml(completedStages)}</p>
          </article>
        `;
      })
      .join("");
  }

  renderPeerDashboardTab(state.peer.dashboardView || "summary");
}

function setPeerView(view) {
  if (view !== "session" && state.peer.voice.mode) {
    state.peer.voice.mode = false;
    state.peer.voice.pendingFinal = "";
    state.peer.voice.interim = "";
    state.peer.voice.speaking = false;
    if (peerVoiceSendTimer) {
      clearTimeout(peerVoiceSendTimer);
      peerVoiceSendTimer = null;
    }
    stopPeerVoiceListening();
  }

  if (view === "session" && !state.peer.activeSession) {
    return;
  }

  state.peer.activeView = view;
  renderPeerSession();
}

function renderPeerSession() {
  if (!peerCommunityView || !peerSessionView || !peerFeedbackView || !peerDashboardView) {
    return;
  }

  const session = state.peer.activeSession;
  if (!session && state.peer.activeView === "session") {
    state.peer.activeView = state.peer.lastSessionSummary ? "reflection" : "community";
  }

  renderPeerTabs();

  peerCommunityView.classList.toggle("is-hidden", state.peer.activeView !== "community");
  peerSessionView.classList.toggle("is-hidden", state.peer.activeView !== "session" || !session);
  peerFeedbackView.classList.toggle("is-hidden", state.peer.activeView !== "reflection");
  peerDashboardView.classList.toggle("is-hidden", state.peer.activeView !== "dashboard");

  if (session) {
    peerSessionTitle.textContent = `Conversation with ${session.peerName}`;
    peerSessionMeta.textContent = `Started ${new Date(session.startedAt).toLocaleTimeString()} • Stage focus: ${session.stageFocus}`;

    peerChatMessages.innerHTML = session.messages
      .map((message) => `<article class="peer-chat-item"><small>${escapeHtml(message.author)} • ${new Date(message.timestamp).toLocaleTimeString()}</small><p>${escapeHtml(message.text)}</p></article>`)
      .join("");
    peerChatMessages.scrollTop = peerChatMessages.scrollHeight;
  } else if (peerChatMessages) {
    peerSessionTitle.textContent = "Conversation with Peer";
    peerSessionMeta.textContent = "Select a peer from Community to start a live session.";
    peerChatMessages.innerHTML = `
      <article class="peer-chat-item">
        <small>System</small>
        <p>No active session. Choose Community to request a practice partner.</p>
      </article>
    `;
  }

  document.querySelectorAll("[data-peer-stage]").forEach((checkbox) => {
    const stage = checkbox.getAttribute("data-peer-stage");
    checkbox.checked = Boolean(state.peer.sessionChecklist[stage]);
  });

  if (document.activeElement !== peerSharedNotes) {
    peerSharedNotes.value = state.peer.sharedNotes;
  }

  if (peerSharedNotes) {
    peerSharedNotes.readOnly = state.peer.sharedNotesSaved;
    peerSharedNotes.classList.toggle("peer-field-saved", state.peer.sharedNotesSaved);
  }

  if (peerSaveSharedNotesBtn) {
    peerSaveSharedNotesBtn.disabled = state.peer.sharedNotesSaved;
    peerSaveSharedNotesBtn.textContent = state.peer.sharedNotesSaved ? "Saved" : "Save Notes";
  }

  if (peerEditSharedNotesBtn) {
    peerEditSharedNotesBtn.disabled = !state.peer.sharedNotesSaved;
  }

  if (peerSharedNotesStatus) {
    if (state.peer.sharedNotesSaved && state.peer.sharedNotes) {
      peerSharedNotesStatus.textContent = "Saved. Click Edit to update notes.";
    } else if (state.peer.sharedNotes) {
      peerSharedNotesStatus.textContent = "Unsaved changes.";
    } else {
      peerSharedNotesStatus.textContent = "Not saved yet.";
    }
  }

  if (document.activeElement !== peerFeedbackInput) {
    peerFeedbackInput.value = state.peer.feedbackDraft || "";
  }

  if (peerFeedbackInput) {
    peerFeedbackInput.readOnly = state.peer.feedbackSent;
    peerFeedbackInput.classList.toggle("peer-field-saved", state.peer.feedbackSent);
  }

  if (peerSubmitFeedbackBtn) {
    peerSubmitFeedbackBtn.disabled = state.peer.feedbackSent;
    peerSubmitFeedbackBtn.textContent = state.peer.feedbackSent ? "Sent" : "Send Feedback";
  }

  if (peerEditFeedbackBtn) {
    peerEditFeedbackBtn.disabled = !state.peer.feedbackSent;
  }

  if (peerFeedbackStatus) {
    if (state.peer.feedbackSent && state.peer.feedbackDraft) {
      peerFeedbackStatus.textContent = "Sent. Click Edit to revise feedback.";
    } else if (state.peer.feedbackDraft) {
      peerFeedbackStatus.textContent = "Draft not sent yet.";
    } else {
      peerFeedbackStatus.textContent = "Not sent yet.";
    }
  }

  if (peerReflectionMeta) {
    peerReflectionMeta.textContent = state.peer.lastSessionSummary
      ? `Most recent conversation: ${state.peer.lastSessionSummary.peerName} • ${new Date(state.peer.lastSessionSummary.completedAt).toLocaleTimeString()}`
      : "Finish a conversation to exchange feedback and capture notes.";
  }

  if (peerReflectionSummary) {
    peerReflectionSummary.textContent = state.peer.lastSessionSummary?.summary || "No session summary yet.";
  }

  renderPeerDashboard();

  peerFeedbackList.innerHTML = state.peer.feedbackNotes
    .slice()
    .reverse()
    .map((note) => `<li><strong>${escapeHtml(note.author)}:</strong> ${escapeHtml(note.text)}</li>`)
    .join("");

  renderPeerVoiceUi();
}

function startPeerSession(requestId) {
  const request = state.peer.requests.find((item) => item.id === requestId);
  if (!request) {
    return;
  }
  const peer = PEER_DIRECTORY.find((item) => item.id === request.peerId);

  state.peer.activeSession = {
    id: `session-${Date.now()}`,
    peerId: request.peerId,
    peerName: peer?.name || "Peer",
    startedAt: Date.now(),
    stageFocus: peer?.focus || "Introduce",
    messages: [
      {
        author: "System",
        text: `Session started with ${peer?.name || "peer"}. Focus on respectful role-play and finish with mutual feedback.`,
        timestamp: Date.now(),
      },
    ],
  };
  state.peer.sessionChecklist = {
    Introduce: false,
    Listen: false,
    Empathize: false,
    Talk: false,
    Solve: false,
  };
  state.peer.sharedNotes = "";
  state.peer.sharedNotesSaved = false;
  state.peer.feedbackDraft = "";
  state.peer.feedbackSent = false;
  state.peer.feedbackNotes = [];
  state.peer.activeView = "session";
  state.peer.dashboardView = "summary";
  state.peer.lastSessionSummary = null;
  state.peer.voice.mode = false;
  state.peer.voice.pendingFinal = "";
  state.peer.voice.interim = "";
  state.peer.voice.speaking = false;
  stopPeerVoiceListening();
  renderPeerSession();
}

function endPeerSession() {
  if (!state.peer.activeSession) {
    return;
  }

  const completed = Object.entries(state.peer.sessionChecklist).filter((entry) => entry[1]).map((entry) => entry[0]);
  const learnerTurns = state.peer.activeSession.messages.filter((message) => message.author === getLearnerName()).length;
  const durationMin = Math.max(1, Math.round((Date.now() - state.peer.activeSession.startedAt) / 60000));
  const completedAt = Date.now();
  const summary = `Session ended. Completed ILETS stages: ${completed.length ? completed.join(", ") : "None recorded yet"}.`;
  state.peer.requests.unshift({
    id: `rec-${Date.now()}`,
    peerId: state.peer.activeSession.peerId,
    status: "completed",
    summary,
    createdAt: Date.now(),
  });
  persistPeerRequests();

  state.peer.lastSessionSummary = {
    peerName: state.peer.activeSession.peerName,
    summary,
    completedAt,
  };

  state.peer.sessionHistory.push({
    id: `peer-log-${completedAt}`,
    peerId: state.peer.activeSession.peerId,
    peerName: state.peer.activeSession.peerName,
    completedAt,
    completedStages: completed,
    turns: learnerTurns,
    durationMin,
  });
  state.peer.sessionHistory = state.peer.sessionHistory.slice(-60);
  persistPeerSessionHistory();

  state.peer.activeSession = null;
  state.peer.activeView = "reflection";
  state.peer.voice.mode = false;
  state.peer.voice.pendingFinal = "";
  state.peer.voice.interim = "";
  state.peer.voice.speaking = false;
  stopPeerVoiceListening();
  renderPeerRequests();
  renderPeerSession();
}

function renderPeerPracticum() {
  if (!peerCommunityView || !peerSessionView || !peerFeedbackView || !peerDashboardView) {
    return;
  }

  if (peerIdentityName) {
    peerIdentityName.textContent = getLearnerName();
  }
  if (peerUserNameInput && document.activeElement !== peerUserNameInput) {
    peerUserNameInput.value = state.userName;
  }
  if (peerUserNameEditor) {
    peerUserNameEditor.classList.toggle("is-hidden", !state.peer.nameEditorOpen);
  }
  if (peerEditNameBtn) {
    peerEditNameBtn.textContent = state.peer.nameEditorOpen ? "Done" : "Edit";
    peerEditNameBtn.setAttribute("aria-expanded", state.peer.nameEditorOpen ? "true" : "false");
  }
  renderPeerDirectory();
  renderPeerRequests();
  renderPeerSession();
}

function enterPracticeCompactMode() {
  state.leftVisible = true;
  state.rightVisible = false;
  state.scenarioBriefExpanded = false;
  state.scenariosExpanded = true;
  state.iletsExpanded = true;
  state.rightTab = "practice";
  state.focusMode = false;
}

function computeAnalytics() {
  const userMessages = state.messages.filter((m) => m.role === "user").map((m) => m.content);
  const text = userMessages.join(" ").toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const fillerTerms = ["um", "uh", "like", "you know", "actually", "just", "maybe"];
  const fillerCount = fillerTerms.reduce((sum, term) => {
    const regex = new RegExp(`\\b${term.replace(" ", "\\s+")}\\b`, "g");
    const matches = text.match(regex);
    return sum + (matches ? matches.length : 0);
  }, 0);

  const avgWords = userMessages.length ? Math.round(words.length / userMessages.length) : 0;
  const fillerRate = words.length ? Math.round((fillerCount / words.length) * 1000) / 10 : 0;

  const starters = userMessages
    .map((msg) => msg.trim().split(/\s+/).slice(0, 2).join(" ").toLowerCase())
    .filter(Boolean);
  const starterMap = starters.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  const repeatedStarter = Object.entries(starterMap).sort((a, b) => b[1] - a[1])[0];

  return {
    totalTurns: userMessages.length,
    avgWords,
    fillerCount,
    fillerRate,
    repeatedStarter: repeatedStarter ? `${repeatedStarter[0]} (${repeatedStarter[1]}x)` : "None",
    stageCoverage: Math.round(((state.stageIndex + 1) / ILETS.length) * 100),
  };
}

function getScenario() {
  return state.scenarios.find((s) => s.id === state.selectedScenarioId) || state.scenarios[0];
}

function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function saveSettings() {
  localStorage.setItem("sandbox.mode", state.settings.mode);
  localStorage.setItem("sandbox.proxyUrl", state.settings.proxyUrl);
  localStorage.setItem("sandbox.apiKey", state.settings.apiKey);
  localStorage.setItem("sandbox.model", state.settings.model);
}

function renderScenarios() {
  const selectedScenario = getScenario();
  const previewCount = 3;
  const orderedScenarios = getOrderedScenarios();

  const previewScenarios = state.scenarioListExpanded
    ? orderedScenarios
    : orderedScenarios.slice(0, previewCount);
  const previewIds = new Set(previewScenarios.map((scenario) => scenario.id));
  const visibleScenarios = state.scenarioListExpanded || previewIds.has(selectedScenario.id)
    ? previewScenarios
    : [...previewScenarios, selectedScenario];

  scenarioList.innerHTML = visibleScenarios.map(
    (scenario) => `
      <button class="scenario-btn ${scenario.id === state.selectedScenarioId ? "active" : ""}" data-scenario-id="${scenario.id}" type="button">
        <strong>${escapeHtml(scenario.title)}</strong>
        <small>${escapeHtml(scenario.difficulty)}</small>
      </button>
    `
  ).join("");

  if (state.scenarios.length > previewCount) {
    const toggleLabel = state.scenarioListExpanded ? "Show fewer scenarios" : `More scenarios (${state.scenarios.length - previewCount})`;
    scenarioList.insertAdjacentHTML(
      "beforeend",
      `<button class="scenario-list-more ghost" type="button" data-scenario-list-toggle="true">${toggleLabel}</button>`
    );
  }
}

function renderStages() {
  stageList.innerHTML = ILETS.map((stage, index) => {
    const done = index < state.stageIndex;
    const active = index === state.stageIndex;
    const classes = ["stage-item", done ? "done" : "", active ? "active" : ""].join(" ").trim();
    return `<li><button class="${classes}" data-stage-index="${index}" type="button">${index + 1}. ${stage}</button></li>`;
  }).join("");

  const helpText = {
    Introduce: "Introduce: Open with purpose and respectful intent.",
    Listen: "Listen: Ask open questions and invite their perspective.",
    Empathize: "Empathize: Name pressure or emotion without losing your point.",
    Talk: "Talk: State behavior, impact, and risk with concrete examples.",
    Solve: "Solve: End with action, owner, and follow-up time.",
  };
  if (stageHelp) {
    stageHelp.textContent = helpText[ILETS[state.stageIndex]];
  }
  if (stageProgress) {
    stageProgress.textContent = `Progress: ${state.stageIndex + 1} of ${ILETS.length} stages`;
  }
}

function renderScenariosVisibility() {
  scenariosBody.classList.toggle("is-collapsed", !state.scenariosExpanded);
  toggleScenariosBtn.textContent = state.scenariosExpanded ? "Hide" : "Show";
}

function renderIletsVisibility() {
  iletsBody.classList.toggle("is-collapsed", !state.iletsExpanded);
  toggleIletsBtn.textContent = state.iletsExpanded ? "Hide" : "Show";
}

function renderPracticeStrip() {
  const currentStage = ILETS[state.stageIndex];
  const scenario = getScenario();
  const liveStarters = buildConversationGuidedHints(currentStage, scenario, state.messages.slice(-6));

  // Use contextual hints from scenario if available, otherwise use the live conversation hints or the default guide.
  let guide = scenario.practice?.[currentStage] || STAGE_GUIDE[currentStage];
  const contextualStarters = scenario.contextualHints && scenario.contextualHints[currentStage];
  guide = {
    ...guide,
    starters: liveStarters.length > 0
      ? liveStarters
      : (contextualStarters && contextualStarters.length > 0 ? contextualStarters : (guide.starters || [])),
  };
  
  const scaffold = getScaffoldLevelConfig();
  const hintsAlwaysVisible = state.scaffold.level === 1;
  const hintsDisabled = state.scaffold.level === 3;
  const showHints = hintsAlwaysVisible || state.scaffold.hintsVisible;

  stageObjectiveTitle.textContent = currentStage;
  stageObjectiveText.textContent = guide.objective;

  if (stageStartersMeta) {
    stageStartersMeta.textContent = hintsDisabled
      ? "Level 3 minimizes support. Continue without sentence starters."
      : (showHints
        ? scaffold.summary
        : "Hints are hidden. Try your own opening first, then use Show Hints if needed.");
  }

  if (practiceScaffoldChip) {
    const chipDetail = state.scaffold.level === 1
      ? "Always-on hints"
      : (state.scaffold.level === 2
        ? (showHints ? "Hints revealed after pause" : "Hints hidden until request or pause")
        : "Independent mode");
    practiceScaffoldChip.textContent = `Active Scaffold: ${scaffold.label} (${chipDetail})`;
  }

  if (toggleStartersBtn) {
    toggleStartersBtn.disabled = hintsAlwaysVisible || hintsDisabled;
    toggleStartersBtn.textContent = hintsAlwaysVisible
      ? "Hints Always On"
      : (hintsDisabled ? "Hints Off in Level 3" : (showHints ? "Hide Hints" : "Show Hints"));
    toggleStartersBtn.setAttribute("aria-pressed", showHints ? "true" : "false");
  }

  if (showHints && !hintsDisabled) {
    const starters = guide.starters;
    const hasTemplates = starters.length > 0 && typeof starters[0] === "object" && starters[0].style;
    
    if (hasTemplates) {
      // Render template tabs (deferential, balanced, direct)
      stageStarters.innerHTML = starters
        .map(
          (template) =>
            `<div class="starter-template" data-template-style="${escapeHtml(template.style || "")}">
              <span class="template-style-badge">${escapeHtml(template.style || "").charAt(0).toUpperCase() + (template.style || "").slice(1)}</span>
              <button class="starter-chip" type="button" data-starter="${escapeHtml(template.text)}">${escapeHtml(template.text)}</button>
            </div>`
        )
        .join("");
    } else {
      // Fallback to simple string starters
      stageStarters.innerHTML = starters
        .map(
          (starter) =>
            `<button class="starter-chip" type="button" data-starter="${escapeHtml(starter)}">${escapeHtml(starter)}</button>`
        )
        .join("");
    }
  } else {
    stageStarters.innerHTML = "<p class=\"muted starter-empty\">Hints are hidden for this level.</p>";
  }

  nextStageBtn.disabled = state.stageIndex === ILETS.length - 1;
  nextStageBtn.textContent =
    state.stageIndex === ILETS.length - 1 ? "Final Stage Reached" : "Mark Stage Done";
}

function normalizeGoalLabel(value) {
  return String(value || "").trim().toLowerCase();
}

function getActiveGoalLabels() {
  return [
    ...state.userLearningGoals.map((id) => {
      const goal = LEARNING_GOALS.find((item) => item.id === id);
      return goal?.title || id;
    }),
    ...state.userCustomGoals,
  ].filter(Boolean);
}

function getGoalScenarioSignature(goalLabels) {
  return goalLabels.map(normalizeGoalLabel).sort().join(" | ");
}

function getConversationSnippet(messages, role) {
  const match = [...messages].reverse().find((message) => message.role === role)?.content || "";
  return match.trim().replace(/\s+/g, " ").slice(0, 90);
}

function buildConversationGuidedHints(stage, scenario, messages) {
  if (!messages || messages.length === 0) {
    return [];
  }

  const assistantSnippet = getConversationSnippet(messages, "assistant");
  const userSnippet = getConversationSnippet(messages, "user");
  const focusSnippet = assistantSnippet || userSnippet || scenario?.context || scenario?.title || "this conversation";
  const cleanFocus = focusSnippet.replace(/["'`]/g, "");

  switch (stage) {
    case "Introduce":
      return [
        { style: "direct", text: `Open by naming the point the AI just raised: ${cleanFocus}.` },
        { style: "balanced", text: `State your goal clearly and connect it to what was just discussed.` },
        { style: "empathetic", text: `Acknowledge their last concern before you move into your point.` },
      ];
    case "Listen":
      return [
        { style: "direct", text: `Ask what they mean by ${cleanFocus}.` },
        { style: "balanced", text: `Invite them to explain their side before you respond again.` },
        { style: "empathetic", text: `Reflect back the pressure or frustration in their last reply.` },
      ];
    case "Empathize":
      return [
        { style: "direct", text: `Name the valid point in their last message before adding your view.` },
        { style: "balanced", text: `Show you understand why ${cleanFocus} feels difficult for them.` },
        { style: "empathetic", text: `Use one sentence to validate the emotion behind their reply.` },
      ];
    case "Talk":
      return [
        { style: "direct", text: `Bring the conversation back to ${cleanFocus} with one concrete example.` },
        { style: "balanced", text: `Explain the impact of what was just said and why it matters.` },
        { style: "empathetic", text: `Keep the point firm but respectful, then state what you need next.` },
      ];
    case "Solve":
      return [
        { style: "direct", text: `Turn the last exchange into one specific next step.` },
        { style: "balanced", text: `Suggest an action, an owner, and a check-in tied to this conversation.` },
        { style: "empathetic", text: `Close by aligning on a solution that answers the concern they just voiced.` },
      ];
    default:
      return [];
  }
}

async function generateDynamicHintsFromConversation(scenario, stage, messages) {
  const userGoals = getActiveGoalLabels();
  const transcript = messages
    .map((message, index) => `${index + 1}. ${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  const prompt = {
    role: "system",
    content: `You are a conversation coach. Generate 3 short sentence starters for the ${stage} stage.

Use the recent conversation to make them feel immediate and specific.
Scenario title: ${scenario?.title || "Unknown"}
Scenario context: ${scenario?.context || "Unknown"}
User goals: ${userGoals.length > 0 ? userGoals.join(", ") : "general communication"}

Recent conversation:
${transcript || "No conversation yet."}

Return ONLY JSON in this format:
{
  "starters": [
    {"text": "...", "style": "direct"},
    {"text": "...", "style": "balanced"},
    {"text": "...", "style": "empathetic"}
  ]
}`,
  };

  try {
    const response = await callProxyAPI({ model: state.settings.model, messages: [prompt] });
    const parsed = JSON.parse(response);
    return Array.isArray(parsed?.starters) ? parsed.starters.filter((item) => item && item.text) : [];
  } catch (error) {
    console.warn("Failed to generate live hints:", error);
    return buildConversationGuidedHints(stage, scenario, messages);
  }
}

async function refreshDynamicPracticeHints() {
  const scenario = getScenario();
  if (!scenario) {
    return;
  }

  const stage = ILETS[state.stageIndex];
  const signature = `${scenario.id}:${stage}:${state.messages.slice(-6).map((message) => `${message.role}:${message.content}`).join("|")}`;
  if (state.dynamicHintGenerationKey === signature) {
    return;
  }

  state.dynamicHintGenerationKey = signature;
  try {
    const hints = await generateDynamicHintsFromConversation(scenario, stage, state.messages.slice(-6));
    scenario.contextualHints = scenario.contextualHints || {};
    scenario.contextualHints[stage] = hints;
  } finally {
    state.dynamicHintGenerationKey = null;
    if (state.page === "practice") {
      renderPracticeStrip();
    }
  }
}

async function ensureGoalTailoredScenario() {
  const goalLabels = getActiveGoalLabels();
  if (!goalLabels.length) {
    return;
  }

  const signature = getGoalScenarioSignature(goalLabels);
  if (state.goalScenarioGenerationKey === signature) {
    return;
  }

  const existingScenario = state.scenarios.find((scenario) => {
    const scenarioSignature = getGoalScenarioSignature([scenario.customGoal || scenario.title || ""]);
    return scenario.goalSignature === signature || scenario.customGoalSignature === signature || scenarioSignature === signature;
  });

  if (existingScenario) {
    return;
  }

  state.goalScenarioGenerationKey = signature;
  state.goalScenarioLoading = true;
  if (state.page === "choice") {
    renderScenarioPicker();
  }
  try {
    const tailoredScenario = await generateTailoredPracticeScenario(goalLabels.join(", "));
    tailoredScenario.goalSignature = signature;
    tailoredScenario.customGoalSignature = signature;
    tailoredScenario.customGoal = goalLabels.join(", ");
    tailoredScenario.isCustom = true;
    tailoredScenario.custom = true;
    tailoredScenario.createdAt = Date.now();
    state.scenarios.unshift(tailoredScenario);
    state.customTailoredScenarios.unshift(tailoredScenario);
    state.selectedScenarioId = tailoredScenario.id;
    persistCustomScenarios();
    if (state.page === "choice") {
      renderScenarioPicker();
    }
  } catch (error) {
    console.error("Failed to generate goal-tailored scenario:", error);
  } finally {
    state.goalScenarioGenerationKey = null;
    state.goalScenarioLoading = false;
    if (state.page === "choice") {
      renderScenarioPicker();
    }
  }
}

function renderCoachNote() {
  const note = (state.coachNote || "").trim();
  const wrap = document.getElementById("coachNoteWrap");
  if (wrap) {
    if (note) {
      wrap.classList.remove("is-hidden");
    } else {
      wrap.classList.add("is-hidden");
    }
  }
  if (coachNote) {
    coachNote.textContent = note;
  }
  if (coachNoteList) {
    coachNoteList.innerHTML = "";
  }
}

function renderLiveFeedbackPanel() {
  if (!feedbackPanel || state.page !== "practice") {
    return;
  }

  const turns = getUserTurnCount();
  if (turns === 0) {
    feedbackPanel.innerHTML = `
      <h3>Gap Analysis</h3>
      <p class="muted">No values yet. Send your first response to see live progress here, then click Finish + Feedback for full session review.</p>
    `;
    return;
  }

  const scores = getStageScoresFromMessages(state.messages);
  const weak = scores.filter((item) => item.score === 0).map((item) => item.stage);
  const strong = scores.filter((item) => item.score === 2).map((item) => item.stage);
  const stageCoverage = Math.round(((state.stageIndex + 1) / ILETS.length) * 100);

  feedbackPanel.innerHTML = `
    <h3>Gap Analysis (Live)</h3>
    <p class="analytics-metric">Turns: ${turns} | Stage coverage: ${stageCoverage}%</p>
    <p class="muted">Current stage: ${escapeHtml(ILETS[state.stageIndex])}</p>
    <ul>
      <li><strong>Strength signal:</strong> ${escapeHtml(strong.length ? strong.join(", ") : "Building baseline")}</li>
      <li><strong>Focus now:</strong> ${escapeHtml(weak.length ? weak.join(", ") : "Move to next stage with clearer evidence")}</li>
    </ul>
    <p class="muted">Finish + Feedback gives full coaching, reflection, and analytics.</p>
  `;
}

function renderRightPanel() {
  const tabs = rightTabs.querySelectorAll(".right-tab");
  tabs.forEach((tab) => {
    const isActive = tab.getAttribute("data-right-tab") === state.rightTab;
    tab.classList.toggle("active", isActive);
  });

  sectionCoach.classList.toggle("active", state.rightTab === "coach");
  sectionFeedback.classList.toggle("active", state.rightTab === "feedback");
  sectionPractice.classList.toggle("active", state.rightTab === "practice");
}

function renderFocusMode() {
  document.body.classList.toggle("focus-mode", state.focusMode);
  toggleFocusBtn.classList.toggle("is-active", state.focusMode);
  toggleFocusBtn.title = state.focusMode ? "Exit focus mode" : "Enter focus mode";
  toggleFocusBtn.setAttribute("aria-label", toggleFocusBtn.title);
}

function renderColumnVisibility() {
  document.body.classList.toggle("hide-left", !state.leftVisible);
  document.body.classList.toggle("hide-right", !state.rightVisible);
  toggleLeftColumnBtn.classList.toggle("is-active", !state.leftVisible);
  toggleRightColumnBtn.classList.toggle("is-active", !state.rightVisible);
  toggleLeftColumnBtn.title = state.leftVisible ? "Collapse left panel" : "Expand left panel";
  toggleRightColumnBtn.title = state.rightVisible ? "Collapse right panel" : "Expand right panel";
  toggleLeftColumnBtn.setAttribute("aria-label", toggleLeftColumnBtn.title);
  toggleRightColumnBtn.setAttribute("aria-label", toggleRightColumnBtn.title);
  toggleLeftColumnBtn.setAttribute("aria-pressed", (!state.leftVisible).toString());
  toggleRightColumnBtn.setAttribute("aria-pressed", (!state.rightVisible).toString());
}

function renderChat() {
  const typingHtml = state.isTyping
    ? '<article class="message assistant">Thinking through your situation...</article>'
    : "";

  chatMessages.innerHTML = state.messages
    .map(
      (msg) =>
        `<article class="message ${msg.role === "user" ? "user" : "assistant"}">${escapeHtml(msg.content)}</article>`
    )
    .join("") + typingHtml;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderHeader() {
  const scenario = getScenario();
  const scaffold = getScaffoldLevelConfig();
  scenarioTitle.textContent = scenario.title;
  scenarioContext.textContent = "Review the brief below, then start your first response.";
  roleBadge.textContent = `AI Role: ${scenario.aiRole}`;
  practiceIdentity.textContent = `Practicing as: ${getLearnerName()}`;
  if (practiceScaffoldMenuBtn) {
    practiceScaffoldMenuBtn.innerHTML = `
      <span class="scaffold-menu-title">Scaffold Level</span>
      <span class="scaffold-menu-current">${escapeHtml(scaffold.label)}</span>
      <span class="scaffold-menu-change">Change</span>
      <span class="scaffold-menu-caret" aria-hidden="true">▾</span>
    `;
    practiceScaffoldMenuBtn.title = "Change scaffold level";
    practiceScaffoldMenuBtn.setAttribute("aria-label", `Change scaffold level. Current ${scaffold.label}`);
  }

  if (practiceScaffoldMenu) {
    practiceScaffoldMenu.querySelectorAll("[data-practice-scaffold]").forEach((option) => {
      const level = normalizeScaffoldLevel(Number(option.getAttribute("data-practice-scaffold")));
      const baseLabel = option.getAttribute("data-base-label") || option.textContent?.replace(/^\u2713\s*/, "") || "";
      option.setAttribute("data-base-label", baseLabel);
      const active = level === state.scaffold.level;
      option.classList.toggle("active", active);
      option.textContent = active ? `✓ ${baseLabel}` : baseLabel;
    });
  }
}

function setPracticeScaffoldMenuOpen(open) {
  if (!practiceScaffoldMenu || !practiceScaffoldMenuBtn) {
    return;
  }
  practiceScaffoldMenu.classList.toggle("is-hidden", !open);
  practiceScaffoldMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

function renderBrief() {
  if (!scenarioBriefContent) {
    return;
  }
  const scenario = getScenario();

  scenarioBriefContent.innerHTML = `
    <section class="briefing-section">
      <h4 class="briefing-label">Your Situation</h4>
      <p class="briefing-text">${escapeHtml(scenario.context)}</p>
    </section>
    <section class="briefing-section">
      <h4 class="briefing-label">Your Role</h4>
      <p class="briefing-role"><span class="role-badge">Talking with: ${escapeHtml(scenario.aiRole)}</span></p>
    </section>
    <section class="briefing-section">
      <h4 class="briefing-label">What You're Aiming For</h4>
      <ul class="briefing-goals">${scenario.goals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}</ul>
    </section>
  `;
}

function renderScenarioBriefVisibility() {
  if (scenarioBriefBody) {
    scenarioBriefBody.classList.toggle("is-collapsed", !state.scenarioBriefExpanded);
  }
  if (toggleScenarioBriefBtn) {
    toggleScenarioBriefBtn.textContent = state.scenarioBriefExpanded ? "Hide Details" : "Show Details";
  }
}

function openScenarioBuilderForCreate() {
  state.editingScenarioId = null;
  scenarioBuilderForm.reset();
  builderDifficulty.value = "Medium tension";
  if (builderScaffoldLevel) {
    builderScaffoldLevel.value = "1";
  }
  createScenarioBtn.textContent = "Create Scenario";
  scenarioBuilderDialog.showModal();
}

function openScenarioBuilderForEdit(scenarioId) {
  const scenario = state.scenarios.find((item) => item.id === scenarioId);
  if (!scenario) {
    return;
  }

  state.editingScenarioId = scenarioId;
  builderTitle.value = scenario.title;
  builderRole.value = scenario.aiRole;
  builderDifficulty.value = scenario.difficulty;
  builderContext.value = scenario.context;
  builderGoals.value = scenario.goals.join("\n");
  builderOpening.value = scenario.opening;
  if (builderScaffoldLevel) {
    builderScaffoldLevel.value = String(normalizeScaffoldLevel(Number(scenario.scaffoldLevel || 1)));
  }
  createScenarioBtn.textContent = "Save Changes";
  scenarioBuilderDialog.showModal();
}

function deleteCustomScenario(scenarioId) {
  const scenario = state.scenarios.find((item) => item.id === scenarioId);
  if (!scenario) {
    return;
  }

  if (state.scenarios.length <= 1) {
    window.alert("At least one scenario must remain.");
    return;
  }

  const confirmDelete = window.confirm(`Delete scenario \"${scenario.title}\"?`);
  if (!confirmDelete) {
    return;
  }

  state.scenarios = state.scenarios.filter((item) => item.id !== scenarioId);
  persistCustomScenarios();
  persistScenarioOverrides();
  persistHiddenScenarioIds();

  if (state.selectedScenarioId === scenarioId) {
    state.selectedScenarioId = getOrderedScenarios()[0]?.id || DEFAULT_SCENARIOS[0].id;
  }

  render();
  if (state.page === "scenarioBriefing") {
    renderScenarioPicker();
  }
}

function persistScenarioState() {
  persistCustomScenarios();
  persistScenarioOverrides();
  persistHiddenScenarioIds();
}

function renderTips() {
  tipsContent.classList.toggle("is-collapsed", !state.tipsExpanded);
  toggleTipsBtn.textContent = state.tipsExpanded ? "Hide Coaching Tips" : "Show Coaching Tips";
  toggleTipsBtn.setAttribute("aria-expanded", state.tipsExpanded ? "true" : "false");

  const stageDefaults = {
    Introduce: "Start with a clear purpose and respectful intent.",
    Listen: "Use one open question and pause for their perspective.",
    Empathize: "Name emotion or pressure without losing your point.",
    Talk: "Describe behavior and impact with one concrete example.",
    Solve: "Close with action, owner, and follow-up timeline.",
  };

  const currentHint = state.latestHint || stageDefaults[ILETS[state.stageIndex]];
  tipsLead.textContent = `Current tip (${ILETS[state.stageIndex]}): ${currentHint}`;

  const tips = state.hintHistory?.length ? state.hintHistory : Object.values(stageDefaults);
  tipsList.innerHTML = tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
}

function renderGoalsPage() {
  // Clear previous state
  goalsGrid.innerHTML = "";
  customGoalInput.value = "";
  
  // Create checkboxes for each learning goal
  LEARNING_GOALS.forEach((goal) => {
    const isChecked = state.userLearningGoals.includes(goal.id);
    const goalCheckbox = document.createElement("label");
    goalCheckbox.className = "goal-checkbox";
    goalCheckbox.setAttribute("data-goal-id", goal.id);
    
    goalCheckbox.innerHTML = `
      <input type="checkbox" value="${goal.id}" ${isChecked ? "checked" : ""} />
      <div class="goal-checkbox-content">
        <strong>${escapeHtml(goal.title)}</strong>
        <p class="muted">${escapeHtml(goal.description)}</p>
      </div>
    `;
    
    const checkbox = goalCheckbox.querySelector("input");
    checkbox.addEventListener("change", (e) => {
      const goalId = goal.id;
      if (e.target.checked) {
        // Add goal to selected goals (if not already there)
        if (!state.userLearningGoals.includes(goalId)) {
          state.userLearningGoals.push(goalId);
        }
      } else {
        // Remove goal from selected goals
        state.userLearningGoals = state.userLearningGoals.filter((id) => id !== goalId);
      }
      localStorage.setItem("sandbox.userLearningGoals", JSON.stringify(state.userLearningGoals));
      updateGoalsPageState();
    });
    
    goalsGrid.appendChild(goalCheckbox);
  });

  // Render custom goals
  renderCustomGoalsList();
  updateGoalsPageState();
}

function recoverGoalsGridIfMissing() {
  if (!goalsGrid) {
    return;
  }

  const hasRenderedGoals = Boolean(goalsGrid.querySelector('input[type="checkbox"]'));
  if (hasRenderedGoals) {
    return;
  }

  goalsGrid.innerHTML = "";
  LEARNING_GOALS.forEach((goal) => {
    const isChecked = state.userLearningGoals.includes(goal.id);
    const goalCheckbox = document.createElement("label");
    goalCheckbox.className = "goal-checkbox";
    goalCheckbox.setAttribute("data-goal-id", goal.id);

    goalCheckbox.innerHTML = `
      <input type="checkbox" value="${goal.id}" ${isChecked ? "checked" : ""} />
      <div class="goal-checkbox-content">
        <strong>${escapeHtml(goal.title)}</strong>
        <p class="muted">${escapeHtml(goal.description)}</p>
      </div>
    `;

    const checkbox = goalCheckbox.querySelector("input");
    checkbox.addEventListener("change", (event) => {
      const goalId = goal.id;
      if (event.target?.checked) {
        // Add goal to selected goals (if not already there)
        if (!state.userLearningGoals.includes(goalId)) {
          state.userLearningGoals.push(goalId);
        }
      } else {
        // Remove goal from selected goals
        state.userLearningGoals = state.userLearningGoals.filter((id) => id !== goalId);
      }
      localStorage.setItem("sandbox.userLearningGoals", JSON.stringify(state.userLearningGoals));
      updateGoalsPageState();
    });

    goalsGrid.appendChild(goalCheckbox);
  });

  renderCustomGoalsList();
  updateGoalsPageState();
  console.warn("Social Sandbox recovery: goals grid was empty and has been rebuilt.");
}

function runStartupSanityChecks() {
  const missingElements = [];
  const requiredElements = [
    { key: "goalsGrid", value: goalsGrid },
    { key: "goalsNextBtn", value: goalsNextBtn },
    { key: "customGoalInput", value: customGoalInput },
    { key: "addCustomGoalBtn", value: addCustomGoalBtn },
  ];

  requiredElements.forEach((item) => {
    if (!item.value) {
      missingElements.push(item.key);
    }
  });

  if (missingElements.length > 0) {
    console.error(`Startup sanity check failed. Missing required elements: ${missingElements.join(", ")}`);
  }

  if (state.page === "goals") {
    recoverGoalsGridIfMissing();
  }
}

function renderCustomGoalsList() {
  customGoalsList.innerHTML = "";
  state.userCustomGoals.forEach((customGoal, index) => {
    const goalBadge = document.createElement("div");
    goalBadge.className = "custom-goal-badge";
    goalBadge.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      background: rgba(29, 95, 229, 0.12);
      border: 1px solid rgba(29, 95, 229, 0.3);
      border-radius: 6px;
      font-size: 0.9rem;
      color: var(--ink);
    `;
    goalBadge.innerHTML = `
      <span>${escapeHtml(customGoal)}</span>
      <button type="button" aria-label="Remove goal" style="
        background: none;
        border: none;
        color: var(--ink-soft);
        cursor: pointer;
        padding: 0;
        font-size: 1.1rem;
        line-height: 1;
      ">×</button>
    `;
    
    const removeBtn = goalBadge.querySelector("button");
    removeBtn.addEventListener("click", () => {
      state.userCustomGoals.splice(index, 1);
      localStorage.setItem("sandbox.userCustomGoals", JSON.stringify(state.userCustomGoals));
      renderCustomGoalsList();
      updateGoalsPageState();
    });
    
    customGoalsList.appendChild(goalBadge);
  });
}

function updateGoalsPageState() {
  // Multiple-goal mode: at least one goal (preset or custom) is required.
  const totalGoals = state.userLearningGoals.length + state.userCustomGoals.length;
  goalsNextBtn.disabled = totalGoals === 0;
  
  goalsNextBtn.textContent = totalGoals > 0 ? "Continue" : "Select a goal";
}

function getScenarioGoalMatch(scenarioId) {
  // Returns which learning goals this scenario addresses
  const matchedGoals = LEARNING_GOALS.filter((goal) =>
    goal.scenarios.includes(scenarioId)
  ).map((goal) => goal.id);
  return matchedGoals;
}

function getRecommendedScenariosForGoals(goalIds) {
  // Returns scenarios that match the selected learning goals, sorted by relevance
  if (!goalIds || goalIds.length === 0) {
    return state.scenarios;
  }

  // Score each scenario based on how many selected goals it addresses
  const scored = state.scenarios.map((scenario) => {
    const scenarioGoals = getScenarioGoalMatch(scenario.id);
    const matchCount = scenarioGoals.filter((goal) => goalIds.includes(goal)).length;
    return { scenario, matchCount };
  });

  // Sort by match count (descending), then by original order
  return scored.sort((a, b) => b.matchCount - a.matchCount).map((item) => item.scenario);
}

function render() {
  renderScenarios();
  renderScenariosVisibility();
  renderStages();
  renderIletsVisibility();
  renderHeader();
  renderBrief();
  renderScenarioBriefVisibility();
  renderPracticeStrip();
  renderCoachNote();
  renderInMomentReflectionCard();
  renderRightPanel();
  renderLiveFeedbackPanel();
  renderFocusMode();
  renderColumnVisibility();
  renderTips();
  renderChat();
}

function setPending(isPending) {
  sendBtn.disabled = isPending;
  sendBtn.setAttribute("aria-busy", isPending ? "true" : "false");
  promptInput.disabled = isPending;
  state.isTyping = isPending;
  sendBtn.title = isPending ? "Thinking..." : "Send message";
  sendBtn.setAttribute("aria-label", sendBtn.title);
  renderChat();
  renderVoiceUi();
}

function openSessionIntro() {
  const scenario = getScenario();
  state.scaffold.hintsVisible = state.scaffold.level === 1;
  state.rightTab = "practice";
  state.briefTab = "scenario";
  state.messages = [
    {
      role: "assistant",
      content: personalizeReply(scenario.opening),
    },
  ];
  state.stageIndex = 0;
  state.latestHint = "";
  state.hintHistory = [];
  state.inMomentPrompt = null;
  state.inMomentPromptAtTurn = 0;
  state.inMomentSubmitting = false;
  state.finalReflectionSubmitting = false;
  state.finalReflectionFeedback = "";
  state.activeReflectionPrompts = [];
  promptInput.placeholder = "Respond using Introduce stage...";
  feedbackPanel.innerHTML = `
    <h3>Gap Analysis</h3>
    <p class="muted">Session reset. Practice each ILETS stage, then click Finish + Feedback.</p>
  `;
  if (state.scaffold.level === 2) {
    state.coachNote = "Level 2 active: start independently. If you pause for 10 seconds, support hints will appear.";
    pushCoachNoteHistory("Level 2: independent start enabled.");
  } else if (state.scaffold.level === 3) {
    state.coachNote = "Level 3 active: independent mode. Apply ILETS without sentence starters.";
    pushCoachNoteHistory("Level 3: independent practice mode enabled.");
  }
  armScaffoldPauseTimer();
}

function setScaffoldLevel(level) {
  const normalized = normalizeScaffoldLevel(level);
  state.scaffold.level = normalized;
  state.scaffold.hintsVisible = normalized === 1;
  state.scaffold.lastScenarioAppliedId = state.selectedScenarioId;
  persistScaffoldLevel();
  setPracticeScaffoldMenuOpen(false);
  if (state.page === "practice") {
    if (normalized === 2) {
      armScaffoldPauseTimer();
    } else {
      clearScaffoldPauseTimer();
    }
  }
}

function applyScenarioScaffoldDefault(scenarioId) {
  const scenario = state.scenarios.find((item) => item.id === scenarioId);
  if (!scenario) {
    return;
  }
  const scenarioLevel = normalizeScaffoldLevel(Number(scenario.scaffoldLevel || 1));
  if (state.scaffold.lastScenarioAppliedId === scenario.id) {
    return;
  }
  setScaffoldLevel(scenarioLevel);
}

function messageShowsStageProgress(text, stageName) {
  const value = text.toLowerCase();
  const checks = {
    Introduce: ["i want to discuss", "can we talk", "thank you for meeting", "my goal"],
    Listen: ["can you share", "help me understand", "what happened", "?"],
    Empathize: ["i understand", "i hear", "that sounds", "i appreciate", "it makes sense"],
    Talk: ["i noticed", "impact", "concern", "risk", "deadline", "evidence"],
    Solve: ["next step", "plan", "agree", "action", "follow up", "by"],
  };

  return checks[stageName].some((needle) => value.includes(needle));
}

function advanceStageFromUserMessage(message) {
  const current = ILETS[state.stageIndex];
  if (messageShowsStageProgress(message, current) && state.stageIndex < ILETS.length - 1) {
    state.stageIndex += 1;
    promptInput.placeholder = `Respond using ${ILETS[state.stageIndex]} stage...`;
    renderPracticeStrip();
  }
}

function buildRoleplayPrompt() {
  const scenario = getScenario();
  const stage = ILETS[state.stageIndex];
  const stageObjectives = {
    Introduce: "open with clear purpose, set a respectful tone, and signal shared intent",
    Listen: "ask genuine questions to understand the other person’s constraints before arguing",
    Empathize: "acknowledge what is valid in their position without dropping the core issue",
    Talk: "state specific behaviors and their impact with concrete evidence, not opinions",
    Solve: "close with explicit actions, named owners, and a follow-up timeline",
  };
  return [
    "You are a roleplay partner in Social Sandbox, a difficult conversations training lab.",
    `Scenario: ${scenario.title}`,
    `Context: ${scenario.context}`,
    `You are playing the role of: ${scenario.aiRole}`,
    `Learner name: ${getLearnerName()}`,
    `Current ILETS stage: ${stage} — the learner should ${stageObjectives[stage] || "practice this stage"}`,
    "Rules:",
    "- Respond naturally as the character in 2-4 sentences.",
    "- Do not prepend speaker labels like ‘Senior Manager:’ or your name.",
    "- Stay realistic — maintain your character’s perspective and pressure, but don’t be hostile.",
    "- Respond directly to what the learner just said, not a generic reply.",
    "- Vary your opening sentence each turn so it doesn’t feel repetitive.",
    "- If the learner is brief or vague, acknowledge them and probe for one specific detail.",
    "- Mention the learner by name naturally once every 1-2 turns.",
    "- After your character reply, add exactly one line prefixed ‘Coach Hint:’ that references a specific phrase or move from the learner’s last message and gives a concrete, actionable suggestion for what to say or do next in this exact conversation (not a generic ILETS tip).",
  ].join("\n");
}

function withTimeout(promise, timeoutMs) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error("Timed out waiting for AI reply."));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
}

function personalizeReply(message) {
  const learner = getLearnerName();
  if (learner === "Learner") {
    return message;
  }
  if (message.toLowerCase().includes(learner.toLowerCase())) {
    return message;
  }
  return `${learner}, ${message}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseAssistantOutput(rawText) {
  const scenario = getScenario();
  const lines = rawText.split("\n").map((line) => line.trim()).filter(Boolean);

  let hint = "";
  const messageLines = [];

  lines.forEach((line) => {
    if (/^coach hint\s*:/i.test(line)) {
      hint = line.replace(/^coach hint\s*:/i, "").trim();
      return;
    }
    messageLines.push(line);
  });

  let message = messageLines.join("\n").trim();
  message = message.replace(new RegExp(`^${escapeRegExp(scenario.aiRole)}\s*[:\-]\s*`, "i"), "");

  return {
    message: message || "Thanks for sharing that. Can you tell me a bit more so we can solve it together?",
    hint,
  };
}

async function callProxyAPI(payload) {
  const res = await fetch(state.settings.proxyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Proxy error ${res.status}: ${text || "Unknown error"}`);
  }
  const data = await res.json();
  
  // Handle OpenAI format response from proxy
  const content = data.choices?.[0]?.message?.content;
  if (content && typeof content === "string" && content.trim()) {
    return content.trim();
  }
  
  // Fallback for legacy reply format
  if (data.reply && typeof data.reply === "string" && data.reply.trim()) {
    return data.reply.trim();
  }
  
  throw new Error("No text output found in proxy response");
}

async function callOpenAI(messages, model = null) {
  if (!state.settings.apiKey) {
    throw new Error("OpenAI API key is empty. Add it in Settings.");
  }

  const modelToUse = model || state.settings.model || "gpt-4";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${state.settings.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelToUse,
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text || "Unknown error"}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (content && typeof content === "string" && content.trim()) {
    return content.trim();
  }
  throw new Error("No text output found in OpenAI response");
}

async function generateCoachingFeedback(messages) {
  // Analyze conversation to identify strengths and growth areas
  const systemPrompt = {
    role: "system",
    content: `You are an expert coach analyzing a difficult conversation practice session. 
Based on the conversation history, identify:
1. One clear STRENGTH the learner demonstrated
2. One clear GROWTH AREA the learner should focus on next

Format your response exactly as:
STRENGTH: [one sentence about what they did well]
GROWTH AREA: [one sentence about what to improve]

Be specific to the actual conversation content.`,
  };

  const conversationSummary = {
    role: "user",
    content: `Please analyze this conversation:\n\n${messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")}`,
  };

  try {
    const feedback = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt, conversationSummary] });
    return feedback;
  } catch (error) {
    console.warn("Coach feedback generation failed:", error);
    return "Good practice session. Keep practicing to build confidence.";
  }
}

async function generateReflectionAdaptiveFeedback(reflectionAnswers, draftHistory, weakStages) {
  // Generate adaptive feedback based on reflection text, draft history, and weak stages
  const systemPrompt = {
    role: "system",
    content: `You are an adaptive learning coach. Based on a learner's reflection responses, previous drafts, and their weak ILETS stages (Introduce, Listen, Empathize, Talk, Solve), provide personalized feedback.

Generate 2-3 sentences of actionable feedback that:
1. Acknowledge what they shared
2. Connect their reflection to their weak stage
3. Suggest one concrete next practice focus

Be warm and encouraging while being specific.`,
  };

  const reflectionContext = {
    role: "user",
    content: `Learner's reflection answers:
${reflectionAnswers.map((a, i) => `Q${i + 1}: ${a}`).join("\n")}

Weak stages to improve: ${weakStages.join(", ")}

${draftHistory && draftHistory.length > 1 ? `Previous draft attempts: ${draftHistory.length}` : ""}

Please provide adaptive feedback.`,
  };

  try {
    const feedback = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt, reflectionContext] });
    return feedback;
  } catch (error) {
    console.warn("Reflection feedback generation failed:", error);
    return "Great reflection work. Focus on applying these insights in your next practice session.";
  }
}

async function generateAnalyticsSummary(messages, scenarioTitle) {
  // Generate analytics overview and speech clarity insights
  const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content);
  const conversationText = userMessages.join(" ");

  const systemPrompt = {
    role: "system",
    content: `You are a communication analytics expert. Analyze the conversation and provide:
1. Speech Clarity insights (filler words, repetition patterns)
2. Analytics Overview (conversation style, effectiveness)

Format as:
CLARITY_SCORE: [0-100 number]
FILLER_WORDS: [estimated count]
REPEATED_OPENER: [most common phrase or word]
OVERVIEW: [1-2 sentences about overall communication effectiveness]

Be analytical and constructive.`,
  };

  const analyticsQuery = {
    role: "user",
    content: `Analyze this conversation from scenario "${scenarioTitle}":

${userMessages.map((m, i) => `Message ${i + 1}: ${m}`).join("\n\n")}`,
  };

  try {
    const analysis = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt, analyticsQuery] });
    return analysis;
  } catch (error) {
    console.warn("Analytics generation failed:", error);
    return "Clarity Score: 75\nFiller Words: 3\nRepeated Opener: [analyzing...]\nOverview: Good conversation flow.";
  }
}

// Build goal-SPECIFIC learning path as fallback - completely DIFFERENT modules per goal, not generic template
function buildLocalTailoredLearningPath(goalDescription) {
  const goal = goalDescription || "your goal";
  const goalLower = goal.toLowerCase();
  let modules = [];
  
  // Create COMPLETELY DIFFERENT progression based on the SPECIFIC goal
  if (goalLower.includes("peer feedback")) {
    modules = [
      {
        id: "module-1",
        title: "Module 1: Self-Check Before Feedback",
        summary: "Identify your defensive patterns before giving feedback",
        points: [
          "Notice when YOU get defensive receiving feedback",
          "Recognize the specific words that trigger you",
          "Prepare your mindset to stay curious when giving feedback"
        ],
        example: "Before feedback conversation, pause and ask yourself: 'If they pushed back on my feedback, how would I react? Would I get defensive or stay open?'",
        tips: [
          "Journal one situation where you avoided giving feedback - what scared you?",
          "Practice saying difficult feedback out loud 3 times to build confidence",
          "Remember: feedback is a gift when delivered with respect"
        ],
        tailoredTo: goal
      },
      {
        id: "module-2",
        title: "Module 2: Opening Peer Feedback Conversations",
        summary: "Master the critical first 30 seconds of peer feedback",
        points: [
          "Signal shared purpose: 'I want to help you succeed'",
          "Be specific about what you observed (not judgment)",
          "Ask permission: 'Can I share some feedback?'"
        ],
        example: "Instead of: 'Your presentation was confusing.' Try: 'I noticed the slide transitions felt rushed. Can I share what might work better?'",
        tips: [
          "Write your opening sentence before the conversation",
          "Focus on specific behavior, not personality",
          "Use 'I noticed' instead of 'You always'"
        ],
        tailoredTo: goal
      },
      {
        id: "module-3",
        title: "Module 3: Handling Defensive Reactions to Your Feedback",
        summary: "Stay curious when they react defensively to your feedback",
        points: [
          "Expect defensiveness as a normal response",
          "Ask clarifying questions instead of explaining",
          "Acknowledge their perspective even if you disagree"
        ],
        example: "If they say 'That's not fair!' instead of defending, say: 'Help me understand - what did you see differently?'",
        tips: [
          "Pause for 3 seconds after they speak before responding",
          "Ask 'What would help?' instead of pushing your view",
          "Remember they may need time to process"
        ],
        tailoredTo: goal
      },
      {
        id: "module-4",
        title: "Module 4: Co-Creating Action Plans for Peer Feedback",
        summary: "Turn feedback into concrete next steps together",
        points: [
          "Ask what they'll do differently, don't prescribe",
          "Offer support: 'How can I help you with this?'",
          "Agree on when you'll check in"
        ],
        example: "Say: 'What's one thing you could try next time?' Then: 'Great, I'll watch for that. Let's sync in 2 weeks.'",
        tips: [
          "Make it their idea, not your demand",
          "Offer specific support (pair programming, practice, etc.)",
          "Set a follow-up date immediately"
        ],
        tailoredTo: goal
      },
      {
        id: "module-5",
        title: "Module 5: Sustaining Feedback Relationships",
        summary: "Build trust by noticing their progress on your feedback",
        points: [
          "Acknowledge specific improvements you see",
          "Offer more feedback if they're open",
          "Build a feedback habit together"
        ],
        example: "'I noticed your last presentation had clearer transitions. That made a difference! Any feedback for YOU this time?'",
        tips: [
          "Be specific about what improved",
          "Follow up even if they struggled (show you care)",
          "Make feedback bidirectional"
        ],
        tailoredTo: goal
      },
      {
        id: "module-6",
        title: "Module 6: Mastering Difficult Peer Feedback Moments",
        summary: "Handle the toughest peer feedback scenarios",
        points: [
          "Feedback about attitude or relationships (not just performance)",
          "When they respond with anger or tears",
          "When you're giving feedback up to a senior peer"
        ],
        example: "If they get emotional: 'I can see this landed hard. That's okay. Can we talk about what triggered that reaction?'",
        tips: [
          "Stay calm if emotions rise - you're the adult in the room",
          "Validate feelings: 'I understand this is hard'",
          "Adjust your approach based on their response style"
        ],
        tailoredTo: goal
      }
    ];
  } else if (goalLower.includes("pressure") || goalLower.includes("conflict")) {
    modules = [
      {
        id: "module-1",
        title: "Module 1: Recognize Your Stress Response Pattern",
        summary: "Understand how YOU react when stakes are high",
        points: [
          "Identify your stress response (fight/flight/freeze)",
          "Notice your physical signs (heart rate, breathing, jaw tension)",
          "Know your emotional triggers in conflict"
        ],
        example: "When a deadline slips and stakes are high, do you: get sharp and blame others (fight), withdraw (flight), or freeze? Understanding YOUR pattern is step 1.",
        tips: [
          "Journal 3 recent pressure moments - what was your reaction?",
          "Do a body scan: where do you feel pressure first?",
          "Share your pattern with a colleague - make it normal"
        ],
        tailoredTo: goal
      },
      {
        id: "module-2",
        title: "Module 2: Create Space Between Trigger and Reaction",
        summary: "Pause and reset before you escalate conflict",
        points: [
          "Use a physiological reset (breathing, water break)",
          "Name the emotion: 'I'm angry' or 'I'm scared'",
          "Ask: What's the real issue here?"
        ],
        example: "In a heated meeting: Pause, take 3 deep breaths, then say 'Let me think about this. Can we reconvene in 30 minutes?'",
        tips: [
          "Practice box breathing: 4 in, 4 hold, 4 out, 4 hold",
          "Use a code word with your partner to signal 'I need to pause'",
          "Step away physically if needed"
        ],
        tailoredTo: goal
      },
      {
        id: "module-3",
        title: "Module 3: Acknowledge Constraints Without Blame",
        summary: "Say what's true about high-pressure situations",
        points: [
          "Name the constraint: 'We have X days and Y resources'",
          "Own your part: 'I didn't flag this early enough'",
          "Focus on solving: 'Here's what we can do'"
        ],
        example: "'This deadline is tight and the requirements shifted. That's a real problem. Here's what I think we should do...' (NOT: 'You moved the goalposts!')",
        tips: [
          "Start with facts, not feelings",
          "Take ownership of what you control",
          "Pivot quickly to solutions"
        ],
        tailoredTo: goal
      },
      {
        id: "module-4",
        title: "Module 4: Listen to Understand Their Pressure",
        summary: "See the conflict from their perspective when stakes are high",
        points: [
          "Ask: What's driving their urgency or frustration?",
          "Listen without planning your counter-argument",
          "Find the shared goal underneath the conflict"
        ],
        example: "They: 'This needs to ship tomorrow!' You: 'What's the business pressure you're feeling?' (Listen. Understand. Then respond.)",
        tips: [
          "Paraphrase back: 'So you're worried that...'",
          "Look for their underlying need, not just demands",
          "Separate person from problem"
        ],
        tailoredTo: goal
      },
      {
        id: "module-5",
        title: "Module 5: Problem-Solve Under Pressure",
        summary: "Find creative solutions when constraints are tight",
        points: [
          "Start with what's actually possible (not magic)",
          "Offer tradeoffs: 'We can do X fast or Y well, pick one'",
          "Involve them in the decision"
        ],
        example: "'We can ship core features today but QA will be light. We can full QA but ship Friday. What matters most?'",
        tips: [
          "Give options, not ultimatums",
          "Be honest about risks and tradeoffs",
          "Decide together, then commit"
        ],
        tailoredTo: goal
      },
      {
        id: "module-6",
        title: "Module 6: De-escalate Conflict Spirals",
        summary: "Break cycles where pressure keeps making things worse",
        points: [
          "Notice when emotion is taking over facts",
          "Slow down the pace: meetings, decisions, conversations",
          "Reset with empathy, even if you disagree"
        ],
        example: "When voices are rising: 'I want to solve this with you, not against you. Can we both take a breath?'",
        tips: [
          "Use humor to break tension (carefully)",
          "Remind them of past wins together",
          "Take conflicts offline if they're escalating publicly"
        ],
        tailoredTo: goal
      }
    ];
  } else if (goalLower.includes("surface") || goalLower.includes("risk") || goalLower.includes("bad news")) {
    modules = [
      {
        id: "module-1",
        title: "Module 1: Diagnose Why Risk Is Hard to Surface",
        summary: "Understand the fear blocking you from raising bad news",
        points: [
          "Identify what you fear: rejection, blame, relationship damage, looking incompetent",
          "Notice your avoidance pattern: staying silent, soften the message, bury the bad news",
          "Recognize the cost of NOT surfacing the risk"
        ],
        example: "You see a project timeline slipping by 4 weeks but don't flag it yet. Ask: 'What am I afraid will happen if I raise this now? Will they think I'm incompetent or that I failed to plan?'",
        tips: [
          "List 3 risks you've held back - what were your fears?",
          "Talk to trusted colleagues - they likely have similar fears",
          "Remember: surfacing risk early is valued, not punished"
        ],
        tailoredTo: goal
      },
      {
        id: "module-2",
        title: "Module 2: Frame the Risk Diplomatically",
        summary: "Deliver bad news in a way people can hear it",
        points: [
          "Lead with shared interest: 'I want to flag something so we can solve it together'",
          "Be factual, not emotional: 'The data shows...' not 'This is a disaster'",
          "Propose options immediately: 'We could adjust timeline or add resources'"
        ],
        example: "Instead of: 'This is going to fail!' Try: 'The test results show we need 2 more weeks. We could slip the deadline, add resources, or scope down. What works for you?'",
        tips: [
          "Practice the message before delivering it",
          "Use 'we' not 'I told you' language",
          "Follow bad news quickly with options"
        ],
        tailoredTo: goal
      },
      {
        id: "module-3",
        title: "Module 3: Choose the Right Time and Audience",
        summary: "Surface risks when decision-makers can actually respond",
        points: [
          "Early, private conversations work better than public announcements",
          "Give context before the bad news (situation, impact, options)",
          "Involve relevant people but not the whole team"
        ],
        example: "Pull your manager aside first: 'I've been tracking something I want to talk through with you before we discuss with the team.' Then share privately, then decide together on next steps.",
        tips: [
          "Bad news delivered privately allows them to react without audience",
          "Early flag = respected, last-minute = blamed",
          "Ask: 'Who needs to know this and in what order?'"
        ],
        tailoredTo: goal
      },
      {
        id: "module-4",
        title: "Module 4: Listen to Their Concerns About the Risk",
        summary: "Understand their perspective on the bad news",
        points: [
          "Don't defend or over-explain your concern",
          "Ask what they're worried about regarding the risk",
          "Acknowledge legitimate concerns even if you disagree on urgency"
        ],
        example: "You: 'Security team flagged a risk in our API.' Them: 'Can it be hacked right now?' You: 'Not immediately, but within 2 weeks if unfixed. What are YOUR concerns about fixing it now?'",
        tips: [
          "Pause after you share the risk - let them react",
          "Ask 'What's your concern?' not 'Do you understand?'",
          "They may have context that changes urgency"
        ],
        tailoredTo: goal
      },
      {
        id: "module-5",
        title: "Module 5: Co-Create an Action Plan for the Risk",
        summary: "Move from bad news to decision and accountability",
        points: [
          "Get agreement on whether/when to act",
          "Clarify who does what and by when",
          "Schedule a follow-up to monitor the risk"
        ],
        example: "'So we agree this needs fixing. You'll scope the work, I'll draft the timeline, and we'll check in Thursday. Does that work?'",
        tips: [
          "Make the decision explicit: 'We're choosing to delay and accept risk' or 'We're fixing it now'",
          "Written summary prevents 'I thought we decided' conflicts",
          "Set early touchpoints so bad news doesn't surprise leadership later"
        ],
        tailoredTo: goal
      },
      {
        id: "module-6",
        title: "Module 6: Build a Culture of Early Risk Surfacing",
        summary: "Create psychological safety for future risk conversations",
        points: [
          "Thank people when they surface risks early (reinforce the behavior)",
          "Celebrate quick decisions on bad news (even if hard)",
          "Never punish the messenger for raising problems"
        ],
        example: "Someone flags a risk: 'Thank you for bringing this early - that gave us time to respond. I want to keep this culture where we all flag issues ASAP.'",
        tips: [
          "Model surfacing your own risks and mistakes",
          "Explicitly say: 'Bad news is better early than late'",
          "Track which risks you surfaced and what happened - build evidence"
        ],
        tailoredTo: goal
      }
    ];
  } else if (goalLower.includes("authority") || goalLower.includes("hierarchy") || goalLower.includes("manager") || goalLower.includes("boss")) {
    modules = [
      {
        id: "module-1",
        title: "Module 1: Understand the Power Dynamics You're In",
        summary: "Recognize how hierarchy affects your communication",
        points: [
          "Map your role in the hierarchy (peer, above, below, cross-functional)",
          "Identify what you fear: rejection, judgment, being wrong, losing autonomy",
          "Notice how power affects your willingness to speak up"
        ],
        example: "With your boss: you might hold back honest questions. With direct reports: you might over-explain decisions. With peer above you: you might defer too quickly.",
        tips: [
          "Name the dynamic: 'This person has authority over my work/pay/opportunities'",
          "Different hierarchy = different communication needed",
          "Fear is normal but doesn't mean you can't speak up"
        ],
        tailoredTo: goal
      },
      {
        id: "module-2",
        title: "Module 2: Earn Credibility in the Relationship",
        summary: "Build trust before asking for something difficult",
        points: [
          "Deliver work on time and with quality",
          "Ask clarifying questions to show you care about their goals",
          "Follow through on small commitments first"
        ],
        example: "Before asking your boss for flexibility on a deadline, show you've shipped reliably. Before challenging a peer above you, show you understand their constraints.",
        tips: [
          "Credibility buys you permission to be direct later",
          "It's not about agreeing with everything - it's about being reliable",
          "Watch how they handle disagreement - that's where trust shows"
        ],
        tailoredTo: goal
      },
      {
        id: "module-3",
        title: "Module 3: Communicate Upward: Frame Issues in Their Terms",
        summary: "Get buy-in from people above you by addressing their concerns",
        points: [
          "Understand what matters to them (business goals, deadlines, reputation)",
          "Show how your request/concern affects THEIR priorities",
          "Propose solutions that reduce their risk"
        ],
        example: "Instead of: 'I need more time.' Try: 'To hit the quality bar you care about, we need 2 more weeks. Otherwise we're shipping with known bugs.'",
        tips: [
          "Lead with impact to their goals, not your need",
          "Give them options so they feel in control",
          "Show you've thought it through"
        ],
        tailoredTo: goal
      },
      {
        id: "module-4",
        title: "Module 4: Communicate Downward: Be Clear About Scope and Decisions",
        summary: "Give clear direction to people below you without micromanaging",
        points: [
          "Explain the 'why' behind decisions, not just the 'what'",
          "Show where you have flexibility and where you don't",
          "Invite input before finalizing decisions"
        ],
        example: "'Here's the deadline (fixed), scope (flexible), and quality bar (fixed). Where can you suggest changes to make this work?'",
        tips: [
          "People below you need to know: what's negotiable and what's not",
          "Ask their opinion genuinely, don't ask if you've already decided",
          "Give them autonomy where you can"
        ],
        tailoredTo: goal
      },
      {
        id: "module-5",
        title: "Module 5: Manage Across: Work with Peers You Don't Control",
        summary: "Influence without authority on the same level",
        points: [
          "Find shared goals instead of demanding compliance",
          "Give before you ask (help them first)",
          "Acknowledge their constraints without letting them off the hook"
        ],
        example: "'I know your team is slammed. I need your API by Thursday to hit my milestone. How can I help you make that happen?'",
        tips: [
          "Peer relationships are long-term, be relationship-conscious",
          "Appeal to mutual benefit, not obligation",
          "Follow up when they help you - build reciprocity"
        ],
        tailoredTo: goal
      },
      {
        id: "module-6",
        title: "Module 6: Handle Disagreement With Different Levels",
        summary: "Disagree respectfully across power lines",
        points: [
          "With authority above: propose alternatives respectfully, don't argue",
          "With reports below: make the final call clear even if they disagree",
          "With peers: acknowledge their view and find middle ground"
        ],
        example: "Boss wants option A, you think B: 'I understand the appeal of A. Can we explore B? If you decide A, I'm committed.'",
        tips: [
          "Disagreement ≠ disrespect, but tone matters",
          "Give them a graceful way to change their mind",
          "Commit to their decision once made (no later 'I told you so')"
        ],
        tailoredTo: goal
      }
    ];
  } else if (goalLower.includes("listen") || goalLower.includes("empathy") || goalLower.includes("understand")) {
    modules = [
      {
        id: "module-1",
        title: "Module 1: Recognize When You're Not Really Listening",
        summary: "Identify your listening blockers and habits",
        points: [
          "Catch yourself planning your response instead of hearing them",
          "Notice when you interrupt or finish their sentences",
          "See when you jump to solutions before understanding the real problem"
        ],
        example: "They start: 'I'm frustrated with the project...' You immediately think: 'They don't understand the constraints' and stop truly listening.",
        tips: [
          "Record yourself in a conversation - you'll hear your listening patterns",
          "Ask: 'Am I listening to respond or listening to understand?'",
          "Listening fully takes discipline - attention is a gift"
        ],
        tailoredTo: goal
      },
      {
        id: "module-2",
        title: "Module 2: Ask Genuine Questions to Understand",
        summary: "Use questions to learn what they actually think and feel",
        points: [
          "Ask 'What?' and 'Why?' before offering advice",
          "Follow up on vague statements: 'What do you mean by frustrated?'",
          "Ask about their perspective, not just facts"
        ],
        example: "Instead of: 'You should just talk to them.' Try: 'What have you already tried? What do you think is blocking the conversation?'",
        tips: [
          "Genuine questions sound curious, not interrogating",
          "Some people need space to think - wait for them to fill silence",
          "Your questions shape what they feel safe sharing"
        ],
        tailoredTo: goal
      },
      {
        id: "module-3",
        title: "Module 3: Acknowledge Emotion Without Dismissing It",
        summary: "Validate feelings even if you disagree with their conclusion",
        points: [
          "Name what you hear: 'That sounds frustrating' or 'I hear you're scared'",
          "Don't minimize: avoid 'You shouldn't feel that way'",
          "Show you understand the feeling, even if you'd act differently"
        ],
        example: "They say: 'This was a waste of time.' You: 'I hear that you're disappointed. Tell me what you expected vs what happened.'",
        tips: [
          "Acknowledgment ≠ agreement - you can validate their emotion and still disagree",
          "People share more when they feel heard",
          "'That makes sense' or 'I can see why that frustrated you' opens doors"
        ],
        tailoredTo: goal
      },
      {
        id: "module-4",
        title: "Module 4: Paraphrase to Ensure You Understand",
        summary: "Confirm you heard correctly before responding",
        points: [
          "Reflect back what you heard in your own words",
          "Ask: 'Is that right?' or 'Did I get that?'",
          "Correct misunderstandings gently: 'So not X, but Y?'"
        ],
        example: "They: 'I'm overwhelmed with deadlines and no support.' You: 'So you're carrying the weight alone and that's burning you out? Did I hear that right?'",
        tips: [
          "Paraphrasing prevents assumptions",
          "It shows you care enough to get it right",
          "Many conflicts come from misunderstandings - this stops them early"
        ],
        tailoredTo: goal
      },
      {
        id: "module-5",
        title: "Module 5: Extend Empathy Even When You Disagree",
        summary: "Stay curious about different perspectives",
        points: [
          "Separate their feeling from their proposed solution",
          "Understand their viewpoint without adopting it",
          "Acknowledge legitimate concerns even if you'd decide differently"
        ],
        example: "They want to cancel the project. You don't agree. But understand: 'I see why you're concerned about ROI. I'm looking at it differently, but I get your concern.'",
        tips: [
          "Empathy doesn't mean saying yes",
          "Understanding them builds their trust in you",
          "You can disagree and still respect them"
        ],
        tailoredTo: goal
      },
      {
        id: "module-6",
        title: "Module 6: Listen to Find What You Have in Common",
        summary: "Use listening to resolve conflict and build connection",
        points: [
          "Listen for shared goals underneath disagreements",
          "Find one thing you agree on and start there",
          "Use their language and frame when building consensus"
        ],
        example: "You both care about customer success but disagree on approach. Start there: 'We both want customers happy. Let's figure out how.'",
        tips: [
          "Listening is how you find the path forward",
          "Most conflicts have more agreement than it seems - listen for it",
          "Feeling heard makes people more flexible"
        ],
        tailoredTo: goal
      }
    ];
  } else if (goalLower.includes("option") || goalLower.includes("solution") || goalLower.includes("tradeoff") || goalLower.includes("choice")) {
    modules = [
      {
        id: "module-1",
        title: "Module 1: Reframe 'No' as 'Here's What We Can Do'",
        summary: "Move from blocking conversations to possibility conversations",
        points: [
          "Notice your default: saying no without offering options",
          "Understand what's actually fixed vs flexible in your constraints",
          "Prepare options BEFORE the conversation, not during"
        ],
        example: "Instead of: 'We can't ship by Friday.' Try: 'Friday has risk. We could ship core features Friday and full suite Monday, or we could give full suite one more week.'",
        tips: [
          "People feel heard when they have choices",
          "Even 'no' feels better with options",
          "Prepare 2-3 options so it's not just 'my way'"
        ],
        tailoredTo: goal
      },
      {
        id: "module-2",
        title: "Module 2: Offer Explicit Tradeoffs",
        summary: "Help people understand what they're choosing between",
        points: [
          "Name what's fixed: timeline, budget, quality, scope",
          "Show what's flexible and how changing it affects outcomes",
          "Be honest about the consequences of each choice"
        ],
        example: "'We have X budget. We can: (A) Full scope, no changes, launches 3 months. (B) Core scope, launches 1 month. (C) Full scope with scope cuts elsewhere. Pick the tradeoff.'",
        tips: [
          "Tradeoffs are honest and empowering",
          "Hiding constraints feels like you're hiding something",
          "Let them decide - you implement their choice"
        ],
        tailoredTo: goal
      },
      {
        id: "module-3",
        title: "Module 3: Co-Create Solutions With Them",
        summary: "Don't impose solutions - build them together",
        points: [
          "Ask: 'What would work for you?' not 'Take it or leave it'",
          "Invite their creativity - they might see options you missed",
          "Build on their ideas even if they're not perfect"
        ],
        example: "Instead of: 'Here's the schedule.' Try: 'We need to deliver by June. What would you propose to make that work?'",
        tips: [
          "People commit to solutions they helped create",
          "Their constraints might be different than you assumed",
          "Collaboration builds relationship, not just outcomes"
        ],
        tailoredTo: goal
      },
      {
        id: "module-4",
        title: "Module 4: Expand the Solution Space",
        summary: "Look beyond the obvious answer for creative options",
        points: [
          "Ask: 'What if we changed X?' - test assumptions",
          "Consider: partnership, phasing, scope cuts, quality cuts, timeline cuts",
          "Sometimes the best solution is different from what either of you proposed"
        ],
        example: "'We can't build that in-house by Friday. What if we partner with X team or bring in contract help?'",
        tips: [
          "The first answer is rarely the best",
          "Ask 'What else is possible?' to brainstorm",
          "Wildest ideas sometimes lead to best solutions"
        ],
        tailoredTo: goal
      },
      {
        id: "module-5",
        title: "Module 5: Make the Decision Clear",
        summary: "Get agreement on which option you're choosing",
        points: [
          "Summarize: 'So we're choosing option B, which means...'",
          "Confirm understanding of consequences",
          "Document the decision for future reference"
        ],
        example: "'We're prioritizing speed over full feature set, shipping Monday with core features. Everyone agrees? Let me document this.'",
        tips: [
          "Unclear decisions create conflict later",
          "Written recap prevents 'I thought we agreed'",
          "Clear choices reduce second-guessing"
        ],
        tailoredTo: goal
      },
      {
        id: "module-6",
        title: "Module 6: Iterate and Adjust As You Learn",
        summary: "Treat solutions as starting points, not final answers",
        points: [
          "Check back after implementation: 'Is this working as expected?'",
          "Be willing to adjust if circumstances change",
          "Show that chosen solutions can evolve based on learning"
        ],
        example: "'We chose option B. After 2 weeks, we learned X. Does that change what we want to do? Should we adjust?'",
        tips: [
          "Decisions aren't permanent - frame as experiments",
          "This builds trust that you're flexible when needed",
          "Adjustment shows you're co-invested in success"
        ],
        tailoredTo: goal
      }
    ];
  } else {
    // Generic fallback for truly custom or unrecognized goals
    // Use AI if possible, otherwise create semi-generic progression
    modules = [
      {
        id: "module-1",
        title: "Module 1: Diagnose Your Challenge",
        summary: "Understand what makes this difficult conversation hard for you",
        points: [
          "Identify what you fear or avoid about this conversation",
          "Recognize the stakes and what could go wrong",
          "Acknowledge the cost of not having this conversation"
        ],
        example: "Reflect: What specifically about " + goal + " makes you hesitate?",
        tips: [
          "Name your biggest fear about this",
          "Look for patterns in similar conversations",
          "Remember why this matters to you"
        ],
        tailoredTo: goal
      },
      {
        id: "module-2",
        title: "Module 2: Plan Your Approach",
        summary: "Prepare how you'll approach this specific conversation",
        points: [
          "Think about timing, setting, and who needs to be involved",
          "Draft your opening: what's your shared interest?",
          "Anticipate reactions and how you'll respond"
        ],
        example: "For " + goal + ": When's the best time? What's your opening line? What might they say?",
        tips: [
          "Planning removes some anxiety",
          "Practice your opening out loud",
          "Have 2-3 responses ready for their likely reactions"
        ],
        tailoredTo: goal
      },
      {
        id: "module-3",
        title: "Module 3: Listen More Than You Explain",
        summary: "Let them share their perspective before you push yours",
        points: [
          "Ask genuine questions about their perspective",
          "Don't interrupt or plan your rebuttal while they speak",
          "Paraphrase to show you understand"
        ],
        example: "Instead of launching into your viewpoint: 'Help me understand your perspective on " + goal + ".'",
        tips: [
          "Listening first = they listen to you second",
          "You might learn something that changes your approach",
          "Understanding builds connection"
        ],
        tailoredTo: goal
      },
      {
        id: "module-4",
        title: "Module 4: Acknowledge Their Concerns",
        summary: "Validate their feelings even if you disagree",
        points: [
          "Name what you hear: their fear, frustration, or concern",
          "Show you respect their viewpoint",
          "Separate emotion from the problem"
        ],
        example: "'I hear you're concerned about " + goal + ". That makes sense. Let me share my perspective.'",
        tips: [
          "Acknowledgment opens doors",
          "You can validate and still disagree",
          "Feeling heard makes people more receptive"
        ],
        tailoredTo: goal
      },
      {
        id: "module-5",
        title: "Module 5: Propose Solutions Together",
        summary: "Move toward resolution with options, not demands",
        points: [
          "Offer choices rather than ultimatums",
          "Involve them in creating the solution",
          "Show you're committed to making it work for both"
        ],
        example: "For " + goal + ": 'What would help resolve this? Here's what I'm thinking - what do you suggest?'",
        tips: [
          "Collaboration builds commitment",
          "Options feel better than demands",
          "Their buy-in is critical for follow-through"
        ],
        tailoredTo: goal
      },
      {
        id: "module-6",
        title: "Module 6: Commit and Follow Up",
        summary: "Ensure the agreement holds and the relationship strengthens",
        points: [
          "Confirm what you both agreed to",
          "Be clear on next steps and accountability",
          "Check in to show you care about the outcome"
        ],
        example: "'So here's what we agreed: ... Let's check in on " + goal + " next week. Deal?'",
        tips: [
          "Follow-up shows commitment",
          "Written agreement prevents misunderstandings",
          "Consistency builds trust for future conversations"
        ],
        tailoredTo: goal
      }
    ];
  }
  
  return modules;
}

// Classify custom goal to understand its nature and provide specific guidance
function classifyCustomGoal(goalDescription) {
  const goal = goalDescription.toLowerCase();
  
  // Classify based on keywords to understand what the goal is about
  if (goal.includes("feedback") || goal.includes("critique") || goal.includes("review") || goal.includes("performance")) {
    return "feedback";
  } else if (goal.includes("pressure") || goal.includes("stress") || goal.includes("conflict") || goal.includes("disagree") || goal.includes("angry") || goal.includes("tight") || goal.includes("urgent")) {
    return "pressure";
  } else if (goal.includes("risk") || goal.includes("bad news") || goal.includes("deliver") || goal.includes("raise") || goal.includes("flag") || goal.includes("concern")) {
    return "risk";
  } else if (goal.includes("boss") || goal.includes("manager") || goal.includes("authority") || goal.includes("hierarchy") || goal.includes("senior") || goal.includes("direct report") || goal.includes("power")) {
    return "authority";
  } else if (goal.includes("listen") || goal.includes("understand") || goal.includes("empathy") || goal.includes("emotion") || goal.includes("perspective") || goal.includes("hear")) {
    return "listening";
  } else if (goal.includes("option") || goal.includes("solution") || goal.includes("choice") || goal.includes("tradeoff") || goal.includes("no") || goal.includes("propose")) {
    return "solution";
  } else if (goal.includes("apologi") || goal.includes("mistake") || goal.includes("wrong") || goal.includes("regret") || goal.includes("sorry")) {
    return "accountability";
  } else {
    return "custom";
  }
}

// Try AI first, validate, then fallback to goal-specific local generator
async function getTailoredLearningPath(goalDescription) {
  const storageKey = "sandbox.customTailoredModules";
  
  // Try AI via proxy with STRICT goal-specific requirements
  if (state.settings) {
    const goalClass = classifyCustomGoal(goalDescription);
    
    // Provide context-specific guidance based on goal classification
    let contextGuidance = "";
    if (goalClass === "feedback") {
      contextGuidance = `CONTEXT: This goal is about GIVING FEEDBACK or ADDRESSING BEHAVIOR/PERFORMANCE. The modules MUST focus on: recognizing defensiveness patterns, opening feedback conversations properly, handling when they react defensively, co-creating action plans together, following up on changes, and navigating difficult feedback moments. NOT generic communication skills.`;
    } else if (goalClass === "pressure") {
      contextGuidance = `CONTEXT: This goal is about HANDLING PRESSURE, STRESS, or CONFLICT. The modules MUST focus on: understanding your personal stress response, creating pause space before reacting, acknowledging constraints without blame, listening to others' pressure/perspectives, problem-solving under tight constraints, and de-escalating conflict spirals. NOT generic communication.`;
    } else if (goalClass === "risk") {
      contextGuidance = `CONTEXT: This goal is about SURFACING RISKS or DELIVERING BAD NEWS. The modules MUST focus on: diagnosing why surfacing risk is hard, framing bad news diplomatically, choosing right timing/audience, listening to concerns about the risk, co-creating action plans, and building psychological safety for early surfacing. NOT generic leadership.`;
    } else if (goalClass === "authority") {
      contextGuidance = `CONTEXT: This goal is about NAVIGATING POWER DYNAMICS or AUTHORITY RELATIONSHIPS. The modules MUST focus on: understanding hierarchy's influence, earning credibility, communicating upward (frame in their terms), downward (clarity), across (peers), and handling disagreement across power levels. NOT generic relationship skills.`;
    } else if (goalClass === "listening") {
      contextGuidance = `CONTEXT: This goal is about LISTENING, EMPATHY, or UNDERSTANDING others' perspectives. The modules MUST focus on: recognizing listening blockers, asking genuine questions, acknowledging emotion, paraphrasing to confirm understanding, extending empathy despite disagreement, and finding common ground. NOT generic active listening.`;
    } else if (goalClass === "solution") {
      contextGuidance = `CONTEXT: This goal is about OFFERING OPTIONS, SOLUTIONS, or TRADEOFFS. The modules MUST focus on: reframing "no" as "here's what we can do", offering explicit tradeoffs, co-creating solutions, expanding the solution space creatively, making decisions clear, and iterating based on learning. NOT generic negotiation.`;
    } else if (goalClass === "accountability") {
      contextGuidance = `CONTEXT: This goal is about TAKING ACCOUNTABILITY, APOLOGIZING, or ADMITTING MISTAKES. The modules MUST focus on: owning mistakes without excuses, understanding impact on them, showing remorse, offering meaningful repair, committing to change, and rebuilding trust through consistency. NOT generic apology templates.`;
    } else {
      contextGuidance = `CONTEXT: This is a CUSTOM/UNIQUE goal: "${goalDescription}". Modules must be HIGHLY SPECIFIC to this exact goal — not generic advice that could apply anywhere. Each module title, point, example, and tip must be relevant ONLY to "${goalDescription}". Assume the user has thought carefully about what they need.`;
    }
    
    const systemPrompt = {
      role: "system",
      content: `You are an expert communication coach creating highly specific, tailored learning modules.

GOAL: Create 6 learning modules ONLY for: "${goalDescription}"
${contextGuidance}

CRITICAL RULES:
1. DO NOT create generic modules that could apply to multiple goals
2. DO NOT use a standard "foundation, listen, empathize, talk, solve" template
3. EVERY module MUST be completely unique to "${goalDescription}"
4. EVERY module title must only make sense for THIS goal (include "— Focus: ${goalDescription}")
5. EVERY point, example, and tip must be actionable SPECIFICALLY for "${goalDescription}"
6. NO module should work for a different goal

RETURN ONLY valid JSON (no markdown):
[
  {
    "id": "module-1",
    "title": "Module 1: [Concept SPECIFIC to ${goalDescription}] — Focus: ${goalDescription}",
    "summary": "Benefit specific to ${goalDescription}",
    "points": ["Point 1 ONLY for ${goalDescription}", "Point 2 ONLY for ${goalDescription}", "Point 3 ONLY for ${goalDescription}"],
    "example": "Real dialogue specific to ${goalDescription}",
    "tips": ["Actionable tip for ${goalDescription}", "Specific technique for ${goalDescription}", "Concrete practice for ${goalDescription}"],
    "tailoredTo": "${goalDescription}"
  },
  ...
]

VALIDATION CHECKLIST:
✓ Goal explicitly mentioned in every module title
✓ Each point ONLY relevant to ${goalDescription}, not generic
✓ Each example shows actual DIALOGUE specific to ${goalDescription}
✓ Each tip is immediately actionable SPECIFICALLY for ${goalDescription}
✓ NO module could work for a different goal
✓ Progression is UNIQUE to ${goalDescription}
✓ Content is RICH with real examples and specifics

REJECT (don't include):
- Generic module titles: "Self-Awareness", "Active Listening", "Communication"
- Vague advice: "Recognize patterns", "Be authentic", "Stay calm"
- Cookie-cutter examples: "Talk to them", "Be respectful"
- Standard 6-module template used for every goal

DELIVER (do this):
- Titles specific to goal: "Recognize Your Defensiveness Before Giving Feedback" (feedback-specific)
- Points tied to goal: "Pause for 3 seconds after they react defensively" (only relevant to feedback)
- Dialogue examples: "Instead of 'I think you're wrong', try 'Help me understand...'" (shows real words)
- Actionable tips: "Record yourself saying feedback 3 times to build confidence" (do THIS, not generic advice)

Remember: Different goals = COMPLETELY DIFFERENT modules. A user saying "apologize to my friend" should get COMPLETELY DIFFERENT modules than "give feedback to a peer" — not the same template with goal name changed.`
    };

    const userPrompt = {
      role: "user",
      content: `Create 6 COMPLETELY UNIQUE modules ONLY for: "${goalDescription}"

These modules MUST:
1. Be completely specific to this goal (not a generic template)
2. Show actual dialogue in examples
3. Have actionable tips someone can use TODAY for "${goalDescription}"
4. Build a progression that only makes sense for "${goalDescription}"
5. Look NOTHING like modules for other goals

Return ONLY the JSON array.`
    };

    try {
      const responseText = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt, userPrompt] });
      let parsed;
      try {
        const cleaned = responseText.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        parsed = null;
      }
      
      if (parsed && Array.isArray(parsed) && parsed.length === 6) {
        // STRICT validation: modules must be goal-specific, not generic
        const titleText = parsed.map(m => m.title).join(" ").toLowerCase();
        const allModulesText = parsed.map(m => `${m.title} ${m.summary} ${m.points?.join(" ")} ${m.example} ${m.tips?.join(" ")}`).join(" ").toLowerCase();
        
        // Extract main goal keyword (first part before semicolon)
        const mainGoal = goalDescription.toLowerCase().split(";")[0].trim();
        const goalKeywords = mainGoal.split(" ");
        
        // Count goal mentions - stricter requirement
        let goalMentionCount = 0;
        for (const keyword of goalKeywords) {
          if (keyword.length > 2) { // Ignore very short words
            const matches = allModulesText.match(new RegExp("\\b" + keyword + "\\b", "g")) || [];
            goalMentionCount += matches.length;
          }
        }
        
        // Check for generic module titles (red flags)
        const genericTitles = ["self-awareness", "active listening", "communication", "empathy", "foundation", "introduction", "basics"];
        const hasGenericTitles = genericTitles.some(g => titleText.includes(g));
        
        // Check that modules mention goal in titles (not just in content)
        const goalInTitles = parsed.filter(m => m.title.toLowerCase().includes(mainGoal.split(" ")[0])).length;
        
        // Stricter validation
        if (goalMentionCount >= 12 && !hasGenericTitles && goalInTitles >= 4) {
          localStorage.setItem(storageKey, JSON.stringify(parsed));
          console.log(`✓ AI generated GOAL-SPECIFIC modules for: ${goalDescription} (${goalMentionCount} goal mentions)`);
          return parsed;
        } else {
          console.warn(`⚠ AI modules rejected: goal mentions=${goalMentionCount}, generic titles=${hasGenericTitles}, goal in titles=${goalInTitles}/6`);
        }
      }
      console.warn("AI returned invalid or generic modules, using goal-specific fallback");
    } catch (err) {
      console.warn("AI generation failed:", err.message);
    }
  }

  // Fallback to goal-specific local generation (creates DIFFERENT content per goal)
  const local = buildLocalTailoredLearningPath(goalDescription);
  localStorage.setItem(storageKey, JSON.stringify(local));
  console.log(`✓ Using GOAL-SPECIFIC fallback for: ${goalDescription}`);
  return local;
}

function validateTailoredPath(modules, goalDescription) {
  if (!Array.isArray(modules) || modules.length !== MODULE_SECTIONS.length) return false;
  const goal = (goalDescription || "").toLowerCase();
  for (const mod of modules) {
    const combined = `${mod.title} ${mod.summary} ${mod.points?.join(" ")} ${mod.example}`.toLowerCase();
    if (!combined.includes(goal)) return false;
  }
  return true;
}

// Try AI first, validate, then fallback to local generator and persist
async function getTailoredLearningPath(goalDescription) {
  const storageKey = "sandbox.customTailoredModules";
  // Try AI via proxy with strict schema
  if (state.settings) {
    const systemPrompt = {
      role: "system",
      content: `You are an expert instructional designer creating STRICTLY TAILORED learning modules.

CRITICAL REQUIREMENTS:
1. Return ONLY a valid JSON array of exactly 6 objects. No markdown, no prose before or after.
2. Each object MUST have this exact structure:
   {
     "id": "module-N",
     "title": "Module N: [Specific to the goal, not generic]",
     "summary": "One-sentence benefit specific to '${goalDescription}'",
     "points": ["Point 1 referencing the goal", "Point 2 referencing the goal", "Point 3 referencing the goal"],
     "example": "Realistic example showing how '${goalDescription}' is applied",
     "tailoredTo": "${goalDescription}"
   }
3. EVERY field must explicitly mention or reference the learner's goal. Zero generic content.
4. The goal is: "${goalDescription}"

REJECTION RULES - DO NOT DO:
- Do NOT write generic module titles like "1. Notice What Makes Conversation Hard" - instead write "1. Notice What Makes [the goal] Hard"
- Do NOT include points that could apply to ANY goal - must be specific to ${goalDescription}
- Do NOT include examples about OTHER goals or scenarios
- Do NOT return more or fewer than 6 modules
- Do NOT return incomplete JSON or JSON with extra text

EXAMPLE FORMAT (for goal "Improve Listening & Empathy"):
[
  {
    "id": "module-1",
    "title": "Module 1: Prepare for Listening & Empathy - Self-Awareness & Planning",
    "summary": "Understand how your default patterns affect your ability to listen and show empathy",
    "points": [
      "Recognize how you typically listen (or don't listen) when you need to show empathy",
      "Identify what emotions make empathy harder for you in difficult conversations",
      "Plan how you'll slow down to truly listen before reacting"
    ],
    "example": "You're in a meeting and someone shares a struggle. Instead of jumping to advice, pause and listen to understand what they really need. That's listening & empathy in action.",
    "tailoredTo": "Improve Listening & Empathy"
  },
  ... 5 more modules following same pattern ...
]`
    };
    
    const userPrompt = {
      role: "user",
      content: `Create 6 STRICTLY TAILORED learning modules for this goal: "${goalDescription}"

Each module must:
- Reference "${goalDescription}" in title, summary, points, and example
- Be specific to this goal, not generic
- Be actionable and practical
- Build on each other sequentially

Return ONLY the JSON array, no other text.`
    };

    try {
      const responseText = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt, userPrompt] });
      let parsed;
      try {
        // Clean response in case AI added markdown code fence
        const cleaned = responseText.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        parsed = null;
      }
      if (parsed && validateTailoredPath(parsed, goalDescription)) {
        localStorage.setItem(storageKey, JSON.stringify(parsed));
        console.log(`✓ AI generated tailored modules for: ${goalDescription}`);
        return parsed;
      }
      console.warn("AI returned invalid tailored path, using local fallback.");
    } catch (err) {
      console.warn("AI generation failed:", err);
    }
  }

  // No API key or AI failed/invalid -> local fallback
  const local = buildLocalTailoredLearningPath(goalDescription);
  localStorage.setItem(storageKey, JSON.stringify(local));
  console.log(`✓ Using local fallback for: ${goalDescription}`);
  return local;
}

async function generateTailoredLearningModule(customGoal) {
  try {
    const systemPrompt = {
      role: "system",
      content: `You are an expert in workplace communication and difficult conversations. Create a comprehensive, practical learning module for someone who wants to improve: "${customGoal}"

IMPORTANT: Generate DETAILED, SPECIFIC learning content - not generic placeholders. Think of a framework, techniques, and real examples.

Return a JSON object with this EXACT structure:
{
  "title": "Specific title (5-8 words) exactly matching the goal",
  "objective": "One sentence: what the learner will be able to do after this module",
  "overview": "2-3 sentences explaining what this skill is and why it matters in difficult conversations",
  "keyPrinciples": [
    {"name": "Principle 1", "description": "Specific explanation of this principle"},
    {"name": "Principle 2", "description": "Specific explanation of this principle"},
    {"name": "Principle 3", "description": "Specific explanation of this principle"}
  ],
  "commonMistakes": [
    {"mistake": "What people often do wrong", "why": "Why this backfires", "better": "What to do instead"},
    {"mistake": "Another common error", "why": "Why this doesn't work", "better": "Better approach"}
  ],
  "framework": "A simple 3-5 step framework or technique with step names and brief descriptions",
  "concreteExample": "A detailed workplace scenario showing the skill in action - at least 3 sentences with dialogue",
  "tips": ["Actionable tip 1", "Actionable tip 2", "Actionable tip 3"]
}

Be specific, practical, and actionable. Avoid generic advice. Reference specific phrases and techniques.`,
    };

    const response = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt] });
    const parsed = JSON.parse(response);
    
    return {
      id: `custom-module-${Date.now()}`,
      customGoal: customGoal,
      title: parsed.title || customGoal,
      objective: parsed.objective,
      overview: parsed.overview,
      keyPrinciples: parsed.keyPrinciples || [],
      commonMistakes: parsed.commonMistakes || [],
      framework: parsed.framework,
      concreteExample: parsed.concreteExample,
      tips: parsed.tips || [],
      isCustom: true,
    };
  } catch (error) {
    console.error("Failed to generate tailored module:", error);
    return {
      id: `custom-module-${Date.now()}`,
      customGoal: customGoal,
      title: customGoal,
      objective: `Master the skill of ${customGoal}`,
      overview: `This module will help you develop the key skills needed to ${customGoal} effectively in workplace conversations.`,
      keyPrinciples: [
        { name: "Authenticity", description: "Be genuine in your approach - people respond better to sincerity." },
        { name: "Clarity", description: "Be clear about your intent and what you're trying to communicate." },
        { name: "Respect", description: "Honor the other person's perspective even when you disagree." },
      ],
      commonMistakes: [
        { mistake: "Being too vague", why: "The other person won't understand what you're trying to accomplish", better: "State your purpose clearly upfront" },
        { mistake: "Getting defensive", why: "This shuts down productive dialogue", better: "Listen first, then respond thoughtfully" },
      ],
      framework: "Step 1: Prepare and set intent | Step 2: Open clearly | Step 3: Listen actively | Step 4: Share your perspective | Step 5: Find agreement",
      concreteExample: `Imagine you made a mistake on a project. Instead of saying "I didn't mess up that badly," try: "I realize my approach on this didn't work out as planned. I want to understand what went wrong from your perspective, and then I'd like to discuss how we can move forward together."`,
      tips: [
        "Start with what you're trying to accomplish, not what you're avoiding",
        "Ask genuine questions before making your case",
        "Acknowledge the other person's valid points",
      ],
      isCustom: true,
    };
  }
}

async function generateTailoredLearningPath(goalDescription) {
  try {
    const modules = [];
    
    // Helper to ensure prompts have actual goal text
    const fillGoal = (text) => text.replace(/\$\{goalDescription\}/g, goalDescription);
    
    // Module 1: Foundation & Preparation
    const module1Prompt = {
      role: "system",
      content: fillGoal(`You are an expert communication coach specializing in helping people achieve: "${goalDescription}"

CRITICAL: You are generating a module SPECIFICALLY about ${goalDescription}. NOT generic "Foundation" or "Self-Awareness" content.
EVERY sentence, framework step, example, and tip must reference ${goalDescription} explicitly.
If you write something that could apply to ANY goal, DELETE IT and rewrite it for ${goalDescription}.

Example of BAD content (too generic): "Set clear intention. Identify your triggers."
Example of GOOD content (specific): "Before ${goalDescription}, identify what specifically makes you defensive - is it being told you're wrong? Being questioned? Use that insight to prepare."

This module is about PREPARATION specific to ${goalDescription}:
- What triggers arise specifically when facing ${goalDescription}?
- How do you typically react when you need to ${goalDescription}?
- What's the hardest mental block about ${goalDescription}?
- How should you prepare your mindset specifically for ${goalDescription}?

Return ONLY this JSON:
{
  "title": "Module 1: Prepare for ${goalDescription} - Self-Awareness & Planning",
  "summary": "Foundation: Understand yourself before attempting ${goalDescription}",
  "objective": "Identify your triggers and prepare a clear strategy for ${goalDescription}",
  "overview": "Before ${goalDescription}, you need self-awareness. This module helps you recognize your patterns, triggers, and default reactions so you can show up intentionally.",
  "keyPrinciples": [
    {"name": "Self-Awareness", "description": "Recognize how you typically react when needing to ${goalDescription}. What emotions arise? What are your triggers?"},
    {"name": "Strategic Intention", "description": "Define exactly what you want to accomplish when ${goalDescription}. Not just 'I need to do it', but 'I want to achieve X outcome while maintaining Y relationship'."},
    {"name": "Mental Preparation", "description": "Prepare for resistance, defensiveness, or emotions. When ${goalDescription}, what's the hardest part? Plan for it."}
  ],
  "commonMistakes": [
    {"mistake": "Skipping preparation and jumping straight into ${goalDescription}", "why": "Without clarity, you default to old patterns and react defensively", "better": "Take 10 minutes to clarify your intention and identify your triggers"},
    {"mistake": "Setting outcome-only goals ('I need to convince them')", "why": "This leads to pushiness when ${goalDescription}", "better": "Set relational goals too: 'I want to ${goalDescription} while respecting them'"}
  ],
  "framework": "Step 1: Identify YOUR pattern - How do you usually react when facing this goal? | Step 2: Name your trigger - What emotion or situation makes this hardest? | Step 3: Clarify intention - What's the relationship you want after ${goalDescription}? | Step 4: Plan for resistance - What pushback might you face? How will you stay calm?",
  "concreteExample": "You need to ${goalDescription} with your manager. Before the conversation, pause. Notice: 'I get defensive when criticized' or 'I soften too much.' Clarify your real goal: 'I want to ${goalDescription} AND keep their respect.' Plan for their reaction: 'They might push back because X. I'll respond with Y.' This prep takes 10 minutes but transforms the conversation.",
  "tips": [
    "Journal one specific situation where you struggled with ${goalDescription}. What triggered you?",
    "Write your intention in one sentence: 'When I ${goalDescription}, I want to...'",
    "Identify the one behavior you'll change: 'Instead of X, I'll Y when ${goalDescription}.'"
  ]
}`),
    };
    
    // Module 2: Introduce Stage
    const module2Prompt = {
      role: "system",
      content: fillGoal(`You are an expert communication coach specializing in helping people achieve: "${goalDescription}"

CRITICAL: This module is SPECIFICALLY about the INTRODUCE stage FOR ${goalDescription}.
NOT generic "Introduce" content. NOT "how to open any conversation."
EVERY framework step, example, and tip must be specifically about OPENING FOR ${goalDescription}.

DO NOT write generic openers like "Hi, I want to discuss X."
DO write specific guidance like "When ${goalDescription}, you need to open by [specific phrase for this goal]."

This module teaches HOW TO OPEN when ${goalDescription}:
- What specific language works when introducing ${goalDescription}?
- What mistakes do people make when opening about ${goalDescription}?
- How do you avoid defensiveness specifically when ${goalDescription}?
- What's unique about opening for ${goalDescription} vs other conversations?

Return ONLY this JSON:
{
  "title": "Module 2: Opening Around ${goalDescription} - The Introduce Stage",
  "summary": "How to open a conversation about ${goalDescription} in a way that reduces defensiveness",
  "objective": "Craft an opening for ${goalDescription} that establishes shared purpose and respect",
  "overview": "The opening determines everything. This module teaches you how to introduce ${goalDescription} in a way that makes the other person listen instead of defend.",
  "keyPrinciples": [
    {"name": "Shared Purpose", "description": "Don't lead with 'I need to tell you something hard about ${goalDescription}.' Lead with what you both want: 'I want us to ${goalDescription} successfully together.'"},
    {"name": "Specificity", "description": "Be clear about what you mean by '${goalDescription}'. Don't vague it up. Vague leads to them guessing wrong and getting defensive."},
    {"name": "Permission", "description": "Ask before diving in: 'I'd like to discuss ${goalDescription}. Is now a good time?' This gives them control and reduces defensiveness."}
  ],
  "commonMistakes": [
    {"mistake": "Starting with emotion: 'I'm frustrated about ${goalDescription}' or 'I'm worried about ${goalDescription}'", "why": "They hear criticism and immediately defend", "better": "Start with shared goal: 'I want to discuss how we handle ${goalDescription}'"},
    {"mistake": "Starting with the problem: 'The issue is ${goalDescription}'", "why": "They feel blamed before understanding", "better": "Start with purpose: 'I want to get your perspective on ${goalDescription}'"}
  ],
  "framework": "Step 1: Ask permission - 'I'd like to discuss ${goalDescription}. Do you have time?' | Step 2: Name the shared stakes - 'I think how we handle ${goalDescription} affects both of us' | Step 3: Be specific - 'I want to talk about [specific situation related to goalDescription]' | Step 4: Signal respect - 'I value your perspective and want to hear how you see this'",
  "concreteExample": "You need to ${goalDescription} with a colleague. Bad opening: 'We need to talk about your ${goalDescription}. It's a problem.' Good opening: 'I want to discuss how we're handling ${goalDescription}. I've noticed X, and I want to understand your perspective. I think we both care about getting this right. Do you have 15 minutes?' The second opening makes them curious instead of defensive.",
  "tips": [
    "Practice this one sentence: 'I want to [discuss/understand/explore] ${goalDescription} with you because it matters to both of us.'",
    "Never open with emotion or blame. Open with curiosity or shared stakes.",
    "Always ask permission before diving into ${goalDescription}."
  ]
}`),
    };
    
    // Module 3: Listen Stage
    const module3Prompt = {
      role: "system",
      content: fillGoal(`You are an expert communication coach specializing in helping people achieve: "${goalDescription}"

CRITICAL: This module is SPECIFICALLY about LISTENING when ${goalDescription}.
NOT generic "Listening" content. NOT "how to ask questions in any conversation."
EVERY question, mistake, and tip must be specifically about listening when ${goalDescription}.

DO NOT write generic questions like "What's your perspective?"
DO write specific guidance like "When ${goalDescription}, ask specifically about [their concern regarding goalDescription]."

This module teaches WHAT TO ASK and HOW TO LISTEN when ${goalDescription}:
- What specific questions uncover their real concern about ${goalDescription}?
- How do you listen without dismissing them when ${goalDescription}?
- What do they need to feel heard about regarding ${goalDescription}?
- How does understanding their view specifically change your approach to ${goalDescription}?

Return ONLY this JSON:
{
  "title": "Module 3: Understanding Their Perspective on ${goalDescription} - The Listen Stage",
  "summary": "Ask powerful questions to understand their view on ${goalDescription}",
  "objective": "Learn their perspective on ${goalDescription} before pushing your viewpoint",
  "overview": "Most people jump straight to persuading. This module teaches you to listen first. When you understand THEIR stakes in ${goalDescription}, your response becomes smarter and more credible.",
  "keyPrinciples": [
    {"name": "Genuine Curiosity", "description": "When discussing ${goalDescription}, your first job is to understand, not convince. Ask questions where you actually want to know the answer."},
    {"name": "Below-Surface Questions", "description": "Don't just ask 'What do you think about ${goalDescription}?' Ask 'What concerns do you have about ${goalDescription}? What would need to be true for you to support ${goalDescription}?'"},
    {"name": "Reflect Back", "description": "When they share their view on ${goalDescription}, repeat it back: 'So you're saying... ' This shows you heard and helps them feel understood."}
  ],
  "commonMistakes": [
    {"mistake": "Asking questions while planning your rebuttal", "why": "They sense you're not really listening about ${goalDescription}, just waiting to argue", "better": "Take notes. Actually listen to understand their constraints on ${goalDescription}."},
    {"mistake": "Asking yes/no questions about ${goalDescription}. 'Do you agree we need to ${goalDescription}?'", "why": "They just say no. Conversation over.", "better": "Ask open questions: 'What's your biggest concern about ${goalDescription}?'"}
  ],
  "framework": "Step 1: Ask open questions about ${goalDescription} - 'What's your perspective on ${goalDescription}?' | Step 2: Go deeper - 'What concerns come up for you with ${goalDescription}?' | Step 3: Understand constraints - 'What would need to be true for ${goalDescription} to work?' | Step 4: Reflect back - 'So what I hear is...' | Step 5: Acknowledge valid points - 'That's a good point about ${goalDescription}.'",
  "concreteExample": "You need to discuss ${goalDescription} with your manager. Bad listening: You ask 'Thoughts on ${goalDescription}?' and while they talk, you think about your counter-argument. Good listening: You ask 'What are your concerns about ${goalDescription}? What would success look like to you?' You take notes. You actually hear that they're worried about X. That changes how you approach ${goalDescription} next.",
  "tips": [
    "Write down 3 genuine questions about ${goalDescription} before the conversation.",
    "When listening about ${goalDescription}, focus on understanding their constraints, not rebutting.",
    "Use 'Tell me more about that' often when they discuss ${goalDescription}."
  ]
}`),
    };
    
    // Module 4: Empathize Stage
    const module4Prompt = {
      role: "system",
      content: fillGoal(`You are an expert communication coach specializing in helping people achieve: "${goalDescription}"

CRITICAL: This module is SPECIFICALLY about EMPATHIZING when ${goalDescription}.
NOT generic "Empathy" content. NOT "how to show understanding in any conversation."
EVERY principle, mistake, and example must be specifically about showing empathy while ${goalDescription}.

DO NOT write "Show you understand their concern."
DO write "When they resist ${goalDescription}, show you understand that ${goalDescription} specifically feels [risky/hard/threatening] to them because [specific reason]."

This module teaches HOW TO SHOW UNDERSTANDING when ${goalDescription}:
- What specifically do they fear about ${goalDescription}?
- What's valid in their resistance to ${goalDescription}?
- How do you acknowledge their concern while still pursuing ${goalDescription}?
- What does empathy look like specifically in the context of ${goalDescription}?

Return ONLY this JSON:
{
  "title": "Module 4: Showing Understanding of ${goalDescription} - The Empathize Stage",
  "summary": "Acknowledge what's valid in their perspective even when pursuing ${goalDescription}",
  "objective": "Build connection and credibility by showing you understand their view on ${goalDescription}",
  "overview": "People don't hear you until they feel understood. This module teaches you to empathize with their position on ${goalDescription} while staying committed to your goal.",
  "keyPrinciples": [
    {"name": "Find What's Valid", "description": "Even if you disagree on ${goalDescription}, find something valid in their perspective. 'Your concern about [X aspect of goalDescription] is real and I get why that worries you.'"},
    {"name": "Name Their Stakes", "description": "Show you understand what's at stake for THEM regarding ${goalDescription}. 'I see ${goalDescription} affects your X. That matters.'"},
    {"name": "Empathy ≠ Agreement", "description": "You can understand their position on ${goalDescription} without agreeing with it. 'I get why you'd want to avoid ${goalDescription}. AND I think we need to.'"}
  ],
  "commonMistakes": [
    {"mistake": "Fake empathy - 'I understand your concern about ${goalDescription}' (but you don't, really)", "why": "They sense the fake and trust you less", "better": "Genuine empathy: Name specifically what makes ${goalDescription} hard for them"},
    {"mistake": "Empathizing but then dismissing - 'I get it, but we still need to ${goalDescription} anyway'", "why": "Feels like you weren't really listening", "better": "Empathize deeply, then introduce your perspective: 'I hear you. AND here's what I'm seeing...'"}
  ],
  "framework": "Step 1: Name what's valid - 'Your concern about [specific aspect of goalDescription] makes sense.' | Step 2: Show you understand stakes - 'I see this affects [what matters to them].' | Step 3: Acknowledge difficulty - 'I know ${goalDescription} feels [hard/risky/annoying] to you.' | Step 4: Find common ground - 'We both want [what you both want].' | Step 5: Move forward while honoring their view - 'Given that, here's how I think we can ${goalDescription}...'",
  "concreteExample": "You need to discuss ${goalDescription} with a colleague who's resistant. Bad empathy: 'I understand you're worried, but we need to ${goalDescription}.' Good empathy: 'I hear that ${goalDescription} creates risk for you because of X. That's real. I also see that NOT ${goalDescription} creates risk for Y. Here's how I think we can ${goalDescription} while protecting what matters to you...' They feel heard. Now they listen.",
  "tips": [
    "Before empathizing about ${goalDescription}, actually understand their view from Module 3.",
    "Use 'and' not 'but' - 'I get your concern AND here's what I'm seeing...'",
    "Name something they said in your empathy about ${goalDescription}. Shows you actually listened."
  ]
}`),
    };
    
    // Module 5: Talk Stage
    const module5Prompt = {
      role: "system",
      content: fillGoal(`You are an expert communication coach specializing in helping people achieve: "${goalDescription}"

CRITICAL: This module is SPECIFICALLY about ADVOCATING for ${goalDescription}.
NOT generic "Talk" or "Share perspective" content. NOT "how to state your view in any conversation."
EVERY principle, framework step, and example must be specifically about making the case FOR ${goalDescription}.

DO NOT write "Present evidence for your position."
DO write "When advocating for ${goalDescription}, present evidence that specifically addresses why ${goalDescription} is necessary, what happens if you don't ${goalDescription}, and how ${goalDescription} solves their specific concern."

This module teaches HOW TO ADVOCATE when ${goalDescription}:
- What specific evidence makes the case for ${goalDescription}?
- How do you address their specific objection to ${goalDescription}?
- What happens if you DON'T ${goalDescription}? (the consequence)
- How do you connect ${goalDescription} to what they care about?

Return ONLY this JSON:
{
  "title": "Module 5: Making Your Case for ${goalDescription} - The Talk Stage",
  "summary": "Share your perspective on ${goalDescription} in a way they can hear",
  "objective": "Explain why ${goalDescription} matters and address their specific concerns",
  "overview": "Now you understand them. Now share YOUR perspective on ${goalDescription} - but do it in a way that lands because you've listened first.",
  "keyPrinciples": [
    {"name": "Evidence Over Emotion", "description": "Don't say 'I feel like we need to ${goalDescription}.' Say 'Here's what I've observed about ${goalDescription}: [specific evidence].'"},
    {"name": "Address Their Specific Concerns", "description": "Because you listened in Module 3, you know their concern about ${goalDescription}. Address it directly: 'I heard you worried about X. Here's how ${goalDescription} actually handles X...'"},
    {"name": "Frame Around Shared Values", "description": "Connect why ${goalDescription} matters to something they care about, not just what you care about."}
  ],
  "commonMistakes": [
    {"mistake": "Repeating your position about ${goalDescription} louder or different times", "why": "They didn't hear you because they don't feel understood. Volume doesn't change that.", "better": "They feel understood. Now they're actually listening to your case for ${goalDescription}."},
    {"mistake": "Generic arguments about ${goalDescription}. 'It's important. We should do it.'", "why": "Doesn't land because it's not personalized to their situation", "better": "Specific argument about ${goalDescription} that addresses their constraints: 'Given that you're worried about X, here's why ${goalDescription} actually solves that...'"}
  ],
  "framework": "Step 1: Acknowledge what you heard about ${goalDescription} - 'I heard you say...' | Step 2: Present your observation - 'Here's what I see about ${goalDescription}...' | Step 3: Address their specific concern - 'I know you worried about X. Here's how ${goalDescription} handles that...' | Step 4: State the consequence - 'If we don't ${goalDescription}, I'm concerned that...' | Step 5: Focus on shared outcome - 'I think if we ${goalDescription}, we get to [shared value].'",
  "concreteExample": "You're discussing ${goalDescription}. They said they're worried about [specific concern]. Bad Talk: 'Look, ${goalDescription} is the right thing to do. Trust me.' Good Talk: 'You said you're concerned about [their concern regarding goalDescription]. I get that. Here's what I've observed: [specific evidence about goalDescription]. That's why I think if we ${goalDescription}, it actually protects [what matters to them]. Does that address your concern?'",
  "tips": [
    "Lead with evidence, not opinion, about ${goalDescription}.",
    "Use their language from Module 3 when making your case about ${goalDescription}.",
    "End with a question, not a demand: 'Does that make sense about ${goalDescription}?' not 'So we'll ${goalDescription}, right?'"
  ]
}`),
    };
    
    // Module 6: Solve Stage
    const module6Prompt = {
      role: "system",
      content: fillGoal(`You are an expert communication coach specializing in helping people achieve: "${goalDescription}"

CRITICAL: This module is SPECIFICALLY about SOLVING HOW TO ${goalDescription}.
NOT generic "Solve" or "Move to action" content. NOT "how to create next steps in any conversation."
EVERY framework step, mistake, and example must be specifically about defining HOW you'll ${goalDescription}.

DO NOT write "Define specific actions and timeline."
DO write "For ${goalDescription} specifically, you need to define: WHO will ${goalDescription}, WHEN they'll ${goalDescription}, HOW they'll ${goalDescription}, and WHAT SUCCESS looks like for ${goalDescription}."

This module teaches HOW TO MOVE TO ACTION on ${goalDescription}:
- What specific method will you use to ${goalDescription}?
- Who owns what when ${goalDescription} happens?
- How do you measure success at ${goalDescription}?
- What's the first concrete step toward ${goalDescription}?

Return ONLY this JSON:
{
  "title": "Module 6: Moving to Action on ${goalDescription} - The Solve Stage",
  "summary": "Turn agreement on ${goalDescription} into concrete next steps",
  "objective": "Define specific actions and timeline for ${goalDescription}",
  "overview": "Agreement doesn't mean ${goalDescription} happens. This module teaches you to move from 'I understand the need to ${goalDescription}' to 'Here's exactly how and when we ${goalDescription}.'",
  "keyPrinciples": [
    {"name": "Specificity", "description": "Don't end with 'We'll ${goalDescription}.' End with 'By Friday, X will ${goalDescription} using Y approach.' Specific beats vague."},
    {"name": "Ownership", "description": "Be clear who does what: 'I'll ${goalDescription} by X date. You'll handle Y by Z date.'"},
    {"name": "Checkpoints", "description": "For important ${goalDescription}, plan follow-up: 'We'll check in Thursday on how the ${goalDescription} is going. Adjust if needed.'"}
  ],
  "commonMistakes": [
    {"mistake": "Ending the conversation when they say 'OK, we'll ${goalDescription}.'", "why": "Without specifics, ${goalDescription} doesn't actually happen", "better": "Get specific: 'OK, so you'll ${goalDescription} by [date] using [method]. I'll [support action]. We'll check in [date].'"},
    {"mistake": "Agreeing on what to ${goalDescription} but not how", "why": "${goalDescription} gets done half-way or the wrong way", "better": "Discuss the actual method of ${goalDescription}, not just the goal"}
  ],
  "framework": "Step 1: Test agreement - 'Are you willing to ${goalDescription}?' | Step 2: Discuss method - 'How do you think we should approach ${goalDescription}?' | Step 3: Define specific actions - 'So you'll ${goalDescription} by [date] using [specific approach].' | Step 4: Clarify your role - 'I'll support by...' | Step 5: Set checkpoint - 'Let's check in [date] on how ${goalDescription} is going.'",
  "concreteExample": "You've aligned on needing to ${goalDescription}. Bad Solve: 'Great, let's ${goalDescription}.' (Nothing happens.) Good Solve: 'So you'll ${goalDescription} by Friday using this approach [specific]. I'll check in Thursday to see if you need anything. If it's not working, we'll adjust Friday. Does that work?'",
  "tips": [
    "Write down the specific action for ${goalDescription}. Who, what, when.",
    "For ${goalDescription}, always name a checkpoint date.",
    "Check: 'Are we clear on how you'll ${goalDescription}?' If they hesitate, you need more clarity."
  ]
}`),
    };
    
    // Module 7: Mastery
    const module7Prompt = {
      role: "system",
      content: fillGoal(`You are an expert communication coach specializing in helping people achieve: "${goalDescription}"

CRITICAL: This module is SPECIFICALLY about MASTERING ${goalDescription} when it gets hard, resisted, or needs to happen repeatedly.
NOT generic "Mastery" or "Handling resistance" content. NOT "what to do when any conversation gets difficult."
EVERY principle, framework, and example must be specifically about ${goalDescription} resistance, patterns, and complexity.

DO NOT write "When they push back, get curious."
DO write "When they push back on ${goalDescription}, the real concern is often [specific fear about goalDescription]. Here's how to identify and address that fear."

This module teaches ADVANCED ${goalDescription} strategies:
- What specifically makes ${goalDescription} hard the second, third, or fourth time?
- What patterns do you see in how you approach ${goalDescription}? (too soft? too pushy? avoiding?)
- When should you escalate ${goalDescription} to someone with authority?
- How do you handle someone who keeps resisting ${goalDescription}?

Return ONLY this JSON:
{
  "title": "Module 7: Mastering ${goalDescription} - Handling Complexity & Resistance",
  "summary": "Advanced strategies for when ${goalDescription} gets difficult, resisted, or recurring",
  "objective": "Handle resistance to ${goalDescription} and navigate complex situations around this goal",
  "overview": "Real ${goalDescription} isn't always smooth. This module teaches you what to do when they push back, when patterns repeat, and when you need advanced tactics.",
  "keyPrinciples": [
    {"name": "Resistance Is Information", "description": "When they resist ${goalDescription}, it's not a personal rejection. It's information: 'There's something about ${goalDescription} I don't understand or that feels unsafe.' Get curious."},
    {"name": "Patterns Over Events", "description": "If ${goalDescription} keeps failing, it's rarely about one conversation. It's about a pattern. Identify it: Are you always too soft on ${goalDescription}? Too hard? Missing their real concern?"},
    {"name": "Escalation vs. Pressure", "description": "Know the difference. Escalation is bringing in someone else because ${goalDescription} needs authority. Pressure is repeating the same argument louder. Use escalation rarely, pressure never."}
  ],
  "commonMistakes": [
    {"mistake": "When they push back on ${goalDescription}, repeating your case louder", "why": "They heard you. They disagree. Repeating doesn't change that.", "better": "When resistance appears on ${goalDescription}, get curious: 'What's the real concern?' Then solve that."},
    {"mistake": "Giving up on ${goalDescription} after one difficult conversation", "why": "Some ${goalDescription} requires multiple touches and different approaches", "better": "Recognize this needs patience. Plan second attempt differently if first doesn't stick on ${goalDescription}."}
  ],
  "framework": "Step 1: Anticipate resistance about ${goalDescription} - What's the hardest part for them? | Step 2: When they push back on ${goalDescription}, name what you hear - 'I hear you saying we can't ${goalDescription} because...' | Step 3: Explore the real concern - 'Tell me more about that worry regarding ${goalDescription}.' | Step 4: Problem-solve together - 'Given that concern about ${goalDescription}, what would work?' | Step 5: Know when to escalate - 'This needs input from [authority]. Let me bring them in on ${goalDescription}.'",
  "concreteExample": "You've pushed for ${goalDescription} multiple times, each time hitting resistance. Module 7 approach: Stop repeating. Instead, one-on-one with them: 'It seems like ${goalDescription} keeps being an issue. I want to understand what's really going on. Is it [concern A]? [concern B]? Let's solve the actual blocker so ${goalDescription} can happen.' Then listen for the REAL concern. That's what changes the pattern.",
  "tips": [
    "If ${goalDescription} fails once, diagnose why before trying again differently.",
    "Track: Do you tend to push too hard on ${goalDescription}? Too soft? That's your pattern.",
    "Use escalation for ${goalDescription} sparingly - it's nuclear. Use it when you've tried everything else."
  ]
}`),
    };

    // Generate each module
    const prompts = [module1Prompt, module2Prompt, module3Prompt, module4Prompt, module5Prompt, module6Prompt, module7Prompt];
    
    for (let i = 0; i < prompts.length; i++) {
      try {
        const response = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [prompts[i]] });
        const parsed = JSON.parse(response);
        modules.push({
          id: `tailored-module-${Date.now()}-${i}`,
          ...parsed,
          customGoal: goalDescription,
          isCustom: true,
          isTailored: true,
          moduleSequenceIndex: i,
        });
      } catch (error) {
        console.warn(`Failed to generate module ${i + 1}:`, error);
      }
    }
    
    return modules.length === 7 ? modules : [];
  } catch (error) {
    console.error("Failed to generate tailored learning path:", error);
    return [];
  }
}

async function generateTailoredPracticeScenario(customGoal) {
  try {
    const systemPrompt = {
      role: "system",
      content: `You are an expert in creating practice scenarios for difficult conversations. Create a realistic practice scenario for someone who wants to improve: "${customGoal}"
      
Return a JSON object with this exact structure:
{
  "title": "Scenario title (5-8 words) related to the custom goal",
  "context": "2-3 sentence realistic scenario setup explaining the situation and why it's difficult",
  "aiRole": "The role the AI will play (e.g., Manager, Colleague, Client)",
  "opening": "The opening line the AI will say to start the scenario",
  "goals": ["Practice goal 1", "Practice goal 2", "Practice goal 3"],
  "difficulty": "Challenge type (e.g., Time pressure, Emotional tension, Power imbalance)"
}

Make the scenario realistic, relevant to the stated goal, and actionable.`,
    };

    const response = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt] });
    const parsed = JSON.parse(response);
    
    return {
      id: `custom-scenario-${Date.now()}`,
      title: parsed.title,
      context: parsed.context,
      aiRole: parsed.aiRole,
      opening: parsed.opening,
      goals: parsed.goals,
      difficulty: parsed.difficulty,
      customGoal: customGoal,
      custom: true,
      scenarioType: "custom",
      silenceMetrics: false,
      practice: {
        Introduce: {
          objective: "Open the conversation in a way that applies to your goal.",
          starters: [
            { style: "direct", text: "Start with your main point related to: " + customGoal },
          ],
        },
        Listen: {
          objective: "Ask questions to understand the other person's perspective.",
          starters: [
            { style: "balanced", text: "Ask what they think about the situation." },
          ],
        },
        Empathize: {
          objective: "Acknowledge their perspective.",
          starters: [
            { style: "balanced", text: "Acknowledge their position or constraints." },
          ],
        },
        Talk: {
          objective: "Share your perspective clearly.",
          starters: [
            { style: "balanced", text: "Share your view and why it matters." },
          ],
        },
        Solve: {
          objective: "Agree on next steps.",
          starters: [
            { style: "balanced", text: "Propose a way forward that addresses both perspectives." },
          ],
        },
      },
    };
  } catch (error) {
    console.error("Failed to generate tailored scenario:", error);
    return {
      id: `custom-scenario-${Date.now()}`,
      title: `Practice: ${customGoal}`,
      context: `Practice the skill "${customGoal}" in a realistic workplace conversation.`,
      aiRole: "Colleague",
      opening: "I wanted to talk with you about something important. What's on your mind?",
      goals: ["Apply your learning goal", "Stay composed", "Find a solution"],
      difficulty: "Custom scenario",
      customGoal: customGoal,
      custom: true,
      scenarioType: "custom",
      silenceMetrics: false,
      practice: {
        Introduce: { objective: "Open the conversation.", starters: [{ style: "direct", text: "Begin your conversation." }] },
        Listen: { objective: "Listen.", starters: [{ style: "direct", text: "Ask a question." }] },
        Empathize: { objective: "Empathize.", starters: [{ style: "direct", text: "Acknowledge." }] },
        Talk: { objective: "Talk.", starters: [{ style: "direct", text: "Share your view." }] },
        Solve: { objective: "Solve.", starters: [{ style: "direct", text: "Propose next steps." }] },
      },
    };
  }
}

async function analyzeSessionTranscript(transcript, scenarioTitle, userGoals) {
  if (transcript.length < 2) {
    return { userQuotes: [], stagePerformance: {}, strengths: [], growthAreas: [] };
  }

  try {
    const userMessages = transcript.filter((m) => m.role === "user").map((m) => m.content);
    const analysis = {
      role: "system",
      content: `You are an expert conversation coach analyzing a practice session transcript.

User's learning goals: ${userGoals.join(", ")}
Scenario: ${scenarioTitle}

USER'S MESSAGES:
${userMessages.map((msg, i) => `${i + 1}. "${msg}"`).join("\n")}

Analyze the user's performance and return a JSON object:
{
  "userQuotes": [
    {"quote": "exact word from user", "context": "what stage this happened in", "stage": "Introduce|Listen|Empathize|Talk|Solve", "analysis": "why this quote matters"}
  ],
  "strengths": [
    {"behavior": "what they did well", "evidence": "quote or example from transcript"}
  ],
  "growthAreas": [
    {"area": "skill to improve", "suggestion": "specific actionable suggestion", "exampleStage": "which stage to practice"}
  ],
  "stagePerformance": {
    "Introduce": 0-100,
    "Listen": 0-100,
    "Empathize": 0-100,
    "Talk": 0-100,
    "Solve": 0-100
  }
}

Be specific and reference actual quotes from their messages.`,
    };

    const response = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [analysis] });
    const parsed = JSON.parse(response);
    
    state.currentSessionAnalysis.userQuotes = parsed.userQuotes || [];
    state.currentSessionAnalysis.strengths = parsed.strengths || [];
    state.currentSessionAnalysis.growthAreas = parsed.growthAreas || [];
    state.currentSessionAnalysis.stagePerformance = parsed.stagePerformance || {};
    
    // Compare to previous session if exists
    const previousSessions = getPreviousSessions(1);
    if (previousSessions.length > 0) {
      const lastSession = previousSessions[0];
      state.currentSessionAnalysis.previousSessionComparison = {
        previousDate: lastSession.timestamp,
        previousScores: lastSession.stagePerformance,
        improvements: Object.keys(parsed.stagePerformance || {}).map((stage) => ({
          stage,
          current: parsed.stagePerformance[stage],
          previous: lastSession.stagePerformance?.[stage] || 0,
          improved: (parsed.stagePerformance[stage] || 0) > (lastSession.stagePerformance?.[stage] || 0),
        })),
      };
    }

    saveSessionAnalysis(state.currentSessionAnalysis);
    return state.currentSessionAnalysis;
  } catch (error) {
    console.error("Failed to analyze session:", error);
    return { userQuotes: [], stagePerformance: {}, strengths: [], growthAreas: [] };
  }
}

async function generateAdaptiveCoachFeedback(analysis, scenarioTitle) {
  if (!analysis.userQuotes || analysis.userQuotes.length === 0) {
    return "Great practice session! Continue building on your foundation.";
  }

  try {
    const feedback = {
      role: "system",
      content: `You are a supportive conversation coach providing personalized feedback.

Based on this analysis of their practice session:
Strengths: ${analysis.strengths.map((s) => s.behavior).join("; ")}
Growth areas: ${analysis.growthAreas.map((a) => a.area).join("; ")}

User quotes from the conversation:
${analysis.userQuotes.map((q) => `- "${q.quote}" (during ${q.stage}): ${q.analysis}`).join("\n")}

Generate 3-4 sentences of coaching feedback that:
1. Specifically references their actual quotes
2. Acknowledges one strength
3. Offers ONE concrete next-step improvement
4. Is encouraging and actionable

Keep it warm, specific, and focused on their learning goals.`,
    };

    return await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [feedback] });
  } catch (error) {
    console.error("Failed to generate adaptive feedback:", error);
    return "Good effort in your practice! Keep building these skills with each scenario.";
  }
}

async function generateScenarioRecommendations(userGoals) {
  if (!userGoals || userGoals.length === 0) {
    return [];
  }

  try {
    const recommendations = {
      role: "system",
      content: `You are an expert in creating practice scenarios for skill development.

User's learning goals: ${userGoals.join(", ")}

Generate 3 different scenario variations that would help practice these goals.
Return a JSON array:
[
  {
    "title": "Scenario title",
    "context": "Why this scenario practices their goal",
    "difficulty": "easy|medium|hard",
    "whyItMatters": "How this connects to their goals"
  }
]

Make each scenario realistic, progressively challenging, and directly tied to their goals.`,
    };

    const response = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [recommendations] });
    const parsed = JSON.parse(response);
    return parsed || [];
  } catch (error) {
    console.error("Failed to generate scenario recommendations:", error);
    return [];
  }
}

function localFallbackReply(userText) {
  const stage = ILETS[state.stageIndex];
  const text = userText.toLowerCase();
  const scenario = getScenario();
  const shortInput = userText.trim().length < 10;

  if (text === "hi" || text === "hello" || text === "hey") {
    return {
      message: "Hi, thanks for starting this conversation. What is the most important issue you want to raise today?",
      hint: "Begin with one clear sentence about your goal.",
    };
  }

  const scenarioOpeners = {
    "failing-project": "I can hear this matters. What is the main risk you want me to understand first?",
    "unsafe-shortcut": "I see why you raised this. What happened right before the shortcut was taken?",
    "peer-feedback": "I appreciate you bringing this up. What part of the meeting behavior is affecting the team most?",
  };

  const acknowledge = text.includes("sorry")
    ? "I appreciate your honesty."
    : text.includes("concern") || text.includes("risk")
      ? "Thanks for raising this early."
      : "I hear your point.";

  const prompts = {
    Introduce: {
      message: shortInput
        ? `${scenarioOpeners[scenario.id] || "I hear you. What do you want to change in this conversation?"}`
        : `${acknowledge} Can you frame the purpose of this discussion and what outcome you hope for today?`,
      hint: "Open with intent and respect in one clear sentence.",
    },
    Listen: {
      message: shortInput
        ? "Thanks, that helps. What details should I understand before I respond?"
        : "I want to understand your perspective better. What happened, and what signs are you seeing?",
      hint: "Ask one open question before persuading.",
    },
    Empathize: {
      message: shortInput
        ? "That makes sense. I can see why this feels difficult to raise."
        : "I can see why this feels difficult to raise. Thank you for bringing it up directly.",
      hint: "Name both emotion and pressure to build safety.",
    },
    Talk: {
      message: shortInput
        ? "Understood. What is the concrete impact if this continues?"
        : "Understood. Walk me through the impact on team outcomes if this continues.",
      hint: "Use behavior plus impact, not personality labels.",
    },
    Solve: {
      message: shortInput
        ? "Let us choose one next step and decide who owns it."
        : "Let us agree on one concrete next step, who owns it, and when we review progress.",
      hint: "Propose one action, one owner, one follow-up date.",
    },
  };
  return prompts[stage];
}

function addHint(hint) {
  if (!hint) {
    return;
  }
  state.latestHint = hint;
  if (!state.hintHistory) {
    state.hintHistory = [];
  }
  if (!state.hintHistory.includes(hint)) {
    state.hintHistory.unshift(hint);
    state.hintHistory = state.hintHistory.slice(0, 6);
  }
}

function addCoachNote(userText, replyObject) {
  // Prefer the AI-generated hint from the roleplay reply (most contextual)
  const aiHint = (replyObject?.hint || "").trim();
  if (aiHint) {
    state.coachNote = aiHint;
    pushCoachNoteHistory(aiHint);
    return;
  }

  // Fallback: rule-based note when AI hint is missing
  const scenario = getScenario();
  const stage = ILETS[state.stageIndex];
  const lower = userText.toLowerCase();
  let note = "";

  if (/^(hi|hello|hey)$/i.test(userText.trim())) {
    note = "Open more directly — name why you asked for this conversation in your next sentence.";
  } else if (lower.includes("deadline") || lower.includes("risk") || lower.includes("late")) {
    note = "Good — you surfaced the issue. Now anchor it with one specific fact or number.";
  } else if (lower.includes("sorry") || lower.includes("frustrat") || lower.includes("stress")) {
    note = "Good acknowledgement. Keep it brief, then move to a specific question or next step.";
  } else if (stage === "Listen") {
    note = "Ask one open question, then pause fully — let them finish before you respond.";
  } else if (stage === "Empathize") {
    note = "Name one specific pressure they're carrying, not just 'I understand.' Then keep moving.";
  } else if (stage === "Talk") {
    note = "Add one concrete detail — a date, number, or observable behavior — so the impact is undeniable.";
  } else if (stage === "Solve") {
    note = "Make the next step explicit: who does what, by when, and when you'll check back.";
  } else if ((replyObject?.message || "").length < 60) {
    note = "Good start. Expand slightly — add one sentence of context or intent.";
  } else {
    note = `Stay focused on ${scenario.aiRole.toLowerCase()}'s constraints — answer what they need before making your point.`;
  }

  state.coachNote = note;
  pushCoachNoteHistory(note);
}

function buildCustomPractice(goals, roleLabel) {
  const goal = (index, fallback) => goals[index] || fallback;
  const role = roleLabel || "the other person";

  return {
    Introduce: {
      objective: "Open with purpose and lower defensiveness.",
      starters: [
        `I want to discuss ${goal(0, "an important issue").toLowerCase()}.`,
        `My goal today is ${goal(1, "to align on a practical next step").toLowerCase()}.`,
      ],
    },
    Listen: {
      objective: "Ask first and understand their constraints.",
      starters: [
        `Can you share how you are seeing this from your side, ${role}?`,
        "What constraints are you balancing right now?",
      ],
    },
    Empathize: {
      objective: "Acknowledge pressure while staying constructive.",
      starters: [
        "I understand this is a difficult situation with real pressure.",
        "I appreciate you discussing this openly with me.",
      ],
    },
    Talk: {
      objective: "State behavior and impact with specifics.",
      starters: [
        `From what I have seen, ${goal(0, "this issue is affecting outcomes").toLowerCase()}.`,
        `The impact right now is ${goal(2, "reduced trust and slower execution").toLowerCase()}.`,
      ],
    },
    Solve: {
      objective: "Agree one clear action with owner and timeline.",
      starters: [
        "Could we agree one concrete next step and owner today?",
        "Can we set a follow-up checkpoint to review progress?",
      ],
    },
  };
}

async function generateRoleplayReply() {
  const systemPrompt = { role: "system", content: buildRoleplayPrompt() };
  const conversation = [systemPrompt, ...state.messages];

  return callProxyAPI({ model: state.settings.model, messages: conversation });
}

function scoreStage(messages, stage) {
  const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content.toLowerCase());
  const hasEvidence = userMessages.some((text) => messageShowsStageProgress(text, stage));
  const attempts = userMessages.length;
  if (!hasEvidence && attempts < 2) {
    return 0;
  }
  if (hasEvidence && attempts < 4) {
    return 1;
  }
  return hasEvidence ? 2 : 0;
}

function getUserTurnCount() {
  return state.messages.filter((message) => message.role === "user").length;
}

function getStageScoresFromMessages(messages) {
  return ILETS.map((stage) => ({
    stage,
    score: scoreStage(messages, stage),
  })).sort((a, b) => a.score - b.score);
}

function buildAdaptivePrompts(stageScores) {
  const promptBank = {
    Introduce: {
      inMoment: "What intention do you want the other person to hear in your next sentence?",
      end: "How clear was your opening intent, and what would you rewrite to reduce defensiveness?",
    },
    Listen: {
      inMoment: "What assumption are you making right now, and what question could test it before you react?",
      end: "Where did assumptions replace listening, and how will you ask better follow-up questions next time?",
    },
    Empathize: {
      inMoment: "What emotion from the other side have you acknowledged so far, and what is still missing?",
      end: "How well did you name emotion and pressure without losing your main point?",
    },
    Talk: {
      inMoment: "What one concrete fact can you include next so your concern sounds specific, not personal?",
      end: "Which part of your explanation lacked evidence, and what proof would make it stronger?",
    },
    Solve: {
      inMoment: "What commitment can you propose now with owner and timeline?",
      end: "How specific was your close in terms of action, owner, and follow-up timing?",
    },
  };

  const weakest = stageScores[0]?.stage || "Listen";
  const secondWeakest = stageScores[1]?.stage || weakest;

  return [
    {
      id: "emotion-awareness",
      stage: weakest,
      question: `Emotion check (${weakest}): ${promptBank[weakest].end}`,
    },
    {
      id: "strategy-adjustment",
      stage: secondWeakest,
      question: `Strategy check (${secondWeakest}): ${promptBank[secondWeakest].end}`,
    },
    {
      id: "transfer-plan",
      stage: "Solve",
      question: "Transfer plan: What exact sentence will you use in a real conversation this week, and when will you use it?",
    },
  ];
}

function getInMomentPrompt(stageScores) {
  const weakest = stageScores[0]?.stage || "Listen";
  const inMomentPrompts = {
    Introduce: "Pause for 20 seconds: what opening sentence shows shared purpose clearly?",
    Listen: "Pause for 20 seconds: what assumption can you replace with one open question right now?",
    Empathize: "Pause for 20 seconds: what feeling from the other person can you acknowledge next?",
    Talk: "Pause for 20 seconds: what concrete fact can strengthen your next message?",
    Solve: "Pause for 20 seconds: what specific next-step commitment can you ask for now?",
  };

  return {
    stage: weakest,
    question: inMomentPrompts[weakest],
  };
}

function renderInMomentReflectionCard() {
  if (!inMomentReflectionCard) {
    return;
  }

  if (!state.inMomentPrompt) {
    inMomentReflectionCard.classList.add("is-hidden");
    if (inMomentAnswerInput) {
      inMomentAnswerInput.value = "";
    }
    if (inMomentReflectionFeedback) {
      inMomentReflectionFeedback.textContent = "";
    }
    return;
  }

  inMomentReflectionCard.classList.remove("is-hidden");
  inMomentPromptText.textContent = `${state.inMomentPrompt.question} (${state.inMomentPrompt.stage})`;
  submitInMomentReflectionBtn.disabled = state.inMomentSubmitting;
  submitInMomentReflectionBtn.textContent = state.inMomentSubmitting ? "Analyzing..." : "Save Reflection";
}

function buildRuleBasedReflectionFeedback(entries, weakStages) {
  const joined = entries.join(" ").toLowerCase();
  const hasEmotion = /(frustrat|stress|nervous|defensive|anxious|calm|pressure)/.test(joined);
  const hasAction = /(next step|owner|timeline|follow-up|by\s+\w+day|action)/.test(joined);
  const hasQuestion = /\?/.test(joined) || /(ask|question|listen|understand)/.test(joined);

  const strengths = [];
  const growth = [];

  if (hasEmotion) {
    strengths.push("You are noticing emotional signals instead of only content.");
  } else {
    growth.push("Name one emotion cue earlier so you can regulate your response faster.");
  }

  if (hasQuestion) {
    strengths.push("You are using inquiry as a strategy, which supports stronger listening.");
  } else {
    growth.push("Add one open question before your next persuasive statement.");
  }

  if (hasAction) {
    strengths.push("Your reflection shows commitment-focused closing behavior.");
  } else {
    growth.push("Close with one action, one owner, and one follow-up date.");
  }

  const weakText = weakStages.length ? weakStages.join(", ") : "Listen";
  return [
    `Strengths: ${strengths.join(" ") || "You are building awareness of your conversation pattern."}`,
    `Growth focus (${weakText}): ${growth.join(" ") || "Keep practicing with specific evidence and clear commitments."}`,
    "Next attempt: apply one change immediately in your next two turns so reflection turns into behavior.",
  ].join("\n\n");
}

async function generateReflectionFeedbackText(prompts, answers, weakStages) {
  const promptText = [
    "You are a coaching assistant for difficult conversations.",
    "Provide concise, actionable feedback in 3 short paragraphs:",
    "1) Strength seen in the reflection answers.",
    "2) Growth area tied to weak stages.",
    "3) One concrete behavioral experiment for next attempt.",
    `Weak stages: ${weakStages.join(", ") || "Listen"}`,
    "Questions and answers:",
    ...prompts.map((item, index) => `Q${index + 1}: ${item.question}\nA${index + 1}: ${answers[index] || "(blank)"}`),
  ].join("\n");

  try {
    return await callProxyAPI({
      model: state.settings.model,
      messages: [{ role: "user", content: promptText }],
    });
  } catch {
    return buildRuleBasedReflectionFeedback(answers, weakStages);
  }
}

function saveReflectionEntry(entry) {
  state.reflectionHistory.push(entry);
  if (state.reflectionHistory.length > 60) {
    state.reflectionHistory = state.reflectionHistory.slice(-60);
  }
  persistReflectionHistory();
}

// Ensure Goals Continue button triggers tailored path generation and navigation
(function bindGoalsNext() {
  const btn = document.getElementById("goalsNextBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    // Determine the single active goal (preset id or custom string)
    const selectedPresetId = state.userLearningGoals && state.userLearningGoals[0];
    const selectedCustom = state.userCustomGoals && state.userCustomGoals[0];
    const goalText = (LEARNING_GOALS.find((g) => g.id === selectedPresetId)?.title) || selectedCustom || selectedPresetId || "your goal";

    try {
      btn.disabled = true;
      btn.textContent = "Personalizing your modules...";

      const modules = await getTailoredLearningPath(goalText);
      state.customTailoredModules = Array.isArray(modules) ? modules : [];
      localStorage.setItem("sandbox.customTailoredModules", JSON.stringify(state.customTailoredModules));

      // Navigate to next page in flow
      goToPage("choice");
    } catch (err) {
      console.error("Failed to generate tailored learning path on Continue:", err);
      goToPage("choice");
    } finally {
      btn.disabled = false;
      btn.textContent = state.userLearningGoals.length + state.userCustomGoals.length === 1 ? "Continue" : "Select one goal";
    }
  });
})();

function buildReflectionTrendHtml() {
  const finalEntries = state.reflectionHistory.filter((entry) => entry.kind === "final");
  if (!finalEntries.length) {
    return "<p class=\"muted\">No reflection trend yet. Submit your first reflection to start tracking progress.</p>";
  }

  const recent = finalEntries.slice(-5);
  const avgRecent = Math.round(recent.reduce((sum, item) => sum + (item.scorePercent || 0), 0) / recent.length);
  const weakStageMap = recent.reduce((acc, item) => {
    (item.weakStages || []).forEach((stage) => {
      acc[stage] = (acc[stage] || 0) + 1;
    });
    return acc;
  }, {});
  const topWeakStage = Object.entries(weakStageMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  return `
    <ul>
      <li>Total reflection sessions: <strong>${finalEntries.length}</strong></li>
      <li>Average structure score (last ${recent.length}): <strong>${avgRecent}%</strong></li>
      <li>Most frequent weak stage recently: <strong>${escapeHtml(topWeakStage)}</strong></li>
    </ul>
  `;
}

function buildScaffoldComparisonHtml() {
  const finalEntries = state.reflectionHistory.filter((entry) => entry.kind === "final");
  if (!finalEntries.length) {
    return "<p class=\"muted\">No scaffold comparison yet. Complete one reflected session first.</p>";
  }

  const grouped = {
    1: [],
    2: [],
    3: [],
  };

  finalEntries.forEach((entry) => {
    const level = normalizeScaffoldLevel(Number(entry.scaffoldLevel || 1));
    grouped[level].push(entry);
  });

  const rows = [1, 2, 3]
    .map((level) => {
      const entries = grouped[level];
      if (!entries.length) {
        return null;
      }
      const avg = Math.round(entries.reduce((sum, item) => sum + (item.scorePercent || 0), 0) / entries.length);
      const latest = entries[entries.length - 1]?.scorePercent || 0;
      return {
        level,
        label: getScaffoldLabel(level),
        sessions: entries.length,
        avg,
        latest,
      };
    })
    .filter(Boolean);

  const usedLevels = rows.length;
  const note = usedLevels < 2
    ? "Use at least two levels to compare performance trend across scaffolds."
    : "Compare averages and latest score to decide when to fade support further.";

  return `
    <ul>
      ${rows
        .map((row) => `<li><strong>${escapeHtml(row.label)}</strong>: avg ${row.avg}% | latest ${row.latest}% | sessions ${row.sessions}</li>`)
        .join("")}
    </ul>
    <p class="muted">${note}</p>
  `;
}

function computeSilenceRiskMetrics(messages, scores) {
  const userMessages = (messages || []).filter((item) => item.role === "user").map((item) => item.content || "");
  const text = userMessages.join(" ").toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length || 1;

  const countMatches = (patterns) => patterns.reduce((sum, pattern) => sum + ((text.match(pattern) || []).length), 0);

  const deferenceCount = countMatches([
    /\bwith respect\b/g,
    /\bi understand\b/g,
    /\bif you agree\b/g,
    /\bif appropriate\b/g,
    /\bwould you\b/g,
    /\bcould we\b/g,
  ]);
  const softenerCount = countMatches([
    /\bmaybe\b/g,
    /\bperhaps\b/g,
    /\bi think\b/g,
    /\bi feel\b/g,
    /\bjust\b/g,
    /\bkind of\b/g,
    /\bsort of\b/g,
  ]);
  const directCount = countMatches([
    /\bi recommend\b/g,
    /\bwe need\b/g,
    /\bthe risk is\b/g,
    /\bi noticed\b/g,
    /\bi suggest\b/g,
    /\blet us\b/g,
    /\blet's\b/g,
  ]);
  const questionCount = (text.match(/\?/g) || []).length;

  const deferenceOverload = Math.min(100, Math.round((deferenceCount / wordCount) * 900));
  const assertivenessBalance = Math.max(0, Math.min(100, Math.round((directCount / Math.max(1, directCount + softenerCount + questionCount)) * 100)));
  const clarityWithRespect = Math.max(
    20,
    Math.min(100, Math.round(((scores?.reduce((sum, item) => sum + item.score, 0) || 0) / (ILETS.length * 2)) * 70 + (100 - Math.min(45, deferenceOverload)) * 0.3))
  );
  const silenceToVoiceIndex = Number((directCount / Math.max(1, softenerCount + questionCount)).toFixed(2));
  const escalationReadiness = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        ((scores?.find((item) => item.stage === "Talk")?.score || 0) * 25) +
        ((scores?.find((item) => item.stage === "Solve")?.score || 0) * 25) +
        assertivenessBalance * 0.5
      )
    )
  );

  return {
    deferenceOverload,
    clarityWithRespect,
    assertivenessBalance,
    silenceToVoiceIndex,
    escalationReadiness,
  };
}

function buildReflectionDraftHistoryHtml() {
  if (!state.reflectionDrafts.length) {
    return "<p class=\"muted\">No saved drafts yet.</p>";
  }

  const recent = state.reflectionDrafts
    .slice()
    .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))
    .slice(0, 6);

  return `
    <ul class="reflection-draft-list">
      ${recent
        .map((item) => `
          <li>
            <div>
              <strong>${new Date(item.savedAt).toLocaleString()}</strong>
              <p class="muted">${escapeHtml((item.answers?.join(" | ") || "").slice(0, 110)) || "Saved reflection draft"}</p>
            </div>
            <button class="ghost" type="button" data-reflection-draft-load="${escapeHtml(item.id)}">Load</button>
          </li>
        `)
        .join("")}
    </ul>
  `;
}

function setReflectionDraftLock(locked) {
  state.finalReflectionDraftLocked = locked;
  ["#reflectionAnswer1", "#reflectionAnswer2", "#reflectionAnswer3"].forEach((selector) => {
    const node = finalReflectionContent?.querySelector(selector);
    if (!node) {
      return;
    }
    node.readOnly = locked;
    node.classList.toggle("reflection-draft-saved", locked);
  });

  const saveBtn = finalReflectionContent?.querySelector("#saveReflectionDraftBtn");
  if (saveBtn) {
    saveBtn.disabled = locked;
    saveBtn.textContent = locked ? "Draft Saved" : "Save Draft";
  }

  const editBtn = finalReflectionContent?.querySelector("#editReflectionDraftBtn");
  if (editBtn) {
    editBtn.disabled = !locked;
  }
}

function getWeaknessLabel(score) {
  if (score <= 0) {
    return "Needs attention";
  }
  if (score === 1) {
    return "Could improve";
  }
  return "Strong";
}

function buildStageFallbackDrill(stage) {
  const guide = STAGE_GUIDE[stage] || STAGE_GUIDE.Listen;
  const starterA = guide.starters?.[0] || "Use one clear sentence starter.";
  const starterB = guide.starters?.[1] || "Follow with one open question.";
  return [
    `${stage} drill (2 minutes):`,
    `1) Say this line once: ${starterA}`,
    `2) Improve it once using your own words.`,
    `3) Add this follow-up line: ${starterB}`,
    "4) Finish with one next-step request.",
  ].join("\n");
}

async function generateStageDrill(stage, weakStages) {
  const promptText = [
    "You are an expert conversation coach.",
    `Create one short targeted drill for stage: ${stage}.`,
    `Weak stages context: ${weakStages.join(", ") || "None"}`,
    "Output format:",
    "- Drill title",
    "- 3 steps maximum",
    "- 2 sentence starters",
    "- 1 measurable success check",
    "Keep it concise and practical for immediate repetition.",
  ].join("\n");

  try {
    return await callProxyAPI({
      model: state.settings.model,
      messages: [{ role: "user", content: promptText }],
    });
  } catch {
    return buildStageFallbackDrill(stage);
  }
}

function upsertImprovementTrack({ stage, mode, status }) {
  const now = Date.now();
  const existing = state.improvementTrack.find((item) => item.stage === stage && item.mode === mode);
  if (existing) {
    existing.status = status;
    existing.lastUpdated = now;
    existing.attempts = (existing.attempts || 0) + (status === "started" ? 1 : 0);
    existing.completions = (existing.completions || 0) + (status === "completed" ? 1 : 0);
  } else {
    state.improvementTrack.push({
      id: `improve-${now}-${Math.random().toString(36).slice(2, 6)}`,
      stage,
      mode,
      status,
      attempts: status === "started" ? 1 : 0,
      completions: status === "completed" ? 1 : 0,
      createdAt: now,
      lastUpdated: now,
    });
  }
  persistImprovementTrack();
}

function buildImprovementTrackerHtml() {
  return "";
}

function maybeQueueInMomentReflection() {
  const userTurnCount = getUserTurnCount();
  if (userTurnCount < 3 || state.inMomentPrompt) {
    return;
  }

  if (userTurnCount - state.inMomentPromptAtTurn < 4) {
    return;
  }

  const stageScores = getStageScoresFromMessages(state.messages);
  const prompt = getInMomentPrompt(stageScores);
  state.inMomentPrompt = {
    ...prompt,
    turn: userTurnCount,
  };
  state.inMomentPromptAtTurn = userTurnCount;
  state.rightTab = "practice";
}

async function generateFeedback() {
  const scores = getStageScoresFromMessages(state.messages);
  const scenario = getScenario();

  const total = scores.reduce((sum, item) => sum + item.score, 0);
  const max = ILETS.length * 2;
  state.latestStageScores = scores;
  state.latestSessionScorePercent = Math.round((total / max) * 100);

  const weak = scores.filter((item) => item.score === 0).map((item) => item.stage);
  const medium = scores.filter((item) => item.score === 1).map((item) => item.stage);
  const strong = scores.filter((item) => item.score === 2).map((item) => item.stage);
  const targetStages = weak.length ? weak : (medium.length ? medium : [scores[0]?.stage || "Listen"]);
  const scoreMap = Object.fromEntries(scores.map((item) => [item.stage, item.score]));

  const metacognitivePrompts = buildAdaptivePrompts(scores);
  state.activeReflectionPrompts = metacognitivePrompts;

  const reflectionTitles = {
    "emotion-awareness": "Emotion Awareness",
    "strategy-adjustment": "Strategy Adjustment",
    "transfer-plan": "Transfer Plan",
  };

  // Get AI-powered analysis of actual chat transcript
  let coachingFeedback = "";
  let analysisData = null;
  try {
    const userGoals = [...state.userLearningGoals.map((id) => {
      const goal = LEARNING_GOALS.find((g) => g.id === id);
      return goal?.title || id;
    }), ...state.userCustomGoals];
    
    state.currentSessionAnalysis.isAnalyzing = true;
    analysisData = await analyzeSessionTranscript(
      state.messages,
      scenario.title,
      userGoals
    );
    state.currentSessionAnalysis.isAnalyzing = false;

    // Generate coaching feedback based on actual analysis
    coachingFeedback = await generateAdaptiveCoachFeedback(analysisData, scenario.title);
    
    // Save this session result for future comparison
    savePracticeSessionResult({
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      userGoals: state.userLearningGoals,
      customGoals: state.userCustomGoals,
      messageCount: state.messages.length,
      stagePerformance: analysisData.stagePerformance,
      strengths: analysisData.strengths,
      growthAreas: analysisData.growthAreas,
      userQuotes: analysisData.userQuotes,
    });
  } catch (error) {
    console.warn("Failed to generate coaching feedback:", error);
    coachingFeedback = `Strong areas: ${strong.length ? strong.join(", ") : "overall engagement"}. Growth areas: ${weak.length ? weak.join(", ") : "precision and clarity"}.`;
    analysisData = { userQuotes: [], strengths: [], growthAreas: [] };
  }

  const overviewHtml = `
    <article class="analytics-card" style="margin-bottom:1rem;">
      <h4 style="margin-bottom:0.6rem;">Your Coach Says</h4>
      <p style="line-height:1.75; margin:0; color:var(--ink-dark);">${escapeHtml(coachingFeedback || "Complete a practice session to get personalized coaching feedback.")}</p>
    </article>
    ${analysisData?.strengths?.length ? `
    <article class="analytics-card" style="margin-bottom:1rem;">
      <h4 style="margin-bottom:0.6rem;">What You Did Well</h4>
      <div style="display:grid; gap:1rem;">
        ${analysisData.strengths.map((s) => `
          <div>
            <p style="margin:0 0 0.4rem; font-weight:600; color:var(--ink-dark); font-size:0.95rem;">${escapeHtml(s.behavior)}</p>
            <blockquote style="margin:0; padding:0.5rem 0.85rem; border-left:3px solid #0fa37a; background:rgba(14,163,122,0.06); font-size:0.88rem; color:#444; font-style:italic; border-radius:0 4px 4px 0; line-height:1.5;">"${escapeHtml(s.evidence)}"</blockquote>
          </div>
        `).join('')}
      </div>
    </article>
    ` : ''}
    ${analysisData?.growthAreas?.length ? `
    <article class="analytics-card">
      <h4 style="margin-bottom:0.6rem;">Where to Focus Next</h4>
      <div style="display:grid; gap:1rem;">
        ${analysisData.growthAreas.map((g) => `
          <div>
            <p style="margin:0 0 0.4rem; font-weight:600; color:var(--ink-dark); font-size:0.95rem;">${escapeHtml(g.area)}</p>
            <p style="margin:0; font-size:0.9rem; border-left:3px solid #d9751e; padding-left:0.85rem; color:#555; line-height:1.5; background:rgba(217,117,30,0.04); padding:0.5rem 0.85rem; border-radius:0 4px 4px 0;">${escapeHtml(g.suggestion)}</p>
            ${g.exampleStage ? `<p style="margin:0.4rem 0 0; font-size:0.82rem; color:#888;">Practice stage: <strong>${escapeHtml(g.exampleStage)}</strong></p>` : ''}
          </div>
        `).join('')}
      </div>
    </article>
    ` : ''}
  `;

  const reflectionHtml = `
    <article class="analytics-card reflection-form-card">
      <h4>Reflect on This Session</h4>
      <p class="muted" style="margin-bottom:1.25rem;">These three questions are tailored to your weak stage${weak.length === 1 ? '' : 's'} — <strong>${escapeHtml(weak.join(", ") || "keep building on all stages")}</strong>. Answer honestly in your own words. Then submit for personalized written feedback.</p>

      <section class="reflection-item">
        <div class="reflection-item-head">
          <strong>${reflectionTitles[metacognitivePrompts[0].id]}</strong>
          <span class="reflection-stage-tag">${escapeHtml(metacognitivePrompts[0].stage)}</span>
        </div>
        <p class="reflection-question">${escapeHtml(metacognitivePrompts[0].question)}</p>
        <textarea id="reflectionAnswer1" rows="4" placeholder="Be specific — reference something that actually happened in your conversation..."></textarea>
      </section>

      <section class="reflection-item">
        <div class="reflection-item-head">
          <strong>${reflectionTitles[metacognitivePrompts[1].id]}</strong>
          <span class="reflection-stage-tag">${escapeHtml(metacognitivePrompts[1].stage)}</span>
        </div>
        <p class="reflection-question">${escapeHtml(metacognitivePrompts[1].question)}</p>
        <textarea id="reflectionAnswer2" rows="4" placeholder="Think about what you'd do differently, or what worked well..."></textarea>
      </section>

      <section class="reflection-item">
        <div class="reflection-item-head">
          <strong>${reflectionTitles[metacognitivePrompts[2].id]}</strong>
          <span class="reflection-stage-tag">Real-world Transfer</span>
        </div>
        <p class="reflection-question">${escapeHtml(metacognitivePrompts[2].question)}</p>
        <textarea id="reflectionAnswer3" rows="4" placeholder="Name a real situation where you'll apply one thing from this session..."></textarea>
      </section>

      <div class="flow-actions flow-actions-wrap">
        <button id="saveReflectionDraftBtn" class="ghost" type="button">Save Draft</button>
        <button id="editReflectionDraftBtn" class="ghost" type="button" disabled>Edit Draft</button>
        <button id="submitReflectionBtn" type="button">Get Written Feedback</button>
      </div>
      <p id="reflectionDraftStatus" class="muted">Draft not saved yet.</p>
      <div id="reflectionAiFeedback" class="reflection-feedback muted"></div>

      <h4 style="margin-top:1.5rem;">Your Reflection History</h4>
      <p class="muted" style="font-size:0.88rem; margin-bottom:0.75rem;">Previous drafts from past sessions — load any to compare your thinking over time.</p>
      <div id="reflectionDraftHistory" class="reflection-trend">${buildReflectionDraftHistoryHtml()}</div>
    </article>
  `;

  const analytics = computeAnalytics();
  
  // Build stage performance bars from actual chat analysis
  let stagePerformanceBarsHtml = '';
  if (analysisData?.stagePerformance && Object.keys(analysisData.stagePerformance).length > 0) {
    const ILETS_STAGES = ['Introduce', 'Listen', 'Empathize', 'Talk', 'Solve'];
    stagePerformanceBarsHtml = `
    <article class="analytics-card">
      <h4>ILETS Stage Performance (Based on Your Chat)</h4>
      <div class="mini-bars">
        ${ILETS_STAGES.map((stage) => {
          const score = analysisData.stagePerformance[stage] || 0;
          const barWidth = Math.min(100, score);
          return `
        <div class="mini-bar-row">
          <span>${stage}</span>
          <div class="mini-track"><div class="mini-fill" style="width:${barWidth}%"></div></div>
          <strong>${score}%</strong>
        </div>
          `;
        }).join('')}
      </div>
      <p class="muted">Based on your actual performance in this session. Compare to your previous sessions below.</p>
    </article>
    `;
  } else {
    // Fallback to generic metrics
    stagePerformanceBarsHtml = `
    <article class="analytics-card">
      <h4>Performance Bars</h4>
      <div class="mini-bars">
        <div class="mini-bar-row">
          <span>ILETS Progress</span>
          <div class="mini-track"><div class="mini-fill" style="width:${analytics.stageCoverage}%"></div></div>
          <strong>${analytics.stageCoverage}%</strong>
        </div>
        <div class="mini-bar-row">
          <span>Clarity Score</span>
          <div class="mini-track"><div class="mini-fill" style="width:${Math.max(8, 100 - Math.min(90, analytics.fillerRate * 2))}%"></div></div>
          <strong>${Math.max(8, 100 - Math.min(90, analytics.fillerRate * 2))}%</strong>
        </div>
        <div class="mini-bar-row">
          <span>Structure Score</span>
          <div class="mini-track"><div class="mini-fill" style="width:${Math.round((total / max) * 100)}%"></div></div>
          <strong>${Math.round((total / max) * 100)}%</strong>
        </div>
      </div>
    </article>
    `;
  }

  // Build comparison to previous session if available
  let comparisonHtml = '';
  if (analysisData?.previousSessionComparison) {
    const { improvements } = analysisData.previousSessionComparison;
    const improved = improvements.filter((i) => i.improved).length;
    const total = improvements.length;
    
    comparisonHtml = `
    <article class="analytics-card">
      <h4>Progress vs. Last Session</h4>
      <p style="margin: 0.5rem 0; font-size: 0.9rem;">
        ${improved > 0 ? `✨ <strong>${improved} stage${improved === 1 ? '' : 's'} improved</strong> since your last practice!` : "Keep practicing to improve from your last session!"}
      </p>
      <div style="display: grid; gap: 0.5rem; margin-top: 0.75rem;">
        ${improvements.map((imp) => {
          const change = imp.current - imp.previous;
          const changeSymbol = change > 0 ? '📈' : change < 0 ? '📉' : '→';
          const changeText = change > 0 ? `+${change}%` : `${change}%`;
          return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: rgba(0,0,0,0.02); border-radius: 4px;">
            <span>${imp.stage}</span>
            <span style="font-size: 0.85rem;"><strong>${imp.current}%</strong> <span style="color:#888;">(${changeSymbol} ${changeText})</span></span>
          </div>
          `;
        }).join('')}
      </div>
    </article>
    `;
  }
  
  const sessionHtml = `
    <article class="analytics-card">
      <h4>Session Overview</h4>
      <p class="analytics-metric" style="margin-bottom:0.3rem;"><strong>Scenario:</strong> ${escapeHtml(scenario.title)}</p>
      <p class="analytics-metric" style="margin-bottom:0.3rem;"><strong>Turns:</strong> ${analytics.totalTurns} &nbsp;·&nbsp; <strong>Avg words/turn:</strong> ${analytics.avgWords}</p>
      <p class="muted">You actively covered <strong>${analytics.stageCoverage}%</strong> of the ILETS stages in this session.</p>
    </article>
    ${stagePerformanceBarsHtml}
    ${comparisonHtml}
  `;

  feedbackPanel.innerHTML = overviewHtml;
  finalFeedbackContent.innerHTML = overviewHtml;
  if (finalReflectionContent) {
    finalReflectionContent.innerHTML = reflectionHtml;
  }
  if (analyticsSummary) {
    analyticsSummary.innerHTML = sessionHtml;
  }
  setReflectionDraftLock(false);
  finalIdentity.textContent = `${getLearnerName()}, here is your latest session review.`;
  renderDashboardTabs("overview");
}

async function handleSend(event) {
  event.preventDefault();
  clearScaffoldPauseTimer();
  const userText = promptInput.value.trim();
  if (!userText) {
    return;
  }

  stopVoiceListening();

  if (voiceSendTimer) {
    clearTimeout(voiceSendTimer);
    voiceSendTimer = null;
  }

  state.voice.pendingFinal = "";
  state.voice.interim = "";

  state.messages.push({ role: "user", content: userText });
  advanceStageFromUserMessage(userText);
  maybeQueueInMomentReflection();
  promptInput.value = "";
  render();
  setPending(true);

  let assistantReply = "";

  try {
    const reply = await withTimeout(generateRoleplayReply(), 15000);
    const parsed = parseAssistantOutput(reply);
    addHint(parsed.hint);
    addCoachNote(userText, parsed);
    assistantReply = personalizeReply(parsed.message);
    state.messages.push({ role: "assistant", content: assistantReply });
    void refreshDynamicPracticeHints();
  } catch (error) {
    void error;
    const fallback = localFallbackReply(userText);
    addHint(fallback.hint);
    addCoachNote(userText, fallback);
    assistantReply = personalizeReply(fallback.message);
    state.messages.push({
      role: "assistant",
      content: assistantReply,
    });
    void refreshDynamicPracticeHints();
  } finally {
    setPending(false);
    render();
    speakAssistantReply(assistantReply);
    if (state.voice.mode && !window.speechSynthesis) {
      startVoiceListening();
    }
    promptInput.focus();
    armScaffoldPauseTimer();
  }
}

function switchScenario(nextScenarioId) {
  state.selectedScenarioId = nextScenarioId;
  applyScenarioScaffoldDefault(nextScenarioId);
  state.briefTab = "scenario";
  openSessionIntro();
  render();
}

function bindScenarioPickerInteractions() {
  if (createScenarioBriefingBtn && createScenarioBriefingBtn.dataset.bound !== "1") {
    createScenarioBriefingBtn.addEventListener("click", () => {
      openScenarioBuilderForCreate();
    });
    createScenarioBriefingBtn.dataset.bound = "1";
  }

  if (scenarioPickerGrid && scenarioPickerGrid.dataset.bound !== "1") {
    scenarioPickerGrid.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-scenario-action]");
      if (actionButton) {
        const scenarioId = actionButton.getAttribute("data-scenario-id");
        const action = actionButton.getAttribute("data-scenario-action");
        if (!scenarioId || !action) {
          return;
        }
        if (action === "edit") {
          openScenarioBuilderForEdit(scenarioId);
        }
        if (action === "delete") {
          deleteCustomScenario(scenarioId);
        }
        return;
      }

      const selectNode = event.target.closest(".picker-card-select, .scenario-picker-card");
      if (!selectNode) {
        return;
      }
      const scenarioId = selectNode.getAttribute("data-scenario-id");
      if (scenarioId) {
        event.preventDefault();
        const typedName = (userNameInput?.value || "").trim();
        if (typedName) {
          saveUserName(typedName);
        }
        state.selectedScenarioId = scenarioId;
        applyScenarioScaffoldDefault(scenarioId);
        renderBriefingPage();
      }
    });
    scenarioPickerGrid.dataset.bound = "1";
  }

  if (toggleScenarioPickerListBtn && toggleScenarioPickerListBtn.dataset.bound !== "1") {
    toggleScenarioPickerListBtn.addEventListener("click", () => {
      state.scenarioPickerExpanded = !state.scenarioPickerExpanded;
      renderScenarioPicker();
    });
    toggleScenarioPickerListBtn.dataset.bound = "1";
  }
}

bindScenarioPickerInteractions();

scenarioList.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("[data-scenario-list-toggle]");
  if (toggleButton) {
    state.scenarioListExpanded = !state.scenarioListExpanded;
    renderScenarios();
    return;
  }

  const button = event.target.closest(".scenario-btn");
  if (!button) {
    return;
  }
  const scenarioId = button.getAttribute("data-scenario-id");
  if (scenarioId && scenarioId !== state.selectedScenarioId) {
    switchScenario(scenarioId);
  }
});

chatForm.addEventListener("submit", handleSend);

if (submitInMomentReflectionBtn) {
  submitInMomentReflectionBtn.addEventListener("click", async () => {
    if (!state.inMomentPrompt || !inMomentAnswerInput) {
      return;
    }

    const answer = inMomentAnswerInput.value.trim();
    if (!answer) {
      return;
    }

    state.inMomentSubmitting = true;
    renderInMomentReflectionCard();

    const prompt = state.inMomentPrompt;
    const feedback = await generateReflectionFeedbackText(
      [{ id: "in-moment", stage: prompt.stage, question: prompt.question }],
      [answer],
      [prompt.stage]
    );

    saveReflectionEntry({
      kind: "in-moment",
      createdAt: Date.now(),
      scenarioId: getScenario().id,
      scaffoldLevel: state.scaffold.level,
      weakStages: [prompt.stage],
      answers: [answer],
      feedback,
      scorePercent: state.latestSessionScorePercent || 0,
      turns: getUserTurnCount(),
    });

    state.inMomentSubmitting = false;
    state.inMomentPrompt = null;
    state.coachNote = feedback;
    pushCoachNoteHistory(`Reflection (${prompt.stage}): ${feedback.split("\n")[0]}`);
    render();
  });
}

if (finalReflectionContent) {
  finalReflectionContent.addEventListener("click", async (event) => {
  const loadDraftButton = event.target.closest("[data-reflection-draft-load]");
  if (loadDraftButton) {
    const draftId = loadDraftButton.getAttribute("data-reflection-draft-load");
    const draft = state.reflectionDrafts.find((item) => item.id === draftId);
    if (!draft) {
      return;
    }

    const [a1 = "", a2 = "", a3 = ""] = draft.answers || [];
    const n1 = finalFeedbackContent.querySelector("#reflectionAnswer1");
    const n2 = finalFeedbackContent.querySelector("#reflectionAnswer2");
    const n3 = finalFeedbackContent.querySelector("#reflectionAnswer3");
    if (n1) n1.value = a1;
    if (n2) n2.value = a2;
    if (n3) n3.value = a3;

    const statusNode = finalFeedbackContent.querySelector("#reflectionDraftStatus");
    if (statusNode) {
      statusNode.textContent = `Draft loaded from ${new Date(draft.savedAt).toLocaleString()}.`;
    }
    setReflectionDraftLock(false);
    return;
  }

  const saveDraftButton = event.target.closest("#saveReflectionDraftBtn");
  if (saveDraftButton) {
    const answer1 = finalFeedbackContent.querySelector("#reflectionAnswer1")?.value?.trim() || "";
    const answer2 = finalFeedbackContent.querySelector("#reflectionAnswer2")?.value?.trim() || "";
    const answer3 = finalFeedbackContent.querySelector("#reflectionAnswer3")?.value?.trim() || "";
    const answers = [answer1, answer2, answer3];
    if (!answers.some((value) => value.length)) {
      return;
    }

    const weakStages = state.latestStageScores.filter((item) => item.score < 2).map((item) => item.stage);
    state.reflectionDrafts.unshift({
      id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      savedAt: Date.now(),
      scenarioId: getScenario().id,
      weakStages,
      answers,
    });
    state.reflectionDrafts = state.reflectionDrafts.slice(0, 40);
    persistReflectionDrafts();

    const historyNode = finalFeedbackContent.querySelector("#reflectionDraftHistory");
    if (historyNode) {
      historyNode.innerHTML = buildReflectionDraftHistoryHtml();
    }

    const statusNode = finalFeedbackContent.querySelector("#reflectionDraftStatus");
    if (statusNode) {
      statusNode.textContent = "Draft saved. Click Edit Draft to revise.";
    }

    setReflectionDraftLock(true);
    return;
  }

  const editDraftButton = event.target.closest("#editReflectionDraftBtn");
  if (editDraftButton) {
    setReflectionDraftLock(false);
    const statusNode = finalFeedbackContent.querySelector("#reflectionDraftStatus");
    if (statusNode) {
      statusNode.textContent = "Editing enabled. Save draft when ready.";
    }
    finalFeedbackContent.querySelector("#reflectionAnswer1")?.focus();
    return;
  }

  const actionButton = event.target.closest("[data-improve-action]");
  if (actionButton) {
    const stage = actionButton.getAttribute("data-stage") || "Listen";
    const action = actionButton.getAttribute("data-improve-action");
    const weakStages = state.latestStageScores.filter((item) => item.score < 2).map((item) => item.stage);

    if (action === "ai-now") {
      upsertImprovementTrack({ stage, mode: "ai", status: "started" });
      state.stageIndex = Math.max(0, ILETS.indexOf(stage));
      state.rightTab = "practice";
      openSessionIntro();
      goToPage("practice");
      render();
      renderHeader();
      promptInput.focus();
      return;
    }

    if (action === "peer-now") {
      upsertImprovementTrack({ stage, mode: "peer", status: "started" });
      state.peer.activeView = "community";
      goToPage("peerPracticum");
      return;
    }

    if (action === "mark-done") {
      upsertImprovementTrack({ stage, mode: "self", status: "completed" });
      const trackerNode = document.getElementById("improvementTrackerAnalytics");
      if (trackerNode) {
        trackerNode.innerHTML = buildImprovementTrackerHtml();
      }
      return;
    }

    if (action === "drill") {
      actionButton.disabled = true;
      actionButton.textContent = "Generating...";
      const targetNode = finalFeedbackContent.querySelector(`#improve-drill-${stage.toLowerCase()}`);
      const drill = await generateStageDrill(stage, weakStages);
      if (targetNode) {
        targetNode.innerHTML = escapeHtml(drill).replaceAll("\n", "<br />");
        targetNode.classList.remove("muted");
      }
      upsertImprovementTrack({ stage, mode: "drill", status: "started" });
      const trackerNode = document.getElementById("improvementTrackerAnalytics");
      if (trackerNode) {
        trackerNode.innerHTML = buildImprovementTrackerHtml();
      }
      actionButton.disabled = false;
      actionButton.textContent = "Generate AI Drill";
      return;
    }
  }

  const submitButton = event.target.closest("#submitReflectionBtn");
  if (!submitButton || state.finalReflectionSubmitting) {
    return;
  }

  const answer1 = finalReflectionContent.querySelector("#reflectionAnswer1")?.value?.trim() || "";
  const answer2 = finalReflectionContent.querySelector("#reflectionAnswer2")?.value?.trim() || "";
  const answer3 = finalReflectionContent.querySelector("#reflectionAnswer3")?.value?.trim() || "";

  if (!answer1 || !answer2 || !answer3) {
    return;
  }

  const answers = [answer1, answer2, answer3];
  const weakStages = state.latestStageScores.filter((item) => item.score < 2).map((item) => item.stage);

  state.finalReflectionSubmitting = true;
  submitButton.disabled = true;
  submitButton.textContent = "Analyzing reflections...";

  const feedback = await generateReflectionFeedbackText(
    state.activeReflectionPrompts,
    answers,
    weakStages
  );

  state.finalReflectionFeedback = feedback;

  saveReflectionEntry({
    kind: "final",
    createdAt: Date.now(),
    scenarioId: getScenario().id,
    scaffoldLevel: state.scaffold.level,
    weakStages,
    answers,
    feedback,
    scorePercent: state.latestSessionScorePercent,
    turns: getUserTurnCount(),
  });

  const feedbackPanelNode = finalReflectionContent.querySelector("#reflectionAiFeedback");
  if (feedbackPanelNode) {
    feedbackPanelNode.innerHTML = escapeHtml(feedback).replaceAll("\n", "<br />");
    feedbackPanelNode.classList.remove("muted");
  }

  const trendNode = finalReflectionContent.querySelector("#reflectionTrend");
  if (trendNode) {
    trendNode.innerHTML = buildReflectionTrendHtml();
  }

  const statusNode = finalReflectionContent.querySelector("#reflectionDraftStatus");
  if (statusNode) {
    statusNode.textContent = "Reflection submitted and recorded.";
  }

  state.finalReflectionSubmitting = false;
  submitButton.disabled = false;
  submitButton.textContent = "Get Adaptive Coach Feedback";
  });

  finalReflectionContent.addEventListener("input", (event) => {
    const reflectionInput = event.target.closest("#reflectionAnswer1, #reflectionAnswer2, #reflectionAnswer3");
    if (!reflectionInput) {
      return;
    }

    if (!state.finalReflectionDraftLocked) {
      const statusNode = finalReflectionContent.querySelector("#reflectionDraftStatus");
      if (statusNode) {
        statusNode.textContent = "Unsaved changes.";
      }
    }
  });
}

if (finalTabOverview && finalTabReflection && finalTabSession) {
  [finalTabOverview, finalTabReflection, finalTabSession].forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button === finalTabOverview ? "overview" : button === finalTabReflection ? "reflection" : "session";
      renderDashboardTabs(tab);
    });
  });
}

analyticsSummary.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-improve-filter]");
  if (!filterButton) {
    return;
  }

  const range = filterButton.getAttribute("data-improve-filter");
  if (range === "week" || range === "all") {
    state.improvementTrackRange = range;
    const trackerNode = document.getElementById("improvementTrackerAnalytics");
    if (trackerNode) {
      trackerNode.innerHTML = buildImprovementTrackerHtml();
    }
  }
});

voiceModeBtn.addEventListener("click", () => {
  toggleVoiceMode();
});

promptInput.addEventListener("keydown", (event) => {
  if (state.scaffold.level === 2 && !state.isTyping) {
    armScaffoldPauseTimer();
  }
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

promptInput.addEventListener("input", () => {
  if (state.scaffold.level === 2 && !state.isTyping) {
    armScaffoldPauseTimer();
  }
});

finishBtn.addEventListener("click", async () => {
  await generateFeedback();
  state.rightTab = "practice";
  renderRightPanel();
  goToPage("final");
});

rightTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".right-tab");
  if (!button) {
    return;
  }
  const tab = button.getAttribute("data-right-tab");
  if (!tab) {
    return;
  }
  state.rightTab = tab;
  renderRightPanel();
});

toggleFocusBtn.addEventListener("click", () => {
  state.focusMode = !state.focusMode;
  renderFocusMode();
});

toggleLeftColumnBtn.addEventListener("click", () => {
  state.leftVisible = !state.leftVisible;
  renderColumnVisibility();
});

toggleRightColumnBtn.addEventListener("click", () => {
  state.rightVisible = !state.rightVisible;
  renderColumnVisibility();
});

briefTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".brief-tab");
  if (!button) {
    return;
  }
  const tab = button.getAttribute("data-tab");
  if (!tab) {
    return;
  }
  state.briefTab = tab;
  renderBrief();
});

if (toggleScenarioBriefBtn) {
  toggleScenarioBriefBtn.addEventListener("click", () => {
    state.scenarioBriefExpanded = !state.scenarioBriefExpanded;
    renderScenarioBriefVisibility();
  });
}

toggleScenariosBtn.addEventListener("click", () => {
  state.scenariosExpanded = !state.scenariosExpanded;
  renderScenariosVisibility();
});

toggleTipsBtn.addEventListener("click", () => {
  state.tipsExpanded = !state.tipsExpanded;
  renderTips();
});


if (toggleStartersBtn) {
  toggleStartersBtn.addEventListener("click", () => {
    if (state.scaffold.level === 1 || state.scaffold.level === 3) {
      return;
    }
    state.scaffold.hintsVisible = !state.scaffold.hintsVisible;
    renderPracticeStrip();
  });
}

if (briefScaffoldLevelGroup) {
  briefScaffoldLevelGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-brief-scaffold]");
    if (!button) {
      return;
    }
    const level = normalizeScaffoldLevel(Number(button.getAttribute("data-brief-scaffold")));
    setScaffoldLevel(level);
    renderChoiceSnapshot();
    renderBriefingPage();
    renderPracticeStrip();
    renderHeader();
  });
}

if (practiceScaffoldMenuBtn && practiceScaffoldMenu) {
  practiceScaffoldMenuBtn.addEventListener("click", () => {
    const open = practiceScaffoldMenu.classList.contains("is-hidden");
    setPracticeScaffoldMenuOpen(open);
  });

  practiceScaffoldMenu.addEventListener("click", (event) => {
    const option = event.target.closest("[data-practice-scaffold]");
    if (!option) {
      return;
    }
    const level = normalizeScaffoldLevel(Number(option.getAttribute("data-practice-scaffold")));
    setScaffoldLevel(level);
    setPracticeScaffoldMenuOpen(false);
    renderChoiceSnapshot();
    renderBriefingPage();
    renderPracticeStrip();
    renderHeader();
  });
}

document.addEventListener("click", (event) => {
  if (!practiceScaffoldMenuBtn || !practiceScaffoldMenu) {
    return;
  }
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  if (target.closest("#practiceScaffoldMenuBtn") || target.closest("#practiceScaffoldMenu")) {
    return;
  }
  setPracticeScaffoldMenuOpen(false);
});

toggleIletsBtn.addEventListener("click", () => {
  state.iletsExpanded = !state.iletsExpanded;
  renderIletsVisibility();
});

stageList.addEventListener("click", (event) => {
  const button = event.target.closest(".stage-item");
  if (!button) {
    return;
  }
  const value = button.getAttribute("data-stage-index");
  if (value === null) {
    return;
  }
  state.stageIndex = Number(value);
  promptInput.placeholder = `Respond using ${ILETS[state.stageIndex]} stage...`;
  render();
  promptInput.focus();
});

stageStarters.addEventListener("click", (event) => {
  const button = event.target.closest(".starter-chip");
  if (!button) {
    return;
  }
  const starter = button.getAttribute("data-starter");
  if (!starter) {
    return;
  }

  const spacing = promptInput.value.trim().length ? "\n" : "";
  promptInput.value = `${promptInput.value}${spacing}${starter}`;
  promptInput.focus();
});

nextStageBtn.addEventListener("click", () => {
  if (state.stageIndex < ILETS.length - 1) {
    state.stageIndex += 1;
    promptInput.placeholder = `Respond using ${ILETS[state.stageIndex]} stage...`;
    render();
    promptInput.focus();
  }
});

openSettingsBtn.addEventListener("click", () => {
  modeSelect.value = state.settings.mode;
  proxyUrlInput.value = state.settings.proxyUrl;
  apiKeyInput.value = state.settings.apiKey;
  settingsDialog.showModal();
});

settingsForm.addEventListener("submit", () => {
  state.settings.mode = modeSelect.value;
  state.settings.proxyUrl = proxyUrlInput.value.trim() || "https://social-sandbox-api-proxy.onrender.com/api/chat";
  state.settings.apiKey = apiKeyInput.value.trim();
  saveSettings();
  renderHeader();
});

settingsForm.addEventListener("reset", () => {
  settingsDialog.close();
});

goToChoiceBtn.addEventListener("click", () => {
  window.__ssNavigate("goals");
});

chooseLearnBtn.addEventListener("click", () => {
  state.moduleIndex = 0;
  state.moduleQuizPassed = false;
  state.aiQuizQuestions = [];
  state.aiQuizGenerated = false;
  state.aiQuizLoading = false;
  if (quizResultText) {
    quizResultText.innerHTML = "";
    quizResultText.classList.add("is-hidden");
  }
  if (submitQuizBtn) {
    submitQuizBtn.disabled = true;
    submitQuizBtn.textContent = "Submit Reflection";
  }
  goToPage("learn");
});

choosePracticeBtn.addEventListener("click", () => {
  if (!ensureLearnerNameSet()) {
    return;
  }
  goToPage("scenarioBriefing");
});


if (choosePeerBtn) {
  choosePeerBtn.addEventListener("click", () => {
    if (!ensureLearnerNameSet()) {
      return;
    }
    goToPage("peerPracticum");
  });
}

if (dashboardBackBtn) {
  dashboardBackBtn.addEventListener("click", () => {
    goToPage("choice");
  });
}

if (dashboardPracticeAiBtn) {
  dashboardPracticeAiBtn.addEventListener("click", () => {
    if (!ensureLearnerNameSet()) {
      return;
    }
    const recommendedStage = getRecommendedStartStage();
    state.stageIndex = Math.max(0, ILETS.indexOf(recommendedStage));
    goToPage("scenarioBriefing");
  });
}

if (dashboardPracticePeerBtn) {
  dashboardPracticePeerBtn.addEventListener("click", () => {
    if (!ensureLearnerNameSet()) {
      return;
    }
    goToPage("peerPracticum");
  });
}

learnBackBtn.addEventListener("click", () => {
  goToPage("choice");
});

startPracticeBtn.addEventListener("click", () => {
  const enteredName = (state.userName || userNameInput?.value || "").trim();
  if (!enteredName) {
    goToPage("goals");
    if (goalsNameStatus) goalsNameStatus.textContent = "Please set your name before starting practice.";
    if (goalsNameInput) {
      goalsNameInput.focus();
      goalsNameInput.select();
    }
    return;
  }
  saveUserName(enteredName);
  goToPage("scenarioBriefing");
});

beginPracticeBtn.addEventListener("click", () => {
  const enteredName = (
    state.nameEditorOpen && briefUserNameInput
      ? briefUserNameInput.value
      : state.userName || userNameInput.value
  ).trim();
  if (!enteredName) {
    window.alert("Please set your name before starting practice.");
    if (editUserNameBtn) {
      state.nameEditorOpen = true;
      renderBriefingPage();
      briefUserNameInput.focus();
    }
    return;
  }
  saveUserName(enteredName);
  enterPracticeCompactMode();
  openSessionIntro();
  goToPage("practice");
  render();
  renderHeader();
  promptInput.focus();
});

cancelBriefingBtn.addEventListener("click", () => {
  goToPage("choice");
});

backFromBriefingBtn.addEventListener("click", () => {
  renderScenarioPicker();
});

if (editScenarioBriefingBtn) {
  editScenarioBriefingBtn.addEventListener("click", () => {
    const scenario = getScenario();
    if (scenario) {
      openScenarioBuilderForEdit(scenario.id);
    }
  });
}

if (editUserNameBtn && userNameEditor && briefUserNameInput) {
  editUserNameBtn.addEventListener("click", () => {
    state.nameEditorOpen = !state.nameEditorOpen;
    renderBriefingPage();
    if (state.nameEditorOpen) {
      briefUserNameInput.value = state.userName;
      briefUserNameInput.focus();
      briefUserNameInput.select();
      return;
    }

    saveUserName(briefUserNameInput.value);
    renderUserNameSummary();
  });

  briefUserNameInput.addEventListener("input", () => {
    saveUserName(briefUserNameInput.value);
    renderUserNameSummary();
  });

  briefUserNameInput.addEventListener("blur", () => {
    if (!state.nameEditorOpen) {
      return;
    }
    saveUserName(briefUserNameInput.value);
    state.nameEditorOpen = false;
    renderBriefingPage();
  });
}

bindScenarioPickerInteractions();

if (choiceSaveNameBtn && choiceNameInput) {
  choiceSaveNameBtn.addEventListener("click", () => {
    const typed = choiceNameInput.value.trim();
    if (!typed) {
      setChoiceNameStatus("Please enter your name first.");
      choiceNameInput.focus();
      return;
    }
    saveUserName(typed);
    renderChoiceIdentity();
    renderUserNameSummary();
    renderHeader();
    if (state.page === "peerPracticum") {
      renderPeerPracticum();
    }
  });

  choiceNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      choiceSaveNameBtn.click();
    }
  });
}

if (goalsSaveNameBtn && goalsNameInput) {
  goalsSaveNameBtn.addEventListener("click", () => {
    const typed = goalsNameInput.value.trim();
    if (!typed) {
      if (goalsNameStatus) goalsNameStatus.textContent = "Please enter your name first.";
      goalsNameInput.focus();
      return;
    }
    saveUserName(typed);
    renderGoalsIdentity();
    renderChoiceIdentity();
    renderUserNameSummary();
    renderHeader();
  });

  goalsNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      goalsSaveNameBtn.click();
    }
  });
}

bindScenarioPickerInteractions();

modulePrevBtn.addEventListener("click", () => {
  if (state.moduleIndex > 0) {
    state.moduleIndex -= 1;
    renderModule();
  }
});

moduleNextBtn.addEventListener("click", () => {
  if (state.moduleIndex < getLearningModules().length - 1) {
    state.moduleIndex += 1;
    renderModule();
  }
});

submitQuizBtn.addEventListener("click", async () => {
  const textareas = aiQuizContainer ? aiQuizContainer.querySelectorAll(".ai-quiz-textarea") : [];
  const answers = Array.from(textareas).map(t => t.value.trim());

  if (answers.every(a => !a)) {
    if (quizResultText) {
      quizResultText.innerHTML = `<p style="color:var(--ink-muted);">Please write at least one answer before submitting.</p>`;
      quizResultText.classList.remove("is-hidden");
    }
    return;
  }

  submitQuizBtn.disabled = true;
  submitQuizBtn.textContent = "Getting feedback...";
  if (quizResultText) quizResultText.classList.add("is-hidden");

  const goal = getQuizGoalText();
  const qaText = state.aiQuizQuestions.map((q, i) =>
    `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || "(no answer)"}`
  ).join("\n\n");

  const systemPrompt = {
    role: "system",
    content: `You give warm, specific, constructive feedback on a learner's reflection answers about difficult conversations.
The learner's focus area: "${goal}"
Framework studied: ILETS (Introduce, Listen, Empathize, Talk, Solve).

Give 2–3 sentences of feedback that:
- Reference their actual words (quote briefly if helpful)
- Acknowledge what shows genuine insight
- Gently push on one thing they could think more deeply about
- End with one concrete thing to notice in their upcoming practice

Be direct and warm. No bullet points — just natural, thoughtful prose.`
  };

  const userPrompt = {
    role: "user",
    content: `Here are the learner's reflection answers:\n\n${qaText}`
  };

  try {
    const feedback = await callProxyAPI({ model: state.settings.model || "gpt-4", messages: [systemPrompt, userPrompt] });
    if (quizResultText) {
      quizResultText.innerHTML = `<p style="font-weight:600;margin:0 0 0.4rem;">Feedback on your reflection</p><p style="margin:0;line-height:1.7;">${escapeHtml(feedback)}</p>`;
      quizResultText.classList.remove("is-hidden");
    }
    state.moduleQuizPassed = true;
  } catch {
    if (quizResultText) {
      quizResultText.innerHTML = `<p style="margin:0;">Thanks for reflecting. You're ready to practice — keep these thoughts in mind as you go.</p>`;
      quizResultText.classList.remove("is-hidden");
    }
    state.moduleQuizPassed = true;
  }

  submitQuizBtn.textContent = "Reflection submitted";
  startPracticeBtn.focus();
});

backToChoiceBtn.addEventListener("click", () => {
  goToPage("choice");
});

restartPracticeBtn.addEventListener("click", () => {
  openSessionIntro();
  goToPage("practice");
  render();
  promptInput.focus();
});

goHomeBtn.addEventListener("click", () => {
  goToPage("landing");
});

if (goLearningPathBtn) {
  goLearningPathBtn.addEventListener("click", () => {
    goToPage("choice");
  });
}

if (backToBriefingBtn) {
  backToBriefingBtn.addEventListener("click", () => {
    goToPage("scenarioBriefing");
  });
}

if (peerBackToChoiceBtn) {
  peerBackToChoiceBtn.addEventListener("click", () => {
    state.peer.nameEditorOpen = false;
    goToPage("choice");
  });
}

if (peerEditNameBtn && peerUserNameEditor && peerUserNameInput) {
  peerEditNameBtn.addEventListener("click", () => {
    state.peer.nameEditorOpen = !state.peer.nameEditorOpen;
    if (!state.peer.nameEditorOpen) {
      saveUserName(peerUserNameInput.value);
      renderUserNameSummary();
      renderHeader();
    }
    renderPeerPracticum();
    if (state.peer.nameEditorOpen) {
      peerUserNameInput.focus();
      peerUserNameInput.select();
    }
  });

  peerUserNameInput.addEventListener("input", () => {
    saveUserName(peerUserNameInput.value);
    renderUserNameSummary();
    renderHeader();
    if (peerIdentityName) {
      peerIdentityName.textContent = getLearnerName();
    }
  });

  peerUserNameInput.addEventListener("blur", () => {
    if (!state.peer.nameEditorOpen) {
      return;
    }
    saveUserName(peerUserNameInput.value);
    state.peer.nameEditorOpen = false;
    renderUserNameSummary();
    renderHeader();
    renderPeerPracticum();
  });
}

if (peerChatForm) {
  peerChatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.peer.activeSession) {
      return;
    }
    const text = peerChatInput.value.trim();
    if (!text) {
      return;
    }
    state.peer.activeSession.messages.push({
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      author: getLearnerName(),
      text,
      timestamp: Date.now(),
    });
    state.peer.activeSession.messages = state.peer.activeSession.messages.slice(-120);
    peerChatInput.value = "";
    renderPeerSession();
  });
}

if (peerVoiceModeBtn) {
  peerVoiceModeBtn.addEventListener("click", () => {
    togglePeerVoiceMode();
  });
}

if (peerSharedNotes) {
  peerSharedNotes.addEventListener("input", () => {
    state.peer.sharedNotesSaved = false;
    if (peerSharedNotesStatus) {
      peerSharedNotesStatus.textContent = "Unsaved changes.";
    }
  });

  peerSharedNotes.addEventListener("change", () => {
    state.peer.sharedNotes = peerSharedNotes.value.trim();
    state.peer.sharedNotesSaved = Boolean(state.peer.sharedNotes);
    if (peerSharedNotesStatus) {
      peerSharedNotesStatus.textContent = state.peer.sharedNotesSaved
        ? "Saved. Click Edit to update notes."
        : "Not saved yet.";
    }
    renderPeerSession();
  });
}

if (peerSaveSharedNotesBtn) {
  peerSaveSharedNotesBtn.addEventListener("click", () => {
    state.peer.sharedNotes = peerSharedNotes?.value.trim() || "";
    state.peer.sharedNotesSaved = Boolean(state.peer.sharedNotes);
    if (peerSharedNotesStatus) {
      peerSharedNotesStatus.textContent = state.peer.sharedNotesSaved
        ? "Saved. Click Edit to update notes."
        : "Not saved yet.";
    }
    renderPeerSession();
  });
}

if (peerEditSharedNotesBtn) {
  peerEditSharedNotesBtn.addEventListener("click", () => {
    state.peer.sharedNotesSaved = false;
    if (peerSharedNotesStatus) {
      peerSharedNotesStatus.textContent = "Editing enabled. Save when finished.";
    }
    renderPeerSession();
    peerSharedNotes?.focus();
  });
}

document.querySelectorAll("[data-peer-stage]").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const stage = checkbox.getAttribute("data-peer-stage");
    state.peer.sessionChecklist[stage] = checkbox.checked;
  });
});

if (peerSubmitFeedbackBtn) {
  peerSubmitFeedbackBtn.addEventListener("click", () => {
    const text = peerFeedbackInput.value.trim();
    if (!text) {
      return;
    }
    state.peer.feedbackDraft = text;
    state.peer.feedbackSent = true;
    state.peer.feedbackNotes.push({
      id: `feedback-${Date.now()}`,
      author: getLearnerName(),
      text,
      timestamp: Date.now(),
    });
    state.peer.feedbackNotes = state.peer.feedbackNotes.slice(-20);
    renderPeerSession();
  });
}

if (peerEditFeedbackBtn) {
  peerEditFeedbackBtn.addEventListener("click", () => {
    state.peer.feedbackSent = false;
    if (peerFeedbackStatus) {
      peerFeedbackStatus.textContent = "Editing enabled. Send when ready.";
    }
    renderPeerSession();
    peerFeedbackInput?.focus();
  });
}

if (peerUserDirectory) {
  peerUserDirectory.addEventListener("click", (event) => {
    const requestId = event.target.closest("[data-peer-request]")?.getAttribute("data-peer-request");
    if (!requestId) {
      return;
    }
    const alreadyRequested = state.peer.requests.some((item) => item.peerId === requestId && item.status !== "completed");
    if (alreadyRequested) {
      return;
    }
    state.peer.requests.push({
      id: `req-${Date.now()}`,
      peerId: requestId,
      status: "pending",
      createdAt: Date.now(),
    });
    persistPeerRequests();
    renderPeerRequests();
  });
}

if (peerRequestList) {
  peerRequestList.addEventListener("click", (event) => {
    const acceptId = event.target.closest("[data-peer-accept]")?.getAttribute("data-peer-accept");
    if (acceptId) {
      const req = state.peer.requests.find((item) => item.id === acceptId);
      if (req) {
        req.status = "accepted";
        persistPeerRequests();
        renderPeerRequests();
      }
      return;
    }

    const startId = event.target.closest("[data-peer-start]")?.getAttribute("data-peer-start");
    if (startId) {
      startPeerSession(startId);
    }
  });
}

if (peerEndSessionBtn) {
  peerEndSessionBtn.addEventListener("click", () => {
    endPeerSession();
  });
}

if (peerTabCommunity || peerTabSession || peerTabReflection || peerTabDashboard) {
  document.querySelectorAll("[data-peer-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.getAttribute("data-peer-view");
      if (!view) {
        return;
      }
      setPeerView(view);
    });
  });
}

document.querySelectorAll("[data-peer-dashboard-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.getAttribute("data-peer-dashboard-view");
    if (!view) {
      return;
    }
    renderPeerDashboardTab(view);
  });
});

window.addEventListener("storage", (event) => {
  if (event.key !== PEER_REQUESTS_KEY) {
    return;
  }
  state.peer.requests = loadPeerRequests();
  renderPeerRequests();
});

openScenarioBuilderBtn.addEventListener("click", () => {
  openScenarioBuilderForCreate();
});

scenarioBuilderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = builderTitle.value.trim();
  const aiRole = builderRole.value.trim();
  const difficulty = builderDifficulty.value;
  const context = builderContext.value.trim();
  const opening = builderOpening.value.trim();
  const scaffoldLevel = normalizeScaffoldLevel(Number(builderScaffoldLevel?.value || 1));
  const goals = builderGoals.value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !aiRole || !context || !opening || goals.length === 0) {
    return;
  }

  const isEditing = Boolean(state.editingScenarioId);
  const scenarioId = state.editingScenarioId || `custom-${Date.now()}`;

  if (isEditing) {
    const index = state.scenarios.findIndex((item) => item.id === scenarioId);
    if (index === -1) {
      return;
    }
    const existing = state.scenarios[index];
    state.scenarios[index] = {
      ...existing,
      title,
      difficulty,
      context,
      aiRole,
      opening,
      scaffoldLevel,
      goals,
      practice: buildCustomPractice(goals, aiRole),
    };
  } else {
    const customScenario = {
      id: scenarioId,
      title,
      difficulty,
      context,
      aiRole,
      opening,
      scaffoldLevel,
      goals,
      custom: true,
      createdAt: Date.now(),
      practice: buildCustomPractice(goals, aiRole),
    };
    state.scenarios.push(customScenario);
  }

  persistScenarioState();
  state.selectedScenarioId = scenarioId;
  applyScenarioScaffoldDefault(scenarioId);
  state.briefTab = "scenario";
  state.scenarioListExpanded = false;
  state.scenarioPickerExpanded = false;
  state.editingScenarioId = null;
  openSessionIntro();
  render();
  requestAnimationFrame(() => {
    scenariosBody.scrollTop = 0;
  });
  createScenarioBtn.textContent = "Create Scenario";

  if (state.page === "scenarioBriefing") {
    renderScenarioPicker();
  }

  scenarioBuilderDialog.close();
});

scenarioBuilderForm.addEventListener("reset", () => {
  state.editingScenarioId = null;
  createScenarioBtn.textContent = "Create Scenario";
  scenarioBuilderDialog.close();
});

// Goals page event listeners
goalsBackBtn.addEventListener("click", () => {
  goToPage("landing");
});

goalsNextBtn.addEventListener("click", async () => {
  // Read checked built-in goal from the goals grid (in case UI hasn't synced state)
  try {
    // READ ALL CHECKED GOALS (not just first one)
    const checked = Array.from(document.querySelectorAll('#goalsGrid input[type="checkbox"]:checked')).map((el) => el.value);
    if (checked && checked.length >= 0) {
      state.userLearningGoals = checked; // Keep ALL selected goals
      localStorage.setItem('sandbox.userLearningGoals', JSON.stringify(state.userLearningGoals));
    }
  } catch (err) {
    // ignore if DOM not available
  }

  const totalGoals = state.userLearningGoals.length + state.userCustomGoals.length;
  // Support multiple goals (not just single goal)
  if (totalGoals >= 1) {
    // Generate tailored learning path (6 modules) based on ALL selected goals.
    try {
      // Build goal description from ALL selected preset goals
      const presetGoalTitles = state.userLearningGoals.map((goalId) => {
        const goal = LEARNING_GOALS.find((g) => g.id === goalId);
        return goal?.title || goalId;
      });
      
      // Combine all goal titles (both preset and custom) with semicolon separator
      const allGoalTitles = [...presetGoalTitles, ...state.userCustomGoals];
      const goalDescription = allGoalTitles.length > 0 ? allGoalTitles.join("; ") : "";

      if (goalDescription) {
        // Try AI first, then fallback to local generation
        const tailoredPath = await getTailoredLearningPath(goalDescription);
        state.customTailoredModules = tailoredPath;
        state.moduleIndex = 0;
        localStorage.setItem("sandbox.customTailoredModules", JSON.stringify(state.customTailoredModules));

        // Ensure goal-tailored scenario is also generated (for first goal if multiple)
        try {
          await ensureGoalTailoredScenario();
        } catch (scenarioErr) {
          console.warn("Scenario generation failed (continuing anyway):", scenarioErr);
        }
      }
    } catch (e) {
      // proceed anyway
      console.warn('Goal-based content generation failed', e);
    }
    goToPage("choice");
  }
});

choiceBackBtn.addEventListener("click", () => {
  goToPage("goals");
});

addCustomGoalBtn.addEventListener("click", async () => {
  const customGoalText = customGoalInput.value.trim();
  if (customGoalText && !state.userCustomGoals.includes(customGoalText)) {
    const totalGoals = state.userLearningGoals.length + state.userCustomGoals.length;
    if (totalGoals >= 0) {
      // Show loading state
      addCustomGoalBtn.disabled = true;
      const originalText = addCustomGoalBtn.textContent;
      addCustomGoalBtn.textContent = "Generating tailored learning path...";

      // Single-goal mode: custom goal replaces any selected preset/custom goal.
      state.userLearningGoals = [];
      state.userCustomGoals = [customGoalText];
      localStorage.setItem("sandbox.userLearningGoals", JSON.stringify(state.userLearningGoals));
      localStorage.setItem("sandbox.userCustomGoals", JSON.stringify(state.userCustomGoals));
      customGoalInput.value = "";
      
      // Generate AI-tailored full learning path (7 modules) and scenario
      try {
        const tailoredPath = await generateTailoredLearningPath(customGoalText);
        const tailoredScenario = await generateTailoredPracticeScenario(customGoalText);
        
        // Store tailored modules (full path)
        state.customTailoredModules = tailoredPath;
        state.moduleIndex = 0;
        localStorage.setItem("sandbox.customTailoredModules", JSON.stringify(state.customTailoredModules));
        
        // Add tailored scenario to scenarios list
        state.scenarios.push(tailoredScenario);
        state.customTailoredScenarios.push(tailoredScenario);
        state.selectedScenarioId = tailoredScenario.id;
        localStorage.setItem("sandbox.customTailoredScenarios", JSON.stringify(state.customTailoredScenarios));
        persistCustomScenarios();
      } catch (error) {
        console.error("Error generating tailored content:", error);
        alert("Could not generate personalized content. Check your API key in Settings.");
      } finally {
        addCustomGoalBtn.disabled = false;
        addCustomGoalBtn.textContent = originalText;
      }
      
      renderGoalsPage();
      renderCustomGoalsList();
      updateGoalsPageState();
    }
  }
});

customGoalInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addCustomGoalBtn.click();
  }
});

applyScenarioScaffoldDefault(state.selectedScenarioId);
openSessionIntro();
userNameInput.value = state.userName;
runStartupSanityChecks();
render();
renderModule();
renderPage();
renderVoiceUi();
