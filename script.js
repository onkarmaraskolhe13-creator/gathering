// Global Variables
let currentUser = null;
let users = [];
let posts = [];
let currentPostId = null;

// Initialize App
document.addEventListener('DOMContentLoaded', function () {
    loadData();

    // Handle image upload
    document.getElementById('image-input').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                document.getElementById('post-text').value = `[Image: ${file.name}]`;
                document.getElementById('post-text').dataset.image = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle Enter key in post input
    document.getElementById('post-text').addEventListener('keypress', function (e) {
        if (e.ctrlKey && e.key === 'Enter') {
            createPost();
        }
    });

    // Check if user is logged in
    if (currentUser) {
        document.getElementById('auth-modal').style.display = 'none';
        showFeed();
    } else {
        document.getElementById('auth-modal').classList.add('active');
    }
});

// Authentication Functions
function switchAuth(type) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));

    // Show selected form
    if (type === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.querySelectorAll('.auth-tab')[0].classList.add('active');
    } else {
        document.getElementById('signup-form').classList.add('active');
        document.querySelectorAll('.auth-tab')[1].classList.add('active');
    }
}

function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        saveData();
        document.getElementById('auth-modal').style.display = 'none';
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        updateUI();
        showFeed();
    } else {
        alert('Invalid email or password');
    }
}

function signup() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirm = document.getElementById('signup-confirm').value.trim();

    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }

    if (users.find(u => u.email === email)) {
        alert('Email already exists');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        bio: 'New user',
        avatar: 'https://via.placeholder.com/150',
        followers: 0,
        following: 0
    };

    users.push(newUser);
    currentUser = newUser;
    saveData();

    document.getElementById('signup-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-confirm').value = '';

    document.getElementById('auth-modal').style.display = 'none';
    updateUI();
    showFeed();
}

function logout() {
    currentUser = null;
    saveData();
    document.getElementById('auth-modal').classList.add('active');
    document.getElementById('auth-modal').style.display = 'flex';
    switchAuth('login');
}

// Post Functions
function createPost() {
    const content = document.getElementById('post-text').value.trim();
    if (!content) {
        alert('Post cannot be empty');
        return;
    }

    const post = {
        id: Date.now(),
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        content: content,
        image: document.getElementById('post-text').dataset.image || null,
        link: document.getElementById('post-text').dataset.link || null,
        likes: 0,
        likedBy: [],
        comments: [],
        timestamp: new Date().toLocaleString()
    };

    posts.unshift(post);
    saveData();

    document.getElementById('post-text').value = '';
    document.getElementById('post-text').dataset.image = '';
    document.getElementById('post-text').dataset.link = '';
    document.getElementById('image-input').value = '';

    renderFeed();
}

function addLink() {
    const link = document.getElementById('link-input').value.trim();
    if (!link) {
        alert('Please enter a URL');
        return;
    }

    document.getElementById('post-text').dataset.link = link;
    document.getElementById('post-text').value += `\n🔗 ${link}`;
    document.getElementById('link-input').value = '';
    document.getElementById('link-input-modal').style.display = 'none';
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(p => p.id !== postId);
        saveData();
        renderFeed();
    }
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        const userIndex = post.likedBy.indexOf(currentUser.id);
        if (userIndex > -1) {
            post.likedBy.splice(userIndex, 1);
            post.likes--;
        } else {
            post.likedBy.push(currentUser.id);
            post.likes++;
        }
        saveData();
        renderFeed();
    }
}

function openCommentsModal(postId) {
    currentPostId = postId;
    const post = posts.find(p => p.id === postId);

    if (post) {
        document.getElementById('comments-modal').style.display = 'flex';
        renderComments(post);
    }
}

function closeCommentsModal() {
    document.getElementById('comments-modal').style.display = 'none';
    currentPostId = null;
}

function addComment() {
    const text = document.getElementById('comment-input').value.trim();
    if (!text) {
        alert('Comment cannot be empty');
        return;
    }

    const post = posts.find(p => p.id === currentPostId);
    if (post) {
        const comment = {
            id: Date.now(),
            authorId: currentUser.id,
            authorName: currentUser.name,
            authorAvatar: currentUser.avatar,
            text: text,
            timestamp: new Date().toLocaleString()
        };

        post.comments.push(comment);
        saveData();
        document.getElementById('comment-input').value = '';
        renderComments(post);
    }
}

function renderComments(post) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    if (post.comments.length === 0) {
        commentsList.innerHTML = '<p style="text-align: center; color: #536471;">No comments yet. Be the first!</p>';
    } else {
        post.comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment';
            commentEl.innerHTML = `
                <img src="${comment.authorAvatar}" alt="Avatar" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-author">${comment.authorName}</div>
                    <div class="comment-text">${escapeHtml(comment.text)}</div>
                    <div style="font-size: 12px; color: #536471; margin-top: 5px;">${comment.timestamp}</div>
                </div>
            `;
            commentsList.appendChild(commentEl);
        });
    }
}

// Feed Display
function renderFeed() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p style="text-align: center; padding: 40px; color: #536471;">No posts yet. Create one to get started!</p>';
        return;
    }

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post';

        const isLiked = post.likedBy.includes(currentUser.id);
        const isAuthor = post.authorId === currentUser.id;

        let contentHTML = `<div class="post-content">${escapeHtml(post.content)}</div>`;

        if (post.image) {
            contentHTML += `<img src="${post.image}" class="post-image" alt="Post image">`;
        }

        if (post.link) {
            contentHTML += `<a href="${post.link}" target="_blank" class="post-link">${post.link}</a>`;
        }

        postEl.innerHTML = `
            <div class="post-header-info">
                <img src="${post.authorAvatar}" alt="Avatar" class="avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                <div>
                    <div class="post-author">${post.authorName}</div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
                ${isAuthor ? `<button onclick="deletePost(${post.id})" style="margin-left: auto; background: none; border: none; color: #E0245E; cursor: pointer;">🗑️</button>` : ''}
            </div>
            ${contentHTML}
            <div class="post-actions">
                <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="likePost(${post.id})">
                    ${isLiked ? '❤️' : '🤍'} <span>${post.likes}</span>
                </button>
                <button class="action-btn" onclick="openCommentsModal(${post.id})">
                    💬 <span>${post.comments.length}</span>
                </button>
                <button class="action-btn" onclick="sharePost(${post.id})">
                    🔄 <span>Share</span>
                </button>
            </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

function sharePost(postId) {
    alert('Post shared! (In a real app, this would open a share dialog)');
}

// Profile Functions
function showProfile() {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('profile-section').classList.add('active');
    renderProfile();
}

function renderProfile() {
    if (!currentUser) return;

    document.getElementById('profile-avatar').src = currentUser.avatar;
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-bio').textContent = currentUser.bio;

    const userPosts = posts.filter(p => p.authorId === currentUser.id);
    document.getElementById('profile-posts').textContent = userPosts.length;
    document.getElementById('profile-followers').textContent = currentUser.followers || 0;
    document.getElementById('profile-following').textContent = currentUser.following || 0;

    // Render user posts
    const userPostsContainer = document.getElementById('user-posts-container');
    userPostsContainer.innerHTML = '';

    if (userPosts.length === 0) {
        userPostsContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: #536471;">No posts yet</p>';
    } else {
        userPosts.forEach(post => {
            const postThumb = document.createElement('div');
            postThumb.className = 'post-thumb';

            let content = post.content.substring(0, 50);
            if (post.image) {
                postThumb.innerHTML = `<img src="${post.image}" alt="Post">`;
            } else {
                postThumb.textContent = content;
            }

            userPostsContainer.appendChild(postThumb);
        });
    }
}

function editProfile() {
    document.getElementById('edit-name').value = currentUser.name;
    document.getElementById('edit-bio').value = currentUser.bio;
    document.getElementById('edit-profile-modal').style.display = 'flex';
}

function saveProfile() {
    const newName = document.getElementById('edit-name').value.trim();
    const newBio = document.getElementById('edit-bio').value.trim();

    if (!newName) {
        alert('Name cannot be empty');
        return;
    }

    currentUser.name = newName;
    currentUser.bio = newBio;
    saveData();

    document.getElementById('edit-profile-modal').style.display = 'none';
    renderProfile();
    updateUI();
}

// UI Functions
function showFeed() {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('feed-section').classList.add('active');
    renderFeed();
}

function updateUI() {
    if (currentUser) {
        document.getElementById('user-avatar').src = currentUser.avatar;
    }
}

// Data Management
function saveData() {
    const data = {
        currentUser: currentUser,
        users: users,
        posts: posts
    };
    localStorage.setItem('gatheringData', JSON.stringify(data));
}

function loadData() {
    const data = localStorage.getItem('gatheringData');
    if (data) {
        const parsed = JSON.parse(data);
        currentUser = parsed.currentUser;
        users = parsed.users || [];
        posts = parsed.posts || [];
    }
}

// Utility Functions
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Close modals when clicking outside
window.onclick = function (event) {
    const authModal = document.getElementById('auth-modal');
    const linkModal = document.getElementById('link-input-modal');
    const editModal = document.getElementById('edit-profile-modal');
    const commentsModal = document.getElementById('comments-modal');

    if (event.target === linkModal) {
        linkModal.style.display = 'none';
    }
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
    if (event.target === commentsModal) {
        commentsModal.style.display = 'none';
        currentPostId = null;
    }
}

// Add some sample data for testing
function addSampleData() {
    if (users.length === 0) {
        users = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                bio: 'Tech enthusiast and developer',
                avatar: 'https://i.pravatar.cc/150?img=1',
                followers: 150,
                following: 75
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password123',
                bio: 'Designer and creative thinker',
                avatar: 'https://i.pravatar.cc/150?img=2',
                followers: 200,
                following: 100
            }
        ];

        posts = [
            {
                id: Date.now(),
                authorId: 1,
                authorName: 'John Doe',
                authorAvatar: 'https://i.pravatar.cc/150?img=1',
                content: 'Just launched my new project! Super excited to share it with everyone. Check it out!',
                image: null,
                link: null,
                likes: 24,
                likedBy: [],
                comments: [],
                timestamp: new Date().toLocaleString()
            },
            {
                id: Date.now() + 1,
                authorId: 2,
                authorName: 'Jane Smith',
                authorAvatar: 'https://i.pravatar.cc/150?img=2',
                content: 'Beautiful sunset at the beach today! Nature is amazing 🌅',
                image: null,
                link: null,
                likes: 45,
                likedBy: [],
                comments: [],
                timestamp: new Date().toLocaleString()
            }
        ];

        saveData();
    }
}

// Initialize with sample data (uncomment if needed)
// addSampleData();
