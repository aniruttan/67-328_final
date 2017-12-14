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
// request question
function send_question(){
	socket.emit('send_question', {category : quiz_category });
};

// DETECT SELECTION AND TRANSMIT TO SERVER
function selected_answer(value){

 console.log(value);
 socket.emit('send_answer', { selected_answer : value});
};


// RECIEVE
// recieve emitted question from server
socket.on('question', function (data) {
  console.log(data);

  $("#question").text(data.question);
	});

// INCORRECT ANSWERS recieves incorrect answers to be presented ot the user as possible options
socket.on('possible_answers', function (data) {
   $("#options").text("");
  console.log(data);
  console.log(data.possible_answers.length);
  var length = data.possible_answers.length;
  $("#options").text();
  for (i=0;i<length;i++){
  	console.log(data.possible_answers[i]);
  	var line = "<button id= 'selected' style='padding: 5x 10px;' class='waves-effect waves-light btn' onclick='selected_answer(this.value)' value='"+data.possible_answers[i]+"'>" +data.possible_answers[i] +"<\/button></br>";
  	$("#options").append(line);
  }

	});

// recieves event that tells the user whether their answer is right or wrong
socket.on('single_answer_result', function (data) {
  console.log(data);
  if(data.result=='incorrect'){
  alert("your answer is " + data.result +" the correct answer is " +data.answer);}
  else{
    alert("your answer is " + data.result);
  }
  });

// handles the event where there is a game over case
socket.on('game_over', function (data) {
  alert("game over! your score is "+ data.score);
  window.location = "/home.html";

})
