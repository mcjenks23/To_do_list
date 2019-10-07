import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

export function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        props.history.push("/app");
      }
      //do something
    });

    return unsubscribe;
  }, [props.history]);

  const handleSignIn = () => {
    console.log(email);
    console.log(password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        //navigate to new screen
      })
      .catch(error => {
        alert(error.message);
        console.log(error);
        //display error message
      });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="h6">
            Sign In
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "400px", marginTop: 30, padding: "40px" }}>
          <TextField
            fullWidth={true}
            placeholder={"email"}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            fullWidth={true}
            placeholder="password"
            type={"password"}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            style={{ marginTop: 20 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              alignItems: "center"
            }}
          >
            <div>
              Don't have an account? <Link to="/signup">Sign up!</Link>
            </div>

            <Button color="primary" variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        props.history.push("/app");
      }
      //do something
    });

    return unsubscribe;
  }, [props.history]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        console.log("error");
        alert(error.message);
        //display error message
      });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="h6">
            Sign Up
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "400px", marginTop: 30, padding: "40px" }}>
          <TextField
            fullWidth={true}
            placeholder="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            fullWidth={true}
            placeholder="password"
            type={"password"}
            style={{ marginTop: 20 }}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              alignItems: "center"
            }}
          >
            <div>
              Already have an account? <Link to="/">Sign In!</Link>
            </div>

            <Button color="primary" variant="contained" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleMenuOpen = () => {
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
        //display error message
      });
  };

  if (!user) {
    return <div />;
  }

  const sideList = side => (
    <div>
      <List>
        {["Te Amo"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            News
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi! {user.email}
          </Typography>

          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer_open} onClose={handleCloseDrawer}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
