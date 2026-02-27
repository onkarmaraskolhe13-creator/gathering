# 🚀 How to Run Gathering Project

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) Python 3.8+ for backend server
- (Optional) pip for installing Python packages

---

## ⚡ Method 1: Run Frontend Only (Easiest - No Installation)

### Step 1: Navigate to Project Folder
```bash
cd "o:\project of parag uikey 33\communicaion with python"
```

### Step 2: Open in Browser
**Option A - Double Click:**
- Find `index.html` in the folder
- Double click to open in your default browser

**Option B - Right Click:**
- Right click `index.html`
- Select "Open with" → Choose your browser

**Option C - Command Line:**
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Step 3: Use the App
1. The app will load in your browser
2. Click **"Sign Up"** to create a new account
3. Enter name, email, and password
4. Click **"Sign Up"** button
5. Start creating posts, liking, and commenting!

#### Notes:
- Data is stored in your browser (localStorage)
- Data persists across browser sessions
- Clearing browser cache will delete all data
- Works offline once loaded

---

## 🐍 Method 2: Run with Python Backend (Advanced)

### Step 1: Open Terminal in Project Folder
```bash
# Navigate to project directory
cd "o:\project of parag uikey 33\communicaion with python"
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

Expected output:
```
Successfully installed Flask-2.3.0 Flask-CORS-4.0.0 Werkzeug-2.3.0
```

### Step 3: Start the Backend Server
```bash
python app.py
```

Expected output:
```
Starting SocialHub API...
API will run on http://localhost:5000
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to stop the server
```

### Step 4: Open Frontend in Browser
In another terminal/browser:
```bash
# Windows
start index.html

# Or manually open: http://localhost:5000
```

### Step 5: Use the App
Same as Method 1 - Sign up and start using!

#### Benefits:
- Data stored in server (persistent)
- Better security with password hashing
- API-based architecture
- Easier to scale
- Data stored in `data.json` file

---

## 🌐 Method 3: Local Server (Best for Testing)

### Step 1: Use Python's Built-in Server
```bash
cd "o:\project of parag uikey 33\communicaion with python"

# Python 3.x
python -m http.server 8000

# Or Python 2.x
python -m SimpleHTTPServer 8000
```

Expected output:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

### Step 2: Open in Browser
- Go to: `http://localhost:8000`
- Click on `index.html`

### Step 3: Use the App
Sign up and create posts as normal!

---

## 🔧 Troubleshooting

### Issue: Browser shows blank page

**Solution:**
- Refresh page (Ctrl+R or Cmd+R)
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check browser console for errors (F12)

### Issue: "Port 5000 already in use"

**Solution:**
- Change port in `app.py` (line ~85):
  ```python
  app.run(debug=True, port=8000)  # Use 8000 instead
  ```
- Or stop the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Issue: Python not found

**Solution:**
```bash
# Check Python installation
python --version

# If not found, install from python.org
# Then restart terminal and try again
```

### Issue: Module not found error

**Solution:**
```bash
# Make sure you installed dependencies
pip install -r requirements.txt

# Or install each package manually
pip install Flask==2.3.0
pip install Flask-CORS==4.0.0
pip install Werkzeug==2.3.0
```

### Issue: Data not saving

**Frontend only:**
- Check browser allows localStorage
- Try incognito/private mode

**With backend:**
- Check `data.json` exists in project folder
- Check terminal shows no errors
- Try restarting backend server

---

## 📝 File Descriptions

### Core Files
| File | Purpose | Run?
|------|---------|------|
| `index.html` | Main app interface | Open in browser |
| `style.css` | Styling and layout | (Auto-loaded) |
| `script.js` | Interactive features | (Auto-loaded) |

### Backend Files
| File | Purpose | Run?
|------|---------|------|
| `app.py` | Python REST API server | `python app.py` |
| `requirements.txt` | Python dependencies | `pip install -r requirements.txt` |

### Documentation
| File | Purpose |
|------|---------|
| `README.md` | Full documentation |
| `QUICK_START.md` | 2-minute quick start |
| `BACKEND_SETUP.md` | Backend configuration |
| `RUN_PROJECT.md` | This file |

---

## 🎯 Quick Reference

### Just Want to Use the App?
```bash
# Step 1: Navigate to folder
cd "o:\project of parag uikey 33\communicaion with python"

# Step 2: Open index.html in browser (double-click or drag to browser)
# That's it! 🎉
```

### Want Backend + Database?
```bash
# Step 1: Install Python packages
pip install -r requirements.txt

# Step 2: Start server
python app.py

# Step 3: Open index.html in browser
# Go to http://localhost:5000 (or just open index.html)
```

### Want Local Web Server?
```bash
# Step 1: Start Python server
python -m http.server 8000

# Step 2: Open http://localhost:8000 in browser
```

---

## 🎮 Test Data

### Quick Test Without Signup
Uncomment the last line in `script.js`:
```javascript
// addSampleData();  // <- Uncomment this
```

Then refresh the page. Use test account:
- Email: `john@example.com`
- Password: `password123`

---

## ✅ Verification Checklist

- [ ] Browser is modern (Chrome, Firefox, Safari, Edge)
- [ ] All files are in the project folder
- [ ] `index.html` can be opened
- [ ] Can sign up for an account
- [ ] Can create a post
- [ ] Can like/comment on posts
- [ ] Can edit profile
- [ ] Data is saved after refresh

---

## 🆘 Need More Help?

1. **Default browser issues?**
   - Try different browser (Chrome preferred)
   - Check if JavaScript is enabled (usually is by default)

2. **Backend issues?**
   - Read `BACKEND_SETUP.md` for detailed setup
   - Check `data.json` exists and has content
   - Run `pip list` to verify packages installed

3. **Data issues?**
   - Check browser console (F12 → Console tab)
   - Look for any red error messages
   - Try clearing cache and reloading

4. **Still stuck?**
   - Read `README.md` for detailed documentation
   - Check code comments in `script.js`
   - Try Method 1 (frontend only) first

---

## 📞 Summary

| Goal | Command |
|------|---------|
| Run frontend only | Open `index.html` in browser |
| Run with backend | `pip install -r requirements.txt` → `python app.py` |
| Run with server | `python -m http.server 8000` → Open http://localhost:8000 |
| Stop backend | Press `CTRL+C` in terminal |
| Stop server | Press `CTRL+C` in terminal |

---

**You're all set!** Pick your preferred method above and start using SocialHub! 🚀
