const ILETS = ["Introduce", "Listen", "Empathize", "Talk", "Solve"];
const CUSTOM_SCENARIOS_KEY = "sandbox.customScenarios.v1";
const USER_NAME_KEY = "sandbox.userName";
const SCENARIO_OVERRIDES_KEY = "sandbox.scenarioOverrides.v1";
const HIDDEN_SCENARIO_IDS_KEY = "sandbox.hiddenScenarioIds.v1";
const REFLECTION_HISTORY_KEY = "sandbox.reflectionHistory.v1";
const PEER_ROOM_PREFIX = "sandbox.peer.room.";
const PEER_USER_ID_KEY = "sandbox.peer.userId";
const PEER_REQUESTS_KEY = "sandbox.peer.requests.v1";

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
    title: "Report a Failing Project",
    difficulty: "High authority gradient",
    context:
      "You are a junior analyst. Your senior manager still believes the project is on track, but key milestones are missed and risks are rising.",
    aiRole: "Senior Manager",
    opening:
      "You asked for this quick sync. I only have ten minutes, so tell me what you need.",
    goals: [
      "State purpose clearly and respectfully",
      "Surface facts before conclusions",
      "Acknowledge pressure and maintain psychological safety",
      "Propose an actionable recovery plan",
    ],
    practice: {
      Introduce: {
        objective: "Open the conversation without sounding defensive.",
        starters: [
          "I want to discuss a risk I am seeing before it gets worse.",
          "My aim is to keep the project on track and surface concerns early.",
        ],
      },
      Listen: {
        objective: "Understand the manager’s priorities before presenting the issue.",
        starters: [
          "Can you share what you are seeing from your side of the project?",
          "What trade-offs are you weighing right now?",
        ],
      },
      Empathize: {
        objective: "Acknowledge pressure while keeping the conversation constructive.",
        starters: [
          "I understand the deadline pressure this creates for you.",
          "I can see why this is frustrating, and I want to solve it with you.",
        ],
      },
      Talk: {
        objective: "State the project risk with evidence, not emotion.",
        starters: [
          "Two milestones are missed, which raises the delivery risk.",
          "If we continue this way, rework and client impact are likely.",
        ],
      },
      Solve: {
        objective: "Agree on a recovery plan with ownership and timing.",
        starters: [
          "Could we agree on one recovery action for this week and an owner?",
          "Let us set a checkpoint on Friday to review progress together.",
        ],
      },
    },
  },
  {
    id: "unsafe-shortcut",
    title: "Challenge an Unsafe Shortcut",
    difficulty: "Time pressure and blame culture",
    context:
      "A teammate skips a verification step to hit deadline. You worry this creates safety and quality risks.",
    aiRole: "Teammate",
    opening:
      "We are already late. I skipped one check this time. Can we just move on?",
    goals: [
      "Open without accusation",
      "Ask questions to understand constraints",
      "Show empathy while protecting standards",
      "Co-create a safer immediate next step",
    ],
    practice: {
      Introduce: {
        objective: "Start in a non-blaming way and frame the concern clearly.",
        starters: [
          "Can we pause for a minute? I want to talk through a concern I noticed.",
          "I am not trying to blame anyone. I want to make sure we stay safe and accurate.",
        ],
      },
      Listen: {
        objective: "Ask about the pressure behind the shortcut before reacting.",
        starters: [
          "What pushed you to skip that check this time?",
          "What was making the deadline feel so tight?",
        ],
      },
      Empathize: {
        objective: "Acknowledge the time pressure without accepting the risk.",
        starters: [
          "I get that the deadline is under pressure right now.",
          "I can see why you made the call, but we still need to protect quality.",
        ],
      },
      Talk: {
        objective: "Explain the concrete risk created by the shortcut.",
        starters: [
          "Skipping verification could create an avoidable error downstream.",
          "If we miss this now, the impact could be much bigger later.",
        ],
      },
      Solve: {
        objective: "Move quickly to a safer alternative for the next step.",
        starters: [
          "What is the safest way we can fix this before moving on?",
          "Let us decide the minimum check we need before release.",
        ],
      },
    },
  },
  {
    id: "peer-feedback",
    title: "Give Peer Feedback Upward",
    difficulty: "Cross-team sensitivity",
    context:
      "A senior peer dominates meetings and dismisses junior ideas. Team morale and information sharing are declining.",
    aiRole: "Senior Peer",
    opening:
      "I heard you had concerns about our meeting style. What exactly is the issue?",
    goals: [
      "Name behavior and impact specifically",
      "Avoid personal attacks",
      "Invite perspective and shared ownership",
      "Agree on observable behavior changes",
    ],
    practice: {
      Introduce: {
        objective: "Lead with a respectful framing, not a complaint.",
        starters: [
          "I want to share an observation about how our meetings are landing.",
          "I value your input, and I also want to raise a team concern.",
        ],
      },
      Listen: {
        objective: "Invite their perspective on the meeting dynamic.",
        starters: [
          "How do you see the current meeting format working?",
          "What is your intention when you move the discussion quickly?",
        ],
      },
      Empathize: {
        objective: "Show respect for their role while naming the team effect.",
        starters: [
          "I know you are trying to keep us efficient.",
          "I understand the pressure to move quickly, and I want the team to still contribute.",
        ],
      },
      Talk: {
        objective: "Name the specific behavior and its impact on the team.",
        starters: [
          "When ideas are cut off quickly, junior teammates stop sharing.",
          "The current style is reducing information sharing in the room.",
        ],
      },
      Solve: {
        objective: "Agree on a visible behavior change for the next meeting.",
        starters: [
          "Could we try letting each person finish one thought before responding?",
          "Would you be open to a one-minute round before we decide?",
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
  userName: localStorage.getItem(USER_NAME_KEY) || "",
  nameEditorOpen: false,
  messages: [],
  stageIndex: 0,
  isTyping: false,
  briefTab: "scenario",
  scenarioBriefExpanded: true,
  scenariosExpanded: true,
  scenarioListExpanded: false,
  scenarioPickerExpanded: false,
  editingScenarioId: null,
  iletsExpanded: true,
  rightTab: "coach",
  focusMode: false,
  leftVisible: true,
  rightVisible: true,
  tipsExpanded: false,
  coachNote: "Type a message and I’ll give you a quick note here.",
  coachNoteHistory: [],
  reflectionHistory: loadReflectionHistory(),
  inMomentPrompt: null,
  inMomentPromptAtTurn: 0,
  inMomentSubmitting: false,
  latestStageScores: [],
  latestSessionScorePercent: 0,
  activeReflectionPrompts: [],
  finalReflectionSubmitting: false,
  finalReflectionFeedback: "",
  settings: {
    mode: localStorage.getItem("sandbox.mode") || "openai",
    proxyUrl: localStorage.getItem("sandbox.proxyUrl") || "http://localhost:8787/api/chat",
    apiKey: localStorage.getItem("sandbox.apiKey") || "",
    model: localStorage.getItem("sandbox.model") || "gpt-4.1-mini",
  },
  peer: {
    requests: loadPeerRequests(),
    activeSession: null,
    activeView: "community",
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
    feedbackNotes: [],
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
        JSON.stringify(baseline.goals) !== JSON.stringify(scenario.goals);

      if (changed) {
        acc[scenario.id] = {
          title: scenario.title,
          difficulty: scenario.difficulty,
          context: scenario.context,
          aiRole: scenario.aiRole,
          opening: scenario.opening,
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

const scenarioList = document.getElementById("scenarioList");
const pageLanding = document.getElementById("pageLanding");
const pageChoice = document.getElementById("pageChoice");
const pageLearn = document.getElementById("pageLearn");
const pagePeerPracticum = document.getElementById("pagePeerPracticum");
const pageScenarioBriefing = document.getElementById("pageScenarioBriefing");
const pageFinal = document.getElementById("pageFinal");
const practiceShell = document.getElementById("practiceShell");

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
const cancelBriefingBtn = document.getElementById("cancelBriefingBtn");
const backFromBriefingBtn = document.getElementById("backFromBriefingBtn");
const beginPracticeBtn = document.getElementById("beginPracticeBtn");
const pickerActions = document.getElementById("pickerActions");
const goToChoiceBtn = document.getElementById("goToChoiceBtn");
const userNameInput = document.getElementById("userNameInput");
const chooseLearnBtn = document.getElementById("chooseLearnBtn");
const choosePracticeBtn = document.getElementById("choosePracticeBtn");
const choosePeerBtn = document.getElementById("choosePeerBtn");
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
const quizResultText = document.getElementById("quizResultText");
const finalIdentity = document.getElementById("finalIdentity");
const finalFeedbackContent = document.getElementById("finalFeedbackContent");
const analyticsSummary = document.getElementById("analyticsSummary");
const finalTabCoaching = document.getElementById("finalTabCoaching");
const finalTabAnalytics = document.getElementById("finalTabAnalytics");
const finalCoachingSection = document.getElementById("finalCoachingSection");
const finalAnalyticsSection = document.getElementById("finalAnalyticsSection");
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
const feedbackPanel = document.getElementById("feedbackPanel");
const stageHelp = document.getElementById("stageHelp");
const stageProgress = document.getElementById("stageProgress");
const briefTabs = document.getElementById("briefTabs");
const toggleScenarioBriefBtn = document.getElementById("toggleScenarioBriefBtn");
const scenarioBriefBody = document.getElementById("scenarioBriefBody");
const scenarioBriefContent = document.getElementById("scenarioBriefContent");
const stageObjectiveTitle = document.getElementById("stageObjectiveTitle");
const stageObjectiveText = document.getElementById("stageObjectiveText");
const stageStarters = document.getElementById("stageStarters");
const nextStageBtn = document.getElementById("nextStageBtn");
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
const peerCommunityView = document.getElementById("peerCommunityView");
const peerSessionView = document.getElementById("peerSessionView");
const peerFeedbackView = document.getElementById("peerFeedbackView");
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
const peerSharedNotesStatus = document.getElementById("peerSharedNotesStatus");
const peerFeedbackInput = document.getElementById("peerFeedbackInput");
const peerSubmitFeedbackBtn = document.getElementById("peerSubmitFeedbackBtn");
const peerFeedbackList = document.getElementById("peerFeedbackList");

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
  state.userName = value.trim();
  localStorage.setItem(USER_NAME_KEY, state.userName);
}

function renderUserNameSummary() {
  if (selectedUserName) {
    selectedUserName.textContent = getLearnerName();
  }
}

function renderPage() {
  const map = {
    landing: pageLanding,
    choice: pageChoice,
    learn: pageLearn,
    peerPracticum: pagePeerPracticum,
    scenarioBriefing: pageScenarioBriefing,
    practice: practiceShell,
    final: pageFinal,
  };

  Object.entries(map).forEach(([key, element]) => {
    element.classList.toggle("is-hidden", key !== state.page);
  });
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
  if (page === "scenarioBriefing") {
    renderScenarioPicker();
  }
  if (page === "peerPracticum") {
    renderPeerPracticum();
  }
  renderPage();
  window.scrollTo(0, 0);
}

function renderModule() {
  const total = MODULE_SECTIONS.length;
  const index = state.moduleIndex;
  const section = MODULE_SECTIONS[index];
  const progress = Math.round(((index + 1) / total) * 100);

  moduleProgressLabel.textContent = `Module ${index + 1}/${total}`;
  moduleProgressPercent.textContent = `${progress}%`;
  moduleProgressBar.style.width = `${progress}%`;
  moduleTitle.textContent = section.title;
  moduleSummary.textContent = section.summary;
  moduleSectionCard.innerHTML = `
    <p>${section.example}</p>
    <ul>${section.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;

  modulePrevBtn.disabled = index === 0;
  moduleNextBtn.disabled = index === total - 1;
  moduleQuiz.classList.toggle("is-hidden", index !== total - 1);
  startPracticeBtn.disabled = false;
  startPracticeBtn.textContent = "Start Conversation Practice";
}

function renderBriefingPage() {
  const scenario = getScenario();

  briefScenarioTitle.textContent = scenario.title;
  briefScenarioDifficulty.textContent = `Challenge: ${scenario.difficulty}`;
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
  
  briefGoals.innerHTML = scenario.goals
    .map((goal) => `<li>${escapeHtml(goal)}</li>`)
    .join("");
  
  briefOpening.innerHTML = `<em>${escapeHtml(scenario.opening)}</em>`;
  
  scenarioPickerSection.classList.add("is-hidden");
  scenarioBriefingSection.classList.remove("is-hidden");
  pickerActions.classList.add("is-hidden");
}

function renderScenarioPicker() {
  state.nameEditorOpen = false;
  const previewCount = 6;
  const orderedScenarios = getOrderedScenarios();
  const visibleScenarios = state.scenarioPickerExpanded
    ? orderedScenarios
    : orderedScenarios.slice(0, previewCount);

  userNameInput.value = "";

  scenarioPickerGrid.innerHTML = visibleScenarios
    .map((scenario) => `
      <article class="scenario-picker-card ${scenario.id === state.selectedScenarioId ? "active" : ""}" data-scenario-id="${escapeHtml(scenario.id)}">
        <button class="picker-card-select" data-scenario-id="${escapeHtml(scenario.id)}" type="button">
          <div class="picker-card-head">
            <strong>${escapeHtml(scenario.title)}</strong>
            <span class="picker-card-badge">${escapeHtml(scenario.difficulty)}</span>
          </div>
          <p class="picker-card-text">${escapeHtml(scenario.context.substring(0, 80))}...</p>
          <p class="picker-card-role">Partner: ${escapeHtml(scenario.aiRole)}</p>
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
    `)
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
  return state.scenarios
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

function renderPeerDirectory() {
  peerUserDirectory.innerHTML = PEER_DIRECTORY.map((user) => `
    <article class="peer-user-card">
      <h4>${escapeHtml(user.name)}</h4>
      <p class="muted">${escapeHtml(user.country)} • Focus: ${escapeHtml(user.focus)}</p>
      <button type="button" data-peer-request="${escapeHtml(user.id)}">Ask to Practice</button>
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
  if (!peerCommunityView || !peerSessionView || !peerFeedbackView) {
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

  if (peerSharedNotesStatus) {
    peerSharedNotesStatus.textContent = state.peer.sharedNotes
      ? "Saved. Next: add Mutual Feedback below."
      : "Not saved yet.";
  }

  if (peerReflectionMeta) {
    peerReflectionMeta.textContent = state.peer.lastSessionSummary
      ? `Most recent conversation: ${state.peer.lastSessionSummary.peerName} • ${new Date(state.peer.lastSessionSummary.completedAt).toLocaleTimeString()}`
      : "Finish a conversation to exchange feedback and capture notes.";
  }

  if (peerReflectionSummary) {
    peerReflectionSummary.textContent = state.peer.lastSessionSummary?.summary || "No session summary yet.";
  }

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
  state.peer.feedbackNotes = [];
  state.peer.activeView = "session";
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
    completedAt: Date.now(),
  };
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
  if (!peerCommunityView || !peerSessionView || !peerFeedbackView) {
    return;
  }

  peerIdentityName.textContent = getLearnerName();
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
  state.scenarioBriefExpanded = true;
  state.scenariosExpanded = true;
  state.iletsExpanded = true;
  state.rightTab = "coach";
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

function renderFinalTab(tab) {
  const coachingActive = tab === "coaching";
  finalTabCoaching.classList.toggle("active", coachingActive);
  finalTabAnalytics.classList.toggle("active", !coachingActive);
  finalCoachingSection.classList.toggle("active", coachingActive);
  finalAnalyticsSection.classList.toggle("active", !coachingActive);
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
  stageHelp.textContent = helpText[ILETS[state.stageIndex]];
  stageProgress.textContent = `Progress: ${state.stageIndex + 1} of ${ILETS.length} stages`;
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
  const guide = scenario.practice?.[currentStage] || STAGE_GUIDE[currentStage];

  stageObjectiveTitle.textContent = currentStage;
  stageObjectiveText.textContent = guide.objective;
  stageStarters.innerHTML = guide.starters
    .map(
      (starter) =>
        `<button class="starter-chip" type="button" data-starter="${escapeHtml(starter)}">${escapeHtml(starter)}</button>`
    )
    .join("");

  nextStageBtn.disabled = state.stageIndex === ILETS.length - 1;
  nextStageBtn.textContent =
    state.stageIndex === ILETS.length - 1 ? "Final Stage Reached" : "Mark Stage Done";
}

function renderCoachNote() {
  coachNote.textContent = state.coachNote || "Type a message and I’ll give you a quick note here.";
  const items = state.coachNoteHistory?.length
    ? state.coachNoteHistory
    : [
        "Keep the opening short and purposeful.",
        "Use a question after you state the issue.",
        "Move from concern to next step quickly.",
      ];
  coachNoteList.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
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
  scenarioTitle.textContent = scenario.title;
  scenarioContext.textContent = `${scenario.context} Current stage: ${ILETS[state.stageIndex]}.`;
  roleBadge.textContent = `AI Role: ${scenario.aiRole}`;
  practiceIdentity.textContent = `Practicing as: ${getLearnerName()}`;
}

function renderBrief() {
  const scenario = getScenario();

  const tabButtons = briefTabs.querySelectorAll(".brief-tab");
  tabButtons.forEach((button) => {
    const isActive = button.getAttribute("data-tab") === state.briefTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  if (state.briefTab === "scenario") {
    scenarioBriefContent.innerHTML = `<p><strong>${escapeHtml(scenario.title)}</strong> is designed for ${escapeHtml(scenario.difficulty.toLowerCase())} conversations. AI role partner: <strong>${escapeHtml(scenario.aiRole)}</strong>.</p>`;
    return;
  }

  if (state.briefTab === "context") {
    scenarioBriefContent.innerHTML = `<p>${escapeHtml(scenario.context)}</p>`;
    return;
  }

  scenarioBriefContent.innerHTML = `<ul>${scenario.goals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}</ul>`;
}

function renderScenarioBriefVisibility() {
  scenarioBriefBody.classList.toggle("is-collapsed", !state.scenarioBriefExpanded);
  toggleScenarioBriefBtn.textContent = state.scenarioBriefExpanded ? "Hide Details" : "Show Details";
}

function openScenarioBuilderForCreate() {
  state.editingScenarioId = null;
  scenarioBuilderForm.reset();
  builderDifficulty.value = "Medium tension";
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
  return [
    "You are a roleplay partner in Social Sandbox, a difficult conversation trainer.",
    `Scenario: ${scenario.title}`,
    `Context: ${scenario.context}`,
    `You are speaking as: ${scenario.aiRole}`,
    `Learner name: ${getLearnerName()}`,
    `Current user stage is: ${ILETS[state.stageIndex]}`,
    "Rules:",
    "- Respond naturally in 2-4 sentences.",
    "- Do not prepend speaker labels like 'Senior Manager:' or names.",
    "- Keep realistic tension but avoid hostility.",
    "- Respond directly to the user’s last point, not with the same question each turn.",
    "- Vary the opening sentence so replies do not feel repetitive.",
    "- If the user is brief, acknowledge them and ask for one specific detail.",
    "- Mention the learner by name naturally at least once every 1-2 turns.",
    "- Add one coaching hint line prefixed with 'Coach Hint:' aligned with current ILETS stage.",
    "- Keep the coaching hint short and actionable.",
  ].join("\n");
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
  if (!data.reply) {
    throw new Error("Proxy response missing reply field");
  }
  return data.reply;
}

async function callOpenAI(messages) {
  if (!state.settings.apiKey) {
    throw new Error("OpenAI API key is empty. Add it in Settings.");
  }

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${state.settings.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: state.settings.model,
      input: messages.map((item) => ({
        role: item.role,
        content: [{ type: "input_text", text: item.content }],
      })),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text || "Unknown error"}`);
  }

  const data = await res.json();
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }

  const chunk = data.output
    ?.flatMap((entry) => entry.content || [])
    ?.find((part) => part.type === "output_text");
  if (chunk?.text) {
    return chunk.text;
  }
  throw new Error("No text output found in OpenAI response");
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
  const scenario = getScenario();
  const stage = ILETS[state.stageIndex];
  const lower = userText.toLowerCase();

  let note = "";

  if (/^(hi|hello|hey)$/i.test(userText.trim())) {
    note = "Great start. Open a little more directly so the other person understands why you asked for this conversation.";
  } else if (lower.includes("deadline") || lower.includes("risk") || lower.includes("late")) {
    note = "Great point. Make the intro a bit clearer so the issue feels purposeful, not abrupt.";
  } else if (lower.includes("sorry") || lower.includes("frustrat") || lower.includes("stress")) {
    note = "Good acknowledgement. Now keep it short and move toward one specific question.";
  } else if (stage === "Listen") {
    note = "Good question. Follow it with one pause, then reflect back what you heard.";
  } else if (stage === "Empathize") {
    note = "Strong empathy. Keep the concern visible so the conversation still moves forward.";
  } else if (stage === "Talk") {
    note = "Better. Add one concrete example or number so the impact is easier to trust.";
  } else if (stage === "Solve") {
    note = "Nice direction. Make the next step explicit: owner, timeline, and follow-up.";
  } else if ((replyObject?.message || "").length < 60) {
    note = "Good start. Expand the intro slightly so it feels more grounded.";
  } else {
    note = `Good direction for ${scenario.title.toLowerCase()}. Keep the message concise and avoid overexplaining.`;
  }

  state.coachNote = note;
  state.coachNoteHistory.unshift(note);
  state.coachNoteHistory = state.coachNoteHistory.slice(0, 4);
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

  if (state.settings.mode === "proxy") {
    return callProxyAPI({ model: state.settings.model, messages: conversation });
  }

  return callOpenAI(conversation);
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
    if (state.settings.mode === "proxy") {
      return await callProxyAPI({
        model: state.settings.model,
        messages: [{ role: "user", content: promptText }],
      });
    }

    if (!state.settings.apiKey) {
      return buildRuleBasedReflectionFeedback(answers, weakStages);
    }

    return await callOpenAI([{ role: "user", content: promptText }]);
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
  state.rightTab = "coach";
}

function generateFeedback() {
  const scores = getStageScoresFromMessages(state.messages);

  const total = scores.reduce((sum, item) => sum + item.score, 0);
  const max = ILETS.length * 2;
  state.latestStageScores = scores;
  state.latestSessionScorePercent = Math.round((total / max) * 100);

  const weak = scores.filter((item) => item.score === 0).map((item) => item.stage);
  const medium = scores.filter((item) => item.score === 1).map((item) => item.stage);
  const strong = scores.filter((item) => item.score === 2).map((item) => item.stage);

  const metacognitivePrompts = buildAdaptivePrompts(scores);
  state.activeReflectionPrompts = metacognitivePrompts;

  const reflectionTitles = {
    "emotion-awareness": "Emotion Awareness",
    "strategy-adjustment": "Strategy Adjustment",
    "transfer-plan": "Transfer Plan",
  };

  const html = `
    <article class="analytics-card">
      <h4>Strength</h4>
      <p class="analytics-metric">You demonstrated strength in ${strong.length ? strong.join(", ") : "conversation momentum"}.</p>
      <p class="muted">Current score: ${total}/${max}. Keep this baseline and improve one stage next round.</p>
    </article>
    <article class="analytics-card">
      <h4>Growth Area</h4>
      <ul>
        <li>${weak.length ? `Prioritize ${weak.join(", ")} with one sentence template each.` : "Increase precision by using one data point in each key response."}</li>
        <li>Reduce filler language and end with a concrete next-step request.</li>
      </ul>
    </article>
    <article class="analytics-card reflection-form-card">
      <h4>Adaptive Reflection</h4>
      <p class="muted">Answer these prompts in your own words. AI feedback will adapt to weak stages: ${escapeHtml(weak.join(", ") || "None")}</p>

      <section class="reflection-item">
        <div class="reflection-item-head">
          <strong>${reflectionTitles[metacognitivePrompts[0].id]}</strong>
          <span class="reflection-stage-tag">${escapeHtml(metacognitivePrompts[0].stage)}</span>
        </div>
        <p class="reflection-question">${escapeHtml(metacognitivePrompts[0].question)}</p>
        <textarea id="reflectionAnswer1" rows="3" placeholder="Write your reflection..."></textarea>
      </section>

      <section class="reflection-item">
        <div class="reflection-item-head">
          <strong>${reflectionTitles[metacognitivePrompts[1].id]}</strong>
          <span class="reflection-stage-tag">${escapeHtml(metacognitivePrompts[1].stage)}</span>
        </div>
        <p class="reflection-question">${escapeHtml(metacognitivePrompts[1].question)}</p>
        <textarea id="reflectionAnswer2" rows="3" placeholder="Write your reflection..."></textarea>
      </section>

      <section class="reflection-item">
        <div class="reflection-item-head">
          <strong>${reflectionTitles[metacognitivePrompts[2].id]}</strong>
          <span class="reflection-stage-tag">Transfer</span>
        </div>
        <p class="reflection-question">${escapeHtml(metacognitivePrompts[2].question)}</p>
        <textarea id="reflectionAnswer3" rows="3" placeholder="Write your reflection..."></textarea>
      </section>

      <div class="flow-actions">
        <button id="submitReflectionBtn" type="button">Get Adaptive Coach Feedback</button>
      </div>
      <div id="reflectionAiFeedback" class="reflection-feedback muted"></div>

      <h4>Reflection Trend</h4>
      <div id="reflectionTrend" class="reflection-trend">${buildReflectionTrendHtml()}</div>
    </article>
  `;

  const analytics = computeAnalytics();
  analyticsSummary.innerHTML = `
    <article class="analytics-card">
      <h4>Session Dashboard</h4>
      <p class="analytics-metric">Turns: ${analytics.totalTurns} | Avg words/turn: ${analytics.avgWords}</p>
      <p class="muted">Stage coverage: ${analytics.stageCoverage}%</p>
    </article>
    <article class="analytics-card">
      <h4>Speech Clarity</h4>
      <p class="analytics-metric">Filler words: ${analytics.fillerCount} (${analytics.fillerRate}%)</p>
      <p class="muted">Most repeated opener: ${analytics.repeatedStarter}</p>
    </article>
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

  feedbackPanel.innerHTML = html;
  finalFeedbackContent.innerHTML = html;
  finalIdentity.textContent = `${getLearnerName()}, here is your latest feedback summary.`;
  renderFinalTab("coaching");
}

async function handleSend(event) {
  event.preventDefault();
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
    const reply = await generateRoleplayReply();
    const parsed = parseAssistantOutput(reply);
    addHint(parsed.hint);
    addCoachNote(userText, parsed);
    assistantReply = personalizeReply(parsed.message);
    state.messages.push({ role: "assistant", content: assistantReply });
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
  } finally {
    setPending(false);
    render();
    speakAssistantReply(assistantReply);
    if (state.voice.mode && !window.speechSynthesis) {
      startVoiceListening();
    }
    promptInput.focus();
  }
}

function switchScenario(nextScenarioId) {
  state.selectedScenarioId = nextScenarioId;
  state.briefTab = "scenario";
  openSessionIntro();
  render();
}

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
      weakStages: [prompt.stage],
      answers: [answer],
      feedback,
      scorePercent: state.latestSessionScorePercent || 0,
      turns: getUserTurnCount(),
    });

    state.inMomentSubmitting = false;
    state.inMomentPrompt = null;
    state.coachNote = feedback;
    state.coachNoteHistory.unshift(`Reflection (${prompt.stage}): ${feedback.split("\n")[0]}`);
    state.coachNoteHistory = state.coachNoteHistory.slice(0, 4);
    render();
  });
}

finalFeedbackContent.addEventListener("click", async (event) => {
  const submitButton = event.target.closest("#submitReflectionBtn");
  if (!submitButton || state.finalReflectionSubmitting) {
    return;
  }

  const answer1 = finalFeedbackContent.querySelector("#reflectionAnswer1")?.value?.trim() || "";
  const answer2 = finalFeedbackContent.querySelector("#reflectionAnswer2")?.value?.trim() || "";
  const answer3 = finalFeedbackContent.querySelector("#reflectionAnswer3")?.value?.trim() || "";

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
    weakStages,
    answers,
    feedback,
    scorePercent: state.latestSessionScorePercent,
    turns: getUserTurnCount(),
  });

  const feedbackPanelNode = finalFeedbackContent.querySelector("#reflectionAiFeedback");
  if (feedbackPanelNode) {
    feedbackPanelNode.innerHTML = escapeHtml(feedback).replaceAll("\n", "<br />");
    feedbackPanelNode.classList.remove("muted");
  }

  const trendNode = finalFeedbackContent.querySelector("#reflectionTrend");
  if (trendNode) {
    trendNode.innerHTML = buildReflectionTrendHtml();
  }

  state.finalReflectionSubmitting = false;
  submitButton.disabled = false;
  submitButton.textContent = "Get Adaptive Coach Feedback";
});

voiceModeBtn.addEventListener("click", () => {
  toggleVoiceMode();
});

promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

finishBtn.addEventListener("click", () => {
  generateFeedback();
  state.rightTab = "feedback";
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

toggleScenarioBriefBtn.addEventListener("click", () => {
  state.scenarioBriefExpanded = !state.scenarioBriefExpanded;
  renderScenarioBriefVisibility();
});

toggleScenariosBtn.addEventListener("click", () => {
  state.scenariosExpanded = !state.scenariosExpanded;
  renderScenariosVisibility();
});

toggleTipsBtn.addEventListener("click", () => {
  state.tipsExpanded = !state.tipsExpanded;
  renderTips();
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
  state.settings.proxyUrl = proxyUrlInput.value.trim() || "http://localhost:8787/api/chat";
  state.settings.apiKey = apiKeyInput.value.trim();
  saveSettings();
  renderHeader();
});

settingsForm.addEventListener("reset", () => {
  settingsDialog.close();
});

goToChoiceBtn.addEventListener("click", () => {
  userNameInput.value = "";
  goToPage("choice");
});

chooseLearnBtn.addEventListener("click", () => {
  state.moduleIndex = 0;
  state.moduleQuizPassed = false;
  quizResultText.textContent = "";
  document.querySelectorAll("input[name='q1'], input[name='q2'], input[name='q3']").forEach((input) => {
    input.checked = false;
  });
  goToPage("learn");
});

choosePracticeBtn.addEventListener("click", () => {
  goToPage("scenarioBriefing");
});

if (choosePeerBtn) {
  choosePeerBtn.addEventListener("click", () => {
    if (!getLearnerName() || getLearnerName() === "Learner") {
      saveUserName(userNameInput.value || state.userName);
    }
    goToPage("peerPracticum");
  });
}

learnBackBtn.addEventListener("click", () => {
  goToPage("choice");
});

startPracticeBtn.addEventListener("click", () => {
  const enteredName = userNameInput.value.trim();
  if (!enteredName) {
    window.alert("Please enter your name before choosing a scenario.");
    userNameInput.focus();
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

createScenarioBriefingBtn.addEventListener("click", () => {
  openScenarioBuilderForCreate();
});

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

  const selectButton = event.target.closest(".picker-card-select");
  if (!selectButton) {
    return;
  }
  const scenarioId = selectButton.getAttribute("data-scenario-id");
  if (scenarioId) {
    saveUserName(userNameInput.value);
    state.selectedScenarioId = scenarioId;
    renderBriefingPage();
  }
});

toggleScenarioPickerListBtn.addEventListener("click", () => {
  state.scenarioPickerExpanded = !state.scenarioPickerExpanded;
  renderScenarioPicker();
});

modulePrevBtn.addEventListener("click", () => {
  if (state.moduleIndex > 0) {
    state.moduleIndex -= 1;
    renderModule();
  }
});

moduleNextBtn.addEventListener("click", () => {
  if (state.moduleIndex < MODULE_SECTIONS.length - 1) {
    state.moduleIndex += 1;
    renderModule();
  }
});

submitQuizBtn.addEventListener("click", () => {
  const q1 = document.querySelector("input[name='q1']:checked")?.value;
  const q2 = document.querySelector("input[name='q2']:checked")?.value;
  const q3 = document.querySelector("input[name='q3']:checked")?.value;

  if (!q1 || !q2 || !q3) {
    quizResultText.textContent = "Please answer all questions before submitting.";
    return;
  }

  const score = Number(q1 === "b") + Number(q2 === "c") + Number(q3 === "b");
  state.moduleQuizPassed = score >= 2;
  const misses = [];
  if (q1 !== "b") misses.push("start with shared purpose");
  if (q2 !== "c") misses.push("listen before pushing your point");
  if (q3 !== "b") misses.push("close with one action, one owner, and a follow-up");

  quizResultText.textContent = state.moduleQuizPassed
    ? `Great. You scored ${score}/3. Your choices show the right sequence: purpose, curiosity, then commitment.`
    : `You scored ${score}/3. Revisit ${misses.join(", ")} so your next response feels more grounded.`;

  renderModule();
  if (state.moduleQuizPassed) {
    startPracticeBtn.focus();
    startPracticeBtn.textContent = "Start Conversation Practice";
  }
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
    if (peerSharedNotesStatus) {
      peerSharedNotesStatus.textContent = "Unsaved changes.";
    }
  });

  peerSharedNotes.addEventListener("change", () => {
    state.peer.sharedNotes = peerSharedNotes.value.trim();
    if (peerSharedNotesStatus) {
      peerSharedNotesStatus.textContent = state.peer.sharedNotes
        ? "Saved. Next: add Mutual Feedback below."
        : "Not saved yet.";
    }
  });
}

if (peerSaveSharedNotesBtn) {
  peerSaveSharedNotesBtn.addEventListener("click", () => {
    state.peer.sharedNotes = peerSharedNotes?.value.trim() || "";
    if (peerSharedNotesStatus) {
      peerSharedNotesStatus.textContent = state.peer.sharedNotes
        ? "Saved. Next: add Mutual Feedback below."
        : "Not saved yet.";
    }
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
    if (!state.peer.activeSession) {
      return;
    }
    const text = peerFeedbackInput.value.trim();
    if (!text) {
      return;
    }
    state.peer.feedbackNotes.push({
      id: `feedback-${Date.now()}`,
      author: getLearnerName(),
      text,
      timestamp: Date.now(),
    });
    state.peer.feedbackNotes = state.peer.feedbackNotes.slice(-20);
    peerFeedbackInput.value = "";
    renderPeerSession();
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

if (peerTabCommunity || peerTabSession || peerTabReflection) {
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

window.addEventListener("storage", (event) => {
  if (event.key !== PEER_REQUESTS_KEY) {
    return;
  }
  state.peer.requests = loadPeerRequests();
  renderPeerRequests();
});

finalTabCoaching.addEventListener("click", () => {
  renderFinalTab("coaching");
});

finalTabAnalytics.addEventListener("click", () => {
  renderFinalTab("analytics");
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
      goals,
      custom: true,
      createdAt: Date.now(),
      practice: buildCustomPractice(goals, aiRole),
    };
    state.scenarios.push(customScenario);
  }

  persistScenarioState();
  state.selectedScenarioId = scenarioId;
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

openSessionIntro();
userNameInput.value = state.userName;
render();
renderModule();
renderPage();
renderVoiceUi();
