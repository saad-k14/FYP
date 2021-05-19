import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";
import requestServices from "../../services/RequestService";

const UpdateRequest = (props) => {
  const [category, setCategory] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [minprice, setMinprice] = React.useState("");
  const [maxprice, setMaxprice] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const id = props.match.params.id;
  React.useEffect(() => {
    requestServices.getSingleRequest(id).then((data) => {
      setCategory(data.category);
      setDetails(data.details);
      setMinprice(data.minprice);
      setMaxprice(data.maxprice);
      setDuration(data.duration);
    });
  }, []);
  return (
    <div className="UpdatepageforRequest">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="RequestHeading">
            <h1>Update This Request</h1>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <TextField
            label="Details"
            fullWidth
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          />
          <TextField
            label="Minprice"
            fullWidth
            value={minprice}
            onChange={(e) => {
              setMinprice(e.target.value);
            }}
          />
          <TextField
            label="Maxprice"
            fullWidth
            value={maxprice}
            onChange={(e) => {
              setMaxprice(e.target.value);
            }}
          />
          <TextField
            label="Duration"
            fullWidth
            value={category}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              requestServices
                .updateRequest(id, { category })
                .then((data) => {
                  console.log(data);
                  props.history.push("/requests");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateRequest;
