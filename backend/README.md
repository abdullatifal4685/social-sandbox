# Social Sandbox API Proxy Backend

This is a secure backend proxy for OpenAI API calls used by the Social Sandbox frontend.

## Why This?

Instead of storing your OpenAI API key in the frontend (which is exposed to users), this backend:
- ✅ Keeps your API key secret on the server
- ✅ Proxies all OpenAI requests securely
- ✅ Runs 24/7 on a free Render service
- ✅ No need to enter API key in the app each time

## Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

4. **Test it:**
   ```bash
   curl http://localhost:3000/health
   # Should return: {"status":"ok","message":"API proxy is running"}
   ```

## Deploy to Render (Free)

### Step 1: Push to GitHub
```bash
git add backend/
git commit -m "Add backend API proxy"
git push origin gh-pages
```

### Step 2: Deploy to Render
1. Go to https://render.com (sign up with GitHub)
2. Click **New +** → **Web Service**
3. Connect your GitHub repo (`social-sandbox`)
4. Fill in:
   - **Name:** `social-sandbox-api-proxy`
   - **Runtime:** `Node`
   - **Build command:** `cd backend && npm install`
   - **Start command:** `cd backend && npm start`
5. Click **Advanced** and add Environment Variable:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** (paste your OpenAI API key)
6. Click **Deploy**

### Step 3: Copy the Render URL
After deployment, you'll get a URL like:
```
https://social-sandbox-api-proxy.onrender.com
```

### Step 4: Update Frontend
In your Social Sandbox app:
1. Go to **Settings**
2. Change **Mode** to **Proxy API**
3. Set **Proxy URL** to: `https://social-sandbox-api-proxy.onrender.com/api/chat`
4. Leave **API Key** blank
5. Click **Save**

Done! ✅ Your frontend now uses the secure backend.

## API Endpoints

### Health Check
```
GET /health
```
Returns: `{"status":"ok","message":"API proxy is running"}`

### OpenAI Chat
```
POST /api/chat
Content-Type: application/json

{
  "messages": [{"role":"user","content":"Hello"}],
  "model": "gpt-4"
}
```

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (optional, defaults to 3000)

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file (it's in `.gitignore`)
- Only `.env.example` should be in version control
- On Render, API key is stored securely as environment variable
- Backend validates all requests before forwarding to OpenAI

## Troubleshooting

**"OPENAI_API_KEY not set"**
- Make sure you set the environment variable on Render
- Check Render dashboard → Environment

**"API proxy not responding"**
- Check Render logs
- Make sure the Render service is running (not sleeping)
- Free tier may sleep after 15 min inactivity - first request wakes it up

**"401 Unauthorized from OpenAI"**
- Check that your API key is correct
- API key might be expired or deleted

## Support
For issues, check the main Social Sandbox README or contact your development team.
