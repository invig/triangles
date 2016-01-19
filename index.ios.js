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
	TouchableHighlight
} = React;

var Episode = require('./episode.ios.js');

var MOCKED_PODCAST_LIST = [
	{
		id:1,
		title:'73: My Perfect World',
		image:'https://triangles.lab82.com/ssl_proxy.php?url=http%3A%2F%2Fturing.cool%2Fcover-art-1400.png',
		description:'ReactCasts.tv Introducing new open-source tools for the Elixir community Apache Thrift',
    url: 'http://fdlyr.co/d/quit/cdn.5by5.tv/audio/broadcasts/quit/2015/quit-082.mp3'
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
    url: 'http://fdlyr.co/d/quit/cdn.5by5.tv/audio/broadcasts/quit/2015/quit-082.mp3'
	}
];

var triangles = React.createClass({
	_handleBackButtonPress: function() {
    this.props.navigator.pop();
	},
	render: function () {
		return (
			<NavigatorIOS
        style={styles.container}
        initialRoute = {{
          component: UnplayedPodcasts,
          title: 'Unplayed',
          passProps: { episodeList: MOCKED_PODCAST_LIST },
        }}
      />
    );
	}
});
AppRegistry.registerComponent('triangles', () => triangles);

var UnplayedPodcasts = React.createClass({
	getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds.cloneWithRows(this.props.episodeList),
		};
	},
	episodeSelected: function(episodeData) {
		this.props.navigator.push({
			component: Episode,
			title: episodeData.title,
			passProps: {episodeData: episodeData}
		});
	},
  render: function() {
    return (
			<ListView
        dataSource = {this.state.dataSource}
        renderRow =
        {
        (rowData) =>
        <TouchableHighlight
        underlayColor="#aaa"
        activeOpacity={0.8}
        style={styles.rowHighlight}
        onPress={() => this.episodeSelected(rowData)}
        >
        <View>
        <EpisodeRow
        imageUrl={rowData.image}
        title={rowData.title}
        episodeId={rowData.id} />
        </View>
        </TouchableHighlight>
        }
      />
    );
  }
});
AppRegistry.registerComponent('UnplayedPodcasts', () => UnplayedPodcasts);

var EpisodeRow = React.createClass({
	render: function() {
		return (
			<View style={styles.episodeRow}>
				<Image style={styles.episodeImage} source={{uri: this.props.imageUrl}} />
				<Text style={styles.episodeTitle}>{this.props.title}</Text>
			</View>
		);
	}
});
AppRegistry.registerComponent('Episode', () => Episode);

var styles = StyleSheet.create({
	container: {
		flex: 3,
		backgroundColor: '#333'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	rowHighlight: {
	},
	episodeRow: {
		flexDirection:'row',
		height:80,
    borderBottomColor: '#eee',
    borderBottomWidth: 0.5
	},
	episodeImage: {
		height:80,
		width:80
	},
	episodeTitle:{
		flex: 2,
		padding: 10,
    fontSize: 14
	}
});
