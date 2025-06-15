import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { axiosInstance } from '../api/api.interceptor';
import { API_ROUTES } from '../api/api.routes';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';

type FormValues = {
  alias: string;
};

export default function DeleteShortUrlForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await axiosInstance.delete(API_ROUTES.SHORT_URL.DELETE(data.alias));
      setSuccess('Short URL deleted successfully.');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unknown error');
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <CustomInput
        label="Alias"
        placeholder="Enter alias to delete"
        errorText={errors.alias?.message}
        {...register('alias', { required: 'Alias is required' })}
      />

      <CustomButton
        type="submit"
        isLoading={isSubmitting}
        text="Delete Short Link"
      />
      {!isSubmitting && (
        <div>
          {success && <p className="text-green-500">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </form>
  );
}
