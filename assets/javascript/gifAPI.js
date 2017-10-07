//MAIN FUNCTION////////////////////////////////////////////////////////////////////////////////////////////////////		
	$(document).ready(function(){
		//ORIGINAL BUTTONS
		var topics = ["pozole", "tamales", "enchiladas", "sopes", "chile con carne", "birria"];
		//SHOW THE BUTTONS
		displayButtons();
		//ADD A TOPIC AND APPEND TO THE BUTTONS LIST
		$("#add-topic").on("click", function(event){
			event.preventDefault();
			var subject = $("#gif-input").val().trim();
			topics.push(subject);
			displayButtons();
		});
		//CLICKING ON A BUTTON SEARCHES FOR THAT SUBJECT
		$("#buttonsGoHere").on("click", ".subject", function(){
			//GET SUBJECT INTEREST
			var subject = $(this).attr("data-name");
			//DEFINE APIKEY AND URL TO SEARCH
			var APIKey = "QSE9U2nEeYIyI2u6ycZObppAgfOV8mLD";
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=" + APIKey + "&limit=10";
			//AJAX CALL
			$.ajax({
				url: queryURL,
				method: "GET"
			})
			//WHEN DONE CALLING AJAX
			.done(function(response){
				//DEFINE A VARIABLE TO CAPTURE ALL RETRIEVED DATA
				var results = response.data;
				//DISPLAY THE DATA USING A FOR LOOP THAT TRAVERSES THE RESPONSE DATA
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
		//FUNCTION TO DISPLAY THE BUTTONS
		function displayButtons(){
			//EMPTY BUTTON SECTION TO RESPAWN THE BUTTONS
			$("#buttonsGoHere").empty();
			//USE A FOR LOOP TO TRAVERSE THE BUTTON ARRAY AND DISPLAY
			for (var i = 0; i < topics.length; i++){
				//CREATE A BUTTON ELEMENT
				var button = $("<button>");
				button.addClass("subject");
				button.attr("data-name", topics[i]);
				//ADD THE TEXT INTO THE BUTTON
				button.text(topics[i]);
				//DISPLAY THE BUTTON
				$("#buttonsGoHere").append(button);
			}
		};
		//UPON CLICKING A GIF ANIMATE IT, OR MAKE IT STAND STILL
		$("#gifsGoHere").on("click", ".chosenGif", function(){
			//CHECK THE STATE OF THE GIF
			var state = $(this).attr("data-state");
			var animated = $(this).attr("data-animate");
			var notAnimated = $(this).attr("data-still");
			//IF NOT ANIMATED, ANIMATE THE GIF
			if (state === "still"){
				$(this).attr("data-state", "animate");
				$(this).attr("src", animated);
			}
			//IF ANIMATED, MAKE THE GIF STAY STILL
			if (state === "animate"){
				$(this).attr("data-state", "still");
				$(this).attr("src", notAnimated);
			}
		});
	});
		