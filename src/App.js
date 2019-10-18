import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { auth, db } from "./firebase";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export function App(props) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("tasks")
        .onSnapshot(snapshot => {
          const user_tasks = snapshot.docs.map(qs => {
            const task = {
              id: qs.id,
              text: qs.data().text,
              complete: qs.data().complete
            };
            return task;
          });
          setTasks(user_tasks);
        });
    }

    return unsubscribe;
  }, [user]);

  const addTask = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .add({ text: newTask, checked: false });
    setNewTask("");
  };

  const deleteTask = task_id => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(task_id)
      .delete();
  };

  const changeCheck = (event, task_id) => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(task_id)
      .update({ checked: event });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            To Do List
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi! {user.email}
          </Typography>

          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Paper style={{ padding: "30px", maxWidth: "400px", width: "100%" }}>
          <Typography variant="h6">To Do List</Typography>
          <div style={{ display: "flex", marginTop: "30px" }}>
            <TextField
              fullWidth={true}
              onKeyPress={event => {
                if (event.key === "Enter") addTask();
              }}
              placeholder="Add a new task here"
              style={{ marginRight: "30px" }}
              value={newTask}
              onChange={e => {
                setNewTask(e.target.value);
              }}
            />
            <Button variant="contained" color="primary" onClick={addTask}>
              Add
            </Button>
          </div>
          <List>
            {tasks.map(value => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem key={value.id}>
                  <ListItemIcon>
                    <Checkbox
                      checked={value.checked}
                      onChange={(e, checked) => {
                        changeCheck(checked, value.id);
                      }}
                      //checked={checked.indexOf(value) !== -1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.text} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        deleteTask(value.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
    </div>
  );
}
