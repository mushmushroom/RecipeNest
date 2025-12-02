import { Button } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import { SwiperClass } from 'swiper/react';

interface PrevButtonProps {
  swiperRef: React.RefObject<SwiperClass | null>;
}

const PrevButton = ({ swiperRef }: PrevButtonProps) => {
  return (
    <Button
      onClick={() => swiperRef.current?.slidePrev()}
      variant="plain"
      backgroundColor="white"
      position="absolute"
      bottom="10px"
      left="10px"
      zIndex="999"
      width="4rem"
      height="4rem"
      borderRadius="50%"
    >
      <FaChevronLeft />
    </Button>
  );
};
export default PrevButton;
