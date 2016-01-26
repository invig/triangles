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

		this.props.AudioPlayer.loadedUrl((url) => {
			if (this.props.episode.Episode.url !== url) {
				this.props.AudioPlayer.initWithURL(this.props.episode.Episode.url);
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
						<EpisodeView podcastTitle={this.props.episode.Podcast.title} title={this.props.episode.Episode.title} image={this.props.episode.Podcast.artwork_url} />
						<PlayerButton buttonText='Pause' buttonAction={this.props.AudioPlayer.pause} />
					</View>
				);
			} else {
				return (
	        <View style={styles.player}>
						<EpisodeView podcastTitle={this.props.episode.Podcast.title} title={this.props.episode.Episode.title} image={this.props.episode.Podcast.artwork_url} />
						<PlayerButton buttonText='Play' buttonAction={this.props.AudioPlayer.play} />
	        </View>
	        );
			}
    }
  }
}

class EpisodeView extends React.Component {
	render () {
		return (
			<View style={styles.episodeView}>
				<Text style={styles.episodeTitle}>{this.props.podcastTitle}</Text>
				<Text style={styles.playerText}>{this.props.title}</Text>
					<Image
						style={styles.image}
						source={{uri: this.props.image}}
						resizeMode='contain'
					/>
			</View>
		);
	}
}

class PlayerButton extends React.Component {
	render() {
		return (
			<TouchableHighlight
				underlayColor="#aaa"
				activeOpacity={0.8}
				onPress={() => this.props.buttonAction()}
				style={[
					 styles.button,
					 this.props.buttonText == 'Play' && styles.playButton,
					 this.props.buttonText == 'Pause' && styles.pauseButton,
				 ]}
			>
				<Text style={[
					 styles.buttonText,
					 this.props.buttonText == 'Play' && styles.playButtonText,
					 this.props.buttonText == 'Pause' && styles.pauseButtonText,
				 ]}>{this.props.buttonText}</Text>
			</TouchableHighlight>
		);
	}
}

var styles = StyleSheet.create({
  player: {
		flex: 1,
    alignSelf: 'stretch',
  	marginTop: 20,
		marginBottom: 48
  },
	episodeView: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems:'center',
		justifyContent:'center',
		flexDirection: 'column'
	},
	episodeTitle: {
		textAlign: 'center',
		color: '#333',
		fontSize: 30,
		fontWeight: '300',
		padding: 10
	},
  playerText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 18,
		fontWeight: '300',
		padding: 10
  },
	image: {
		flex: 1,
		alignSelf: 'stretch'
	},
	button: {
		padding:10,
		margin: 10,
		borderRadius: 4
	},
	buttonText: {
		textAlign: 'center',
		color: '#333',
		fontSize: 30,
	},
	playButton: {
		backgroundColor: '#666',
	},
	playButtonText: {
		color: '#fff',
	},
	pauseButton: {
		backgroundColor: '#eee'
	}
});

module.exports = Player;
