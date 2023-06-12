import { motion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useMeasure, useTimeoutFn } from 'react-use'
import { useStore } from '../../store'
import styles from './.module.css'
import { circle, M } from './paths'

export const spring = {
	type: 'spring',
	stiffness: 13,
	damping: 12,
	mass: 10,
}

export default () => {
	const [ref, { width }] = useMeasure<HTMLDivElement>()
	const loaded = useStore((s) => s.loaded)
	const pathLength = useSpring(0, spring)

	useTimeoutFn(() => {
		if (!loaded) {
			pathLength.set(1)
		}
	}, 100)

	useEffect(() => {
		if (loaded) {
			pathLength.set(1)
			console.log('asg')
		}
	}, [loaded, pathLength])

	const color = '#ffffff'

	return (
		<div ref={ref} className={styles.logo} aria-label="Loading">
			<div style={{ cursor: 'pointer', transform: 'translateY(2px)' }}>
				<svg
					fill="#00000000"
					width={width}
					height={width}
					viewBox="0 0 40 40"
					xmlns="http://www.w3.org/2000/svg"
				>
					<motion.path
						stroke={color}
						strokeWidth="2px"
						d={circle}
						style={{ pathLength }}
					/>
					<motion.path
						fill="#1f1f1f"
						stroke={color}
						strokeWidth="2px"
						d={M}
						style={{ pathLength }}
					/>
				</svg>
			</div>
		</div>
	)
}
