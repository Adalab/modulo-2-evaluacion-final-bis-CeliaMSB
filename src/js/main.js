
  const userList = document.querySelector('.user-list');
  const saveButton = document.querySelector('.js__save-button');
  const retrieveButton = document.querySelector('.js__retrieve-button');
  const url = 'https://randomuser.me/api/?results=10'

  let users = [];

 
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const cleanedData = data.results.map(user => {
        return {
          name: user.name.first,
          city: user.location.city,
          photo: user.picture.large,
          username: user.login.username,
          isFriend: false
        };
      });

      users = cleanedData;
      renderUsers();
    })
 
 
  userList.addEventListener('click', event => {
    const clickedElement = event.target.closest('li');
    if (clickedElement) {
      const index = Array.from(userList.children).indexOf(clickedElement);
      users[index].isFriend = true;
      renderUsers();
    }
  });

 
  function renderUsers() {
    userList.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const li = document.createElement('li');
      li.innerHTML = `
        
        <div class="li-list">
        <img src="${user.photo}" alt="Photo of ${user.name}">
          <h3>${user.name}</h3>
          <p>${user.city}</p>
          <p>${user.username}</p>
        </div>
      `;

      if (user.isFriend) {
        li.classList.add('friend');
      }

      userList.appendChild(li);
    }
  }
 
  
  saveButton.addEventListener('click', () => {
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Usuario guardado en local storage.');
  });

  
  retrieveButton.addEventListener('click', () => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      users = JSON.parse(savedUsers);
      renderUsers();
      console.log('Usuarios recuperados del local storage.');
    } else {
      console.log('Ningún usuario guardado en local storage.');
    }
  });
 