import React, {useState, useContext} from "react";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import "./event.css";
import Navbar from "../navbar/Navbar"
import {EventContext} from "../../context/EventState";


const EventPage = () => {
	const [todo, setTodo] = useState("");
	const { addEvent } = useContext(EventContext);
	const { events } = useContext(EventContext);
	const { deleteEvent } = useContext(EventContext);

	const onChangeHandler = (e) => {
		setTodo(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		
		const newTodo = {
			event: todo,
			complete: false,
		};

	addEvent(newTodo);

		setTodo("");
	};

	return (
		<>
			<Navbar />
			<div className="event">
				<div className="event__input">
					<form onSubmit={onSubmitHandler}>
						<p className="event__header">Add Item</p>
						<input
							type="text"
							name="todo"
							value={todo}
							placeholder="Enter a todo event..."
							onChange={onChangeHandler}
						/>
						<button type="submit">Add</button>
					</form>
				</div>
				<div className="event__list">
					<ul className="list__item">
						<p className="event__header">Item List</p>
						{events.map((item) => (
							<li className="item">
								<div className="item__text">{ item.event }</div>
								<div className="item__button">
									<span className="item__button__icon">
										<FaPencilAlt className="button__icon" />
									</span>
									<span className="item__button__icon" onClick={()=> deleteEvent(item.id)}>
										<FaTrashAlt className="button__icon" />
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default EventPage;
