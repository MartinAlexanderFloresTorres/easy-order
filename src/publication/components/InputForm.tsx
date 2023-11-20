import Avatar from '@/shared/components/Avatar';
import { Image, Send, X } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputFormProps {
  className?: string;
  id: string;
  onSend: (data: { id: string; text: string; image: File | null }) => void;
  placeholder?: string;
  showAvatar?: boolean;
}

const InputForm = ({ className, id, showAvatar = true, placeholder, onSend }: InputFormProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const previewImage = image && URL.createObjectURL(image);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text || image) {
      onSend({ id, text, image });
      setText('');
      setImage(null);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div
      className={twMerge('border-t border-t-zinc-700 border-opacity-50 p-2 select-none', className)}
      style={{
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      <div className="flex items-center w-full gap-2">
        {showAvatar && <Avatar />}
        <form className="relative flex-1" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={placeholder || 'Escribe algo...'}
            className={
              'bg-zinc-800 text-sm rounded-full pl-4 py-[12px] pr-[90px] text-zinc-400 w-full focus:outline-none focus:ring-2 focus:ring-zinc-700'
            }
            id={id}
            name={id}
            value={text}
            onChange={(e) => setText(e.target.value.trimStart())}
          />
          <div className="flex items-center gap-1 absolute right-1 top-1/2 transform -translate-y-1/2">
            <label
              role="button"
              className={
                'text-zinc-400 w-8 h-8 flex items-center justify-center hover:bg-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-700'
              }
            >
              <Image size={24} />
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
            <button
              type="submit"
              className={twMerge(
                'text-zinc-400 w-8 h-8 flex items-center justify-center hover:bg-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-400',
                (text || image) && 'text-blue-500',
              )}
              disabled={!text && !image}
            >
              <Send size={24} />
            </button>
          </div>
        </form>
      </div>

      {previewImage && (
        <div className="pl-[60px] mt-2 w-fit h-16 relative">
          <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
          <button
            className="absolute top-1 right-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => setImage(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InputForm;
