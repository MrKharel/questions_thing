"use client";

import { useState, useMemo, useEffect } from "react";
import { StarIcon } from "lucide-react";
import { cn } from "cn";
import { useQuery } from "@tanstack/react-query";

import { QuestionCard, type Question } from "@/components/ui/question-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useIsMobile } from "@/hooks/use-mobile";

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

const STORAGE_KEY = "rating";
const OPEN_DELAY_MS = 5000;
const STARS = [1, 2, 3, 4, 5];

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
            value={markFilter}
            onValueChange={(value) => setMarkFilter((value ?? "All") as Mark)}
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
            onValueChange={(value) =>
              setChapterFilter((value ?? "All chapters") as Chapter)
            }
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

      <ReviewSystem />
      <Ratings />
    </div>
  );
};

const useDelayedOpen = (delay: number) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setIsOpen(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return [isOpen, setIsOpen] as const;
};

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (star: number) => void;
}) => {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <CardContent
      role="radiogroup"
      aria-label="Rating"
      className="flex gap-1"
      onMouseLeave={() => setHovered(0)}
    >
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} out of 5 stars`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onFocus={() => setHovered(star)}
          onBlur={() => setHovered(0)}
          className="rounded-md p-1 outline-none transition-transform duration-150 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <StarIcon
            className={cn(
              "h-8 w-8 transition-colors duration-150",
              star <= active
                ? "fill-amber-400 stroke-amber-500"
                : "fill-transparent stroke-neutral-300",
            )}
          />
        </button>
      ))}
    </CardContent>
  );
};

const ReviewForm = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (rating === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars: rating, username: username.trim() }),
      });
      const result = await res.json();
      if (!result.success) {
        setError(result.message);
        return;
      }

      localStorage.setItem(STORAGE_KEY, String(rating));
      onSubmitted();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-4"
    >
      <CardTitle className="text-2xl">How are the answers?</CardTitle>

      <StarRating value={rating} onChange={setRating} />

      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your name"
        className="w-full max-w-55"
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        className="w-full max-w-55"
        disabled={rating === 0 || !username.trim() || isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Confirm"}
      </Button>
    </form>
  );
};

const ReviewModal = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="fixed top-0 left-0 z-4 h-screen w-screen backdrop-blur-sm" />
      <Card
        className={cn(
          "z-5 flex flex-col items-center gap-4",
          isMobile
            ? "fixed top-0 left-0 h-screen w-screen justify-center"
            : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-12",
        )}
      >
        <ReviewForm onSubmitted={onSubmitted} />
      </Card>
    </>
  );
};

const ReviewSystem = () => {
  const [isOpen, setIsOpen] = useDelayedOpen(OPEN_DELAY_MS);

  if (!isOpen) return null;

  return <ReviewModal onSubmitted={() => setIsOpen(false)} />;
};

type Rating = {
  id: string;
  stars: number;
  username: string;
  created_at: string;
};

const StarsDisplay = ({ value }: { value: number }) => (
  <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
    {STARS.map((star) => (
      <StarIcon
        key={star}
        className={cn(
          "h-4 w-4",
          star <= Math.round(value)
            ? "fill-amber-400 stroke-amber-500"
            : "fill-transparent stroke-neutral-300",
        )}
      />
    ))}
  </div>
);

const RatingsSummary = ({ ratings }: { ratings: Rating[] }) => {
  const average = ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length;

  return (
    <div className="flex items-center gap-3">
      <span className="text-3xl font-semibold">{average.toFixed(1)}</span>
      <div className="flex flex-col gap-1">
        <StarsDisplay value={average} />
        <span className="text-xs text-muted-foreground">
          {ratings.length} {ratings.length === 1 ? "rating" : "ratings"}
        </span>
      </div>
    </div>
  );
};

const RatingItem = ({ rating }: { rating: Rating }) => (
  <li className="flex items-center justify-between gap-4 py-2">
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-medium">{rating.username}</span>
      <span className="text-xs text-muted-foreground">
        {new Date(rating.created_at).toLocaleDateString()}
      </span>
    </div>
    <StarsDisplay value={rating.stars} />
  </li>
);

const Ratings = () => {
  const {
    data: ratings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ratings"],
    queryFn: async () => {
      const res = await fetch(`/api/rating`, {
        credentials: "include",
      });
      const result = await res.json();
      if (!result.success) {
        console.error(result.message);
      }
      console.log({ res, result, data: result.data });
      return result.data;
    },
  });

  return (
    <div className="flex flex-col gap-4 px-4">
      <h3 className="text-xl text-primary-foreground">Ratings</h3>

      <div className="flex flex-col gap-4 p-0">
        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}

        {error && <p className="text-sm text-red-500">{error.message}</p>}

        {ratings && ratings.length === 0 && (
          <p className="text-sm text-muted-foreground">No ratings yet.</p>
        )}

        {ratings && ratings.length > 0 && (
          <>
            <RatingsSummary ratings={ratings} />
            <ul className="divide-y">
              {ratings.map((rating: any) => (
                <RatingItem key={rating.id} rating={rating} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export { RenderQuestions };
