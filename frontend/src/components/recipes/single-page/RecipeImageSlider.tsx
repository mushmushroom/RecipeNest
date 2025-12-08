'use client';

import { useRef, useState } from 'react';
import { ImageData } from '@/lib/types/recipe';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Image from 'next/image';
import { Box, Button } from '@chakra-ui/react';
import { CustomButton } from '../../common/CustomButton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NextButton from './NextButton';
import PrevButton from './PrevButton';

interface RecipeImageSliderProps {
  images: ImageData[];
}

export default function RecipeImageSlider({ images }: RecipeImageSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperRef = useRef<any>(null);

  return (
    <Box width="100%">
      {/* Top big image slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        style={{ marginBottom: '1rem' }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {/* Navigation buttons */}
        <NextButton swiperRef={swiperRef} />
        <PrevButton swiperRef={swiperRef} />

        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Box
              position="relative"
              width="100%"
              height={{ base: '300px', md: '340px' }}
              flexShrink="0"
            >
              <Image src={image.url} alt="Recipe image" fill style={{ objectFit: 'cover' }} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom thumbnails slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween="3rem"
        slidesPerView={4}
        watchSlidesProgress
        style={{ cursor: 'pointer' }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.url}
              alt="Thumbnail"
              width={120}
              height={120}
              style={{
                objectFit: 'cover',
                height: '100%',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
