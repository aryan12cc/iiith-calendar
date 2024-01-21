document.addEventListener('DOMContentLoaded', function () {

    fetch('/api/CheckLogin', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })
      .then(response => {
          if(response.status == 401) {
              window.location.href = 'index.html';
          }
          else if(response.ok) {
              return response.json();
          }
      })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Error:', error);
      })
  
    fetch('/api/GetUser', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          document.getElementById('profile-button').querySelector('p').textContent = data.message;
        }
    })
    .catch(error => console.error(error));
  
    let updateButtonId = document.getElementById("update-button");
    let logoutId = document.getElementById("logout");
    let profileButtonId = document.getElementById("profile-button");
  
    updateButtonId.addEventListener('click', function (event) {
      event.preventDefault();
      document.getElementById("contentleft").textContent = "Updates";
    });
    logoutId.addEventListener('click', function (event) {
      event.preventDefault();
      fetch('/api/LogoutUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
          if(data.success) {
            window.location.href = 'index.html';
          }
        })
        .catch(error => console.error(error));
    });
  
    profileButtonId.addEventListener('click', function (event) {
      event.preventDefault();
      window.onclick = function(event1) {
        if (!event1.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
            }
        }
      }
    });

  });