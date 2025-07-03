import { Html, Text, Container, Head } from '@react-email/components';

export default function AdminEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Container>
        <Text>Heads up! 🚨</Text>
        <Text>{email} just subscribed to the newsletter.</Text>
        <Text>Go say hi or track this new lead. 😎</Text>
      </Container>
    </Html>
  );
}
