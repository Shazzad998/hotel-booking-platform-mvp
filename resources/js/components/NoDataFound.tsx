import { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';

type Props = {
    createData?: ReactNode;
};

const NoDataFound = ({ createData }: Props) => {
    return (
        <Card className="flex h-full w-full flex-col items-center justify-center gap-4 py-10">
            <CardContent className=' flex flex-col gap-6 items-center justify-center'>
                <img src="/images/not-found.svg" alt="" className='w-full h-28' />
                <h3 className="text-lg font-semibold text-foreground/50">No Data Found</h3>
                {createData && createData}
            </CardContent>
        </Card>
    );
};

export default NoDataFound;
