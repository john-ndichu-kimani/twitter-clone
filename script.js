document.addEventListener("DOMContentLoaded", async () => {
    const userSelect = document.querySelector("#users");
    const userProfile = document.querySelector(".user-profile");
    const postWrapper = document.querySelector(".post-wrapper");
    const commentsWrapper = document.querySelector(".comments");

    const API_URL = 'https://jsonplaceholder.typicode.com';

    const fetchAllUsers = async () => {
        const response = await fetch(`${API_URL}/users`);
        return response.json();
    };

    const fetchSingleUser = async (id) => {
        const response = await fetch(`${API_URL}/users/${id}`);
        return response.json();
    };

    const fetchUserPosts = async (userId) => {
        const response = await fetch(`${API_URL}/posts?userId=${userId}`);
        return response.json();
    };

    const fetchPostComments = async (postId) => {
        const response = await fetch(`${API_URL}/comments?postId=${postId}`);
        return response.json();
    };

    const allUsers = async () => {
        try {
            const users = await fetchAllUsers();
            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.id;
                option.textContent = user.name;
                if (user.id === 1) {
                    option.selected = true;
                }
                userSelect.appendChild(option);
            });
            await loadProfile(userSelect.value);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const loadProfile = async (id) => {
        userProfile.innerHTML = "";
        postWrapper.innerHTML = "";
        commentsWrapper.innerHTML = "";

        const image = document.createElement("img");
        image.src = "/images/profile.png";
        image.className = "profile-img";
        userProfile.appendChild(image);

        try {
            const userData = await fetchSingleUser(id);
            const nameLabel = document.createElement("h2");
            nameLabel.textContent = userData.name;
            userProfile.appendChild(nameLabel);

            const usernameLabel = document.createElement("p");
            usernameLabel.textContent = userData.username;
            userProfile.appendChild(usernameLabel);

            const websiteLabel = document.createElement("p");
            websiteLabel.textContent = userData.website;
            userProfile.appendChild(websiteLabel);

            const phraseLabel = document.createElement("p");
            phraseLabel.textContent = userData.company.catchPhrase;
            userProfile.appendChild(phraseLabel);

            const location = document.createElement("div");
            location.className = "location-wrapper";
            const locationImage = document.createElement("ion-icon");
            locationImage.setAttribute("name", "location");
            locationImage.className = "location-icon";
            const locationLabel = document.createElement("p");
            locationLabel.textContent = userData.address.city;
            location.appendChild(locationImage);
            location.appendChild(locationLabel);
            userProfile.appendChild(location);

            const userPosts = await fetchUserPosts(userData.id);

            userPosts.forEach(post => {
                const postCard = document.createElement("div");
                postCard.className = "post-card";
                postCard.dataset.postId = post.id;

                const postImage = document.createElement("img");
                postImage.src = "/images/profile.png";
                postImage.className = "post-image";
                postCard.appendChild(postImage);

                const postHeader = document.createElement("div");
                postHeader.className = "header";
                const iconsWrapper = document.createElement('div');
                iconsWrapper.className='icon-wrapper'
                const postIcons = document.createElement("div");
                const verified = document.createElement('img');
                verified.className='icons';
                verified.src='/images/verify.png';

                const twitter = document.createElement('img');
                twitter.className='icons';
                twitter.src='/images/twitter.png';
                
               
                postIcons.appendChild(verified);
                postIcons.appendChild(twitter);
                iconsWrapper.appendChild(postIcons);

                const postAuthor = document.createElement("p");
                postAuthor.textContent = `${userData.name}`;

                postHeader.appendChild(postAuthor);
                postHeader.appendChild(iconsWrapper);
               

                const postBody = document.createElement("p");
                postBody.textContent = post.body;

                const postFooter = document.createElement("div");
                postFooter.className = "footer";

                const messageReactions = document.createElement("div");
                messageReactions.className = "msg-wrapper";
                const msgImg = document.createElement("img");
                msgImg.src = "/images/message.png";
                msgImg.className = "icons";
                const msgCount = document.createElement("p");
                msgCount.textContent = "200";
                messageReactions.appendChild(msgImg);
                messageReactions.appendChild(msgCount);

                const repostReactions = document.createElement("div");
                repostReactions.className = "repost-wrapper";
                const repostImg = document.createElement("img");
                repostImg.src = "/images/retweet.png";
                repostImg.className = "icons";
                const repostCount = document.createElement("p");
                repostCount.textContent = "200";
                repostReactions.appendChild(repostImg);
                repostReactions.appendChild(repostCount);

                const likeReactions = document.createElement("div");
                likeReactions.className = "like-wrapper";
                const likeImg = document.createElement("img");
                likeImg.src = "/images/heart.png";
                likeImg.className = "icons";
                const likeCount = document.createElement("p");
                likeCount.textContent = "200";
                likeReactions.appendChild(likeImg);
                likeReactions.appendChild(likeCount);

                postFooter.appendChild(messageReactions);
                postFooter.appendChild(repostReactions);
                postFooter.appendChild(likeReactions);

                const postContents = document.createElement('div');
                postContents.className='post-content';

                postContents.appendChild(postHeader);
                postContents.appendChild(postBody);
                postContents.appendChild(postFooter);

              postCard.appendChild(postContents);
                postWrapper.appendChild(postCard);

                postCard.addEventListener("click", () => loadComments(post.id));
            });

            if (userPosts.length > 0) {
                await loadComments(userPosts[0].id);
            }

        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    const loadComments = async (postId) => {
        commentsWrapper.innerHTML = "";
        try {
            const comments = await fetchPostComments(postId);
            comments.forEach(comment => {
                const commentCard = document.createElement("div");
                commentCard.className = "comment-card";

                const commentImage = document.createElement("img");
                commentImage.src = "/images/profile.png";
                commentImage.className = "post-image";
                commentCard.appendChild(commentImage);

                const commentHeader = document.createElement("div");
                commentHeader.className = "post-header";

                const commentTitle = document.createElement("p");
                commentTitle.textContent = comment.name;

               

                commentHeader.appendChild(commentTitle);
                

                const commentBody = document.createElement("p");
                commentBody.textContent = comment.body;
                commentCard.appendChild(commentBody);


                const commentFooter = document.createElement("div");
                commentFooter.className = "footer";

                const messageReactions = document.createElement("div");
                messageReactions.className = "msg-wrapper";
                const msgImg = document.createElement("img");
                msgImg.src = "/images/message.png";
                msgImg.className = "icons";
                const msgCount = document.createElement("p");
                msgCount.textContent = "0";
                messageReactions.appendChild(msgImg);
                messageReactions.appendChild(msgCount);

                const repostReactions = document.createElement("div");
                repostReactions.className = "repost-wrapper";
                const repostImg = document.createElement("img");
                repostImg.src = "/images/retweet.png";
                repostImg.className = "icons";
                const repostCount = document.createElement("p");
                repostCount.textContent = "0";
                repostReactions.appendChild(repostImg);
                repostReactions.appendChild(repostCount);

                const likeReactions = document.createElement("div");
                likeReactions.className = "like-wrapper";
                const likeImg = document.createElement("img");
                likeImg.src = "/images/heart.png";
                likeImg.className = "icons";
                const likeCount = document.createElement("p");
                likeCount.textContent = "0";
                likeReactions.appendChild(likeImg);
                likeReactions.appendChild(likeCount);

                commentFooter.appendChild(messageReactions);
                commentFooter.appendChild(repostReactions);
                commentFooter.appendChild(likeReactions);

                 const commentContents= document.createElement('div');
                 commentContents.className='comment-content';

                 commentContents.appendChild(commentHeader);
                 commentContents.appendChild(commentBody);
                 commentContents.appendChild(commentFooter);

                commentCard.appendChild(commentContents);
                commentsWrapper.appendChild(commentCard);
            });
        } catch (error) {
            console.error("Error loading comments:", error);
        }
    };

    userSelect.addEventListener("change", async () => {
        await loadProfile(userSelect.value);
    });

    await allUsers();
});
