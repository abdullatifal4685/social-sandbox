# Social Sandbox | Difficult Conversation Trainer

This frontend is an interactive training app based on your framework:
- AI-mediated scaffolding
- ILETS conversation stages (Introduce, Listen, Empathize, Talk, Solve)
- Formative feedback and reflection
- Transition pathway to peer practicum

## 1) Start here

1. Open this folder only: `Social Sandbox`
2. Run a local static server
3. Open the app in browser

### Option A: VS Code Live Server
- Install extension: Live Server
- Right click `index.html`
- Click Open with Live Server

### Option B: Python server
```bash
cd "Social Sandbox"
python -m http.server 5500
```
Open: http://localhost:5500

## 2) What is built

- Scenario-based roleplay for difficult workplace conversations
- 3 built-in scenarios from your problem context:
  - Failing project escalation to senior manager
  - Challenging unsafe shortcut under time pressure
  - Upward feedback to senior peer
- ILETS stage tracker with dynamic progression
- AI roleplay responses with stage-aware coaching hints
- Formative feedback panel:
  - Gap analysis by stage
  - Actionable next steps
  - Metacognitive reflection prompts
- Settings modal + model switcher

## 3) Connect GPT

### Recommended: Proxy mode
Keep API key on backend. Frontend calls your backend endpoint.

Current expected endpoint:
- `POST http://localhost:8787/api/chat`

Expected request body:
```json
{
  "model": "gpt-4.1-mini",
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

Expected response body:
```json
{
  "reply": "Hello! How can I help?"
}
```

### Testing only: Direct OpenAI mode
- Open Settings in app
- Choose Direct OpenAI
- Paste API key
- Never use this mode in production

## 4) Usage flow

1. Select a scenario from the left panel
2. Respond in chat using current ILETS stage
3. Continue until all stages are practiced
4. Click `Finish + Feedback` to generate formative review
5. Repeat scenario, then transition to peer practicum

## 5) Suggested next steps

1. Save session history to local storage or database
2. Add rubric export (PDF/CSV) for instructor review
3. Add peer practicum room with timed turns and observer rubric
4. Add backend auth and tenant-level privacy rules
