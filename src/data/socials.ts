export type Social = {
  id: number;
  title: string;
  url: string;
  tab: number;
};

const socials: Social[] = [
  {
    id: 1,
    title: "GitHub",
    url: "https://github.com/rakeshpatel-dev",
    tab: 3,
  },
  {
    id: 2,
    title: "LinkedIn",
    url: "https://linkedin.com/in/1o1rakesh/",
    tab: 3,
  },
  {
    id: 3,
    title: "Facebook",
    url: "https://www.facebook.com/rakeshpatel.me",
    tab: 1,
  },
  {
    id: 4,
    title: "Instagram",
    url: "https://instagram.com/1o1rakesh",
    tab: 0,
  },
];

export default socials;
