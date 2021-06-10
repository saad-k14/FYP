//to display a single category
import React from "react";
import { Grid, Button } from "@material-ui/core";
import requestServices from "../../services/RequestService";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SingleRequest = (props) => {
  const { request, onDelete, history } = props;
  console.log(props);
  return (
    <Grid item xs={4}>
      <h2>
        <>
          <div>{request.category}</div>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              console.log("navigate to update");
              history.push("/requests/update/" + request._id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              requestServices
                .deleteRequest(request._id)
                .then((data) => {
                  console.log(data);
                  onDelete();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Delete
          </Button>
        </>
      </h2>
      <p>{request.details}</p>
      <p>
        minprice = {request.minprice}$, maxprice = {request.maxprice}$
      </p>
      <p>days = {request.duration}</p>
      <hr />
    </Grid>
  );
};
//display the categories (done)
//link the titles to a new page with all the business users related to that category
//link the names of those business users to their profiles

export default withRouter(SingleRequest);
