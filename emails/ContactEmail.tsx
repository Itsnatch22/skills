import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Section,
  Hr,
} from '@react-email/components';

type Props = {
  name: string;
  email: string;
  message: string;
};

export default function ContactEmail({ name, email, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>🔥 New message from SkillsConnect</Preview>
      <Body
        style={{
          backgroundColor: '#f9fafb',
          fontFamily: 'Helvetica, Arial, sans-serif',
          color: '#111827',
          padding: '40px 0',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.07)',
            maxWidth: '600px',
            margin: 'auto',
          }}
        >
          <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            📬 You’ve got mail from SkillsConnect
          </Text>

          <Text style={{ fontSize: '16px', marginBottom: '20px', color: '#6b7280' }}>
            Someone just reached out via your contact form — time to connect and close that deal 😮‍💨🔥
          </Text>

          <Section>
            <Text style={{ fontSize: '16px', fontWeight: 'bold', margin: '12px 0 4px' }}>
              🧑 Name
            </Text>
            <Text>{name}</Text>

            <Text style={{ fontSize: '16px', fontWeight: 'bold', margin: '12px 0 4px' }}>
              📧 Email
            </Text>
            <Text>{email}</Text>

            <Text style={{ fontSize: '16px', fontWeight: 'bold', margin: '12px 0 4px' }}>
              💬 Message
            </Text>
            <Text
              style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '8px',
                whiteSpace: 'pre-line',
              }}
            >
              {message}
            </Text>
          </Section>

          <Hr style={{ margin: '32px 0' }} />

          <Text style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center' }}>
            This email was sent from the SkillsConnect contact form — crafted with ❤️ by Natch.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
