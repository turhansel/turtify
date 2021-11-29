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
	
	const { data: session } = useSession();
	const [color, setColor] = useState(null);


	useEffect(() => {
		setColor(shuffleColor(colors));
	}, [store.globalStates.playlistId]);


	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi.getPlaylist(store.globalStates.playlistId).then((data) => {
				// store.globalFunctions.setPlaylists(data?.body)
				//TODO push to a different state and render
				console.log(data.body)
			});
		}
	}, [spotifyApi, store.globalStates.playlistId]);

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
			</section>
		</div>
	);
}

export default Main;
