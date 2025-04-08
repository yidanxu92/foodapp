import { ChangeEvent } from "react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  setImageLink: (imageLink: string) => void;
  children?: React.ReactNode
}

const ImageUploader = ({ setImageLink, children }: ImageUploaderProps) => {
  
  async function handleFileChange(ev: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.append('file', files[0]);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Upload failed:', errorData);
          toast.error('Upload failed: ' + (errorData.details || 'Unknown error'));
          return;
        }
        
        const responseData = await response.json();
        console.log('Upload response:', responseData);
        
        if (responseData.link) {
          setImageLink(responseData.link);
          toast.success('Image uploaded successfully!');
        } else {
          console.error('Invalid response format:', responseData);
          toast.error('Invalid server response');
        }
      } catch (error) {
        console.error('Upload request failed:', error);
        toast.error('Upload request failed');
      }
    }
  }

  return (
    <label className="cursor-pointer">
      <input type="file" accept="image/*" onChange={handleFileChange} hidden />
      {children && children}
    </label>
  )
}

export default ImageUploader