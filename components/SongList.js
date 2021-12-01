import { useAppContext } from '../context/store';
import SongItem from './SongItem';

function SongList() {
	const store = useAppContext();
	const { selectedPlaylist } = { selectedPlaylist: store.globalStates.selectedPlaylist };

	return (
		<div className='px-8 flex flex-col space-y-1 pb-28 text-white'>
			{selectedPlaylist?.tracks?.items?.map((song, index) => (
				<SongItem key={song.track.id} song={song} index={index + 1} />
			))}
		</div>
	);
}

export default SongList;
