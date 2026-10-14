import Link from "next/link";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

import { dateFormatter } from "@/lib/date-formatter";

import type { Class } from "@/app/api/types";

const ClassCard = ({ virtualClass }: { virtualClass: Class }) => {
  return (
    <Link
      href={`/class/${virtualClass.id}`}
      className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="p-2 rounded-md h-full transition-colors group-hover:border-foreground/30 group-hover:bg-muted/40 flex flex-col gap-1">
        <CardHeader>
          <CardTitle className="truncate text-lg text-foreground">
            {virtualClass.subject}
          </CardTitle>
        </CardHeader>

        <CardFooter className="mt-auto text-xs text-muted-foreground">
          Created {dateFormatter.format(new Date(virtualClass.created_at))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export { ClassCard };
