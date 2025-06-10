import { getPythStakingClient } from "@/action/pythActions";

export default async function Home() {
  await getPythStakingClient();

  return <div>hi</div>;
}
