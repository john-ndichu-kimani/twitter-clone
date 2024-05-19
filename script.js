document.addEventListener('DOMContentLoaded', () => {
    let userSelect = document.querySelector('#users');
    let userProfile = document.querySelector('.user-profile');
    let postWrapper = document.querySelector('.post-wrapper');
    let posts = document.querySelector('.posts');

    const fetchAllUsers = (callback) => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then(users => callback(null, users))
            .catch(error => callback(error, null));
    };

    const fetchSingleUser = (id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => response.json())
                .then(user => resolve(user))
                .catch(error => reject(error));
        });
    };

    const fetchUserPosts = (userId) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
               .then(response => response.json());
    }

    const fetchPostDetails = (postId) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
               .then(response => response.json());
    }

    const allUsers = () => {
        fetchAllUsers((error, users) => {
            if (error) {
                console.error('Error fetching users:', error);
            } else {
                users.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.name;
                    
                    if (user.id === 1) {
                        option.selected = true;
                    }

                    userSelect.appendChild(option);
                });

                loadProfile(userSelect.value);
            }
        });
    };

    const loadProfile = (id) => {
        userProfile.innerHTML = '';
        postWrapper.innerHTML = '';

        const image = document.createElement('img');
        image.src = '/images/little-egret-5826070_640.jpg';
        image.className = 'profile-img';
        userProfile.appendChild(image);

        fetchSingleUser(id)
            .then(userData => {
                const nameLabel = document.createElement('h2');
                nameLabel.textContent = userData.name;
                userProfile.appendChild(nameLabel);

                const usernameLabel = document.createElement('p');
                usernameLabel.textContent = userData.username;
                userProfile.appendChild(usernameLabel);

                const websiteLabel = document.createElement('p');
                websiteLabel.textContent = userData.website;
                userProfile.appendChild(websiteLabel);

                const phraseLabel = document.createElement('p');
                phraseLabel.textContent = userData.company.catchPhrase;
                userProfile.appendChild(phraseLabel);

                const location = document.createElement('div');
                location.className = 'location-wrapper';
                const locationImage = document.createElement('ion-icon');
                locationImage.setAttribute('name', 'location');
                locationImage.className = 'location-icon';
                const locationLabel = document.createElement('p');
                locationLabel.textContent = userData.address.city;
                location.appendChild(locationImage);
                location.appendChild(locationLabel);
                userProfile.appendChild(location);

                return fetchUserPosts(userData.id);
            })
            .then(posts => {
                 const postPromises = posts.map(post => fetchPostDetails(post.id));
                 return Promise.all(postPromises);
            })
            .then(postDetails => {
                postDetails.forEach(post => {
                    const post_card = document.createElement('div');
                    post_card.className = 'post-item';


                    const post_image = document.createElement('img');
                    post_image.src="/images/little-egret-5826070_640.jpg";
                    post_image.style.width='130px';
                    post_image.style.height='100%';
                    post_image.style.borderRadius='10px';
                    post_card.appendChild(post_image);
                
                    
                    const post_header = document.createElement('div');
                    post_header.className = 'post-header';
                    const post_title = document.createElement('h3');
                    post_title.textContent = post.title;
                    const post_header_icons = document.createElement('div');
                    post_header_icons.className='icon-wrapper';
                    
                    post_header_icon1 = document.createElement('img');
                    post_header_icon1.src=('/images/verify.png');
                    post_header_icon1.className='post-icon';
                    
                   

                    post_header_icon2= document.createElement('img');
                    post_header_icon2.src=('/images/twitter.png');
                    post_header_icon2.className='post-icon';
                   

                    post_header_icons.appendChild(post_header_icon1);
                    post_header_icons.appendChild(post_header_icon2);
                   
                    post_header.appendChild(post_title);
                    post_header.appendChild(post_header_icons);
    

                    const post_body = document.createElement('p');
                    post_body.textContent = post.body;

                    const post_content = document.createElement('div');
                    post_content.className='post-content';

                    post_content.appendChild(post_header);
                    post_content.appendChild(post_body);

                    post_card.appendChild(post_content);

                    postWrapper.appendChild(post_card);

                    posts.appendChild(postWrapper);
                });
            })
            .catch(error => console.error('Error loading profile:', error));
    };

    userSelect.addEventListener('change', () => {
        loadProfile(userSelect.value);
    });

    allUsers();
});
