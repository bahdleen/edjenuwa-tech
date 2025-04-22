
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Cybersecurity", "Networking", "AI"];

export const ProjectBasicInfo = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Title</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Project Title" 
                required 
                className="bg-cyber-dark border-cyber/20 focus:border-cyber/50" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Category</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-cyber-dark border-cyber/20">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-cyber-dark border-cyber/20">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">Description</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Project description..." 
                className="min-h-[150px] bg-cyber-dark border-cyber/20 focus:border-cyber/50" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="youtube_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground">YouTube Video URL</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="https://youtube.com/..." 
                className="bg-cyber-dark border-cyber/20 focus:border-cyber/50" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
