# Gathering - Social Media Platform

A responsive, modern social media web application built with HTML, CSS, and JavaScript.

## Features

✨ **Core Features:**
- **User Authentication** - Sign up and login functionality
- **Create Posts** - Share text, images, and links
- **Like & Comment** - Interact with posts from other users
- **User Profiles** - View and edit your profile information
- **Feed** - See all posts from all users
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### Installation

1. Extract the files to a folder
2. Open `index.html` in your web browser
3. Start using the app!

## How to Use

### Sign Up
1. Click the **"Sign Up"** tab on the auth modal
2. Enter your name, email, and password
3. Click **"Sign Up"** button
4. You'll be automatically logged in

### Login
1. Click the **"Login"** tab (default)
2. Enter your email and password
3. Click **"Login"** button

### Create a Post
1. Go to the **Feed** section
2. Click in the "What's on your mind?" text box
3. Type your post content
4. (Optional) Add a photo by clicking the 📷 button
5. (Optional) Add a link by clicking the 🔗 button
6. Click **"Publish"** button

### Interact with Posts
- **Like** - Click the ❤️ button to like a post
- **Comment** - Click the 💬 button to view and add comments
- **Share** - Click the 🔄 button (opens share confirmation)
- **Delete** - If it's your own post, click the 🗑️ button to delete it

### View Your Profile
1. Click **"Profile"** in the navigation bar
2. View your profile information and all your posts
3. Click **"Edit Profile"** to update your name and bio

### Logout
- Click **"Logout"** in the navigation bar to log out

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # All styling
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## Key Files Explanation

### index.html
- Contains the complete HTML structure
- Navigation bar with menu links
- Feed section with create post area
- Profile section with user information
- Modals for authentication, comments, profile editing, etc.

### style.css
- Complete responsive design
- Modern color scheme with primary blue (#1DA1F2)
- Mobile-first approach with breakpoints for tablets and phones
- Smooth animations and transitions
- Grid layout for posts and profiles

### script.js
- Authentication (sign up, login, logout)
- Post management (create, like, comment, delete)
- Profile management (view, edit)
- Local storage for data persistence
- Form validation and error handling

## Data Storage

All data is stored locally in your browser using **localStorage**. This means:
- Data persists even after closing the browser
- No server or cloud required
- Data is specific to your browser/device
- Clearing browser cache will clear all data

## Sample Data

To add sample posts and users for testing, uncomment the last line in `script.js`:
```javascript
// addSampleData(); // Uncomment this line
```

Then refresh the page and log in with:
- Email: `john@example.com`
- Password: `password123`

Or sign up as a new user!

## Customization

### Change Color Scheme
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #1DA1F2;      /* Main blue */
    --secondary-color: #14171A;    /* Dark color */
    --bg-light: #FFFFFF;           /* Light background */
    /* ... other colors ... */
}
```

### Change App Name
Replace "SocialHub" in `index.html` and `style.css` with your desired name.

### Add New Features
- Edit `script.js` to add new functionality
- Update `index.html` for new HTML elements
- Add styles to `style.css` for new components

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Keep images small** - Large images will slow down the app
2. **Clear old data** - If the app gets slow, clear browser cache
3. **Use modern browser** - Newer browsers have better performance

## Known Limitations

- No backend server (data stored locally only)
- Images uploaded are converted to base64 (suitable for small images)
- No real-time notifications
- No database persistence across devices

## Future Enhancement Ideas

1. Backend API integration (Node.js/Python Flask)
2. Cloud storage for images (Firebase, AWS S3)
3. Real-time notifications
4. Direct messaging between users
5. Follow/Unfollow functionality
6. Search posts and users
7. Hashtags and trending topics
8. User suggestions/recommendations
9. Dark mode theme
10. Mobile app version

## Troubleshooting

### Can't log in?
- Make sure you signed up first
- Check email and password are correct
- Try signing up with a new account

### Posts not showing up?
- Refresh the page
- Check browser console for errors (F12 key)
- Clear browser cache and try again

### Images not uploading?
- Try smaller image files
- Use JPG or PNG format
- Check browser console for errors

### Data disappeared?
- This happens when browser cache is cleared
- The app relies on localStorage
- Consider backing up your posts regularly

## License

This is a free social media template. Feel free to use, modify, and distribute!

## Support

For issues or questions, check the code comments in the files for detailed explanations of how each feature works.

---

**Happy sharing!** 🎉
