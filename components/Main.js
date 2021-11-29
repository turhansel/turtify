import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/store';
import useSpotify from '../hooks/useSpotify';

const colors = [
	'from-indigo-500',
	'from-yellow-500',
	'from-purple-500',
	'from-red-500',
	'from-green-500',
	'from-blue-500',
	'from-pink-500',
];
const shuffleColor = (array) => {
	const length = array === null ? 0 : array.length;
	return length ? array[Math.floor(Math.random() * length)] : undefined;
};

function Main() {
	const store = useAppContext();
	const spotifyApi = useSpotify();

	//I destructed the store for easy access
	const { playlistId, selectedPlaylist, setSelectedPlaylist } = {
		playlistId: store.globalStates.playlistId,
		selectedPlaylist: store.globalStates.selectedPlaylist,
		setSelectedPlaylist: store.globalFunctions.setSelectedPlaylist,
	};

	const { data: session } = useSession();
	const [color, setColor] = useState(null);

	useEffect(() => {
		setColor(shuffleColor(colors));
	}, [playlistId]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi
				.getPlaylist(playlistId)
				.then((data) => {
					setSelectedPlaylist(data?.body);
					console.log(data?.body);
				})
				.catch((err) => console.log('something went wrong!!11', err));
		}
	}, [spotifyApi, playlistId]);

	console.log('playlistId', playlistId);
	return (
		<div className='flex-grow '>
			<header className='absolute top-5 right-8'>
				<div
					className='flex items-center bg-red-300 space-x-3 opacity-90 
                    hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 '
				>
					<img
						className='rounded-full w-10 h-10'
						src={session?.user?.image}
					/>
					<h2>{session?.user?.name}</h2>
					<ChevronDownIcon className='h-5 w-5' />
				</div>
			</header>
			<section
				className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 
                    text-white w-full padding-8`}
			>
				hello
				<img src={selectedPlaylist?.images?.[0]?.url} />
			</section>
		</div>
	);
}

export default Main;
