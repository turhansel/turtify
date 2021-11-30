function SongItem({ key, song, index }) {
	return (
		<div className="grid grid-cols-2">
			<div className="flex items-center space-x-4">
				<p>{index}</p>
				<img
					className='h-10 w-10'
					src={song.track.album.images[0].url}
					alt=''
				/>
                <div>
                <p>{song.track.name}</p>
                <p>{song.track.artists[0].name}</p>
            </div>
			</div>
            

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline">{song.track.album.name}</p>
                <p>time</p>
            </div>
		</div>
	);
}

export default SongItem;
