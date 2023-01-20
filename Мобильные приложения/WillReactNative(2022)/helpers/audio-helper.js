import React, {useEffect} from 'react';
import SoundPlayer from 'react-native-sound';


/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export function useAudioHelper(request = {
  listSounds: [],
  isLogStatus: false,
  timeRate: 15,
}) {
  const [listSounds, setListSounds] = React.useState(request.listSounds);
  const [timeRate, setTimeRate] = React.useState(request.timeRate); // seconds
  const [status, setStatus] = React.useState('loading');
  const [errorMessage, setErrorMessage] = React.useState('');

  const [currentTime, setCurrentTime] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (player && status === 'play') {
        player.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
        })
      }
    }, 100);

    return () => clearInterval(interval);
  });

  const [duration, setDuration] = React.useState(0);
  const [player, setPlayer] = React.useState(null);


  function initialize() {
    setStatus('loading');
    if (listSounds.length > 0) {
      if (player) {
        player.release();
      }

      const callback = (error, player) => {
        if (error) {
          setStatus('error');
          setErrorMessage(error.message);
        } else {
          setStatus('success');
          setErrorMessage('');
        }
        player.setSpeed(1);
        setDuration(player.getDuration());
        play(player);
      };

      const currentAudio = listSounds[index];
      // If the audio is a 'require' then the second parameter must be the callback.
      SoundPlayer.setCategory('Playback');
      let newPlayer = new SoundPlayer(currentAudio.path, (error) => callback(error, newPlayer));
      setPlayer(newPlayer);
    }
  }

  const [index, setIndex] = React.useState(Math.floor(Math.random() * listSounds.length));
  const isShuffle = true;

  useEffect(() => {
    if (player) {
      initialize()
    }
  }, [index]);

  function playComplete(isEnd) {
    if (isEnd === true) {
      next()
    }
  }

  const play = (player) => {
    if (player) {
      player.play(playComplete);
      setStatus('play');
    } else {
      initialize()
    }
  };


  const pause = () => {
    if (player) {
      player.pause();
      setStatus('pause');
    }
  };


  const stop = () => {
    if (player) {
      player.stop();
      setStatus('stop');
    }
  };

  const remove = () => {
    if (player) {
      setStatus('pause')
      player.pause()
    }
  };
  const reset = () => {
    if (player) {
      player.release()
    }
  }

  const [remainingIndices, setRemainingIndices] = React.useState([...Array(request.listSounds.length).keys()].filter(value => value !== index));
  React.useEffect(() => {
    setRemainingIndices(remainingIndices.filter(value => value !== index));
  }, [index]);

  function next() {
    if (player && request.listSounds.length) {
      player.release();
      setCurrentTime(0);
      setStatus('next');
      if (isShuffle === true) {
        let newRemainingIndices = shuffleArray(remainingIndices.length === 0 ? [...Array(request.listSounds.length).keys()].filter(value => value !== index) : remainingIndices);
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      }
    }
  }

  function previous() {
    if (player && index > 0) {
      player.release();
      setCurrentTime(0);
      setStatus('previous');
      setIndex(index - 1);
      if (isShuffle === true) {
        let newRemainingIndices = shuffleArray(remainingIndices.length === 0 ? [...Array(request.listSounds.length).keys()].filter(value => value !== index) : remainingIndices);
        setRemainingIndices(newRemainingIndices);
        setIndex(newRemainingIndices[0]);
      }
    }
  }

  function seekToTime(seconds) {
    if (player) {
      player.setCurrentTime(seconds);
      setCurrentTime(seconds);
    }
  }

  return {
    play: () => play(player),
    pause,
    stop,
    next,
    previous,
    seekToTime,
    status,
    setStatus,
    setPlayer,
    duration,
    currentTime,
    timeRate,
    isShuffle,
    errorMessage,
    remove,
    setDuration,
    reset
  }
}
