export interface Room {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const rooms: Room[] = [
  {
    id: "1",
    name: "Ocean View Suite",
    price: 250,
    description: "A beautiful suite overlooking the Atlantic Ocean.",
    image: "/room1.jpg",
  },
];
