
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface ProfileResumeUploadProps {
  onResumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentResumeUrl: string | null;
}

export const ProfileResumeUpload = ({ onResumeChange, currentResumeUrl }: ProfileResumeUploadProps) => {
  return (
    <div>
      <FormLabel htmlFor="resume">Resume (PDF)</FormLabel>
      <Input 
        id="resume" 
        type="file" 
        accept=".pdf"
        onChange={onResumeChange} 
      />
      {currentResumeUrl && (
        <p className="text-sm mt-1">
          Current resume: <a href={currentResumeUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">View</a>
        </p>
      )}
    </div>
  );
};
