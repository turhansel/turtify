import { useEffect, useState } from 'react';
import { useAppContext } from '../context/store';
import useSpotify from './useSpotify';

function useSongInfo() {
	const spotifyApi = useSpotify();
	const store = useAppContext();

	const [songInfo, setSongInfo] = useState(null);
	const currentSongId = store.globalStates.currentSongId;

	const fetchSongInfo = async () => {
		if (currentSongId) {
			const response = await fetch(
				`https://api.spotify.com/v1/tracks/${currentSongId}`,
				{
					headers: {
						Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
					},
				}
			);
			const info = await response.json();
			setSongInfo(info);
		}
	};

	useEffect(() => {
		fetchSongInfo();
	}, [spotifyApi, currentSongId]);

	return songInfo;
}

export default useSongInfo;
