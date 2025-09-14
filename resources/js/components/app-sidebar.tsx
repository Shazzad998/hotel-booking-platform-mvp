import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookCheck, Building2, House, LayoutDashboard, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
import hotels from '@/routes/admin/hotels';
import roomTypes from '@/routes/admin/room-types';
import rooms from '@/routes/admin/rooms';
import bookings from '@/routes/user/bookings';
import admin from '@/routes/admin';




export function AppSidebar() {

    const { auth } = usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        show: true
    },
    {
        title: 'Hotels',
        href: hotels.index().url,
        icon: Building2,
        show: auth.user.role == 'admin'
    },
    {
        title: 'Room Types',
        href: roomTypes.index().url,
        icon: LayoutDashboard,
        show: auth.user.role == 'admin'
    },
    {
        title: 'Rooms',
        href: rooms.index().url,
        icon: House,
        show: auth.user.role == 'admin'
    },

    {
        title: 'Bookings',
        href: auth.user.role == 'admin' ? admin.bookings.index().url : bookings.index().url,
        icon: BookCheck,
        show: true
    },
];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
