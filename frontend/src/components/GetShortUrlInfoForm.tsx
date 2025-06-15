import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { axiosInstance } from '../api/api.interceptor';
import { API_ROUTES } from '../api/api.routes';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';

type FormValues = {
  alias: string;
};

type ShortUrlInfo = {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clickCount: number;
};

export default function GetShortUrlInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [info, setInfo] = useState<ShortUrlInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setInfo(null);

    try {
      const response = await axiosInstance.get(
        API_ROUTES.SHORT_URL.GET_INFO(data.alias)
      );
      setInfo(response.data);
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
        placeholder="Enter alias to get info"
        errorText={errors.alias?.message}
        {...register('alias', { required: 'Alias is required' })}
      />
      <CustomButton
        type="submit"
        isLoading={isSubmitting}
        text="Get Short Link Info"
      />
      {!isSubmitting && (
        <div>
          {info && (
            <div className="mt-4 text-sm space-y-1">
              <p>
                <span className="font-medium">Original URL:</span>{' '}
                <a
                  href={info.originalUrl}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {info.originalUrl}
                </a>
              </p>
              <p>
                <span className="font-medium">Created At:</span>{' '}
                {new Date(info.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Visits:</span> {info.clickCount}
              </p>
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </form>
  );
}
