import {
  FC,
  useState,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  SyntheticEvent,
  useRef,
} from 'react';

interface ISearchFormProps {
  handlerFormSubmit: (event: FormEvent<HTMLFormElement>, value: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ handlerFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handlerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const formEl = useRef<HTMLFormElement>(null);

  const handlerSearchFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsFormSubmitted(true);
    handlerFormSubmit(event, inputValue);
  };

  const dispatchFormSubmitEvent = () => {
    if (formEl.current) {
      const submitEvent = new Event('submit', {
        bubbles: true,
        cancelable: true,
      });
      formEl.current.dispatchEvent(submitEvent);
    }
  };

  const resetForm = () => {
    dispatchFormSubmitEvent();
    setInputValue('');
    setIsFormSubmitted(false);
  };

  const handlerButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    resetForm();
  };

  const handlerInputBlur = (event: SyntheticEvent<HTMLInputElement>) => {
    dispatchFormSubmitEvent();
  };

  return (
    <form
      ref={formEl}
      onSubmit={handlerSearchFormSubmit}
      className="search-form"
    >
      <input
        onChange={handlerInputChange}
        onBlur={handlerInputBlur}
        className="search-form__input"
        type="text"
        value={inputValue}
      />
      {isFormSubmitted && (
        <button onClick={handlerButtonClick} type="button">
          Reset
        </button>
      )}
    </form>
  );
};

export { SearchForm };
