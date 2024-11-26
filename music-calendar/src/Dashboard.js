import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import './Dashboard.css'; 

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [topTrack, setTopTrack] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("spotifyAccessToken");

      try {
        // Fetch the user's recently played tracks from Spotify
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/recently-played?limit=50", // Fetch the last 50 tracks played
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Log the response to inspect the data
        console.log("Fetched Tracks:", response.data.items);

        const tracks = response.data.items;

        // Get the current year
        const currentYear = new Date().getFullYear();
        console.log("Current Year:", currentYear);

        // Create a heatmap-friendly format by grouping by date for the current year
        const heatmapData = [];

        tracks.forEach((track) => {
          // Extract the date of the play (for grouping by day)
          const playDate = new Date(track.played_at);
          const playYear = playDate.getFullYear();

          // Log each track and its play date for debugging
          console.log("Track Play Date:", playDate);
          console.log("Track Year:", playYear);

          // Only include tracks from the current year
          if (playYear === currentYear) {
            const dateString = playDate.toISOString().split('T')[0]; // YYYY-MM-DD

            // Log the dateString being processed
            console.log("Processing Date:", dateString);

            // Check if the date already exists in the heatmap data
            const existingData = heatmapData.find((entry) => entry.date === dateString);

            if (existingData) {
              existingData.count += 1; // Increment the count for that date
            } else {
              heatmapData.push({ date: dateString, count: 1 }); // Add a new date with count 1
            }
          }
        });

        // Log the heatmap data after processing
        console.log("Processed Heatmap Data:", heatmapData);

        // Set the processed data for the heatmap
        setData(heatmapData);

        // Optionally, set the top track (this can be dynamic as well)
        setTopTrack(tracks.length > 0 ? tracks[0].track.name : "No top track found");

      } catch (error) {
        console.error("Error fetching data from Spotify:", error);
      }
    };

    fetchData();
  }, []);

  // Color scale based on the count
  const getClassNameForValue = (value) => {
    const count = value ? value.count : 0; // Default to 0 if count is missing
    if (count === 0) return "color-scale-0";
    if (count <= 20) return "color-scale-1";  // Lightest green
    if (count <= 40) return "color-scale-2";  // Medium light green
    if (count <= 60) return "color-scale-3";  // Medium green
    if (count <= 80) return "color-scale-4";  // Dark green
    return "color-scale-5";  // Darkest green
  };

  // Get the current year's start and end date dynamically
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01`);
  const endDate = new Date(`${currentYear}-12-31`);

  return (
    <div>
      <h2>Music Calendar</h2>
      {/* Calendar Heatmap */}
      <CalendarHeatmap
        startDate={startDate} // Set the starting date for the current year
        endDate={endDate} // Set the end date for the current year
        values={data} // Data for the heatmap
        horizontal={false} // Layout setting, you can adjust this
        showWeekdayLabels={false} // Optionally show weekdays
        classForValue={getClassNameForValue} // Custom className function
      />

      <div>
        {/* Displaying the top track */}
        <p>Top Track: {topTrack}</p>
        {/* Add any other relevant stats */}
        <p>Other stats here...</p>
      </div>
    </div>
  );
};

export default Dashboard;
