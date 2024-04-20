import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GetApp from "@mui/icons-material/Search";
import DataBox from "./components/DataBox";
import MapWithMarkerComponent from "./components/Map";

function WeatherForecast() {
  const styles = {
    container: {
      textAlign: "center",
      background: "hsla(86, 8.47%, 88.43%, 0.85)",
    },
    forecastContainer: {
      display: "flex",
      textAlign: "left",
      padding: "20px",
    },
    header: {
      marginTop: "5rem",
      marginBottom: "0rem",
    },
    subheader: {
      marginTop: "0.8rem",
      marginBottom: "0rem",
      fontWeight: '500'
    },
    rowEven: {
      backgroundColor: "#fafafa",
      padding: "10px",
    },
    rowOdd: {
      backgroundColor: "#eeeeee",
      padding: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0px 4px 6px -2px #00000008, 0px 12px 16px -4px #00000014",
    },
    tableHeader: {
      padding: "1.5rem",
      border: "1px solid #ddd",
      backgroundColor: "#f2f2f2",
      width: '9rem'
    },
    tableDataTime: {
      padding: "0.5rem",
      border: "1px solid #ddd",
      fontSize: "0.9rem",
      fontWeight: "600",
      paddingLeft: "1rem",
    },
    tableData: {
      padding: "0.5rem",
      border: "1px solid #ddd",
      fontSize: "0.9rem",
      paddingLeft: "1rem",
    },
  };

  const [forecastData, setForecastData] = useState(null);
  const [mapAPI, setMapAPI] = useState([]);

  const handleIdSubmit = () => {
    const userId = document.getElementById("vehicle-id").value;
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userId}?unitGroup=us&key=ADD_YOUR_API_KEY&contentType=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setForecastData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    // Fetch weather data when the component mounts
    fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bengaluru?unitGroup=us&key=ADD_YOUR_API_KEY&contentType=json"
    )
      .then((response) => response.json())
      .then((data) => {
        setForecastData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
      const fetchMapAPI = async () => {
        try {
          const response = await fetch(`https://ADD_YOUR URL.vercel.app/map-api/token`);
          if (response.ok) {
            const mapAPI = await response.json();
            setMapAPI(mapAPI.access_token);
            // console.log(mapAPI.access_token);
          } else {
            console.log('Failed to fetch initial switch value.');
          }
        } catch (error) {
          console.error('Error fetching initial switch value:', error);
        }
      };
      fetchMapAPI();
  }, []);

  return (
    <div style={styles.container}>
      {forecastData ? (
        <div style={styles.forecastContainer}>
          <Box width={"40rem"} paddingX={"0rem"}>
            <Box display={"flex"} alignContent={"center"} mt={'1rem'}>
              <TextField
                id="vehicle-id"
                label="Search"
                variant="outlined"
                size="small"
                sx={{ width: "12rem" }}
              />
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  border: `1px solid #fff`,
                  marginLeft: "1rem",
                  background: "#000",
                  borderRadius: "0.5rem",
                  "&:hover": {
                    background: "#222", // Set hover background color to black
                    border: "0px",
                  },
                }}
                onClick={handleIdSubmit}
              >
                <GetApp style={{ fontSize: "1.7rem" }} />
              </Button>
            </Box>
            {/* <Box
              sx={{
                width: "97%",
                height: "19rem",
                background: "#fff",
                display: "flex",
                marginTop: "1rem",
                borderRadius:'0.5rem',
                boxShadow:
                  "0px 4px 6px -2px #00000008, 0px 12px 16px -4px #00000014",
              }}
            > */}
              {/* <MapWithMarkerComponent token={mapAPI} currentLat={forecastData.latitude} currentLng={forecastData.longitude}/> */}
            {/* </Box> */}
            <h1 style={styles.header}>{forecastData.resolvedAddress}</h1>
            <h4 style={styles.subheader}>{forecastData.latitude}, {forecastData.longitude}</h4>
            <Box display={"flex"}>
              <DataBox heading={"Temperature"} data={`${(((forecastData.currentConditions.temp - 32) * 5) / 9).toFixed(1)} °C`}/>
              <DataBox heading={"Humidity"} data={`${forecastData.currentConditions.humidity} %`} />
            </Box>
            <Box display={"flex"}>
              <DataBox heading={"Rain fall"} data={`${forecastData.currentConditions.precip} mm`} />
              <DataBox heading={"cloud coverage"} data={`${forecastData.currentConditions.cloudcover} %`} />
            </Box>
            <Box display={"flex"}>
              <DataBox heading={"wind speed"} data={`${forecastData.currentConditions.windspeed} km/h`} />
              <DataBox heading={"Atmospheric pressure"} data={`${forecastData.currentConditions.pressure} hPa`} />
            </Box>
            <Box display={"flex"}>
              <DataBox
                heading={"description"}
                data={forecastData.description}
              />
            </Box>
            <Box display={"flex"}>
              <DataBox
                heading={"Alerts"}
                data={forecastData.alerts ? forecastData.alerts : "None"}
              />
            </Box>
          </Box>
          <div>
            <h2 style={{ marginTop: "0rem" }}>Dialy Forecast:</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Temperature (°C)</th>
                  <th style={styles.tableHeader}>Humidity (%)</th>
                  <th style={styles.tableHeader}>Rain fall (mm)</th>
                  <th style={styles.tableHeader}>Wind Speed (km/h)</th>
                  <th style={styles.tableHeader}>Conditions </th>
                </tr>
              </thead>
              <tbody>
                {forecastData.days.map((day, index) => (
                  <tr
                    key={day.datetime}
                    style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                  >
                    <td style={styles.tableData}>{day.datetime}</td>
                    <td style={styles.tableData}>
                      {(((day.tempmin - 32) * 5) / 9).toFixed(1)} - {(((day.tempmax - 32) * 5) / 9).toFixed(1)}
                    </td>
                    <td style={styles.tableData}>{day.humidity}</td>
                    <td style={styles.tableData}>{day.precip}</td>
                    <td style={styles.tableData}>{day.windspeed}</td>
                    <td style={styles.tableData}>{day.conditions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherForecast;
