import { Fragment } from "react";
import { TxStatus } from '../pages/HomePage';
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
        {props.waitingTx === TxStatus.NOT_STARTED ? 
        <>  <DialogBody divider className="flex flex-col text-center text-3xl">
                      <div>You selected ticket N°{props.ticketSelected}</div>
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
                </DialogFooter></>
        :
        <div className="flex flex-col text-center mt-5">
            Waiting for transaction to complete, please wait...
            <div className="flex justify-center items-center pt-2 pb-10">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Waiting for tx...</span>
                </div>
            </div>
        </div>}
      </Dialog>
    </Fragment>
  );
}