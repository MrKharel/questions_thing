"use client";

import { useState } from "react";
import { useProfileQuery, useProfileMutation } from "@/hooks/use-profile";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";

import type { SubmitEvent } from "react";
import type { Profile } from "@/lib/types";

//types
type ViewScreenProps = { profile: Profile; onEdit: () => void };
type EditScreenProps = { profile: Profile; onClose: () => void };

const Profile = () => {
  const profile = useProfileQuery();
  // Which of the two panels is currently visible.
  const [isEditing, setIsEditing] = useState(false);

  if (profile.isLoading) return <ProfileSkeleton />;
  if (!profile.data) return null;
  return (
    <aside className="flex w-full flex-row gap-5 md:max-w-60 md:flex-col md:items-stretch">
      {isEditing ? (
        <EditScreen
          profile={profile.data}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <ViewScreen profile={profile.data} onEdit={() => setIsEditing(true)} />
      )}
    </aside>
  );
};

// view the profile
const ViewScreen = ({ profile, onEdit }: ViewScreenProps) => {
  return (
    <>
      <ProfileAvatar profile={profile} />

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="min-w-0 space-y-1">
          <h1 className="truncate text-xl font-bold tracking-wide text-foreground">
            {profile.display_name ?? profile.username}
          </h1>
          <p className="truncate text-sm font-light text-muted-foreground">
            {profile.username}
          </p>
        </div>

        {profile.bio && (
          <p className="text-sm leading-relaxed text-foreground/90">
            {profile.bio}
          </p>
        )}

        <Button variant="outline" onClick={onEdit}>
          Edit Profile
        </Button>
      </div>
    </>
  );
};

// edit the profile
const EditScreen = ({ profile, onClose }: EditScreenProps) => {
  const profileMutation = useProfileMutation();

  // Local draft so typing doesn't touch the cached profile until saved.
  const [draft, setDraft] = useState<{ display_name?: string; bio?: string }>({
    display_name: profile.display_name ?? "",
    bio: profile.bio ?? "",
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    profileMutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <FormInput
        label="Display Name"
        placeholder={profile.username}
        value={draft.display_name ?? ""}
        onChange={(e) =>
          setDraft((d) => ({ ...d, display_name: e.target.value }))
        }
      />
      <FormTextarea
        label="Bio"
        placeholder="I am feeling lucky."
        value={draft.bio ?? ""}
        onChange={(e: any) => setDraft((d) => ({ ...d, bio: e.target.value }))}
      />

      <div className="flex gap-2">
        <Button
          type="submit"
          className="flex-1"
          disabled={profileMutation.isPending}
        >
          {profileMutation.isPending ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
          disabled={profileMutation.isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

/* - - - - - - - - - - - - SHARED - - - - - - - - - - - - - */
const ProfileAvatar = ({ profile }: { profile: Profile }) => {
  return (
    <Avatar className="h-20 w-20 shrink-0 border shadow-sm md:aspect-square md:h-auto md:w-full">
      <AvatarImage
        src={profile.avatar ?? undefined}
        alt={`${profile.username}'s avatar`}
        className="object-cover"
      />
      <AvatarFallback className="bg-muted font-serif text-2xl font-bold uppercase text-foreground md:text-7xl">
        {profile.username.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};
const ProfileSkeleton = () => {
  return (
    <aside className="flex w-full animate-pulse flex-row gap-5 md:max-w-60 md:flex-col">
      <div className="h-20 w-20 shrink-0 rounded-full bg-muted md:aspect-square md:h-auto md:w-full" />
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-6 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-16 w-full rounded bg-muted" />
      </div>
    </aside>
  );
};

export { Profile };
