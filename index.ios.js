/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
	ListView,
	NavigatorIOS,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
  TabBarIOS
} = React;

var UnplayedPodcasts = require('./unplayedList.ios.js');
var Episode = require('./episode.ios.js');
var Player = require('./player.ios.js');

var MOCKED_PODCAST_LIST = [
	{
		id:1,
		title:'73: My Perfect World',
		image:'https://triangles.lab82.com/ssl_proxy.php?url=http%3A%2F%2Fturing.cool%2Fcover-art-1400.png',
		description:'ReactCasts.tv Introducing new open-source tools for the Elixir community Apache Thrift',
    url: 'http://www.podtrac.com/pts/redirect.mp3/traffic.libsyn.com/connected/Connected_018.mp3'
	},
	{
		id:2,
		title:'191: Elm and Function Programming with Richard Feldman',
		image:'https://triangles.lab82.com/ssl_proxy.php?url=http%3A%2F%2Ficebox.5by5.tv%2Fimages%2Fbroadcasts%2F52%2Fcover.jpg',
		description:'This week we talked about Elm and Functional Programming with Richard Feldman from NoRedInk. Elm labeled itself "the best of functional programming...',
    url: 'http://fdlyr.co/d/quit/cdn.5by5.tv/audio/broadcasts/quit/2015/quit-082.mp3'

	},
	{
		id:3,
		title:'a16z Podcast: Software is What Distinguishes the Hardware Winners',
		image:'https://triangles.lab82.com/ssl_proxy.php?url=http%3A%2F%2Fi1.sndcdn.com%2Favatars-000073120599-46q7im-original.jpg',
		description:'Smartphone components have become a kind of Lego kit for all kinds of consumer technology. Cameras, sensors, and batteries all get mixed and matche...',
    url: 'http://www.podtrac.com/pts/redirect.mp3/traffic.libsyn.com/upgrade/Upgrade_041.mp3'
	}
];

var triangles = React.createClass({
	_handleBackButtonPress: function() {
    this.props.navigator.pop();
	},

  getInitialState: function() {
    // TODO: Find background audio and playing status?
    // TODO: Always have the next item playing, never have a non-current episode.

    return {
      currentEpisode: {},
      playing: false,
      selectedTab: 'currentlyPlaying'
    }
  },

  setPlaying: function(playing) {
    console.log('set playing ' + playing);
    this.setState({playing: playing});
  },

  selectEpisode: function(episode) {
    this.setState({currentEpisode: episode, selectedTab:'currentlyPlaying' });
  },

  _renderCurrentlyPlaying: function() {
    console.log(this.state);
    return(
      <Player episode={this.state.currentEpisode} playing={this.state.playing} setPlaying={this.setPlaying} />
    );
  },

  _renderUnplayedPodcasts: function(episodes) {
    return (
      <NavigatorIOS
        style = {styles.container}
        initialRoute = {{
          component:UnplayedPodcasts,
          title: 'Unplayed',
          passProps: {
            episodeList: episodes,
            selectEpisode: this.selectEpisode
          }
        }}
      />
    );
  },

	render: function () {
    console.log("App state: ");
    console.log(this.state);
		return (
      <TabBarIOS>

        <TabBarIOS.Item
          title="Playing"
          selected={this.state.selectedTab === 'currentlyPlaying'}
          onPress={() => {
          this.setState({selectedTab:'currentlyPlaying'});
        }}>
        {this._renderCurrentlyPlaying()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Unplayed"
          selected={this.state.selectedTab === 'unplayedPodcasts'}
          onPress={() => {
          this.setState({selectedTab:'unplayedPodcasts'});
        }}>
        {this._renderUnplayedPodcasts(MOCKED_PODCAST_LIST)}
        </TabBarIOS.Item>

      </TabBarIOS>
    );
	}
});

AppRegistry.registerComponent('triangles', () => triangles);


var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333'
	},
  text: {
    paddingTop: 20,
    flex: 1,
    textAlign: 'center',
    color: '#333',
    fontSize: 30,
  }
});
