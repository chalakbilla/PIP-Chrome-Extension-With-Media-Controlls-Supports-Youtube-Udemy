chrome.action.onClicked.addListener((tab) => {
    // Execute the content script in all frames of the current tab
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id, allFrames: true },
        files: ['contentscript.js'],
      },
      () => {
        // The content script has been injected
        // Send a message to the content script to enter Picture-in-Picture mode
        chrome.tabs.sendMessage(tab.id, { message: "enterPictureInPicture" });
      }
    );
  });
  