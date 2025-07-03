import { Html, Text, Container, Head, Button } from '@react-email/components';

export default function SubscriberEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Container>
        <Text>Hey legend 👋</Text>
        <Text>Thanks for subscribing to the chaos! 😂🔥</Text>
        <Text>You’re now on the inside – expect some mad updates soon.</Text>
        <Button href="https://yourwebsite.com" style={{ background: '#6366F1', color: '#fff' }}>
          Explore the site
        </Button>
        <Text>— SkillsConnect Team 😎</Text>
      </Container>
    </Html>
  );
}
