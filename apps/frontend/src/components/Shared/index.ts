import { SystemStyleObject } from '@chakra-ui/react';

export const editableInputStyling: SystemStyleObject = {
  borderRadius: 0,
  borderBottom: '1px solid',
  borderBottomColor: (theme) => theme.colors.gray[700],
  _focus: {
    borderBottomColor: (theme) => theme.colors.primary[500],
  },
};
