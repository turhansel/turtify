import {
	TrendingUpIcon,
	VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';

import {
	RewindIcon,
	SwitchHorizontalIcon,
	FastForwardIcon,
	PlayIcon,
	PauseIcon,
	VolumeUpIcon,
} from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../context/store';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';


function Player() {
	const spotifyApi = useSpotify();
	const songInfo = useSongInfo();

	const store = useAppContext();

	const [volume, setVolume] = useState(50);
	const {
		isPlaying,
		currentSongId,
		setCurrentSongId,
		setIsPlaying,
		session,
	} = {
		isPlaying: store.globalStates.isPlaying,
		currentSongId: store.globalStates.currentSongId,
		setCurrentSongId: store.globalFunctions.setCurrentSongId,
		setIsPlaying: store.globalFunctions.setIsPlaying,
		session: store.globalStates.session,
	};

	const fetchCurrentSong = () => {
		if (!songInfo) {
			spotifyApi.getMyCurrentPlayingTrack().then((data) => {
				console.log('now playing: ', data.body?.item);
				setCurrentSongId(data.body?.item?.id);
			});
			spotifyApi.getMyCurrentPlaybackState().then((data) => {
				setIsPlaying(data.body?.is_playing);
			});
		}
	};

	const handlePlayPause = () => {
		spotifyApi.getMyCurrentPlaybackState().then((data) => {
			if (data?.body?.is_playing) {
				spotifyApi.pause();
				setIsPlaying(false);
			} else {
				spotifyApi.play();
				setIsPlaying(true);
			}
		});
	};

	const handlePrevious = () => {
		spotifyApi.getMyCurrentPlaybackState().then((data) => {
			spotifyApi.skipToPrevious(data);
		});
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !currentSongId) {
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentSongId, spotifyApi, session]);

	// we don't need lodash! :D:D::D:D:D:D
	const debounce = (fnc, wait) => {
		let timer;
		return function (...args) {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => fnc(...args), wait);
		};
	};

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedAdjustVolume(volume);
		}
	}, [volume]);

	const debouncedAdjustVolume = useCallback(
		debounce((volume) => {
			spotifyApi.setVolume(volume).catch((err) => {});
		}, 300),
		[]
	);

	return (
		<div className='h-24 bg-gradient-to-b from-black to-gray-800 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
			{/* Left Side */}
			<div className='flex items-center space-x-4'>
				<img
					className='hidden md:inline h-10 w-10'
					src={songInfo?.album?.images?.[0]?.url}
					alt=''
				/>
				<div>
					<h2>{songInfo?.name}</h2>
					<p>{songInfo?.artists?.[0].name}</p>
				</div>
			</div>
			{/* Center */}
			<div className='flex items-center justify-evenly'>
				<SwitchHorizontalIcon className='player-button' />
				<RewindIcon className="player-button"/>

				{isPlaying ? (
					<PauseIcon
						onClick={handlePlayPause}
						className='player-button w-10 h-10'
					/>
				) : (
					<PlayIcon
						onClick={handlePlayPause}
						className='player-button w-10 h-10'
					/>
				)}

				<FastForwardIcon className='player-button' />
				<TrendingUpIcon className='player-button' />
			</div>
			{/* Right */}
			<div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
				<VolumeDownIcon
					onClick={() => volume > 0 && setVolume(volume - 10)}
					className='player-button'
				/>
				<input
					className='w-14 md:w-28'
					type='range'
					value={volume}
					onChange={(e) => setVolume(Number(e.target.value))}
					min={0}
					max={100}
				/>
				<VolumeUpIcon
					onClick={() => volume < 100 && setVolume(volume + 10)}
					className='player-button'
				/>
			</div>
		</div>
	);
}

export default Player;
