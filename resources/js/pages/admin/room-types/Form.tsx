import { TagsInput } from '@/components/TagsInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import roomTypes from '@/routes/admin/room-types';
import { Link, useForm } from '@inertiajs/react';

interface FormProps {
    roomType?: any;
    onSubmit: (data: any, reset?: () => void) => void;
    errors: { [key: string]: string };
}

const Form = ({ roomType, onSubmit, errors }: FormProps) => {
    const { data, setData, processing, reset } = useForm({
        name: roomType?.name || '',
        description: roomType?.description || '',
        no_of_bedrooms: roomType?.no_of_bedrooms || '',
        max_guests: roomType?.max_guests || '',
        facilities: roomType?.facilities || [],
        _method: roomType ? 'PUT' : 'POST',
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(data, reset);
            }}
            className="flex max-w-2xl flex-col gap-6"
        >
            {/* Name */}
            <div className="grid gap-2">
                <Label>
                    Name <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Room Type Name" />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
            </div>

            {/* Number of bedrooms */}
            <div className="grid gap-2">
                <Label>
                    Number of bedrooms <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input
                        type="number"
                        min={1}
                        value={data.no_of_bedrooms}
                        onChange={(e) => setData('no_of_bedrooms', Number(e.target.value))}
                        placeholder="Enter number of bedrooms"
                    />
                    {errors.no_of_bedrooms && <p className="text-sm text-red-500">{errors.no_of_bedrooms}</p>}
                </div>
            </div>

            {/* Max Guests */}
            <div className="grid gap-2">
                <Label>
                    Max Guests <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input
                        type="number"
                        min={1}
                        value={data.max_guests}
                        onChange={(e) => setData('max_guests', Number(e.target.value))}
                        placeholder="Enter max number of guests"
                    />
                    {errors.max_guests && <p className="text-sm text-red-500">{errors.max_guests}</p>}
                </div>
            </div>

            {/* Facilities */}
            <div className="grid gap-2">
                <Label>
                    Facilities
                </Label>
                <div>
                    <TagsInput value={data.facilities} onValueChange={(newValue) => setData('facilities', newValue)} placeholder='Enter Facilities' />

                    <p className="text-sm text-muted-foreground mt-px">
                        Start typing to add facilities (press <span className="font-medium">Enter</span> to confirm)
                    </p>
                    {errors.facilities && <p className="text-sm text-red-500">{errors.facilities}</p>}
                </div>
            </div>

            {/* Description */}
            <div className="grid gap-2">
                <Label>Description</Label>
                <div>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Write something about this room type..."
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
                <Link href={roomTypes.index()}>
                    <Button variant="secondary">Cancel</Button>
                </Link>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
};

export default Form;
