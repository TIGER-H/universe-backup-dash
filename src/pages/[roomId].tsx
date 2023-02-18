import Head from "next/head";
import { useRouter } from "next/router";
import { pmRoomCards } from "./api/member.json";

export default function Room() {
  const { roomId } = useRouter().query;
  if (typeof roomId !== "string") {
    return;
  }
  const title = pmRoomCards.filter(
    (room) => room.roomId === parseInt(roomId, 10)
  )[0].name;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>hi</div>
    </>
  );
}
