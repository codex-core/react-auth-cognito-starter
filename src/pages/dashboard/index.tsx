import React from "react";
import Wrapper from "./components/wrapper";
import Breadcrumb from "./components/breadcrumb";
import { Card, Paper, Typography } from "@mui/material";
import WIP from "./components/wip";

function Home() {
  return (
    <Wrapper>
      <div className="container">
        <Breadcrumb title="Home" parent="dashboard" />
        <Card sx={{ p: 2, mt: 2 }}>
          <WIP/>
        </Card>
      </div>
    </Wrapper>
  );
}

export default Home;
