import React from "react";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/Button";

const WorkerDetails = () => {
  return (
    <div className="flex flex-col h-full w-full gap-2 justify-start mt-4 items-center">
      <Alert className="text-xl">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Worker_Name</AlertTitle>
        <AlertDescription>Somyajeet Gupta Chowdhury</AlertDescription>
      </Alert>

      <Alert className="text-xl">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Public_Key</AlertTitle>
        <AlertDescription>0x48349023940</AlertDescription>
      </Alert>
      <Alert className="text-xl">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Pending Amount</AlertTitle>
        <AlertDescription>$60.03</AlertDescription>
      </Alert>
      <Button>Redeem</Button>
    </div>
  );
};

export default WorkerDetails;
