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

    // this.client.on("user-joined", user => {
    //   this.remoteUser[user.uid] = user;
    //
    //   console.log("user", user);
    //   if (this.onRemoteUserUpdate) {
    //     this.onRemoteUserUpdate(Object.keys(this.remoteUser).length > 0);
    //   }
    // });

    this.client.on("user-left", user => {
      delete this.remoteUser[user.uid];
      if (this.onRemoteUserUpdate) {
        this.onRemoteUserUpdate(Object.keys(this.remoteUser).length > 0);
      }
    });
  }

  setRemoteUserUpdateListener(callback) {
    this.onRemoteUserUpdate = callback;
  }

  setOnRemoteUserJoined() {
    this.onRemoteUserJoined = this.client.on("user-joined", user => {
      this.remoteUser[user.uid] = user;

      console.log("user", user);
      if (this.onRemoteUserUpdate) {
        this.onRemoteUserUpdate(Object.keys(this.remoteUser).length > 0);
      }
    });
  }

  async join(appId, channel, token, uid) {
    await this.client.join(appId, channel, token, uid);
  }
}

export default AgoraService;
