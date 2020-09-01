import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const CustomSelect: React.SFC<{
  id: string;
  label: string;
  value: any;
  options: { label: string; value: string }[];
  onChange: any;
  variant?: 'standard' | 'outlined' | 'filled';
  classContainer?: string;
  classSelect?: string;
}> = ({
  id,
  label,
  options = [],
  value,
  onChange,
  variant = 'outlined',
  classContainer,
  classSelect
}) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    //@ts-ignore
    setLabelWidth((inputLabel.current && inputLabel.current.offsetWidth) || 0);
  }, []);
  return (
    <FormControl fullWidth variant={variant} className={classContainer}>
      <InputLabel htmlFor={id} shrink ref={inputLabel}>
        {label}
      </InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        labelId={id}
        id={id}
        className={classSelect}
        fullWidth
        labelWidth={labelWidth}
      >
        <option value="" />
        {options.map(({ value, label }) => (
          <option key={`option-${value}`} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
