import Layout from "./layout";
// import Subscribe from "./subscribe";
import Publish from "./publish";
import { io as socketIOClient } from "socket.io-client";
import { config } from "src/app.config";
import { useParams } from "react-router-dom";

// const userSocket: any = socketIOClient(
//     config.SERVER_ENDPOINT + '/video-broadcast'
// );

function BroadHome() {
  const { view } = useParams();

  console.log(view);
  return (
    <Layout>
      {view === "publish" ? (
        <Publish
        //  userSocket={userSocket}
        />
      ) : null}
      {/* {view === "subscribe" ? (
        <Subscribe
        //  userSocket={userSocket}
        />
      ) : null} */}
    </Layout>
  );
}

export default BroadHome;
