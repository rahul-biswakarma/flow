'use client';

import { useActionState } from 'react';
import { Button, Card, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';

import { ProjectSections } from '../type';

import { createProject } from '@/lib/actions';
import { ProjectRedirect } from '@/lib/utils/redirects';

type CreateProjectProps = {
  changeSection: (section: ProjectSections) => void;
};

export const CreateProject = ({ changeSection }: CreateProjectProps) => {
  const [state, formAction] = useActionState(createProject, null);

  if (state && state.slug) {
    ProjectRedirect(state.slug);
  }

  return (
    <Flex align="center" direction="column" gap="3" px="7">
      <Heading align="center" as="h1">
        Create Project
      </Heading>
      <Text
        align="center"
        style={{
          color: 'var(--gray-10)',
          width: '70%',
        }}
      >
        Project is a place where you and your team can work together to plan your idea and manage the execution
      </Text>
      <Card
        mt="4"
        size="3"
        style={{
          width: '100%',
        }}
      >
        <Form.Root action={formAction}>
          <Flex direction="column" gap="4">
            <Form.Field
              name="project-name"
              style={{
                display: 'flex',
                gap: '4px',
                flexDirection: 'column',
              }}
            >
              <Form.Label>
                <Text>Project Name</Text>
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root required placeholder="Project name" type="text" />
              </Form.Control>
              <Form.Message asChild className="FormMessage" match="valueMissing">
                Please enter a project name
              </Form.Message>
            </Form.Field>

            <Form.Field
              name="project-slug"
              style={{
                display: 'flex',
                gap: '4px',
                flexDirection: 'column',
              }}
            >
              <Form.Label>
                <Text>Project Slug</Text>
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root required placeholder="Project slug" type="text" />
              </Form.Control>
              <Form.Message asChild className="FormMessage" match="valueMissing">
                Please enter a slug
              </Form.Message>
            </Form.Field>

            <Flex align="center" gap="2" justify="end" mt="2">
              <Button
                color="gray"
                onClick={() => {
                  changeSection('selection');
                }}
              >
                Cancel
              </Button>
              <Form.Submit asChild>
                <Button type="submit">Create Project</Button>
              </Form.Submit>
            </Flex>
          </Flex>
        </Form.Root>
      </Card>
    </Flex>
  );
};
