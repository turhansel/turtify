import {
	HomeIcon,
	SearchIcon,
	LibraryIcon,
	PlusCircleIcon,
	RssIcon,
	HeartIcon,
} from '@heroicons/react/outline';
import { useAppContext } from '../context/state';

function Sidebar() {
	const context = useAppContext();
	console.log(context.playlistDetail.playlistId);

	const renderPlaylists = (data) => {
		return data.map((playlist) => (
			<p
				key={playlist.id}
				className='cursor-pointer hover:text-white'
				onClick={() => context.functions.onClickPlaylist(playlist.id)}
			>
				{playlist.name}
			</p>
		));
	};
	return (
		<div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen'>
			<div className='space-y-4'>
				<button
					className='flex items-center space-x-2 hover:text-white'
					onClick={() => context.functions.signOut()}
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
				{renderPlaylists(context?.playlistDetail?.playlists)}
			</div>
		</div>
	);
}

export default Sidebar;
