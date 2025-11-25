import { Input, InputGroup } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export default function SearchInput() {
  return (
    <InputGroup endElement={<FaSearch size={ 18} />} maxWidth="49.3rem">
      <Input
        placeholder="Search for recipes, ingredients..."
        bgColor="white"
        borderRadius="10px"
        borderColor="transparent"
        variant="outline"
        fontSize="1.8rem"
        paddingY="1.2rem"
        paddingX="2rem"
        height="100%"
        _placeholder={{ color: 'gray.400', fontSize: '1.8rem' }}
      />
    </InputGroup>
  );
}
