var socket = io.connect('/');
// HELPER FUNCTIONS
// shuffle function taken from online library
function shuffle(e) {               
    var replace = $('<div>');
    var size = e.size();

    while (size >= 1) {
       var rand = Math.floor(Math.random() * size);
       var temp = e.get(rand);      
       replace.append(temp);        
       e = e.not(temp); 
       size--;
    }
    $('#options').html(replace.html() );     
}


// BROADCAST
// start game


// request question
function send_question(){

	var player_2 = $('#player_2').val();
	var category = $('#category').val();
	console.log(player_2);
	console.log(category);
	socket.emit('send_question', { player_2 : player_2, category : category });
};

// DETECT SELECTION AND TRANSMIT TO SERVER
function selected_answer(value){

 console.log(value);
 socket.emit('send_answer', { selected_answer : value});
};


// RECIEVE
// QUESTION
socket.on('question', function (data) {
  console.log(data);

  $("#question").text(data.question);
	});
// CORRECT ANSWERS
// socket.on('correct_answer', function (data) {
//   console.log(data);
//  
//   var line = "<button id= 'selected' onclick='selected_answer(this.value)' value='"+data.correct_answer+"'>" +data.correct_answer+ "<\/button><br>";
//   $("#options").append(line);
// 	});
// INCORRECT ANSWERS
socket.on('possible_answers', function (data) {
   $("#options").text("");
  console.log(data);
  console.log(data.possible_answers.length);
  var length = data.possible_answers.length;
  $("#options").text();
  for (i=0;i<length;i++){
  	console.log(data.possible_answers[i]);
  	var line = "<button id= 'selected' onclick='selected_answer(this.value)' value='"+data.possible_answers[i]+"'>" +data.possible_answers[i] +"<\/button><br>";
  	$("#options").append(line);
  } 

	});

socket.on('single_answer_result', function (data) {
  console.log(data);
  alert("your answer is " + data.result);
  });

