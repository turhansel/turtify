import {
	HeartIcon,
	TrendingUpIcon,
	VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';

import {
	RewindIcon,
	SwitchHorizontalIcon,
	FastForwardIcon,
	PlayIcon,
	PauseIcon,
	ReplyIcon,
	VolumeUpIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
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
				setIsPlaying(data.body?.item?.id);
				// buraya bak
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !currentSongId) {
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentSongId, spotifyApi, session]);

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
				<RewindIcon className='player-button' />

				{isPlaying ? (
					<PauseIcon className='player-button w-10 h-10' />
				) : (
					<PlayIcon className='player-button w-10 h-10' />
				)}

				<FastForwardIcon className='player-button' />
				<TrendingUpIcon className='player-button' />
			</div>
		</div>
	);
}

export default Player;
