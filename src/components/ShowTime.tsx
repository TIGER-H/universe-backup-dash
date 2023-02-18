export default function ShowTime({ links }: { links: string[] }) {
  if (links.length === 0) {
    return <p>Loading...</p>;
  }

  const link = links[0];
  const url = new URL(link);
  const expireTime = url.searchParams.get("Expires") as string;
  const expires = parseInt(expireTime, 10);

  return (
    <p>
      {new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "medium",
      }).format(expires * 1000)}
    </p>
  );
}
