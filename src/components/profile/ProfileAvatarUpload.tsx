
import { Input } from "@/components/ui/input";

interface ProfileAvatarUploadProps {
  avatarPreview: string | null;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileAvatarUpload = ({ avatarPreview, onAvatarChange }: ProfileAvatarUploadProps) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
        {avatarPreview ? (
          <img 
            src={avatarPreview} 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
            No Photo
          </div>
        )}
      </div>
      <div>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={onAvatarChange}
          className="max-w-xs"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Recommended: 400x400 square image
        </p>
      </div>
    </div>
  );
};
