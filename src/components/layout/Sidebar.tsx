
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  PlusCircle, 
  UserCheck, 
  Settings, 
  Users, 
  BarChart 
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ to, icon, label, isActive }: SidebarLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
    )}
  >
    <span className="w-5 h-5">{icon}</span>
    <span>{label}</span>
  </Link>
);

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => pathname === path;

  // Define links based on user role
  const getLinks = () => {
    const links = [];

    // Common links for all roles
    links.push({
      to: "/dashboard",
      icon: <BarChart size={18} />,
      label: "Dashboard",
      isActive: isActive("/dashboard"),
    });

    // Role-specific links
    if (user?.role === "data-entry") {
      links.push({
        to: "/letters/new",
        icon: <PlusCircle size={18} />,
        label: "New Letter",
        isActive: isActive("/letters/new"),
      });
    }

    // All roles can view letters but with different filters
    links.push({
      to: "/letters",
      icon: <FileText size={18} />,
      label: "Letters",
      isActive: isActive("/letters"),
    });

    // General Manager and Department Manager can assign letters
    if (user?.role === "general-manager" || user?.role === "department-manager") {
      links.push({
        to: "/assignments",
        icon: <UserCheck size={18} />,
        label: "Assignments",
        isActive: isActive("/assignments"),
      });
    }

    // Only General Manager can access user management
    if (user?.role === "general-manager") {
      links.push({
        to: "/users",
        icon: <Users size={18} />,
        label: "Users",
        isActive: isActive("/users"),
      });
    }

    // Settings page for all users
    links.push({
      to: "/settings",
      icon: <Settings size={18} />,
      label: "Settings",
      isActive: isActive("/settings"),
    });

    return links;
  };

  const links = getLinks();

  return (
    <div className="w-64 min-h-full bg-sidebar shrink-0 border-r border-sidebar-border">
      <div className="p-4">
        <div className="text-xl font-bold text-sidebar-foreground mb-6">
          Letter Flow
        </div>
        
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={link.isActive}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
