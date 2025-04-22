
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface ProfileFormValues {
  full_name: string;
  bio: string;
}

interface ProfileFormFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const ProfileFormFields = ({ form }: ProfileFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Your name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="A short bio about yourself..." 
                className="min-h-[150px]" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
