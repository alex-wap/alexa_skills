
var APP_ID = undefined;
var FACTS = [
    'scary',
    'sounds'
];
var AlexaSkill = require('./AlexaSkill');

var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    handleNewFactRequest(response);
};

Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say play scary sounds, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = {
  speech: "<speak>"
    + "<audio src='https://s3-us-west-1.amazonaws.com/alexa-skill-alex/airhorns.mp3'/>"
    + "</speak>",
  type: AlexaSkill.speechOutputType.SSML
  };
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = {
  speech: "<speak>"
    + "<audio src='https://s3-us-west-1.amazonaws.com/alexa-skill-alex/airhorns.mp3'/>"
    + "</speak>",
  type: AlexaSkill.speechOutputType.SSML
  };
        response.tell(speechOutput);
    }
};

function handleNewFactRequest(response) {

    var speechOutput = {
  speech: "<speak>"
    + "<audio src='https://s3-us-west-1.amazonaws.com/alexa-skill-alex/airhorns.mp3'/>"
    + "</speak>",
  type: AlexaSkill.speechOutputType.SSML
  },
  repromptOutput = {
    speech: "This is the reprompt text. ",
    type: AlexaSkill.speechOutputType.PLAIN_TEXT
  };

    response.tell(speechOutput).shouldEndSession(true);
    var cardTitle = "Scary Sounds";
    response.tellWithCard(speechOutput, cardTitle, speechOutput).shouldEndSession(true);
}

exports.handler = function (event, context) {
    // Create an instance of scary sounds
    var fact = new Fact();
    fact.execute(event, context);
};

