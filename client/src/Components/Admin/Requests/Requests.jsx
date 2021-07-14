import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
  TextField,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import ToolBar from "../Common/ToolBar";
import TopBar from "../Common/TopBar";
import Drawer from "../Common/Drawer";
import useTable from "../Common/useTable";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../Common/Popup";
import Notification from "../Common/Notification";
import ConfirmDialog from "../Common/ConfirmDialog";
import Controls from "./../Common/FormControls";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../Services/categoriesService";
import {
  approveRequest,
  getAllRequests,
  getRequests,
  discardRequest,
} from "../../../Services/requestsService";
// import AddCategory from "./AddCategory";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "id", label: "#" },
  { id: "requestTitle", label: "Request Title" },
  { id: "category", label: "Category" },
  { id: "range", label: "Budget Range" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Requests = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [requests, setRequests] = React.useState([]);
  const [filterFn, setFilterFn] = React.useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = React.useState(false);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(requests, headCells, filterFn);

  const getData = async () => {
    const { data } = await getAllRequests();
    const requests = [...data];
    setRequests(requests);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.title.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const onIgnore = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await discardRequest(id).then(() => {
      getData();
      setNotify({
        isOpen: true,
        message: "Request has been discarded.",
        type: "warning",
      });
    });
  };

  const onApprove = async (id) => {
    await approveRequest(id).then(() => {
      getData();
      setNotify({
        isOpen: true,
        message: "Request has approved.",
        type: "success",
      });
    });
  };

  var i = 0;

  return (
    <div className={classes.container}>
      <TopBar handleDrawerToggle={handleDrawerToggle} />
      <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <main className={classes.content}>
        <ToolBar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="All Requests" />
              <Divider />
              <CardContent>
                <Toolbar>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Search Requests"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearch}
                  />
                </Toolbar>
                <TableContainer>
                  <TblContainer>
                    <TblHead />
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{++i}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            {item.minBudget} - {item.maxBudget}
                          </TableCell>
                          <TableCell>{item.status}</TableCell>
                          <TableCell>
                            <Controls.Button
                              disabled={item.status != "Pending" ? true : ""}
                              color="primary"
                              size="small"
                              text="approve"
                              onClick={() => {
                                onApprove(item._id);
                              }}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </Controls.Button>
                            <Controls.Button
                              disabled={item.status != "Pending" ? true : ""}
                              color="secondary"
                              text="Ignore"
                              size="small"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: "Are you sure to ignore this request?",
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => {
                                    onIgnore(item._id);
                                  },
                                });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TblContainer>
                  <TblPagination />
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Notification notify={notify} setNotify={setNotify}></Notification>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </main>
    </div>
  );
};

export default Requests;
