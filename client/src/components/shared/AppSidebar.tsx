import {
  FileText,
  Folder,
  FolderArchive,
  FolderOpen,
  Plus,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavUser } from "./NavUser";

/* ======================
   Dummy Data (UI Only)
====================== */

const RECENTS = [
  {
    id: "1",
    title: "Meeting Notes",
    folder: { name: "Work" },
  },
  {
    id: "2",
    title: "Project Ideas",
    folder: { name: "Personal" },
  },
];

const FOLDERS = [
  { id: "1", name: "Work" },
  { id: "2", name: "Personal" },
  { id: "3", name: "College" },
];

const MORES = [
  { title: "Favorites", url: "/favorites", icon: StarIcon },
  { title: "Trash", url: "/trash", icon: Trash2Icon },
  { title: "Archive Notes", url: "/archive", icon: FolderArchive },
];

/* ======================
   Component
====================== */

export function AppSidebar() {
  const { pathname } = useLocation();

  const { data } = authClient.useSession();
  const user = data?.user;

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Nowted
          </Link>
          {/* Button New Note (UI only) */}
          <Button
            variant={"outline"}
            size={"icon-lg"}
            className="text-sm text-muted-foreground hover:text-foreground">
            <Plus />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Recents */}
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <Separator className="my-1" />
          <SidebarGroupContent>
            <SidebarMenu>
              {RECENTS.map((recent) => (
                <SidebarMenuItem key={recent.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/${recent.folder.name}/${recent.id}`}>
                      <FileText />
                      <span>{recent.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Folders */}
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <Separator className="mt-2 mb-1" />
          <SidebarGroupContent>
            <SidebarMenu>
              {FOLDERS.map((folder) => {
                const active = pathname.split("/")[1] === folder.name;
                const Icon = active ? FolderOpen : Folder;

                return (
                  <SidebarMenuItem key={folder.id}>
                    <SidebarMenuButton isActive={active} asChild>
                      <Link to={`/${folder.name}`}>
                        <Icon />
                        <span>{folder.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* More */}
        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <Separator className="my-1" />
          <SidebarGroupContent>
            <SidebarMenu>
              {MORES.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <Button variant="default" className="w-full" asChild>
            <Link to="/sign-in">Login</Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
