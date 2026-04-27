# Render Deployment Setup Guide for Social Sandbox

## Enable AI Module Generation with Render Environment Variables

If you're running Social Sandbox on Render, you can automatically inject your OpenAI API key so users don't have to manually enter it in Settings.

### Step-by-Step Setup

#### 1. Configure Environment Variables in Render Dashboard

Go to your Render service settings and add these environment variables:

| Variable | Value | Type | Notes |
|----------|-------|------|-------|
| `SANDBOX_API_KEY` | `sk-...` (your OpenAI key) | Secret | Keep this private! |
| `SANDBOX_MODE` | `openai` | String | Use OpenAI API directly |
| `SANDBOX_MODEL` | `gpt-4` | String | Model to use for AI generation |

**To add them:**
1. Open your Render service dashboard
2. Go to **Settings** → **Environment**
3. Click **Add Environment Variable** for each
4. For `SANDBOX_API_KEY`, set it as a **Secret** (not exposed in logs)

#### 2. Inject Variables into Frontend

Once you set the environment variables in Render, the frontend loads them automatically.

**How it works:**
- `index.html` (line 14) initializes `window.SANDBOX_*` variables
- `app.js` checks `window.SANDBOX_API_KEY` before checking localStorage
- On app startup, `state.settings.apiKey` gets the value from Render environment

**Code flow:**
```javascript
// In app.js initialization:
apiKey: localStorage.getItem("sandbox.apiKey") || (window.SANDBOX_API_KEY || ""),
```

This means:
1. **First priority**: localStorage (user's manual entry in Settings)
2. **Second priority**: `window.SANDBOX_API_KEY` (from Render environment)
3. **Fallback**: Empty string (use local fallback generator)

#### 3. Verify It's Working

After deploying to Render:

1. **Open the app** at your Render URL
2. **Select a learning goal** on the Goals page
3. **Click Continue**
4. **Check the browser console** for:
   - `✓ AI generated tailored modules for: [Goal]` (API key working!)
   - Or: `✓ Using local fallback for: [Goal]` (no API key or API failed)

#### 4. Validate in Settings (Optional)

To verify the API key was loaded:
1. Click **Settings** (gear icon)
2. Check the **OpenAI API Key** field
3. It should show `sk-...` (masked) if loaded from Render

## Security Best Practices

✅ **DO:**
- Use Render's **Secret** variables for `SANDBOX_API_KEY`
- Never commit `.env` files with API keys to GitHub
- Rotate API keys periodically
- Monitor OpenAI API usage in your account

❌ **DON'T:**
- Put API keys in public environment variables
- Expose keys in client-side code comments or logs
- Share keys in GitHub issues or pull requests
- Use the same API key across multiple services

## How AI Module Generation Works

When a user selects a goal and clicks Continue:

```
┌─────────────────────────────────────────┐
│ getTailoredLearningPath(goal)            │
└─────────────────────────────────────────┘
              ↓
    Check for API key
         ↙            ↘
    YES ✓          NO or EMPTY
        ↓                ↓
  Call OpenAI      Use Fallback
  (strict prompt)  Generator
        ↓                ↓
  Validate JSON    Build Local
  & goal mention   Modules
        ↓                ↓
    Persist to localStorage
        ↓
  Display 6 Goal-Specific Modules
```

## Troubleshooting

### Issue: "Using local fallback" even though I set API key

**Cause**: API key not loaded from Render environment

**Fix**:
1. Verify the environment variable is set in Render Dashboard
2. Rebuild the service (force redeploy)
3. Check browser console for `window.SANDBOX_API_KEY`
4. Manually enter API key in Settings as a temporary workaround

### Issue: "AI returned invalid tailored path"

**Cause**: OpenAI returned malformed JSON or generic content

**Fix**:
1. Check OpenAI API status at https://status.openai.com/
2. Verify API key is valid and has credits
3. Check API usage quotas in your OpenAI account
4. App will automatically fall back to local generator (still works!)

### Issue: "OpenAI error 401"

**Cause**: Invalid or expired API key

**Fix**:
1. Generate a new API key at https://platform.openai.com/api-keys
2. Update Render environment variable
3. Rebuild the service

## Files Modified for Environment Variable Support

- `index.html`: Added environment variable initialization script (line 14-20)
- `app.js`: Updated settings initialization to check window variables (line ~950)
- `TAILORED_MODULES_AI.md`: Architecture documentation
- `test-tailored-modules.js`: Unit tests for validation

---

**Last updated**: April 27, 2026  
**Commit**: c6bc51d  
**Branch**: gh-pages
