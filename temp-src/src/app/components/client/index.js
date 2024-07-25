import { useState } from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

export default function Client({
  children,
  clientConfig = {
    mode: "rtc",
    codec: "vp8",
  },
}) {
  const [client] = useState(() => AgoraRTC.createClient(clientConfig));
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
}
