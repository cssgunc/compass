// page.tsx
import React from "react";
import Head from "next/head";
import Link from "next/link";

const ComingSoonPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Training Manuals - Coming Soon</title>
                <meta
                    name="description"
                    content="Our training manuals page is coming soon. Stay tuned for updates!"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Training Manuals
                    </h1>
                    <p className="text-xl text-white mb-8">
                        Our training manuals page is under construction.
                    </p>
                    <p className="text-lg text-white">
                        Stay tuned for updates!
                    </p>
                    <div className="mt-8">
                        <Link href="/home">
                            <button className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-100 transition duration-300">
                                Notify Me
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComingSoonPage;
