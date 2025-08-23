type BlogPost = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  herf: string;
};

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "World Full Year 2024: Discover the Top 500 best-selling models",
    content:
      "The Toyota RAV4 is the most popular vehicle in the world in 2024. Today and for the first time since 2020 we are able to share with you the 500 best-selling models in the world for 2024. As always there are detailed notes alongside the models to help you understand…",
    author: "Matt Gasnier",
    date: "2024-08-15",
    herf: "https://bestsellingcarsblog.com/2025/08/world-full-year-2024-discover-the-top-500-best-selling-models/",
  },
  {
    id: 2,
    title: "The Forgotten Ferraris: 5 Models That Deserve More Love",
    content:
      "Beyond the F40 and 250 GTO, there’s a world of Ferrari to discover. We highlight 5 forgotten Ferrari models that are now surprisingly undervalued and deserve more love.",
    author: "Amos Kwon",
    date: "2025-08-01",
    herf: "https://www.autoblog.com/features/the-forgotten-ferraris-5-models-that-deserve-more-love",
  },
  {
    id: 3,
    title: "How Can You Save on Your EV Purchase?",
    content:
      "Since the changeover in presidential administrations, a lot of uncertainty has been swirling about electric vehicles, specifically the fate of the federal EV tax credit. Now, with the passage of the Trump administration’s “One Big Beautiful Bill Act,” we know that the EV tax credit’s expiration date is...",
    author: "Jennifer Geiger",
    date: "2025-07-24",
    herf: "https://www.cars.com/articles/how-can-you-save-on-your-ev-purchase-512854/",
  },
];

export default function Blog() {
  return (
    <section className="inner-container mt-[100px]">
      <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
      <div className="mt-[30px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((blog) => (
          <Card
            className="bg-secondary border-border rounded-lg border"
            key={blog.id}
          >
            <CardHeader>
              <CardTitle className="text-primary text-lg font-semibold">
                {blog.title}
              </CardTitle>
              <CardDescription>
                <span className="text-subPrimary text-sm">
                  Published on {blog.date} by {blog.author}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-subPrimary line-clamp-4 text-sm">
                {blog.content}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="bg-btnBg hover:bg-btnBg font-inter text-secondary cursor-pointer text-sm font-medium">
                <a href={blog.herf}>Read More</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
