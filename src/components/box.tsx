import { motion } from 'framer-motion'
import { Entity } from '../interfaces'

export default ({ entity, i }: { entity: Entity; i: number }) => {
	const { box, label } = entity
	const { xmax, xmin, ymax, ymin } = box
	return (
		<motion.div
			key={i}
			layoutId={i.toString()}
			style={{
				position: 'absolute',
				left: `${xmin}%`,
				top: `${ymin}%`,
				width: `${xmax - xmin}%`,
				height: `${ymax - ymin}%`,
				border: '1px solid red',
				zIndex: 1,
				fontSize: '.7rem',
				cursor: 'pointer',
			}}
			onClick={() => {
				console.log(entity)
			}}
		>
			{label}
		</motion.div>
	)
}
