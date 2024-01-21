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
        document.addEventListener('DOMContentLoaded', function () {
      
          let updateButtonId = document.getElementById("update-button");
          let filtersButtonId = document.getElementById("filters-button");
        
          updateButtonId.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById("contentleft").innerHTML = "Updates";
            renderUpdatesContent();
          });
        
          filtersButtonId.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById("contentleft").innerHTML = "Filters";
            clearLeftWindow();
          });
        
          const calendarContainer = document.getElementById('calendar-container');
          let currentYear, currentMonth;
        
          function renderCalendar(year, month) {
            const currentDate = new Date();
            currentYear = year || currentDate.getFullYear();
            currentMonth = month || currentDate.getMonth();
        
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        
            const calendarHTML = generateCalendarHTML(daysInMonth, firstDay);
            calendarContainer.innerHTML = calendarHTML;
        
            updateMonthHeader();
            addEventListeners();
          }
        
          function renderUpdatesContent() {
            var boxContainer = document.getElementById('box-container');
            boxContainer.innerHTML = ''; // Clear existing content
        
            // Create and append new content (div boxes) based on your needs
            for (var i = 1; i <= 5; i++) {
              var box = document.createElement('div');
              box.className = 'box';
              box.innerHTML = `
                <a href="#" target="_blank">Box Heading ${i}</a>
                <hr>
                <p>Content for Box ${i}</p>
                <button onclick="handleAddButtonClick()">Add</button>
              `;
              boxContainer.appendChild(box);
            }
          }
        
          function clearLeftWindow() {
            var boxContainer = document.getElementById('box-container');
            boxContainer.innerHTML = ''; // Clear existing content
          }
        
      
        function generateCalendarHTML(daysInMonth, firstDay) {
          firstDay = firstDay - 1;
          if(firstDay == -1) firstDay = 6;
          let dayCount = 1;
          let calendarHTML = '<table>';
          calendarHTML += '<thead><tr><th class="prev-next-button" onclick="prevMonth()">&#9665;</th>';
          calendarHTML += `<th colspan="5">${getMonthName(currentMonth)} ${currentYear}</th>`;
          calendarHTML += '<th class="prev-next-button" onclick="nextMonth()">&#9655;</th></tr>';
          calendarHTML += '<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead>';
          const numRows = Math.ceil((daysInMonth + firstDay) / 7);
          for (let i = 0; i < numRows; i++) {
              calendarHTML += '<tr>';
      
              for (let j = 0; j < 7; j++) {
                  if (i === 0 && j < firstDay) {
                      calendarHTML += '<td></td>';
                  } else if (dayCount <= daysInMonth) {
                      calendarHTML += `<td>${dayCount}</td>`;
                      dayCount++;
                  } else {
                      calendarHTML += '<td></td>';
                  }
              }
      
              calendarHTML += '</tr>';
          }
      
          calendarHTML += '</table>';
          return calendarHTML;
        }
      
        function getMonthName(monthIndex) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return months[monthIndex];
        }
      
        function updateMonthHeader() {
            const monthHeader = calendarContainer.querySelector('th[colspan="5"]');
            monthHeader.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        }
      
        function addEventListeners() {
            const allDays = document.querySelectorAll('#calendar-container table td');
            allDays.forEach(day => {
                if (day.textContent !== '') {
                    day.addEventListener('click', handleDayClick);
                }
            });
        }
      
        function handleDayClick(event) {
            const selectedDay = event.target.textContent;
            alert(`You clicked on ${getMonthName(currentMonth)} ${selectedDay}, ${currentYear}`);
        }
      
        window.prevMonth = function () {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentYear, currentMonth);
        };
      
        window.nextMonth = function () {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentYear, currentMonth);
        };
      
        renderCalendar();
      });