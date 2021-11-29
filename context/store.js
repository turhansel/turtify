import { useSession, signOut } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
	const { data: session, status } = useSession();

	const [playlists, setPlaylists] = useState([]);
	const [playlistId, setPlaylistsId] = useState("5HnhwlqhAOwOIA3tVO0Uso");
	const [selectedPlaylist, setSelectedPlaylist] = useState([]);

	const onClickPlaylist = (data) => {
		setPlaylistsId(data.id);
	};

	const store = {
		globalStates: {
			playlists,
			playlistId,
			session,
			status,
			selectedPlaylist
		},
		globalFunctions: {
			onClickPlaylist,
			setPlaylists,
			setSelectedPlaylist,
			signOut,
		},
	};

	return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
