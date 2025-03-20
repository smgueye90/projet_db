import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios'; // <-- Import d'axios

// Navigation configuration
const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "teacher-dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "exam",
    title: "Examen",
    icon: <DescriptionIcon />,
  },
  {
    segment: "results",
    title: "Notes",
    icon: <DescriptionIcon />,
  },
  {
    segment: "connexion",
    title: "Deconnexion",
    icon: <LogoutIcon />,
  },
];

// Theme configuration
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// DataGrid columns
const columns = [
  { field: "id", headerName: "ID", type: "number", align: "left", headerAlign: "left" },
  { field: "nom", headerName: "Nom", width: 280 },
  { field: "classe", headerName: "Classe", width: 100 },
  {
    field: "notes",
    headerName: "Notes",
    type: "number",
    align: "left",
    headerAlign: "left",
  },
  {
    field: "date",
    headerName: "Date de soumission",
    type: "dateTime",
    width: 220,
  },
];

// DemoPageContent component
function DemoPageContent({ pathname }) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        // Récupération des résultats depuis le backend
        const response = await axios.get('http://localhost:5000/api/exams/results');
        if (response.status === 200) {
          const data = response.data;
          setRows(
            data.map((item, index) => ({
              id: index + 1,
              nom: item.name,
              classe: item.className,
              notes: item.grade || "N/A",
              date: new Date(item.submittedAt).toLocaleString(),
            }))
          );
        } else {
          console.error("Erreur lors de la récupération des résultats.");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <Box
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Les notes des étudiants
      </Typography>
      <section>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </section>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// ResultsPage component
function ResultsPage({ window }) {
  const navigate = useNavigate();
  const location = useLocation();
  const demoWindow = window !== undefined ? window() : undefined;

  const handleNavigationClick = (item) => {
    if (item.segment) {
      navigate(`/${item.segment}`);
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => handleNavigationClick(item),
      }))}
      branding={{
        title: "Dashboard",
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/exam" element={<DemoPageContent pathname={location.pathname} />} />
          <Route path="/results" element={<DemoPageContent pathname={location.pathname} />} />
          <Route path="*" element={<DemoPageContent pathname={location.pathname} />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

ResultsPage.propTypes = {
  window: PropTypes.func,
};

export default ResultsPage;
