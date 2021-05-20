import React from "react";
import SingleRequest from "./SingleRequest";
import { Button, Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import requestServices from "../../services/RequestService";

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Requests = (props) => {
  const [requests, setRequests] = React.useState([]);
  const classes = useStyles();
  const getData = () => {
    requestServices
      .getRequests()
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //getData();
  React.useEffect(getData, []);
  const handleNewRequestClick = () => {
    console.log(props);
    props.history.push("/customer/sendrequests");
  };
  console.log("inside request component");
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <h1>Request</h1>
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addBtn}
          onClick={handleNewRequestClick}
        >
          <AddIcon />
        </Fab>
      </Grid>
      {requests.length == 0 ? (
        <p>there are no requests yet</p>
      ) : (
        <div className="Requests">
          <Grid container spacing={3}>
            {requests.map((requests, index) => (
              <SingleRequest
                key={index}
                request={requests}
                onDelete={getData}
              />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Requests;
