import QRCode from 'qrcode';

export const QRCodeGenerator = (text: string): string => {
  let dataURL: string = '';
  QRCode.toDataURL(text, (err, url) => {
    if (err) throw err;
    dataURL = url;
  });
  return dataURL;
};
