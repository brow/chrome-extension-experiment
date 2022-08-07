// background.js

chrome.runtime.onInstalled.addListener(() => {
  // Disable action by default
  chrome.action.disable();

  // Enable action on GitHub Pull Requests
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              originAndPathMatches: 'https://github.com/.*/pull/\d*',
            }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowAction() ]
      }
    ]);
  });

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      console.log(request);
      if (request.login)
        sendResponse({hello: request.login});
    }
  );
});
