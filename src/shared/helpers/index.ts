import { v4 as uuidv4 } from 'uuid';
import { ExtFile } from '@files-ui/react';
import { Image } from '@/shared/interfaces';
import Swal from 'sweetalert2';

export const isAm = (time: string) => {
  const [hour, minutes] = time.split(':');
  const hourNumber = Number(hour);
  const minutesNumber = Number(minutes);
  if (hourNumber > 12 && minutesNumber === 0) return false;
  if (hourNumber <= 12 && minutesNumber === 0) return true;
  if (hourNumber < 12) return true;
  return false;
};

export const isPm = (time: string) => {
  const [hour, minutes] = time.split(':');
  const hourNumber = Number(hour);
  const minutesNumber = Number(minutes);
  if (hourNumber === 12 && minutesNumber === 0) return true;
  if (hourNumber > 12) return true;
  return false;
};

export const isOpenOrClosed = (openingTime: string = '00:00', closingTime: string = '00:00'): boolean => {
  // Validar formatos de hora
  const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeFormat.test(openingTime) || !timeFormat.test(closingTime)) {
    throw new Error('Formato de hora inválido');
  }

  const now = new Date();
  const todayOpeningTime = new Date(now);
  const todayClosingTime = new Date(now);

  // Establecer las horas de apertura y cierre para hoy
  const [openingHours, openingMinutes] = openingTime.split(':').map(Number);
  todayOpeningTime.setHours(openingHours, openingMinutes, 0);

  const [closingHours, closingMinutes] = closingTime.split(':').map(Number);
  todayClosingTime.setHours(closingHours, closingMinutes, 0);

  // Verificar si está dentro del rango
  return now >= todayOpeningTime && now <= todayClosingTime;
};

export const transformImageToExtFile = async (image: Image | null): Promise<ExtFile> => {
  if (!image) throw new Error('No se ha seleccionado una imagen');

  const { url, resource_type, format, public_id } = image;

  // obtener la ultima parte del public_id en el ultimo /
  const name = public_id.split('/').pop() + '.' + format;

  const buffer = await fetch(url).then((res) => res.arrayBuffer());

  const file = new File([buffer], name, {
    type: `${resource_type}/${format}`,
  });

  return {
    id: uuidv4(),
    imageUrl: url,
    file: file,
    valid: true,
  };
};

export const showImage = ({ src, alt, imageWidth, imageHeight }: { src: string; alt: string; imageWidth?: number; imageHeight?: number }) => {
  Swal.fire({
    imageUrl: src,
    imageAlt: alt,
    ...((imageWidth || imageHeight) && { imageWidth, imageHeight }),
    showConfirmButton: false,
    customClass: {
      image: 'm-0 p-0 w-full h-full object-contain',
      popup: 'popup-image',
    },
  });
};

// Descargar archivo
export const downloadFile = (url: string, fileName: string) => {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${fileName} ${Math.random().toString().slice(2, 10)}`.toUpperCase();
  anchor.click();

  // remover el elemento
  anchor.remove();
};

// Formatear fecha ejemplo: 2021-08-01T00:00:00.000Z => 01/08/2021
export const formatDate = (date: string) => {
  const [year, month, day] = date.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

// Formatear tiempo ejemplo: 2021-08-01T00:00:00.000Z => 00:00:00
export const formatTime = (date: string) => {
  const [hours, minutes, seconds] = date.split('T')[1].split('.')[0].split(':');
  return `${hours}:${minutes}:${seconds}`;
};
