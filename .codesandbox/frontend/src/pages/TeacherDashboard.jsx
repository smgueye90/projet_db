import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

const NAVIGATION = [
  {
    segment: "header",
    kind: "header",
    title: "Main items",
  },
  {
    segment: "/teacher-dashboard",
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
];

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

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function TeacherDashboard(props) {
  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const demoWindow = window !== undefined ? window() : undefined;

  const handleNavigationClick = (item) => {
    if (item.onClick) {
      item.onClick(navigate);
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
        <DemoPageContent pathname={location.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

TeacherDashboard.propTypes = {
  window: PropTypes.func,
};

export default TeacherDashboard;
