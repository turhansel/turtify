import { useAppContext } from '../context/store';
import { millisToMinutesAndSeconds } from '../lib/time';
import useSpotify from '../hooks/useSpotify';

function SongItem({ song, index }) {
	const spotifyApi = useSpotify();
	const store = useAppContext();

	const { isPlaying, currentSongId, setCurrentSongId, setIsPlaying } = {
		isPlaying: store.globalStates.isPlaying,
		currentSongId: store.globalStates.currentSongId,
		setCurrentSongId: store.globalFunctions.setCurrentSongId,
		setIsPlaying: store.globalFunctions.setIsPlaying,
	};

	const playSong = () => {
		if (spotifyApi.getAccessToken()) {
			setCurrentSongId(song?.track?.id);
			setIsPlaying(true);
			spotifyApi.play({
				uris: [`spotify:track:${song.track.id}`],
				// uris: [song.track.id],
			});
		}
	};
	console.log("isPlaying",isPlaying)
	console.log("currentSongId",currentSongId)

	return (
		<div
			className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-800 rounded-lg cursor-pointer select-none	'
			onDoubleClick={playSong}
		>
			<div className='flex items-center space-x-4 '>
				<p>{index}</p>
				{/* TODO: we can add hover effect with play icon */}
				<img
					className='h-10 w-10'
					src={song.track.album.images[0].url}
					alt=''
				/>
				<div>
					<p className='w-36 lg:w-64 truncate text-white'>
						{song.track.name}
					</p>
					<p className='w-40'>{song.track.artists[0].name}</p>
				</div>
			</div>

			<div className='flex items-center justify-between ml-auto md:ml-0'>
				<p className='w-52 hidden md:inline'>{song.track.album.name}</p>
				<p>{millisToMinutesAndSeconds(song.track.duration_ms)}</p>
			</div>
		</div>
	);
}

export default SongItem;
