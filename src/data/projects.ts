export type Project = {
  id: number;
  title: string;
  desc: string;
  url: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "SnapHost",
    desc: "A file hosting platform for sharing PDFs and images through fast, expiring links without requiring an account.",
    url: "https://snaphost.dev/",
  },
  {
    id: 2,
    title: "Otrack",
    desc: "An internal order and delivery management system built for Ghardailo Dairy to manage orders, flexible delivery schedules, and daily operations.",
    url: "https://otrack.vercel.app/",
  },
  {
    id: 3,
    title: "Ledg",
    desc: "A personal finance tracker for managing expenses, income, transfers, and spending across multiple spaces.",
    url: "https://ledg.rakeshpatel.me/",
  },
  {
    id: 4,
    title: "isHirable",
    desc: "An AI-powered GitHub profile analyzer that evaluates developer profiles, repositories, and contributions to generate actionable feedback.",
    url: "https://ishirable.vercel.app/",
  },
];

export default projects;
