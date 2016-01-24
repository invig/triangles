'use strict';
var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
  NativeAppEventEmitter
} = React;

// TODO: Try an get Xcode to pass down some more information about playing status....

var Player = React.createClass({
	//TODO: Listen to notifications of playing state change.
	//this.props.setPlaying(Boolean(event.nativeEvent.playingState));
	var audioPlayer = require('react-native').NativeModules.AudioPlayer;
	var subscription = NativeAppEventEmitter.addListener(
		'PlayerEvent',
		(event) => console.log(event.name)
	);

	getInitialState: function () {
		return {
			loaded : false,
			loadedUrl: null
		};
	},

	// Is iOS already playing a file when we loaded?
  componentDidMount: function() {
    audioPlayer.isPlaying((playing) => {
      console.log(playing);
      if (playing == true) {
        console.log('already playing');
				audioPlayer.loadedUrl((url) => {
					console.log('Loaded URL is: ' + url);
					this.setState({loadedUrl : url});
				});
      } else {
        console.log('loading new file');
        audioPlayer.initWithURL(this.props.episode.url);
      }
      this.setState({loaded: true});
			if (this.props.setPlaying) {
				this.props.setPlaying(playing);
			}
    });
  },


  pressedPlay:function() {
    console.log('play');
    audioPlayer.play();
		audioPlayer.loadedUrl((url) => {
			console.log('Loaded URL is: ' + url);
			this.setState({loadedUrl : url});
		});
  },

	pressedPause:function() {
		console.log('pause');
		audioPlayer.pause();
	},


  render: function() {
		// If we've selected a different episode. Play it!
		if (this.props.episode.url !== this.state.loadedUrl) {
			audioPlayer.initWithURL(this.props.episode.url);
		}

    console.log('Player render');
    console.log(this.state);
    console.log(this.props.playing);

		if (! this.state.loaded) {
      return (
        <View style={styles.player}>
          <Text style={styles.playerText}>Loading...</Text>
        </View>
        );
    } else {
			if (this.props.playing) {
				<View style={styles.player}>
					<TouchableHighlight
						underlayColor="#aaa"
						activeOpacity={0.8}
						onPress={() => this.pressedPause()}
					>
						<Text style={styles.playerText}>Pause</Text>
					</TouchableHighlight>
				</View>
			} else {
				return (
	        <View style={styles.player}>
	          <TouchableHighlight
	            underlayColor="#aaa"
	            activeOpacity={0.8}
	            onPress={() => this.pressedPlay()}
	          >
	            <Text style={styles.playerText}>Play file at url: {this.props.episode.url}</Text>
	          </TouchableHighlight>
	        </View>
	        );
			}
    }
  }
});

var styles = StyleSheet.create({
  player: {
    alignSelf: 'stretch',
    padding: 10
  },
  playerText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 30,
  }
});

module.exports = Player;
