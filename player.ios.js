'use strict';
var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	NativeModules,
  NativeAppEventEmitter
} = React;

var { AudioPlayer } = NativeModules;

// TODO: Background audio

class Player extends React.Component {
	constructor(props) {
		super(props);

		var listener = NativeAppEventEmitter.addListener(
			'PlayerEvent', (event) => this.processEvents(event)
		);

		this.state = {
			loaded : false,
			loadedUrl: null
		}
	}

	processEvents(event) {
		if (event.hasOwnProperty('playingState')) {
			this.props.setPlaying(event.playingState);
		}

		if (event.hasOwnProperty('loadedState')) {
			this.setState({loaded: Boolean(event.loadedState), loadedUrl: event.playingUrl});
		}
	}

  render () {
		// If we've selected a different episode. Play it!
		console.log('Player render ....  playing? ' + this.props.playing);

		AudioPlayer.loadedUrl((url) => {
			if (this.props.episode.url !== url) {
				AudioPlayer.initWithURL(this.props.episode.url);
			}
		});

		if (! this.state.loaded) {
      return (
        <View style={styles.player}>
          <Text style={styles.playerText}>Loading...</Text>
        </View>
        );
    } else {
			if (this.props.playing) {
				return (
					<View style={styles.player}>
					<Text style={styles.playerText}>{this.props.episode.title}</Text>
						<TouchableHighlight
							underlayColor="#aaa"
							activeOpacity={0.8}
							onPress={() => AudioPlayer.pause()}
						>
							<Text style={[styles.button, styles.pauseButton]}>Pause</Text>
						</TouchableHighlight>
					</View>
				);
			} else {
				return (
	        <View style={styles.player}>
						<Text style={styles.playerText}>{this.props.episode.title}</Text>
						<TouchableHighlight
							underlayColor="#aaa"
							activeOpacity={0.8}
							onPress={() => AudioPlayer.play()}
						>
							<Text style={[styles.button, styles.playButton]}>Play</Text>
						</TouchableHighlight>

	        </View>
	        );
			}
    }
  }
}

var styles = StyleSheet.create({
  player: {
    alignSelf: 'stretch',
    padding: 10
  },
  playerText: {
		padding: 20,
    textAlign: 'center',
    color: '#333',
    fontSize: 30,
  },
	button: {
		padding:20,
		textAlign: 'center',
		color: '#333',
		fontSize: 30,
	},
	playButton: {
		backgroundColor: '#009a49'
	},
	pauseButton: {
		backgroundColor: '#eee'		
	}
});

module.exports = Player;
