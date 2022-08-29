/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to MovieZone. Say a Movie Name to know about it.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
// BASIC MOVIE INFORMATION GETTER FUNCTION
const MovieIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MovieIntent';
    },
    async handle(handlerInput) {
        var speakOutput = '';
        
        // Add Slot data later below!!!
        // Edit Below
        // --------------------------------------
        const movieName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'Movie');
        // --------------------------------------
        
        const repromptOutput = "Would you like to know about another movie?";
        console.log(repromptOutput)
       
            const options = {
                  method: 'GET',
                  url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
                  params: {q: `${movieName}`},
                  headers: {
                    'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
                    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
                  }
            };
            
            const axios = require("axios");
            await axios.request(options).then(function (response) {
                // 	console.log(response.data);
                	const data = response.data.d[0];
                	// Name of the Show
              const nameOfTheShow = data.l;
              
              // TV Series or Movie
              const showType = data.q;
              
              // Actors Information
              const actorsInfo = data.s;
              
              // Release Date
              const releaseDate = data.y;
            
              speakOutput = `${nameOfTheShow} is a ${showType}. Some of the cast members of the ${showType} are ${actorsInfo}. ${nameOfTheShow} was initally release on ${releaseDate}`;
        
            console.log(speakOutput)
                }).catch(function (error) {
                	console.error(error);
            });
        
              return handlerInput.responseBuilder
            .speak(repromptOutput)
            
            .reprompt(repromptOutput)
            .withShouldEndSession(false)
            .getResponse(); 

        
    }
};

// MOVIE QUOTES
const MovieQuotesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MovieQuotesIntent';
    },
    async handle(handlerInput) {
        var speakOutput = '';
        var movieID = '';
        
        // Add Slot data later below!!!
        // Edit Below
        // --------------------------------------
        const movieName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'movie');
        // --------------------------------------
        
        const repromptOutput = "Would you like to know about another movie?";
        const axios = require("axios");

        const options = {
          method: 'GET',
          url: 'https://online-movie-database.p.rapidapi.com/title/find',
          params: {q: movieName},
          headers: {
            'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
        	const data = response.data.results[0];
      // console.log(data);
      let ID = data.id;
      console.log(ID);
       movieID = ID.slice(7, 16);
      
    
    });
      // SECOND PART - To Get Quotes
    const option = {
      method: 'GET',

      url: 'https://online-movie-database.p.rapidapi.com/title/get-quotes',
      params: {tconst: movieID},
      headers: {
        'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };
    await axios.request(option).then(function (response) {
    	console.log(response.data);
    	const data = response.data.quotes;
        const length = data.length;
        const index = Math.floor(Math.random() * length);

        const quoteString = data[index].lines[0].text;
        speakOutput = quoteString;
    })
      
        
             return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse(); 
    }
    };
    
// MOVIE PLOT
const MoviePlotIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MoviePlotIntent';
    },
    async handle(handlerInput){
        // Add Slot data later below!!!
        // Edit Below
        // --------------------------------------
        const movieName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'movie');
        // --------------------------------------
        const repromptOutput = 'Try Another Movie Name.';
        let movieID = '';
        var speakOutput = '';
        const axios = require('axios');
        // axios content to get movie id.
        const options = {
          method: 'GET',
          url: 'https://online-movie-database.p.rapidapi.com/title/find',
          params: {q: movieName},
          headers: {
            'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
        	const data = response.data.results[0];
            // console.log(data);
            let ID = data.id;
            console.log(ID);
            movieID = ID.slice(7, 16);
        });
        // Part 2 of axios content to get plot

        const option = {
              method: 'GET',
              url: 'https://online-movie-database.p.rapidapi.com/title/get-plots',
              params: {tconst: movieID},
              headers: {
                'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
              }
            };

        await axios.request(option).then(function (response) {
	            console.log(response.data);
	            const data = response.data;
	            const title = data.base.title;
	            const plot = data.plots[0].text;
	            speakOutput = `${title} Plot: ${plot}`; 
	            
                }).catch(function (error) {
	        console.error(error);
    });
        // return statement
        
        return(
            handlerInput.responseBuilder.speak(speakOutput).reprompt(repromptOutput).getResponse()
            )
        
    }
};

// MOVIE TAGLINES
const MovieTaglineIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MovieTaglinesIntent';
    },
    async handle(handlerInput){
        // Add Slot data later below!!!
        // Edit Below
        // --------------------------------------
        const movieName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'movie');
        // --------------------------------------
        const repromptOutput = 'Try Another Movie Name.';
        let movieID = '';
        var speakOutput = '';
        const axios = require('axios');
        // axios content to get movie id.
        const options = {
          method: 'GET',
          url: 'https://online-movie-database.p.rapidapi.com/title/find',
          params: {q: movieName},
          headers: {
            'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
        	const data = response.data.results[0];
            // console.log(data);
            let ID = data.id;
            console.log(ID);
            movieID = ID.slice(7, 16);
        });
        // Part 2 of axios content to get plot
        const option = {
              method: 'GET',
              url: 'https://online-movie-database.p.rapidapi.com/title/get-taglines',
              params: {tconst: movieID},
              headers: {
                'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
              }
            };

        await axios.request(option).then(function (response) {
        	console.log(response.data);
        	const data = response.data.taglines;
        	const length = data.length;
        	const index = Math.floor(Math.random() * length);
        	speakOutput = `Here is a Famous Tagline of ${movieName}. ${data[index]}`;
        }).catch(function (error) {
        	console.error(error);
        });
        
        // RETURN STATEMENT
        
        return(
            handlerInput.responseBuilder.speak(speakOutput).reprompt(repromptOutput).getResponse()
            )
        
    }
};

// TOP RATED MOVIES
const TopRatedMovieIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TopRatedMovieIntent';
    },
    async handle(handlerInput) {
        
        const repromptOutput = 'Ask about another movie.';
        let showID = '';
        
        var speakOutput = 'default string';
        const axios = require("axios");

        const options = {
          method: 'GET',
          url: 'https://online-movie-database.p.rapidapi.com/title/get-top-rated-movies',
          headers: {
            'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
        	console.log(response.data);
        	const data = response.data;
        	
        	const length = data.length;
        	const index = Math.floor(Math.random() * length);
        	const movieIdString = data[index].id;
        	
        	 showID = movieIdString.slice(7,17);
        }) // End of 1st Axios
        
        const option = {
              method: 'GET',
              url: 'https://online-movie-database.p.rapidapi.com/title/get-overview-details',
              params: {tconst: `${showID}`, currentCountry: 'US'},
              headers: {
                'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
              }
            };
            
        await axios.request(option).then(function (response) {
            	console.log(response.data);
            	const data = response.data;
            	
            	const plotAuthor = data.plotSummary.author;
            	const plotSummaryText = data.plotSummary.text;
            	const plotRatings = data.ratings.rating;
            	
            	const movieTitle = data.title.title;
            	const movieReleaseDate = data.title.year;
            	const titleType = data.title.titleType;
            	
                 speakOutput = `${movieTitle} was released on ${movieReleaseDate}. The ${titleType} author is ${plotAuthor}.Summary of the plot is as follows ${plotSummaryText}. Rating of ${movieTitle} is ${plotRatings}.`;
                 console.log(speakOutput);
            })
        return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse()
        )
        }
        
        
};

// POPULAR MOVIES BY GENRES
const PopularMoviesByGenreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PopularMoviesByGenreIntent';
    },
    async handle(handlerInput){
        
       const repromptOutput = 'Ask about another genre.';
        
        var speakOutput = '';
        // var speakOutput = 'Please Select a genre. Few examples are Horror, Adventure, Action, & Thriller.';
        const axios = require("axios");
        
        // Get Slot Value;
        const genre = Alexa.getSlotValue(handlerInput.requestEnvelope, 'genre');
        
        let movieID = '';
        
        const options = {
          method: 'GET',
          url: 'https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre',
          params: {genre: `${genre}`, limit: '10'},
          headers: {
            'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        };
        
        // Getting Data
        await axios.request(options).then(function (response) {
        	console.log(response.data);
        	const data = response.data;
        	const length = data.length;
        	const index = Math.floor(Math.random() * length);
        	let movieString = data[0];
        	 movieID = movieString.slice(7,17);
        }) 
        
        const option = {
                  method: 'GET',
                  url: 'https://online-movie-database.p.rapidapi.com/title/get-overview-details',
                  params: {tconst: `${movieID}`, currentCountry: 'US'},
                  headers: {
                    'X-RapidAPI-Key': 'd4117f4ebfmsh91d0587b7f46617p139468jsna3ae0f84d0d9',
                    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
                }
        	}
        	
	    await axios.request(option).then(function (response) {
    	console.log(response.data);
    	const data = response.data;
    	console.log(data);
    	const movieTitle = data.title.title;
    	console.log(movieTitle);
    	const movieReleaseDate = data.title.year;
    	console.log(movieReleaseDate);
    	const titleType = data.title.titleType;
    	
    	// Script This!!!
         speakOutput = `${movieTitle} was released on ${movieReleaseDate}.`;
         console.log(speakOutput);
        })
        
       return (
            handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse()
        )
    }
        
};

// Upcoming Movies





const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        MovieIntentHandler,
        TopRatedMovieIntentHandler,
        PopularMoviesByGenreIntentHandler,
        MovieQuotesIntentHandler,
        MoviePlotIntentHandler,
        MovieTaglineIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();