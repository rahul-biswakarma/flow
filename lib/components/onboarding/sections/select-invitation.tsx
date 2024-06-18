import { Prisma } from '@prisma/client';

type SelectInvitationProps = {
  invitations: Prisma.InvitationGetPayload<{
    include: {
      project: true;
    };
  }>[];
};

export const SelectInvitation = ({ invitations }: SelectInvitationProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span>
        <h3>Active Projects</h3>
        <p>Your current workspaces where you can collaborate and contribute.</p>
      </span>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>
            <a href={`/${invitation.project.slug}`}>{invitation.project.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
