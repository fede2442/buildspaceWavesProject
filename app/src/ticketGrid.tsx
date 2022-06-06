import { Button } from '@material-tailwind/react';

export default function TicketGrid(props) {
  
    return (<div className="grid grid-cols-5 grid-rows-10 gap-5 gap-x-20 mb-4 p-5 text-black">
      {Array.from(Array(props.totalAmount)).map((_, index) => (
        props.soldTickets[index] &&
        !props.soldTickets[index].eq(0) ?
          <Button variant="filled"
                  disabled
                  className="border border-2 border-solid border-deep-purple-800 bg-red-100 text-deep-purple-500">
            {index + 1}
          </Button>
          :
          <Button variant="filled"
                  className="border border-2 border-solid border-deep-purple-800 bg-white hover:bg-deep-purple-100 text-deep-purple-500"
                  onClick={() => props.selectTicket(index + 1)}>
            {index + 1}
          </Button>
      ))}
    </div>);
  }