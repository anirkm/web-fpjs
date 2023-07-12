interface props {
  appeal: {
    id: string;
    userId: string;
    message: string;
    reason: string;
    status: string;
    createdAt: string;
  };
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

import { Alert, AlertDescription } from "../ui/alert";

export default function AppealDialog({ appeal }: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Show Appeal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[675px]">
        <DialogHeader>
          <DialogTitle>Your appeal</DialogTitle>
          <DialogDescription>
            Details of the appeal you&apos;ve submitted
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col space-y-5">
          <div className="space-y-1.5">
            <p className="font-semibold">Reason</p>
            <Alert>
              <p>{appeal.reason}</p>
            </Alert>
          </div>
          <div className="space-y-1.5">
            <p className="font-semibold">Message</p>
            <Alert className="break-all">
              <p>{appeal.message}</p>
            </Alert>
          </div>
          <div className="space-y-1.5">
            <p className="font-semibold">Status</p>
            <Alert>
              <p className="capitalize">{appeal.status}</p>
            </Alert>
          </div>
          <div className="space-y-1.5">
            <p className="font-semibold">Created</p>
            <Alert>
              <p className="capitalize">
                {`${new Date(appeal.createdAt).getDay()}/${new Date(
                  appeal.createdAt
                ).getMonth()}/${new Date(
                  appeal.createdAt
                ).getFullYear()} - ${new Date(
                  appeal.createdAt
                ).getHours()}:${new Date(appeal.createdAt).getMinutes()}`}
              </p>
            </Alert>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <p className="text-left	text-sm text-muted-foreground break-all">
            a staff member will review your appeal as soon as possible.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
