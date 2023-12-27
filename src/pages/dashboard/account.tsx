import Wrapper from "./components/wrapper";
import Breadcrumb from "./components/breadcrumb";
import { Card,} from "@mui/material";
import WIP from "./components/wip";

function Account() {
  return (
    <Wrapper>
      <div className="container">
        <Breadcrumb title="Account" parent="dashboard" />
        <Card sx={{ p: 2, mt: 2 }}>
          <WIP/>
        </Card>
      </div>
    </Wrapper>
  );
}

export default Account;
