import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    show?:boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface ResourceData {
    data: any[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: any[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}
export interface DataTableColumn {
    title: string;
    field: string;
    sortable?: boolean;
    render?: (item: any) => React.ReactNode;
}

export interface DataTableAction {
    label: string;
    icon?: React.ReactNode;
    onClick: (item: any) => void;
    className?: string;
}
export interface DataTableBulkAction {
    label: string;
    icon?: React.ReactNode;
    onClick: (selectedIds: number[]) => void;
    className?: string;
}

export interface DataTableProps {
    resource: ResourceData;
    selected: number[];
    setSelected: (selected: number[]) => void;
    selectedAll: boolean;
    setSelectedAll: (selected: boolean) => void;
    columns: DataTableColumn[];
    list_route: string;
    bulkActions?: DataTableBulkAction[];
    actions?: DataTableAction[];
}

export interface Filters {
    search: string;
    sort_by: string;
    sort_direction: string;
    per_page: number;
    page: number;
}

export interface Hotel {
    id: number;
    name: string;
    slug: string;
    address: string;
    city: string;
    country: string;
    description?: string | null;
    images?: string[] | null;
    star_rating: number; // 1 to 5
    status: 'active' | 'inactive';
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    price_start_from?:string
}

export interface RoomType {
    id: number;
    name: string;
    description?: string | null;
    no_of_bedrooms: number;
    max_guests: number;
    facilities?: string[] | null; // stored as JSON array
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

export interface Room {
    id: number;
    hotel_id: number;
    room_type_id: number;
    room_number: string;
    price_per_night: string;
    images?: string[] | null;
    status: 'available' | 'booked' | 'under_maintenance';
    created_at: string;
    updated_at: string;

    // Optional relations (if eager loaded from backend)
    hotel?: Hotel;
    room_type?: RoomType;
}
export type RoomStatus = "available" | "booked" | "under_maintenance";

// Used for alert
export interface Flash {
    success: string;
    info: string;
    warning: string;
    error: string;
}

// Used for  dropdown select options
export type SelectOption = {
    label: string;
    value: string;
    description?: string;
    image?: string;
};


export interface QueryFilters {
  from: string;
  to: string;
  number_of_rooms: string;
  number_of_guests: string;
}
