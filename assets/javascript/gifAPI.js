//ORIGINAL BUTTONS
var topics = ["leonardo", "donatello", "michaelangelo", "rafael", "splinter"];



//MAIN FUNCTION////////////////////////////////////////////////////////////////////////////////////////////////////		
	$(document).ready(function(){
		//SHOW THE BUTTONS
		displayButtons();
		//ADD A TOPIC AND APPEND TO THE BUTTONS LIST
		$("#add-topic").on("click", function(event){
			event.preventDefault();
			/** Check if the input has any value */
			if ($("#gif-input").val().trim().length){
				/** If there is content in the input, add that topic as a button */
				addTopic();
			}
		});
		//CLICKING ON A BUTTON SEARCHES FOR THAT SUBJECT
		$("#buttonsGoHere").on("click", ".subject", function(){
			//GET SUBJECT INTEREST
			var subject = $(this).attr("data-name");
			makeAjaxCallForSubject(subject);
		});
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



	//FUNCTIONS TO CALL///////////////////////////////////////////////////////////////////////////////////////////////
	function addTopic(){
		var subject = $("#gif-input").val().trim();
			/** Push the subject to the topics */
			topics.push(subject);
			/** Refresh the buttons */
			displayButtons();
	};
	//FUNCTION TO DISPLAY THE BUTTONS
	function displayButtons(){
		/** Empty buttons so they won't add up */
		$("#buttonsGoHere").empty();
		//USE A FOR LOOP TO TRAVERSE THE BUTTON ARRAY AND DISPLAY
		for (var i = 0; i < topics.length; i++){
			/** Define a new button with the class subject, a data attribute and display the subject */
			var button = $("<button>").addClass("subject").attr("data-name", topics[i]).text(topics[i]);
			//DISPLAY THE BUTTON
			$("#buttonsGoHere").append(button);
		}
	};
	function makeAjaxCallForSubject(subject){
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
			createGifContent(results);
		});
	};
	function createGifContent(results){
		/** For only 10 elements */
		for (var i = 0; i < 10; i++){
			/** Define a div with a content class */
			var contentDiv = $("<div>").addClass("content");
			/** Define a div to hold the gifs */
			var imgDiv = $("<img>")
				  .addClass("chosenGif")
				  .attr("src", results[i].images.fixed_height_still.url)
				  .attr("data-still", results[i].images.fixed_height_still.url)
				  .attr("data-animate", results[i].images.fixed_height.url)
				  .attr("data-state", "still");
			/** Define a div to hold the rating of the image */
			var ratingDiv = $("<div>")
					 .addClass("rating")
					 .text("image rating: " + results[i].rating);
			/** To the main content div, add the image div and the rating div */
			contentDiv.append(imgDiv).append(ratingDiv);
			/** Display the contentDiv that holds the gifs */
			$("#gifsGoHere").prepend(contentDiv);
		}
	};