'use strict';
var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight
} = React;

var AudioPlayer = require('react-native').NativeModules.AudioPlayer;

var Player = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      episode: null
    }
  },
  componentDidMount: function() {
    AudioPlayer.initWithURL(this.props.url);
  },
  render: function() {
    return (
      <View style={styles.player}>
        <Text style={styles.playerText}>Play file at url: {this.props.url}</Text>
      </View>
      );
  }

})

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
