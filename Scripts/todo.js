import { auth, db } from "./firebase.js";
import {
  ref,
  push,
  set,
  update,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// // Elements
// const newTodoInput = document.getElementById("new-todo-input");
// const addTodoBtn = document.getElementById("add-todo-btn");
// const todoList = document.getElementById("todo-list");

// let userPath = null;
// // Local state cache (key -> text)
// let todos = {}; // { id: { text } }
// let todosRef = null;

// // Add new todo
// if (addTodoBtn) {
//   addTodoBtn.addEventListener("click", async () => {
//     const text = (newTodoInput?.value || "").trim();
//     if (!text) {
//         alert("Please enter a todo.");
//         return;
//     }
//     try {
//         const newRef = push(todosRef);
//         await set(newRef, { text });
//         newTodoInput.value = "";
//     } catch (err) {
//         console.error("Create failed:", err);
//         alert("Failed to add todo.");
//     }
//   });
// }

const SetScore= async(Path, Score)=>{
    const newRef = push( ref(db, Path));
    await set(newRef, {Score});
}
export { SetScore };


// const GetScore = (Path)=>{
//     todosRef = ref(db, Path);
//     onValue(todosRef, (snapshot) => {
//         todos = snapshot.val() || {};
        
//     });
// };
// Watch auth, then attach realtime listener
// auth.onAuthStateChanged((user) => {
//   if (!user) return;
//   // Path: /users/{uid}/todos
//   userPath = `users/${user.uid}/todos`
//   todosRef = ref(db, `users/${user.uid}/todos`);
//   onValue(todosRef, (snapshot) => {
//     todos = snapshot.val() || {};
//     console.log(todos)
//     renderTodos();
//   });
// });