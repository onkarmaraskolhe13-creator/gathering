# Gathering Backend Setup Guide

This folder contains an optional Python Flask backend for the Gathering social media application.

## Overview

The frontend (HTML/CSS/JavaScript) works standalone with local browser storage. However, you can optionally use this Flask backend for:
- Persistent data storage (JSON file database)
- Better user authentication
- API-based architecture
- Easier scaling and deployment
- Better security with password hashing

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation & Setup

### Step 1: Install Dependencies

Open a terminal/command prompt in this folder and run:
```bash
pip install -r requirements.txt
```

### Step 2: Run the Backend Server

```bash
python app.py
```

You should see output like:
```
Starting SocialHub API...
API will run on http://localhost:5000
 * Running on http://127.0.0.1:5000
```

### Step 3: Open the Frontend

Open `index.html` in your browser. The app will still work with the current frontend, but you can modify it to use the API endpoints.

## API Endpoints

### Authentication

**Sign Up**
```http
POST /api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login**
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Posts

**Get All Posts**
```http
GET /api/posts
```

**Create Post**
```http
POST /api/posts
Content-Type: application/json

{
  "authorId": 123,
  "authorName": "John Doe",
  "authorAvatar": "https://example.com/avatar.jpg",
  "content": "This is my post",
  "image": null,
  "link": null
}
```

**Delete Post**
```http
DELETE /api/posts/123
```

**Like/Unlike Post**
```http
POST /api/posts/123/like
Content-Type: application/json

{
  "userId": 456
}
```

### Comments

**Add Comment**
```http
POST /api/posts/123/comments
Content-Type: application/json

{
  "authorId": 456,
  "authorName": "Jane Smith",
  "authorAvatar": "https://example.com/avatar.jpg",
  "text": "Great post!"
}
```

**Delete Comment**
```http
DELETE /api/posts/123/comments/789
```

### Users

**Get User Profile**
```http
GET /api/users/123
```

**Update User Profile**
```http
PUT /api/users/123
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Developer and designer"
}
```

### Stats

**Get App Statistics**
```http
GET /api/stats
```

### Health Check

**Check API Status**
```http
GET /api/health
```

## Data Storage

The backend stores data in a `data.json` file. This file is automatically created when you first run the server.

```json
{
  "users": [...]
  "posts": [...]
}
```

## Integrating with Frontend

To use the backend with the frontend, you would need to modify `script.js` to make API calls instead of using localStorage. Here's an example:

```javascript
// Instead of localStorage, use API calls:

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            currentUser = data;
            // Show feed...
        }
    });
}
```

## Troubleshooting

### Port 5000 Already in Use

If you get an error that port 5000 is already in use, you can change it in `app.py`:

```python
if __name__ == '__main__':
    app.run(debug=True, port=8000)  # Use 8000 instead
```

### CORS Errors

If you see CORS errors when connecting from the frontend, make sure Flask-CORS is installed:

```bash
pip install Flask-CORS
```

### Password Issues on Windows

If you have issues with the `werkzeug` package on Windows, try:

```bash
pip install --upgrade Werkzeug
```

## Development Tips

### Debug Mode

The server runs in debug mode by default:
- Changes to `app.py` will automatically reload the server
- Detailed error messages are shown
- You can use the Python debugger

### Testing API Endpoints

You can test the API using tools like:
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- `curl` command line tool
- Python `requests` library

Example with curl:
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Deployment

To deploy this backend to production:

1. **Use a production WSGI server** (not Flask's built-in server):
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```

2. **Set Flask to production mode**:
   ```bash
   export FLASK_ENV=production
   python app.py
   ```

3. **Use a reverse proxy** (Nginx, Apache) in front of Flask

4. **Deploy to a platform**:
   - Heroku: `git push heroku main`
   - AWS, Azure, DigitalOcean, etc.
   - Docker: Create a Dockerfile

## Future Enhancements

- [ ] Add database (SQLite, PostgreSQL, MongoDB)
- [ ] User authentication with JWT tokens
- [ ] User follow/unfollow functionality
- [ ] Search posts and users
- [ ] Notification system
- [ ] Image upload to cloud storage
- [ ] User roles and permissions
- [ ] Rate limiting and security
- [ ] Caching with Redis
- [ ] Real-time updates with WebSockets

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Flask-CORS Documentation](https://flask-cors.readthedocs.io/)
- [Python Requests Library](https://requests.readthedocs.io/)
- [REST API Best Practices](https://restfulapi.net/)

## Support

For issues with the backend:
1. Check the terminal output for error messages
2. Verify all dependencies are installed with `pip list`
3. Make sure port 5000 is available
4. Check that Python 3.8+ is installed with `python --version`

Happy coding! 🚀
