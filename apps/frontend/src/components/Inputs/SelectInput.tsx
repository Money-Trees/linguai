import { ReactElement } from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface Props<T> {
  options: T[];
  value: string | number;
  label: string;
  onChange: (value: string | number) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
  isRequired?: boolean;
}

const SelectInput = <T,>({
  options,
  value,
  label,
  onChange,
  getOptionLabel,
  getOptionValue,
}: Props<T>): ReactElement => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="" />
        {options.map((option) => {
          const value = getOptionValue
            ? getOptionValue(option)
            : getOptionLabel(option);

          return (
            <option key={getOptionLabel(option)} value={value}>
              {getOptionLabel(option)}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
