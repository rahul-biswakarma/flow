import { Project } from '@prisma/client';

export const SelectInvitation = ({ invitations }: { invitations: Project[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <span>
        <h3>Active Projects</h3>
        <p>Your current workspaces where you can collaborate and contribute.</p>
      </span>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>
            <a href={`/${invitation.slug}`}>{invitation.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
