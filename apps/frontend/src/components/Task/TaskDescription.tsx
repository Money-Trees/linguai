import React from 'react';
import { TaskType, Topic } from '@naite/types';
import { Card, Text } from '@chakra-ui/react';

interface TaskDescriptionProps {
  taskType: TaskType;
  lessonTopic: Topic;
}

const TaskDescription = ({
  taskType,
  lessonTopic,
}: TaskDescriptionProps): React.JSX.Element => {
  const clozeDescription = `Please fill in the gaps with the correct ${lessonTopic}`;

  const getDescription = (): string => {
    switch (taskType) {
      case TaskType.Cloze:
        return clozeDescription;
    }
  };

  return (
    <Card
      backgroundColor="gray.300"
      _dark={{
        backgroundColor: 'gray.800',
      }}
      padding="4"
      whiteSpace="pre-wrap"
    >
      <Text fontWeight={'semibold'}>{getDescription()}</Text>
    </Card>
  );
};

export default TaskDescription;
