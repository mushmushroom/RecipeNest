export interface ProfileData {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  avatar: AvatarData[];
}

export interface AvatarData {
  url: string;
}