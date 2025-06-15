import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CustomInput } from '../ui/CustomInput';
import { axiosInstance } from '../api/api.interceptor';
import { API_ROUTES } from '../api/api.routes';
import { CustomButton } from '../ui/CustomButton';
import { isValidUrl } from '../utils/validate-url';

type FormValues = {
  originalUrl: string;
  alias?: string;
};

export default function CreateShortUrlForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const preparedData = {
      ...data,
      alias: data.alias?.trim() === '' ? undefined : data.alias?.trim(),
    };
    try {
      setError(null);
      const response = await axiosInstance.post(
        API_ROUTES.SHORT_URL.CREATE,
        preparedData
      );
      setShortUrl(response.data.shortUrl);
    } catch (error: any) {
      setError(error.response?.data?.message ?? 'Unknown error');
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="Original URL"
        placeholder="https://example.com"
        errorText={errors.originalUrl && errors.originalUrl.message}
        {...register('originalUrl', {
          required: 'URL is required',
          validate: (value) => isValidUrl(value) || 'Invalid URL format',
        })}
      />
      <CustomInput
        placeholder="Type alias here"
        label="Custom Alias (optional)"
        {...register('alias')}
      />
      <CustomButton
        type="submit"
        isLoading={isSubmitting}
        text="Create Short Link"
      />
      {!isSubmitting && (
        <div>
          {shortUrl && (
            <div>
              <p className="text-green-500">Short URL:</p>
              <a
                href={shortUrl}
                target="_blank"
                className="text-blue-500 underline"
              >
                {shortUrl}
              </a>
            </div>
          )}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </form>
  );
}
