import { useState } from 'react';
import { Menu, NewMenu } from '../interfaces';
import { ErrorMessage } from '@/shared/interfaces';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import useRestaurant from './useRestaurant';

function useNewOrUpdateMenu() {
  // States
  const [loadingMenu, setLoadingMenu] = useState(false);

  //  Hooks
  const { sincronizeMenus } = useRestaurant();

  // Create
  const createMenu = async (data: NewMenu, callback: () => void = () => {}) => {
    try {
      setLoadingMenu(true);

      const { images, ...fields } = data;

      const { data: dataMenu } = await ClientAxios.post<{
        menu: Menu;
      }>('/menu', fields, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      const formData = new FormData();
      for (const image of images) {
        formData.append('images', image as File);
      }

      console.log(dataMenu);

      const { data: dataImage } = await ClientAxios.patch<{
        message: string;
        menu: Menu;
      }>(`/menu/uploads/${dataMenu.menu.restaurant}/${dataMenu.menu._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      // Sincronizar
      sincronizeMenus(dataImage.menu, true);

      toast.success('Menu creado correctamente');
      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingMenu(false);
    }
  };

  // Update
  const updateMenu = async ({
    data,
    menuId,
    isEqualsImages,
    callback = () => {},
  }: {
    data: NewMenu;
    menuId: string;
    isEqualsImages: boolean;
    callback?: () => void;
  }) => {
    try {
      setLoadingMenu(true);

      const { images, ...fields } = data;

      const { data: dataMenu } = await ClientAxios.patch<{
        message: string;
        menu: Menu;
      }>(`/menu/${menuId}`, fields, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!isEqualsImages) {
        const formData = new FormData();
        for (const image of images) {
          formData.append('images', image as File);
        }

        const { data: dataImage } = await ClientAxios.patch<{
          message: string;
          menu: Menu;
        }>(`/menu/uploads/${dataMenu.menu.restaurant}/${dataMenu.menu._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

        // Sincronizar
        sincronizeMenus(dataImage.menu, false);
      } else {
        // Sincronizar
        sincronizeMenus(dataMenu.menu, false);
      }

      toast.success('Menu actualizado correctamente');
      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingMenu(false);
    }
  };
  return {
    loadingMenu,
    createMenu,
    updateMenu,
  };
}

export default useNewOrUpdateMenu;
