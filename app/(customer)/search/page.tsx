"use client"

import ContentSearch from "@/features/search/components/content-search"
import Progressbar from "@/features/search/components/progressbar"

export default function Search(){
    return(
        <div>
            {/* <Progressbar/> */}
            <ContentSearch/>
        </div>
    )
}