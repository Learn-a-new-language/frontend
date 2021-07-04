type Props = {
  label: string;
  options: { value: string; displayName: string }[];
  onSelect: (selectedValue: string) => void;
  className?: string;
}

const Select: React.FC<Props> = ({ label, options, onSelect, className }) => {
  const onChangeHandler = event => onSelect(event.target.value)

  return (
    <div className={className}>
      {label}
      <select className="input" onChange={onChangeHandler}>
        {options.map(({ value, displayName }) => (
          <option value={value} key={value}>{displayName}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
