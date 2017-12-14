var request = require('request');
// helper functions
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

exports.init = function(io) {
	io.sockets.on('connection', function (socket) {
 // Game DATA
		var correct_answer;
    var num_questions=0
    var user_answers=[]
    console.log("first_num")
    console.log(num_questions)


    // emit question to player
		socket.on('send_question',function (data){
      console.log("in send question")
      console.log(num_questions);
			var category = data.category;
			var api_string;
			// GET question from API
			// any 10 random questions

      if (num_questions<5){
        console.log("in num questions");
        console.log("category is" + category);
      if (category=="any"){
        console.log("any");
				api_string='https://opentdb.com/api.php?amount=10';
			}else{
				// questions for specific category
				api_string = 'https://opentdb.com/api.php?amount=10&category='+category;
			};
			request(api_string , function (error, response, data) {
  				if (!error && response.statusCode == 200) {
  					var jsondata=JSON.parse(data);
        			var question = jsondata.results[0].question;
        			correct_answer = jsondata.results[0].correct_answer;
        			var possible_answers = jsondata.results[0].incorrect_answers;
        			possible_answers.push(correct_answer);
        			shuffle(possible_answers);
        			socket.emit('question', { question : question});
        			socket.emit('possible_answers', { possible_answers : possible_answers});

     			}
			});}else{
        var score = user_answers.reduce((x, y) => x + y);
        socket.emit('game_over', { score : score});
      }
		});


		// recieve answer
		socket.on('send_answer', function (data) {
			console.log(data.selected_answer);
			console.log(correct_answer);
			if(correct_answer==data.selected_answer){
        num_questions++;
        user_answers.push(1);
				socket.emit("single_answer_result",{result : "correct"});
			}else{
        num_questions++;
        user_answers.push(0);
				socket.emit("single_answer_result",{result : "incorrect", "answer":correct_answer});
			};
		});


		// disconnect player
		socket.on('disconnect', function () {

		});
	});
}
