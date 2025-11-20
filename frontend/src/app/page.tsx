'use client';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import { Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <div>
      <CustomButton variant="main">Main</CustomButton>
      <CustomButton variant="secondary">Secondary</CustomButton>
      <CustomButton variant="outline">Outline</CustomButton>
      <CustomButton>Default</CustomButton>
      <CustomButton variant="main" size="md">
        +
      </CustomButton>
      <CustomButton variant="danger">Danger</CustomButton>
      <CustomButton variant="link">Link</CustomButton>
      <Heading as="h1" size="h1">
        Heading <Text as="span">test</Text>
      </Heading>
      <Heading as="h3" size="cardTitle">
        Card heading
      </Heading>
      <Text>default text</Text>
      <CustomFormField
        label="Email"
        placeholder="Enter your email"
        required
        error="This field is required"
        id="Email"
        // labelHidden
        passwordField
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </div>
  );
}
