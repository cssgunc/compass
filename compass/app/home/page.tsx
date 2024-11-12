"use client";
import Callout from "@/components/resource/Callout";
import Card from "@/components/resource/Card";
import { LandingSearchBar } from "@/components/resource/LandingSearchBar";
import { SearchResult } from "@/components/resource/SearchResult";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="flex justify-center p-14">
                <h1 className="font-bold text-4xl text-purple-800">
                    Good evening!
                </h1>
            </div>

            <LandingSearchBar />
        </div>
    );
}
