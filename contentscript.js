(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === "enterPictureInPicture") {
      const video = document.querySelector("video");
      console.log(video);

      if (!video) {
        console.log("No video element found!");
        sendResponse("no video");
        return true;
      }

      if (document.pictureInPictureElement) {
        document.exitPictureInPicture().catch(error => {
          console.log("Error while exiting Picture-in-Picture:", error);
        });
      } else {
        video.requestPictureInPicture().catch(error => {
          console.log("Error while entering Picture-in-Picture:", error);
        });

        navigator.mediaSession.setActionHandler("nexttrack", () => {
          video.currentTime += 10;
        });

        navigator.mediaSession.setActionHandler("previoustrack", () => {
          video.currentTime -= 10;
        });

        navigator.mediaSession.setActionHandler("play", () => {
          const playBtn = document.querySelector('button[data-purpose="play-button"]');
          if (playBtn) {
            playBtn.click();
            console.log("Play button clicked");
          } else if (video.paused) {
            video.play().catch(() => {});
            console.log("Fallback: video.play()");
          } else {
            try {
              myMediaElement?.play();
              console.log("Fallback: myMediaElement.play()");
            } catch (e) {}
          }
        });

        navigator.mediaSession.setActionHandler("pause", () => {
          const pauseBtn = document.querySelector('button[data-purpose="pause-button"]');
          if (pauseBtn) {
            pauseBtn.click();
            console.log("Pause button clicked");
          } else if (!video.paused) {
            video.pause();
            console.log("Fallback: video.pause()");
          } else {
            try {
              myMediaElement?.pause();
              console.log("Fallback: myMediaElement.pause()");
            } catch (e) {}
          }
        });
      }
    }

    sendResponse("done");
    return true;
  });
})();
