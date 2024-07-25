import AgoraRTC from "agora-rtc-react";

class AgoraService {
  constructor() {
    this.client = null;
    this.remoteUser = {};
    this.onRemoteUserUpdate = null;
    this.onRemoteUserJoined = null;
  }

  initialize(appId) {
    this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    this.client.on("user-joined", user => {
      this.remoteUser[user.uid] = user;

      console.log("user", user);
      // todo: make a better check to detect if the remote user has joined the channel
      if (this.onRemoteUserUpdate) {
        this.onRemoteUserUpdate(Object.keys(this.remoteUser).length > 0);
      }
    });

    // todo: handle how many user can join the channel
    // todo: make a better check to detect if the remote user has left the channel
    this.client.on("user-left", user => {
      delete this.remoteUser[user.uid];
      if (this.onRemoteUserUpdate) {
        this.onRemoteUserUpdate(Object.keys(this.remoteUser).length > 0);
      }
    });

    this.client.on("connection-state-change", property => {
      console.log("connection-state-change", property);
    });

    return this.client;
  }

  setRemoteUserUpdateListener(callback) {
    this.onRemoteUserUpdate = callback;
  }

  async join(appId, channel, token, uid) {
    await this.client.join(appId, channel, token, uid);
  }
}

export default AgoraService;
