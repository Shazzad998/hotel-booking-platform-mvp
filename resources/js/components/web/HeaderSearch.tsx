import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '../DatePickerWithRange';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { search } from '@/routes';


const HeaderSearch = () => {
    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);
    const [date, setDate] = useState<DateRange | undefined>({
        from: today,
        to: twoDaysLater,
    });

    const { data, setData } = useForm({
        location:'',
        number_of_rooms: '1',
        number_of_guests: '1',
        from: today.toISOString(),
        to: twoDaysLater.toISOString(),
    });

    const handleSearch = () => {
        router.get(search(), data)
    }


    return (
        <div className="flex w-full flex-col items-center px-6 py-10">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Book your next trip</h2>
            <p className="mb-6 text-foreground/70">Search low prices on hotels and much more.</p>

            <div className="flex w-full max-w-5xl flex-col items-center gap-3 rounded-lg p-3 md:flex-row">
                {/* Location Input */}
                <div className="relative flex-1">
                    <Input placeholder="Enter destination" value={data.location} onChange={(e) => setData('location',e.target.value)} className="pr-8" />
                    {data.location && (
                        <button className="absolute top-1.5 right-2.5 text-gray-400 hover:text-gray-600" onClick={() => setData('location','')}>
                            ✕
                        </button>
                    )}
                </div>

                {/* Date Picker */}
                <DatePickerWithRange
                    date={date}
                    setDate={setDate}
                    onApply={() => {
                        setData('from', date?.from?.toISOString() || '');
                        setData('to', date?.to?.toISOString() || '');
                    }}
                    placeHolder="Check In - Check Out"
                    className="w-80"
                />

                {/* Rooms Picker */}
                <Select value={data.number_of_rooms} onValueChange={(value) => setData('number_of_rooms', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select number of rooms" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[...Array(10)].map((_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1)}>
                                    {i + 1} Room{i + 1 > 1 ? 's' : ''}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Guest Picker */}
                <Select value={data.number_of_guests} onValueChange={(value) => setData('number_of_guests', value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select number of rooms" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[...Array(10)].map((_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1)}>
                                    {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Search Button */}
                <Button size="icon" onClick={handleSearch}>
                    <Search className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export default HeaderSearch;
