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
import AddCategory from "./AddCategory";
import axios from "axios";

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
  { id: "categoryName", label: "Category Name" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Categories = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [categoryForEdit, setCategoryForEdit] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
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
    useTable(categories, headCells, filterFn);

  const getData = async () => {
    const { data } = await getCategories();
    const categories = [...data];
    setCategories(categories);
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
            x.categoryName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = async (category, categoryId, resetForm) => {
    if (categoryId === 0) {
      await axios({
        method: "post",
        url: "http://localhost:4000/api/categories/",
        data: category,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          resetForm();
          setOpenPopup(false);
          getData();
          setNotify({
            isOpen: true,
            message: "Product Updated Successfully.",
            type: "success",
          });
        })
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err.response.data,
            type: "warning",
          });
        });
    } else {
      await axios({
        method: "put",
        url: `http://localhost:4000/api/categories/${categoryId}`,
        data: category,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          resetForm();
          setOpenPopup(false);
          getData();
          setNotify({
            isOpen: true,
            message: "Product Updated Successfully.",
            type: "success",
          });
        })
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err.response.data,
            type: "warning",
          });
        });
    }
  };

  const openInPopup = (item) => {
    setCategoryForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await deleteCategory(id).then(() => {
      getData();
      setNotify({
        isOpen: true,
        message: "Category Deleted Successfully.",
        type: "warning",
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
              <CardHeader title="All Categories" />
              <Divider />
              <CardContent>
                <Toolbar>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Search Categories"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearch}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => {
                      setOpenPopup(true);
                      setCategoryForEdit(null);
                    }}
                  >
                    Add New
                  </Button>
                </Toolbar>
                <TableContainer>
                  <TblContainer>
                    <TblHead />
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{++i}</TableCell>
                          <TableCell>{item.categoryName}</TableCell>
                          <TableCell>
                            <Controls.ActionButton
                              color="primary"
                              onClick={() => {
                                openInPopup(item);
                              }}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </Controls.ActionButton>
                            <Controls.ActionButton
                              color="secondary"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: "Are you sure to delete?",
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => {
                                    onDelete(item._id);
                                  },
                                });
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </Controls.ActionButton>
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
        <Popup
          title="Add Category"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddCategory
            addOrEdit={addOrEdit}
            categoryForEdit={categoryForEdit}
          />
        </Popup>
        <Notification notify={notify} setNotify={setNotify}></Notification>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </main>
    </div>
  );
};

export default Categories;
