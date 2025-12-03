import { Button } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { SwiperClass } from 'swiper/react';

interface NextButtonProps {
  swiperRef: React.RefObject<SwiperClass | null>;
}
const NextButton = ({ swiperRef }: NextButtonProps) => {
  return (
    <Button
      onClick={() => swiperRef.current?.slideNext()}
      variant="plain"
      backgroundColor="white"
      position="absolute"
      bottom="10px"
      left="60px"
      zIndex="999"
      width="4rem"
      height="4rem"
      borderRadius="50%"
    >
      <FaChevronRight />
    </Button>
  );
};
export default NextButton;
