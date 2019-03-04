//********************************************************************************
//DOGET.GS
//*********************************************************************************
//This file contains the doGet() function, which serves up the app, 
//responding to get requests with query strings as appropriate to dish out
//new pages.
//*********************************************************************************

function doGet(e) {
  var template, faviconUrl, tName;
  faviconUrl = "https://dl.dropboxusercontent.com/s/79q9a1xy2148unf/SpeedScore3Icon.ico"
  tName = "Idaho Speedgolf Championship";
  if (e.parameter.player) { //player scoring
    template = HtmlService.createTemplateFromFile('html/PlayerScore');
    template.data = {playerId: e.parameter.player};
    return template
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle("SpeedScore LIVE: Score for " + e.parameter.player)
    .setFaviconUrl(faviconUrl);
  } if (e.parameter.page && e.parameter.page == "leaderbaord") { //show leaderboard
    //TO DO: Process additional query parameters to sort leaderboard and show/hide banner
    return HtmlService.createHtmlOutputFromFile('html/Leaderboard')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setTitle("SpeedScore LIVE Leaderboard")
      .setFaviconUrl(faviconUrl);
  } else if (Object.keys(e.parameter).length == 0) { //no query params; display login page
    template = HtmlService.createTemplateFromFile('html/LoginUI');
    return template
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle("Welcome to SpeedScore LIVE")
    .setFaviconUrl(faviconUrl);
  } else { //unrecognized query params 
    return HtmlService.createHtmlOutputFromFile('html/UnrecognizedRequest')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle("SpeedScore: Unrecognized Request")
    .setFaviconUrl(faviconUrl);
}
  
 //include: Allows us to include files using templated HTML, per Google's best practices 
//(https://developers.google.com/apps-script/guides/html/best-practices)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}     

