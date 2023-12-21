import React from "react";
import { Home } from "react-feather";
import { Link } from "react-router-dom";
import Row from "../../../common/components/Row";
import { Typography } from "@mui/material";

const Breadcrumb = ({ title, parent }: { title: string; parent: string }) => {
  const link = "/" + parent.replace(/\s/g, "").toLowerCase();
  return (
    <div>
      <Row justifyContent={"space-between"}>
        <div>
          <Typography variant="h4" component="h4">
            {title}
          </Typography>
          <small>Codex Core</small>
        </div>
        <div>
          <ol className="breadcrumb pull-right">
            <li className="breadcrumb-item">
              <Link to="/dashboard">
                <Home />
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={link}>{parent}</Link>
            </li>
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </div>
      </Row>
    </div>
  );
};

export default Breadcrumb;
