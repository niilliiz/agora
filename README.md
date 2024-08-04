This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


### improvements
    1- performance issues => useCallback and useMemo for functions...i have to detect which components get rerendered reapeatedly and try to prevent it as much as possible :).
    2- we can get the connection's state of local user, so it's would be a good idea if we get the reconnecting state and then show loading state, or give local some time like 10 seconds to come back, and then throw them outside of room and force them to rejoin
    3- when we hit the join button, it takes little time  to join which is indicated by isLoading property that agora itself gives it to us, it would be a good idea if we can show loading state to local user
    4- when user doesn't give permission to any of the media devices, we can show a modal to give them an instruction of how they can give permission to the media devices
    5- check responsive in all parts
    6- if remote user and local user both turn off the camera -> ui
    7- in timer, animation in expanding and animation of the svg


    

#### References 

* [Connection Status Management](https://docs.agora.io/en/video-calling/enhance-call-quality/connection-status-management?platform=web)
* [Video-SDK Web](https://api-ref.agora.io/en/video-sdk/web/4.x/globals.html)
* [Agora-React-Example](https://agoraio-extensions.github.io/agora-rtc-react/basic/#/Basic/overview)
