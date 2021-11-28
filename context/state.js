import { useSession, signOut } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';

const AppContext = createContext();

export function AppWrapper({ children }) {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getUserPlaylists().then((data) => {
				setPlaylists(data.body.items);
			});
		}
	}, [session, spotifyApi]);

	const [playlists, setPlaylists] = useState([]);
	const [playlistId, setPlaylistsId] = useState({
		key: 'playlistId',
		default: '7illAp125ks33u0IgECL1P',
	});

	const onClickPlaylist = (id) => {
		setPlaylistsId(id);
	};

	const store = {
		playlistDetail: {
			playlists,
			playlistId,
		},
		functions: {
			onClickPlaylist,
			signOut,
		},
	};

	return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
