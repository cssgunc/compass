"use client";
import Callout from "@/components/resource/Callout";
import Card from "@/components/resource/Card";
import { LandingSearchBar } from "@/components/resource/LandingSearchBar";
import {
    BookOpenIcon,
    BookmarkIcon,
    ClipboardIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* icon + title  */}
            <div className="pt-16 px-8 pb-4 flex-row">
                <div className="mb-4 flex items-center space-x-4">
                    <Image
                        src="/logo.png"
                        alt="Compass Center logo."
                        width={25}
                        height={25}
                    />
                    <h1 className="font-bold text-2xl text-purple-800">
                        Compass Center Advocate Landing Page
                    </h1>
                </div>
                <Callout>
                    Welcome! Below you will find a list of resources for the
                    Compass Center&apos;s trained advocates. These materials
                    serve to virtually provide a collection of advocacy,
                    resource, and hotline manuals and information.
                    <b>
                        {" "}
                        If you are an advocate looking for the contact
                        information of a particular Compass Center employee,
                        please directly contact your staff back-up or the person
                        in charge of your training.
                    </b>
                </Callout>
            </div>
            <div className="p-8 flex-grow border-t border-gray-200 bg-gray-50">
                {/* link to different pages  */}
                <div className="grid grid-cols-3 gap-6 pb-6">
                    <Card icon={<BookmarkIcon />} text="Resources" />
                    <Card icon={<ClipboardIcon />} text="Services" />
                    <Card icon={<BookOpenIcon />} text="Training Manuals" />
                </div>
                {/* search bar */}
                <LandingSearchBar />
            </div>
        </div>
    );
}
