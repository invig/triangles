'use strict';
var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight
} = React;


var Player = React.createClass({
  render: function() {
    return (
      <View style={styles.player}>
        <Text style={styles.playerText}> Player </Text>
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
