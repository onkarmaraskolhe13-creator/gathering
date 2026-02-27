"""
Gathering Backend API
A simple Flask backend for the Gathering social media application
Run this with: python app.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
DATABASE_FILE = 'data.json'

# Load data from JSON file
def load_data():
    if os.path.exists(DATABASE_FILE):
        with open(DATABASE_FILE, 'r') as f:
            return json.load(f)
    return {'users': [], 'posts': []}

# Save data to JSON file
def save_data(data):
    with open(DATABASE_FILE, 'w') as f:
        json.dump(data, f, indent=4)

# ==================== Authentication Routes ====================

@app.route('/api/signup', methods=['POST'])
def signup():
    """Create a new user account"""
    data = request.get_json()
    db = load_data()
    
    # Validate input
    if not all(key in data for key in ['name', 'email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if email exists
    if any(user['email'] == data['email'] for user in db['users']):
        return jsonify({'error': 'Email already exists'}), 400
    
    # Create new user
    new_user = {
        'id': int(datetime.now().timestamp() * 1000),
        'name': data['name'],
        'email': data['email'],
        'password': generate_password_hash(data['password']),
        'bio': 'New user',
        'avatar': 'https://i.pravatar.cc/150?u=' + data['email'],
        'followers': 0,
        'following': 0,
        'created_at': datetime.now().isoformat()
    }
    
    db['users'].append(new_user)
    save_data(db)
    
    # Return user without password
    new_user_response = new_user.copy()
    del new_user_response['password']
    
    return jsonify(new_user_response), 201

@app.route('/api/login', methods=['POST'])
def login():
    """Authenticate user and return user data"""
    data = request.get_json()
    db = load_data()
    
    # Find user by email
    user = next((u for u in db['users'] if u['email'] == data['email']), None)
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Return user without password
    user_response = user.copy()
    del user_response['password']
    
    return jsonify(user_response), 200

# ==================== User Routes ====================

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user profile"""
    db = load_data()
    user = next((u for u in db['users'] if u['id'] == user_id), None)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user_response = user.copy()
    del user_response['password']
    
    return jsonify(user_response), 200

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update user profile"""
    data = request.get_json()
    db = load_data()
    
    user = next((u for u in db['users'] if u['id'] == user_id), None)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Update allowed fields
    if 'name' in data:
        user['name'] = data['name']
    if 'bio' in data:
        user['bio'] = data['bio']
    
    save_data(db)
    
    user_response = user.copy()
    del user_response['password']
    
    return jsonify(user_response), 200

# ==================== Post Routes ====================

@app.route('/api/posts', methods=['GET'])
def get_posts():
    """Get all posts (feed)"""
    db = load_data()
    # Return posts in reverse order (newest first)
    return jsonify(sorted(db['posts'], key=lambda x: x['id'], reverse=True)), 200

@app.route('/api/posts', methods=['POST'])
def create_post():
    """Create a new post"""
    data = request.get_json()
    db = load_data()
    
    if not data.get('content'):
        return jsonify({'error': 'Post content is required'}), 400
    
    new_post = {
        'id': int(datetime.now().timestamp() * 1000),
        'authorId': data['authorId'],
        'authorName': data['authorName'],
        'authorAvatar': data.get('authorAvatar', ''),
        'content': data['content'],
        'image': data.get('image'),
        'link': data.get('link'),
        'likes': 0,
        'likedBy': [],
        'comments': [],
        'timestamp': datetime.now().isoformat()
    }
    
    db['posts'].append(new_post)
    save_data(db)
    
    return jsonify(new_post), 201

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Get single post"""
    db = load_data()
    post = next((p for p in db['posts'] if p['id'] == post_id), None)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    return jsonify(post), 200

@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Delete a post"""
    db = load_data()
    post = next((p for p in db['posts'] if p['id'] == post_id), None)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    db['posts'].remove(post)
    save_data(db)
    
    return jsonify({'message': 'Post deleted'}), 200

@app.route('/api/posts/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    """Like or unlike a post"""
    data = request.get_json()
    db = load_data()
    post = next((p for p in db['posts'] if p['id'] == post_id), None)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    user_id = data['userId']
    
    if user_id in post['likedBy']:
        post['likedBy'].remove(user_id)
        post['likes'] -= 1
    else:
        post['likedBy'].append(user_id)
        post['likes'] += 1
    
    save_data(db)
    
    return jsonify(post), 200

# ==================== Comment Routes ====================

@app.route('/api/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    """Add comment to a post"""
    data = request.get_json()
    db = load_data()
    post = next((p for p in db['posts'] if p['id'] == post_id), None)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    new_comment = {
        'id': int(datetime.now().timestamp() * 1000),
        'authorId': data['authorId'],
        'authorName': data['authorName'],
        'authorAvatar': data.get('authorAvatar', ''),
        'text': data['text'],
        'timestamp': datetime.now().isoformat()
    }
    
    post['comments'].append(new_comment)
    save_data(db)
    
    return jsonify(new_comment), 201

@app.route('/api/posts/<int:post_id>/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(post_id, comment_id):
    """Delete a comment"""
    db = load_data()
    post = next((p for p in db['posts'] if p['id'] == post_id), None)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    comment = next((c for c in post['comments'] if c['id'] == comment_id), None)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    
    post['comments'].remove(comment)
    save_data(db)
    
    return jsonify({'message': 'Comment deleted'}), 200

# ==================== Stats Routes ====================

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get app statistics"""
    db = load_data()
    
    return jsonify({
        'totalUsers': len(db['users']),
        'totalPosts': len(db['posts']),
        'totalComments': sum(len(p.get('comments', [])) for p in db['posts']),
        'totalLikes': sum(p.get('likes', 0) for p in db['posts'])
    }), 200

# ==================== Error Handlers ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ==================== Health Check ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Check API health"""
    return jsonify({'status': 'OK', 'message': 'SocialHub API is running'}), 200

# ==================== Main ====================

if __name__ == '__main__':
    print("Starting Gathering API...")
    print("API will run on http://localhost:5000")
    print("\nTo use this backend with the frontend:")
    print("1. Make sure both the frontend and backend are running")
    print("2. Modified frontend to use the API endpoints")
    print("\nEndpoints:")
    print("POST   /api/signup              - Create new account")
    print("POST   /api/login               - Login to account")
    print("GET    /api/posts               - Get all posts")
    print("POST   /api/posts               - Create new post")
    print("DELETE /api/posts/<id>          - Delete post")
    print("POST   /api/posts/<id>/like     - Like/unlike post")
    print("POST   /api/posts/<id>/comments - Add comment")
    print("DELETE /api/posts/<id>/comments/<id> - Delete comment")
    print("\nPress CTRL+C to stop the server")
    
    app.run(debug=True, port=5000)
