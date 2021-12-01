import { useSession } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
	const { data: session, status } = useSession();

	const [playlists, setPlaylists] = useState([]);
	const [selectedPlaylist, setSelectedPlaylist] = useState([]);
	const [playlistId, setPlaylistsId] = useState('5HnhwlqhAOwOIA3tVO0Uso');
	const [currentSongId, setCurrentSongId] = useState();
	const [isPlaying, setIsPlaying] = useState(false);

	const onClickPlaylist = (data) => {
		setPlaylistsId(data.id);
	};

	const store = {
		globalStates: {
			playlists,
			playlistId,
			session,
			status,
			selectedPlaylist,
			currentSongId,
			isPlaying
		},
		globalFunctions: {
			onClickPlaylist,
			setPlaylists,
			setSelectedPlaylist,
			setCurrentSongId,
			setIsPlaying
		},
	};

	return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
