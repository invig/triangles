'use strict';
var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	Image,
} = React;

var Player = require('./player.ios.js');

var Episode = React.createClass({
	render: function() {
		return (
			<View style={styles.episode}>
        <Text style={styles.episodeText}>{this.props.episodeData.title}</Text>
        <Player />
			</View>
		);
	}
});

var styles = StyleSheet.create({
  episode: {
    paddingTop: 64,
		flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
		backgroundColor: '#fff'
	},
  episodeText: {
    alignSelf: 'stretch',
  	color: '#333',
    textAlign: 'left',
  	fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 10,
  }
});


module.exports = Episode;
