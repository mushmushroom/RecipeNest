import { Box } from '@chakra-ui/react';
import Image from 'next/image';

interface UserAvatarBoxProps {
  url?: string;
}
export default function UserAvatarBox({ url }: UserAvatarBoxProps) {
  return (
    <Box borderRadius="50%" overflow="hidden" width="137px" height="137px" position="relative">
      <Image
        src={url ? url : '/user-avatar.jpg'}
        alt="User avatar"
        fill
        style={{ objectFit: 'cover' }}
      />
    </Box>
  );
}
