//Creamos las constantes para trer la info de html a JS

  const userList = document.querySelector('.user-list');
  const saveButton = document.querySelector('.js__save-button');
  const retrieveButton = document.querySelector('.js__retrieve-button');

  //Creamos una constante para guardar la API 
  const url = 'https://randomuser.me/api/?results=10'; 

//Creamos un array para guardar la información de la API
  let users = [];
 
 //Utilizamos el fetch para acceder a los datos del servidor.
  fetch(url)
    .then(response => response.json())
    .then(data => {
     //Creamos una constante donde guardaremos los resultados  y con el método map modificaremos el array y devuelverá un objeto con la información que necesitamos.
      const cleanedData = data.results.map(user => {
        return {
          name: user.name.first,
          city: user.location.city,
          photo: user.picture.large,
          username: user.login.username,
          isFriend: false
        };
      });
    //Asignamos esta información a la variable users
      users = cleanedData;
      //Llamamos a la función renderUsers
      renderUsers();
    })
 
 //Creamos un evento click mediante el cual a través del click cambiamos un valor del array de falso a verdadero.
  userList.addEventListener('click', event => {
    const clickedElement = event.target.closest('li'); //Utilizamos event.target.closest para encontrar el elemento "li" se hace para asegurarse de que se hizo click en un elemento "li" dentro de userList.
    if (clickedElement) {
      const index = Array.from(userList.children).indexOf(clickedElement);
      //Guardamos en la constante index la siguiente información : Primero, se convierte userList.children en un array utilizando Array.from(). Luego, se utiliza el método indexOf() para encontrar el índice del elemento "li" en userList.children
      users[index].isFriend = true; //Cambiamos el valor
      renderUsers();
    }
  });

 //Creamos una función para pintar los usuarios en nuestra página 
  function renderUsers() {
    //vaciamos el html
    userList.innerHTML = '';
//Creamos un bucle para recorrer el array
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const li = document.createElement('li');//Manipulando el DOM creamos el elemento li.
      li.innerHTML = `
        
        <div class="li-list">
        <img src="${user.photo}" alt="Photo of ${user.name}">
          <h3>${user.name}</h3>
          <p>${user.city}</p>
          <p>${user.username}</p>
        </div>
      `;
//Creamos un condicional, con classlist añadimos una clase de css al elemento clicado.
      if (user.isFriend) {
        li.classList.add('friend');
      }

      userList.appendChild(li);
    }
  }
 
  //Creamos un evento para el botón de guardar , para guardar los elementos clicados en el local storage
  saveButton.addEventListener('click', () => {
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Usuario guardado en local storage.');
  });

  //Creamos un evento click en el boton de recuperar datos para obtener los datos previamente guardados en el local storage
  retrieveButton.addEventListener('click', () => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      users = JSON.parse(savedUsers);
      renderUsers();//Creamos un condicional para que muestre los usuarios guardados y los meta en la fundion renderUsers
      console.log('Usuarios recuperados del local storage.');
    } else {
      console.log('Ningún usuario guardado en local storage.');//y si no están guardados no los muestra
    }
  });
 