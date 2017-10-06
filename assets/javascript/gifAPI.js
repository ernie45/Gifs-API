		//ORIGINAL BUTTONS
	$(document).ready(function(){
		var topics = ["fix", "fix", "fix", "fix", "fix", "fix"];
		//SHOW THE BUTTONS
		displayButtons();
		//ADD A TOPIC AND APPEND TO THE BUTTONS LIST
		$("#add-topic").on("click", function(event){
			event.preventDefault();
			var subject = $("#gif-input").val().trim();
			topics.push(subject);
			displayButtons();
		});
		//CLICKING ON A BUTTON SEARCHES FOR THAT 
		$("#buttonsGoHere").on("click", ".subject", function(){
			var subject = $(this).attr("data-name");
			var APIKey = "QSE9U2nEeYIyI2u6ycZObppAgfOV8mLD";
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=" + APIKey + "&limit=10";
			$.ajax({
				url: queryURL,
				method: "GET"
			})
			.done(function(response){
				console.log(response);
				var results = response.data;
				for (var i = 0; i < 10; i++){
					var contentDiv = $("<div>");
					contentDiv.addClass("content");
					var imgDiv = $("<img>");
					imgDiv.addClass("chosenGif");
					imgDiv.attr("src", results[i].images.fixed_height_still.url);
					imgDiv.attr("data-still", results[i].images.fixed_height_still.url);
					imgDiv.attr("data-animate", results[i].images.fixed_height.url);
					imgDiv.attr("data-state", "still");
					imgDiv.attr("")
					var ratingDiv = $("<div>");
					ratingDiv.addClass("rating");
					ratingDiv.text("image rating: " + results[i].rating);
					contentDiv.append(imgDiv);
					contentDiv.append(ratingDiv);
					$("#gifsGoHere").prepend(contentDiv);
				}
			});
		});
		function displayButtons(){
			$("#buttonsGoHere").empty();
			for (var i = 0; i < topics.length; i++){
				var button = $("<button>");
				button.addClass("subject");
				button.attr("data-name", topics[i]);
				button.text(topics[i]);
				$("#buttonsGoHere").append(button);
			}
		};
		$("#gifsGoHere").on("click", ".chosenGif", function(){
			var state = $(this).attr("data-state");
			var animated = $(this).attr("data-animate");
			var notAnimated = $(this).attr("data-still");
			if (state === "still"){
				$(this).attr("data-state", "animate");
				$(this).attr("src", animated);
			}
			if (state === "animate"){
				$(this).attr("data-state", "still");
				$(this).attr("src", notAnimated);
			}
		});
	});
		