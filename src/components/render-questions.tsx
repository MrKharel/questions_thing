import { QuestionCard } from "@/components/ui/question-card";

import { type Question } from "@/components/ui/question-card";

const RenderQuestions = (props: { questions: Question[] }) => {
	return (
		<div className="flex flex-col gap-4">
			{props.questions.map((question, index) => (
				<QuestionCard key={index} question={question} />
			))}
		</div>
	);
};

export { RenderQuestions };
