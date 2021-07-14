import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  Hidden,
  Collapse,
} from "@material-ui/core";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: "#1e1e2d",
    },
  },
  white: {
    color: "white",
  },
  drawerPaper: {
    backgroundColor: "#1e1e2d",
    color: "white",
    width: drawerWidth,
  }, // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawerTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontWeight: "bold",
    fontSize: "26px",
  },
}));

const Drawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { window } = props;
  const [carOpen, setCarOpen] = React.useState(false);

  const handleOfficesClick = () => {
    setCarOpen(!carOpen);
  };

  const drawer = (
    <>
      <div className={classes.toolbar}>
        <div className={classes.drawerTop}>DIBUZZ</div>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/adminDashboard">
          <ListItemIcon>
            <DashboardRoundedIcon className={classes.white} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemIcon>
            <DashboardRoundedIcon className={classes.white} />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button component={Link} to="/requests">
          <ListItemIcon>
            <DashboardRoundedIcon className={classes.white} />
          </ListItemIcon>
          <ListItemText primary="Requests" />
        </ListItem>
      </List>
      <Divider />
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <MUIDrawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </MUIDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <MUIDrawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </MUIDrawer>
      </Hidden>
    </nav>
  );
};

export default Drawer;
