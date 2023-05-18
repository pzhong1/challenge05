// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html. ready（）method this JQ method will run after everything is completely loaded // $(function()) this JQ method will run immediately after its load

$(document).ready(function () { // ready() method  
  var currentDay = dayjs(); //dayjs() method for display current day
  $('#currentDay').text(currentDay.format('MMM D, YYYY')); // formal for display current date and time



  //save buttons
  $('.saveBtn').click(function (event) { // add a click even to all html thats has class saveBtn // event， when click on any thing the brower knows wich elemtn is clicked 
    var clickedButton = $(event.target);// store JQ event.taget in var called slickButton. the actual elemetn when clicked, if i clicked on a button named saveBtn then the event.target is the saveBtn button
    var timeBlock = clickedButton.closest('.time-block');
    var hours = timeBlock.attr('id');// get the value of the id attr from timeBlock and store it in var called textInput // attr() is jq method that get the value of an elements id attribute 
    var textInput = timeBlock.find('.description');// find class in html called description within the time Block and stored it in the car called textInput 
    var text = textInput.val(); // when user enter the text, save it in val() 

    localStorage.setItem(hours, text);// save the text in localstoregae even user closed the brower and reopen the text is still saved in brower
  });

  // if-else statment  grey for past, present for red, tuture for green
  function hourStatus() {
    var currentHour = dayjs().hour(); // store dayjs() method in hourStatus function so the color can change depends on what is the current time

    $('.time-block').each(function () {// using each method to iterate every class element called time-block, by using each() method so i just need wirte text one time instead write every single time-block
      var timeBlock = $(this); // convert currently  html element // after iterate all elements with time-block  and using JQ this to refers currently processed  time-block class element
      var id = timeBlock.attr('id'); // retrieve id attribute
      var parts = id.split('-'); // use - to split id in html for example split(hour-9) = (hour) and (9)
      var hour = parseInt(parts[1]); // array 0 stand for hour and 1 stand for 9  in this code convert the 9 to interger


      if (hour < currentHour) {
        timeBlock.removeClass('present future').addClass('past');
      } else if (hour === currentHour) {
        timeBlock.removeClass('past future').addClass('present');
      } else {
        timeBlock.removeClass('past present').addClass('future');
      }
    });
  }

  // saved input from user, after reopen the brower all the saved input from localstorge will still display on calendar
  function userInput() {
    $('.time-block').each(function () { // using each method to iterate over each element with time-block
      var timeBlock = $(this); // current element timeBlock
      var hour = timeBlock.attr('id'); // retrieves id and gave a var name called hour
      var textInput = timeBlock.find('.description');
      var savedText = localStorage.getItem(hour); // getItem(hour) and assigned to the savedText
      textInput.val(savedText);// store savedText from localStroge
    });
  }

  // Call the functions 
  hourStatus();
  userInput();
});




