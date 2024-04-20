import { Box } from "@mui/material";
import React from "react";

function DataBox({ heading, data }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "5rem",
        // border: "1px solid #ccc",
        borderRadius: "0.5rem",
        paddingX: "1rem",
        marginRight: "1rem",
        marginTop: "1rem",
        boxShadow: '0px 4px 6px -2px #00000008, 0px 12px 16px -4px #00000014',
        background: '#fff'
      }}
    >
      <Box sx={{ fontSize: "0.8rem", marginTop: "-0rem" }}>{heading}</Box>
      <Box sx={{ fontSize: "1.25rem", marginTop: "0.9rem", fontWeight: "500" }}>
        {data}
      </Box>
    </Box>
  );
}

export default DataBox;
