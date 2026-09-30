import { RenderQuestions } from "@/components/render-questions";

import questions from "../../questions.json";

export default function Home() {
	return <RenderQuestions questions={questions} />;
}
