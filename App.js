/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./custom-styles.css";
import "./styles/Repositories.css";
import "./styles/ViewDetails.css";
import "./styles/dashboard.css";
import Dashboard from "./views/Dashboard/Dashboard";
import UserTable from "./views/UserManagement/Users";
import AddForm from "./views/UserManagement/AddForm";

import ForgotPassword from "./views/LoginModule/ForgotPassword";
import LoginForm from "./views/LoginModule/Login";
import ResetPassword from "./views/LoginModule/ResetPassword";
import SessionExpire from "./components/SessionExpire";

import Repositories from "./views/Repositories/Repositories";
import UploadFiles from "./views/Repositories/UploadFiles";
import ViewDetails from "./views/Repositories/ViewDetails";
import Settings from "./views/Settings/Settings";
import TenantManagementTable from "./views/TenantManagement/TenantManagementTable";

import HeaderDesign from "./views/Layout/theme3/HeaderDesign";
import SideBar from "./views/Layout/theme3/SideBar";
import Notifications from "./views/Notifications/Notifications";
import AddRepo from "./views/Repositories/AddRepo";
import SharedFiles from "./views/Repositories/SharedFiles";
import GenAIDCM from "./views/GenAI/GenAIDCM";
import GenAIDCMSidebar from "./views/Layout/theme3/GenAIDCMSidebar";
import Workflows from "./views/Workflows/Workflows";
import Connections from "./views/Connections/Connections";
import AddDatasource from "./views/Connections/AddDatasource";
import Agents from "./views/Agents/Agents";
import Tools from "./views/Tools/Tools";
import Models from "./views/Models/Models";
import Apps from "./views/Apps/Apps";
import AddApp from "./views/Apps/AddApp";
import SelectApp from "./views/Apps/SelectApp";
import ProcessApp from "./views/Apps/ProcessApp";
import TenantAddForm from "./views/TenantManagement/TenantAddForm";
import AddAgent from "./views/Agents/AgentAdd";
import ModelAdd from "./views/Models/ModelAdd";
import EditModel from "./views/Models/EditModel";

import EditForm from "./views/UserManagement/EditForm";
import Source from "./views/Connections/Source";
import SourceDestination from "./views/Airbyte/SourceDestination";
import NewModel from "./views/Models/NewModel";
import EditAgent from "./views/Agents/EditAgent";
import ChatApp from "./views/Apps/chatApp";

function App() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(t("Dashboard"));
  const [menuItems, setMenuItems] = useState([]);
  const [headerItems, setHeaderItems] = useState([]);
  const [footerItems, setFooterItems] = useState([]);
  const [sessionExpire, setSessionExpire] = useState(false);
  const location = useLocation();

  const isGenAIDCMPage = location.pathname === "/gen-ai-dcm";

  const getGenAiHistoryItems = () => {
    const res = {
      data: {
        sidenav: [
          {
            sessionID: "12344-1234-567-8890",
            context: "Contagious diseases",
          },
          {
            sessionID: "12345-1234-567-8890",
            context: "About LLM",
          },
        ],
      },
    };
    setMenuItems(res.data.sidenav);
  };

  const getSidebarItems = () => {
    const basePath = process.env.REACT_APP_API_URL;
    let language = localStorage.getItem("language");
    if (!language || language === "null" || language === "0") {
      language = "1";
      localStorage.setItem("language", language);
    }
    let headers = {
      "content-type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "X-TenantID": localStorage.getItem("tenantId"),
    };

    fetch(`${basePath}api/getall?languageId=${language}`, {
      method: "GET",
      headers: headers,
    })
      .then((resp) => {
        if (resp.status === 401) {
          setSessionExpire(true);
        } else {
          return resp.json();
        }
      })
      .then((res) => {
        if (res?.status) {
          // setMenuItems(res.data.sidenav);
          setMenuItems(res.data.sidenav);
          setHeaderItems(res.data.header);
          setFooterItems(res.data.footer);
        }
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  function handleOpenClick() {
    setOpen((open) => !open);
  }

  const NavigateBack = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate(-1);
    }, [navigate]);
    return null;
  };

  if (localStorage.getItem("Authorization")) {
    return (
      <div
        className="d-flex page-background-color"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div
          className="br-10 mt-2 ml-2"
          style={
            open
              ? {
                  width: "16%",
                  backgroundColor: "white",
                  margin: "8px 8px 0 8px",
                }
              : {
                  width: "5%",
                  backgroundColor: "#white",
                  margin: "8px 8px 0 8px",
                }
          }
        >
          <div className="h-100">
            {isGenAIDCMPage ? (
              <GenAIDCMSidebar
                open={open}
                menuItems={menuItems}
                getGenAiHistoryItems={getGenAiHistoryItems}
                handleOpenClick={handleOpenClick}
              />
            ) : (
              <SideBar
                open={open}
                menuItems={menuItems}
                getSidebarItems={getSidebarItems}
                handleOpenClick={handleOpenClick}
              />
            )}
          </div>
        </div>
        <div
          className="br-10 d-flex flex-column"
          style={
            open
              ? { width: "84%", height: "100vh", overflow: "hidden" }
              : { width: "95%", height: "100vh", overflow: "hidden" }
          }
        >
          <HeaderDesign />
          <main
            id="main"
            className="mt-3 mb-3 ms-4  me-3 br-10 scroll-hidden"
            style={{
              flex: "1 1 auto",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={<Dashboard toggles={!open} />}
              />
              <Route
                path="/file-process"
                element={<Repositories toggles={!open} />}
              />
              <Route path="/adddatasource" element={<AddDatasource />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/selectapp" element={<SelectApp />} />
              <Route path="/addapp" element={<AddApp />} />
              <Route path="/processapp" element={<ProcessApp />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/updateagent/:id" element={<EditAgent />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/userManagement" element={<UserTable />} />
              <Route path="/adduser" element={<AddForm />} />
              <Route path="/addmodel" element={<ModelAdd />} />
              <Route path="/airbyte" element={<SourceDestination />} />
              <Route path="/edituser/:userId" element={<EditForm />} />
              <Route
                path="/view-details"
                element={<ViewDetails toggles={!open} />}
              />
              <Route
                path="/upload-files"
                element={<UploadFiles toggles={!open} />}
              />
              <Route
                path="/shared-files"
                element={<SharedFiles toggles={!open} />}
              />
              <Route
                path="/add-repo"
                element={<AddRepo setPageHeading={setPage} toggles={!open} />}
              />
              <Route
                path="/tenantManagement"
                element={<TenantManagementTable />}
              />
              <Route path="/addtenant" element={<TenantAddForm />} />
              <Route path="/agentadd" element={<AddAgent />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/models" element={<Models />} />
              <Route path="/newmodel" element={<NewModel />} />
              <Route path="/updatemodel/:modelId" element={<EditModel />} />
              <Route path="/chatapp" element={<ChatApp />} />
              <Route
                path="/settings"
                element={
                  <Settings
                    headerItems={headerItems}
                    setHeaderItems={setHeaderItems}
                    menuItems={menuItems}
                    setMenuItems={setMenuItems}
                    footerItems={footerItems}
                    setFooterItems={setFooterItems}
                    getSidebarItems={getSidebarItems}
                  />
                }
              />
              <Route
                path="/gen-ai-dcm"
                element={<GenAIDCM toggles={!open} />}
              />
              <Route
                path="/notifications"
                element={<Notifications toggles={!open} />}
              />
              <Route
                path="/workflows"
                element={<Workflows toggles={!open} />}
              />
              <Route path="*" element={<NavigateBack />} />{" "}
            </Routes>
          </main>
        </div>
        {sessionExpire && <SessionExpire />}
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<NavigateBack />} />{" "}
      </Routes>
    );
  }
}

export default App;
