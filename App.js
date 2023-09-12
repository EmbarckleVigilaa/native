import React, { useState} from "react";
import {
	View,
	Text,
	TextInput,
	FlatList,
    Pressable,
	StyleSheet,
} from "react-native";

const App = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [date,setDate] = useState("");
	const [editIndex, setEditIndex] = useState(-1);

	const handleAddTask = () => {
		if(!task||!date){
			alert("Date and Task both need to be filled!!")
		}
		if (task && date) {
			if (editIndex!==-1) {
				const updatedTasks = [...tasks];
				updatedTasks[editIndex] = {date,task};
				setTasks(updatedTasks);
				setEditIndex(-1);
			} else {
				setTasks([...tasks,{date,task}]);
			}
				
			setTask("");
			setDate("");
		}
	};

	const handleEditTask = (index) => {
		const taskToEdit = tasks[index];
		setTask(taskToEdit.task);
		setDate(taskToEdit.date);
		setEditIndex(index);
	};

	const handleDeleteTask = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks.splice(index, 1);
		setTasks(updatedTasks);
	};

	const renderItem = ({ item, index }) => (
		<View style={styles.task}>
			<Text
				style={styles.itemList}>Date:{item.date}</Text>
				<Text
				style={styles.itemList}>Task:{item.task}</Text>
			<View
				style={styles.taskButtons}>
				<Pressable
					onPress={() => handleEditTask(index)}>
					<Text
						style={styles.editButton}>Edit</Text>
				</Pressable>
				<Pressable
					onPress={() => handleDeleteTask(index)}>
					<Text
						style={styles.deleteButton}>Delete</Text>
				</Pressable>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
    	
			<Text style={styles.title}>ToDo App</Text>
				<TextInput
				style={styles.input}
				placeholder="Enter Date"
				value={date}
				onChangeText={(text) => setDate(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Enter Task"
				value={task}
				onChangeText={(text) => setTask(text)}
			/>
			<Pressable
				style={styles.addButton}
				onPress={handleAddTask}>
				<Text style={styles.addButtonText}>
					{editIndex !== -1 ? "Update Task" : "Add Task"}
				</Text>
			</Pressable>
			<FlatList
				data={tasks}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
		marginTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
    color:"blue",
	},
	input: {
		borderWidth: 3,
		borderColor: "grey",
		padding: 10,
		marginBottom: 10,
		borderRadius: 10,
		fontSize: 18,
	},
	addButton: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 15,
	},
	task: {
		justifyContent: "space-between",
		marginBottom: 15,
		fontSize: 18,
	},
	itemList: {
		fontSize: 19,
	},
	taskButtons: {
		flexDirection: "row",
	},
	editButton: {
		marginRight: 10,
		color: "green",
		fontWeight: "bold",
		fontSize: 18,
	},
	deleteButton: {
		color: "red",
		fontWeight: "bold",
		fontSize: 18,
	},
});

export default App;
