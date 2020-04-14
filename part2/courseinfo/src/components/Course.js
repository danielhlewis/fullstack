import React from 'react'

const Header = (props) => {
	return (
		<h2>{ props.course }</h2>
	)
}

const Content = ({parts}) => {
	return (
		<div>
		{ parts.map((x) => <Part key={x.id} part={x.name} exercises={x.exercises} />) }
		</div>
	)
}

const Part = (props) => {
	return (
		<p>
		{props.part} {props.exercises}
		</p>
	)
}

const Total = ({total}) => {
	return (
		<p>total of {total} exercises</p>
	)
}

const Course = ({ course }) => (
	<div>
		<Header course={course.name} />
		<Content parts={course.parts} />
		<Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
	</div>
)

export default Course