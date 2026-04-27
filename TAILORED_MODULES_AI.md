# AI-Powered Tailored Learning Modules

## How It Works

When a user selects a **single learning goal** and clicks **Continue**, the app generates a personalized 6-module learning path:

### Flow Diagram
```
User selects 1 goal (preset or custom)
        ↓
   Clicks "Continue"
        ↓
getTailoredLearningPath(goalDescription) is called
        ↓
    ┌───────────────────────────────────────────┐
    │ Do we have an OpenAI API key?             │
    └───────────────────────────────────────────┘
         YES ↓                           ↓ NO
         │                          Use Local
    Call OpenAI API             Fallback Generator
    with strict prompt          (6 deterministic
         ↓                       tailored modules)
    Validate JSON                      ↓
    & check goal mention              Persist
         ↓                          to localStorage
    Valid? ───NO──→ Log warning
         │         Fall back
        YES
         ↓
    Persist to localStorage
         ↓
    Navigate to Learning Path Page
         ↓
   Display 6 goal-specific modules
```

## AI Module Generation (When API Key Present)

### System Prompt
The AI receives a **strict system prompt** with:
- **Required structure**: Exactly 6 modules, each with `id`, `title`, `summary`, `points`, `example`, `tailoredTo`
- **Explicit examples**: Sample JSON showing the expected format
- **Rejection rules**: Clear don'ts (generic titles, un-tailored content, wrong count, etc.)
- **Goal-mention mandate**: Every field must reference the learning goal

### Validation
After AI response:
1. **Parse JSON**: Clean markdown code fences if present
2. **Check count**: Must be exactly 6 modules
3. **Check goal mention**: Each module's `title + summary + points + example` must mention the goal (case-insensitive)
4. **Persist**: Save to `localStorage.sandbox.customTailoredModules`

### Example: For Goal "Improve Listening & Empathy"

**Expected module 1:**
```json
{
  "id": "module-1",
  "title": "Module 1: Prepare for Listening & Empathy - Self-Awareness & Planning",
  "summary": "Understand how your default patterns affect your ability to listen and show empathy",
  "points": [
    "Recognize how you typically listen when you need to show empathy",
    "Identify emotions that make empathy harder for you",
    "Plan how you'll slow down to truly listen before reacting"
  ],
  "example": "In a meeting, someone shares a struggle. Instead of jumping to advice, pause and listen to understand what they really need. That's listening & empathy in action.",
  "tailoredTo": "Improve Listening & Empathy"
}
```

**Key observation**: Goal is mentioned in title, summary, all 3 points, example, and `tailoredTo` field.

## Fallback: Local Generator

If no API key or AI fails, `buildLocalTailoredLearningPath(goalDescription)` generates 6 modules by:
1. Taking base module templates (from `MODULE_SECTIONS`)
2. Injecting the goal into title, summary, points, and example
3. Returning exactly 6 modules, all tailored

Example fallback output for "Handle Pressure & Conflict":
```json
[
  {
    "id": "module-1",
    "title": "1. Notice What Makes the Conversation Hard — Focus: Handle Pressure & Conflict",
    "summary": "A difficult conversation usually feels hard because the stakes, emotions, and relationships are all active at once. This module is tailored to: Handle Pressure & Conflict.",
    "points": [
      "Pause and identify what is making this conversation difficult. (applies to: Handle Pressure & Conflict)",
      "Set one intention: solve the issue while preserving respect. (applies to: Handle Pressure & Conflict)",
      "Prepare one opening sentence and one open question. (applies to: Handle Pressure & Conflict)"
    ],
    "example": "Example: Instead of 'This is a mess', try 'I want us to address two delays before they affect delivery.' Example tied to goal: Handle Pressure & Conflict.",
    "tailoredTo": "Handle Pressure & Conflict"
  },
  ... 5 more modules ...
]
```

## Setup Instructions

### To Enable AI Module Generation:

1. **Open the app** → Click "Settings" (gear icon in practice area)
2. **Ensure mode is "OpenAI API"** (default)
3. **Paste your OpenAI API key** in the "OpenAI API Key" field
   - Get key from: https://platform.openai.com/api-keys
   - Starts with: `sk-...`
4. **Click "Save"**
5. **Select a learning goal** → **Click "Continue"**
   - App checks for API key
   - Calls OpenAI → generates 6 tailored modules
   - Falls back to local if API fails
6. **View personalized learning modules**

### Expected Log Output (when AI succeeds):
```
✓ AI generated tailored modules for: Improve Listening & Empathy
```

### Expected Log Output (when falling back):
```
⚠ AI returned invalid tailored path, using local fallback.
✓ Using local fallback for: Improve Listening & Empathy
```

## Code Architecture

### Key Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `getTailoredLearningPath(goalDescription)` | Main entry point; AI-first with fallback | Array of 6 modules |
| `callOpenAI([systemPrompt, userPrompt], model)` | Calls OpenAI API | String response |
| `validateTailoredPath(modules, goalDescription)` | Checks 6 modules + goal mention | Boolean |
| `buildLocalTailoredLearningPath(goalDescription)` | Deterministic fallback | Array of 6 modules |

### Storage
- **Key**: `sandbox.customTailoredModules`
- **Value**: JSON array of 6 tailored module objects
- **Scope**: localStorage (persists across sessions)
- **Used by**: `getLearningModules()` when displaying Learn page

### Integration Points
1. **Goals page** → Goals Continue button → calls `getTailoredLearningPath()`
2. **Learn page** → `getLearningModules()` retrieves from `state.customTailoredModules`
3. **Module rendering** → Shows tailored badge if custom modules present

## Testing

### Unit Tests
Run: `node test-tailored-modules.js`

Tests validate:
- ✅ Valid 6-module path passes validation
- ✅ Wrong count (5 modules) fails
- ✅ Missing goal reference fails
- ✅ Local fallback generates 6 modules
- ✅ Goal matching is case-insensitive

### Manual Test
1. Select a goal (e.g., "Improve Listening & Empathy")
2. Open browser DevTools → Console
3. Click Continue
4. Look for log: `✓ AI generated tailored modules for: Improve Listening & Empathy`
5. Or: `✓ Using local fallback for: Improve Listening & Empathy` (if no API key)
6. Check localStorage: `localStorage.getItem("sandbox.customTailoredModules")`

## Quality Guarantees

✅ **Goal-specific**: Every module explicitly references the learner's selected goal  
✅ **AI-first**: Uses OpenAI when API key available  
✅ **Fallback-safe**: Always generates 6 modules, never shows nothing  
✅ **Validated**: Checks JSON schema + goal mention before persisting  
✅ **Offline-capable**: Fallback works without internet/API key  
✅ **Deterministic fallback**: Same goal → same tailored output every time  

---

**Last updated**: April 27, 2026  
**Commit**: 5e19907  
**Branch**: gh-pages
