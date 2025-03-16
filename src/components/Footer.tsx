import { HeartIcon } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center w-full py-8 text-white bg-red-500">
      <p className="">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </p>

      <div className="flex items-center gap-1 text-lg font-semibold">
        <span>Made with</span>
        <HeartIcon /> by
        <a href="https://gh.ahmadullah.in" className="text-white underline">
          @aumirza
        </a>
      </div>
    </div>
  );
};
