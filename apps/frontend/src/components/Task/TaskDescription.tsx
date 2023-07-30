import React from 'react';
import { TaskType, Subtopic } from '@naite/types';
import { Box, Heading } from '@chakra-ui/react';

interface TaskDescriptionProps {
  taskType: TaskType;
  lessonSubtopic: Subtopic;
}

const TaskDescription = ({
  taskType,
  lessonSubtopic,
}: TaskDescriptionProps): React.JSX.Element => {
  const clozeDescription = `Please fill in the gaps with the correct ${lessonSubtopic}.`;

  const getDescription = (): string => {
    switch (taskType) {
      case TaskType.Cloze:
        return clozeDescription;
    }
  };

  return (
    <Box paddingY="4" whiteSpace="pre-wrap" width="100%">
      <Heading size="md">{getDescription()}</Heading>
    </Box>
  );
};

export default TaskDescription;
