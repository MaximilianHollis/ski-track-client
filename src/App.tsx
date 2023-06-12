import { useEffectOnce, useMeasure } from 'react-use'
import { io } from 'socket.io-client'
import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import styles from './.module.css'
import { Entity } from './interfaces'
import Chart from './components/chart'
import Box from './components/box'
import { useStore } from './store'
import Logo from './components/logo'
import LiveStream from './components/liveStream'

function App() {
	const [entities, setEntities] = useState<Entity[]>([])
	const [ref, { height, width }] = useMeasure<HTMLDivElement>()
	useEffectOnce(() => {
		const socket = io('localhost:3000', {
			// Options
		})
		socket.on('test', console.log)
		socket.on('data', setEntities)
		return () => {
			socket.disconnect()
		}
	})
	const loaded = useStore((state) => state.loaded)
	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>asf</div>

			<div className={styles.container}>
				<span
					style={{
						textAlign: 'center',
					}}
				>
					<h3>Whitetail Express Queue</h3>
					<h6>
						{' '}
						There are now {
							entities.filter((e) => e.label === 'person').length
						}{' '}
						skiiers queued up to get on the lift.
					</h6>
				</span>
				<div ref={ref} className={styles.player}>
					<AnimatePresence>
						{loaded ? (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ delay: 1, duration: 0.5 }}
							>
								{entities.map((entity, i) => (
									<Box key={Math.random()} entity={entity} i={i} />
								))}
							</motion.div>
						) : null}
					</AnimatePresence>
					<div style={{ width, height, position: 'relative' }}>
						{width && <LiveStream width={width} height={height} />}
						<AnimatePresence>
							{loaded ? null : (
								<motion.div
									initial={{ opacity: 1 }}
									animate={{ opacity: 1 }}
									transition={{
										delay: 0.25,
									}}
									exit={{ opacity: 0 }}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
										background: '#000000',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<div
										style={{
											zIndex: 2,
											width: '200px',
											height: '200px',
											borderRadius: '10px',
										}}
									>
										<Logo />
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
				<Chart />
			</div>

			<div className={styles.card}>asf</div>

			<p className={styles['read-the-docs']} />
		</div>
	)
}

export default App
