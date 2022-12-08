import styles from "./sidenav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { navData } from "../../lib/navData";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useMediaQuery } from 'react-responsive';

export default function Sidenav() {
  const [open, setopen] = useState(true);
  const location = useLocation();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const toggleSideBar = () => {
    const leftSideBar = document.querySelector(".left-side-bar");
    const contentContainer = document.querySelector(".content-container");

    setopen(!open);
    if (leftSideBar.classList.contains("left-side-bar-collapsed")) {
      leftSideBar.classList.remove("left-side-bar-collapsed");
      contentContainer.classList.remove(
        "content-container-with-collapsed-sidebvar"
      );
      return;
    }

    leftSideBar.classList.add("left-side-bar-collapsed");
    contentContainer.classList.add("content-container-with-collapsed-sidebvar");
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      {open&!isMobile ? (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h5"
            style={{ color: "white", textAlign: "center" }}
          >
            P o l y b a s e
          </Typography>
        </Box>
      ) : (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <img src="https://img.icons8.com/stickers/50/null/p--v1.png" alt="Shortcut"/>
        </Box>
      )}
      {!isMobile?(
        <button className={styles.menuBtn} onClick={toggleSideBar}>
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
      ):(
        <Box sx={{marginTop:"20px"}}>
        </Box>
      )
      }
      {navData.map((item) => {
        return (
          <NavLink
            key={item.id}
            className={`${styles.sideitem} ${
              location.pathname.split("/")[1] === item.link
                ? styles.activePageStatistics
                : ""
            }`}
            to={item.link}
          >
            {item.icon}
            {!isMobile?(
              <span  className={`${styles.linkText} left-side-bar-menu-link-text`}>{item.text}</span>
            ):(<></>)}
            
          </NavLink>
        );
      })}
    </div>
  );
}
