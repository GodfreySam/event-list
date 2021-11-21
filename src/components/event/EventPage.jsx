/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import "./event.css";
import Navbar from "../navbar/Navbar";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const EventPage = () => {
	const { user } = useContext(AuthContext);
	const [todo, setTodo] = useState("");
	const [allEvent, setAllEvent] = useState([]);

	const onChangeHandler = (e) => {
		setTodo(e.target.value);
	};

	const createEvent = async (e) => {
		e.preventDefault();

		const newTodo = {
			event: todo,
		};

		if (newTodo.event === "") return toast.error("Event entry can not be empty");

		/*	
		https://event-list-api.herokuapp.com/ 
		http://localhost:9000/
	*/
		try {
			let res = await axios.post("http://localhost:9000/api/v1/todo", newTodo, {
				headers: {
					"content-type": "application/json",
					"access-token": user.token,
				},
			});
			if (res.data.success) toast.success(res.data.msg);
			setAllEvent((prevTodo) => [res.data.newTodo, ...prevTodo]);
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
		setTodo("");
	};

	const getTodos = async () => {
		let res = await axios.get("http://localhost:9000/api/v1/todo", {
			headers: {
				"content-type": "application/json",
				"access-token": user.token,
			},
		});
		setAllEvent(res.data.allTodos);
	};

	useEffect(() => {
		getTodos();
	}, []);

	const deleteItem = async (id) => {
		try {
			let res = await axios.delete(
				`http://localhost:9000/api/v1/todo/delete/${id}`,
				{
					headers: {
						"content-type": "application/json",
						"access-token": user.token,
					},
				},
			);
			if (res.data.success) toast.success(res.data.msg);
			setAllEvent(allEvent.filter((event) => event._id !== id))
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
	};

	const [isPut, setIsPut] = useState(false);
	const [updatedItem, setUpdatedItem] = useState({ event: "", id: "" });

	const openUpdate = (id) => {
		setIsPut(true);
		setUpdatedItem((prevInput) => {
			return { ...prevInput, id: id };
		});
	};

	const updateItem = async (id) => {
		try {
			let res = await axios.put(
				`http://localhost:9000/api/v1/todo/put/${id}`,
				updatedItem,
				{
					headers: {
						"content-type": "application/json",
						"access-token": user.token,
					},
				},
			);
			if (res.data.success) toast.success(res.data.msg);
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
	};

	const handleUpdate = (e) => {
		setUpdatedItem((prevInput) => {
			return { ...prevInput, event: e.target.value };
		});
	};

	return (
		<>
			<Navbar />
			<div className="event">
				<div className="event__input">
					{!isPut ? (
						<form onSubmit={createEvent}>
							<p className="event__header">Add Item</p>
							<input
								type="text"
								name="todo"
								value={todo}
								placeholder="Type a todo event..."
								onChange={onChangeHandler}
							/>
							<button type="submit">Add</button>
						</form>
					) : (
						<form onSubmit={() => updateItem(updatedItem.id)}>
							<p className="event__header">Update Item</p>
							<input
								type="text"
								Z
								name="todo"
								value={updatedItem.event}
								placeholder="Update todo event..."
								onChange={handleUpdate}
							/>
							<button type="submit">Update</button>
						</form>
					)}
				</div>
				<div className="event__list">
					<ul className="list__item">
						{allEvent.length === 0 ? (
							<p className="event__header">No todo in Event List</p>
						) : (
							<p className="event__header">Item List</p>
						)}
						{allEvent.map((item) => (
							<li className="item" key={item._id}>
								<div className="item__text">{item.event}</div>
								<div className="item__button">
									<span
										className="item__button__icon"
										onClick={() => openUpdate(item._id)}
									>
										<FaPencilAlt className="button__icon pencil-icon" />
									</span>
									<span
										className="item__button__icon"
										onClick={() => deleteItem(item._id)}
									>
										<FaTrashAlt className="button__icon delete-icon" />
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
