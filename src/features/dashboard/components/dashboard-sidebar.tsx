"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
import {
  type LucideIcon,
  Home,
  AudioLines,
  Volume2,
  Settings,
  Headphones,
} from "lucide-react";

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
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground group-data-[collapsible=icon]:hidden">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className="h-9 px-3 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-[0px_1px_2px_0px_rgba(44,54,53,0.03)_inset_0px_0px_0px_2px_rgba(44,54,53,0.6)] rounded-md group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                {item.url ? (
                  <Link href={item.url}>
                    <item.icon />
                    {/* Added hidden class here */}
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <item.icon />
                    {/* Added hidden class here */}
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();

  const mainMenuItems: MenuItem[] = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Text to speech", url: "/text-to-speech", icon: AudioLines },
    { title: "Voice cloning", url: "/voice-cloning", icon: Volume2 },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: "Settings",
      icon: Settings,
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Help and support",
      url: "mailto:support@resonance.com",
      icon: Headphones,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 pt-4">
        <div className="flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
          <Image
            src="/logo svs.jpg"
            alt="resonance"
            width={24}
            height={24}
            className="rounded-sm object-contain"
          />
          <span className="group-data-[collapsible=icon]:hidden font-semibold text-lg tracking-tighter text-foreground">
            Resonance
          </span>
          <SidebarTrigger className="ml-auto lg:hidden" />
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              fallback={
                <Skeleton className="h-8 w-full group-data-[collapsible=icon]:size-8 border bg-white" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  organizationSwitcherTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-9! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center!",
                  organizationPreview: "gap-2!",
                  organizationPreviewAvatarBox: "size-6! rounded-sm!",
                  organizationPreviewTextContainer:
                    "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                  organizationPreviewMainIdentifier: "text-[13px]!",
                  organizationSwitcherTriggerIcon:
                    "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavSection items={mainMenuItems} pathname={pathname} />
        <NavSection
          label="Others"
          items={othersMenuItems}
          pathname={pathname}
        />
      </SidebarContent>

      <SidebarFooter className="gap-3 py-3">
        <div className="p-4 flex justify-center group-data-[collapsible=icon]:p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <UserButton
                showName
                fallback={
                  <Skeleton className="h-8 w-full group-data-[collapsible=icon]:size-8 border bg-white" />
                }
                appearance={{
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    userButtonTrigger:
                      "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-9! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center!",
                    userButtonBox:
                      "flex-row-reverse! gap-2! group-data-[collapsible=icon]:flex-row!",
                    userButtonOuterIdentifier:
                      "text-[13px]! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                    userButtonAvatarBox: "size-6! rounded-sm!",
                    userButtonTriggerIcon:
                      "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
