import { StyleSheet } from 'react-native'

export const TodoStyles = StyleSheet.create({
    // for Todolist.js
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flex: 1,
    },
    spinner: {
      color: '#fff'
    },
    list: {
      marginTop: 20,
      flex: 1,
    },
    // for AddTodo.js
    addTodoForm: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
    },
    addTodoInput: {
      fontSize: 16,
      flex: 7,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },

    // for orange button
    button: {
      paddingVertical: 6,
      backgroundColor: 'coral',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    },


    todoItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: "dashed",
      borderRadius: 1,
      borderRadius: 10,
    },
    task: {
      width: '80%',
    },
    taskText: {
      fontSize: 16,
    },
    todoButton: {
      marginLeft: 'auto',
      flexDirection: 'row',
    },

    editTodoInput: {
      fontSize: 16,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },

    // use for viewing date
    dateView: {
      flexDirection: 'row',
      flex: 1,
      marginBottom: 10,
      alignItems: 'center'
    },
    dateContainer: {
      padding: 3,
      paddingHorizontal: 5,
      fontSize: 16,
      marginRight: 6,
      borderWidth: 1,
    }
})