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
  TabBarIOS,
  NativeModules
} = React;

const base64 = require('./node_modules/base-64/base64.js');

var UnplayedPodcasts = require('./unplayedList.ios.js');
var Episode = require('./episode.ios.js');
var Player = require('./player.ios.js');
var { AudioPlayer } = NativeModules;

var triangles = React.createClass({
	_handleBackButtonPress: function() {
    this.props.navigator.pop();
	},

  getData: function(url) {
    // TODO: Store auth data somewhere.
    // TODO: The server is going to need to be able to tell the app that something else is playing? Maybe?

    var username = '';
    var password = '';
    var auth = 'Basic ' +  base64.encode(username + ":" + password);

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth
      }
    }).then((response) => response.text()).then(
      (responseText) => {
      var episodes = JSON.parse(responseText)
      this.setState({
        downloadedEpisodeList : true,
        episodes : episodes.episodes,
        currentEpisode : episodes.current_episode
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  },

  getInitialState: function() {
    // TODO: Find background audio and playing status?
    // TODO: Always have the next item playing, never have a non-current episode.

    // var url = 'http://triangles.dev:8888/episodes/unplayed.json';
    var url = 'https://triangles.lab82.com/episodes/unplayed.json';

    console.log(this.getData(url));

    return {
      downloadedEpisodeList:false,
      episodes: {},
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
      <Player AudioPlayer={AudioPlayer} episode={this.state.currentEpisode} playing={this.state.playing} setPlaying={this.setPlaying} />
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
            episodeList: this.state.episodes,
            selectEpisode: this.selectEpisode
          }
        }}
      />
    );
  },

	render: function () {
    console.log("App state: ");
    console.log(this.state);

    if (this.state.downloadedEpisodeList === false) {
      return (
        <View><Text style={styles.text}> Loading </Text></View>
      )
    }

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
        {this._renderUnplayedPodcasts()}
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
