import React, { useState } from "react";
import Foot from "./views/Layout/theme1/Footer";
import Dashboard from "./views/Dashboard/Dashboard";
import { basePath } from "./common/config";
import UserTable from "./views/UserManagement/Users";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewHeadBar from "./views/Layout/theme1/NewHeadBar";
import MiniDrawer from "./views/Layout/theme1/SideHeadbar";
export default function Pageloyout() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState("Dashboard");
  const [menuItems, setMenuItems] = useState([]);
  const [headerItems, setHeaderItems] = useState([]);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const getSidebarItems = () => {
    let headers = {
      "content-type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "X-TenantID": localStorage.getItem("tenantId"),
    };

    fetch(basePath + "api/getall", {
      method: "GET",
      headers: headers,
    })
      .then((resp) => resp.json())
      .then((res) => {
        setMenuItems(res.data.sidenav);
        setHeaderItems(res.data.header);
      });
  };
  return (
    <div className="pagesize">
      <div className="row">
        <div className={`sidebar224 ${open ? "col-2" : "col-1"}`}>
          <div>
            {open ? (
              <div className="d-flex justify-content-between">
                <div>
                  <img
                    src={localStorage.getItem("tenantLogoPath")}
                    alt="logo123"
                    width={155}
                  />
                </div>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
            ) : (
              <IconButton onClick={handleDrawerOpen}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </div>
          <MiniDrawer
            open={open}
            setOpen={setOpen}
            setPage={setPage}
            menuItems={menuItems}
            getSidebarItems={getSidebarItems}
          />
        </div>
        <div className={`bd224  ${open ? "col-10" : "col-11"}`}>
          <div className="row header224">
            {" "}
            <NewHeadBar
              open={open}
              setOpen={setOpen}
              page={page}
              headerItems={headerItems}
              setHeaderItems={setHeaderItems}
            />
          </div>
          <div className="row  main224">
            <UserTable />
          </div>
          <div className="row  footer224 ">
            <Foot />
          </div>
        </div>
      </div>
    </div>
  );
}
