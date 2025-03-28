"use client";

import { useState, useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Share } from "@capacitor/share";
import { Screenshot } from 'capacitor-screenshot';
import Head from "next/head";

export default function Home() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const requestPermission = async () => {
      const { granted } = await LocalNotifications.requestPermissions();
      if (!granted) {
        console.error("Notification permission not granted!");
      }
    };
    requestPermission();
  }, []);

  const handleShowTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setLocalTime(currentTime);

    LocalNotifications.schedule({
      notifications: [
        {
          title: "Current Time",
          body: `The current time is ${currentTime}`,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) },
        },
      ],
    });
  };

  const handleShare = async () => {
    await Share.share({
      title: "Share Current Time",
      text: `The current time is ${localTime}`,
      url: "https://clocktab.com",
      dialogTitle: "Share with your friends",
    });
  };

  const handleScreenshot = async () => {
    const { uri } = await Screenshot.take();
    console.log('Screenshot saved at:', uri);
  };

  return (
    <>
      <Head>
        <title>Hiển thị thời gian</title>
      </Head>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={handleShowTime}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Show Local Time
            </button>
            {localTime && (
              <>
                <p className="mt-2 text-5xl text-center font-[family-name:var(--font-geist-mono)]">
                  Current Time: {localTime}
                </p>
                <button
                  onClick={handleShare}
                  className="mt-4 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                >
                  Share Time
                </button>
                <button
                  onClick={handleScreenshot}
                  className="mt-4 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                >
                  Capture Screenshot
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
