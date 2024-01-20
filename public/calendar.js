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

// Dynamically populate the calendar days
const calendarDays = document.querySelector('.calendar-days:last-child');

for (let i = 1; i <= 31; i++) {
  const dayElement = document.createElement('div');
  dayElement.classList.add('calendar-day');
  dayElement.textContent = i;
  calendarDays.appendChild(dayElement);

  // Add sample events for demonstration purposes
  if (i % 3 === 0) {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.textContent = 'Event';
    dayElement.appendChild(eventElement);
  }
}
function change_textupdate(){
  document.getElementById("contentleft").innerHTML="UPDATES";
}
function change_textfilters(){
  document.getElementById("contentleft").innerHTML="FILTERS";
}