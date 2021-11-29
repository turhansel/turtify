import {
	HomeIcon,
	SearchIcon,
	LibraryIcon,
	PlusCircleIcon,
	RssIcon,
	HeartIcon,
} from '@heroicons/react/outline';
import { useEffect } from 'react';
import { useAppContext } from '../context/store';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
	const spotifyApi = useSpotify();
	const store = useAppContext();

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getUserPlaylists().then((data) => {
				store.globalFunctions.setPlaylists(data.body.items);
			});
		}
	}, [store.globalStates.session, spotifyApi]);

	// const renderPlaylists = (data) => {
	// 	return data?.map((playlist) => (
	// 		<p
	// 			key={playlist.id}
	// 			className='cursor-pointer hover:text-white truncate'
	// 			onClick={() =>
	// 				store.globalFunctions.onClickPlaylist(playlist.id)
	// 			}
	// 		>
	// 			{playlist.name}
	// 		</p>
	// 	));
	// };
	return (
		<div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen max-w-[240px]'>
			<div className='space-y-4'>
				<button
					className='flex items-center space-x-2 hover:text-white'
					onClick={() => store.globalFunctions.signOut()}
				>
					<p>Logout</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<HomeIcon className='h-5 w-5' />
					<p>Home</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<SearchIcon className='h-5 w-5' />
					<p>Search</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<LibraryIcon className='h-5 w-5' />
					<p>Your Library</p>
				</button>
				<hr className='border-t-[0.1px] border-gray-900' />

				<button className='flex items-center space-x-2 hover:text-white '>
					<PlusCircleIcon className='h-5 w-5' />
					<p>Create Playlist</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<HeartIcon className='h-5 w-5' />
					<p>Liked Songs</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<RssIcon className='h-5 w-5' />
					<p>Your Episodes</p>
				</button>
				<hr className='border-t-[0.1px] border-gray-900' />
				{/* {renderPlaylists(store?.globalStates?.playlists)} */}
				{store?.globalStates?.playlists.map((playlist) => (
					<p
						key={playlist.id}
						className='cursor-pointer hover:text-white truncate'
						onClick={() =>
							store.globalFunctions.onClickPlaylist(playlist.id)
						}
					>
						{playlist.name}
					</p>
				))}
				{console.log("handle:",store?.globalStates?.playlists)}
			</div>
		</div>
	);
}

export default Sidebar;
