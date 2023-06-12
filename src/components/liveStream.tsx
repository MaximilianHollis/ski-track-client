import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { useStore } from '../store'

export default ({ height, width }: { height: number; width: number }) => {
	const playerRef = useRef(null)
	const setLoaded = useStore((state) => state.setLoaded)

	useEffect(() => {
		// Set up the Video.js player
		if (!playerRef.current) {
			return
		}

		const player = videojs(playerRef.current, {
			controlBar: {
				playToggle: true,
			},
		})

		// Set the source of the player to the HLS playlist URL
		player.src({
			src: 'https://63034befe01e5.streamlock.net:444/whitetailkmc/whitetailkmc.stream/playlist.m3u8',
			type: 'application/x-mpegURL',
		})

		// Start playback
		player.play()
	}, [])

	return (
		<video
			ref={playerRef}
			autoPlay
			muted
			className="video-js vjs-default-skin"
			width={width}
			height={height}
			onLoadedData={() => setLoaded(true)}
		>
			<source
				src="https://63034befe01e5.streamlock.net:444/whitetailkmc/whitetailkmc.stream/media_w1912564016_6671.ts"
				type="application/x-mpegURL"
			/>
			<source
				src="https://63034befe01e5.streamlock.net:444/whitetailkmc/whitetailkmc.stream/playlist.m3u8"
				type="application/x-mpegURL"
			/>
		</video>
	)
}
