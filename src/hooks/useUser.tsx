import Person from "@/pages/api/member.json";
import useSWR from "swr";

const fetcher = (artist: string) =>
  fetch("/api/meta" + "?artist=" + artist).then((res) => res.json());

function useUser(person: typeof Person.pmRoomCards[0]) {
  const { data, error, isLoading } = useSWR(person.name, () =>
    fetcher(person.name)
  );
  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export default useUser;
