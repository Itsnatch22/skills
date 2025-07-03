import { Html, Head, Body, Container, Section, Text, Link, Button } from '@react-email/components';

export const ResetPasswordEmail = ({ url }: { url: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={section}>
          <Text style={heading}>🔑 Reset Your Password</Text>
          <Text style={paragraph}>We received a request to reset your password. Click below to proceed:</Text>
          <Button href={url} style={button}>
            Reset Password
          </Button>
          <Text style={paragraph}>
            Or copy and paste this URL into your browser:
          </Text>
          <Text style={code}>{url}</Text>
          <Text style={paragraph}>
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

