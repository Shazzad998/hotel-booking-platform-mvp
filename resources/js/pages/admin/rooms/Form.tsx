import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { slugify } from '@/lib/utils';
import hotels from '@/routes/admin/hotels';
import { Link, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface HotelFormProps {
    hotel?: any;
    onSubmit: (data: any, reset?: () => void) => void;
    errors: { [key: string]: string };
    reset?: boolean
}

const Form = ({ hotel, onSubmit, errors }: HotelFormProps) => {
    const { data, setData, processing, reset } = useForm({
        name: hotel?.name || '',
        slug: hotel?.slug || '',
        address: hotel?.address || '',
        city: hotel?.city || '',
        country: hotel?.country || '',
        description: hotel?.description || '',
        star_rating: hotel?.star_rating || 3,
        status: hotel?.status || 'active',
        images: [] as File[],
        remove_images: [] as string[],
        _method: hotel? "PUT" : "POST"
    });

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

    const [existingImages, setExistingImages] = useState<string[]>(hotel?.images ? JSON.parse(hotel?.images) : []);
    const handleRemoveExisting = (path: string) => {
        setExistingImages(existingImages.filter((i) => i !== path));
        setData('remove_images', [...data.remove_images, path]);
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(data, reset);
            }}
            className="flex max-w-2xl flex-col gap-6"
        >
            <div className="grid gap-2 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label>
                        Hotel Name <span className="text-red-500">*</span>
                    </Label>
                    <div>
                        <Input
                            value={data.name}
                            onChange={(e) => {
                                setData('name', e.target.value);
                                setData('slug', slugify(e.target.value));
                            }}
                            placeholder="Hotel Name"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>
                        slug <span className="text-red-500">*</span>
                    </Label>
                    <div>
                        <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="Hotel Name" />
                        {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                    </div>
                </div>
            </div>

            <div className="grid gap-2">
                <Label>
                    Address <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="Hotel Address" />
                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>
                    City <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="Hotel City" />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
            </div>
            <div className="grid gap-2">
                <Label>
                    Country <span className="text-red-500">*</span>
                </Label>
                <div>
                    <Input value={data.country} onChange={(e) => setData('country', e.target.value)} placeholder="Hotel Country" />
                    {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>Description</Label>
                <div>
                    <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Hotel Description" />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
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
                                <div key={idx} className="relative">
                                    <img src={url} alt="Preview" className="h-24 w-full rounded border object-cover" />
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
                            <div key={i} className="relative">
                                <img src={`/storage/${img}`} alt="Hotel" className="h-24 w-full rounded border object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExisting(img)}
                                    className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white hover:bg-black"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            <div className="grid gap-2">
                <Label>Star Rating</Label>
                <Select value={String(data.star_rating)} onValueChange={(val) => setData('star_rating', Number(val))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select star rating" />
                    </SelectTrigger>
                    <SelectContent>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <SelectItem key={star} value={String(star)}>
                                {star} Star
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label>Status</Label>
                <Switch
                    id="status"
                    checked={data.status === 'active'}
                    onCheckedChange={(checked) => setData('status', checked ? 'active' : 'inactive')}
                />
            </div>

            <div className="flex justify-end gap-2">
                <Link href={hotels.index()}>
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
