import { useState } from 'react';
import { Category, NewCategory } from '@/restaurant/interfaces';
import { ErrorMessage } from '@/shared/interfaces';
import toast from 'react-hot-toast';
import ClientAxios from '@/config/ClientAxios';
import useRestaurant from './useRestaurant';

function useNewOrUpdateCategory() {
  // States
  const [loadingCategory, setLoadingCategory] = useState(false);

  //  Hooks
  const { sincronizeCategories } = useRestaurant();

  // Create category
  const createCategory = async (data: NewCategory, callback: () => void = () => {}) => {
    try {
      setLoadingCategory(true);

      const { image, banner, ...fields } = data;

      const formData = new FormData();
      formData.append('image', image as File);
      formData.append('banner', banner as File);

      const { data: dataCategory } = await ClientAxios.post<{
        message: string;
        category: Category;
      }>('/category', fields, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      const { data: dataImage } = await ClientAxios.patch(
        `/category/uploads/${dataCategory.category.restaurant}/${dataCategory.category._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        },
      );

      // Sincronizar categorías
      sincronizeCategories(dataImage.category, true);

      toast.success('Categoría creada correctamente');
      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingCategory(false);
    }
  };

  // Update category
  const updateCategory = async ({
    data,
    categoryId,
    isEqualsImage,
    isEqualsBanner,
    callback = () => {},
  }: {
    data: NewCategory;
    categoryId: string;
    isEqualsImage: boolean;
    isEqualsBanner: boolean;
    callback?: () => void;
  }) => {
    try {
      setLoadingCategory(true);

      const { image, banner, ...fields } = data;

      const { data: dataCategory } = await ClientAxios.patch<{
        message: string;
        category: Category;
      }>(`/category/${categoryId}`, fields, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      const formData = new FormData();

      if (!isEqualsImage) {
        formData.append('image', image as File);
      }
      if (!isEqualsBanner) {
        formData.append('banner', banner as File);
      }

      if (!isEqualsImage || !isEqualsBanner) {
        const { data: dataImage } = await ClientAxios.patch(
          `/category/uploads/${dataCategory.category.restaurant}/${dataCategory.category._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          },
        );

        // Sincronizar categorías
        sincronizeCategories(dataImage.category, false);
      } else {
        // Sincronizar categorías
        sincronizeCategories(dataCategory.category, false);
      }

      toast.success('Categoría actualizada correctamente');
      callback();
    } catch (error) {
      console.log(error);
      const { response } = error as ErrorMessage;
      toast.error(response.data.message);
    } finally {
      setLoadingCategory(false);
    }
  };
  return {
    loadingCategory,
    createCategory,
    updateCategory,
  };
}

export default useNewOrUpdateCategory;
