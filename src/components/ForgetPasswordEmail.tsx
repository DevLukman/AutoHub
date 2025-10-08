import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  username: string;
  resetUrl: string;
  userEmail: string;
  companyName?: string;
  logoUrl?: string;
  supportEmail?: string;
  companyAddress?: string;
  requestedAt?: string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const {
    username = "User",
    resetUrl,
    userEmail,
    companyName = "Company Name",
    logoUrl,
    supportEmail = "support@company.com",
    companyAddress = "123 Business Street, City, State 12345",
    requestedAt,
  } = props;

  // Validate required props
  if (!resetUrl || !userEmail) {
    throw new Error("resetUrl and userEmail are required props");
  }

  const buttonStyles = {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "16px 32px",
    borderRadius: "8px",
    textDecoration: "none",
    display: "inline-block",
    fontWeight: "600",
  };

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[20px] shadow-sm sm:p-[40px]">
            {/* Logo */}
            {logoUrl && (
              <Section className="mb-[32px] text-center">
                <Img
                  src={logoUrl}
                  alt={`${companyName} Logo`}
                  width="120"
                  height="auto"
                  className="mx-auto"
                />
              </Section>
            )}

            {/* Header */}
            <Section className="mb-[32px] text-center">
              <Heading className="m-0 mb-[8px] text-[24px] font-bold text-gray-900 sm:text-[28px]">
                Reset Your Password
              </Heading>
              <Text className="m-0 text-[14px] text-gray-600 sm:text-[16px]">
                We received a request to reset your password
              </Text>
              {requestedAt && (
                <Text className="m-0 mt-[8px] text-[12px] text-gray-500">
                  Requested on {requestedAt}
                </Text>
              )}
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="m-0 mb-[16px] text-[14px] leading-[24px] text-gray-700 sm:text-[16px]">
                Hello {username},
              </Text>
              <Text className="m-0 mb-[16px] text-[14px] leading-[24px] text-gray-700 sm:text-[16px]">
                We received a password reset request for your account associated
                with <strong>{userEmail}</strong>.
              </Text>
              <Text className="m-0 mb-[24px] text-[14px] leading-[24px] text-gray-700 sm:text-[16px]">
                Click the button below to create a new password. This link will
                expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="mb-[32px] text-center">
              <Button
                href={resetUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyles}
                className="box-border inline-block rounded-[8px] bg-blue-600 px-[24px] py-[12px] text-[14px] font-semibold text-white no-underline sm:px-[32px] sm:py-[16px] sm:text-[16px]"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="m-0 mb-[8px] text-[13px] leading-[20px] text-gray-600 sm:text-[14px]">
                If the button doesn&apos;t work, copy and paste this link into
                your browser:
              </Text>
              <Link
                href={resetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-blue-600 underline sm:text-[14px]"
                style={{
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                }}
              >
                {resetUrl}
              </Link>
            </Section>

            {/* Security Notice */}
            <Section className="mb-[32px] rounded-[8px] bg-gray-50 p-[16px] sm:p-[20px]">
              <Text
                className="m-0 mb-[8px] text-[13px] leading-[20px] text-gray-700 sm:text-[14px]"
                style={{ fontWeight: "600" }}
              >
                Security Notice:
              </Text>
              <Text className="m-0 mb-[8px] text-[12px] leading-[20px] text-gray-600 sm:text-[14px]">
                • If you didn&apos;t request this password reset, please ignore
                this email
              </Text>
              <Text className="m-0 mb-[8px] text-[12px] leading-[20px] text-gray-600 sm:text-[14px]">
                • This link will expire in 24 hours
              </Text>
              <Text className="m-0 text-[12px] leading-[20px] text-gray-600 sm:text-[14px]">
                • For security, never share this link with anyone
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="mb-[32px]">
              <Text className="m-0 text-[12px] leading-[20px] text-gray-600 sm:text-[14px]">
                Need help? Contact our support team at{" "}
                <Link
                  href={`mailto:${supportEmail}`}
                  className="text-blue-600 underline"
                >
                  {supportEmail}
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="m-0 mb-[8px] text-[11px] leading-[16px] text-gray-500 sm:text-[12px]">
                This email was sent to {userEmail}
              </Text>
              <Text className="m-0 mb-[8px] text-[11px] leading-[16px] text-gray-500 sm:text-[12px]">
                {companyName}, {companyAddress}
              </Text>
              <Text className="m-0 text-[11px] leading-[16px] text-gray-500 sm:text-[12px]">
                © {new Date().getFullYear()} {companyName}. All rights
                reserved.{" "}
                <Link href="#" className="text-gray-500 underline">
                  Privacy Policy
                </Link>{" "}
                |{" "}
                <Link href="#" className="text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;
