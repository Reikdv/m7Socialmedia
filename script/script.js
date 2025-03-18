document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    let postCount = 0;

    function fetchPosts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPosts = [];
                for (let i = 0; i < 5; i++) {
                    postCount++;
                    newPosts.push({
                        username: "user" + postCount,
                        time: postCount + " hours ago",
                        title: "Post Title " + postCount,
                        content: "This is the content of post " + postCount + ". It can be text, images, or videos.",
                        imageUrl: `https://picsum.photos/600/300?random=${postCount}`,
                        userProfilePic: `https://picsum.photos/40/40?random=${postCount + 100}`,
                        comments: [
                            { username: "commenter1", time: "1 hour ago", content: "Great post!", profilePic: `https://picsum.photos/40/40?random=${postCount + 200}` },
                            { username: "commenter2", time: "30 minutes ago", content: "I totally agree!", profilePic: `https://picsum.photos/40/40?random=${postCount + 300}` }
                        ]
                    });
                }
                resolve(newPosts);
            }, 1000);
        });
    }

    function createPost(postData) {
        const post = document.createElement("div");
        post.classList.add("post");

        post.innerHTML = `
            <div class="post-header">
                <img src="${postData.userProfilePic}" alt="User Profile Picture" class="profile-pic">
                <div>
                    <div class="username">${postData.username}</div>
                    <div class="time">${postData.time}</div>
                </div>
            </div>
            <div class="post-body">
                <h2>${postData.title}</h2>
                <p>${postData.content}</p>
                <img src="${postData.imageUrl}" alt="Post Image" loading="lazy" class="post-image">
            </div>
            <div class="post-footer">
                <span>Upvotes: <span class="upvote-count">0</span></span>
                <span>Comments: <span class="comment-count">${postData.comments.length}</span></span>
            </div>
        `;

        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");

        postData.comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="${comment.profilePic}" alt="Commenter Profile Picture" class="comment-profile-pic">
                    ${comment.username} <span class="time">${comment.time}</span>
                </div>
                <div class="comment-body">${comment.content}</div>
            `;
            commentSection.appendChild(commentElement);
        });

        post.appendChild(commentSection);
        postsContainer.appendChild(post);
    }

    async function loadPosts() {
        const posts = await fetchPosts();
        posts.forEach(createPost);
    }

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            loadPosts();
        }
    });

    loadPosts();
});