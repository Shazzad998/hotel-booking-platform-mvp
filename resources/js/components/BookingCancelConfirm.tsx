import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

type BookingCancelConfirmProps = {
    open: boolean;
    opOpenChange: (value: boolean) => void;
    onConfirm: () => void;
};

const BookingCancelConfirm = ({
    open,
    opOpenChange,
    onConfirm,
}: BookingCancelConfirmProps) => {
    return (
        <Dialog open={open} onOpenChange={opOpenChange}>
            <DialogContent aria-describedby="Delete Confirmattion">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure? You want to cancel you booking?</DialogTitle>
                    <DialogDescription>
                        This action can not be undone after completed.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-x-2">
                    <DialogClose asChild>
                        <Button variant={"secondary"}>Cancel</Button>
                    </DialogClose>
                    <Button variant={"destructive"} onClick={onConfirm}>
                        Yes, Cancel My Booking
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingCancelConfirm;
