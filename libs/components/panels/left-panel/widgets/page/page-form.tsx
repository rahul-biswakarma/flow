import React, { useState, useRef, useEffect } from 'react';
import { Dialog, Flex, Button, TextField, Text, Card, Spinner } from '@radix-ui/themes';
import { Page } from '@prisma/client';

import { createPage, updatePage } from '@/libs/actions/page';

type PageFormData = {
  id?: string;
  name: string;
  path: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
};

type PageFormProps = {
  projectId: string;
  initialData?: PageFormData;
  onComplete?: (page?: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const PageForm = ({ projectId, initialData, onComplete, isOpen, setIsOpen }: PageFormProps) => {
  const [formData, setFormData] = useState<PageFormData>(
    initialData || {
      name: '',
      path: '',
      title: '',
      description: '',
      seoTitle: '',
      seoDescription: '',
      seoImage: '',
    },
  );
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isEditMode = !!initialData;

  const reset = () => {
    setFormData(
      initialData || {
        name: '',
        path: '',
        title: '',
        description: '',
        seoTitle: '',
        seoDescription: '',
        seoImage: '',
      },
    );
    setError('');
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.path) {
      setError('Name and Path are required fields.');

      return;
    }
    setIsSubmitting(true);
    let newPageData;

    try {
      if (isEditMode) {
        newPageData = await updatePage({ ...formData, projectId });
      } else {
        newPageData = await createPage({ ...formData, projectId });
      }
      onComplete?.(newPageData.page);
      setIsOpen(false);
      reset();
    } catch (error) {
      setError('Failed to submit page. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name') {
      const generatedPath = value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');

      setFormData((prev) => ({ ...prev, path: generatedPath }));
    }
  };

  useEffect(() => {
    if (formData.name || formData.path) {
      setError('');
    }
  }, [formData.name, formData.path]);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content ref={dialogRef} style={{ maxWidth: '600px' }}>
        <Dialog.Title>{isEditMode ? 'Edit Page' : 'Create Page'}</Dialog.Title>
        <Flex direction="column" gap="4">
          <Card>
            <Flex direction="column" gap="3">
              <Flex direction="row" gap="2">
                <label aria-required style={{ width: '100%' }}>
                  <Text as="div" mb="1" size="2">
                    Name{' '}
                    {!isEditMode && (
                      <Text as="span" style={{ color: 'var(--red-9)' }}>
                        *
                      </Text>
                    )}
                  </Text>
                  <TextField.Root
                    required
                    name="name"
                    placeholder="Enter page name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label style={{ width: '100%' }}>
                  <Text as="div" mb="1" size="2">
                    Path{' '}
                    {!isEditMode && (
                      <Text as="span" style={{ color: 'var(--red-9)' }}>
                        *
                      </Text>
                    )}
                  </Text>
                  <TextField.Root
                    name="path"
                    placeholder="Enter page path"
                    value={formData.path}
                    onChange={handleInputChange}
                  >
                    <TextField.Slot>
                      <Flex
                        align="center"
                        style={{
                          marginLeft: '-7px',
                          height: '100%',
                          background: 'var(--gray-a3)',
                          padding: '0px 12px',
                          borderRadius: '3px',
                          fontSize: '12px',
                          fontFamily: 'monospace',
                        }}
                      >
                        domain.com
                      </Flex>
                    </TextField.Slot>
                  </TextField.Root>
                </label>
              </Flex>
              {error && !isEditMode && (
                <Text size="1" style={{ color: 'var(--red-9)' }}>
                  {error}
                </Text>
              )}
              <label>
                <Text as="div" mb="1" size="2">
                  Title
                </Text>
                <TextField.Root
                  name="title"
                  placeholder="Enter page title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <Text as="div" mb="1" size="2">
                  Description
                </Text>
                <TextField.Root
                  name="description"
                  placeholder="Enter page description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
            </Flex>
          </Card>
          <Card>
            <Flex direction="column" gap="3">
              <Text as="div" mb="1" size="2" weight="bold">
                SEO Information
              </Text>
              <label>
                <Text as="div" mb="1" size="2">
                  SEO Title
                </Text>
                <TextField.Root
                  name="seoTitle"
                  placeholder="Enter SEO title"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <Text as="div" mb="1" size="2">
                  SEO Description
                </Text>
                <TextField.Root
                  name="seoDescription"
                  placeholder="Enter SEO description"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <Text as="div" mb="1" size="2">
                  SEO Image URL
                </Text>
                <TextField.Root
                  name="seoImage"
                  placeholder="Enter SEO image URL"
                  value={formData.seoImage}
                  onChange={handleInputChange}
                />
              </label>
            </Flex>
          </Card>
        </Flex>
        <Flex gap="3" justify="end" mt="4">
          <Dialog.Close>
            <Button variant="soft" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? <Spinner /> : isEditMode ? 'Update' : 'Create'}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
