import Image from "next/image";
import Contents from "@/pages/api/LUDA.json";
import Person from "@/pages/api/member.json";
import useUser from "@/hooks/useUser";
import ShowTime from "./ShowTime";

const getOriginalLinksAndMapping = (contents: typeof Contents) => {
  return contents.map((content) => {
    const {
      contents: {
        attachment: { mediaType, mediaList },
        aiVoice,
      },
    } = content;

    let links: string[] = [];
    mediaType === "IMAGE"
      ? (links = mediaList.map((media) => media.originPath))
      : (links = mediaList.map((media) => media.originPath));

    // aiVoice &&
    //   links.push(
    //     aiVoice.replace("converted/", "").replace(/((.*).wav)(.*)/, "$1")
    //   );

    return links.join("\n");
  });
};

export default function Row({
  person,
}: {
  person: typeof Person.pmRoomCards[0];
}) {
  const { user, isError, isLoading } = useUser(person);

  if (isError) return <p>Something went wrong... Please try again later.</p>;

  const links = user ? getOriginalLinksAndMapping(user) : [];
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <Image
              className="h-10 w-10 rounded-full"
              src={person.imagePath}
              width={40}
              height={40}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{person.name}</div>
            <div className="text-gray-500">{person.planetName}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {isLoading ? (
          "Loading..."
        ) : (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            {user.length} Artist Board Post
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <ShowTime links={links} />
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(
            links.join("\n")
          )}`}
          className="text-indigo-600 hover:text-indigo-900"
          download={`${person.name}.txt`}
        >
          {links.length > 0 ? "Download" : "Loading..."}
          <span className="sr-only">{person.name}</span>
        </a>
      </td>
    </tr>
  );
}
