import styles from "./video-call.module.css";
import { useMemo, useState } from "react";
import { useJoin } from "agora-rtc-react";
import { appConfig } from "@/utils/app-config";
import Room from "@/app/components/room";
import Preview from "@/app/components/preview";
import Container from "@/app/components/layout-components/container";
import Timer from "@/app/components/timer";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function VideoCall() {
  const [width] = useWindowWidth();
  const [isCalling, setIsCalling] = useState(false);

  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const [localTracks, setLocalTracks] = useState({
    localCameraTrack: null,
    localMicrophoneTrack: null,
  });

  // useClientEvent(client, "connection-state-change", (curState, revState, reason) => {
  //   console.log(
  //     `connection-state-change,curState: ${curState},revState: ${revState},reason: ${reason}`,
  //   );
  // });

  function handleJoinButtonClicked() {
    setIsCalling(true);
  }

  function handleLeaveButtonClicked() {
    setIsCalling(false);
  }

  // todo: u can handle the error here - if there is error - if it's not connected
  const { data, isLoading, isConnected, error } = useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
      uid: (Math.random() * 1000).toString(20),
    },
    isCalling,
  );

  function handleSetCamOn() {
    setCameraOn(prevCamera => !prevCamera);
  }
  function handleSetMicOn() {
    setMicOn(prevMic => !prevMic);
  }

  useMemo(() => {
    if (!isCalling) {
      setLocalTracks({ localCameraTrack: null, localMicrophoneTrack: null });
    }
  }, [isCalling]);

  return (
    <div className={styles.videoCallContainer}>
      <Container>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="76"
              height="42"
              viewBox="0 0 76 42"
              fill="none"
            >
              <path
                d="M1.76172 32.2686V32.3936H1.88672H4.32851H4.45351V32.2686V10.1857H5.71714L16.0688 32.3216L16.1025 32.3936H16.182H21.6374H21.7624V32.2686V7.77344V7.64844H21.6374H19.1956H19.0706V7.77344V29.8564H17.807L7.45535 7.72049L7.42166 7.64844H7.34212H1.88672H1.76172V7.77344V32.2686Z"
                fill="white"
                stroke="white"
                strokeWidth="0.25"
              />
              <path
                d="M42.1911 24.4342H42.3161V24.3092C42.3161 19.1544 38.9045 15.0352 33.8302 15.0352C29.0959 15.0352 25.0508 18.8756 25.0508 23.8146C25.0508 29.0741 28.86 32.8877 33.8921 32.8877C37.3377 32.8877 40.8241 30.8974 41.9862 27.0498L42.0349 26.8887H41.8665H39.3166H39.2342L39.2017 26.9643C38.2832 29.1024 35.9719 30.2268 33.8921 30.2268C32.1904 30.2268 30.739 29.65 29.6848 28.6259C28.656 27.6266 27.9975 26.1937 27.8599 24.4342H42.1911ZM39.1313 21.9587H28.0733C28.7987 19.326 30.9888 17.696 33.8302 17.696C35.3274 17.696 36.5219 18.1287 37.4096 18.8907C38.265 19.6249 38.8449 20.673 39.1313 21.9587Z"
                fill="white"
                stroke="white"
                strokeWidth="0.25"
              />
              <path
                d="M44.8518 32.3942H44.9289L44.9635 32.3252L48.8235 24.6207H50.2795L54.5093 32.3293L54.5449 32.3942H54.6189H57.4316H57.6436L57.541 32.2087L52.6755 23.414L56.9845 15.6702L57.0879 15.4844H56.8753H54.0626H53.9887L53.9531 15.5491L50.2642 22.2534H48.8059L45.2403 15.5507L45.205 15.4844H45.1299H42.2863H42.0767L42.1764 15.6688L46.3797 23.4466L41.9276 32.2126L41.8354 32.3942H42.0391H44.8518Z"
                fill="white"
                stroke="white"
                strokeWidth="0.25"
              />
              <path
                d="M59.2539 15.4844H59.1289V15.6094V25.902C59.1289 27.9369 59.7632 29.6853 60.9425 30.9258C62.1226 32.1672 63.8378 32.8888 65.9766 32.8888C68.1519 32.8888 70.3065 31.8036 71.7397 30.1809V32.2692V32.3942H71.8647H74.4147H74.5397V32.2692V15.6094V15.4844H74.4147H71.8647H71.7397V15.6094V27.1016C70.7894 28.5691 68.8397 30.2124 66.2393 30.2124C64.7393 30.2124 63.6674 29.7099 62.9687 28.9015C62.2674 28.0902 61.9289 26.9557 61.9289 25.6702V15.6094V15.4844H61.8039H59.2539Z"
                fill="white"
                stroke="white"
                strokeWidth="0.25"
              />
            </svg>
          </div>
          {/*  this is where other part of call header like support would be placed*/}
          {width > 600 && isCalling && (
            <Timer key={data} className={styles.bigScreenTimer} autoStart={isCalling} />
          )}
        </div>
      </Container>
      {!isCalling ? (
        <Preview
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={() => handleSetMicOn()}
          setCameraOn={() => handleSetCamOn()}
          onJoin={() => handleJoinButtonClicked()}
          localTracks={localTracks}
          setLocalTracks={setLocalTracks}
        />
      ) : (
        <div className={styles.isCallingContainer}>
          {!isLoading && isConnected ? (
            <>
              <Room
                micOn={micOn}
                cameraOn={cameraOn}
                setMicOn={() => handleSetMicOn()}
                setCameraOn={() => handleSetCamOn()}
                onLeave={() => handleLeaveButtonClicked()}
                localTracks={localTracks}
                setLocalTracks={setLocalTracks}
              />
              {/*todo: this is where u pull support questions :)*/}
            </>
          ) : (
            //todo: this is where isLoading true
            <></>
          )}
        </div>
      )}
    </div>
  );
}
