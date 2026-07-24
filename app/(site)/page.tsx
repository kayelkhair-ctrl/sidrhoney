import { Render } from "@puckeditor/core/rsc";
import { config } from "@/puck/config";
import homeData from "../../content/pages/home.json";

export default function HomePage() {
  return <Render config={config} data={homeData as never} />;
}
