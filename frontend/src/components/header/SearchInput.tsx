import { AppPathPublic } from '@/lib/constants';
import { inputStyles } from '@/lib/sharedStyles';
import { Input, InputGroup } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 1300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed) {
      window.location.href = `${AppPathPublic.Recipes}?search=${encodeURIComponent(trimmed)}`;
    }
  }, [debouncedSearch]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value;
    setSearchValue(value);
  }
  return (
    <InputGroup endElement={<FaSearch size={18} />} maxWidth="49.3rem">
      <Input
        onChange={(e) => handleChange(e)}
        placeholder="Search for recipes, ingredients..."
        borderColor="transparent"
        variant="outline"
        {...inputStyles}
        _placeholder={{ color: 'gray.400', fontSize: '1.8rem' }}
      />
    </InputGroup>
  );
}
