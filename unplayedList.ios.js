'use strict';
var React = require('react-native');

var {
  AppRegistry,
	ListView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight
} = React;

var UnplayedPodcasts = React.createClass({
	getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds.cloneWithRows(this.props.episodeList),
		};
	},

	episodeSelected: function(episodeData) {
    this.props.selectEpisode(episodeData);

		// this.props.navigator.push({
		// 	component: Episode,
		// 	title: episodeData.title,
		// 	passProps: {episodeData: episodeData, audioPlayer: audioPlayer}
		// });
	},
  render: function() {
    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow =  {
        (rowData) =>
        <TouchableHighlight
        underlayColor="#aaa"
        activeOpacity={0.8}
        style={styles.rowHighlight}
        onPress={() => this.episodeSelected(rowData)}
        >
        <View>
        <EpisodeRow
        imageUrl={rowData.Podcast.artwork_url}
        title={rowData.Episode.title}
        episodeId={rowData.Episode.id} />
        </View>
        </TouchableHighlight>
        }
      />
    );
  }
});

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

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333'
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

module.exports = UnplayedPodcasts, EpisodeRow;
