import Centered from "../../../common/centered";

function WIP() {
  return (
    <Centered>
      <div style={{ alignItems: "center", textAlign: "center" }}>
        <img src={'/images/wip.png'} style={{ width: "100px" }} alt="work in progress" />
      </div>
      <div style={{ alignItems: "center", textAlign: "center" }}>
        <small>
          We are currently working on the content for this area, check back
          later
        </small>
      </div>
    </Centered>
  );
}

export default WIP;
