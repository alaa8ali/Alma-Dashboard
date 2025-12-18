import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  Settings, 
  Tag, 
  UtensilsCrossed,
  Wrench,
  Bell,
  MessageSquare,
  MapPin,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Building2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { base44 } from '@/api/base44Client';

const menuItems = [
  { 
    name: 'لوحة التحكم', 
    icon: LayoutDashboard, 
    page: 'Dashboard',
    color: 'text-blue-500'
  },
  { 
    name: 'الطلبات', 
    icon: ShoppingCart, 
    page: 'Orders',
    color: 'text-emerald-500',
    badge: true
  },
  { 
    name: 'المنتجات', 
    icon: Package, 
    page: 'Products',
    color: 'text-purple-500'
  },
  { 
    name: 'الفئات', 
    icon: Tag, 
    page: 'Categories',
    color: 'text-orange-500'
  },
  { 
    name: 'العروض', 
    icon: Tag, 
    page: 'Offers',
    color: 'text-pink-500'
  },
  { 
    name: 'القائمة اليومية', 
    icon: UtensilsCrossed, 
    page: 'DailyMenu',
    color: 'text-amber-500'
  },
  { 
    name: 'السائقين', 
    icon: Truck, 
    page: 'Drivers',
    color: 'text-cyan-500'
  },
  { 
    name: 'الخريطة الحية', 
    icon: MapPin, 
    page: 'LiveMap',
    color: 'text-red-500'
  },
  { 
    name: 'الخدمات', 
    icon: Wrench, 
    page: 'Services',
    color: 'text-indigo-500'
  },
  { 
    name: 'العملاء', 
    icon: Users, 
    page: 'Customers',
    color: 'text-teal-500'
  },
  { 
    name: 'العمال', 
    icon: Users, 
    page: 'Workers',
    color: 'text-lime-500'
  },
  { 
    name: 'الفروع', 
    icon: Building2, 
    page: 'Branches',
    color: 'text-violet-500'
  },
  { 
    name: 'الإشعارات', 
    icon: Bell, 
    page: 'Notifications',
    color: 'text-yellow-500'
  },
  { 
    name: 'الرسائل', 
    icon: MessageSquare, 
    page: 'Messages',
    color: 'text-rose-500'
  },
  { 
    name: 'الإعدادات', 
    icon: Settings, 
    page: 'Settings',
    color: 'text-slate-500'
  },
  ];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-slate-800">Alma</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 right-0 h-full bg-white border-l border-slate-200 z-50 transition-all duration-300",
        "lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-slate-800">Alma</h1>
                <p className="text-xs text-slate-400">لوحة التحكم</p>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="hidden lg:flex"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform",
              !sidebarOpen && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-blue-600" : item.color
                  )} />
                  {sidebarOpen && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-100 bg-white">
          <div className={cn(
            "flex items-center gap-3",
            !sidebarOpen && "justify-center"
          )}>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-slate-100 text-slate-600 text-sm">
                م
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">المدير</p>
                <p className="text-xs text-slate-400 truncate">admin@alma.com</p>
              </div>
            )}
            {sidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-400 hover:text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 min-h-screen",
        "pt-16 lg:pt-0",
        sidebarOpen ? "lg:mr-64" : "lg:mr-20"
      )}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
