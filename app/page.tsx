import React from "react";
import { InstallPrompt, PushNotification } from "./_components";

export default function Home() {
  return (
    <React.Fragment>
      <div className=" w-[400px] mx-auto h-screen flex justify-center items-center flex-col -mt-[100px]">
        <div className="border rounded-xl">
          <div className="p-4">
            <InstallPrompt />
          </div>
          <div className="border-b my-4" />
          <div className="p-4">
            <PushNotification />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
