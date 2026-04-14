import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, Send, Bot, List, Users, Kanban, CheckSquare,
  Mail, Linkedin, AppWindow, Inbox, ChevronDown, User,
  Building2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const platformItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Campaigns", url: "/campaigns", icon: Send },
  { title: "Dit Agents", url: "/agents", icon: Bot, badge: "Initial Release" },
];

const leadsItems = [
  { title: "Lists", url: "/lists", icon: List },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Pipeline", url: "/pipeline", icon: Kanban },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
];

const othersItems = [
  { title: "Unibox", url: "/unibox", icon: Inbox, badge: "new" },
  { title: "Email Accounts", url: "/email-accounts", icon: Mail },
  { title: "LinkedIn Accounts", url: "/linkedin-accounts", icon: Linkedin },
  { title: "Apps", url: "/apps", icon: AppWindow },
];

function SidebarSection({ label, items }: { label: string; items: typeof platformItems }) {
  const location = useLocation();

  return (
    <div className="mb-4">
      <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <div className="space-y-0.5">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md mx-2 transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/20 text-primary border-0">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="w-60 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      {/* Org selector */}
      <div className="p-4 border-b border-sidebar-border">
        <button className="flex items-center gap-2 w-full text-left text-sm text-foreground hover:bg-sidebar-accent rounded-md p-2 transition-colors">
          <div className="w-7 h-7 rounded bg-primary/20 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-xs truncate">My organization</p>
            <p className="text-[10px] text-muted-foreground">Free</p>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        <SidebarSection label="Platform" items={platformItems} />
        <SidebarSection label="Leads & CRM" items={leadsItems} />
        <SidebarSection label="Others" items={othersItems} />
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Talha Anwar</p>
            <p className="text-[10px] text-muted-foreground truncate">talha@tegency.site</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
