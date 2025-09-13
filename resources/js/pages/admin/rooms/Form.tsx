import { Combobox } from '@/components/Combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import rooms from '@/routes/admin/rooms';
import { Hotel, Room, RoomStatus, RoomType, SelectOption } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface HotelFormProps {
    room?: Room;
    onSubmit: (data: any, reset?: () => void) => void;
    errors: { [key: string]: string };
    reset?: boolean;
}

const Form = ({ room, onSubmit, errors }: HotelFormProps) => {
    const { data, setData, processing, reset } = useForm({
        hotel_id: room?.hotel_id || '',
        room_type_id: room?.room_type_id || '',
        room_number: room?.room_number || '',
        price_per_night: room?.price_per_night || '',
        status: room?.status || 'available',
        images: [] as File[],
        remove_images: [] as string[],
        _method: room ? 'PUT' : 'POST',
    });

    const hotels = usePage().props.hotels as Hotel[];
    const room_types = usePage().props.room_types as RoomType[];

    const statuses = [
        { value: 'available', label: 'Available' },
        { value: 'booked', label: 'Booked' },
        { value: 'under_maintenance', label: 'Under Maintenance' },
    ];
    const hotelOptions: SelectOption[] = hotels.map((hotel) => ({
        label: hotel.name,
        value: hotel.id.toString(),
    }));

    const roomTypeOptions: SelectOption[] = room_types.map((room_type) => ({
        label: room_type.name,
        value: room_type.id.toString(),
    }));

    // If room exists, find the matching option by id
    const [hotel, setHotel] = useState<SelectOption | null>(room ? (hotelOptions.find((h) => h.value === room.hotel_id.toString()) ?? null) : null);

    const [roomType, setRoomType] = useState<SelectOption | null>(
        room ? (roomTypeOptions.find((rt) => rt.value === room.room_type_id.toString()) ?? null) : null,
    );

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData('images', files);

            // create preview urls
            const urls = files.map((file) => URL.createObjectURL(file));
            setPreviewUrls(urls);
        }
    };

    const removeImage = (index: number) => {
        const updatedFiles = [...data.images];
        updatedFiles.splice(index, 1);

        const updatedUrls = [...previewUrls];
        updatedUrls.splice(index, 1);

        setData('images', updatedFiles);
        setPreviewUrls(updatedUrls);
    };

    const [existingImages, setExistingImages] = useState<string[]>(room?.images || []);
    const handleRemoveExisting = (path: string) => {
        setExistingImages(existingImages.filter((i) => i !== path));
        setData('remove_images', [...data.remove_images, path]);
    };

    const resetData = () => {
        reset();
        setHotel(null);
        setRoomType(null);
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(data, resetData);
            }}
            className="flex max-w-2xl flex-col gap-6"
        >
            <div className="grid gap-2 md:grid-cols-2">
                <div className="grid grow gap-2">
                    <Label>
                        Hotel <span className="text-red-500">*</span>
                    </Label>
                    <div>
                        <Combobox
                            options={hotelOptions}
                            selectedValue={hotel}
                            setSelectedValue={(value) => {
                                setData('hotel_id', value?.value ?? '');
                                setHotel(value);
                            }}
                            placeholder="Select Hotel"
                        />
                        {errors.hotel_id && <p className="text-sm text-red-500">{errors.hotel_id}</p>}
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>
                        Room Type <span className="text-red-500">*</span>
                    </Label>
                    <div>
                        <Combobox
                            options={roomTypeOptions}
                            selectedValue={roomType}
                            setSelectedValue={(value) => {
                                setData('room_type_id', value?.value ?? '');
                                setRoomType(value);
                            }}
                            placeholder="Select Hotel"
                        />
                        {errors.hotel_id && <p className="text-sm text-red-500">{errors.hotel_id}</p>}
                    </div>
                </div>
            </div>

            <div className="grid gap-2">
                <Label>
                    Room Number <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input value={data.room_number} onChange={(e) => setData('room_number', e.target.value)} placeholder="Hotel Address" />
                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>
                    Price per Night <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input
                        type="number"
                        min={1}
                        value={data.price_per_night}
                        onChange={(e) => setData('price_per_night', e.target.value)}
                        placeholder="Enter max number of guests"
                    />
                    {errors.price_per_night && <p className="text-sm text-red-500">{errors.price_per_night}</p>}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>Upload Images</Label>
                <div>
                    <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
                    <p className="text-sm text-muted-foreground">
                        Accepted formats: <span className="font-medium">JPG, PNG, WebP, SVG</span>. Max size: <span className="font-medium">1MB</span>{' '}
                        each.
                    </p>
                    {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
                </div>

                {/* Image Preview */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {previewUrls.length > 0 && (
                        <>
                            {previewUrls.map((url, idx) => (
                                <div key={idx} className="relative p-1 border rounded">
                                    <img src={url} alt="Preview" className="h-24 w-24 object-contain" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white hover:bg-black"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </>
                    )}

                    {existingImages &&
                        existingImages.map((img: string, i: number) => (
                            <div key={i} className="relative p-1 border rounded">
                                <img src={`/storage/${img}`} alt="Rooms" className="h-24 w-24 object-contain" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExisting(img)}
                                    className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white hover:bg-black"
                                >
                                    <X size={14}/>
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={String(data.status)} onValueChange={(val) => setData('status', val as RoomStatus)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-end gap-2">
                <Link href={rooms.index()}>
                    <Button variant={'secondary'}>Cancel</Button>
                </Link>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
};

export default Form;
