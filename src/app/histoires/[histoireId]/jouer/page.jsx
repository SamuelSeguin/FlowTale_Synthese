// import { GetFullStoryByIdAction } from "@/app/_actions/storyAction";
// import NavBar from "../../../_components/NavBar";
// import VisualisationHistoire from "../../../_components/VisualisationHistoire";
// import { redirect } from "next/navigation";
// import { getSession } from "@/lib/auth";

// //Titre dynamique de l’onglet
// export async function generateMetadata({ params }) {
//   const { histoireId } = await params;
//   const story = await GetFullStoryByIdAction(histoireId);

//   return {
//     title: `${story.titre} - Lecture`,
//   };
// }

// const HistoireVisualisationPage = async ({ params }) => {
//   const { histoireId } = await params;
//   const storyInfo = await GetFullStoryByIdAction(histoireId);

//   let user;

//   try {
//     const session = await getSession();
//     user = session?.user;
//     if (!user) {
//       redirect("/auth/signin");
//     }
//   } catch (err) {
//     redirect("/auth/signin");
//   }

//   return (
//     <div>
//       <NavBar user={user} />
//       <VisualisationHistoire story={storyInfo} />
//     </div>
//   );
// };

// export default HistoireVisualisationPage;
