import { randFirstName, seed } from "@ngneat/falso";

export const fakeName = uid => {
  seed(uid);
  const name = randFirstName() || "random";
  seed();
  return name;
};

export const fakeAvatar = () => {
  return "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg";
};
