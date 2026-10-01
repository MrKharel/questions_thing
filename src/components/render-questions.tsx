"use client";

import { useState, useMemo } from "react";

import { QuestionCard, type Question } from "@/components/ui/question-card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Mark = "All" | "1" | "2" | "4";

type Chapter =
	| "All chapters"
	| "Scientific Learning"
	| "Classification Of Living beings"
	| "Mushroom"
	| "Evolution"
	| "Force and Motion"
	| "Machines"
	| "Energy";

const marks: { label: string; value: Mark }[] = [
	{ label: "All mark type", value: "All" },
	{ label: "1 mark type", value: "1" },
	{ label: "2 marks type", value: "2" },
	{ label: "4 marks type", value: "4" },
];
const chapters: Chapter[] = [
	"All chapters",
	"Scientific Learning",
	"Classification Of Living beings",
	"Mushroom",
	"Evolution",
	"Force and Motion",
	"Machines",
	"Energy",
];

const RenderQuestions = (props: { questions: Question[] }) => {
	const [markFilter, setMarkFilter] = useState<Mark>("All");
	const [chapterFilter, setChapterFilter] = useState<Chapter>("All chapters");

	const filteredQuestions = useMemo(
		() =>
			props.questions.filter(
				(q) =>
					(markFilter === "All" || String(q.mark) === markFilter) &&
					(chapterFilter === "All chapters" || q.chapter === chapterFilter),
			),
		[props.questions, markFilter, chapterFilter],
	);

	return (
		<div className="flex flex-col gap-4">
			<header>
				<div className="flex gap-2 flex-wrap *:w-fit">
					<Select
						items={marks}
						value={String(markFilter)}
						onValueChange={(value) => setMarkFilter(value ?? "All")}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Marks" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{marks.map((item) => (
									<SelectItem key={item.label} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Select
						value={chapterFilter}
						onValueChange={(value) => setChapterFilter(value ?? "All chapters")}
					>
						<SelectTrigger>
							<SelectValue placeholder="Chapter" />
						</SelectTrigger>
						<SelectContent className="w-[250px]">
							<SelectGroup>
								{chapters.map((chapter) => (
									<SelectItem key={chapter} value={chapter} className="w-full">
										{chapter}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</header>

			{filteredQuestions.map((question, index) => (
				<QuestionCard key={index} question={question} index={index} />
			))}
		</div>
	);
};

export { RenderQuestions };
