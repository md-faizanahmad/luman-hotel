export interface Dish {
  n: string; // Name
  p: string; // Price
  d: string; // Description
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  image: string;
  icon: React.ReactNode;
  desc: string;
  menu: {
    mains: Dish[];
    starters: Dish[];
    desserts: Dish[];
  };
}
