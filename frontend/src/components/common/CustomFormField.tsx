'use client';

import { Field, Input, InputProps } from '@chakra-ui/react';
import { PasswordInput } from '../ui/password-input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { inputStyles } from '@/lib/sharedStyles';

interface CustomFormFieldProps extends InputProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  id: string;
  labelHidden?: boolean;
  passwordField?: boolean;
  registration: UseFormRegisterReturn;
}

export default function CustomFormField({
  required,
  label,
  error,
  id,
  labelHidden = false,
  passwordField = false,
  registration,
  ...rest
}: CustomFormFieldProps) {
  const InputComponent = passwordField ? PasswordInput : Input;

  return (
    <Field.Root gap="5px" invalid={!!error}>
      <Field.Label
        htmlFor={id}
        fontSize="1.6rem"
        className={labelHidden ? 'sr-only' : ''}
        paddingLeft="1.2rem"
      >
        {label} {required && <Field.RequiredIndicator color="red.500" />}
      </Field.Label>

      <InputComponent
        id={id}
        borderColor={error ? 'red' : 'gray.600'}
        variant="outline"
        
        {...registration}
        {...inputStyles}
        _placeholder={{ color: 'gray.400', fontSize: '1.8rem' }}
        {...rest}
      />

      {error && (
        <Field.ErrorText
          fontSize="1.4rem"
          color="red.500"
          paddingLeft="1.2rem"
          marginTop="5px"
          lineHeight="1.4"
        >
          {error.message}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
}
