import { useSession, signOut } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
	const { data: session, status } = useSession();

	const [playlists, setPlaylists] = useState([]);
	const [playlistId, setPlaylistsId] = useState("7illAp125ks33u0IgECL1P");

	const onClickPlaylist = (id) => {
		setPlaylistsId(id);
	};

	const store = {
		globalStates: {
			playlists,
			playlistId,
			session,
			status,
		},
		globalFunctions: {
			onClickPlaylist,
			setPlaylists,
			signOut,
		},
	};

	return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
