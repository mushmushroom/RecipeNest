import { Flex, Input, Stack } from '@chakra-ui/react';
import UserAvatarBox from '../account/UserAvatarBox';
import { CustomButton } from '../common/CustomButton';
import useUpdateAvatar from '@/lib/hooks/settings/useUpdateAvatar';
import { useFetchAuth } from '@/lib/hooks/useFetchAuth';
import { useRef } from 'react';

interface ChangeAvatarSectionProps {
  url: string | undefined;
}
export default function ChangeAvatarSection({ url }: ChangeAvatarSectionProps) {
  const { updateAvatar, deleteAvatar, isLoading } = useUpdateAvatar();
  const { token } = useFetchAuth(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    if (!token) return;
    deleteAvatar(token);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('file', file);

    updateAvatar({ token, formData });

    e.target.value = '';
  };

  return (
    <Flex gap="3rem" alignItems="center" py="5rem">
      <UserAvatarBox url={url} />
      <Stack gap="1rem" textAlign="center">
        <CustomButton variant="outline" onClick={handleSelectClick} disabled={isLoading}>
          Select new avatar
        </CustomButton>
        {url && (
          <CustomButton variant="outline" onClick={handleDeleteClick} disabled={isLoading}>
            Delete avatar
          </CustomButton>
        )}
      </Stack>
      <Input
        type="file"
        ref={fileInputRef}
        display="none"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Flex>
  );
}
