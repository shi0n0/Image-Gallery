"use client"

import { usePathname } from "next/navigation";

export default function EditCard() {
  const getPagePath = usePathname();
  const pagePath = getPagePath.replace("/dashboard/edit", "");

  return(
    <div>
      
    </div>
  )
}