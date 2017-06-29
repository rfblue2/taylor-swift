/*
Returns song information.  Uses mocks during dev
*/

const mockSonglist = [
  'Clean',
  'Cold As You',
  'Come Back... Be Here',
  'Come In With The Rain',
  'Dear John',
  'Enchanted',
  'Everything Has Changed',
  'Fearless',
  'Fifteen'
];

const mockLyrics = {
  'clean': 'The drought was the very worst\nWhen the flowers that we\'d grown together died of thirst',
  'cold-as-you': 'You have a way of coming easily to me\nAnd when you take you take the very best of me',
  'come-back-be-here': 'You said in a simple way\nFour AM the second day\nHow strange that I don\'t know you at all',
  'come-in-with-the-rain': 'I could go back to every laugh\n But I don\'t wanna go there anymore\nAnd I know all the steps up to your door',
  'dear-john': 'Long were the nights when\nmy days once revolved around you.\nCounting my footsteps\nPraying the floor won\'t fall through',
  'enchanted': 'There I was again tonight\nForcing laughter faking smiles\nSame old tired lonely place',
  'everything-has-changed': 'All I knew this morning when I woke\nis I know something now know something now know something now I didn\'t before',
  'fearless': 'There\'s something \'bout the way the street looks when it\'s just rained',
  'fifteen': 'You take a deep breath\nAs you walk through the doors\nit\'s the morning of your very first day'
};

class SongRepo {

  getSongList(callback, error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      callback(mockSonglist);
    } else {
      fetch('/api/songs')
        .then(response => {
          console.log("songlist request received");
          if (!response.ok) throw new Error(`status ${response.status}`);
          return response.json();
        }).then(callback).catch(error);
    }
  }

  getSongLyrics(song, callback, error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      var lyrics = mockLyrics[song];
      if (lyrics === undefined || lyrics === null) error(song + ' not found');
      else callback(lyrics);
    } else {
      fetch('/api/songs/' + song)
        .then(response => {
          console.log("lyrics request for " + song)
          if (!response.ok) throw new Error(`status ${response.status}`);
          return response.text()
        }).then(callback).catch(error);
    }
  }
}

export default SongRepo;
