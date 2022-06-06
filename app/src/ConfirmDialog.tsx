import { Fragment } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button
} from "@material-tailwind/react";
 
export default function ConfirmDialog(props) {
 
  return (
    <Fragment>
      <Dialog open={props.state} handler={props.controlOpen}>
        <DialogHeader className="bg-deep-purple-200">Buy a ticket</DialogHeader>
        <DialogBody divider className="flex flex-col text-center text-3xl">
          <div>You are about to purchase ticket Number: {props.ticketSelected}</div>
          <div>Price: 0.1 ETH</div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={props.controlOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="deep-purple" onClick={props.confirmAction}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}