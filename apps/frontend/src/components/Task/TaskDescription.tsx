import React from 'react';
import { Subtopic, TaskType } from '@naite/types';
import { Box, Heading } from '@chakra-ui/react';

interface TaskDescriptionProps {
  taskType: TaskType;
  lessonSubtopic: Subtopic;
}

const TaskDescription = ({
  taskType,
  lessonSubtopic,
}: TaskDescriptionProps): React.JSX.Element => {
  const descriptionMap = {
    [TaskType.Cloze]: `Please fill in the gaps with the correct ${lessonSubtopic}.`,
    [TaskType.Select]: `Select the correct meaning of this word`,
    [TaskType.Arrange]: `Please arrange the sentence`,
  };

  return (
    <Box paddingY="4" whiteSpace="pre-wrap" width="100%">
      <Heading size="md">{descriptionMap[taskType]}</Heading>
    </Box>
  );
};

export default TaskDescription;
