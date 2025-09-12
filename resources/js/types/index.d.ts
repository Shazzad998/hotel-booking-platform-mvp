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
    handleShow: (item: any) => void;
    handleEdit: (item: any) => void;
    confirmDelete: (item: any) => void;
    confirmBulkDelete: (item: any) => void;
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
    facilities?: string[] | null;
    images?: string[] | null;
    star_rating: number; // 1 to 5
    status: 'active' | 'inactive';
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}
