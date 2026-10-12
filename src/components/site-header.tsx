"use client";

import type { Route } from "next";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ActionButton } from "@/components/action-button";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 border-b py-4 max-md:backdrop-blur-sm md:border-none">
      <div className="container max-md:px-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between md:rounded-xl md:border md:p-2.5 md:backdrop-blur-sm">
          <Link href="/">
            <div className="inline-flex size-10 items-center justify-center rounded-lg border">
              <Icons.logo className="size-8" />
            </div>
          </Link>
          <section className="max-md:hidden">
            <nav className="flex items-center gap-8 text-sm">
              {siteConfig.navItems.map((item, index) => (
                <Link
                  href={item.href as Route}
                  className="text-white/70 transition hover:text-white"
                  key={index}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </section>
          <section className="flex items-center max-md:gap-2.5">
            <ActionButton label="Join Waitlist" />
            <MobileNav
              open={isOpen}
              setOpen={setIsOpen}
              className="flex md:hidden"
            />
          </section>
        </div>
      </div>
    </header>
  );
}

function MobileNav({
  open,
  setOpen,
  className,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}) {
  // Prevent body scroll when the menu is open
  if (typeof window !== "undefined") {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target !p-0 flex size-9 touch-manipulation items-center justify-start gap-2.5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            "items-center justify-center border",
            className,
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5",
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-32}
        sideOffset={16}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="font-medium text-muted-foreground text-sm">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {siteConfig.navItems.map((item, index) => (
                <MobileLink
                  key={index}
                  href={item.href as Route}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps<Route> & {
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href as Route);
        onOpenChange?.(false);
      }}
      className={cn("font-medium text-2xl", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
