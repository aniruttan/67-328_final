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
	var currentPlayers = 0; // keep track of the number of players	
	// namespace for available players
	// var available_players = io.of('/available_players');
 //  	var players_ingame = io.of('/players_ingame');
  // When a new connection is initiated
	io.sockets.on('connection', function (socket) {
		++currentPlayers;
		var correct_answer;

		// send question
		socket.on('send_question',function (data){
			console.log(data.player_2);
			console.log(data.category);
			var player_2 = data.player_2;
			var category = data.category;
			var api_string;
			// GET question from API
			// any 10 random questions 
			if (category=="any"){
				api_string='https://opentdb.com/api.php?amount=10';
			}else{
				// questions for specific category
				api_string = 'https://opentdb.com/api.php?amount=10&category='+category;
			};
			request(api_string , function (error, response, data) {
  				if (!error && response.statusCode == 200) {
  					var jsondata=JSON.parse(data);
        			console.log(jsondata.results[0].question);
        			var question = jsondata.results[0].question;
        			correct_answer = jsondata.results[0].correct_answer;
        			var possible_answers = jsondata.results[0].incorrect_answers;
        			possible_answers.push(correct_answer);
        			console.log(possible_answers);
        			shuffle(possible_answers);
        			console.log(possible_answers);
        			socket.emit('question', { question : question});
        			socket.emit('possible_answers', { possible_answers : possible_answers});

     			}
			});
		});


		// recieve answer
		socket.on('send_answer', function (data) {
			console.log(data.selected_answer);
			console.log(correct_answer);
			if(correct_answer==data.selected_answer){
				socket.emit("single_answer_result",{result : "correct"});	
			}else{
				socket.emit("single_answer_result",{result : "incorrect"});	
			};
		});


		// disconnect player
		socket.on('disconnect', function () {
			--currentPlayers;
			socket.broadcast.emit('players', { number: currentPlayers});
		});
	});
}
