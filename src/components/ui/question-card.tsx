type Question = {
	question: string;
	answer: TrustedHTML;
	image: string | null;
	mark: number;
	chapter: string;
};

const QuestionCard = ({
	question,
	index,
}: {
	question: Question;
	index: number;
}) => {
	return (
		<article className="rounded-lg p-4">
			<header className="mb-3 flex items-start justify-between gap-4">
				<h2 className="text-base font-semibold leading-snug">
					{index + 1}. {question.question}
				</h2>
				<span className="bg-secondary text-secondary-foreground shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
					{question.mark} {question.mark === 1 ? "mark" : "marks"}
				</span>
			</header>

			<div
				className="text-muted-foreground text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_code]:bg-muted [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0"
				dangerouslySetInnerHTML={{
					__html: question.answer as unknown as string,
				}}
			/>

			<footer className="text-muted-foreground mt-3 text-xs">
				{question.chapter}
			</footer>
		</article>
	);
};

export { QuestionCard };
export type { Question };
