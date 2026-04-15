// Load posts when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
});

function createPost() {
    const username = document.getElementById('username').value.trim();
    const content = document.getElementById('post-content').value.trim();
    
    if (!username || !content) {
        alert('Please enter both your name and a post');
        return;
    }
    
    const post = {
        id: Date.now(),
        username: username,
        content: content,
        timestamp: new Date().toLocaleString()
    };
    
    // Get existing posts
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // Add new post
    posts.unshift(post);
    
    // Save back to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('post-content').value = '';
    
    // Reload posts
    loadPosts();
}

function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="no-posts">No posts yet. Be the first to post!</p>';
        return;
    }
    
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="post-author">${post.username}</span>
                <span class="post-time">${post.timestamp}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Allow Enter key to submit
document.getElementById('post-content').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        createPost();
    }
});
