import { Flex } from '@radix-ui/themes';

export const DecorativeBox = ({
  style,
  messageRenderer,
}: {
  style?: React.CSSProperties;
  messageRenderer?: React.ReactNode;
}) => {
  return (
    <Flex
      align="center"
      height="100%"
      justify="center"
      style={{
        backgroundColor: 'var(--gray-a3)',
        backgroundClip: 'padding-box',
        border: '1px solid var(--gray-a5)',
        borderRadius: 'var(--radius-1)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
        ...style,
      }}
    >
      {messageRenderer}
    </Flex>
  );
};
