
process.env.token = 'insert token here';
var edge = require('edge');
var Botkit = require('botkit');
var hello = edge.func('./lib/test.dll');

var helloWorld = edge.func(function () {/*
    async (input) => { 
        return ".NET Welcomes " + input.ToString(); 
    }
*/});


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});


controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello.");
});

controller.hears(['attach'],['direct_message','direct_mention'],function(bot,message) {

  var attachments = [];
  var attachment = {
    title: 'This is an attachment',
    color: '#FFCC99',
    fields: [],
  };

  attachment.fields.push({
    label: 'Field',
    value: 'A longish value',
    short: false,
  });

  attachment.fields.push({
    label: 'Field',
    value: 'Value',
    short: true,
  });

  attachment.fields.push({
    label: 'Field',
    value: 'Value',
    short: true,
  });

  attachments.push(attachment);

  bot.reply(message,{
    text: 'See below...',
    attachments: attachments,
  },function(err,resp) {
    console.log(err,resp);
  });
});

controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message,function(err,convo) {
    convo.say('Heard ya');
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say('Private reply!');
  });

});

controller.hears(['edgejs'],['direct_message','direct_mention','mention'],function(bot,message) {
    helloWorld('JavaScript', function (error, result) {
        if (error) throw error;
        bot.reply(message, result);
    });
});

controller.hears(['assembly'],['direct_message','direct_mention','mention'],function(bot,message) {
    hello(null, function (error, result) {
        if (error) throw error;
        bot.reply(message, result);
    });
});