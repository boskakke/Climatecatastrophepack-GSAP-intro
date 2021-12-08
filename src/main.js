import gsap from 'gsap'

const planetsTimeline = gsap.timeline({ repeat: 1 })

planetsTimeline.addLabel('start')

const circles = document.querySelectorAll('.circle')
const scaleUp = document.querySelectorAll('.scaleUp')

planetsTimeline
	.fromTo(
		'.line',
		{ yPercent: 20, opacity: 0 },
		{ duration: .75, yPercent: 0, opacity: 1, ease: 'back.out(2)', stagger: 0.2 },
		'<'
	)
	.to('.tilt-left', { skewX: '15deg', duration: 0.2 }, '>+=.1')
	.to('.tilt-right', { skewX: '-15deg', duration: 0.2 }, '<')
	.fromTo(
		scaleUp,
		{ scale: 0.8, opacity: 0 },
		{ scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'back.out(3)' },
		'<.4'
	)

circles.forEach((circle, i) => {
	const planet = circle.querySelector('.planet')
	const timeline = gsap.timeline({ repeat: -1 })
	const calcDuration = gsap.utils.random(10, 20, 1)
	const direction = i % 2 === 0 ? -360 : 360
	timeline
		.to(
			circle,
			{
				rotate: direction,
				duration: calcDuration,
				ease: 'none',
			},
			'<'
		)
		.to(
			planet,
			{
				rotate: direction * -1,
				duration: calcDuration,
				ease: 'none',
			},
			'<'
		)
	planetsTimeline.add(timeline, '<')
})


document.querySelector('.btn').addEventListener('click', () => {
	planetsTimeline.play('start')
})