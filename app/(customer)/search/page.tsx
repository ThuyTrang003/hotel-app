"use client"

import ContentSearch from "@/features/search/components/content-search"
import Stepper from "@/features/room/components/stepper"

export default function Search(){
    console.log("Rendering Stepper");
    return(
        <div>
            <Stepper/>
            <ContentSearch/>
        </div>
    )
}