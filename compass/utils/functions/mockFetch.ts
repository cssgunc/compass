import { PROGRAM, STATUS, USER } from "../constants";

const serviceEntries = [
    {
        name: "Empowerment Workshops",
        status: [STATUS.ACCEPTING_CLIENTS],
        summary:
            "Workshops to empower victims through education and skill-building.",
        requirements:
            "Resident of the community and victim of domestic violence.",
        program: [PROGRAM.DOMESTIC_VIOLENCE, PROGRAM.COMMUNITY_EDUCATION],
        tags: ["empowerment", "education"],
    },
    {
        name: "Financial Literacy Courses",
        status: [STATUS.ACCEPTING_CLIENTS, STATUS.FULL],
        summary:
            "Courses aimed at improving financial independence for victims.",
        requirements: "Open to all domestic violence victims.",
        program: [PROGRAM.ECONOMIC_STABILITY],
        tags: ["finance", "literacy"],
    },
    {
        name: "Counseling Services",
        status: [STATUS.ACCEPTING_CLIENTS],
        summary:
            "Professional counseling for individuals and families affected by domestic violence.",
        requirements: "Appointment required.",
        program: [PROGRAM.DOMESTIC_VIOLENCE],
        tags: ["counseling", "mental health"],
    },
    {
        name: "Job Placement Program",
        status: [STATUS.ACCEPTING_CLIENTS],
        summary: "Assistance with job search and placement for survivors.",
        requirements: "Must be actively seeking employment.",
        program: [PROGRAM.ECONOMIC_STABILITY],
        tags: ["job", "employment"],
    },
    {
        name: "Legal Advocacy",
        status: [STATUS.FULL],
        summary:
            "Legal advice and representation for victims of domestic violence.",
        requirements: "Legal documentation of domestic violence required.",
        program: [PROGRAM.DOMESTIC_VIOLENCE],
        tags: ["legal", "advocacy"],
    },
];

const resourceEntries = [
    {
        name: "Legal Aid Reference",
        summary: "Comprehensive list of legal resources for victims.",
        link: "https://legalaid.example.com",
        program: [PROGRAM.DOMESTIC_VIOLENCE],
        tags: ["legal", "aid"],
    },
    {
        name: "Shelter Locations",
        summary: "Directory of safe shelters for victims escaping abuse.",
        link: "https://shelters.example.com",
        program: [PROGRAM.DOMESTIC_VIOLENCE],
        tags: ["shelter", "safety"],
    },
    {
        name: "Support Group Finder",
        summary:
            "Find local support groups for survivors of domestic violence.",
        link: "https://supportgroups.example.com",
        program: [PROGRAM.COMMUNITY_EDUCATION],
        tags: ["support", "community"],
    },
    {
        name: "Employment Services",
        summary: "Resources for job training and placement services.",
        link: "https://employment.example.com",
        program: [PROGRAM.ECONOMIC_STABILITY],
        tags: ["job", "training"],
    },
    {
        name: "Educational Workshops",
        summary: "Schedule of educational workshops on various topics.",
        link: "https://workshops.example.com",
        program: [PROGRAM.COMMUNITY_EDUCATION],
        tags: ["education", "workshops"],
    },
];

const userEntries = [
    {
        name: "Alex Johnson",
        role: [USER.VOLUNTEER],
        email: "alex.johnson@example.com",
        program: [PROGRAM.DOMESTIC_VIOLENCE],
        experience: 2,
        group: "Volunteer Group A",
    },
    {
        name: "Sam Lee",
        role: [USER.EMPLOYEE],
        email: "sam.lee@example.com",
        program: [PROGRAM.ECONOMIC_STABILITY],
        experience: 5,
        group: "Economic Support Team",
    },
    {
        name: "Jordan Smith",
        role: [USER.ADMIN, USER.VOLUNTEER],
        email: "jordan.smith@example.com",
        program: [PROGRAM.COMMUNITY_EDUCATION, PROGRAM.DOMESTIC_VIOLENCE],
        experience: 3,
        group: "Outreach and Education",
    },
    {
        name: "Casey Martinez",
        role: [USER.VOLUNTEER],
        email: "casey.martinez@example.com",
        program: [PROGRAM.ECONOMIC_STABILITY],
        experience: 1,
        group: "Financial Literacy Volunteers",
    },
    {
        name: "Jamie Chung",
        role: [USER.EMPLOYEE],
        email: "jamie.chung@example.com",
        program: [PROGRAM.DOMESTIC_VIOLENCE],
        experience: 4,
        group: "Counseling Services Team",
    },
];

export const mockFetchServices = () => {
    return serviceEntries;
};

export const mockFetchResources = () => {
    return resourceEntries;
};

export const mockFetchUsers = () => {
    return userEntries;
};
