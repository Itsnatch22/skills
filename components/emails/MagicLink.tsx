import { Html, Head, Body, Container, Section, Text, Link, Button } from '@react-email/components';

export const MagicLinkEmail = ({ url }: { url: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={section}>
          <Text style={heading}>✨ Your Magic Login Link</Text>
          <Text style={paragraph}>Click below to sign in to your account:</Text>
          <Button href={url} style={button}>
            Sign In Securely
          </Button>
          <Text style={paragraph}>
            Or copy and paste this URL into your browser:
          </Text>
          <Text style={code}>{url}</Text>
          <Text style={paragraph}>
            This link will expire in 15 minutes. If you didn't request this, please ignore this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#0f172a',
  fontFamily: 'Helvetica, Arial, sans-serif',
  color: '#ffffff'
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const section = {
  padding: '24px',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  backgroundColor: '#1e293b',
};

const heading = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#a78bfa',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.4',
  color: '#e2e8f0',
  margin: '16px 0',
};

const button = {
  backgroundColor: '#7c3aed',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
  margin: '16px 0',
};

const code = {
  fontFamily: 'monospace',
  backgroundColor: '#334155',
  padding: '8px 12px',
  borderRadius: '4px',
  color: '#f8fafc',
  wordBreak: 'break-all' as const,
};