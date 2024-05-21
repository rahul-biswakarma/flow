# Schema Implementation Story

In your web application, the user's journey begins with the registration process or sign up. After successfully signing up, the user has two pathways: the user can either create a new organization (org) or accept an invitation from an existing organization.

Every organization created should have the ability to define their own unique roles depending on varying permissions that can be explained further as per your specific application needs. These permissions will, in turn, determine what levels of access and functionalities that each role might have within that organization.

Each user in an organization will be then associated with a specific role that matches their responsibilities or tasks within the organization. It's important to note that if a user is associated with multiple organizations, their role within each can differ depending on the designation provided by each respective organization.

The Prisma schema for your database should reflect these applications' features and relationships between the different objects. In addition, you might need to add more properties or fields to your schema for more granular control, special features, or to improve the overall user experience.

***

refer [AuthJs](https://authjs.dev/getting-started/adapters/prisma) for auth schema implementation
