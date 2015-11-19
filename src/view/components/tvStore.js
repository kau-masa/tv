var _ = require('lodash');
var Reflux = require('reflux');

var youtube = require('youtube-iframe-player');
var youtubePlayer;
youtube.init(function() {
  youtubePlayer = youtube.createPlayer('yPlayer', {
    width: '125',
    height: '65',
    videoId: 'yaFc8Sadk-I',
    playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'showinfo': 0, 'rel': 0},
  });
});

exports = module.exports = Reflux.createStore({
  setState: function(value) {
    this.attribute.state = value;
    switch (this.attribute.state) {
      case 'on':
        document.getElementById('yPlayer').style.visibility = '';
        youtubePlayer.playVideo();
        youtubePlayer.setLoop(true);
        break;
      case 'off':
        youtubePlayer.stopVideo();
        document.getElementById('yPlayer').style.visibility = 'hidden';
        break;
      default:
      break;
    }
    this.trigger(this.attribute.state);
  },
  decreaseVolume: function() {
    this.setVolume(this.attribute.volume - 1);
  },
  increaseVolume: function() {
    this.setVolume(this.attribute.volume + 1);
  },
  setVolume: function(value) {
    this.attribute.volume = value;
    if (value < 0) {
      this.attribute.volume = 0;
    }
    else if (value > 100) {
      this.attribute.volume = 100;
    }
    youtubePlayer.setVolume(this.attribute.volume);
    document.getElementById('tvVolume').style.visibility = 'visible';
    this.trigger(this.attribute.volume);
  },
  setPause: function(value) {
    this.attribute.pause = value;
    value ? youtubePlayer.pauseVideo() : youtubePlayer.playVideo();
    this.trigger(this.attribute.pause);
  },
  getState: function() {
    return this.attribute.state;
  },
  getVolume: function() {
    return this.attribute.volume;
  },
  getPause: function() {
    return this.attribute.pause;
  },
  setAttr: function(attributeName, attributeValue) {
    switch (attributeName) {
      case 'volume':
        this.setVolume(attributeValue);
        setTimeout(function() {document.getElementById('tvVolume').style.visibility = 'hidden'}, 2000);
        break;
      case 'state':
        this.setState(attributeValue);
        break;
      case 'pause':
        this.setPause(attributeValue);
        break;
      default:
      break;
    }
  },
  getInitialState: function() {
    this.attribute = {
      state: 'off',
      volume: 50,
      pause: false
    }
    return this.attribute;
  }
});
