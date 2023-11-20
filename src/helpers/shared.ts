interface ShareProps {
  title: string;
  text: string;
  url: string;
  files?: File[];
}

const share = async ({ title, text, url, files }: ShareProps, callback = () => {}) => {
  if (navigator.share) {
    await navigator.share({
      title,
      text,
      url,
      files,
    });
    callback();
  } else {
    console.error('La API de compartir no es compatible con este navegador');
  }
};

export default share;
