import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    title: "Work",
    completed: false,
    color: "#DDE8B9",
  },
  {
    id: "2",
    title: "Training",
    completed: false,
    color: "#E8D2AE",
  },
  {
    id: "3",
    title: "Guitar",
    completed: false,
    color: "#D7B29D",
  },
];

export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewTodo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false,
    };

    setItems([...items, newTodo]);
    setText("");
    setIsModalVisible(false);
  };

  const markItemCompleted = (item) => {
    const itemIndex = items.findIndex((current) => current.id === item.id);
    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], completed: true };
      setItems(updatedItems);
    }
  };

  //nested component
  const TodoItems = (props) => {
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: props.item.color }]}
        onPress={() => markItemCompleted(props.item)}
      >
        <Text
          style={
            props.item.completed ? styles.itemTextCompleted : styles.itemText
          }
        >
          {props.item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const addButton = () => {
    return (
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={styles.icon}>
          <Entypo name="add-to-list" size={24} color="black" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
            ></TextInput>
            <Button title="Add todo" onPress={addNewTodo}></Button>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />

      <FlatList
        style={styles.list}
        data={items}
        renderItem={({ item }) => <TodoItems item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={addButton}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: "gray",
  },
  list: {
    width: "100%",
  },
  item: {
    backgroundColor: "#6BD6",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemText: {
    color: "#ffff",
    textAlign: "center",
  },
  itemTextCompleted: {
    color: "#ffff",
    textDecorationLine: "line-through",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
